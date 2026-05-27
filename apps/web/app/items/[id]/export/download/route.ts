import {
  getExhibitNote,
  getExhibitionSession,
  listExhibitImagesByNote
} from "@/lib/db/exhibitions";
import {
  exportNoteToMarkdown,
  noteMarkdownFilename
} from "@/lib/export/markdown";

type ItemExportRouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, { params }: ItemExportRouteProps) {
  const { id } = await params;
  const note = await getExhibitNote(id);

  if (!note) {
    return new Response("Item not found", { status: 404 });
  }

  const [session, images] = await Promise.all([
    getExhibitionSession(note.exhibitionSessionId),
    listExhibitImagesByNote(note.id)
  ]);

  if (!session) {
    return new Response("Session not found", { status: 404 });
  }

  const markdown = exportNoteToMarkdown({ session, note, images });
  const filename = noteMarkdownFilename(note.title);

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(
        filename
      )}`
    }
  });
}
