import {
  getExhibitionSession,
  listExhibitImagesByNote,
  listExhibitNotesBySession
} from "@/lib/db/exhibitions";
import {
  exportSessionToMarkdown,
  markdownFilename
} from "@/lib/export/markdown";

type ExportRouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, { params }: ExportRouteProps) {
  const { id } = await params;
  const session = await getExhibitionSession(id);

  if (!session) {
    return new Response("Session not found", { status: 404 });
  }

  const notes = await listExhibitNotesBySession(session.id);
  const imageEntries = await Promise.all(
    notes.map(async (note) => [note.id, await listExhibitImagesByNote(note.id)] as const)
  );
  const imagesByNoteId = Object.fromEntries(imageEntries);
  const markdown = exportSessionToMarkdown({ session, notes, imagesByNoteId });
  const filename = markdownFilename(session.title);

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(
        filename
      )}`
    }
  });
}
