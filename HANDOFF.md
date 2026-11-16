# HANDOFF.md — ThreadFX Development Continuity & Session Brief

> **Purpose:** Read this document immediately when opening a fresh conversation session to resume ThreadFX development with 100% context parity, zero drift, and immediate situational awareness.
>
> **Last Synchronized:** November 16, 2026 (11:50 AM +08:00)  
> **Active Branch:** `main`  
> **Working Tree Status:** Clean code state with flattened components directory architecture, standardized `*Section` coordinators, and dedicated `layout/` folder. All formatting (`oxfmt`), linting (`oxlint` 0 errors, 0 warnings), and production builds (`build:all`) passing cleanly.

---

## 1. Executive Summary & Active Status

ThreadFX is an open-source interactive effects, procedural audio, and tactile feedback suite for social feeds, launching with flagship desktop support for **Meta Threads** (`threads.com`).

| Property                  | Value                                                                                               |
| :------------------------ | :-------------------------------------------------------------------------------------------------- |
| **Monorepo Version**      | `v1.0.0` (Lockstep across `package.json`, `extension`, `website`, and `data/app.ts`)                |
| **Flagship Target**       | [Threads](https://threads.com) (`threads.net` legacy fallback)                                      |
| **Extension Framework**   | [WXT](https://wxt.dev/) v0.21.5 (Vite 8.3.8) • Manifest V3                                          |
| **Extension UI**          | Chrome Side Panel API (`chrome.sidePanel`) • React 19 • TypeScript                                  |
| **Extension Bundle Size** | `.output/threadfx-1.0.0-chrome.zip` (882 KB, includes 7 WebP badges, Frimousse emojis & fonts)      |
| **Website**               | Vite 8.3.8 • React 19 • Tailwind CSS v4 • Modularized landing architecture in `components/landing/` |
| **Audio Synthesis**       | Zero-latency procedural synthesis via **ZzFX** (MIT, Web Audio API, **0 external audio files**)     |
| **Particle Physics**      | Viewport canvas confetti via `canvas-confetti` (6 palettes + vector emoji reaction bursts)          |
| **Progression Engine**    | 7 Sensory ranks with 3D WebP achievement badges, lifetime odometer, and victory fanfares            |
| **Linter / Formatter**    | OXC (`oxlint` + `oxfmt`) — zero errors, zero warnings                                               |
| **Public Production URL** | `https://threadfx.nmrisrl.dev` (Vercel fallback: `https://threadfx.vercel.app`)                     |
| **Distribution**          | `/download` 307 redirect via `vercel.json` to Cloudflare R2 bucket (`$0` egress)                    |
| **Author / Maintainer**   | Nomer Israel ([@nmrisrl](https://threads.com/@nmrisrl)) • MIT License (Brand & Assets Reserved)     |

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

// Bounded LRU post cache stored under a separate top-level key for atomic read/write:
// Key: "threadfx_juiced_post_ids" => string[] (max 1,000 permalink post IDs)
```

---

## 4. Completed Milestones (Recent Session Recap)

### 🔔 In-App Release Notification & Header Architecture Elevation

- **Abstracted `UpdateBanner` Component (`update-banner.tsx`):** Extracted update alert row from `header.tsx` into a dedicated, SRP-compliant component that returns `null` when no update is ready or when dismissed for the session.
- **Zero Color Noise & Visual Discipline:** Purged all distracting bright amber (`text-amber-500`) and neon pink tints across update alerts, the Storage tab, and `VersionUpdateCard`. Standardized on calm, hardware-grade monochrome tokens (`border-border`, `bg-card/60`, `text-muted-foreground`, `text-foreground`).
- **Header Layout Collision Fix:** Re-engineered `header.tsx` with explicit `shrink-0` bounds on global power controls and close buttons, preventing layout breakage or clipped buttons on narrow 320px Side Panels.
- **Absolute URL Resolution (`resolveDownloadUrl`):** Fixed relative `/download` links in extension context that caused Chrome `ERR_FILE_NOT_FOUND` (`chrome-extension://.../download`), ensuring all extension download links resolve directly to the production web endpoint (`https://threadfx.nmrisrl.dev/download`).
- **Reactive Multi-Consumer Store Synchronization:** Subscribed `useUpdateCheck` to `chrome.storage.onChanged` for live, real-time synchronization across header, tab triggers, and the Storage tab without requiring unmounts or reloads.
- **`VersionUpdateCard` Elevation (`version-update-card.tsx`):** Standardized card padding (`p-3.5`), radius (`rounded-xl`), and button interaction feedback (`active:scale-[0.98]`) to match sibling `DataActionsCard` and `StorageMeterCard`.

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

- **Tier 1 (Header):** Brand name + version pill on left; dedicated master hardware toggle pill with live emerald indicator and close button on right.
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

### 🎯 In-Feed Action Precision & Interactivity Expansion

- **Dedicated Threads Action Classifier (`threads-detector.ts`):** Extracted DOM event classification into a domain-isolated module following SRP. Replaced fragile `d*="M12"` substring matching with exact vector Bézier anchor fingerprinting (`M16.792` for outline heart, `M18 2.084` for filled heart, `M12 21.35` for standard heart) paired with explicit negative guards. Completely eliminated false-positive audio/confetti triggers on Reply, Repost, Share, More options, Navigation, and like counter links.
- **Precision In-Feed Social Interactivity Suite (`content.ts` & `data/presets.ts`):**
  - **Unlike Soft Retreat:** Gentle descending sine tone (`360Hz` -> `220Hz`) on unlike, offering tactile confirmation without confetti or stat increments.
  - **Repost Audio Chime & Emerald Sparks:** Uplifting dual-harmonic chime (`580Hz` -> `870Hz`) and subtle 20-particle emerald/cyan burst on Repost.
  - **Bookmark / Save Sparkle:** Crisp tactile triangle chime (`720Hz` -> `900Hz`) and 16-particle golden sparkle on Bookmark.
  - **Post Published Fanfare:** Celebratory double chime and 45-particle fanfare upon publishing a post from the composer.
- **Soundboard Keyboard Hotkeys (Keys 1–8):** Pressing number keys `1` through `8` in the Side Panel or companion simulator instantly selects and auditions the sound pack, with visual keycap badges rendered on each sound card.
- **Side Panel Toggle Shortcut & Lifecycle (`wxt.config.ts` & `background.ts`):** Registered manifest command `toggle-sidepanel` (`Alt+Shift+T` / `Escape`) using `chrome.commands.onCommand` for trusted user-gesture side panel opening and bi-directional background port tracking to seamlessly toggle (open when closed, close when open), plus an explicit `X` close trigger in `header.tsx`.
- **Sensory Juicer Milestones & 3D WebP Badges (`milestones.ts`, `milestones-popover.tsx`, `metric-strip.tsx`):**
  - Generated and processed 7 bespoke, 100% symmetrical, 3D achievement badges (`Bronze`, `Silver`, `Gold`, `Diamond`, `Master`, `Grand`, `Mythic`) into high-DPI transparent WebPs (`milestone-1.webp` through `milestone-7.webp`) in `extension/public/badges/` and `website/public/badges/`.
  - Implemented `MilestonesPopover` with active milestone badge in `MetricStrip`, dynamic progress bar, 7-badge collector shelf with locked silhouettes, and interactive preview inspection card.
- **Smart Juicer Anti-Farming Shield & Rate Limit Guard (`threads-detector.ts`, `storage.ts`, `content.ts`):**
  - Maintains a rolling cache of up to 1,000 recently juiced post IDs in `chrome.storage.local` paired with an in-memory `Set`. Re-liking delivers 100% tactile audio and confetti feedback, but shields the odometer and milestone unlocks from duplicate increments.
  - 1,000ms velocity cadence limiter protects accounts from triggering Meta rate limits.
- **Interactive Data Management & Storage Hub (`data-tab.tsx`, `use-storage-telemetry.ts`):**
  - Dedicated "Storage" chassis tab with real-time capacity progress meter, itemized breakdown (Post Memory, Settings, Milestones), and safe 2-step data action buttons.

### 🌐 Landing Page Architecture Elevation & Hero Craftsmanship (`website/`)

- **SRP Decomposition of Monolithic `App.tsx`:** Decomposed into dedicated, single-responsibility modules directly under `website/src/components/`:
  - `components/layout/`: Chrome & page layout components (`navbar.tsx`, `footer.tsx`).
  - `components/hero/`: Modular hero coordinator (`hero-section.tsx`, `hero-waveform.tsx`, `hero-scroll-cue.tsx`).
  - `components/simulator/`: Domain-isolated audio/particle simulator (`simulator-section.tsx`, `soundboard-panel.tsx`, `audio-sliders.tsx`, `particle-controls.tsx`, `thread-post-mock.tsx`).
  - `components/features/`: Feature showroom and DRY parametric cards (`feature-section.tsx`, `feature-card.tsx`).
  - `components/milestones/`: Juicer ranks & 3D medal gallery (`milestones-section.tsx`, `medal-card.tsx`).
  - `components/install/`: 3-stage installation tray and update callout (`install-section.tsx`, `update-callout.tsx`).
- **Purged AI-Slop Visual Noise:** Eliminated fuzzy rainbow blur blobs, split-color gradient text, and cookie-cutter 6-card SaaS template grids in favor of deep obsidian surfaces (`#080808` / `#111114`) and hairline borders (`rgba(255,255,255,0.08)`).
- **Hero Section Finalized to Precision Proportions & Tactile Interactivity:**
  - **Full-Viewport Framing:** Structured with `min-h-dvh flex flex-col justify-between items-center` to command the user's field of view on screen load.
  - **3D Brand Emblem (`size-28 sm:size-36`) with Integrated Acoustic Pedestal:** Balanced 112px–144px picture container with `<source srcSet="/icons/512.webp" type="image/webp" />` and `.png` fallback. Elevated with an integrated 28-band monochrome waveform monitor (`hero-waveform.tsx`) docked directly beneath the emblem, featuring live micro-telemetry whispers (`Bubble Pop · 420Hz`) and resonant frequency peak biasing.
  - **Round-Robin Sound Cycling (Rounding SFX):** Tapping the logo sequentially auditions all 8 procedural sound presets in `SOUND_PACK_LIST` (`Bubble Pop` $\to$ `8-Bit Coin` $\to$ `Hype Spark` $\to$ `Minimal Click` $\to$ `Wood Tap` $\to$ `Neon Zap` $\to$ `Water Drop` $\to$ `Sub Thump`), dynamically updating the frequency readout and spectrum bars on each tap.
  - **Subtle Silver Minimal Flanking Particles:** Configured dual-flank bursts (`CONFETTI_PALETTES.monochrome`) that emerge outward from the left and right edges behind the logo (`zIndex: 1`), keeping the 3D chrome artwork crisp and unobstructed.
  - **Guaranteed Symmetrical 2-Liner Typography:** Balanced headline and sub-description break cleanly into 2-liners with zero orphan words:
    `Turn silent scrolling / into a tactile experience.`
    `Procedural sound synthesis and particle dynamics for social feeds. / Made for the social web, docked right in your browser.`
  - **Single Tactile CTA:** Styled after author's proven `gemini-ai-pro-app` CTA (`rounded-full border border-white/60 bg-gradient-to-b from-white via-[#fafafa] to-[#e8e8e8] px-10 py-4 sm:px-11 sm:py-4.5 text-[16px] sm:text-[17px] font-semibold text-neutral-900 shadow-[0_12px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,1)]`). Completely icon-free and protected with `select-none`.
  - **Global Monochromatic Text Selection:** Configured soft frosted monochrome text selection (`rgba(255,255,255,0.22)` with `#ffffff` text) across `website/src/index.css`, replacing browser electric blue with clean dark-mode highlights while protecting interactive buttons from drag-selection.
  - **Apple-Style Scroll Cue:** Minimalist bottom pill featuring an animated bouncing dot and `TRY THE SIMULATOR` in clean monospaced tracking.
  - **Native Right-Click & Selection Preserved:** Removed context menu blockers to ensure native browser right-click behavior.
  - **Temporary Navbar Concealment:** `<Navbar />` temporarily commented out in `App.tsx` for focused hero visual iteration.

---

## 5. Next Focus: Resuming Landing Page Elevation Tomorrow

When resuming development in the next session, proceed through the following sections in order:

1. **The Instrument / Simulator Section (`website/src/components/landing/simulator/`):**
   - Review and polish the interactive soundboard pads, channel sliders (Volume & Pitch), and particle controls.
   - Refine the simulated Threads feed post card to ensure maximum physical tactile satisfaction upon liking and reposting.
2. **Feature Showcase Gallery (`website/src/components/features/`):**
   - Review the 4 asymmetrical feature cards (Sound Effects, Celebrations, Side Panel, and 100% On-Device Privacy).
3. **Gamification & Medal Gallery (`website/src/components/landing/milestones/`):**
   - Review the 7-tier juicer milestone rank showcase and 3D WebP medal hover states.
4. **Install Tray (`website/src/components/landing/install/`):**
   - Review the 3-step developer package installation walkthrough and one-click copyable `chrome://extensions` snippet.
5. **Navbar Alignment & Final Polish (`website/src/components/landing/navbar.tsx`):**
   - Re-enable the floating frosted navbar in `App.tsx` once section styling is locked, ensuring seamless scroll-spy or anchor navigation.

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
- **Website App Entry:** [`website/src/App.tsx`](file:///c:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/threadfx/website/src/App.tsx)
- **Website Vercel Config:** [`website/vercel.json`](file:///c:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/threadfx/website/vercel.json)
- **Central App Metadata:** [`data/app.ts`](file:///c:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/threadfx/data/app.ts)
- **Central Juicer Milestones:** [`data/milestones.ts`](file:///c:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/threadfx/data/milestones.ts)
- **Central Particle Presets:** [`data/particles.ts`](file:///c:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/threadfx/data/particles.ts)
- **Central Sound Presets:** [`data/presets.ts`](file:///c:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/threadfx/data/presets.ts)
- **Design Tokens:** [`docs/BRAND.md`](file:///c:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/threadfx/docs/BRAND.md)
- **Architecture & Sequence:** [`docs/ARCHITECTURE.md`](file:///c:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/threadfx/docs/ARCHITECTURE.md)
- **Security & Distribution:** [`docs/SECURITY_AND_DISTRIBUTION.md`](file:///c:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/threadfx/docs/SECURITY_AND_DISTRIBUTION.md)
