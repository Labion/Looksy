# Architecture

## Recommended MVP Architecture

Use a lightweight monorepo structure:

```text
apps/web       Mobile-first Next.js app
packages/core  Shared types, prompt builders, markdown export helpers
```

The first version can be a single Next.js app with a local database.

## Suggested Stack

Frontend:

- Next.js App Router
- TypeScript
- React
- Tailwind CSS
- Mobile-first responsive UI

Persistence:

- SQLite for local/self-hosted MVP
- Prisma or Drizzle ORM

AI:

- Provider abstraction with OpenAI and/or Gemini adapters
- Do not mix provider-specific logic into UI components

Files:

- Start with local file storage for uploaded images
- Later support S3/R2/Supabase Storage if cloud deployment is needed

Export:

- Markdown export first
- PDF export later only if useful

## Module Boundaries

### exhibition module

Responsibilities:

- create session
- list sessions
- update session metadata
- delete session

### exhibit-note module

Responsibilities:

- create note
- attach images
- store analysis
- update personal remarks

### ai module

Responsibilities:

- build analysis prompt
- call model provider
- normalize result
- support deterministic mock mode for tests

### export module

Responsibilities:

- convert one note to Markdown
- convert one exhibition session to Markdown

## AI Provider Interface

Define a provider interface similar to:

```ts
interface AiProvider {
  analyzeExhibit(input: AnalyzeExhibitInput): Promise<AnalyzeExhibitResult>;
}
```

Input should include:

- images
- wall label text
- user context
- analysis mode
- exhibition session metadata

Output should include:

- title guess
- confirmed facts
- observations
- speculation
- viewing focus
- analysis
- design inspiration
- one sentence summary
- follow-up questions

## First Version Data Flow

```text
User creates exhibition session
  ↓
User adds exhibit note
  ↓
User uploads image and optional wall-label text
  ↓
App builds structured prompt
  ↓
AI provider returns structured analysis
  ↓
User edits/saves note
  ↓
User exports session as Markdown
```

## Privacy and Cost Principles

- Do not upload images until the user explicitly asks for AI analysis.
- Do not run AI automatically in the background.
- Do not store API keys in code.
- Keep prompts concise but structured.
- Use mock provider in tests.
