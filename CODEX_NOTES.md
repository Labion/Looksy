# Looksy Codex Notes

This file preserves the project and Codex collaboration context. It is for development agents and maintainers, not for end-user deployment instructions. For user setup and usage, read `README.md`.

## Project

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
├── CODEX_NOTES.md
├── HANDOFF.md
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

## Current Prototype Scope

The first runnable prototype lives in `apps/web`.

Current scope:

- Mobile-first Next.js app.
- Local SQLite persistence through Prisma.
- Exhibition session and exhibit note CRUD.
- Local image uploads.
- Deterministic mock AI analysis.
- Optional OpenAI provider behind environment variables.
- Markdown export for one exhibition session.

The current Windows development environment has been verified with Node.js `v24.15.0` and npm `11.12.1`.

## How to Use with Codex

1. Read `AGENTS.md`, `HANDOFF.md`, and the relevant files in `docs/`.
2. Check `apps/web/README.md` for app-specific commands.
3. Run `npm.cmd run verify` in `apps/web` before making product changes.
4. Keep tasks small and avoid introducing hosted services unless explicitly requested.

## Suggested First Codex Prompt

```text
请先阅读 AGENTS.md、README.md 和 docs/ 下的所有文档。

目标：为 Looksy（中文概念名：看展搭子）创建第一个可运行的个人 Web App 原型。

请只执行 codex_prompts/01_bootstrap.md 中的任务。
不要实现复杂 AI、不要做商业化后台、不要做硬件。
完成后说明改了哪些文件、如何运行、如何测试、下一步建议。
```

## Development Constraints

- Do not build commercial SaaS, public user accounts, payment, museum CMS, custom hardware, complex indoor positioning, large vector infrastructure, or custom model training unless explicitly requested.
- Keep model/provider logic isolated.
- Do not hardcode API keys.
- Prefer deterministic behavior for tests.
- Optimize for personal usability, not enterprise complexity.
