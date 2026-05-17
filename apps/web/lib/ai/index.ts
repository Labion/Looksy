import { mockAiProvider } from "@/lib/ai/mock-provider";
import { createOpenAiProvider } from "@/lib/ai/openai-provider";
import type { AiProvider } from "@/lib/ai/provider";

type ProviderName = "mock" | "openai";

function providerName(): ProviderName {
  const value = process.env.AI_PROVIDER?.trim().toLowerCase();

  return value === "openai" ? "openai" : "mock";
}

export function getAiProvider(): AiProvider {
  return providerName() === "openai" ? createOpenAiProvider() : mockAiProvider;
}
