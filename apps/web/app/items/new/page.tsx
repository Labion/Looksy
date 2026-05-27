import Link from "next/link";
import { createExhibitNoteAction } from "@/app/actions";
import {
  getExhibitionSession,
  listExhibitionSessions
} from "@/lib/db/exhibitions";

export const dynamic = "force-dynamic";

type NewItemPageProps = {
  searchParams?: Promise<{
    sessionId?: string;
  }>;
};

export default async function NewItemPage({ searchParams }: NewItemPageProps) {
  const resolvedSearchParams = await searchParams;
  const sessions = await listExhibitionSessions();
  const selectedSession =
    resolvedSearchParams?.sessionId
      ? await getExhibitionSession(resolvedSearchParams.sessionId)
      : null;

  return (
    <main className="min-h-screen px-4 py-5 text-ink sm:px-5 sm:py-8">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
        <header className="rounded-lg bg-white/75 p-5 shadow-soft">
          <Link
            className="text-sm font-medium text-moss"
            href={selectedSession ? `/sessions/${selectedSession.id}` : "/"}
          >
            {selectedSession ? "返回看展记录" : "返回首页"}
          </Link>
          <h1 className="mt-3 text-3xl font-bold leading-tight">新增展品笔记</h1>
          <p className="mt-2 text-sm leading-6 text-ink/65">
            {selectedSession
              ? `所属展览：${selectedSession.title}`
              : "请选择要归属的看展记录。"}
          </p>
        </header>

        <section className="rounded-lg border border-ink/10 bg-white/75 p-5">
          {sessions.length > 0 ? (
            <form action={createExhibitNoteAction} className="grid gap-3">
              <input name="redirectTo" type="hidden" value="item" />
              <label className="grid gap-2 text-sm font-medium">
                所属看展记录
                <select
                  className="min-h-12 rounded-lg border border-ink/15 bg-white px-3 text-base outline-none focus:border-moss"
                  defaultValue={selectedSession?.id ?? sessions[0]?.id}
                  name="exhibitionSessionId"
                >
                  {sessions.map((session) => (
                    <option key={session.id} value={session.id}>
                      {session.title}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-sm font-medium">
                标题
                <input
                  className="min-h-12 rounded-lg border border-ink/15 bg-white px-3 text-base outline-none focus:border-moss"
                  name="title"
                  placeholder="作品、展签、空间或细节名称"
                />
              </label>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium">
                  作者 / 创作者
                  <input
                    className="min-h-12 rounded-lg border border-ink/15 bg-white px-3 text-base outline-none focus:border-moss"
                    name="artist"
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium">
                  年代 / 时期
                  <input
                    className="min-h-12 rounded-lg border border-ink/15 bg-white px-3 text-base outline-none focus:border-moss"
                    name="yearOrPeriod"
                  />
                </label>
              </div>
              <label className="grid gap-2 text-sm font-medium">
                材料 / 媒介
                <input
                  className="min-h-12 rounded-lg border border-ink/15 bg-white px-3 text-base outline-none focus:border-moss"
                  name="mediumOrMaterial"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium">
                展签文字
                <textarea
                  className="min-h-24 rounded-lg border border-ink/15 bg-white px-3 py-3 text-base outline-none focus:border-moss"
                  name="wallLabelText"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium">
                现场观察
                <textarea
                  className="min-h-24 rounded-lg border border-ink/15 bg-white px-3 py-3 text-base outline-none focus:border-moss"
                  name="manualContext"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium">
                个人备注
                <textarea
                  className="min-h-24 rounded-lg border border-ink/15 bg-white px-3 py-3 text-base outline-none focus:border-moss"
                  name="personalRemarks"
                />
              </label>
              <button
                className="min-h-12 rounded-lg bg-ink px-5 py-3 text-base font-semibold text-white shadow-soft transition hover:bg-moss"
                type="submit"
              >
                添加展品笔记
              </button>
            </form>
          ) : (
            <div className="rounded-lg border border-dashed border-ink/20 bg-paper/60 p-4">
              <p className="text-sm font-medium">还没有看展记录</p>
              <Link
                className="mt-3 inline-flex text-sm font-semibold text-moss"
                href="/exhibitions/new"
              >
                先新建看展记录
              </Link>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
