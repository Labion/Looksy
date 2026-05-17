# AGENTS.md

## Project Role

You are working as a senior full-stack engineer on a personal AI exhibition companion named **Looksy**.

The Chinese concept name is **看展搭子**.

This is a personal-use tool, not a commercial SaaS, not a museum hardware product, and not a public consumer app.

The user wants a lightweight mobile-friendly workflow for visiting art exhibitions, museums, architecture exhibitions, design exhibitions, and urban renewal exhibitions.

## Product Goal

Build a personal exhibition companion that helps the user:

1. Capture exhibit photos and wall-label photos.
2. Ask AI to analyze the exhibit.
3. Distinguish confirmed facts from visual observation and speculation.
4. Generate useful notes from the user's perspective.
5. Save exhibition sessions and exhibit notes.
6. Export notes to Markdown for Obsidian or other personal knowledge bases.

## Non-Goals

Do NOT build these unless explicitly requested:

- Custom hardware.
- Public app store release.
- B2B museum CMS.
- Multi-tenant SaaS.
- Complex indoor positioning.
- Custom model training.
- Full museum collection database.
- Payment, ticketing, membership, or public analytics.
- Large-scale vector search infrastructure.

## Preferred MVP Shape

Start with a private mobile-first web app / PWA.

Preferred stack:

- Next.js
- TypeScript
- React
- Tailwind CSS
- SQLite for local/simple persistence, or Supabase if cloud sync is requested
- Prisma or Drizzle for database access
- OpenAI and/or Gemini model providers behind clean interfaces
- Markdown export

Keep the system simple and maintainable.

## Core Concepts

### Exhibition Session

A visit to one exhibition.

Fields:

- title
- venue
- city
- date
- type
- keywords
- overall impression
- curatorial notes
- spatial / exhibition design observations

### Exhibit Note

A note for one artwork, installation, object, wall label, gallery scene, or detail.

Fields:

- exhibition session id
- photo(s)
- wall-label photo(s)
- title
- artist / author
- year / period
- medium / material
- confirmed facts
- visual observations
- reasonable speculation
- viewing focus
- AI analysis
- architecture / urban / exhibition / design inspiration
- personal remarks
- follow-up questions

## AI Behavior Requirements

The AI assistant must:

1. Avoid inventing facts.
2. Clearly label uncertain information.
3. Explain what the user should look at on-site.
4. Analyze form, material, scale, light, image quality, spatial relationship, and exhibition design when relevant.
5. Extract design inspiration related to architecture, urban renewal, exhibition design, public space, material expression, narrative movement, and cultural/product translation.
6. Prefer structured Chinese output.
7. Support Markdown note generation.

## Suggested Output Structure for AI Analysis

When analyzing an exhibit image or wall label, use this structure:

- 识别结果
- 现场观看重点
- 视觉与形式分析
- 艺术 / 展览语境
- 建筑 / 城市 / 展陈 / 设计启发
- 一句话总结
- 可以继续追问

## Engineering Rules

- Keep tasks small and reviewable.
- Do not implement everything at once.
- Add README instructions whenever commands or env vars are introduced.
- Add `.env.example` when adding environment variables.
- Do not hardcode API keys.
- Keep model provider logic isolated.
- Prefer deterministic behavior for tests.
- Add tests for core utility functions and API routes when practical.
- Use TypeScript strictness where possible.
- Optimize for personal usability, not enterprise complexity.

## First Milestone

Create a usable local prototype with:

1. Mobile-first home page.
2. Create exhibition session.
3. Add exhibit note with image upload.
4. Call an AI provider to analyze an image and/or text prompt.
5. Save the result.
6. Export one exhibition session as Markdown.

## Codex Working Style

For each task, explain:

1. What files were changed.
2. How to run the project.
3. How to test the change.
4. What assumptions were made.
5. What should be done next.

Do not silently introduce expensive hosted services.
