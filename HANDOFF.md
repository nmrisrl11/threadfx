# HANDOFF.md — ThreadFX Development Continuity & Session Brief

> **Purpose:** Read this document immediately when opening a fresh conversation session to resume ThreadFX development with 100% context parity, zero drift, and immediate situational awareness.
>
> **Last Synchronized:** November 15, 2026 (00:05 AM +08:00)  
> **Active Branch:** `main` (clean working tree, pushed to `origin/main`)  
> **Last Commit:** `1916606` (`refactor(docs): synchronize theming, lucide icons convention, and docs architecture`)

---

## 1. Executive Summary & Active Status

ThreadFX is an open-source interactive effects, procedural audio, and tactile feedback suite for social feeds, launching with flagship desktop support for **Meta Threads** (`threads.com`).

| Property | Value |
| :--- | :--- |
| **Monorepo Version** | `v1.0.0` (Lockstep across `package.json`, `extension`, `website`, and `data/app.ts`) |
| **Flagship Target** | [Threads](https://threads.com) (`threads.net` legacy fallback) |
| **Extension Framework** | [WXT](https://wxt.dev/) v0.21.5 (Vite 8.3.8) • Manifest V3 |
| **Extension UI** | Chrome Side Panel API (`chrome.sidePanel`) • React 19 • TypeScript |
| **Extension Bundle Size** | `.output/threadfx-1.0.0-chrome.zip` (752.4 kB, self-hosted fonts included) |
| **Website** | Vite 8.3.8 • React 19 • Tailwind CSS v4 • Static build in `website/dist/` |
| **Audio Synthesis** | Zero-latency procedural synthesis via **ZzFX** (MIT, Web Audio API, **0 external audio files**) |
| **Particle Physics** | Viewport canvas confetti via `canvas-confetti` (custom palettes, count, spread) |
| **Linter / Formatter** | OXC (`oxlint` + `oxfmt`) — zero errors, zero warnings |
| **Public Production URL** | `https://threadfx.nmrisrl.dev` (Vercel fallback: `https://threadfx.vercel.app`) |
| **Distribution** | `/download` 307 redirect via `vercel.json` to Cloudflare R2 bucket (`$0` egress) |
| **Author / Maintainer** | Nomer Israel ([@nmrisrl](https://threads.com/@nmrisrl)) • MIT License |

---

## 2. Core Architectural Rules (Strictly Enforced)

All coding agents and developers working on this repo must strictly obey these rules:

1. **Rule 1: Zero External Audio Files:** NEVER import `.mp3`, `.wav`, or `.ogg` files. All audio is synthesized in-memory mathematically via ZzFX.
2. **Rule 2: Minimal Manifest V3 Permissions:** Only `["sidePanel", "storage"]` and `https://*.threads.com/*` (plus `threads.net`). Never add broad or invasive permissions.
3. **Rule 3: Resilient DOM Targeting:** Never query minified/obfuscated classes (e.g. `.x1i10hfl`). Target semantic attributes: `[role="button"][aria-label*="Like" i]`, SVGs, and `MutationObserver` on `main[role="main"]`.
4. **Rule 4: Isolated Styling:** The Side Panel runs in its own document. For in-feed effects, inject `#threadfx-canvas-overlay` with `position: fixed`, `pointer-events: none`, and `z-index: 999999`.
5. **Rule 5: Decoupled Domain & Storage:** All website asset links are relative. The download button links to `/download`, resolving via `vercel.json` to Cloudflare R2.
6. **Rule 6: Avoid Barrel Files (Direct Explicit Imports):** Never create `index.ts` re-exporting multiple siblings. Always import directly from source files (e.g., `import { APP_INFO } from "@data/app"`).
7. **Rule 7: No Deep Relative Imports:** Never use 2+ parent directory traversals (`../../`). Use configured path aliases: `@/...` (internal project modules) and `@data/...` (centralized monorepo metadata). Enforced via Oxlint.
8. **Rule 8: Lucide Icons Suffix Convention:** ALWAYS import and render icons with the explicit `Icon` suffix (e.g. `Volume2Icon`, `SparklesIcon`, `SunIcon`, `MoonIcon`, `HeartIcon`, `ZapIcon`, `DownloadIcon`). Bare imports like `import { Sun }` are strictly prohibited.
9. **Mandatory Approval Gate:** NEVER run `git commit` or `git push` autonomously. Always present staged diffs, conventional commit titles, and wait for explicit user approval.

---

## 3. Storage Schema (`chrome.storage.local`)

State synchronized in real time across the docked Side Panel and `content.ts`:

```typescript
export interface ThreadFXSettings {
	enabled: boolean; // Master toggle (default: true)
	volume: number; // 0.0 to 1.0 (default: 0.6)
	soundPack: "bubble" | "retro" | "hype" | "blip"; // Active ZzFX preset
	confettiEnabled: boolean; // Visual confetti on like (default: true)
	likesJuicedCount: number; // Lifetime counter of likes enhanced
	theme: "system" | "dark" | "light"; // Tri-state color scheme (default: "system")
	confettiPalette: ConfettiPaletteId; // Active confetti color palette (default: "neon")
	confettiCount: number; // Particle count (default: 30)
	confettiSpread: number; // Particle spread angle (default: 55)
}
```

---

## 4. Current State of Recent Features (Completed)

### 🌓 Independent Tri-State Theming & Modern shadcn Architecture
- **Theme Switcher:** Added `theme-toggle.tsx` in the Side Panel header supporting `System`, `Dark`, and `Light`.
- **Zero-FOUC Initialization:** `sidepanel/main.tsx` executes `initTheme()` synchronously before React mounts, checking `localStorage` cache for instant theme rendering without flash.
- **Modern shadcn CSS Variables:** Migrated Side Panel styling to Tailwind CSS v4 CSS variables (`@import "shadcn/tailwind.css"` and `@custom-variant dark (&:is(.dark *))`).
- **Decoupled JSX:** All Side Panel components are completely decoupled from manual `dark:` utility overrides, trimming ~7.3 kB from the CSS bundle.
- **Live OS Media Query Sync:** When set to `"system"`, a `matchMedia("(prefers-color-scheme: dark)")` listener dynamically updates the UI when the user's OS changes theme.

### 🎨 Lucide Icons Suffix Standardization (Rule 8)
- Enforced Rule 8 across all 8 component files in `extension/` and `website/src/App.tsx`.
- 100% of Lucide icons now use the `*Icon` suffix, preventing name collisions with UI primitives.

### 📁 Centralized Documentation in `docs/`
- Reorganized docs into a clean dedicated folder:
  - `docs/ARCHITECTURE.md` (System diagrams, sequence flows, Web Audio pipeline, theming architecture)
  - `docs/BRAND.md` (Dual-mode token matrix for AMOLED Dark & Clean Slate Light, typography, brand assets)
  - `docs/FEATURE_BLUEPRINT.md` (Living product checklist, completed features marked)
  - `docs/UNIVERSAL_FX_ROADMAP.md` (Multi-platform adapter pattern for X, Bluesky, Facebook)
- Clean root markdown files: `README.md`, `AGENTS.md`, `PENDING_CHANGES.md`, `LICENSE`, `HANDOFF.md`.

### 🤖 Synchronized Workflow Skills (`.agents/skills/`)
- `load-project-context/SKILL.md`: Updated with full storage schema, Rules 5–8.
- `sync-documentation/SKILL.md`: Includes theming and iconography drift audits.
- `release-extension/SKILL.md`: Clarified `@data/app` version propagation.
- `commit-and-push/SKILL.md`: Enforces mandatory approval gate before any commit/push.

---

## 5. Immediate Next Steps for Tomorrow

### Task 1: Open Graph Social Card (Ready to Finalize)
The user has an online social card generator open with:
- **Credit:** `Built by @nmrisrl`
- **Ghost Text:** `threadfx`
- **Title (Option 1 - Recommended):**  
  `Turn silent scrolling into a tactile experience with procedural audio, particle bursts, and micro-motion.`
- **Logo:** Keep default blue circle in generator, download image, and place in `temp-process-logo-here/`.
- **Action:** Composite our bespoke 3D liquid chrome squircle emblem over the blue sphere using Python (matching our earlier pixel-perfect composite pipeline).

### Task 2: Centralize Sound Presets to `@data/presets`
- `presets.ts` is currently duplicated across `extension/lib/presets.ts` and `website/src/lib/presets.ts`.
- Move presets to `data/presets.ts` so both workspaces import from `@data/presets` (matching `@data/app` and `@data/changelog`).

### Task 3: In-Feed Interaction Expansion (from `docs/FEATURE_BLUEPRINT.md`)
- **Emoji Reaction Bursts:** Option to burst emojis (`❤️`, `🔥`, `🎉`, `🚀`, `💎`) using `canvas-confetti` shape rendering.
- **Sound Pitch & Speed Modifiers:** Sliders in the Side Panel to adjust playback pitch (0.5x–2.0x).
- **Unlike Soft Descending Blip:** Play a gentle descending pop when unliking a post.
- **Keyboard Shortcuts:** `Alt+Shift+M` global mute shortcut.

---

## 6. Fast Verification Commands

When resuming in the next session, run these commands to verify repository health:

```powershell
# Format check
npm.cmd run format

# Lint check (0 errors, 0 warnings expected)
npm.cmd run lint

# Monorepo build check
npm.cmd run build:all
```

---

## 7. Useful File Links

- **Agent Guidelines:** [`AGENTS.md`](file:///C:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/threadfx/AGENTS.md)
- **Staged Release Notes:** [`PENDING_CHANGES.md`](file:///C:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/threadfx/PENDING_CHANGES.md)
- **Central App Metadata:** [`data/app.ts`](file:///C:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/threadfx/data/app.ts)
- **Feature Roadmap:** [`docs/FEATURE_BLUEPRINT.md`](file:///C:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/threadfx/docs/FEATURE_BLUEPRINT.md)
- **Design Tokens:** [`docs/BRAND.md`](file:///C:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/threadfx/docs/BRAND.md)
- **Architecture & Sequence:** [`docs/ARCHITECTURE.md`](file:///C:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/threadfx/docs/ARCHITECTURE.md)
- **Extension Side Panel Styles:** [`extension/entrypoints/sidepanel/style.css`](file:///C:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/threadfx/extension/entrypoints/sidepanel/style.css)
- **Extension Settings Store:** [`extension/hooks/use-settings.ts`](file:///C:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/threadfx/extension/hooks/use-settings.ts)
