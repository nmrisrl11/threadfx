# AGENTS.md — ThreadFX Development Guidelines for AI Agents

> This document defines the architectural rules, coding standards, and operational guidelines for AI agents and developers working on the **ThreadFX** monorepo.

---

## 1. Project Overview & Architecture

**ThreadFX** is an interactive effects and tactile feedback suite for [Threads](https://threads.com). It enhances user interactions (especially custom likes) with zero-latency procedural sound effects (ZzFX), visual confetti bursts, and motion feedback.

### Monorepo Structure

```text
threadfx/
├── .agents/skills/                 # Installed agent skills (WXT, shadcn, audio, etc.)
├── .vscode/                        # Recommended extensions, settings & tasks
├── extension/                      # WXT Browser Extension (Manifest V3)
│   ├── components/                 # shadcn/ui components (Button, Switch, Slider, etc.)
│   ├── entrypoints/
│   │   ├── background.ts           # Service worker (sidePanel behavior)
│   │   ├── content.ts              # threads.com DOM observer & sound trigger
│   │   └── sidepanel/              # Native Chrome Side Panel React App
│   │       ├── index.html
│   │       ├── main.tsx
│   │       └── App.tsx
│   ├── lib/
│   │   ├── zzfx.ts                 # Procedural audio synthesis engine
│   │   ├── presets.ts              # Sound effect number arrays
│   │   └── storage.ts              # Type-safe chrome.storage helpers
│   ├── components.json             # shadcn/ui config
│   ├── package.json
│   └── wxt.config.ts
│
├── website/                        # Landing Page (Vite + React)
│   ├── src/
│   │   ├── components/             # Hero, SoundboardDemo, InstallGuide
│   │   └── App.tsx
│   ├── public/
│   ├── components.json             # shadcn/ui config
│   ├── vercel.json                 # /download redirect to Cloudflare R2
│   └── package.json
│
├── data/                           # Centralized metadata & releases
│   └── changelog.ts                # Typed release notes & active version (shared via @data)
├── AGENTS.md                       # Technical guidelines for AI agents
├── BRAND.md                        # Design system, color tokens, and visual voice
├── ARCHITECTURE.md                 # System diagrams & runtime sequence
├── LICENSE                         # MIT License
├── PENDING_CHANGES.md              # Staging area for unreleased changes
├── skills-lock.json                # Agent skills dependency lockfile
└── package.json                    # Monorepo scripts with native npm workspaces
```

---

## 2. Core Technical Constraints & Rules

### Rule 1: Zero External Audio Files

- **NEVER** import or fetch loose `.mp3`, `.wav`, or `.ogg` files in the core extension.
- All sound effects **MUST** be synthesized procedurally using `ZzFX` or the native browser `Web Audio API` (`AudioContext`).
- Sound presets are stored as compact numeric parameter arrays in `extension/lib/presets.ts`.

### Rule 2: Minimal Manifest V3 Permissions

To preserve user trust with unpacked distribution, permissions in `wxt.config.ts` must remain strictly minimal:

- `permissions`: `["sidePanel", "storage"]`
- `host_permissions`:
  - `https://*.threads.com/*`
  - `https://threads.com/*`
  - `https://*.threads.net/*` (legacy fallback)
  - `https://threads.net/*` (legacy fallback)
- **DO NOT** add invasive permissions like `<all_urls>`, `webRequest`, `cookies`, or `tabs`.

### Rule 3: Resilient DOM Targeting on Threads

Meta obfuscates and frequently changes class names (e.g. `.x1i10hfl`).

- **NEVER** use minified class names for DOM querying.
- **ALWAYS** target semantic attributes:
  - `[role="button"][aria-label*="Like" i]`
  - `svg[aria-label*="Like" i]`
  - Heart icon SVG paths or action bar button containers.
- Use `MutationObserver` on the main feed container (`main[role="main"]`) with debounced handlers to track dynamically loaded posts.

### Rule 4: Isolated Styling (No Style Bleed)

- The **Side Panel** runs inside its own isolated iframe/document (`sidepanel/index.html`). Standard Tailwind CSS and shadcn/ui components work here without risk.
- If rendering visual confetti or particle effects inside `content.ts` on `threads.com`, use a dedicated top-level canvas element (`#threadfx-canvas-overlay`) positioned `fixed` with `pointer-events: none` and `z-index: 999999`.

### Rule 5: Decoupled Domain & Storage

- All landing page asset links must be **relative**.
- The download button must link to `/download`, which resolves via `vercel.json` to the Cloudflare R2 bucket.
- The public production URL is `https://threadfx.nmrisrl.dev`, with `https://threadfx.vercel.app` as the permanent fallback.

---

## 3. Cross-OS & Platform Support Guidelines

AI agents must ensure that all code remains compatible across all target desktop platforms:

- **Windows (10/11):** Ensure all file path manipulations and package scripts avoid POSIX-only shell assumptions.
- **macOS (Sonoma/Sequoia):** The Side Panel API and Web Audio API are supported natively. Keep canvas rendering high-DPI (Retina) compliant (`window.devicePixelRatio`).
- **Linux (X11 / Wayland):** Audio synthesis relies on native Web Audio buffers which route through PipeWire or PulseAudio without requiring system packages.
- **Planned Targets (Future Roadmaps):**
  - Safari Web Extension: Avoid APIs that are Chrome-exclusive when authoring shared business logic.
  - Firefox Desktop: Keep Manifest V3 definitions compatible with Firefox requirements (handled via WXT).

---

## 4. Tech Stack Reference

| Layer                   | Technology                                       |
| :---------------------- | :----------------------------------------------- |
| **Monorepo**            | npm Workspaces                                   |
| **Extension Framework** | [WXT](https://wxt.dev/) (Vite-based)             |
| **UI Framework**        | React 19 + TypeScript                            |
| **Styling**             | Tailwind CSS v4 (`@tailwindcss/vite`) + Radix UI |
| **Audio Engine**        | ZzFX (MIT, procedural Web Audio)                 |
| **Extension UI**        | Chrome Side Panel API (`chrome.sidePanel`)       |
| **Website Hosting**     | Vercel (Hobby)                                   |
| **Zip Distribution**    | Cloudflare R2 (`/download` redirect)             |

---

## 5. Key Workflows & Scripts (npm)

### Extension Development

```bash
npm run dev:ext              # Launches Chrome with the extension loaded & HMR enabled
npm run build:ext            # Builds output to .output/chrome-mv3
npm run zip:ext              # Generates unpacked .zip package in .output/
```

### Website Development

```bash
npm run dev:web              # Runs local Vite dev server
npm run build:web            # Builds static distribution for Vercel
```

### Complete Pipeline

```bash
npm run build:all            # Compiles extension, zips it, and compiles website
```

---

## 6. Storage Schema (`chrome.storage.local`)

State shared between `content.ts` and `sidepanel` must follow this schema:

```typescript
export interface ThreadFXSettings {
	enabled: boolean; // Master toggle (default: true)
	volume: number; // 0.0 to 1.0 (default: 0.5)
	soundPack: "bubble" | "retro" | "hype" | "blip"; // Active ZzFX preset
	confettiEnabled: boolean; // Visual confetti on like (default: true)
	likesJuicedCount: number; // Lifetime counter of likes enhanced
}
```

Whenever `sidepanel` updates settings via `chrome.storage.local.set()`, `content.ts` receives the update immediately via `chrome.storage.onChanged`.

---

## 7. Open Source & Licensing

- **License:** ThreadFX is open-source software distributed under the **MIT License**.
- **Author & Ownership:** Created and maintained by **Nomer Israel (@nmrisrl)**.
- **Upstream Attribution:**
  - Procedural audio utilizes Frank Force's **ZzFX** (MIT License).
  - Particle effects utilize Kiril Vatev's **canvas-confetti** (ISC License).
  - UI icons utilize **Lucide React** (ISC License).
  - UI primitives utilize **Radix UI** (MIT License).
- All new files and contributions must comply with the MIT License terms.

---

## 8. Agent Skills Ecosystem (`.agents/skills`)

ThreadFX uses the open agent skills ecosystem (`skills.sh`). Skills are committed under `.agents/skills/` and tracked in `skills-lock.json`:

- **`wxt-browser-extensions`** (`pproenca/dot-skills`) — WXT framework conventions and build rules.
- **`shadcn`** (`shadcn-ui/ui`) — Modern shadcn/ui components, `radix-ui`, and Tailwind v4 tokens.
- **`emil-design-eng`** (`emilkowalski/skills`) — Micro-interactions, spring animations, and tactile feedback.
- **`ui-sound-design`** (`dannyjpwilliams/ui-sound-design-skill`) — UI audio ergonomics and earcon guidelines.
- **`vercel-react-best-practices`** (`vercel-labs/agent-skills`) — React 19 performance and state management.
- **`frontend-design`** (`anthropics/skills`) — Distinctive aesthetic craft and landing page layouts.
- **`web-design-guidelines`** (`vercel-labs/agent-skills`) — Web interface guidelines and accessibility checks.
- **`vite`** (`antfu/skills`) — Vite optimization and build configurations.

AI agents working on this monorepo should consult these skills in `.agents/skills/` for domain-specific patterns.

### Project Workflow Skills

These built-in workflow skills automate standard development routines:

- **`load-project-context`** (`.agents/skills/load-project-context/SKILL.md`): Review architecture, storage schema, constraints, and enforce asking for permission before committing or pushing.
- **`commit-and-push`** (`.agents/skills/commit-and-push/SKILL.md`): Run formatting, linting, build checks, and format conventional commit titles with grouped responsibility descriptions.
- **`release-extension`** (`.agents/skills/release-extension/SKILL.md`): Lockstep version bumping, packaging `threadfx-<version>-chrome.zip`, and preparing GitHub Release draft.
- **`create-changelog`** (`.agents/skills/create-changelog/SKILL.md`): Author consumer-facing, Apple-style release notes with sensory benefits and zero technical jargon.
- **`sync-documentation`** (`.agents/skills/sync-documentation/SKILL.md`): Audit all project documentation against codebase state to eliminate drift.
- **`verify-project`** (`.agents/skills/verify-project/SKILL.md`): Execute full health check (`oxfmt:check`, `oxlint`, `build:all`, version sync).
