/goal Read AGENTS.md, README.md, and docs/GOAL_MVP.md. Then complete the Looksy MVP goal described in docs/GOAL_MVP.md.

Work phase by phase:
1. verify and repair the existing page framework;
2. add SQLite + Prisma local storage;
3. add mock AI analysis provider and save analysis to exhibit notes;
4. add Markdown / Obsidian export for single exhibit notes and full exhibition sessions.

Keep the app runnable after each phase.

Important boundaries:
- Do not add login.
- Do not add cloud sync.
- Do not add real AI API calls.
- Do not add image upload.
- Do not add hardware, AR, payment, admin CMS, or commercial SaaS features.
- Use simple, maintainable code.
- Prefer functionality over polish.

Validate before finishing:
- npm install
- npx prisma migrate dev
- npm run build
- any existing lint or test scripts, if available

Finish only when:
- the main routes work,
- I can create an exhibition session,
- I can create an exhibit item under a session,
- data persists after refresh,
- I can generate mock AI analysis,
- the mock analysis is saved,
- I can export a single exhibit note as Markdown,
- I can export a full session as Markdown,
- README explains setup, migration, running, and manual testing.
