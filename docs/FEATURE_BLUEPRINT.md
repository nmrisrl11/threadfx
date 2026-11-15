# FEATURE_BLUEPRINT.md — ThreadFX Master Feature Roadmap & Checklist

> **The Definitive Product & Feature Blueprint for ThreadFX (Threads-First & Beyond)**  
> This living document tracks all planned, in-progress, and completed features. Features are categorized by domain and graded by implementation complexity. Use this checklist as the source of truth for planning each development sprint.

---

## 🎯 Current Status Overview

| Metric               | Status                                                                     |
| :------------------- | :------------------------------------------------------------------------- |
| **Active Version**   | `v1.0.0` (Production Ready)                                                |
| **Primary Platform** | [Threads](https://threads.com) (Desktop Web)                               |
| **Audio Core**       | In-Memory Procedural Synthesis (`zzfx.ts`)                                 |
| **Particle Core**    | Viewport Canvas Particles (`canvas-confetti`)                              |
| **UI Surface**       | Chrome Side Panel API (`sidepanel/`) + Companion Landing Page (`website/`) |

---

## 🧩 Architectural Answers & Design Decisions

### 1. Centralizing Presets & Shared Logic

> **Question:** _Should we centralize the presets and other shared assets?_

- **Decision:** **YES, definitely.**
- **Current State:** `presets.ts` is currently duplicated across `extension/lib/presets.ts` and `website/src/lib/presets.ts`.
- **Target Architecture:** Migrate presets to root `data/presets.ts` (alongside `data/changelog.ts`).
- Both `extension` and `website` will consume them via the existing `@data/presets` monorepo path alias. Adding a new sound preset or tweaking numeric parameters in one file will immediately update both the in-feed extension and the web landing simulator.

---

### 2. Customizable Sounds & Confetti

> **Question:** _How should customizable audio and visual effects be handled?_

- **Audio Customization Roadmap:**
  - **Level 1 (Presets & Modifiers - v1.0 Launch):** Curated sound packs (Bubble Pop, 8-Bit Coin, Hype Spark, Minimal Click, Wood Tap, Neon Zap, Water Drop, Sub Thump) paired with a live **Pitch Shift Slider (0.5x to 2.0x)**, **Organic Micro-Pitch Jitter (±3%)**, and **Docked Waveform Spectrum Monitor**. Liking delivers positive reward audio and particle bursts; unliking remains a quiet, fatigue-free retraction.
  - **Level 2 (In-Panel Sound Lab - v1.1):** Mini procedural synthesizer studio inside an expandable Side Panel drawer. Users can visually tweak raw ZzFX parameters (Root Frequency, Attack, Sustain, Decay, Modulation, Pitch Jump, Waveform Shape).
  - **Level 3 (Client-Side Storage & Share Codes - v1.1):**
    - **Local Preset Storage:** Users can save their customized sounds into `chrome.storage.local` under `settings.customPacks: SoundPack[]`. Consumes < 1.5 KB total for 20 presets (0.015% of the 10 MB quota).
    - **Peer-to-Peer Share Codes (`TFX-...`):** Compact serialized strings (e.g., `TFX-BBL-420-350` or Base64 payload) encoding the numeric parameter array.
    - **Safe Import Flow:** Users paste a code, the engine validates/clamps values to safe acoustic thresholds (preventing hearing hazards or extreme spikes), plays an immediate preview, and allows setting it as temporary active sound or saving to "My Presets".
    - **Viral Threads Distribution:** Users can post their sound codes directly in thread replies for one-click import by other ThreadFX users.
- **Visual FX & Particle Customization Roadmap:**
  - **Level 1 (Palettes & Physics - v1.0 Launch):** Curated palettes (Soft Rose, Silver Minimal, Cyber Neon, Warm Gold, Mint Aurora, Sunset Coral) with Particle Density (10–60) and Spread Angle (30°–90°) sliders.
  - **Level 2 (Emoji Reaction Bursts - v1.1):** Option to burst customizable floating emojis instead of round particles using `canvas-confetti` shape rendering.
  - **Level 3 (Particle Lab & Palette Codes - v1.1):**
    - **Custom Palette Builder:** Color picker supporting 2–6 custom hex tones, gravity, and particle velocity controls.
    - **Local Palette Storage:** Persisted client-side in `chrome.storage.local` under `settings.customPalettes`.
    - **Particle Share Codes (`TFXP-...`):** Serialized palette codes that users can export, import, or share across social threads to match creator branding.

---

### 3. App Theme & Appearance Control

> **Question:** _Should appearance depend on Threads, or should user have independent theme control?_

- **Extension Side Panel:**
  - **Default (Smart Auto):** Automatically matches Threads' active theme. Detects `html[style*="color-scheme: dark"]` or `window.matchMedia('(prefers-color-scheme: dark)')`.
  - **User Control:** Include a 3-way toggle in Side Panel Settings: `[Auto (Match Threads) | AMOLED Dark | Clean Light]`.
  - Persisted in `chrome.storage.local` under `settings.theme`.
- **Companion Landing Page:**
  - Independent theme toggle in the navigation bar (`System | Dark | Light`), persisted in `localStorage`.
  - The landing page and extension do **not** need to force-sync visual themes, giving users autonomy regardless of where they are viewing the project.

---

## 📊 Comprehensive Feature Matrix & Checklist

Legend:

- 🟢 **Easy / Quick Win:** 1–3 hours (Simple UI, local storage, or CSS adjustments).
- 🟡 **Medium Complexity:** 1–2 days (DOM observation, state sync, or canvas integration).
- 🔴 **High Complexity:** 3+ days (Custom engines, WebGL, complex permission flows).
- `[x]` = Implemented & Verified in `v1.0.0`
- `[ ]` = Backlog / Ready to Develop

---

### Phase 1: Core Foundation & Shipped Features (`v1.0.0`)

- [x] 🟢 **Zero-Latency Audio Synthesis:** Procedural `zzfx.ts` Web Audio engine with zero external `.mp3` dependencies.
- [x] 🟢 **Core Sound Presets:** Bubble Pop, 8-Bit Coin, Hype Spark, and Minimal Click sound presets.
- [x] 🟢 **Chrome Side Panel Dashboard:** Native React 19 + shadcn/ui dashboard running via Chrome Side Panel API.
- [x] 🟢 **Interactive Soundboard:** Live sound tester with active preset indicator on both website and Side Panel.
- [x] 🟢 **Multi-Tab State Synchronization:** Instant settings sync across tabs via `chrome.storage.local` and `onChanged`.
- [x] 🟢 **Capture-Phase Like Interception:** Resilient `content.ts` listener catching likes before SPA event swallows.
- [x] 🟢 **Heart-Anchored Particle Bursts:** Viewport coordinate detection erupting particles directly from the clicked heart icon.
- [x] 🟢 **Likes Juiced Counter:** Persistent counter tracking lifetime enhanced likes, incrementing in real time.
- [x] 🟢 **AMOLED Dark Design Tokens:** Tailored `#080808` canvas with `#FF2E93` neon pink, `#7928CA` purple, and `#00F5FF` cyan accents.
- [x] 🟢 **Self-Hosted Variable Fonts:** Inter, Plus Jakarta Sans, and Geist Mono bundled without Google Fonts network requests.
- [x] 🟢 **Production 3D Icon Suite:** Multi-resolution icons (16–512px, ICO, SVG, WebP) and 1200×630 Open Graph card.
- [x] 🟢 **Edge Caching & Cloudflare R2:** Vercel CDN immutable caching headers with decoupled `/download` 307 redirect.

---

### Phase 2: Immediate Enhancements & Polish (`v1.1.0`)

#### 🔄 Architecture & Presets Centralization

- [x] 🟢 **Centralize Presets to `@data/presets`:** Move presets to root `data/presets.ts` so `extension` and `website` share a single source of truth without code duplication.
- [x] 🟢 **Centralize Particles & ZzFX Engine to `@data/particles` & `@data/zzfx`:** Unify confetti palette configurations and the procedural Web Audio synthesis engine across all workspaces.
- [x] 🟢 **Sound Pitch & Speed Modifiers:** Sliders in the Side Panel to adjust playback pitch (0.5x–2.0x) on top of active presets.

#### 🎨 Visual Particle Customization

- [x] 🟢 **Emoji Reaction Bursts:** Toggle between classic geometric spark particles and floating emojis (❤️, 🔥, 🎉, 🚀, 💎) using `canvas-confetti` shape rendering.
- [x] 🟢 **Curated Color Palettes:** User-selectable particle themes (Neon Pulse, Threads Classic, Cyberpunk, AMOLED White, Sunset Gold).
- [x] 🟢 **Custom Particle Count & Spread Sliders:** Allow users to choose between subtle (10 particles) and explosive (60 particles) reaction bursts with adjustable spread.

#### 🔊 Expanded Threads In-Feed Interactions

- [ ] 🟢 **Unlike Soft Blip:** Play a gentle, subtle descending sound when unliking a post (preventing silent confusion).
- [ ] 🟡 **Repost / Quote Audio Chime:** Detect clicks on the Repost button (`[aria-label*="Repost" i]`) and trigger an uplifting chime.
- [ ] 🟡 **Bookmark / Save Feedback:** Audio and particle sparkle when bookmarking a thread for later.
- [ ] 🟡 **Post Published Celebratory Burst:** Detect clicking "Post" in the thread composer and reward the user with a fanfare pop.
- [ ] 🟡 **Follow Button Interaction:** Subtle tactile click and star burst when following a creator on Threads.

#### 🎛️ Usability & Audio Controls

- [ ] 🟢 **Audio Mute Shortcut:** Global toggle key (`Alt+Shift+M`) to instantly mute/unmute FX without opening the Side Panel.
- [ ] 🟡 **Smart Audio Ducking:** Automatically suppress or lower SFX volume if an active video post on Threads is currently playing audio.
- [x] 🟢 **Theme Appearance Control:** Native 3-way toggle in Side Panel (`Auto / Match OS`, `Dark`, `Light`) with zero-FOUC and modern shadcn CSS variables.

---

### Phase 3: Engagement & Gamification (`v1.2.0`)

- [ ] 🟢 **Milestone Celebrations:** Extra-large celebratory particle burst and victory chime on the 10th, 50th, 100th, 500th, and 1,000th like.
- [ ] 🟡 **Daily Like Streak Counter:** Track daily active Threads engagement streaks with a subtle badge in the Side Panel.
- [ ] 🟡 **Sound Packs Expansion:**
  - **Mechanical Keyboard:** Creamy, thocky mechanical switch sound.
  - **ASMR Wood:** Organic wooden marimba knock.
  - **Sci-Fi Cyber:** Digital laser chirp and futuristic UI hum.
  - **Cartoon Pop:** Playful bubble cork pop.
- [ ] 🟡 **Soundboard Sound Preview Hotkeys:** Number keys (`1`, `2`, `3`, `4`) trigger sound previews when the Side Panel is focused.
- [ ] 🔴 **Tactile Haptic Feedback:** Trigger native trackpad vibration feedback via Web Gamepad / Vibration APIs on supported hardware.

---

### Phase 4: The "Sound & Particle Lab" with Viral Share Codes (`v1.1.0`)

- [ ] 🟡 **ThreadFX Sound Lab (Visual Synth Studio):**
  - In-panel visual synthesizer sliders for Root Frequency, Attack, Sustain, Decay, Modulation, Pitch Jump, and Waveform Shape.
  - Live waveform preview while adjusting parameters.
  - Save custom sounds locally in `chrome.storage.local` under `settings.customPacks` (< 1.5 KB total footprint for 20 presets).
- [ ] 🟢 **Peer-to-Peer Sound Share Codes (`TFX-...`):**
  - Export compact, human-readable shareable strings (e.g., `TFX-BBL-420-350`) encoding the sound parameters.
  - Import modal with acoustic clamping (safety limits to prevent ear-damaging spikes) and instant live audition.
  - Options to audition as temporary active sound or save permanently to "My Presets".
  - Viral organic growth loop enabling users to share custom sounds in Threads replies.
- [ ] 🟡 **ThreadFX Particle Lab & Palette Share Codes (`TFXP-...`):**
  - Custom color picker supporting 2–6 hex colors, particle count, spread, gravity, and velocity controls.
  - Local preset storage in `chrome.storage.local` under `settings.customPalettes`.
  - Export and import palette share codes across social threads to match personal or creator branding.

---

### Phase 5: Universal Multi-Platform Engine (`v2.0.0`)

_(Detailed architectural specs documented in [UNIVERSAL_FX_ROADMAP.md](UNIVERSAL_FX_ROADMAP.md))_

- [ ] 🟡 **Modular Adapter Registry:** Refactor `content.ts` into a pluggable coordinator supporting multi-site profiles.
- [ ] 🟡 **X (Twitter) Profile:** Zero-config support for X likes (`[data-testid="like"]`), retweets, and bookmarks.
- [ ] 🟡 **Bluesky Profile:** Zero-config support for Bluesky likes (`[data-testid="likeBtn"]`).
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

If a feature checks all 3 boxes (e.g. **Centralizing Presets**, **Emoji Bursts**, or **Sound Modifiers**), it is prioritized for the active sprint!
