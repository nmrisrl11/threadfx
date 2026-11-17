# HANDOFF.md — ThreadFX Development Continuity & Session Brief

> **Purpose:** Read this document immediately when opening a fresh conversation session to resume ThreadFX development with 100% context parity, zero drift, and immediate situational awareness.
>
> **Last Synchronized:** November 17, 2026 (11:00 AM +08:00)  
> **Active Branch:** `main`  
> **Working Tree Status:** Fixed curtain reveal footer and dynamic height docking implemented on the companion website. Staged `main` curtain container with Emil Kowalski downward elevation shadow and zero-border edge-to-edge separation; integrated autonomous `ResizeObserver` on `footerRef` dynamically calculating `marginBottom`; restored full light and dark mode adaptation via semantic tokens (`bg-background text-foreground`, `border-border`, `text-muted-foreground`); purged all top ambient gradient noise; upgraded `overflow-x: hidden` to modern `overflow-x: clip`. All formatting (`oxfmt`), linting (`oxlint` 0 errors, 0 warnings), and production builds (`build:all`) passing cleanly.

---

## 1. Executive Summary & Active Status

ThreadFX is an open-source interactive effects, procedural audio, and tactile feedback suite for social feeds, launching with flagship desktop support for **Meta Threads** (`threads.com`).

| Property                  | Value                                                                                                           |
| :------------------------ | :-------------------------------------------------------------------------------------------------------------- |
| **Monorepo Version**      | `v1.0.0` (Lockstep across `package.json`, `extension`, `website`, and `data/app.ts`)                            |
| **Flagship Target**       | [Threads](https://threads.com) (`threads.net` legacy fallback)                                                  |
| **Extension Framework**   | [WXT](https://wxt.dev/) v0.21.5 (Vite 8.3.8) • Manifest V3                                                      |
| **Extension UI**          | Chrome Side Panel API (`chrome.sidePanel`) • React 19 • TypeScript                                              |
| **Extension Bundle Size** | `.output/threadfx-1.0.0.zip` & `threadfx-latest.zip` (882 KB, includes 7 WebP badges, Frimousse emojis & fonts) |
| **Website**               | Vite 8.3.8 • React 19 • Tailwind CSS v4 • Modularized landing architecture in `components/landing/`             |
| **Audio Synthesis**       | Zero-latency procedural synthesis via **ZzFX** (MIT, Web Audio API, **0 external audio files**)                 |
| **Particle Physics**      | Viewport canvas confetti via `canvas-confetti` (6 palettes + vector emoji reaction bursts)                      |
| **Progression Engine**    | 7 Sensory ranks with 3D WebP achievement badges, lifetime odometer, and victory fanfares                        |
| **Linter / Formatter**    | OXC (`oxlint` + `oxfmt`) — zero errors, zero warnings                                                           |
| **Public Production URL** | `https://threadfx.nmrisrl.dev` (Vercel fallback: `https://threadfx.vercel.app`)                                 |
| **Distribution**          | `/download` 307 redirect via `vercel.json` to Cloudflare R2 bucket (`$0` egress)                                |
| **Author / Maintainer**   | Nomer Israel ([@nmrisrl](https://threads.com/@nmrisrl)) • MIT License (Brand & Assets Reserved)                 |

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

### 🎭 Fixed Curtain Reveal Footer & Dynamic Height Docking (`website/`)

- **Responsive Milestone Badge Centering & Top Control Polish (`MilestonePanel`):** Removed hardcoded `md:w-[460px]` from active panel presentation, centering 3D medals directly over background podiums. Redesigned the top bar with tier-themed jewel badges (`tier.accentBadgeBg`), adaptive fanfare audio pills (`Fanfare` on compact screens, `Play Fanfare` on desktop), and calibrated tablet padding (`md:p-4`) with `md:grow-[4.75]`, completely eliminating text truncation, button clipping, and header collision on tablet and iPad Mini viewports.
- **Responsive Milestone Badge Centering & Top Control Polish (`MilestonePanel`):** Removed hardcoded `md:w-[460px]` from active panel presentation, centering 3D medals directly over background podiums. Redesigned the top bar with tier-themed jewel badges (`tier.accentBadgeBg`), adaptive fanfare audio pills (`Fanfare` on compact screens, `Play Fanfare` on desktop), and calibrated tablet padding (`md:p-4`) with `md:grow-[4.75]`, completely eliminating text truncation, button clipping, and header collision on tablet and iPad Mini viewports.
- **Curtain Lift Staging (`App.tsx` & `main`):** Re-architected the main page content as a physical lifting curtain (`relative z-10 bg-background mb-[55vh] will-change-transform shadow-[0_24px_48px_-12px_rgba(0,0,0,0.08)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.65)]`) that rolls up smoothly at the end of the scroll to uncover the fixed footer underneath.
- **Dynamic Height Synchronization (`ResizeObserver`):** Integrated an autonomous height listener on `footerRef` measuring the footer's exact rendered bounding box (`Math.round(rect.height)`), applying it dynamically to `main`'s `marginBottom` and preventing any content overflow or layout gaps across mobile through 4K displays.
- **Clean Borderless Geometry:** Maintained flat, edge-to-edge curtain separation with zero artificial bottom borders or rounded corners, allowing the natural downward elevation shadow to define the physical lift.
- **Full Semantic Theme Adaptation (`footer.tsx`):** Ensured the footer adapts to both light and dark themes using semantic design tokens (`bg-background text-foreground`, `border-border`, `text-muted-foreground`), retaining full compatibility with the reactive `useTheme` store and the embedded 3-state `<ThemeToggle />`.
- **Zero Ambient Gradient Interference:** Purged all distracting gradient glows and top border sheens, maintaining a hardware-grade, clean architectural layout.
- **Compositor Performance (`index.css`):** Replaced `overflow-x: hidden` with modern `overflow-x: clip` in `body`, eliminating unnecessary scroll containers while preserving hardware-accelerated compositor-thread scrolling.

### 🌓 Website Light & Dark Mode Theming & Zero-FOUC Synchronization

- **Reactive Theme Hook (`use-theme.ts`):** Created `useTheme` using `useSyncExternalStore` for persistent client theme synchronization (`system`, `dark`, `light`) matching the extension's theme architecture. Persists user preference under `threadfx_theme` in `localStorage`, listens for cross-tab storage changes, and handles OS media query events dynamically.
- **Anti-FOUC Early DOM Initialization:** Integrated synchronous theme injection `<script>` in `index.html` and `initTheme()` in `main.tsx` prior to React hydration, completely eliminating theme flashing on page load. Added `<meta name="color-scheme" content="light dark" />` for native system UI elements.
- **Semantic CSS Variable Architecture (`index.css`):** Configured `@custom-variant dark (&:is(.dark *));` and mapped semantic tokens (`--color-background`, `--color-foreground`, `--color-card`, `--color-border`, `--color-input`, etc.) via `@theme inline`. Clean light mode tokens (`:root`) and AMOLED dark tokens (`.dark` and `@media (prefers-color-scheme: dark)`) ensure seamless switching without repetitive `dark:` class overrides.
- **3-State Theme Toggle Component (`theme-toggle.tsx`):** Designed an accessible radio-group switcher supporting System, Dark, and Light modes with `SunIcon`, `MoonIcon`, and `MonitorIcon` (strictly adhering to Rule 8). Integrated cleanly into the floating capsule navbar and architectural footer.
- **Comprehensive Landing Page Section Adaptation:** Converted all sections (Hero, Simulator, Soundboard, Features, Milestones, Install, Download) and primitives (`slider.tsx`, `switch.tsx`) to semantic design tokens.

### 📐 Emil Kowalski Layered Shadow & Elevation System (`website/`)

- **Multi-Tier Layered Depth Tokens (`index.css`):** Replaced harsh, single-point shadows with Emil Kowalski-inspired layered shadow tokens (`--shadow-chassis`, `--shadow-card`, `--shadow-modal`, `--drop-shadow-hero`, `--drop-shadow-icon`), separating direct directional key light from soft ambient light diffusion.
- **Calibrated Light/Dark Elevation:** In light mode, key light opacity is kept at 4–6% with ambient diffusion at 8–10%; in dark mode, shadows seamlessly soften into subtle edge definition and contrast boundaries.
- **Selective Shadow Elimination:** Purged container shadows on flush showroom slats (`MilestonePanel`) to preserve accordion alignment; replaced heavy `drop-shadow-[0_16px_32px_rgba(0,0,0,0.55)]` on 3D hero emblems with responsive filter tokens.
- **Stabilized Card Stacking:** Replaced generic `shadow-2xl` on `ScrollStack` install cards and bento feature cards with calibrated, layered depth tokens.

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
  - `components/milestones/`: Juicer ranks & 3D medal gallery (`milestones-section.tsx`, `milestone-panel.tsx`, `milestone-theme.ts`).
  - `components/install/`: Interactive ReactBits ScrollStack installation showroom and modular step cards (`install-section.tsx`, `step-download-card.tsx`, `step-developer-card.tsx`, `step-load-card.tsx`, `step-updates-card.tsx`).
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

### 🏆 Milestones Section Gallery Elevation & Asset Optimization (`website/`)

- **Dual-Mode Expanding Accordion Showroom (`MilestonesSection` & `MilestonePanel`):**
  - **Desktop (`md:`):** Horizontal showroom with buttery-smooth cubic-bezier expansion (`transition-[flex-grow] duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]`), hover intent debouncing (`HOVER_INTENT_MS = 85ms`), fixed-width content container (`md:w-[460px]`) preventing text reflow, and rotated vertical rank typography on collapsed slats.
  - **Mobile (`< md`):** Vertical drawer accordion with smooth height animation (`transition-[height,flex-grow,background-color]`). Inactive panels collapse to slim horizontal strips (`h-14 sm:h-16`) displaying badge thumbnail, level, rank title, and required likes. Tapping expands to `h-[430px]` while retracting the previous active panel.
- **82% WebP Asset Payload Optimization (2.94 MB $\to$ 546 KB):**
  - Downsampled 7 3D environmental artwork backgrounds (`milestone-1-bg.webp` through `milestone-7-bg.webp`) from 2048×2048 to 1024×1024 using high-precision Lanczos resampling, re-encoded at WebP quality 82 (method 6). Slashed total weight by 81.9% with zero perceptible quality degradation on Retina displays.
  - Added explicit `width={1024}` and `height={1024}` attributes to eliminate Cumulative Layout Shift (CLS).
  - Configured selective loading: `loading={milestone.level === 1 ? "eager" : "lazy"}` and `decoding="async"` to prioritize initial paint.
- **Vercel Edge CDN Caching Rule:**
  - Updated `website/vercel.json` with `/(icons|badges|milestones)/(.*)` specifying `public, max-age=31536000, stale-while-revalidate=86400` (1-year edge cache, 0 origin egress on cached hits).
  - Tuned `/version.json` caching to 5 minutes (`max-age=300`) for responsive extension update detection.
- **Frosted Minimalist Telemetry & Audio Pill:**
  - Symmetrical frosted glass pills (`rounded-full border border-white/15 bg-black/60 px-3 py-1 backdrop-blur-md`) for the high-contrast `Rank 0X / 07` indicator and the interactive `Listen to Fanfare` trigger.
  - Synthesizes procedural victory audio via ZzFX (`INTERACTION_SOUNDS.publish`) with harmonic pitch tuning and celebratory confetti bursts.
- **Staggered Panel Cascade via `AnimatedContent`:**
  - Wrapped `MilestonePanel` items directly with `AnimatedContent` (`stagger: 0.05`, `scale: 0.85`, `blur: 6px`, `duration: 0.9s`, `ease: power3.out`), cascading each panel sequentially into view on scroll.

### 📦 Install Section Elevation & ReactBits ScrollStack Showroom (`website/`)

- **Interactive ScrollStack Stacking Architecture (`scroll-stack.tsx`):**
  - Re-architected the install section using ReactBits' focal scroll stack pattern (`itemScale={0.06}`, `dimAmount={0.35}`, `blurAmount={3}`, `stackOffset={96}`, `itemStackDistance={14}`, `itemMargin={40}`).
  - Leverages rAF-throttled scroll listening and hardware-accelerated 3D transforms (`translate3d`, `scale`) for silky 60/120fps depth transitions as cards stack into focus.
- **Decomposed SRP Step Cards (`step-*-card.tsx`):**
  - **`step-download-card.tsx` (Step 01 · Download & Unzip):** High-contrast CTA download button (`bg-white text-zinc-950 font-semibold`) linking directly to `/download`, paired with a clean folder preview (`APP_INFO.name + " Folder"`), eliminating distracting version/size numbers from the primary CTA.
  - **`step-developer-card.tsx` (Step 02 · Enable Developer Mode):** Standardized Radix UI `<Switch>` primitive replacing broken hand-rolled toggle; clipboard copy button for `chrome://extensions` with fixed width container (`w-16 items-center justify-end`) to eliminate layout shift on text state transition.
  - **`step-load-card.tsx` (Step 03 · Load & Juice):** Social reaction mock card with live heart spring pop (`HeartIcon` scales internally without container ballooning), live likes odometer (`tabular-nums`), and explicit load unpacked instructions.
  - **`step-updates-card.tsx` (Step 04 · Fast Updates):** Seamless update reassurance card with simulated reload button (`sm:min-w-[190px]` to eliminate text-swap layout shift) and zero-data-loss guarantee.
- **Administrative SFX Boundary Rule:**
  - Strictly separated administrative and utility controls from procedural audio. Clicking Developer Mode switch, copying URLs, or simulating update reloads produces zero sound, reserving ZzFX procedural audio exclusively for social feed reactions.
- **Section Eyebrow Synchronization Across All 4 Sections:**
  - Unified section eyebrows across `SimulatorSection`, `FeatureSection`, `MilestonesSection`, and `InstallSection` with consistent monospace uppercase badges and Lucide React icons (`Volume2Icon`, `LayersIcon`, `TrophyIcon`, `DownloadIcon`).
- **Complete Centralization with `@data/app`:**
  - Centralized app branding and platform metadata across all landing page components (`hero-section.tsx`, `footer.tsx`, `milestone-theme.ts`, `thread-post-mock.tsx`, and all install cards) using `@data/app` (`APP_INFO.name`, `APP_INFO.platform.name`, `APP_INFO.slug`).
- **Zero-Layout-Shift (CLS = 0.00) Interactive Polish:**
  - Applied Emil Kowalski design engineering principles: stabilized button widths for copy state and reload simulation, removed container-level active scale shifts in favor of isolated glyph spring animations, and ensured constant border geometry.

### 🚀 Cardless Scroll-Revealed Download CTA Banner (`website/`)

- **3-Beat Scroll-Triggered Reveal (`DownloadSection`):** Introduced a boxless, minimalist closing CTA banner below the install guide powered by GSAP and ScrollTrigger:
  - Beat 1: Title floats and blurs in smoothly as the section settles into view (`Ready to feel every reaction?`).
  - Beat 2: Subtitle floats in with generous, balanced typography spacing (`Download the free extension and turn silent scrolling into a rich, tactile experience in seconds.`).
  - Beat 3: Single primary high-contrast Download ThreadFX CTA button floats in to invite the download.
  - Engineered with non-collapsing word margins (`mr-[0.28em]`), balanced vertical rhythm (24px/28px and 32px/36px), and continuous bi-directional scroll interpolation without DOM style clearing flashes, layout shifts, or GPU compositor tile thrashing.

### 🏛️ Architectural Landing Page Footer with Full-Width Wordmark (`website/`)

- **Elevated Architectural Layout (`Footer`):** Inspired by `footer31.tsx`, completely redesigned the landing page footer:
  - Multi-column product layout separating in-page shortcuts (`Navigation`: Simulator, Features, Milestones, Installation, Download) from open-source ecosystem resources (`Project`: GitHub, Releases, Issue Tracker, MIT License).
  - Cleaned redundant creator links; kept high-contrast group headers (`text-zinc-100 font-semibold`) and clean external link indicators (`ArrowUpRightIcon`).
  - Platform-agnostic copy: _"Tactile micro-interactions, procedural Web Audio synthesis, and responsive particle physics for social feeds and modern web platforms."_
  - Warm privacy reassurance (`100% private • Runs locally on your device`) alongside open-source licensing and a subtle smooth "Back to top" button (`ArrowUpIcon`).
  - Heroic, full-width vector brand wordmark (`THREADFX`) spanning the entire base with positive geometric letter-spacing (`0.035em`) for clean glyph separation (eliminating `F`/`X` collision) and understated architectural presence (`text-white/[0.07] hover:text-white/[0.13]`).

### 🧭 Floating Capsule Navbar with Scroll Spy & Zero-Shift Mobile Breadcrumb (`website/`)

- **Center-Docked Floating Capsule (`Navbar`):** Re-mounted in `website/src/App.tsx` with a uniform 360-degree hairline border (`border border-white/10`), subtle diffused drop shadow (`shadow-[0_4px_24px_rgba(0,0,0,0.35)]`), and frosted obsidian glass (`backdrop-blur-xl bg-neutral-950/80`).
- **Clean Hero Clearance:** Remains 100% hidden at the page top (`opacity-0 -translate-y-6 pointer-events-none`) so the hero section stays clean and unencumbered, smoothly sliding and fading in once scrolled 50% past the hero.
- **Real-Time Scroll Spy:** Continuously highlights active section pills (`Simulator`, `Features`, `Milestones`, `Install`) with frosted indicators as sections cross the focal reading line (`window.innerHeight * 0.38`).
- **Zero-Layout-Shift (`CLS = 0.00`) Mobile Active Breadcrumb:** Replaces crowded mobile link rows with a single dynamic breadcrumb pill (`ThreadFX | [Simulator ▾] Download`) powered by an intrinsic single-cell CSS Grid stacker (`grid grid-cols-1 grid-rows-1`). The button width is permanently locked to the widest label (`Milestones`), entirely preventing capsule jitter, width bouncing, or `Download` button jumping during scroll, with smooth 200ms `ease-out` opacity and slide-fade transitions between labels.
- **Tactile Mobile Quick-Jump Dropdown:** Tapping the breadcrumb opens a compact, frosted glass menu card directly anchored below the capsule with active section pips and tap-outside dismiss overlay.
- **Symmetrical Hairline Vertical Separator:** Integrates a hairline divider (`h-3.5 w-px bg-white/10`) providing clean optical separation between the brand mark and navigation controls across both mobile and desktop.
- **Collision-Free Scroll Margins & Offsets:** Applied `scroll-mt-24 sm:scroll-mt-28` across all landing page sections alongside programmatic offset scrolling (88px mobile / 104px desktop) in `handleNavClick`, guaranteeing generous breathing room below the floating capsule on both link clicks and native URL hash navigation.
- **Direct Domain Root Anchor:** Clicking `ThreadFX` points directly to `/`, performing smooth scroll to top without full-page reloads.

---

## 5. Next Focus: Upcoming Enhancements & Release Prep

When resuming development in the next session:

1. **End-to-End Monorepo Audit & Release Verification:**
   - Run `/verify-project` to audit the entire repository (types, linting, packaging).
   - Review complete user journey across desktop and mobile.
2. **Upcoming Platform Adapters (Roadmap Preview):**
   - Review `docs/UNIVERSAL_FX_ROADMAP.md` for upcoming headless social feed adapters (Bluesky, X/Twitter, Instagram).
3. **Draft Release Packaging:**
   - Run `/release-extension` when ready to cut the official v1.0.0 distribution archive.

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
