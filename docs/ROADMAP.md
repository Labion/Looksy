# Looksy Development Roadmap

This roadmap is the canonical development plan for Looksy（看展搭子）. It reflects the current repository state, not the earlier bootstrap-only handoff state.

Status legend:

- Completed: usable and verified for the current MVP.
- Mostly completed: usable, with focused hardening or polish still needed.
- Next: next priority after MVP verification.
- Later: enhancement backlog after repeated real use.

## Phase 0: Naming And Documentation Framework

Status: Completed

Goal:
Define the project identity, product boundaries, development constraints, and collaboration documents.

Completed:

- Project name set to `Looksy`.
- Chinese concept name set to `看展搭子`.
- Root user README split from Codex/development notes.
- `AGENTS.md`, `HANDOFF.md`, `CODEX_NOTES.md`, `docs/`, and `codex_prompts/` established.
- Product scope and non-goals documented.
- Phase-based Codex prompts created.

Remaining:

- Keep handoff and roadmap current as implementation changes.
- Periodically prune outdated Codex prompts once phases are no longer relevant.

Acceptance Criteria:

- A new maintainer can understand what Looksy is and what it is not.
- A user can find setup and usage instructions from the root README.
- Codex/development context is preserved outside the user-facing README.

## Phase 1: App Shell And Environment

Status: Completed

Goal:
Create a runnable local mobile-first Web App foundation.

Completed:

- Next.js App Router app under `apps/web`.
- TypeScript configured.
- Tailwind CSS configured.
- Mobile-first home page.
- App layout and global styles.
- Local environment verified with Node.js `v24.15.0` and npm `11.12.1`.
- Reliable `verify` script added.
- Prisma config moved to `prisma.config.ts`.

Remaining:

- Optional: add a dedicated lint script if linting rules are introduced.
- Optional: document LAN/mobile device testing in more detail after real phone testing.

Acceptance Criteria:

- `npm.cmd run verify` passes.
- `npm.cmd run dev` starts the app.
- `http://localhost:3000` loads successfully.

## Phase 2: Data Model And Local Persistence

Status: Completed For MVP

Goal:
Persist exhibition sessions, exhibit notes, and local uploaded images without hosted services.

Completed:

- SQLite database configured through Prisma.
- Models created:
  - `ExhibitionSession`
  - `ExhibitNote`
  - `ExhibitImage`
- Initial Prisma migration added.
- Seed data added.
- Data access helpers implemented for sessions, notes, and images.
- JSON serialization helpers added for keyword and follow-up-question arrays.

Remaining:

- Add delete operations for sessions, notes, and images.
- Add edit flows for existing sessions and notes in the UI.
- Add focused tests for serialization and database helper behavior.

Acceptance Criteria:

- New local environments can initialize using `db:migrate`.
- Seed can populate sample data.
- Session, note, and image records can be created and read by the app.

## Phase 3: Note Capture And Local Image Upload

Status: Completed For MVP

Goal:
Make Looksy useful during an exhibition visit by capturing notes and photos quickly.

Completed:

- Create exhibition session from the home page.
- List existing sessions.
- Open a session detail page.
- Add text exhibit notes.
- Capture wall-label text, manual context, and personal remarks.
- Upload local exhibit images.
- Store uploaded images under `public/uploads/exhibit-images/`.
- Show uploaded images on note cards.
- Mobile-friendly note form with optional details collapsed.

Remaining:

- Add editing for note fields after creation.
- Add delete/remove for uploaded images.
- Add image compression or size reduction before storage.
- Improve camera-first mobile upload behavior after phone testing.

Acceptance Criteria:

- User can create a session and add a note within the browser.
- User can attach at least one image to a note.
- Note and image content persists after page reload.

## Phase 4: AI Analysis Interface

Status: Mostly Completed

Goal:
Generate structured Chinese exhibit analysis while separating facts, observations, speculation, and unknowns.

Completed:

- AI provider interface added.
- Deterministic mock provider added.
- Prompt builder added.
- Analysis modes added:
  - default
  - wall label
  - exhibition space
  - architecture / design
  - quick note
  - deep review
- Server action added for generating analysis.
- Analysis result saved to note fields.
- Optional OpenAI provider implemented behind environment variables.
- Missing OpenAI API key shows a helpful error without overwriting existing analysis.

Remaining:

- Run real OpenAI end-to-end tests with a valid API key.
- Add tests for prompt builder and mock provider output shape.
- Improve provider error display and retry behavior.
- Add lightweight AI request logging only if useful for debugging or cost tracking.

Acceptance Criteria:

- Mock provider works without API keys.
- Analysis output is structured in Chinese.
- Output clearly separates confirmed facts, observations, speculation, viewing focus, design inspiration, summary, and follow-up questions.

## Phase 5: Markdown / Obsidian Export

Status: Completed For MVP

Goal:
Export one exhibition session into a clean Markdown note for Obsidian or another personal knowledge base.

Completed:

- `exportSessionToMarkdown` helper added.
- Markdown filename helper added.
- Export route added at `/sessions/[id]/export`.
- Session detail page includes `导出 Markdown`.
- Export includes:
  - session metadata
  - notes in sequence order
  - image links
  - AI analysis
  - personal remarks
  - design inspiration
  - follow-up questions
- Smoke test confirmed export content includes expected sections and image links.

Remaining:

- Add focused tests for Markdown formatting.
- Improve relative/absolute image-link strategy for different Obsidian vault layouts.
- Optional: add copy-to-clipboard export after real use.

Acceptance Criteria:

- User can export a session as `.md`.
- Export is readable and structured for personal archives.
- Export does not require a hosted service.

## Phase 6: Mobile On-Site Experience Polish

Status: Next / In Progress

Goal:
Make the app comfortable to use in an exhibition space on a phone.

Completed:

- Mobile-first page widths and spacing.
- Prominent add-note action.
- Shorter note form.
- Clear empty states.
- Large enough primary buttons for basic mobile use.

Remaining:

- Perform real phone browser testing.
- Improve sticky actions for adding notes and returning to top/session.
- Reduce friction in image capture and upload.
- Add better loading/pending states for uploads and analysis.
- Improve long-note readability on small screens.
- Consider PWA installability after core workflows stabilize.

Acceptance Criteria:

- User can start a session quickly on-site.
- User can add notes and images without fighting the UI.
- Important actions remain easy to reach on a phone.

## Phase 7: Enhancement Backlog

Status: Later / Not Started

Goal:
Add optional capabilities only after repeated real use proves they are worth the complexity.

Candidate Enhancements:

- Obsidian vault folder export.
- Notion API sync.
- Voice input for quick notes.
- Text-to-speech playback of analysis.
- PWA installability.
- Location-based default city.
- Search, tags, and filters.
- Image compression and image management.
- Cloud sync through Supabase or another simple backend if explicitly requested.
- Real AI provider hardening and usage/cost visibility.

Non-Goals Unless Explicitly Requested:

- Public app store release.
- Multi-tenant SaaS.
- Museum CMS.
- Payment, ticketing, membership, or analytics.
- Custom model training.
- Large-scale vector search infrastructure.

Acceptance Criteria:

- Enhancements solve real personal-use friction.
- Enhancements do not compromise the lightweight local-first MVP.
- Hosted services are not introduced silently.
