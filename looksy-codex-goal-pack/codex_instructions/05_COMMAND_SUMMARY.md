# Codex Command Summary

## Recommended full flow

### Step 1: Ask Codex to plan

```text
/plan Read AGENTS.md, README.md, and docs/GOAL_MVP.md. Create a concise implementation plan for completing the Looksy MVP without adding login, cloud sync, real AI API calls, image upload, hardware, AR, payments, admin CMS, or commercial SaaS features.
```

### Step 2: Start Goal mode

```text
/goal Read AGENTS.md, README.md, and docs/GOAL_MVP.md. Then complete the Looksy MVP goal described in docs/GOAL_MVP.md. Work phase by phase, keep the app runnable after each phase, avoid real AI APIs and unnecessary commercial features, and validate with install/build/database commands before finishing.
```

## If `/goal` does not appear

Try:

```bash
codex features enable goals
```

Or add this to Codex config:

```toml
[features]
goals = true
```

## Short version

Use `02_SHORT_GOAL_COMMAND.md` if the client has a short prompt limit.
