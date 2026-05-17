# Roadmap

## Phase 0: Codex Framework

Goal:
Provide clear project context and task breakdown.

Deliverables:

- AGENTS.md
- Product spec
- Architecture doc
- Data model
- MVP tasks
- Codex prompts

## Phase 1: App Bootstrap

Goal:
Create the first runnable local web app.

Deliverables:

- Next.js app in `apps/web`
- TypeScript
- Tailwind CSS
- Mobile-first layout
- Home page
- Basic navigation
- `.env.example`
- README setup commands

## Phase 2: Local Data Model

Goal:
Store exhibition sessions and exhibit notes.

Deliverables:

- SQLite database
- ORM setup
- ExhibitionSession model
- ExhibitNote model
- ExhibitImage model
- CRUD functions
- Seed/sample data

## Phase 3: Note Capture Flow

Goal:
Make the app useful during an exhibition visit.

Deliverables:

- Create exhibition session
- Add exhibit note
- Image upload
- Wall-label text input
- Manual context input
- Save/edit note

## Phase 4: AI Analysis

Goal:
Generate structured analysis.

Deliverables:

- AI provider interface
- Mock provider for tests
- OpenAI or Gemini provider
- Prompt builder
- Analysis mode selector
- Save AI output to note

## Phase 5: Markdown Export

Goal:
Export one exhibition visit to a clean note file.

Deliverables:

- Note-to-Markdown helper
- Session-to-Markdown helper
- Export button
- Download `.md` file

## Phase 6: Mobile Polish

Goal:
Make the tool comfortable on-site.

Deliverables:

- Large touch targets
- Fast add-note flow
- Camera-friendly upload flow
- Sticky actions
- Dark/light display consideration
- Low-friction session switching

## Phase 7: Optional Enhancements

Only add after repeated real use:

- Obsidian vault folder export
- Notion API sync
- Voice input
- Text-to-speech playback
- PWA installability
- Location-based default city
- Search and tag filtering
- Image compression
