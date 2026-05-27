# Looksy Next Phases

## Phase 5: On-site mobile experience

Goal: make Looksy practical inside a gallery or museum.

Features:

- prominent “记录眼前作品” button
- automatic item numbering: 作品 01, 作品 02, 作品 03
- quick tags:
  - 值得收藏
  - 空间有启发
  - 材料有启发
  - 展陈有启发
  - 之后研究
  - 适合文创转化
- current exhibition context automatically passed to analysis
- mobile single-hand operation
- dark mode or low-brightness friendly UI

## Phase 6: Real AI provider integration

Goal: replace mock AI with real model calls.

Features:

- provider interface:
  - OpenAI provider
  - Gemini provider
  - mock provider fallback
- `.env.example` keys
- no hardcoded API keys
- clear error handling
- model output saved to exhibit notes

Keep the provider swappable.

## Phase 7: Image and label workflow

Goal: support real exhibition field capture.

Features:

- exhibit photo upload
- label photo upload
- label OCR
- separate image types:
  - artwork
  - label
  - detail
  - gallery space
- store image metadata

## Phase 8: Voice workflow

Goal: reduce typing inside exhibitions.

Features:

- voice memo
- speech-to-text
- optional TTS narration
- “summarize this voice note into personal observation”

## Phase 9: Personal knowledge base integration

Goal: move Looksy notes into long-term tools.

Features:

- Obsidian vault export
- Notion database sync
- batch export
- tags and backlink-friendly Markdown
