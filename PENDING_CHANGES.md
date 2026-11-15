# PENDING_CHANGES.md — ThreadFX Staged Updates

> Staging area for user-facing changes during ongoing development.
> Entries here are queued and will be published to `data/changelog.ts` when running `/create-changelog` or `/release-extension`.
> Scope covers the complete ThreadFX experience: in-feed extension interactions, sound packs, Side Panel tools, and companion web hub capabilities.

---

## Unreleased

### Added

- **Pitch Modulation Controller**: Introduced an acoustic pitch multiplier slider (0.5x to 2.0x) that dynamically shifts the tone of any sound preset with instant live audition, a quick reset button, and real-time frequency calculations.
- **Expanded 8-Preset Sound Library**: Introduced two new signature procedural sound profiles—`Water Drop` (pure resonant acoustic droplet chime) and `Sub Thump` (deep 808 low-frequency tactile kick)—delivering balanced acoustic variety and perfect rectangular symmetry across both compact and widened side panels.
- **Organic Micro-Pitch Jitter**: Injected subtle procedural pitch variance (±3%) into consecutive likes on Threads, eliminating the repetitive "machine-gun" effect during rapid scrolling and making every like feel lively and physical.
- **Pinned Sound FX Context Header**: Anchored the Sound Profile title, contextual preset reset button, and acoustic category filter pills (All, Tactile, Arcade, Organic) to the top of the chassis so browsing filters remain permanently accessible while scrolling.
- **Adaptive 2-Channel Dynamics Strip**: Redesigned Audition Volume and Pitch Modulation into a balanced, pro-audio channel strip with 1-click speaker mute/unmute, nominal 50% default calibration, and contextual reset buttons.
- **Refined Header & System Utility Hierarchy**: Re-architected the Side Panel top bar into a clean two-tier hierarchy—placing the bold brand mark and tactile master power module on the top row, and pairing the real-time engagement counter with the ambient theme switcher in the utility bar below.
- **Docked 28-Band Audio Spectrum Monitor**: Built a 28-band live frequency waveform monitor docked permanently at the bottom of the Sound FX chassis with an emerald status LED, ambient resting rhythm, live acoustic telemetry, and dynamic pulse animations synchronized with auditions and in-feed likes.
- **Adaptive Container Query Grid**: Upgraded the sound preset grid using CSS Container Queries to fluidly scale from 2 columns on compact side panels to 3 and 4 columns on widened side panels without layout distortion.
- **Acoustic Category Filter Pills**: Organized presets into clean acoustic domains (All, Tactile, Arcade, Organic) for focused, clutter-free browsing.
- **Independent Tri-State Theme Switcher**: Introduced a dedicated light, dark, and system color mode controller to the Side Panel header, letting you effortlessly switch between crisp daylight clarity, deep obsidian contrast, or seamless synchronization with your operating system preferences.
- **Bespoke 3D Speech-Thread Brand Mark**: Upgraded the official brand mark to a brushed titanium and liquid chrome continuous dialogue ribbon with three tactile metallic chat studs inside an elevated dark matte obsidian squircle.
- **Automated Asset Processing Pipeline**: Introduced a dedicated Python pipeline (`process_logo.py`) that automates boundary unmultiplication, Lanczos downsampling across all icon tiers, multi-layer `.ico` packaging, and Open Graph card compositing.
- **Elevated Obsidian Chassis Interface**: Redesigned the Chrome Side Panel with a floating obsidian surface, refined inset micro-shadows, and dedicated tab views for tactile audio presets and particle dynamics.
- **Centralized Metadata Engine**: Synchronized all application titles, SEO tags, social cards, manifest properties, and companion hub descriptors from a single source of truth.
- **Zero-Overhead Visual Performance Profiling**: Integrated developer performance telemetry via conditional Dev-only React Scan scripts to ensure silky-smooth 60fps animations and immediate tactile response without weighing down production downloads.
- **Self-Hosted Native Typography**: Upgraded website and extension typography to self-hosted variable typefaces—Plus Jakarta Sans for energetic geometric headlines, Inter for razor-sharp interface controls, and Geist Mono for precision latency readouts.
- **Official 3D Brand Iconography**: Introduced our bespoke 3D liquid chrome tactile mark across the extension toolbar, Chrome Side Panel, and companion website, paired with high-performance edge caching to keep the web portal lightweight and fast.
- **Bespoke Open Graph Social Card**: Introduced an official dark-mode social card featuring our elevated 3D metallic squircle emblem and tactile feature showcase for high-impact sharing across Threads and the web.

### Changed

- **Centralized Shared Core, Audio Synthesis, and Particle Engines**: Unified sound presets (`@data/presets`), particle physics palettes (`@data/particles`), and procedural Web Audio synthesis engines (`@data/zzfx`) into a single shared core (`data/`), eliminating duplicate logic across the extension and companion website.
- **Modern shadcn CSS Variables Architecture**: Migrated Side Panel styling to Tailwind CSS v4 CSS variables (`@import "shadcn/tailwind.css"` and `@custom-variant dark`), decoupling all UI components from hardcoded `dark:` utility overrides, trimming ~7.3 kB from the CSS bundle, and providing automatic zero-friction theming across light and dark palettes.
- **Centralized Project Documentation Directory**: Reorganized project architecture, brand design systems, sensory wireframes, and multi-platform roadmaps from the root folder into a dedicated `docs/` directory (`docs/ARCHITECTURE.md`, `docs/BRAND.md`, `docs/FEATURE_BLUEPRINT.md`, `docs/UNIVERSAL_FX_ROADMAP.md`), keeping the monorepo root pristine.
- **Standardized Lucide Iconography Convention**: Enforced a strict architectural rule requiring all Lucide React icons to use the explicit 'Icon' suffix (e.g. Volume2Icon, SparklesIcon, HeartIcon), preventing naming collisions with interface primitives and harmonizing codebase ergonomics.
- **Holistic Tactile Feature Copywriting**: Overhauled copywriting and documentation across the landing page, metadata, and guides to showcase the full tactile feature suite—procedural audio synthesis, physics-driven particle bursts, tactile micro-motion, lifetime sensory odometer, and docked Side Panel dashboard.
- **Multi-Platform Brand Positioning**: Generalized brand positioning from a narrow Threads-only extension to a modular tactile social interaction suite with Threads as the flagship launch platform, laying the architectural groundwork for multi-platform adapters (Bluesky, X).
- **Generalized Visual Effects Identity**: Broadened copywriting and branding across the entire project from narrow "neon confetti" to "visual particle bursts and custom emoji effects" to support future emoji, sticker, and custom particle reaction bursts.
- **Edge-to-Edge Icon Scaling & Chrome Contrast**: Re-rendered the entire extension icon and favicon suite with tight bounding crops, eliminating empty transparent margins and boosting metallic edge contrast for crisp visibility in dark browser toolbars.

### Fixed

### Removed

- **Purged Orphaned Extension Components & Leftovers**: Removed dead code from earlier iterations (`controls-surface.tsx`, `card.tsx`, `badge.tsx`, `button.tsx`) and stale fallback zip files, reducing extension CSS bundle size by ~7 kB.
- **Pruned Unused Assets**: Removed legacy starter assets, orphaned template stylesheets, and duplicate icon variants to keep the repository and build distribution lean and pristine.

---

## Changelog Guidelines

- Write from the user's perspective (what they hear, see, and feel).
- Use sensory, engaging language with bold title prefixes:
  `**Feature Name**: Description of what this brings to the user's feed and how it works.`
- **Zero Technical Jargon**: Never mention React, hooks, WXT, Tailwind, AudioContext, DOM classes, or npm packages.
