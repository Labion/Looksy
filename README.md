# Looksy

Looksy（中文概念名：看展搭子）is a personal AI exhibition companion for art exhibitions, museums, architecture exhibitions, design shows, urban renewal exhibitions, and commercial exhibition spaces.

This project is intentionally lightweight. It is not a commercial museum SaaS and not a custom hardware product.

## Goal

Create a private mobile-first web tool that helps the user:

- Start an exhibition visit session.
- Capture artwork / exhibit / wall-label photos.
- Ask AI for structured analysis.
- Save personal exhibit notes.
- Extract architecture, urban, exhibition-design, material, and product inspiration.
- Export notes to Markdown for Obsidian / Notion / personal archives.

## Recommended MVP Stack

- Next.js
- TypeScript
- React
- Tailwind CSS
- SQLite + Prisma or Drizzle
- OpenAI / Gemini provider abstraction
- Markdown export

## Repository Structure

```text
.
├── AGENTS.md
├── README.md
├── .env.example
├── docs/
│   ├── PRODUCT_SPEC.md
│   ├── ARCHITECTURE.md
│   ├── DATA_MODEL.md
│   ├── ROADMAP.md
│   ├── MVP_TASKS.md
│   └── PROMPT_SYSTEM.md
├── codex_prompts/
│   ├── 01_bootstrap.md
│   ├── 02_data_model.md
│   ├── 03_ai_analysis.md
│   ├── 04_markdown_export.md
│   └── 05_mobile_polish.md
├── apps/
│   └── web/
├── packages/
│   └── core/
├── data/
│   └── samples/
└── scripts/
```

## Web App

The first runnable prototype lives in `apps/web`.

```powershell
cd apps/web
npm.cmd install --no-audit --no-fund
if (!(Test-Path .env)) { Copy-Item .env.example .env }
npm.cmd run db:generate
npm.cmd run db:migrate
npm.cmd run db:seed
npm.cmd run dev
```

Then open `http://localhost:3000`.

For a production sanity check:

```powershell
npm.cmd run verify
```

On Windows PowerShell, use `npm.cmd` instead of `npm` if execution policy blocks `npm.ps1`.

Current prototype scope: mobile-first session and text-note CRUD with local SQLite, local image upload, deterministic mock AI analysis, optional OpenAI analysis, and Markdown export.

The current Windows development environment has been verified with Node.js `v24.15.0` and npm `11.12.1`.

`verify` runs database generation, migration, seed, production build, and then typecheck in order.

## AI Provider

The default provider is deterministic and local:

```env
AI_PROVIDER=mock
```

To call OpenAI when tapping `生成分析`, set:

```env
AI_PROVIDER=openai
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-5.5
```

Uploaded images are only sent to OpenAI when you explicitly generate analysis for a note. Missing `OPENAI_API_KEY` produces an on-page error and does not overwrite existing analysis fields.

## How to Use with Codex

1. Create a new Git repository.
2. Copy this framework into the repository root.
3. Open the repo in Codex CLI or Codex cloud.
4. Ask Codex to read `AGENTS.md` and `docs/` first.
5. Start with `codex_prompts/01_bootstrap.md`.

## Suggested First Codex Prompt

```text
请先阅读 AGENTS.md、README.md 和 docs/ 下的所有文档。

目标：为 Looksy（中文概念名：看展搭子）创建第一个可运行的个人 Web App 原型。

请只执行 codex_prompts/01_bootstrap.md 中的任务。
不要实现复杂 AI、不要做商业化后台、不要做硬件。
完成后说明改了哪些文件、如何运行、如何测试、下一步建议。
```
