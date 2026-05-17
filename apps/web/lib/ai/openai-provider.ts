import { readFile } from "node:fs/promises";
import path from "node:path";
import OpenAI from "openai";
import { buildAnalyzeExhibitPrompt } from "@/lib/ai/prompt";
import type { AiProvider } from "@/lib/ai/provider";
import type {
  AnalyzeExhibitInput,
  AnalyzeExhibitResult,
  ExhibitImage,
  InformationConfidence
} from "@/types";

const defaultModel = "gpt-5.5";

const informationConfidenceValues = new Set<InformationConfidence>([
  "confirmed",
  "partial",
  "uncertain"
]);

const analyzeResultSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    confirmedFacts: { type: "string" },
    visualObservations: { type: "string" },
    reasonableSpeculation: { type: "string" },
    viewingFocus: { type: "string" },
    aiAnalysis: { type: "string" },
    designInspiration: { type: "string" },
    oneSentenceSummary: { type: "string" },
    followUpQuestions: {
      type: "array",
      items: { type: "string" }
    },
    informationConfidence: {
      type: "string",
      enum: ["confirmed", "partial", "uncertain"]
    }
  },
  required: [
    "confirmedFacts",
    "visualObservations",
    "reasonableSpeculation",
    "viewingFocus",
    "aiAnalysis",
    "designInspiration",
    "oneSentenceSummary",
    "followUpQuestions",
    "informationConfidence"
  ]
} as const;

function requiredString(value: unknown, field: keyof AnalyzeExhibitResult) {
  if (typeof value !== "string") {
    throw new Error(`OpenAI response field "${field}" must be a string.`);
  }

  return value.trim();
}

function normalizeAnalyzeResult(value: unknown): AnalyzeExhibitResult {
  if (!value || typeof value !== "object") {
    throw new Error("OpenAI response was not a JSON object.");
  }

  const record = value as Record<string, unknown>;
  const followUpQuestions = Array.isArray(record.followUpQuestions)
    ? record.followUpQuestions
        .filter((question): question is string => typeof question === "string")
        .map((question) => question.trim())
        .filter(Boolean)
    : [];
  const informationConfidence = informationConfidenceValues.has(
    record.informationConfidence as InformationConfidence
  )
    ? (record.informationConfidence as InformationConfidence)
    : "partial";

  return {
    confirmedFacts: requiredString(record.confirmedFacts, "confirmedFacts"),
    visualObservations: requiredString(
      record.visualObservations,
      "visualObservations"
    ),
    reasonableSpeculation: requiredString(
      record.reasonableSpeculation,
      "reasonableSpeculation"
    ),
    viewingFocus: requiredString(record.viewingFocus, "viewingFocus"),
    aiAnalysis: requiredString(record.aiAnalysis, "aiAnalysis"),
    designInspiration: requiredString(
      record.designInspiration,
      "designInspiration"
    ),
    oneSentenceSummary: requiredString(
      record.oneSentenceSummary,
      "oneSentenceSummary"
    ),
    followUpQuestions,
    informationConfidence
  };
}

function imageDiskPath(image: ExhibitImage) {
  if (!image.filePath.startsWith("/uploads/exhibit-images/")) {
    throw new Error(`Unsupported local image path: ${image.filePath}`);
  }

  return path.join(process.cwd(), "public", image.filePath);
}

async function imageToDataUrl(image: ExhibitImage) {
  const mimeType = image.mimeType?.startsWith("image/")
    ? image.mimeType
    : "image/jpeg";
  const bytes = await readFile(imageDiskPath(image));

  return `data:${mimeType};base64,${bytes.toString("base64")}`;
}

export function createOpenAiProvider(): AiProvider {
  const apiKey = process.env.OPENAI_API_KEY?.trim();

  if (!apiKey) {
    throw new Error(
      "OPENAI_API_KEY is required when AI_PROVIDER is set to openai."
    );
  }

  const client = new OpenAI({ apiKey });
  const model = process.env.OPENAI_MODEL?.trim() || defaultModel;

  return {
    async analyzeExhibit(input: AnalyzeExhibitInput) {
      const prompt = buildAnalyzeExhibitPrompt(input);
      const imageDataUrls = await Promise.all(
        (input.images ?? []).map(imageToDataUrl)
      );
      const content = [
        { type: "input_text" as const, text: prompt },
        ...imageDataUrls.map((imageUrl) => ({
          type: "input_image" as const,
          image_url: imageUrl,
          detail: "auto" as const
        }))
      ];

      const response = await client.responses.create({
        model,
        input: [
          {
            role: "user",
            content
          }
        ],
        text: {
          format: {
            type: "json_schema",
            name: "looksy_exhibit_analysis",
            strict: true,
            schema: analyzeResultSchema
          }
        }
      });
      const outputText = response.output_text;

      if (!outputText) {
        throw new Error("OpenAI returned an empty analysis response.");
      }

      return normalizeAnalyzeResult(JSON.parse(outputText));
    }
  };
}
