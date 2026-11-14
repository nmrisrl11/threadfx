---
name: sync-documentation
description: Audit and synchronize all project documentation across root, extension, and website, catching documentation drift, outdated commands, stale version numbers, or missing features.
---

# Sync Project Documentation

Use this skill whenever you suspect documentation drift, after adding new features, dependencies, or scripts, or before cutting a release.

---

## 1. Documentation Inventory & Scope

Audit and verify the consistency of these 6 core documentation files:

| Document | Scope & Purpose | What to Verify |
| :--- | :--- | :--- |
| **`README.md`** | Public repository overview & quickstart | Tech stack table, npm script list, monorepo structure tree, installation steps, and cross-OS support. |
| **`AGENTS.md`** | Rules & guidelines for AI coding agents | Technical rules (ZzFX only, minimal MV3 permissions, semantic DOM targeting), storage schema, agent skills roster, and project structure. |
| **`docs/ARCHITECTURE.md`** | System architecture & technical specs | Component Mermaid diagram, runtime execution sequence, cross-OS audio pipeline, and Cloudflare R2 / Vercel routing. |
| **`docs/BRAND.md`** | Design system & brand guidelines | Color hex codes (`#080808`, `#FF2E93`, `#7928CA`, `#00F5FF`), design tokens, taglines, and tone of voice. |
| **`extension/README.md`** | Browser extension sub-package | Extension tech stack (WXT, shadcn, radix-ui, cn), permissions list, development scripts, and cross-OS status. |
| **`website/README.md`** | Landing page sub-package | Website tech stack, npm scripts, dual-domain fallback, and Cloudflare R2 download routing. |

---

## 2. Drift Audit Checklist

Compare the codebase against the documentation and check for these common drift issues:

### 1. Version Drift
- Verify that the version listed in `README.md`, `extension/entrypoints/sidepanel/App.tsx`, and `website/src/App.tsx` strictly matches `package.json`, `extension/package.json`, and `website/package.json`.

### 2. Dependency & Tech Stack Drift
- If new packages were added or removed in `package.json` (e.g. `shadcn`, `oxlint`, `radix-ui`), verify that:
  - Tech stack tables in `README.md` and sub-package READMEs reflect the change.
  - No legacy or removed libraries are still documented (e.g. old `clsx`, standalone `@radix-ui/react-*`).

### 3. npm Script Drift
- Compare `package.json` scripts (`dev:ext`, `build:all`, `lint`, `format`, etc.) against the **Available npm Scripts** table in `README.md`.

### 4. Domain Consistency
- Verify that `threads.com` is consistently cited as the primary domain, with `threads.net` mentioned strictly as the backward-compatible fallback.

### 5. Storage Schema Drift
- Inspect `extension/lib/storage.ts` and ensure the `ThreadFXSettings` interface in `AGENTS.md` and `docs/ARCHITECTURE.md` reflects any newly added settings keys.

### 6. Directory Tree Drift
- Compare the ASCII directory trees in `README.md` and `AGENTS.md` with the actual file system using `git status` or directory listing.

---

## 3. Execution Rules

1. **Update Only What is Outdated:** Do not rewrite or reformat sections that are already accurate.
2. **Preserve Tone & Polish:** Maintain crisp Markdown formatting, GitHub-style alerts, and correct file links.
3. **Format Check:** Run `npm.cmd run format` and `npm.cmd run lint` after editing markdown files to ensure clean formatting.
