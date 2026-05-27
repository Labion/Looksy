import Link from "next/link";
import { notFound } from "next/navigation";
import {
  createExhibitNoteAction,
  generateExhibitAnalysisAction,
  uploadExhibitImagesAction
} from "@/app/actions";
import {
  getExhibitionSession,
  listExhibitImagesByNote,
  listExhibitNotesBySession
} from "@/lib/db/exhibitions";
import type { AnalysisMode, ImageRole } from "@/types";

export const dynamic = "force-dynamic";

type SessionPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams?: Promise<{
    analysisError?: string;
  }>;
};

function formatDate(date?: Date) {
  return date
    ? new Intl.DateTimeFormat("zh-CN", {
        year: "numeric",
        month: "short",
        day: "numeric"
      }).format(date)
    : "未设置日期";
}

const analysisModes: Array<{
  value: AnalysisMode;
  label: string;
}> = [
  { value: "default", label: "默认看展分析" },
  { value: "wall_label", label: "展签解读" },
  { value: "exhibition_space", label: "展陈空间分析" },
  { value: "architecture_design", label: "建筑 / 城市 / 材料启发" },
  { value: "quick_note", label: "快速笔记" },
  { value: "deep_review", label: "深度复盘" }
];

const imageRoles: Array<{
  value: ImageRole;
  label: string;
}> = [
  { value: "artwork", label: "展品照片" },
  { value: "wall_label", label: "展签照片" },
  { value: "gallery_scene", label: "展厅场景" },
  { value: "detail", label: "细节照片" },
  { value: "other", label: "其他" }
];

export default async function SessionPage({
  params,
  searchParams
}: SessionPageProps) {
  const { id } = await params;
  const resolvedSearchParams = await searchParams;
  const session = await getExhibitionSession(id);

  if (!session) {
    notFound();
  }

  const notes = await listExhibitNotesBySession(session.id);
  const imageEntries = await Promise.all(
    notes.map(async (note) => [note.id, await listExhibitImagesByNote(note.id)] as const)
  );
  const imagesByNoteId = new Map(imageEntries);

  return (
    <main className="min-h-screen px-4 py-5 pb-24 text-ink sm:px-5 sm:py-8">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 sm:gap-6">
        <header className="rounded-lg bg-white/75 p-5 shadow-soft sm:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <Link className="text-sm font-medium text-moss" href="/">
              返回首页
            </Link>
            <a
              className="rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm font-semibold text-ink transition hover:border-moss hover:text-moss"
              href={`/sessions/${session.id}/export`}
            >
              导出 Markdown
            </a>
          </div>
          <p className="text-sm font-medium text-clay">看展记录</p>
          <h1 className="mt-2 text-3xl font-bold leading-tight">
            {session.title}
          </h1>
          <p className="mt-3 text-sm leading-6 text-ink/65">
            {[session.venue, session.city, formatDate(session.visitDate)]
              .filter(Boolean)
              .join(" · ")}
          </p>
          {session.keywords.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {session.keywords.map((keyword) => (
                <span
                  className="rounded-full bg-mist px-3 py-1 text-sm text-moss"
                  key={keyword}
                >
                  {keyword}
                </span>
              ))}
            </div>
          ) : null}
          <a
            className="mt-5 flex min-h-12 w-full items-center justify-center rounded-lg bg-ink px-5 py-3 text-base font-semibold text-white shadow-soft transition hover:bg-moss"
            href={`/items/new?sessionId=${session.id}`}
          >
            添加展品笔记
          </a>
        </header>

        {resolvedSearchParams?.analysisError ? (
          <section className="rounded-lg border border-clay/30 bg-white/80 p-4">
            <h2 className="text-sm font-semibold text-clay">AI 分析未完成</h2>
            <p className="mt-2 text-sm leading-6 text-ink/70">
              {resolvedSearchParams.analysisError}
            </p>
          </section>
        ) : null}

        <section
          className="rounded-lg border border-ink/10 bg-white/75 p-5"
          id="add-note"
        >
          <h2 className="text-lg font-semibold">添加展品笔记</h2>
          <p className="mt-1 text-sm text-ink/60">
            先记标题、展签和现场观察；作者、年代、材料可以展开后补。
          </p>
          <form action={createExhibitNoteAction} className="mt-4 grid gap-3">
            <input name="exhibitionSessionId" type="hidden" value={session.id} />
            <label className="grid gap-2 text-sm font-medium">
              标题
              <input
                className="min-h-12 rounded-lg border border-ink/15 bg-white px-3 text-base outline-none focus:border-moss"
                name="title"
                placeholder="作品、展签、空间或细节名称"
              />
            </label>
            <details className="rounded-lg border border-ink/10 bg-paper/60 p-3">
              <summary className="cursor-pointer text-sm font-semibold text-moss">
                补充作者、年代、材料
              </summary>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium">
                  作者 / 创作者
                  <input
                    className="min-h-12 rounded-lg border border-ink/15 bg-white px-3 text-base outline-none focus:border-moss"
                    name="artist"
                    placeholder="可留空"
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium">
                  年代 / 时期
                  <input
                    className="min-h-12 rounded-lg border border-ink/15 bg-white px-3 text-base outline-none focus:border-moss"
                    name="yearOrPeriod"
                    placeholder="可留空"
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium sm:col-span-2">
                  材料 / 媒介
                  <input
                    className="min-h-12 rounded-lg border border-ink/15 bg-white px-3 text-base outline-none focus:border-moss"
                    name="mediumOrMaterial"
                    placeholder="例如：影像、木、金属、混合材料"
                  />
                </label>
              </div>
            </details>
            <label className="grid gap-2 text-sm font-medium">
              展签文字
              <textarea
                className="min-h-24 rounded-lg border border-ink/15 bg-white px-3 py-3 text-base outline-none focus:border-moss"
                name="wallLabelText"
                placeholder="先手动输入展签，后续再接入图片识别和 AI 分析。"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium">
              现场观察
              <textarea
                className="min-h-24 rounded-lg border border-ink/15 bg-white px-3 py-3 text-base outline-none focus:border-moss"
                name="manualContext"
                placeholder="构图、材质、光线、空间关系、动线等。"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium">
              个人备注
              <textarea
                className="min-h-24 rounded-lg border border-ink/15 bg-white px-3 py-3 text-base outline-none focus:border-moss"
                name="personalRemarks"
                placeholder="自己的感受、灵感或后续想查的问题。"
              />
            </label>
            <button
              className="min-h-12 rounded-lg bg-ink px-5 py-3 text-base font-semibold text-white shadow-soft transition hover:bg-moss focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              type="submit"
            >
              添加展品笔记
            </button>
          </form>
        </section>

        <section className="rounded-lg border border-ink/10 bg-white/75 p-5">
          <h2 className="text-lg font-semibold">展品笔记</h2>
          {notes.length > 0 ? (
            <div className="mt-4 grid gap-3">
              {notes.map((note) => (
                <article
                  className="rounded-lg border border-ink/10 bg-paper/70 p-4"
                  key={note.id}
                >
                  {(() => {
                    const images = imagesByNoteId.get(note.id) ?? [];

                    return images.length > 0 ? (
                      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
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
                              {imageRoles.find(
                                (role) => role.value === image.imageRole
                              )?.label ?? "图片"}
                              {image.originalFilename
                                ? ` · ${image.originalFilename}`
                                : ""}
                            </figcaption>
                          </figure>
                        ))}
                      </div>
                    ) : null;
                  })()}

                  <p className="text-sm font-medium text-clay">
                    #{note.sequenceNumber}
                  </p>
                  <h3 className="mt-1 text-base font-semibold">
                    {note.title ?? "未命名展品笔记"}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Link
                      className="rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm font-semibold text-ink transition hover:border-moss hover:text-moss"
                      href={`/items/${note.id}`}
                    >
                      打开详情
                    </Link>
                    <Link
                      className="rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm font-semibold text-ink transition hover:border-moss hover:text-moss"
                      href={`/items/${note.id}/export`}
                    >
                      导出单条
                    </Link>
                  </div>
                  {[note.artist, note.yearOrPeriod, note.mediumOrMaterial].some(
                    Boolean
                  ) ? (
                    <p className="mt-2 text-sm text-ink/65">
                      {[note.artist, note.yearOrPeriod, note.mediumOrMaterial]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  ) : null}
                  {note.wallLabelText ? (
                    <p className="mt-3 text-sm leading-6 text-ink/70">
                      展签：{note.wallLabelText}
                    </p>
                  ) : null}
                  {note.manualContext ? (
                    <p className="mt-3 text-sm leading-6 text-ink/70">
                      观察：{note.manualContext}
                    </p>
                  ) : null}
                  {note.personalRemarks ? (
                    <p className="mt-3 text-sm leading-6 text-ink/70">
                      备注：{note.personalRemarks}
                    </p>
                  ) : null}

                  <form
                    action={uploadExhibitImagesAction}
                    className="mt-4 grid gap-3 rounded-lg border border-ink/10 bg-white/70 p-3"
                  >
                    <input
                      name="exhibitionSessionId"
                      type="hidden"
                      value={session.id}
                    />
                    <input name="noteId" type="hidden" value={note.id} />
                    <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
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
                    </div>
                    <button
                      className="min-h-11 rounded-lg border border-moss/30 bg-white px-4 py-2 text-sm font-semibold text-moss transition hover:border-moss hover:bg-mist focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moss"
                      type="submit"
                    >
                      上传到这条笔记
                    </button>
                  </form>

                  <form
                    action={generateExhibitAnalysisAction}
                    className="mt-4 grid gap-3 rounded-lg border border-ink/10 bg-white/70 p-3 sm:grid-cols-[1fr_auto] sm:items-end"
                  >
                    <input
                      name="exhibitionSessionId"
                      type="hidden"
                      value={session.id}
                    />
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
                    <button
                      className="min-h-11 rounded-lg bg-moss px-4 py-2 text-sm font-semibold text-white transition hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moss sm:min-w-28"
                      type="submit"
                    >
                      生成分析
                    </button>
                  </form>

                  {note.aiAnalysis ? (
                    <div className="mt-4 grid gap-3 rounded-lg border border-moss/20 bg-white/75 p-4">
                      <h4 className="text-sm font-semibold text-moss">
                        AI 结构化分析
                      </h4>
                      {note.confirmedFacts ? (
                        <section>
                          <h5 className="text-sm font-semibold">确定信息</h5>
                          <p className="mt-1 whitespace-pre-line text-sm leading-6 text-ink/70">
                            {note.confirmedFacts}
                          </p>
                        </section>
                      ) : null}
                      {note.visualObservations ? (
                        <section>
                          <h5 className="text-sm font-semibold">
                            基于记录的观察
                          </h5>
                          <p className="mt-1 whitespace-pre-line text-sm leading-6 text-ink/70">
                            {note.visualObservations}
                          </p>
                        </section>
                      ) : null}
                      {note.reasonableSpeculation ? (
                        <section>
                          <h5 className="text-sm font-semibold">合理推测</h5>
                          <p className="mt-1 whitespace-pre-line text-sm leading-6 text-ink/70">
                            {note.reasonableSpeculation}
                          </p>
                        </section>
                      ) : null}
                      {note.viewingFocus ? (
                        <section>
                          <h5 className="text-sm font-semibold">现场观看重点</h5>
                          <p className="mt-1 whitespace-pre-line text-sm leading-6 text-ink/70">
                            {note.viewingFocus}
                          </p>
                        </section>
                      ) : null}
                      <section>
                        <h5 className="text-sm font-semibold">完整分析</h5>
                        <p className="mt-1 whitespace-pre-line text-sm leading-6 text-ink/70">
                          {note.aiAnalysis}
                        </p>
                      </section>
                      {note.designInspiration ? (
                        <section>
                          <h5 className="text-sm font-semibold">
                            建筑 / 城市 / 展陈 / 设计启发
                          </h5>
                          <p className="mt-1 whitespace-pre-line text-sm leading-6 text-ink/70">
                            {note.designInspiration}
                          </p>
                        </section>
                      ) : null}
                      {note.oneSentenceSummary ? (
                        <section>
                          <h5 className="text-sm font-semibold">一句话总结</h5>
                          <p className="mt-1 text-sm leading-6 text-ink/70">
                            {note.oneSentenceSummary}
                          </p>
                        </section>
                      ) : null}
                      {note.followUpQuestions.length > 0 ? (
                        <section>
                          <h5 className="text-sm font-semibold">
                            可以继续追问
                          </h5>
                          <ul className="mt-1 grid gap-1 text-sm leading-6 text-ink/70">
                            {note.followUpQuestions.map((question) => (
                              <li key={question}>{question}</li>
                            ))}
                          </ul>
                        </section>
                      ) : null}
                    </div>
                  ) : (
                    <p className="mt-3 rounded-lg border border-dashed border-ink/15 bg-white/60 p-3 text-sm leading-6 text-ink/60">
                      没有 AI 分析。选择一个分析模式后点击“生成分析”，会先用 mock
                      provider 生成结构化中文结果。
                    </p>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-4 rounded-lg border border-dashed border-ink/20 bg-paper/60 p-4">
              <p className="text-sm font-medium">没有展品笔记</p>
              <p className="mt-2 text-sm leading-6 text-ink/65">
                先添加一条文字笔记，之后可以立即生成 mock AI 分析并导出 Markdown。
              </p>
              <a className="mt-3 inline-flex text-sm font-semibold text-moss" href="#add-note">
                去添加第一条
              </a>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
