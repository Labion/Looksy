# Looksy MVP Goal

## Project

Project name: **Looksy**

Chinese concept: **看展搭子**

Looksy is a personal AI companion for exhibitions, museums, galleries, architecture shows, design shows, and curious walks.

This is a **personal tool**, not a commercial SaaS product, not a museum B2B platform, and not a hardware product.

## Main Objective

Build the first usable MVP of Looksy.

The MVP should let me:

1. Open the app on desktop or mobile browser.
2. Create an exhibition visit session.
3. Add exhibit notes under that session.
4. Store data locally with SQLite.
5. Generate a structured mock AI analysis for an exhibit note.
6. Save the analysis into the exhibit note.
7. Export one exhibit note as Markdown.
8. Export a full exhibition session as Markdown.
9. Copy Markdown to clipboard or download it as a `.md` file.

## Development Scope

Complete these phases:

---

## Phase 1: Verify and repair existing page framework

Check the current app structure and make sure the existing page framework runs.

Required pages:

- `/`
- `/exhibitions`
- `/exhibitions/new`
- `/exhibitions/[id]`
- `/items/new`
- `/items/[id]`

If route names differ, standardize them to the above unless there is a strong existing reason not to.

The app should be optimized for mobile-first use, but desktop should still work.

### Phase 1 Acceptance Criteria

- `npm install` succeeds.
- `npm run dev` starts the app.
- The required routes render without 404 or runtime errors.
- The layout is usable on a phone-sized viewport.
- The app has no obvious TypeScript or hydration errors.

---

## Phase 2: Add local storage with SQLite + Prisma

Add Prisma and SQLite.

Create these models:

### ExhibitionSession

Fields:

- `id`
- `title`
- `venue`
- `city`
- `date`
- `type`
- `keywords`
- `overallImpression`
- `createdAt`
- `updatedAt`

### ExhibitItem

Fields:

- `id`
- `sessionId`
- `title`
- `artist`
- `year`
- `medium`
- `labelText`
- `aiAnalysis`
- `personalNote`
- `designInsight`
- `certainty`
- `orderIndex`
- `createdAt`
- `updatedAt`

Relationship:

- One `ExhibitionSession` has many `ExhibitItem` records.
- One `ExhibitItem` belongs to one `ExhibitionSession`.

Required behavior:

- `/exhibitions` lists sessions from the database.
- `/exhibitions/new` creates a session.
- `/exhibitions/[id]` shows session details and its exhibit items.
- `/items/new` creates an exhibit item and associates it with a session.
- `/items/[id]` shows exhibit item details.
- Refreshing the page should not lose data.

### Phase 2 Acceptance Criteria

- `npx prisma migrate dev` succeeds.
- Data persists after refresh.
- Each exhibit note is correctly linked to one exhibition session.
- The README documents database setup and migration commands.

---

## Phase 3: Add mock AI analysis

Do **not** connect a real AI provider yet.

Create an AI provider abstraction so that OpenAI, Gemini, or another provider can be added later.

Required structure:

- `AiAnalysisProvider`
- `MockAiAnalysisProvider`
- an API route or server action for generating analysis

The analysis output should follow this Looksy structure:

```text
【识别结果】
【现场观看重点】
【视觉与形式分析】
【艺术 / 展览语境】
【建筑 / 城市 / 展陈 / 设计启发】
【一句话总结】
【可以继续追问】
```

The mock provider should use available exhibit fields such as:

- title
- artist
- medium
- labelText
- personalNote
- current exhibition context

The generated analysis must be saved into `ExhibitItem.aiAnalysis`.

### Phase 3 Acceptance Criteria

- An exhibit detail page has a way to trigger mock analysis.
- The mock analysis is deterministic and structured.
- The analysis is saved into the database.
- The AI provider layer can be replaced later with a real OpenAI or Gemini implementation.
- No real API key is required.

---

## Phase 4: Markdown / Obsidian export

Add Markdown export for:

1. A single exhibit item.
2. A full exhibition session with all exhibit items.

Required behavior:

- Show generated Markdown preview.
- Copy Markdown to clipboard.
- Download Markdown as `.md`.

The Markdown should be suitable for Obsidian.

### Single exhibit note format

```markdown
# 展品笔记：作品名

## 基本信息

- 所属展览：
- 展馆：
- 城市：
- 作者：
- 年代：
- 材料：
- 信息确定程度：

## 展签 / 现场信息

## 现场观看重点

## AI 赏析

## 建筑 / 城市 / 展陈 / 设计启发

## 我的个人备注

## 后续可追问问题
```

### Full session format

```markdown
# 看展记录：展览名称

## 基本信息

- 展馆：
- 城市：
- 日期：
- 类型：
- 关键词：

## 展览整体印象

## 重点作品笔记

## 空间与展陈观察

## 对建筑 / 城市 / 展陈 / 设计的启发

## 后续研究方向
```

### Phase 4 Acceptance Criteria

- A single exhibit item can be exported as Markdown.
- A full exhibition session can be exported as Markdown.
- Markdown can be copied to clipboard.
- Markdown can be downloaded as a `.md` file.
- Markdown structure is clean enough for Obsidian.

---

## Technical Preferences

Use the current project stack if already created.

Preferred stack:

- Next.js
- TypeScript
- Tailwind CSS
- Prisma
- SQLite

Do not introduce:

- PostgreSQL
- Supabase
- authentication
- cloud sync
- image upload
- real AI API calls
- payments
- admin CMS
- hardware-related code
- AR features

## UI Direction

Mobile-first.

The app should feel like a lightweight personal notebook.

Prioritize:

- simple navigation
- clear forms
- large touch targets
- readable typography
- minimal visual clutter

Do not spend excessive time on fancy animation or branding.

## Validation

Before finishing, run the available checks.

At minimum, try:

```bash
npm install
npx prisma migrate dev
npm run build
```

If the project has tests or lint scripts, run those too.

If any command fails, fix the issue or clearly explain why it cannot be fixed.

## Definition of Done

The goal is complete only when:

1. The app starts locally.
2. The main routes work.
3. I can create an exhibition session.
4. I can create an exhibit item under a session.
5. Data persists after refresh.
6. I can generate mock AI analysis for an exhibit item.
7. The generated analysis is saved.
8. I can export a single exhibit note as Markdown.
9. I can export a full session as Markdown.
10. README explains setup, database migration, running, and manual testing.
11. No real API keys are required.
12. The implementation avoids unnecessary commercial or hardware features.

## Final Response Required

When done, summarize:

1. What was implemented.
2. Files changed.
3. How to run the app.
4. How to initialize the database.
5. How to test the MVP manually.
6. Known limitations.
7. Recommended next phase.
