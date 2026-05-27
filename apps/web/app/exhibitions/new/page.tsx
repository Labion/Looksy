import Link from "next/link";
import { createExhibitionSessionAction } from "@/app/actions";

export default function NewExhibitionPage() {
  return (
    <main className="min-h-screen px-4 py-5 text-ink sm:px-5 sm:py-8">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
        <header className="rounded-lg bg-white/75 p-5 shadow-soft">
          <Link className="text-sm font-medium text-moss" href="/">
            返回首页
          </Link>
          <h1 className="mt-3 text-3xl font-bold leading-tight">新建看展记录</h1>
        </header>

        <section className="rounded-lg border border-ink/10 bg-white/75 p-5">
          <form action={createExhibitionSessionAction} className="grid gap-4">
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
              className="min-h-12 rounded-lg bg-ink px-5 py-3 text-base font-semibold text-white shadow-soft transition hover:bg-moss"
              type="submit"
            >
              新建看展记录
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
