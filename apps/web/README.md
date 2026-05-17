# Looksy Web

Mobile-first Next.js prototype for Looksy（中文概念名：看展搭子）.

For user deployment and usage instructions, read the repository root `README.md`. For Codex / development collaboration context, read the repository root `CODEX_NOTES.md`.

## Current Scope

This app now includes local SQLite persistence for exhibition sessions, text exhibit notes, local image upload, deterministic mock AI analysis, optional OpenAI analysis, and Markdown export. It does not implement hosted sync yet.

## Commands

```powershell
npm.cmd install --no-audit --no-fund
if (!(Test-Path .env)) { Copy-Item .env.example .env }
npm.cmd run db:generate
npm.cmd run db:migrate
npm.cmd run db:seed
npm.cmd run dev
```

Open `http://localhost:3000`.

This environment has been verified with Node.js `v24.15.0` and npm `11.12.1`.

## Mobile Workflow

1. Create a session from the home page.
2. Open the session and tap `添加展品笔记`.
3. Capture the minimum useful text first: title, wall-label text,现场观察, and personal remarks.
4. Upload exhibit photos or wall-label photos under the note.
5. Choose an analysis mode on a note card and tap `生成分析`.
6. Tap `导出 Markdown` from the session header to download an Obsidian-friendly `.md` file.

## Local Uploads

Uploaded images are stored locally under `public/uploads/exhibit-images/` and referenced from SQLite through public paths such as `/uploads/exhibit-images/example.jpg`. The upload folder is ignored by git except for its `.gitkeep` placeholder.

## AI Provider

Mock analysis is the default so local development does not spend API credits:

```env
AI_PROVIDER=mock
```

To use OpenAI for note analysis:

```env
AI_PROVIDER=openai
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-5.5
```

When `AI_PROVIDER=openai`, the app sends the note prompt and any uploaded note images to OpenAI only after you tap `生成分析`. If the API key is missing or the provider fails, the session page shows an error and existing note analysis is left unchanged.

Useful checks:

```powershell
npm.cmd run verify
```

`verify` runs Prisma generate, migration, seed, production build, and then typecheck in order. Keep this order because `next build` refreshes generated `.next/types`.

## Smoke Test Checklist

After `npm.cmd run dev`:

1. Open `http://localhost:3000`.
2. Create one exhibition session.
3. Add one exhibit note.
4. Upload one exhibit image.
5. Generate mock AI analysis.
6. Export Markdown.
7. Confirm the exported Markdown includes metadata, note content, AI analysis, design inspiration, follow-up questions, and image links.

On Windows PowerShell, use `npm.cmd` instead of `npm` if execution policy blocks `npm.ps1`.

Database helpers:

```powershell
npm.cmd run db:generate
npm.cmd run db:migrate
npm.cmd run db:seed
npm.cmd run db:studio
```

## Structure

- `app/` - Next.js App Router pages and global styles.
- `components/` - reusable UI components.
- `lib/` - local constants and helpers.
- `types/` - shared TypeScript types for the app surface.
- `prisma/` - SQLite schema and deterministic seed data.
- `data/sample-session-export.md` - deterministic sample Markdown export.
- `public/uploads/exhibit-images/` - local uploaded exhibit images.
