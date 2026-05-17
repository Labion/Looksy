# Looksy Handoff

## Project

Looksy（中文概念名：看展搭子）is a personal AI exhibition companion for art exhibitions, museums, architecture exhibitions, design shows, urban renewal exhibitions, and urban/public-space observations.

This is a private personal-use web app, not a commercial SaaS, museum CMS, hardware product, or public app.

## Current Status

Implemented so far:

- Project renamed to `Looksy`.
- Next.js + TypeScript + Tailwind app under `apps/web`.
- Node.js on this device has been upgraded to `v24.15.0`; npm is `11.12.1`.
- Dependencies are installed and `apps/web/package-lock.json` exists.
- SQLite + Prisma schema for:
  - `ExhibitionSession`
  - `ExhibitNote`
  - `ExhibitImage`
- Initial Prisma migration exists under `apps/web/prisma/migrations/`.
- Basic CRUD helpers for sessions and notes.
- Session list and session detail UI.
- Text exhibit note creation.
- Local image upload for exhibit notes.
- Uploaded images stored under `apps/web/public/uploads/exhibit-images/`.
- Uploaded image paths saved in SQLite.
- Mock AI provider:
  - AI provider interface
  - prompt builder
  - deterministic Chinese structured mock analysis
  - saved back to note fields
- Markdown export:
  - `exportSessionToMarkdown`
  - `GET /sessions/[id]/export`
  - includes session metadata, notes, AI analysis, personal remarks, design inspiration, follow-up questions, and image links
- Mobile polish:
  - shorter note form
  - prominent add-note action
  - clearer empty states
  - mobile-friendly buttons/forms
- Optional OpenAI provider:
  - `AI_PROVIDER=mock|openai`
  - default stays `mock`
  - OpenAI uses `OPENAI_API_KEY` and `OPENAI_MODEL`

## Current Environment Status

The current device has passed:

```powershell
npm.cmd run typecheck
npm.cmd run build
```

The local SQLite database is development-only and should be recreated from migrations when needed.

## Setup On New Device

From repo root:

```powershell
cd apps/web
npm.cmd install --no-audit --no-fund
if (!(Test-Path .env)) { Copy-Item .env.example .env }
npm.cmd run db:generate
npm.cmd run db:migrate
npm.cmd run db:seed
npm.cmd run verify
npm.cmd run typecheck
npm.cmd run build
npm.cmd run dev
```

Open:

```text
http://localhost:3000
```

## If npm Registry Fails

If behind a proxy, configure npm with the active local proxy port, for example:

```powershell
npm.cmd config set proxy http://127.0.0.1:20080
npm.cmd config set https-proxy http://127.0.0.1:20080
npm.cmd config set registry https://registry.npmjs.org/
npm.cmd view next version
```

If npmjs is blocked, try:

```powershell
npm.cmd config set registry https://registry.npmmirror.com
npm.cmd view next version
```

If PowerShell blocks `npm.ps1`, use `npm.cmd`, not `npm`.

## Manual Smoke Test

After `npm.cmd run dev`:

1. Open home page.
2. Create a new exhibition session.
3. Open session detail page.
4. Add an exhibit note.
5. Upload one exhibit image and one wall-label image.
6. Generate mock AI analysis.
7. Confirm structured Chinese analysis appears.
8. Export Markdown from the session header.
9. Confirm downloaded `.md` includes:
   - exhibition metadata
   - exhibit notes
   - AI analysis
   - personal remarks
   - design inspiration
   - follow-up questions
   - image links

## Reliable Verification

Use the dedicated verification script before product changes:

```powershell
cd apps/web
npm.cmd run verify
```

`verify` intentionally runs build before typecheck because `next build` refreshes generated `.next/types`.

## Key Files

Read these first:

- `AGENTS.md`
- `README.md`
- `docs/PRODUCT_SPEC.md`
- `docs/ARCHITECTURE.md`
- `docs/DATA_MODEL.md`
- `docs/MVP_TASKS.md`
- `docs/PROMPT_SYSTEM.md`
- `apps/web/README.md`

Core implementation:

- `apps/web/prisma/schema.prisma`
- `apps/web/prisma/seed.mjs`
- `apps/web/types/index.ts`
- `apps/web/lib/db/exhibitions.ts`
- `apps/web/lib/db/prisma.ts`
- `apps/web/lib/db/serialization.ts`
- `apps/web/lib/ai/provider.ts`
- `apps/web/lib/ai/prompt.ts`
- `apps/web/lib/ai/mock-provider.ts`
- `apps/web/lib/uploads/images.ts`
- `apps/web/lib/export/markdown.ts`
- `apps/web/app/actions.ts`
- `apps/web/app/page.tsx`
- `apps/web/app/sessions/[id]/page.tsx`
- `apps/web/app/sessions/[id]/export/route.ts`

## Important Constraints

Do not add unless explicitly requested:

- commercial SaaS features
- public user accounts
- payment/ticketing/membership
- museum CMS
- custom hardware
- complex indoor positioning
- large vector search infrastructure
- custom model training

Keep model/provider logic isolated. Do not hardcode API keys.

## Suggested Next Codex Prompt

```text
请先阅读 AGENTS.md、README.md、docs/、codex_prompts/ 和 apps/web/README.md。

当前 Looksy 已实现：
- Next.js/Tailwind 原型
- SQLite/Prisma 数据模型
- session/note CRUD
- 本地图片上传
- mock AI 分析
- Markdown 导出
- 移动端基础优化

请先运行：
npm.cmd install --no-audit --no-fund
npm.cmd run db:generate
npm.cmd run db:migrate
npm.cmd run db:seed
npm.cmd run typecheck
npm.cmd run build

然后修复 typecheck/build 暴露的问题。不要新增复杂功能，先保证现有 MVP 跑通。
```

## Recommended Next Work

Priority 1:

- Keep dependencies and Prisma migrations reproducible.
- Run `npm.cmd run verify` before product changes.
- Fix compile/runtime issues before adding features.

Priority 2:

- Run app locally.
- Complete manual smoke test.

Priority 3:

- Improve tests for prompt building, Markdown export, and API/server actions.
