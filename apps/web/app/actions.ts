"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAiProvider } from "@/lib/ai";
import { parseAnalysisMode } from "@/lib/ai/prompt";
import {
  createExhibitImage,
  createExhibitNote,
  createExhibitionSession,
  getExhibitNote,
  getExhibitionSession,
  listExhibitImagesByNote,
  updateExhibitNote
} from "@/lib/db/exhibitions";
import { normalizeImageRole } from "@/lib/db/serialization";
import { saveUploadedImage } from "@/lib/uploads/images";

function textValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function splitKeywords(value: string) {
  return value
    .split(/[,，]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function analysisErrorRedirect(sessionId: string, error: unknown): never {
  const message =
    error instanceof Error
      ? error.message
      : "AI analysis failed. Please try again.";

  redirect(
    `/sessions/${sessionId}?analysisError=${encodeURIComponent(message)}`
  );
}

export async function createExhibitionSessionAction(formData: FormData) {
  const title = textValue(formData, "title");

  if (!title) {
    redirect("/");
  }

  const session = await createExhibitionSession({
    title,
    venue: textValue(formData, "venue"),
    city: textValue(formData, "city"),
    visitDate: textValue(formData, "visitDate"),
    exhibitionType: textValue(formData, "exhibitionType"),
    keywords: splitKeywords(textValue(formData, "keywords"))
  });

  revalidatePath("/");
  redirect(`/sessions/${session.id}`);
}

export async function createExhibitNoteAction(formData: FormData) {
  const exhibitionSessionId = textValue(formData, "exhibitionSessionId");
  const redirectTo = textValue(formData, "redirectTo");

  if (!exhibitionSessionId) {
    redirect("/");
  }

  const note = await createExhibitNote({
    exhibitionSessionId,
    title: textValue(formData, "title"),
    artist: textValue(formData, "artist"),
    yearOrPeriod: textValue(formData, "yearOrPeriod"),
    mediumOrMaterial: textValue(formData, "mediumOrMaterial"),
    wallLabelText: textValue(formData, "wallLabelText"),
    manualContext: textValue(formData, "manualContext"),
    personalRemarks: textValue(formData, "personalRemarks")
  });

  revalidatePath(`/sessions/${exhibitionSessionId}`);
  if (redirectTo === "item") {
    redirect(`/items/${note.id}`);
  }
  redirect(`/sessions/${exhibitionSessionId}`);
}

export async function generateExhibitAnalysisAction(formData: FormData) {
  const noteId = textValue(formData, "noteId");
  const exhibitionSessionId = textValue(formData, "exhibitionSessionId");
  const analysisMode = parseAnalysisMode(textValue(formData, "analysisMode"));

  if (!noteId || !exhibitionSessionId) {
    redirect("/");
  }

  const [session, note] = await Promise.all([
    getExhibitionSession(exhibitionSessionId),
    getExhibitNote(noteId)
  ]);

  if (!session || !note || note.exhibitionSessionId !== session.id) {
    redirect(`/sessions/${exhibitionSessionId}`);
  }

  try {
    const result = await getAiProvider().analyzeExhibit({
      exhibitionSession: session,
      exhibitNote: note,
      images: await listExhibitImagesByNote(note.id),
      analysisMode
    });

    await updateExhibitNote(note.id, result);
  } catch (error) {
    analysisErrorRedirect(session.id, error);
  }

  revalidatePath(`/sessions/${session.id}`);
  redirect(`/sessions/${session.id}`);
}

export async function uploadExhibitImagesAction(formData: FormData) {
  const noteId = textValue(formData, "noteId");
  const exhibitionSessionId = textValue(formData, "exhibitionSessionId");
  const imageRole = normalizeImageRole(textValue(formData, "imageRole"));

  if (!noteId || !exhibitionSessionId) {
    redirect("/");
  }

  const note = await getExhibitNote(noteId);

  if (!note || note.exhibitionSessionId !== exhibitionSessionId) {
    redirect(`/sessions/${exhibitionSessionId}`);
  }

  const files = formData
    .getAll("images")
    .filter((value): value is File => value instanceof File && value.size > 0);

  if (files.length === 0) {
    redirect(`/sessions/${exhibitionSessionId}`);
  }

  for (const file of files) {
    const savedImage = await saveUploadedImage(file);
    await createExhibitImage({
      exhibitNoteId: note.id,
      filePath: savedImage.filePath,
      originalFilename: savedImage.originalFilename,
      mimeType: savedImage.mimeType,
      imageRole
    });
  }

  revalidatePath(`/sessions/${exhibitionSessionId}`);
  redirect(`/sessions/${exhibitionSessionId}`);
}
