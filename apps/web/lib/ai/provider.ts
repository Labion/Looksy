import type { AnalyzeExhibitInput, AnalyzeExhibitResult } from "@/types";

export type AiProvider = {
  analyzeExhibit(input: AnalyzeExhibitInput): Promise<AnalyzeExhibitResult>;
};
