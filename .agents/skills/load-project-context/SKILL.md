---
name: load-project-context
description: Load and understand ThreadFX monorepo context, architecture, audio constraints, storage schema, and guidelines before making any changes. Includes mandatory rule to ask before committing or pushing.
---

# Load Project Context

Use this skill whenever starting a fresh session, resuming development, or beginning work on any feature, fix, or refactor in the **ThreadFX** monorepo.

The goal is to ensure the AI agent operates with complete knowledge of the project's technical architecture, procedural audio synthesis rules, storage schema, and operational constraints—never building or modifying code blindly.

---

## 1. Non-Negotiable Operational Rules

Before reading code or making changes, internalize these core rules:

### ⚠️ Rule 1: Always Ask Before Committing & Pushing
- **NEVER** run `git commit` or `git push` autonomously or without the user's explicit instruction.
- When work is finished or when the user asks for a review, present the staged/unstaged changes, summarize the diff, and **pause**.
- Wait for the user's explicit go signal (e.g. "go ahead and commit", "push it") before executing any Git commit or push command.

### ⚠️ Rule 2: Zero External Audio Files
- **NEVER** import, download, or fetch loose `.mp3`, `.wav`, or `.ogg` files in the extension.
- All sound effects **MUST** be synthesized procedurally in-memory using `ZzFX` or the native browser `Web Audio API` (`AudioContext`).
- Sound presets are stored as numeric parameter arrays in `extension/lib/presets.ts`.

### ⚠️ Rule 3: Resilient DOM Targeting on Threads
- Meta obfuscates classes (e.g. `.x1i10hfl`). **NEVER** use minified class names for DOM queries.
- **ALWAYS** use semantic attributes:
  - `[role="button"][aria-label*="Like" i]`
  - `svg[aria-label*="Like" i]`
  - Heart icon SVG paths and action bar button containers.
- Observe dynamically loaded feed posts via `MutationObserver` on `main[role="main"]` with debounced execution.

### ⚠️ Rule 4: Windows Execution Safety
- This environment runs on **Windows (PowerShell)**.
- **ALWAYS** invoke npm and npx tools via `npm.cmd` and `npx.cmd` to avoid PowerShell script execution policy errors.

---

## 2. Inspect Documentation & Guidelines

Review the project's primary reference files:

1. **`AGENTS.md`**: Architectural constraints, storage schema, agent skills roster, and coding standards.
2. **`README.md`**: Tech stack overview, available npm scripts, and monorepo structure.
3. **`ARCHITECTURE.md`**: Runtime lifecycle, like interception sequence, and audio synthesis pipeline.
4. **`BRAND.md`**: Color palette (`#080808` canvas, `#FF2E93` neon pink, `#7928CA` violet, `#00F5FF` cyan), typography, and voice.
5. **`extension/README.md` & `website/README.md`**: Subsystem-specific details.

---

## 3. Understand the Monorepo Structure

ThreadFX is an npm workspaces monorepo:

```text
threadfx/
├── .agents/skills/                 # Agent skills & workflows
├── .vscode/                        # VS Code settings, tasks (schema 2.0.0), and launch configs
├── extension/                      # WXT Browser Extension (Manifest V3)
│   ├── components/                 # shadcn/ui components (Button, Switch, Slider, Card, Badge)
│   ├── entrypoints/
│   │   ├── background.ts           # Service worker (openPanelOnActionClick)
│   │   ├── content.ts              # threads.com DOM like-observer & ZzFX trigger
│   │   └── sidepanel/              # Native Chrome Side Panel React 19 App
│   ├── lib/
│   │   ├── zzfx.ts                 # Procedural audio synthesis engine (< 1 KB)
│   │   ├── presets.ts              # Preset parameter arrays
│   │   ├── storage.ts              # Type-safe chrome.storage.local helpers
│   │   └── utils.ts                # cn utility wrapper
│   ├── components.json             # shadcn/ui configuration
│   ├── package.json
│   └── wxt.config.ts               # Minimal permissions ("sidePanel", "storage")
│
├── website/                        # Landing Page (Vite + React 19 + Tailwind CSS v4)
│   ├── src/
│   │   ├── components/             # shadcn/ui components & Hero/Simulator
│   │   ├── lib/                    # Shared zzfx.ts, presets.ts, and utils.ts
│   │   ├── App.tsx                 # Hero, Like Simulator, 3-Step Install Guide
│   │   └── index.css               # AMOLED dark design tokens
│   ├── public/
│   │   └── threadfx-latest.zip     # Local fallback zip (gitignored)
│   ├── vercel.json                 # Decoupled /download redirect to Cloudflare R2
│   └── package.json
│
├── AGENTS.md
├── BRAND.md
├── ARCHITECTURE.md
├── LICENSE                         # MIT License
├── skills-lock.json                # Agent skills lockfile
└── package.json                    # Workspaces scripts, oxlint, and oxfmt
```

---

## 4. Storage Schema (`chrome.storage.local`)

Synchronized state between `content.ts` and `sidepanel`:

```typescript
export interface ThreadFXSettings {
  enabled: boolean;          // Master toggle (default: true)
  volume: number;           // 0.0 to 1.0 (default: 0.5)
  soundPack: 'bubble' | 'retro' | 'hype' | 'blip'; // Active preset
  confettiEnabled: boolean; // Visual confetti on like (default: true)
  likesJuicedCount: number; // Lifetime counter of likes enhanced
}
```

Whenever `sidepanel` updates settings via `chrome.storage.local.set()`, `content.ts` receives the update immediately via `chrome.storage.onChanged`.

---

## 5. Check Git State

Run `git status` and inspect recent commits with `git log -n 5 --oneline` to understand recent work and any uncommitted changes before touching code.
