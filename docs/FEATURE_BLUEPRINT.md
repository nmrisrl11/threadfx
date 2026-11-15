# FEATURE_BLUEPRINT.md — ThreadFX Master Feature Roadmap & Checklist

> **The Definitive Product & Feature Blueprint for ThreadFX (Threads-First & Beyond)**  
> This living document tracks all planned, in-progress, and completed features. Features are categorized by domain and graded by implementation complexity. Use this checklist as the source of truth for planning each development sprint.

---

## 🎯 Current Status Overview

| Metric               | Status                                                                                             |
| :------------------- | :------------------------------------------------------------------------------------------------- |
| **Active Version**   | `v1.0.0` (Production Ready)                                                                        |
| **Primary Platform** | [Threads](https://threads.com) (Desktop Web • `threads.net` legacy fallback)                       |
| **Audio Core**       | In-Memory Procedural Synthesis (`@data/zzfx`) • 8 Signature Presets • Pitch Modulation (0.5x–2.0x) |
| **Particle Core**    | Viewport Canvas Particles (`canvas-confetti` • 6 Curated Palettes + Custom Vector Emoji Bursts)    |
| **Progression Core** | 7 Sensory Juicer Ranks with 3D WebP Medals, Lifetime Odometer, and Fanfares (`@data/milestones`)   |
| **UI Surface**       | Chrome Side Panel API (`sidepanel/` 3-Tab Chassis) + Companion Landing Page (`website/`)           |
| **Data & Storage**   | Reactive On-Device Telemetry, Anti-Farming LRU Post Cache, and In-App Version Update Tracking      |

---

## 🧩 Architectural Answers & Design Decisions

### 1. Centralizing Presets & Shared Logic

> **Question:** _Should we centralize the presets and other shared assets?_

- **Status:** **COMPLETED (`data/` single source of truth).**
- All shared presets (`data/presets.ts`), confetti palettes (`data/particles.ts`), procedural synthesis engines (`data/zzfx.ts`), gamified milestone tiers (`data/milestones.ts`), typed changelogs (`data/changelog.ts`), and application metadata (`data/app.ts`) live in root `data/`.
- Both `extension` and `website` consume them via explicit path aliases (`@data/...`). Adding a new sound preset or tuning physics in one file propagates instantly to the in-feed extension, Side Panel, and companion web simulator.

---

### 2. Customizable Sounds & Confetti

> **Question:** _How should customizable audio and visual effects be handled?_

- **Audio Customization Roadmap:**
  - **Level 1 (Presets & Modifiers — Shipped in v1.0.0):** 8 curated sound packs (`Bubble Pop`, `8-Bit Coin`, `Hype Spark`, `Minimal Click`, `Wood Tap`, `Neon Zap`, `Water Drop`, `Sub Thump`) paired with live **Pitch Shift Modulation (0.5x to 2.0x)**, **Organic Micro-Pitch Jitter (±3%)**, keyboard number hotkeys (`1`–`8`), and a docked **Waveform Spectrum Monitor**. Liking delivers tactile reward audio; unliking plays a gentle, non-inflating soft retreat tone.
  - **Level 2 (In-Panel Sound Lab — v1.1):** Mini procedural synthesizer studio inside an expandable Side Panel drawer. Users can visually tweak raw ZzFX parameters (Root Frequency, Attack, Sustain, Decay, Modulation, Pitch Jump, Waveform Shape).
  - **Level 3 (Client-Side Storage & Share Codes — v1.1):**
    - **Local Preset Storage:** Users can save their customized sounds into `chrome.storage.local` under `settings.customPacks: SoundPack[]`. Consumes < 1.5 KB total for 20 presets (0.015% of the 10 MB quota).
    - **Peer-to-Peer Share Codes (`TFX-...`):** Compact serialized strings (e.g., `TFX-BBL-420-350` or Base64 payload) encoding the numeric parameter array.
    - **Safe Import Flow:** Users paste a code, the engine validates/clamps values to safe acoustic thresholds (preventing hearing hazards or extreme spikes), plays an immediate preview, and allows setting it as temporary active sound or saving to "My Presets".
    - **Viral Threads Distribution:** Users can post their sound codes directly in thread replies for one-click import by other ThreadFX users.
- **Visual FX & Particle Customization Roadmap:**
  - **Level 1 (Palettes & Physics — Shipped in v1.0.0):** 6 curated color palettes (`Soft Rose`, `Silver Minimal`, `Cyber Neon`, `Warm Gold`, `Mint Aurora`, `Sunset Coral`) with Particle Density (10–60) and Spread Angle (30°–90°) physics sliders.
  - **Level 2 (Emoji Reaction Bursts — Shipped in v1.0.0):** Segmented dual-mode controller switching between classic palettes and vector emoji reaction bursts (featuring a quick-tap reaction strip and headless Frimousse catalog browser searching 3,000+ Unicode emojis).
  - **Level 3 (Particle Lab & Palette Codes — v1.1):**
    - **Custom Palette Builder:** Color picker supporting 2–6 custom hex tones, gravity, and particle velocity controls.
    - **Local Palette Storage:** Persisted client-side in `chrome.storage.local` under `settings.customPalettes`.
    - **Particle Share Codes (`TFXP-...`):** Serialized palette codes that users can export, import, or share across social threads to match creator branding.

---

### 3. App Theme & Appearance Control

> **Question:** _Should appearance depend on Threads, or should user have independent theme control?_

- **Extension Side Panel:**
  - **Shipped in v1.0.0:** Independent tri-state switcher in the metric strip (`System / Match OS`, `Dark`, `Light`) with zero-FOUC synchronous initialization in `main.tsx` and modern Tailwind CSS v4 CSS variables.
  - Persisted in `chrome.storage.local` under `settings.theme`.
- **Companion Landing Page:**
  - Independent theme controls and responsive AMOLED dark styling matching `docs/BRAND.md`.

---

## 📊 Comprehensive Feature Matrix & Checklist

Legend:

- 🟢 **Easy / Quick Win:** 1–3 hours (Simple UI, local storage, or CSS adjustments).
- 🟡 **Medium Complexity:** 1–2 days (DOM observation, state sync, or canvas integration).
- 🔴 **High Complexity:** 3+ days (Custom engines, WebGL, complex permission flows).
- `[x]` = Implemented & Verified in `v1.0.0`
- `[ ]` = Backlog / Active Sprint Focus

---

### Phase 1: Core Foundation & Shipped Features (`v1.0.0`)

- [x] 🟢 **Zero-Latency Audio Synthesis:** Procedural `zzfx.ts` Web Audio engine with zero external audio files.
- [x] 🟢 **8 Signature Sound Presets:** Bubble Pop, 8-Bit Coin, Hype Spark, Minimal Click, Wood Tap, Neon Zap, Water Drop, and Sub Thump.
- [x] 🟢 **Acoustic Pitch Modulation Slider:** Dynamic pitch shift slider (0.5x–2.0x) with real-time frequency calculations and instant live audition.
- [x] 🟢 **Organic Micro-Pitch Jitter (±3%):** Procedural variance on consecutive likes to eliminate repetitive ear fatigue.
- [x] 🟢 **Soundboard Number Hotkeys (Keys 1–8):** Instant keyboard audition and pack selection with visual keycap badges.
- [x] 🟢 **Chrome Side Panel 3-Tab Chassis:** Native React 19 + shadcn/ui dashboard operating via Chrome Side Panel API (`Sound FX`, `Particles`, `Storage`).
- [x] 🟢 **Multi-Tab State Synchronization:** Real-time settings synchronization across browser tabs via `chrome.storage.local` and `onChanged`.
- [x] 🟢 **Global Side Panel Shortcut (`Alt+Shift+T` / `Escape`):** Bidirectional toggle and explicit one-click close button.
- [x] 🟢 **Domain-Isolated Threads Action Classifier:** Resilient vector Bézier anchor fingerprinting (`M16.792`, `M18 2.084`, `M34.6 3.1`, `M12 21.35`) isolating likes from other interactive elements.
- [x] 🟢 **Heart-Anchored Particle Bursts:** Viewport coordinate detection erupting particles directly from the clicked heart icon.
- [x] 🟢 **Dual-Mode Visual Particle Engine:** Segmented toggle switching between 6 curated palettes and custom vector emoji reaction bursts.
- [x] 🟢 **Headless Frimousse Emoji Picker Drawer:** Searchable catalog of 3,000+ Unicode emojis inside a floating Popover with 8 quick-reaction shortcuts.
- [x] 🟢 **Adaptive Particle Physics Strip:** Real-time slider controls for Particle Density (10–60) and Burst Spread (30°–90°).
- [x] 🟢 **Docked Particle Horizon Monitor:** Pinned bottom dock with emerald status indicator, palette swatches, and live burst audition trigger.
- [x] 🟢 **Docked 28-Band Waveform Monitor:** Pinned bottom acoustic visualizer with live frequency telemetry and audition button.
- [x] 🟢 **Expanded In-Feed Social Interactivity Suite:**
  - [x] 🟢 **Unlike Soft Retreat:** Gentle descending sine tone (`360Hz` -> `220Hz`) on unlike with zero confetti or stat increments.
  - [x] 🟢 **Repost Audio Chime & Emerald Sparks:** Uplifting dual-harmonic chime (`580Hz` -> `870Hz`) and emerald particle burst.
  - [x] 🟢 **Bookmark / Save Sparkle:** Crisp tactile triangle chime (`720Hz` -> `900Hz`) and golden sparkle on thread save.
  - [x] 🟢 **Post Published Fanfare:** Celebratory double chime and 45-particle fanfare on post publication.
- [x] 🟢 **Sensory Juicer Progression & 3D WebP Badges:** 7 gamified ranks (`Bronze` through `Mythic`) with celebratory fanfares and an interactive shelf in `MilestonesPopover`.
- [x] 🟢 **Smart Juicer Anti-Farming Shield:** Rolling 1,000-post LRU cache and 1,000ms velocity cadence guard protecting user accounts from platform rate limits.
- [x] 🟢 **Interactive Data & Storage Management Hub:** Live byte telemetry gauge, itemized storage breakdown, and safe 2-step data action buttons.
- [x] 🟢 **In-App Release Notification & Lifecycle Manager:** Zero-overhead version tracking (`useUpdateCheck`), quiet dismissible `UpdateBanner`, and `VersionUpdateCard` with 10-second reload walkthrough.
- [x] 🟢 **Ambient Platform Standby Awareness:** Hardware-grade standby banner when browsing non-Threads sites with 1-click launcher.
- [x] 🟢 **Self-Hosted Variable Fonts:** SubsetFont Latin definitions for Plus Jakarta Sans, Inter, and Geist Mono.
- [x] 🟢 **Ultra-Lean Package Footprint (882 KB):** 30% reduction from 1.26 MB to 882 KB via font subsetting and asset pruning.
- [x] 🟢 **Edge Caching & Cloudflare R2:** Vercel edge headers with decoupled `/download` 307 redirect to Cloudflare R2 ($0 egress fees).

---

### Phase 2: Active Sprint — Companion Landing Page Elevation (`website/`)

Focus area for the immediate development sprint:

- [ ] 🟢 **Interactive 7-Tier Sensory Milestone Showcase:**
  - Interactive showcase on `website/` displaying the 7 transparent 3D WebP achievement medals (`Bronze`, `Silver`, `Gold`, `Diamond`, `Master`, `Grand`, `Mythic`).
  - Rank inspection cards displaying required likes, rank titles, and unlocked milestone perks.
- [ ] 🟡 **Companion Web Simulator Parity Polish (`website/src/components/SoundboardDemo.tsx`):**
  - Verify complete feature parity with extension: 8 sound presets, pitch modulation slider (0.5x–2.0x), dual particle mode (palettes + emoji bursts), and keyboard hotkeys (`1`–`8`).
  - Milestone unlock celebrations and victory fanfares playable directly in the web simulator.
- [ ] 🟢 **Seamless Unpacked Installation & Upgrade Walkthrough:**
  - Visual step-by-step installation card explaining 10-second unpacked sideloading in Chrome.
  - Clear, reassuring upgrade guide demonstrating how to overwrite files and reload without losing on-device settings or milestones.
- [ ] 🟢 **Visual Craft & Typography Polish:**
  - Hardware-grade dark mode aesthetic aligned with `docs/BRAND.md`.
  - Optimized hero copy and clean `/download` routing verification.
- [ ] 🟢 **Mobile & Tablet Responsiveness Audit:**
  - Fluid mobile layout for phone visitors exploring the soundboard and documentation.

---

### Phase 3: Usability & In-Feed Enhancements (`v1.1.0`)

- [ ] 🟢 **Global Audio Mute Shortcut (`Alt+Shift+M`):** Instant hotkey to mute/unmute FX across all active browser tabs without opening the Side Panel.
- [ ] 🟡 **Smart Audio Ducking:** Automatically suppress or lower procedural SFX volume if an in-feed video or audio track is actively playing on Threads.
- [ ] 🟡 **Follow Button Interaction:** Subtle tactile click and star burst when following a creator on Threads.
- [ ] 🟡 **Daily Like Streak Counter:** Track daily active Threads engagement streaks with a subtle badge in the Side Panel.

---

### Phase 4: Sound & Particle Lab with Share Codes (`v1.2.0`)

- [ ] 🟡 **ThreadFX Sound Lab (Visual Synth Studio):**
  - In-panel visual synthesizer sliders for Root Frequency, Attack, Sustain, Decay, Modulation, Pitch Jump, and Waveform Shape.
  - Live waveform preview while adjusting parameters.
  - Save custom sounds locally in `chrome.storage.local` under `settings.customPacks`.
- [ ] 🟢 **Peer-to-Peer Sound Share Codes (`TFX-...`):**
  - Export compact, human-readable shareable strings (e.g., `TFX-BBL-420-350`) encoding the sound parameters.
  - Safe import modal with acoustic clamping (safety limits to prevent ear-damaging spikes) and instant live audition.
  - Viral distribution loop enabling users to share custom sounds in Threads replies.
- [ ] 🟡 **ThreadFX Particle Lab & Palette Share Codes (`TFXP-...`):**
  - Custom color picker supporting 2–6 hex colors, particle count, spread, gravity, and velocity controls.
  - Local preset storage in `chrome.storage.local` under `settings.customPalettes`.
  - Export and import palette share codes across social threads to match creator branding.

---

### Phase 5: Universal Multi-Platform Engine (`v2.0.0`)

_(Detailed architectural specs documented in [UNIVERSAL_FX_ROADMAP.md](UNIVERSAL_FX_ROADMAP.md))_

- [ ] 🟡 **Modular Adapter Registry:** Refactor `content.ts` into a pluggable coordinator supporting multi-site profiles.
- [ ] 🟡 **Bluesky Profile:** Zero-config support for Bluesky likes (`[data-testid="likeBtn"]`) and reposts.
- [ ] 🟡 **X (Twitter) Profile:** Zero-config support for X likes (`[data-testid="like"]`), retweets, and bookmarks.
- [ ] 🔴 **Facebook Multi-Reaction Dock:** Track hover flyout coordinates and trigger tailored audio/particles for Love, Haha, Wow, Sad, and Angry.
- [ ] 🔴 **Dynamic Optional Permissions (`chrome.permissions.request`):** Request domain permissions on demand without triggering Chrome's all-websites warning.
- [ ] 🔴 **Interactive Element Inspector ("Target a Button"):** In-page hover highlight allowing users to click and bind any button on the web.

---

## 🛠️ Feature Evaluation Guide: How to Prioritize

When deciding what feature to build next, apply this 3-question filter:

```text
1. Immediate Sensory Joy: Does this make tapping like on Threads noticeably more satisfying?
2. Minimal Permissions: Does this avoid adding invasive Chrome permissions?
3. Zero Performance Overhead: Does this execute in under 15ms without lagging the Threads feed?
```

If a feature checks all 3 boxes, it is prioritized for the active sprint!
