import Link from "next/link";
import { notFound } from "next/navigation";
import {
  generateExhibitAnalysisAction,
  uploadExhibitImagesAction
} from "@/app/actions";
import {
  getExhibitNote,
  getExhibitionSession,
  listExhibitImagesByNote
} from "@/lib/db/exhibitions";
import type { AnalysisMode, ImageRole } from "@/types";

export const dynamic = "force-dynamic";

type ItemPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const analysisModes: Array<{ value: AnalysisMode; label: string }> = [
  { value: "default", label: "默认看展分析" },
  { value: "wall_label", label: "展签解读" },
  { value: "exhibition_space", label: "展陈空间分析" },
  { value: "architecture_design", label: "建筑 / 城市 / 材料启发" },
  { value: "quick_note", label: "快速笔记" },
  { value: "deep_review", label: "深度复盘" }
];

const imageRoles: Array<{ value: ImageRole; label: string }> = [
  { value: "artwork", label: "展品照片" },
  { value: "wall_label", label: "展签照片" },
  { value: "gallery_scene", label: "展厅场景" },
  { value: "detail", label: "细节照片" },
  { value: "other", label: "其他" }
];

export default async function ItemPage({ params }: ItemPageProps) {
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

  return (
    <main className="min-h-screen px-4 py-5 pb-24 text-ink sm:px-5 sm:py-8">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
        <header className="rounded-lg bg-white/75 p-5 shadow-soft">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link className="text-sm font-medium text-moss" href={`/sessions/${session.id}`}>
              返回看展记录
            </Link>
            <Link
              className="rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm font-semibold text-ink transition hover:border-moss hover:text-moss"
              href={`/items/${note.id}/export`}
            >
              导出单条 Markdown
            </Link>
          </div>
          <p className="mt-4 text-sm font-medium text-clay">展品笔记 #{note.sequenceNumber}</p>
          <h1 className="mt-2 text-3xl font-bold leading-tight">
            {note.title ?? "未命名展品笔记"}
          </h1>
          <p className="mt-3 text-sm leading-6 text-ink/65">
            所属展览：{session.title}
          </p>
        </header>

        {images.length > 0 ? (
          <section className="grid grid-cols-2 gap-3 rounded-lg border border-ink/10 bg-white/75 p-4 sm:grid-cols-3">
            {images.map((image) => (
              <figure
                className="overflow-hidden rounded-lg border border-ink/10 bg-white"
                key={image.id}
              >
                <img
                  alt={image.originalFilename ?? "展品图片"}
                  className="aspect-square w-full object-cover"
                  src={image.filePath}
                />
                <figcaption className="px-2 py-2 text-xs leading-5 text-ink/60">
                  {imageRoles.find((role) => role.value === image.imageRole)?.label ?? "图片"}
                </figcaption>
              </figure>
            ))}
          </section>
        ) : null}

        <section className="rounded-lg border border-ink/10 bg-white/75 p-5">
          <dl className="grid gap-3 text-sm leading-6">
            <div>
              <dt className="font-semibold">作者 / 创作者</dt>
              <dd className="text-ink/70">{note.artist ?? "未记录"}</dd>
            </div>
            <div>
              <dt className="font-semibold">年代 / 时期</dt>
              <dd className="text-ink/70">{note.yearOrPeriod ?? "未记录"}</dd>
            </div>
            <div>
              <dt className="font-semibold">材料 / 媒介</dt>
              <dd className="text-ink/70">{note.mediumOrMaterial ?? "未记录"}</dd>
            </div>
            <div>
              <dt className="font-semibold">展签文字</dt>
              <dd className="whitespace-pre-line text-ink/70">
                {note.wallLabelText ?? "未记录"}
              </dd>
            </div>
            <div>
              <dt className="font-semibold">现场观察</dt>
              <dd className="whitespace-pre-line text-ink/70">
                {note.manualContext ?? "未记录"}
              </dd>
            </div>
            <div>
              <dt className="font-semibold">个人备注</dt>
              <dd className="whitespace-pre-line text-ink/70">
                {note.personalRemarks ?? "未记录"}
              </dd>
            </div>
          </dl>
        </section>

        <form
          action={uploadExhibitImagesAction}
          className="grid gap-3 rounded-lg border border-ink/10 bg-white/75 p-5"
        >
          <input name="exhibitionSessionId" type="hidden" value={session.id} />
          <input name="noteId" type="hidden" value={note.id} />
          <label className="grid gap-2 text-sm font-medium">
            添加照片
            <input
              accept="image/*"
              className="min-h-11 rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm outline-none file:mr-3 file:rounded-md file:border-0 file:bg-mist file:px-3 file:py-2 file:text-sm file:font-semibold file:text-moss focus:border-moss"
              multiple
              name="images"
              type="file"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            图片类型
            <select
              className="min-h-11 rounded-lg border border-ink/15 bg-white px-3 text-base outline-none focus:border-moss"
              name="imageRole"
            >
              {imageRoles.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </label>
          <button className="min-h-11 rounded-lg border border-moss/30 bg-white px-4 py-2 text-sm font-semibold text-moss transition hover:border-moss hover:bg-mist" type="submit">
            上传到这条笔记
          </button>
        </form>

        <form
          action={generateExhibitAnalysisAction}
          className="grid gap-3 rounded-lg border border-ink/10 bg-white/75 p-5 sm:grid-cols-[1fr_auto] sm:items-end"
        >
          <input name="exhibitionSessionId" type="hidden" value={session.id} />
          <input name="noteId" type="hidden" value={note.id} />
          <label className="grid gap-2 text-sm font-medium">
            分析模式
            <select
              className="min-h-11 rounded-lg border border-ink/15 bg-white px-3 text-base outline-none focus:border-moss"
              name="analysisMode"
            >
              {analysisModes.map((mode) => (
                <option key={mode.value} value={mode.value}>
                  {mode.label}
                </option>
              ))}
            </select>
          </label>
          <button className="min-h-11 rounded-lg bg-moss px-4 py-2 text-sm font-semibold text-white transition hover:bg-ink sm:min-w-28" type="submit">
            生成分析
          </button>
        </form>

        {note.aiAnalysis ? (
          <section className="grid gap-3 rounded-lg border border-moss/20 bg-white/75 p-5">
            <h2 className="text-lg font-semibold text-moss">AI 结构化分析</h2>
            <p className="whitespace-pre-line text-sm leading-6 text-ink/70">
              {note.aiAnalysis}
            </p>
          </section>
        ) : null}
      </div>
    </main>
  );
}
