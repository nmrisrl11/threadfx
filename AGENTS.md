# AGENTS.md — ThreadFX Development Guidelines for AI Agents

> This document defines the architectural rules, coding standards, and operational guidelines for AI agents and developers working on the **ThreadFX** monorepo.

---

## 1. Project Overview & Architecture

**ThreadFX** is an interactive effects, procedural audio, and tactile feedback suite for social threads. Launching with flagship support for [Threads](https://threads.com), it enhances user interactions (especially likes and reactions) with zero-latency procedural sound effects (ZzFX), hardware-accelerated particle physics, and responsive micro-motion.

### Monorepo Structure

```text
threadfx/
├── .agents/skills/                 # Installed agent skills (WXT, shadcn, audio, etc.)
├── .vscode/                        # Recommended extensions, settings & tasks
├── extension/                      # WXT Browser Extension (Manifest V3)
│   ├── components/                 # UI components (sidepanel & primitives)
│   │   ├── sidepanel/              # Shared chrome (Header, MetricStrip, MilestonesPopover, ThemeToggle, Footer)
│   │   │   ├── sound-fx/           # Tab coordinator, header, grid, channel strips, waveform monitor
│   │   │   ├── particles/          # Tab coordinator, palettes grid, physics sliders, particle stage dock
│   │   │   └── data/               # Tab coordinator, capacity meter, itemized breakdown, actions, dock monitor
│   │   └── ui/                     # Primitives (Button, Slider, Switch, Tabs, Popover, etc.)
│   ├── entrypoints/
│   │   ├── background.ts           # Service worker (sidePanel behavior & shortcut toggling)
│   │   ├── content.ts              # threads.com DOM observer & sound trigger
│   │   └── sidepanel/              # Native Chrome Side Panel React 19 App
│   │       ├── index.html
│   │       ├── main.tsx            # Synchronous early theme initialization (zero-FOUC)
│   │       ├── App.tsx             # Interactive soundboard, volume, likes counter
│   │       └── style.css           # Tailwind v4 CSS variables & light/dark design tokens
│   ├── hooks/                      # useSettingsSelector, useTheme, useAudioSettings, useStorageTelemetry, useActiveTabStatus
│   ├── lib/
│   │   ├── storage.ts              # Type-safe chrome.storage helpers
│   │   ├── threads-detector.ts     # Domain-isolated Threads action classifier & vector path fingerprinting
│   │   └── utils.ts                # cn utility wrapper
│   ├── public/
│   │   ├── badges/                 # 7 transparent 3D WebP achievement badges (1-7)
│   │   └── icon/                   # 16, 32, 48, 96, 128px MV3 icons
│   ├── components.json             # shadcn/ui config
│   ├── package.json
│   └── wxt.config.ts
│
├── website/                        # Landing Page (Vite + React)
│   ├── src/
│   │   ├── components/             # Hero, SoundboardDemo, InstallGuide
│   │   └── App.tsx
│   ├── public/
│   │   └── badges/                 # 7 transparent 3D WebP achievement badges (1-7)
│   ├── components.json             # shadcn/ui config
│   ├── vercel.json                 # /download redirect to Cloudflare R2
│   └── package.json
│
├── data/                           # Centralized shared core, audio, palettes & metadata
│   ├── app.ts                      # Centralized app metadata & info (shared via @data/app)
│   ├── changelog.ts                # Typed release notes & active version (shared via @data/changelog)
│   ├── milestones.ts               # Gamified juicer ranks & milestone thresholds (shared via @data/milestones)
│   ├── particles.ts                # Confetti palettes & particle dynamics (shared via @data/particles)
│   ├── presets.ts                  # Procedural sound presets (shared via @data/presets)
│   └── zzfx.ts                     # Procedural Web Audio synthesis engine (shared via @data/zzfx)
│
├── docs/                           # Architecture, design systems, and roadmaps
│   ├── ARCHITECTURE.md             # System diagrams & runtime sequence
│   ├── BRAND.md                    # Design system, color tokens, and visual voice
│   ├── FEATURE_BLUEPRINT.md        # Feature specifications & visual wireframes
│   └── UNIVERSAL_FX_ROADMAP.md     # Multi-platform adapter roadmap
│
├── AGENTS.md                       # Technical guidelines for AI agents
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
- Sound presets are stored as compact numeric parameter arrays in `data/presets.ts`.

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

### Rule 6: Avoid Barrel Files (Direct Explicit Imports)

Per Vercel React Best Practices (`bundle-barrel-imports`) and WXT optimization guidelines (`bundle-split-entrypoints`):

- **NEVER** create or use barrel files (`index.ts` / `index.js` re-exporting multiple siblings) in internal feature directories (`data/`, `extension/components/sidepanel/`, `extension/lib/`, etc.).
- **ALWAYS** use direct, explicit file imports:
  - `import { APP_INFO } from "@data/app";` (Not `@data`)
  - `import { CHANGELOG_DATA } from "@data/changelog";` (Not `@data`)
  - `import { SidepanelHeader } from "@/components/sidepanel/header";` (Not `@/components/sidepanel`)
- **Why Barrel Files Harm This Monorepo:**
  1. **Tree-Shaking Failure Across Extension Entrypoints**: Importing from a barrel in `content.ts` or `background.ts` forces the bundler to parse all re-exported modules (including Side Panel UI, audio synthesis presets, and DOM helpers), inflating bundle sizes and slowing in-feed execution.
  2. **Build & Dev Boot Degradation**: Barrel files force Vite and TypeScript to construct broad module graphs, significantly degrading HMR speed and cold starts.
  3. **Circular Dependency Hazards**: Re-exports across closely related modules frequently introduce subtle initialization cycles (`undefined` imports).
  4. **Premature Abstraction**: Small directories (< 5 files) gain zero structural benefit from an extra layer of indirection.
- **Strict Exceptions**:
  - Pure type-only re-exports (`export type * from ...`) that are erased 100% at compile-time.
  - Public external package entry points (when publishing an npm package).

### Rule 7: No Deep Relative Imports (Enforce Path Aliases)

Deep multi-level relative imports (`../../`, `../../../`) are fragile, break during file restructuring, and obscure module boundaries.

- **NEVER** write deep relative traversals of 2 or more parent directories (e.g., `../../data/app`, `../../../lib/presets`).
- **ALWAYS** use configured path aliases:
  - `@/...` for internal project root / `src/` modules (e.g. `@/components/ui/button`, `@/lib/zzfx`).
  - `@data/...` for shared monorepo metadata (e.g. `@data/app`, `@data/changelog`).
- **Permitted Relative Imports**: Sibling imports (`./foo`) and single-level parent imports within the same cohesive domain (`../header` inside `components/sidepanel/`) are permitted.
- **Enforcement**: Strictly enforced via Oxlint's `eslint/no-restricted-imports` rule in `.oxlintrc.json`. Any import pattern with 2+ parent traversal levels will fail `npm run lint`.

### Rule 8: Lucide Icons Suffix Convention (Always Use 'Icon' Suffix)

To maintain naming clarity, eliminate collisions with HTML primitives and domain entities (`Switch`, `Card`, `Badge`, `Button`, `Check`), and align with modern design system ergonomics across the author's applications (DayBook, Sulok, Gemini AI Pro):

- **ALWAYS** import and name icons from `lucide-react` using the `Icon` suffix:
  - `import { Volume2Icon, SparklesIcon, HeartIcon } from "lucide-react";`
  - `import { SunIcon, MoonIcon, MonitorIcon } from "lucide-react";`
  - `import { PlayIcon, CheckIcon, CircleDotIcon, ExternalLinkIcon } from "lucide-react";`
  - `import { DownloadIcon, ArrowRightIcon, ZapIcon, LaptopIcon } from "lucide-react";`
- **NEVER** import bare icon names without the `Icon` suffix (e.g., `import { Sun }` or `import { Heart }` is strictly prohibited).
- **Native Availability**: Modern `lucide-react` natively exports all icon components directly with the `Icon` suffix; never alias manually unless disambiguating an external symbol.

### Rule 9: No Emojis in UI or User-Facing Copywriting (Zero AI-Slop Emojis)

To prevent generic, unpolished AI slop and uphold ThreadFX's sleek, hardware-grade aesthetic:

- **NEVER** use emojis in UI components, buttons, tabs, preset cards, badges, settings panels, or user-facing copywriting.
- **NEVER** use emojis in runtime data structures, preset metadata, or UI labels.
- **ALWAYS** use crisp, semantic Lucide React icons (following Rule 8) or clean typographic hierarchy (`font-mono`, frequency readouts, etc.) for visual distinction.
- **Strict Exception**: Markdown documentation files (e.g., `README.md`) may use tasteful emojis for top-level section headers only, but never in copy exposed to extension or web users. (In-feed canvas particle bursts rendering actual emoji glyphs via `canvas-confetti.shapeFromText` are allowed, provided the Side Panel picker buttons themselves use clean Lucide icons and typographic labels).

### Rule 10: Single Responsibility Principle (SRP — Modular, Domain-Isolated Architecture)

To ensure code maintainability, prevent monolithic bloat, and maintain razor-sharp focus across every layer of the monorepo:

- **Single Reason to Change**: Every component, module, file, and custom hook must have exactly one well-defined responsibility. If a file handles data fetching/store synchronization, UI rendering, complex sub-mode switching, and animation telemetry simultaneously, it violates SRP and must be split.
- **Strict Domain Foldering**: Feature components must live inside their dedicated domain directory:
  - `extension/components/sidepanel/sound-fx/` — Solely audio-related UI (header, grid, cards, channel strips, waveform monitor).
  - `extension/components/sidepanel/particles/` — Solely particle & reaction-related UI (header, mode toggle, palettes grid, emoji card, physics strips, dock monitor).
  - `extension/components/sidepanel/data/` — Solely storage telemetry and data management UI (header, capacity meter, itemized breakdown, actions, dock monitor).
  - `extension/components/ui/` — Solely reusable, domain-agnostic UI primitives (`slider.tsx`, `switch.tsx`, `tabs.tsx`, `popover.tsx`, `emoji-picker.tsx`).
- **Cohesive Component Roles**:
  1. **Root Coordinators (`sound-fx-tab.tsx`, `particles-tab.tsx`, `data-tab.tsx`)**: Own overall layout orchestration (pinned header, scrollable body, docked bottom monitor). They contain **zero** inline complex JSX markup and delegate all domain tasks to specialized child components.
  2. **Context Headers (`sound-profile-header.tsx`, `particle-header.tsx`)**: Own section titles, contextual reset buttons, and master toggle switches.
  3. **Presentational Grids & Cards (`*-grid.tsx`, `*-card.tsx`)**: Grids only map data collections; individual cards solely present single items, handle hover/press states (`active:scale-[0.98]`), and emit selection/preview events.
  4. **Domain Sub-Controllers (`particle-emoji-card.tsx`)**: Encapsulate sub-domain features (active preview, quick reaction presets, and popover catalog triggering) without leaking state to parent coordinators.
  5. **Docked Monitors (`waveform-monitor.tsx`, `particle-dock-monitor.tsx`)**: Solely own telemetry readouts, status LEDs, and one-click audition triggers.
  6. **Fine-Grained Custom Store Hooks (`use-settings.ts`)**: Isolate state subscription selectors via `useSyncExternalStore` (`useMasterToggle`, `useLikesCounter`, `useAudioSettings`, `useParticleSettings`, `useTheme`) so components only re-render when their specific slice of state mutates.

### Rule 11: Don't Repeat Yourself (DRY — Shared Core & Parametric Primitives)

To prevent code duplication, eliminate configuration drift, and ensure changes in one place propagate everywhere:

- **Centralized Monorepo Single Source of Truth (`data/`)**:
  - Never duplicate sound presets, confetti palettes, app metadata, changelogs, or procedural audio engines across `extension` and `website`.
  - All shared configuration lives in `data/` and must be consumed via the `@data/...` path alias.
- **Parametric Control Primitives**:
  - When similar interaction patterns occur across features (e.g. Volume slider vs Pitch slider vs Particle Density vs Burst Spread), extract a parameterized, reusable primitive (`audio-channel-card.tsx`, `particle-slider-card.tsx`) instead of repeating markup.
  - Standardize ticks (`ticks: [string, string, string]`), live value readouts, reset triggers, and icon slots across all slider channel cards.
- **Foundational UI Primitives (`components/ui/`)**:
  - Never hand-roll custom switches, sliders, popovers, or tab bars inside feature files. Always wrap accessible primitives (`radix-ui`, `frimousse`) in `components/ui/` with standardized Tailwind CSS variables and export them for monorepo-wide use.
- **Unified Event & Telemetry Architecture**:
  - Event listener and notification patterns (e.g. `subscribeAudioPulse` / `emitAudioPulse`, `subscribeParticlePulse` / `emitParticlePulse`) must follow identical subscription signatures, ensuring consistent behavior across auditions, preview bursts, and in-feed likes.

### Rule 12: Mandatory Approval Gate (Ask Before Commit & Push)

To maintain complete human oversight and clean version history:

- **NEVER** run `git commit` or `git push` autonomously or without explicit user instruction.
- Always run all quality gates first (`npm run lint`, `npm run format`, `npm run build:all`).
- Present the staged diff summary and proposed conventional commit title (`type(scope): description`), and **pause** for the user's explicit confirmation before running Git commands.

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
	soundPack: "bubble" | "retro" | "hype" | "blip" | "wood" | "zap" | "drop" | "thump"; // Active ZzFX preset
	pitch: number; // Pitch multiplier 0.5x to 2.0x (default: 1.0)
	confettiEnabled: boolean; // Visual confetti on like (default: true)
	likesJuicedCount: number; // Lifetime counter of likes enhanced
	confettiPalette: ConfettiPaletteId; // Active confetti color palette (default: "rose")
	confettiCount: number; // Particle count 10 to 60 (default: 30)
	confettiSpread: number; // Particle spread angle 30 to 90 (default: 55)
	burstMode: "palette" | "emoji"; // Active burst mode (default: "palette")
	selectedEmoji: string; // Active custom reaction emoji (default: "❤️")
	theme: "system" | "dark" | "light"; // Tri-state color scheme (default: "system")
}

// Bounded LRU post cache stored under a separate top-level key for atomic read/write:
// Key: "threadfx_juiced_post_ids" => string[] (max 1,000 permalink post IDs)
```

Whenever `sidepanel` updates settings via `chrome.storage.local.set()`, `content.ts` receives the update immediately via `chrome.storage.onChanged`.

---

## 7. Open Source & Licensing

- **License:** ThreadFX is open-source software distributed under the **MIT License** with **Trademark, Brand & Proprietary Visual Assets Reservation** (see `LICENSE`).
  - Underlying source code and procedural engines are free and open-source under MIT.
  - The name "ThreadFX", brand assets, official icons, and 3D WebP achievement badges in `public/badges/` remain the exclusive proprietary creative property of Nomer Israel and may not be used in competing extensions, commercial distributions, or unauthorized Chrome Web Store clones.
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
