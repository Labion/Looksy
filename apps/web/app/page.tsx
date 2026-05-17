import Link from "next/link";
import { createExhibitionSessionAction } from "@/app/actions";
import { appInfo } from "@/lib/app-info";
import { listExhibitionSessions } from "@/lib/db/exhibitions";
import type { ExhibitionSession } from "@/types";

export const dynamic = "force-dynamic";

async function loadSessions() {
  try {
    return {
      dbReady: true,
      sessions: await listExhibitionSessions()
    };
  } catch (error) {
    console.error(error);
    return {
      dbReady: false,
      sessions: [] as ExhibitionSession[]
    };
  }
}

function formatDate(date?: Date) {
  return date
    ? new Intl.DateTimeFormat("zh-CN", {
        year: "numeric",
        month: "short",
        day: "numeric"
      }).format(date)
    : "未设置日期";
}

export default async function Home() {
  const { dbReady, sessions } = await loadSessions();

  return (
    <main className="min-h-screen px-4 py-5 text-ink sm:px-5 sm:py-8">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 sm:gap-6">
        <header className="rounded-lg bg-white/70 p-5 shadow-soft sm:p-6">
          <div className="mb-6 flex items-center justify-between">
            <span className="rounded-full bg-mist px-3 py-1 text-sm font-medium text-moss">
              {appInfo.chineseConceptName}
            </span>
            <span className="text-sm text-ink/60">Private prototype</span>
          </div>
          <h1 className="text-4xl font-bold leading-tight text-ink sm:text-5xl">
            {appInfo.name}
          </h1>
          <p className="mt-4 text-xl font-medium text-moss">{appInfo.tagline}</p>
          <p className="mt-4 text-base leading-7 text-ink/70">
            在展厅现场快速开启一次记录，把作品、展签、空间观察和个人灵感留在同一处。
          </p>
        </header>

        {!dbReady ? (
          <section className="rounded-lg border border-clay/30 bg-white/75 p-5">
            <h2 className="text-lg font-semibold">数据库尚未初始化</h2>
            <p className="mt-2 text-sm leading-6 text-ink/70">
              请先在 `apps/web` 中运行数据库迁移和 seed 命令，然后刷新页面。
            </p>
          </section>
        ) : null}

        {dbReady ? (
          <section
            className="rounded-lg border border-ink/10 bg-white/75 p-5"
            id="new-session"
          >
            <h2 className="text-lg font-semibold">新建看展记录</h2>
            <p className="mt-1 text-sm text-ink/60">
              只需要先填标题，其余信息可以晚点补。
            </p>
            <form
              action={createExhibitionSessionAction}
              className="mt-4 grid gap-4"
            >
              <label className="grid gap-2 text-sm font-medium">
                展览标题
                <input
                  className="min-h-12 rounded-lg border border-ink/15 bg-white px-3 text-base outline-none focus:border-moss"
                  name="title"
                  placeholder="例如：城市与材料的叙事"
                  required
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium">
                  场馆
                  <input
                    className="min-h-12 rounded-lg border border-ink/15 bg-white px-3 text-base outline-none focus:border-moss"
                    name="venue"
                    placeholder="美术馆 / 展厅"
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium">
                  城市
                  <input
                    className="min-h-12 rounded-lg border border-ink/15 bg-white px-3 text-base outline-none focus:border-moss"
                    name="city"
                    placeholder="Shanghai"
                  />
                </label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium">
                  日期
                  <input
                    className="min-h-12 rounded-lg border border-ink/15 bg-white px-3 text-base outline-none focus:border-moss"
                    name="visitDate"
                    type="date"
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium">
                  展览类型
                  <input
                    className="min-h-12 rounded-lg border border-ink/15 bg-white px-3 text-base outline-none focus:border-moss"
                    name="exhibitionType"
                    placeholder="艺术 / 建筑 / 设计"
                  />
                </label>
              </div>
              <label className="grid gap-2 text-sm font-medium">
                关键词
                <input
                  className="min-h-12 rounded-lg border border-ink/15 bg-white px-3 text-base outline-none focus:border-moss"
                  name="keywords"
                  placeholder="用逗号分隔，例如：材料，空间叙事"
                />
              </label>
              <button
                className="min-h-12 rounded-lg bg-ink px-5 py-3 text-base font-semibold text-white shadow-soft transition hover:bg-moss focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                type="submit"
              >
                新建看展记录
              </button>
            </form>
          </section>
        ) : null}

        <section
          className="rounded-lg border border-ink/10 bg-white/75 p-5"
          id="history"
        >
          <h2 className="text-lg font-semibold">历史记录</h2>
          {sessions.length > 0 ? (
            <div className="mt-4 grid gap-3">
              {sessions.map((session) => (
                <Link
                  className="rounded-lg border border-ink/10 bg-paper/70 p-4 transition hover:border-moss"
                  href={`/sessions/${session.id}`}
                  key={session.id}
                >
                  <h3 className="text-base font-semibold">{session.title}</h3>
                  <p className="mt-2 text-sm text-ink/65">
                    {[session.venue, session.city, formatDate(session.visitDate)]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                  {session.keywords.length > 0 ? (
                    <p className="mt-2 text-sm text-moss">
                      {session.keywords.join(" / ")}
                    </p>
                  ) : null}
                </Link>
              ))}
            </div>
          ) : (
            <div className="mt-4 rounded-lg border border-dashed border-ink/20 bg-paper/60 p-4">
              <p className="text-sm font-medium">没有看展记录</p>
              <p className="mt-2 text-sm leading-6 text-ink/65">
                下一次进展厅时，先创建一条记录，再逐步添加展品笔记。
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
