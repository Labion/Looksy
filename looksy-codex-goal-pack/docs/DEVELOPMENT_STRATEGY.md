# Looksy Development Strategy

## Product positioning

Looksy is a personal AI exhibition note-taking companion.

It should help me:

- record exhibition visits
- capture exhibit notes
- analyze exhibit / label / spatial observations
- save structured interpretations
- export notes into my personal knowledge base

It is **not** a commercial product at this stage.

## Core principle

Build the personal workflow before adding advanced intelligence.

Priority order:

1. Can run
2. Can record
3. Can persist data
4. Can generate structured analysis
5. Can export Markdown
6. Can optimize on-site mobile use
7. Can connect real AI
8. Can handle images / OCR / voice later

## Current MVP boundary

The first MVP should stop at:

- local SQLite storage
- exhibition sessions
- exhibit notes
- mock AI analysis
- Markdown export

## What to avoid now

Do not build:

- custom hardware
- account system
- multi-user support
- admin CMS
- cloud sync
- payment
- public sharing
- AR
- real image recognition
- production AI integration
- complex permission system

## Why mock AI first?

The important first test is not model quality. It is workflow quality.

The first question is:

> Can I create a visit, record an exhibit, generate a structured note, and export it into my knowledge base?

Once that loop works, real AI can be plugged in.

## Later development sequence

After the MVP goal is done:

1. On-site mobile UX
2. Real AI provider integration
3. Image upload
4. Label OCR
5. Voice notes
6. TTS narration
7. Obsidian / Notion sync
8. Personal preference memory
