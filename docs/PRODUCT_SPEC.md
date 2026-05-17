# Product Spec: Looksy

## Product Positioning

Looksy（中文概念名：看展搭子）is a personal AI exhibition companion.

It is designed for one user who frequently visits exhibitions in cities such as Shanghai, Tokyo, Guangzhou, and other places in Japan.

The product should feel like a personal visual-thinking and exhibition-note assistant, not a generic encyclopedia.

## Core User Needs

The user wants to:

1. Photograph an artwork, exhibit, object, installation, wall label, or gallery scene.
2. Receive structured analysis in Chinese.
3. Understand what to look at on-site.
4. Avoid hallucinated artwork facts.
5. Capture architecture, urban, exhibition-design, material, and product inspiration.
6. Save the analysis as a reusable personal note.
7. Review and export the whole exhibition visit.

## User Context

The user is especially interested in:

- Architecture
- Urban renewal
- Exhibition design
- Public space
- Installation art
- Image atmosphere
- Material expression
- Spatial narrative
- Cultural and creative products
- Low-density office / eco-R&D / garden-like working environments
- Waterfront, park, and urban landscape experiences

## MVP Scope

The first MVP should support:

1. Create an exhibition session.
2. Add exhibit notes.
3. Upload one or more images per note.
4. Add text context manually.
5. Send image/text to an AI provider.
6. Receive structured Chinese analysis.
7. Save AI result and personal remarks.
8. Export a session to Markdown.

## Non-Goals

Do not build:

- A public community app.
- A museum-grade CMS.
- A hardware device.
- A native mobile app in the first version.
- A full collection recognition engine.
- A vector database pipeline.
- A user account system unless cloud sync is explicitly requested.

## Main Screens

### Home

- Recent exhibition sessions.
- Create new session.

### New Exhibition Session

Fields:

- Title
- Venue
- City
- Date
- Exhibition type
- Keywords

### Exhibition Session Detail

- Basic session info.
- List of exhibit notes.
- Add new exhibit note.
- Export Markdown.

### New Exhibit Note

- Upload photo(s).
- Optional wall-label text.
- Optional manual context.
- Choose analysis mode.
- Generate analysis.
- Save note.

### Exhibit Note Detail

- Images.
- Confirmed facts.
- Visual observations.
- AI analysis.
- Design inspiration.
- Personal remarks.
- Follow-up questions.

## Analysis Modes

- 默认看展分析
- 展签解读
- 展陈空间分析
- 建筑 / 城市 / 材料启发
- 快速笔记
- 深度复盘

## Success Criteria for MVP

The MVP is successful if the user can:

1. Use it on a phone browser.
2. Create an exhibition session within 30 seconds.
3. Add an exhibit image and generate analysis.
4. Save the analysis as a note.
5. Export a clean Markdown file after the visit.
