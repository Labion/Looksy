# MVP Tasks

## Task 1: Bootstrap Web App

Create a Next.js app in `apps/web`.

Acceptance criteria:

- App runs locally.
- TypeScript is enabled.
- Tailwind CSS is configured.
- Home page displays app name and primary actions.
- Mobile-first layout.
- README includes setup and run commands.

## Task 2: Create Core Types

Create shared TypeScript types for:

- ExhibitionSession
- ExhibitNote
- ExhibitImage
- AnalysisMode
- AnalyzeExhibitInput
- AnalyzeExhibitResult

Acceptance criteria:

- Types live in a clean module.
- UI and services can import them.
- Types match `docs/DATA_MODEL.md`.

## Task 3: Local Persistence

Add SQLite persistence through Prisma or Drizzle.

Acceptance criteria:

- Database schema supports sessions, notes, and images.
- Create/list/get/update operations exist.
- Seed data is available.
- No cloud service is required.

## Task 4: Exhibition Session Flow

Build UI for:

- list sessions
- create session
- view session detail
- edit session metadata

Acceptance criteria:

- User can create a session from phone browser.
- User can open a session and see notes.

## Task 5: Exhibit Note Flow

Build UI for:

- add exhibit note
- upload image(s)
- input wall-label text
- input manual context
- save note

Acceptance criteria:

- Note can be created and viewed.
- Images are associated with notes.

## Task 6: AI Prompt Builder

Create a prompt builder that uses:

- uploaded image context
- wall-label text
- exhibition session metadata
- analysis mode
- user preference context

Acceptance criteria:

- Prompt builder is tested.
- Prompt clearly asks the model to separate confirmed facts, observations, speculation, and unknowns.

## Task 7: AI Provider Interface

Create AI provider interface and mock provider.

Acceptance criteria:

- Mock provider returns deterministic output.
- UI can use mock provider without API keys.
- Real provider can be added later.

## Task 8: Real AI Provider

Add one real provider: OpenAI or Gemini.

Acceptance criteria:

- API key is loaded from `.env`.
- Missing key produces a helpful error.
- Provider logic is isolated.
- Analysis result is saved to note.

## Task 9: Markdown Export

Export one exhibition session to Markdown.

Acceptance criteria:

- Export includes session metadata.
- Export includes all notes in order.
- Export includes AI analysis and personal remarks.
- Download button works.

## Task 10: Mobile Polish

Improve on-site usability.

Acceptance criteria:

- Add note action is prominent.
- Forms are short and easy to use.
- Pages are usable on a phone screen.
- Visual hierarchy is clear.
