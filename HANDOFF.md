# HANDOFF.md — ThreadFX Development Continuity & Session Brief

> **Purpose:** Read this document immediately when opening a fresh conversation session to resume ThreadFX development with 100% context parity, zero drift, and immediate situational awareness.
>
> **Last Synchronized:** November 15, 2026 (2:00 PM +08:00)  
> **Active Branch:** `main`  
> **Last Commit:** `a8c3a31` (`feat(particles): introduce custom emoji reaction bursts and modularize particles chassis`)  
> **Working Tree Status:** Clean (`origin/main` up to date, 0 uncommitted changes, passes `npm run build:all`).

---

## 1. Executive Summary & Active Status

ThreadFX is an open-source interactive effects, procedural audio, and tactile feedback suite for social feeds, launching with flagship desktop support for **Meta Threads** (`threads.com`).

| Property                  | Value                                                                                             |
| :------------------------ | :------------------------------------------------------------------------------------------------ |
| **Monorepo Version**      | `v1.0.0` (Lockstep across `package.json`, `extension`, `website`, and `data/app.ts`)              |
| **Flagship Target**       | [Threads](https://threads.com) (`threads.net` legacy fallback)                                    |
| **Extension Framework**   | [WXT](https://wxt.dev/) v0.21.5 (Vite 8.3.8) • Manifest V3                                        |
| **Extension UI**          | Chrome Side Panel API (`chrome.sidePanel`) • React 19 • TypeScript                                |
| **Extension Bundle Size** | `.output/threadfx-1.0.0-chrome.zip` (787.8 kB, includes Frimousse 3K+ emojis & self-hosted fonts) |
| **Website**               | Vite 8.3.8 • React 19 • Tailwind CSS v4 • Static build in `website/dist/`                         |
| **Audio Synthesis**       | Zero-latency procedural synthesis via **ZzFX** (MIT, Web Audio API, **0 external audio files**)   |
| **Particle Physics**      | Viewport canvas confetti via `canvas-confetti` (6 palettes + vector emoji reaction bursts)        |
| **Linter / Formatter**    | OXC (`oxlint` + `oxfmt`) — zero errors, zero warnings                                             |
| **Public Production URL** | `https://threadfx.nmrisrl.dev` (Vercel fallback: `https://threadfx.vercel.app`)                   |
| **Distribution**          | `/download` 307 redirect via `vercel.json` to Cloudflare R2 bucket (`$0` egress)                  |
| **Author / Maintainer**   | Nomer Israel ([@nmrisrl](https://threads.com/@nmrisrl)) • MIT License                             |

---

## 2. Core Architectural Rules (Strictly Enforced)

All coding agents and developers working on this repo must strictly obey these rules:

1. **Rule 1: Zero External Audio Files:** NEVER import or fetch `.mp3`, `.wav`, or `.ogg` files. All audio is synthesized in-memory mathematically via ZzFX. Sound presets are stored as compact numeric parameter arrays in `data/presets.ts`.
2. **Rule 2: Minimal Manifest V3 Permissions:** Only `["sidePanel", "storage"]` and `https://*.threads.com/*` (plus `threads.net`). Never add broad or invasive permissions.
3. **Rule 3: Resilient DOM Targeting:** Never query minified/obfuscated classes (e.g. `.x1i10hfl`). Target semantic attributes: `[role="button"][aria-label*="Like" i]`, SVGs, and `MutationObserver` on `main[role="main"]`.
4. **Rule 4: Isolated Styling:** The Side Panel runs in its own document (`sidepanel/index.html`). For in-feed effects, inject `#threadfx-canvas-overlay` with `position: fixed`, `pointer-events: none`, and `z-index: 999999`.
5. **Rule 5: Decoupled Domain & Storage:** All website asset links are relative. The download button links to `/download`, resolving via `vercel.json` to Cloudflare R2.
6. **Rule 6: Avoid Barrel Files (Direct Explicit Imports):** Never create `index.ts` re-exporting multiple siblings. Always import directly from source files (e.g., `import { APP_INFO } from "@data/app"`).
7. **Rule 7: No Deep Relative Imports (Enforce Path Aliases):** Never use 2+ parent directory traversals (`../../`). Use configured path aliases: `@/...` (internal project modules) and `@data/...` (centralized monorepo metadata). Enforced via Oxlint.
8. **Rule 8: Lucide Icons Suffix Convention:** ALWAYS import and render icons with the explicit `Icon` suffix (e.g. `Volume2Icon`, `SparklesIcon`, `RotateCcwIcon`, `SunIcon`, `MoonIcon`, `HeartIcon`, `ZapIcon`, `DownloadIcon`). Bare imports like `import { Sun }` are strictly prohibited.
9. **Rule 9: No Emojis in UI or User-Facing Copywriting:** Zero emojis in buttons, tabs, preset cards, badges, settings panels, or user-facing copywriting. Use crisp Lucide icons or typographic hierarchy. (Markdown headers in docs like `README.md` are exempt; canvas particle bursts rendering actual emoji glyphs via `shapeFromText` are allowed).
10. **Rule 10: Single Responsibility Principle (SRP):** Every component, hook, and module has exactly one reason to change. Root coordinators only manage layout structure; headers own titles and resets; grids map data; cards present single items; monitors own telemetry and audition triggers; store hooks isolate selectors via `useSyncExternalStore`.
11. **Rule 11: Don't Repeat Yourself (DRY):** All shared metadata and procedural engines live in `data/` (`@data/...`). Parameterized slider channels (`audio-channel-card.tsx`, `particle-slider-card.tsx`) standardize ticks, value text, and resets. Base primitives (`slider`, `switch`, `tabs`, `popover`, `emoji-picker`) live in `components/ui/`.
12. **Rule 12: Mandatory Approval Gate:** NEVER run `git commit` or `git push` autonomously. Always present staged diffs, conventional commit titles, and wait for explicit user approval.

---

## 3. Storage Schema (`chrome.storage.local`)

State synchronized in real time across the docked Side Panel and `content.ts`:

```typescript
export interface ThreadFXSettings {
	enabled: boolean; // Master toggle (default: true)
	volume: number; // 0.0 to 1.0 (nominal default: 0.5)
	soundPack: "bubble" | "retro" | "hype" | "blip" | "wood" | "zap" | "drop" | "thump"; // Active ZzFX preset (default: "bubble")
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
```

---

## 4. Completed Milestones (Recent Session Recap)

### 🔊 Sound FX Tab Elevation & Modularization

- **Modular Directory:** Created `extension/components/sidepanel/sound-fx/` and deleted monolithic root files.
- **SRP & DRY Implementation:**
  - `sound-fx-tab.tsx`: Root coordinator with pinned top header, scrollable body, and pinned bottom monitor.
  - `sound-profile-header.tsx`: Chassis header with section title, filter tabs (`All`, `Tactile`, `Arcade`, `Organic`), and dynamic **`↺ Reset`** button.
  - `sound-profile-grid.tsx` & `sound-profile-card.tsx`: Rectangular grid with active checkmark, hover play audition button, and pure `transition-colors duration-150`.
  - `audio-channel-card.tsx`: Reusable slider channel strip for Volume and Pitch Modulation, featuring live value readouts, min/default/max tick labels, and individual reset buttons.
  - `waveform-monitor.tsx`: Pinned 28-band spectrum visualizer with zero-latency badge and 1-click "Audition ▶" button.
- **8 Curated Presets:** Added `Water Drop` (920Hz Organic) and `Sub Thump` (180Hz Tactile) to `data/presets.ts` for clean 4x2 / 2x4 grid symmetry.
- **Default Volume 50%:** Set nominal volume default to `0.5` across storage, presets, and UI with 1-click speaker mute/unmute shortcut.
- **Organic Pitch Jitter (±3%):** Integrated micro-pitch modulation in `applyPitch()` during likes in `content.ts` to eliminate repetitive ear fatigue.
- **Silent Unlike Retreat:** Unliking posts on Threads is completely silent with zero particles or stat increments.

### 🎨 Header & Metric Strip Layout Hierarchy

- **Tier 1 (Header):** Brand name + version pill on left; dedicated master hardware toggle pill with live emerald indicator on right.
- **Tier 2 (Metric Strip):** Neutral heart icon (`text-muted-foreground`) with lifetime counter on left; ambient tri-state theme switcher (`System`, `Dark`, `Light`) on right.

### 🌟 Particles Tab Modernization & Elevation

- **Modular Architecture:** Fully modularized `extension/components/sidepanel/particles/` following strict SRP, zero barrel files, and path aliases.
- **Curated 6-Palette Library:** Expanded from 4 to 6 palettes in `data/particles.ts` (`Soft Rose`, `Silver Minimal`, `Cyber Neon`, `Warm Gold`, `Mint Aurora`, `Sunset Coral`) with 2-column container query grid.
- **Custom Emoji Reaction Bursts:** Enabled canvas vector emoji synthesis via `canvas-confetti.shapeFromText` for in-feed likes on Threads and panel auditions.
- **Frimousse Emoji Picker Integration (`emoji-picker.tsx` & `popover.tsx`):** Headless, virtualized, shadcn-compatible emoji picker (`frimousse`) inside a floating Popover for searching 3,000+ Unicode emojis.
- **Balanced 2-Column Emoji Architecture (`particle-emoji-card.tsx`):** On wide side panels (`@[520px]/emoji-card`), splits seamlessly into a 50/50 layout (active preview & catalog browser on the left, 4x2 quick-reaction grid on the right), matching the 2-column physics sliders below and eliminating empty voids. In compact viewports, cleanly stacks in natural top-to-bottom order.
- **Zero Layout Shifts (CLS = 0.00):** Standardized on pure `transition-colors duration-150` with constant border geometry, completely eliminating click scale wobble (`active:scale`) and layout jitter across palette cards, emoji buttons, and the mode toggle.
- **Segmented Mode Controller (`particle-mode-toggle.tsx`):** Effortlessly switch between signature color palettes and expressive custom emoji reaction bursts with constant 1px border geometry.
- **Pinned Context Header (`particle-header.tsx`):** Pinned `Particle Bursts` section title, contextual `↺ Reset` buttons for both palettes and emojis, and master burst FX toggle switch.
- **Adaptive 2-Channel Physics Strip (`particle-physics-strip.tsx` & `particle-slider-card.tsx`):** Reusable slider cards for Particle Density (10–60) and Burst Spread (30°–90°) with real-time value text, reference scale ticks, and individual reset buttons.
- **Docked Particle Horizon Monitor (`particle-dock-monitor.tsx`):** Pinned bottom dock with hardware-grade emerald status LED (matching the Sound FX spectrum monitor and header "Active" indicator), active palette/emoji badges, 24-point horizon particle trajectory visualization, and a 1-click "Trigger Burst ▶" button synchronized with live pulses.
- **Footer Version Cleanup:** Removed redundant version string from the footer (`footer.tsx`), keeping version anchored exclusively in the top header.

### 🎯 In-Feed Action Precision & Interactivity Expansion

- **Dedicated Threads Action Classifier (`threads-detector.ts`):** Extracted DOM event classification into a domain-isolated module following SRP. Replaced fragile `d*="M12"` substring matching with exact vector Bézier anchor fingerprinting (`M16.792` for outline heart, `M18 2.084` for filled heart, `M12 21.35` for standard heart) paired with explicit negative guards. Completely eliminated false-positive audio/confetti triggers on Reply, Repost, Share, More options, Navigation, and like counter links.
- **Precision In-Feed Social Interactivity Suite (`content.ts` & `data/presets.ts`):**
  - **Unlike Soft Retreat:** Gentle descending sine tone (`360Hz` -> `220Hz`) on unlike, offering tactile confirmation without confetti or stat increments.
  - **Repost Audio Chime & Emerald Sparks:** Uplifting dual-harmonic chime (`580Hz` -> `870Hz`) and subtle 20-particle emerald/cyan burst on Repost.
  - **Bookmark / Save Sparkle:** Crisp tactile triangle chime (`720Hz` -> `900Hz`) and 16-particle golden sparkle on Bookmark.
  - **Post Published Fanfare:** Celebratory double chime and 45-particle fanfare upon publishing a post from the composer.
- **Soundboard Keyboard Hotkeys (Keys 1–8):** Pressing number keys `1` through `8` in the Side Panel or companion simulator instantly selects and auditions the sound pack, with visual keycap badges rendered on each sound card.
- **Synchronized Companion Web Simulator (`website/`):** Brought landing page interactive simulator to 100% feature parity with the extension—supporting live Pitch Modulation (0.5x–2.0x), dual-mode Particle Selector (6 palettes or custom emoji bursts), and interactive like & repost reactions.

---

## 5. Next Focus & Backlog

Next sprint milestones to tackle from `docs/FEATURE_BLUEPRINT.md`:

1. **Global Keyboard Audio Mute Shortcut:**
   - Shortcut key (`Alt+Shift+M`) to toggle master audio on/off across active tabs without opening the Side Panel.
2. **Smart Audio Ducking:**
   - Automatically suppress or soften SFX when an in-feed video on Threads is actively playing audio.
3. **Engagement Milestones:**
   - Celebratory visual fanfare on milestone likes (10th, 50th, 100th, 500th like).

---

## 6. Fast Verification Commands

When resuming in the next session, run these commands to verify repository health:

```powershell
# Format check
npm.cmd run format

# Lint check (0 errors, 0 warnings expected)
npm.cmd run lint

# Monorepo build check (compiles extension, zips it, and compiles website)
npm.cmd run build:all
```

---

## 7. Useful File Links

- **Agent Guidelines:** [`AGENTS.md`](file:///c:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/threadfx/AGENTS.md)
- **Staged Release Notes:** [`PENDING_CHANGES.md`](file:///c:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/threadfx/PENDING_CHANGES.md)
- **Root README:** [`README.md`](file:///c:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/threadfx/README.md)
- **Master Feature Blueprint:** [`docs/FEATURE_BLUEPRINT.md`](file:///c:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/threadfx/docs/FEATURE_BLUEPRINT.md)
- **Central App Metadata:** [`data/app.ts`](file:///c:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/threadfx/data/app.ts)
- **Central Particle Presets:** [`data/particles.ts`](file:///c:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/threadfx/data/particles.ts)
- **Central Sound Presets:** [`data/presets.ts`](file:///c:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/threadfx/data/presets.ts)
- **Particles Tab Coordinator:** [`extension/components/sidepanel/particles/particles-tab.tsx`](file:///c:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/threadfx/extension/components/sidepanel/particles/particles-tab.tsx)
- **Emoji Card Controller:** [`extension/components/sidepanel/particles/particle-emoji-card.tsx`](file:///c:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/threadfx/extension/components/sidepanel/particles/particle-emoji-card.tsx)
- **Sound FX Tab Coordinator:** [`extension/components/sidepanel/sound-fx/sound-fx-tab.tsx`](file:///c:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/threadfx/extension/components/sidepanel/sound-fx/sound-fx-tab.tsx)
- **Extension Settings Store:** [`extension/hooks/use-settings.ts`](file:///c:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/threadfx/extension/hooks/use-settings.ts)
- **Design Tokens:** [`docs/BRAND.md`](file:///c:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/threadfx/docs/BRAND.md)
- **Architecture & Sequence:** [`docs/ARCHITECTURE.md`](file:///c:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/threadfx/docs/ARCHITECTURE.md)
