import type { InformationConfidence, ImageRole } from "@/types";

const informationConfidenceValues = new Set<InformationConfidence>([
  "confirmed",
  "partial",
  "uncertain"
]);

const imageRoleValues = new Set<ImageRole>([
  "artwork",
  "wall_label",
  "gallery_scene",
  "detail",
  "other"
]);

export function parseStringArray(value: string | null | undefined): string[] {
  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((item): item is string => typeof item === "string");
  } catch {
    return [];
  }
}

export function stringifyStringArray(value: string[] | undefined): string {
  return JSON.stringify(value ?? []);
}

export function normalizeOptionalText(value: string | null | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

export function parseOptionalDate(value: Date | string | null | undefined) {
  if (!value) {
    return undefined;
  }

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? undefined : value;
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

export function normalizeInformationConfidence(
  value: string | null | undefined
): InformationConfidence {
  return informationConfidenceValues.has(value as InformationConfidence)
    ? (value as InformationConfidence)
    : "partial";
}

export function normalizeImageRole(value: string | null | undefined): ImageRole {
  return imageRoleValues.has(value as ImageRole) ? (value as ImageRole) : "other";
}
