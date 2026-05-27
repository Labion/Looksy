# Looksy Codex Goal Pack

This package contains the development goal documents and copy-paste Codex instructions for building the first usable MVP of **Looksy**.

Looksy is a personal AI exhibition note-taking companion, also known in Chinese as “看展搭子”.

## How to use

1. Unzip this package.
2. Copy the `docs/GOAL_MVP.md` file into your Looksy repository under `docs/GOAL_MVP.md`.
3. Optionally copy `docs/NEXT_PHASES.md` and `docs/DEVELOPMENT_STRATEGY.md` into your repository.
4. Open Codex in the Looksy project directory.
5. Paste the command from `codex_instructions/01_GOAL_COMMAND.md`.

## Recommended execution order

1. Use `01_GOAL_COMMAND.md` to let Codex complete the MVP goal.
2. If you want Codex to plan before coding, use `00_PLAN_COMMAND.md` first.
3. If your Codex client has a short prompt limit, use `02_SHORT_GOAL_COMMAND.md`.
4. After Codex finishes, use `03_MANUAL_TEST_CHECKLIST.md` to test the result locally.
5. Use `04_FIX_PROMPT.md` if local testing fails.

## MVP target

The MVP is complete when you can:

- create an exhibition visit session
- create exhibit notes under that session
- persist data with SQLite + Prisma
- generate mock AI analysis
- save the mock analysis to the exhibit note
- export a single exhibit note as Markdown
- export a full exhibition session as Markdown
- copy or download Markdown for Obsidian / Notion use

## Important boundary

This MVP should **not** add:

- login
- cloud sync
- real OpenAI / Gemini API calls
- image upload
- hardware features
- AR
- payment
- commercial SaaS features
- complex CMS
