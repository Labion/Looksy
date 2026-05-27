import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownExportPanel } from "@/components/markdown-export-panel";
import {
  getExhibitNote,
  getExhibitionSession,
  listExhibitImagesByNote
} from "@/lib/db/exhibitions";
import { exportNoteToMarkdown } from "@/lib/export/markdown";

export const dynamic = "force-dynamic";

type ItemExportPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ItemExportPage({ params }: ItemExportPageProps) {
  const { id } = await params;
  const note = await getExhibitNote(id);

  if (!note) {
    notFound();
  }

  const [session, images] = await Promise.all([
    getExhibitionSession(note.exhibitionSessionId),
    listExhibitImagesByNote(note.id)
  ]);

  if (!session) {
    notFound();
  }

  const markdown = exportNoteToMarkdown({ session, note, images });

  return (
    <main className="min-h-screen px-4 py-5 text-ink sm:px-5 sm:py-8">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
        <header className="rounded-lg bg-white/75 p-5 shadow-soft">
          <Link className="text-sm font-medium text-moss" href={`/items/${note.id}`}>
            返回展品笔记
          </Link>
          <h1 className="mt-3 text-3xl font-bold leading-tight">
            导出：{note.title ?? "未命名展品笔记"}
          </h1>
        </header>
        <MarkdownExportPanel
          downloadHref={`/items/${note.id}/export/download`}
          markdown={markdown}
        />
      </div>
    </main>
  );
}
