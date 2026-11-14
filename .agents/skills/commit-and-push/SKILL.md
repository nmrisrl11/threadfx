---
name: commit-and-push
description: Quality-check, format, lint, summarize, and commit Git changes with conventional titles and grouped descriptions per responsibility (Feats, Fixes, Docs, Refactors, Chores). Enforces asking for user confirmation before committing and pushing.
---

# Commit and Push Workflow

Use this skill whenever you are preparing to save, commit, and push changes to the **ThreadFX** repository (`https://github.com/nmrisrl11/threadfx.git`).

---

## 1. Pre-Commit Quality Checks

Before staging files, verify that the entire codebase is formatted, passes linting, and builds cleanly without errors:

```powershell
# 1. Format the codebase
npm.cmd run format

# 2. Lint for errors and warnings (must be 0 errors, 0 warnings)
npm.cmd run lint

# 3. Test compilation and packaging of both extension and website
npm.cmd run build:all
```

If any check fails, fix the issue immediately before proceeding.

---

## 2. Review the Working Tree & Staging Safety

Inspect what has changed:

```powershell
git status
```

### Staging Rules:
- **NEVER** commit binary archive files (`*.zip`) or `.output/` or `dist/` artifacts.
- Verify that `website/public/threadfx-latest.zip` is untracked or gitignored.
- Stage only intentional changes using `git add -A`.

---

## 3. Structure the Conventional Commit Message

### Title Format:
```text
type(scope): concise imperative title in lowercase
```
- Examples:
  - `feat(audio): add 8-bit coin sound preset and volume preview`
  - `fix(content): resolve like button observer on threads.com video posts`
  - `docs(readme): update monorepo structure and add agent skills`
  - `refactor(ui): extract badge and button variants into separate modules`
  - `chore(tooling): configure oxlint ignore patterns for vendor skills`

### Descriptions Grouped by Responsibility:
Group the commit description points cleanly under standard responsibility headings:

```text
- Feats:
  - Add new sound preset parameter array in extension/lib/presets.ts
  - Add preset test buttons to Side Panel UI

- Fixes:
  - Correct SVG heart selector to support animated thread reactions
  - Prevent canvas overlay z-index collision with Threads navigation

- Refactors:
  - Move color utility functions to shared lib/utils.ts

- Docs:
  - Document new sound preset in README.md and docs/BRAND.md
  - Update AGENTS.md storage schema

- Chores:
  - Bump dependencies in extension/package.json
```

*(Only include headings that have actual changes—do not include empty headings.)*

---

## 4. ⚠️ Mandatory User Approval Gate

**DO NOT execute `git commit` or `git push` autonomously.**

1. Present the staged changes, the proposed conventional title, and the grouped bullet points to the user.
2. Ask for their confirmation:
   > *"Here are the staged changes and the proposed commit message. Would you like me to commit and push these to GitHub?"*
3. **STOP AND WAIT.** Only proceed once the user provides their explicit go-ahead.

---

## 5. Execute Commit and Push

Once the user approves:

```powershell
# Commit with multiple -m flags or structured message
git commit -m "type(scope): concise imperative title" -m "- Feats: ..." -m "- Fixes: ..."

# Push to origin main
git push origin main

# Confirm clean working tree
git status
```
