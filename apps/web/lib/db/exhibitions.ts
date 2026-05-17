import type {
  ExhibitImage as DbExhibitImage,
  ExhibitNote as DbExhibitNote,
  ExhibitionSession as DbExhibitionSession
} from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import {
  normalizeImageRole,
  normalizeInformationConfidence,
  normalizeOptionalText,
  parseOptionalDate,
  parseStringArray,
  stringifyStringArray
} from "@/lib/db/serialization";
import type {
  CreateExhibitNoteInput,
  CreateExhibitImageInput,
  CreateExhibitionSessionInput,
  ExhibitImage,
  ExhibitNote,
  ExhibitionSession,
  UpdateExhibitNoteInput,
  UpdateExhibitionSessionInput
} from "@/types";

function toExhibitionSession(
  session: DbExhibitionSession
): ExhibitionSession {
  return {
    id: session.id,
    title: session.title,
    venue: session.venue ?? undefined,
    city: session.city ?? undefined,
    visitDate: session.visitDate ?? undefined,
    exhibitionType: session.exhibitionType ?? undefined,
    keywords: parseStringArray(session.keywords),
    overallImpression: session.overallImpression ?? undefined,
    curatorialNotes: session.curatorialNotes ?? undefined,
    spatialNotes: session.spatialNotes ?? undefined,
    createdAt: session.createdAt,
    updatedAt: session.updatedAt
  };
}

function requiredTitle(value: string) {
  const title = value.trim();

  if (!title) {
    throw new Error("Exhibition session title is required.");
  }

  return title;
}

function toExhibitNote(note: DbExhibitNote): ExhibitNote {
  return {
    id: note.id,
    exhibitionSessionId: note.exhibitionSessionId,
    sequenceNumber: note.sequenceNumber,
    title: note.title ?? undefined,
    artist: note.artist ?? undefined,
    yearOrPeriod: note.yearOrPeriod ?? undefined,
    mediumOrMaterial: note.mediumOrMaterial ?? undefined,
    wallLabelText: note.wallLabelText ?? undefined,
    manualContext: note.manualContext ?? undefined,
    confirmedFacts: note.confirmedFacts ?? undefined,
    visualObservations: note.visualObservations ?? undefined,
    reasonableSpeculation: note.reasonableSpeculation ?? undefined,
    viewingFocus: note.viewingFocus ?? undefined,
    aiAnalysis: note.aiAnalysis ?? undefined,
    designInspiration: note.designInspiration ?? undefined,
    oneSentenceSummary: note.oneSentenceSummary ?? undefined,
    personalRemarks: note.personalRemarks ?? undefined,
    followUpQuestions: parseStringArray(note.followUpQuestions),
    informationConfidence: normalizeInformationConfidence(
      note.informationConfidence
    ),
    createdAt: note.createdAt,
    updatedAt: note.updatedAt
  };
}

function toExhibitImage(image: DbExhibitImage): ExhibitImage {
  return {
    id: image.id,
    exhibitNoteId: image.exhibitNoteId,
    filePath: image.filePath,
    originalFilename: image.originalFilename ?? undefined,
    mimeType: image.mimeType ?? undefined,
    width: image.width ?? undefined,
    height: image.height ?? undefined,
    imageRole: normalizeImageRole(image.imageRole),
    createdAt: image.createdAt
  };
}

export async function createExhibitionSession(
  input: CreateExhibitionSessionInput
) {
  const session = await prisma.exhibitionSession.create({
    data: {
      title: requiredTitle(input.title),
      venue: normalizeOptionalText(input.venue),
      city: normalizeOptionalText(input.city),
      visitDate: parseOptionalDate(input.visitDate),
      exhibitionType: normalizeOptionalText(input.exhibitionType),
      keywords: stringifyStringArray(input.keywords),
      overallImpression: normalizeOptionalText(input.overallImpression),
      curatorialNotes: normalizeOptionalText(input.curatorialNotes),
      spatialNotes: normalizeOptionalText(input.spatialNotes)
    }
  });

  return toExhibitionSession(session);
}

export async function listExhibitionSessions() {
  const sessions = await prisma.exhibitionSession.findMany({
    orderBy: [{ visitDate: "desc" }, { createdAt: "desc" }]
  });

  return sessions.map(toExhibitionSession);
}

export async function getExhibitionSession(id: string) {
  const session = await prisma.exhibitionSession.findUnique({
    where: { id }
  });

  return session ? toExhibitionSession(session) : null;
}

export async function updateExhibitionSession(
  id: string,
  input: UpdateExhibitionSessionInput
) {
  const session = await prisma.exhibitionSession.update({
    where: { id },
    data: {
      ...(input.title !== undefined ? { title: requiredTitle(input.title) } : {}),
      ...(input.venue !== undefined
        ? { venue: normalizeOptionalText(input.venue) }
        : {}),
      ...(input.city !== undefined
        ? { city: normalizeOptionalText(input.city) }
        : {}),
      ...(input.visitDate !== undefined
        ? { visitDate: parseOptionalDate(input.visitDate) }
        : {}),
      ...(input.exhibitionType !== undefined
        ? { exhibitionType: normalizeOptionalText(input.exhibitionType) }
        : {}),
      ...(input.keywords !== undefined
        ? { keywords: stringifyStringArray(input.keywords) }
        : {}),
      ...(input.overallImpression !== undefined
        ? { overallImpression: normalizeOptionalText(input.overallImpression) }
        : {}),
      ...(input.curatorialNotes !== undefined
        ? { curatorialNotes: normalizeOptionalText(input.curatorialNotes) }
        : {}),
      ...(input.spatialNotes !== undefined
        ? { spatialNotes: normalizeOptionalText(input.spatialNotes) }
        : {})
    }
  });

  return toExhibitionSession(session);
}

export async function createExhibitNote(input: CreateExhibitNoteInput) {
  const note = await prisma.$transaction(async (tx) => {
    const latestNote = await tx.exhibitNote.findFirst({
      where: { exhibitionSessionId: input.exhibitionSessionId },
      orderBy: { sequenceNumber: "desc" },
      select: { sequenceNumber: true }
    });

    const sequenceNumber =
      input.sequenceNumber ?? (latestNote?.sequenceNumber ?? 0) + 1;

    return tx.exhibitNote.create({
      data: {
        exhibitionSessionId: input.exhibitionSessionId,
        sequenceNumber,
        title: normalizeOptionalText(input.title),
        artist: normalizeOptionalText(input.artist),
        yearOrPeriod: normalizeOptionalText(input.yearOrPeriod),
        mediumOrMaterial: normalizeOptionalText(input.mediumOrMaterial),
        wallLabelText: normalizeOptionalText(input.wallLabelText),
        manualContext: normalizeOptionalText(input.manualContext),
        confirmedFacts: normalizeOptionalText(input.confirmedFacts),
        visualObservations: normalizeOptionalText(input.visualObservations),
        reasonableSpeculation: normalizeOptionalText(
          input.reasonableSpeculation
        ),
        viewingFocus: normalizeOptionalText(input.viewingFocus),
        aiAnalysis: normalizeOptionalText(input.aiAnalysis),
        designInspiration: normalizeOptionalText(input.designInspiration),
        oneSentenceSummary: normalizeOptionalText(input.oneSentenceSummary),
        personalRemarks: normalizeOptionalText(input.personalRemarks),
        followUpQuestions: stringifyStringArray(input.followUpQuestions),
        informationConfidence: input.informationConfidence ?? "partial"
      }
    });
  });

  return toExhibitNote(note);
}

export async function listExhibitNotesBySession(exhibitionSessionId: string) {
  const notes = await prisma.exhibitNote.findMany({
    where: { exhibitionSessionId },
    orderBy: [{ sequenceNumber: "asc" }, { createdAt: "asc" }]
  });

  return notes.map(toExhibitNote);
}

export async function getExhibitNote(id: string) {
  const note = await prisma.exhibitNote.findUnique({
    where: { id }
  });

  return note ? toExhibitNote(note) : null;
}

export async function updateExhibitNote(
  id: string,
  input: UpdateExhibitNoteInput
) {
  const note = await prisma.exhibitNote.update({
    where: { id },
    data: {
      ...(input.title !== undefined
        ? { title: normalizeOptionalText(input.title) }
        : {}),
      ...(input.artist !== undefined
        ? { artist: normalizeOptionalText(input.artist) }
        : {}),
      ...(input.yearOrPeriod !== undefined
        ? { yearOrPeriod: normalizeOptionalText(input.yearOrPeriod) }
        : {}),
      ...(input.mediumOrMaterial !== undefined
        ? { mediumOrMaterial: normalizeOptionalText(input.mediumOrMaterial) }
        : {}),
      ...(input.wallLabelText !== undefined
        ? { wallLabelText: normalizeOptionalText(input.wallLabelText) }
        : {}),
      ...(input.manualContext !== undefined
        ? { manualContext: normalizeOptionalText(input.manualContext) }
        : {}),
      ...(input.confirmedFacts !== undefined
        ? { confirmedFacts: normalizeOptionalText(input.confirmedFacts) }
        : {}),
      ...(input.visualObservations !== undefined
        ? { visualObservations: normalizeOptionalText(input.visualObservations) }
        : {}),
      ...(input.reasonableSpeculation !== undefined
        ? {
            reasonableSpeculation: normalizeOptionalText(
              input.reasonableSpeculation
            )
          }
        : {}),
      ...(input.viewingFocus !== undefined
        ? { viewingFocus: normalizeOptionalText(input.viewingFocus) }
        : {}),
      ...(input.aiAnalysis !== undefined
        ? { aiAnalysis: normalizeOptionalText(input.aiAnalysis) }
        : {}),
      ...(input.designInspiration !== undefined
        ? { designInspiration: normalizeOptionalText(input.designInspiration) }
        : {}),
      ...(input.oneSentenceSummary !== undefined
        ? { oneSentenceSummary: normalizeOptionalText(input.oneSentenceSummary) }
        : {}),
      ...(input.personalRemarks !== undefined
        ? { personalRemarks: normalizeOptionalText(input.personalRemarks) }
        : {}),
      ...(input.followUpQuestions !== undefined
        ? { followUpQuestions: stringifyStringArray(input.followUpQuestions) }
        : {}),
      ...(input.informationConfidence !== undefined
        ? { informationConfidence: input.informationConfidence }
        : {})
    }
  });

  return toExhibitNote(note);
}

export async function listExhibitImagesByNote(exhibitNoteId: string) {
  const images = await prisma.exhibitImage.findMany({
    where: { exhibitNoteId },
    orderBy: { createdAt: "asc" }
  });

  return images.map(toExhibitImage);
}

export async function createExhibitImage(input: CreateExhibitImageInput) {
  const image = await prisma.exhibitImage.create({
    data: {
      exhibitNoteId: input.exhibitNoteId,
      filePath: input.filePath,
      originalFilename: normalizeOptionalText(input.originalFilename),
      mimeType: normalizeOptionalText(input.mimeType),
      width: input.width,
      height: input.height,
      imageRole: input.imageRole ?? "artwork"
    }
  });

  return toExhibitImage(image);
}
