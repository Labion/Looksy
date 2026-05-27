"use client";

import { useState } from "react";

type MarkdownExportPanelProps = {
  markdown: string;
  downloadHref: string;
  downloadLabel?: string;
};

export function MarkdownExportPanel({
  markdown,
  downloadHref,
  downloadLabel = "下载 Markdown"
}: MarkdownExportPanelProps) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">(
    "idle"
  );

  async function copyMarkdown() {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
  }

  return (
    <section className="rounded-lg border border-ink/10 bg-white/75 p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold">Markdown 预览</h2>
          <p className="mt-1 text-sm text-ink/60">
            可直接复制到 Obsidian / Notion，也可以下载为 `.md` 文件。
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            className="min-h-11 rounded-lg border border-moss/30 bg-white px-4 py-2 text-sm font-semibold text-moss transition hover:border-moss hover:bg-mist"
            onClick={copyMarkdown}
            type="button"
          >
            复制 Markdown
          </button>
          <a
            className="flex min-h-11 items-center justify-center rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-moss"
            href={downloadHref}
          >
            {downloadLabel}
          </a>
        </div>
      </div>
      {copyState !== "idle" ? (
        <p className="mt-3 text-sm text-ink/65">
          {copyState === "copied"
            ? "已复制到剪贴板。"
            : "复制失败，请手动选择下方内容。"}
        </p>
      ) : null}
      <pre className="mt-4 max-h-[70vh] overflow-auto rounded-lg border border-ink/10 bg-paper p-4 text-sm leading-6 text-ink/80">
        <code>{markdown}</code>
      </pre>
    </section>
  );
}
