import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownExportPanel } from "@/components/markdown-export-panel";
import {
  getExhibitionSession,
  listExhibitImagesByNote,
  listExhibitNotesBySession
} from "@/lib/db/exhibitions";
import { exportSessionToMarkdown } from "@/lib/export/markdown";

export const dynamic = "force-dynamic";

type ExportPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function SessionExportPage({ params }: ExportPageProps) {
  const { id } = await params;
  const session = await getExhibitionSession(id);

  if (!session) {
    notFound();
  }

  const notes = await listExhibitNotesBySession(session.id);
  const imageEntries = await Promise.all(
    notes.map(async (note) => [
      note.id,
      await listExhibitImagesByNote(note.id)
    ] as const)
  );
  const markdown = exportSessionToMarkdown({
    session,
    notes,
    imagesByNoteId: Object.fromEntries(imageEntries)
  });

  return (
    <main className="min-h-screen px-4 py-5 text-ink sm:px-5 sm:py-8">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
        <header className="rounded-lg bg-white/75 p-5 shadow-soft">
          <Link className="text-sm font-medium text-moss" href={`/sessions/${session.id}`}>
            返回看展记录
          </Link>
          <h1 className="mt-3 text-3xl font-bold leading-tight">
            导出：{session.title}
          </h1>
        </header>
        <MarkdownExportPanel
          downloadHref={`/sessions/${session.id}/export/download`}
          markdown={markdown}
        />
      </div>
    </main>
  );
}
