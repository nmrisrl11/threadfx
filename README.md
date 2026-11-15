<div align="center">

<a href="https://threadfx.nmrisrl.dev">
  <img src="extension/public/icon/128.png" alt="ThreadFX Logo" width="108" height="108" />
</a>

# ThreadFX

**Turn silent scrolling into a tactile experience.**  
_Zero-latency procedural audio, physics-driven particle bursts, and tactile micro-interactions for social feeds._  
**Flagship Launch Platform:** [Threads](https://threads.com) • _Multi-Platform Architecture_

[![Manifest V3](https://img.shields.io/badge/Manifest-V3-brightgreen.svg)](https://developer.chrome.com/docs/extensions/mv3/intro/)
[![Framework](https://img.shields.io/badge/Extension-WXT%20%2B%20React%2019-blue.svg)](https://wxt.dev/)
[![Styling](https://img.shields.io/badge/Tailwind-v4-cyan.svg)](https://tailwindcss.com/)
[![Audio Engine](<https://img.shields.io/badge/Audio-ZzFX%20(0%20MP3s)-purple.svg>)](https://github.com/KilledByAPixel/ZzFX)
[![License](https://img.shields.io/badge/License-MIT-black.svg)](LICENSE)

[**Website & Live Demo**](https://threadfx.nmrisrl.dev) • [**Download Extension**](https://threadfx.nmrisrl.dev/download) • [**Brand Guide**](docs/BRAND.md) • [**Architecture**](docs/ARCHITECTURE.md) • [**Agent Guidelines**](AGENTS.md)

</div>

---

## 🚀 Features

- **🔊 Zero-Latency Procedural Audio Synthesis:** Synthesized mathematically on the fly using [ZzFX](https://github.com/KilledByAPixel/ZzFX) via the browser's native Web Audio API. Sub-15ms response with zero external `.mp3` or `.wav` files and zero network delay.
- **🎆 Physics-Driven Particle Bursts:** Hardware-accelerated canvas particle explosions and confetti cascades that burst directly from the tapped element with customizable palettes, particle counts, and spread geometry.
- **🖲️ Tactile Motion Feedback:** Micro-spring scale dynamics and responsive visual bounce effects that give flat digital interactions the physical weight and mechanical satisfaction of a tactile switch.
- **📊 Real-Time Lifetime Sensory Metrics:** Private, local "Likes Enhanced" odometer tracking your lifetime interaction juice without sending a single byte of telemetry to any external server.
- **📱 Docked Native Chrome Side Panel:** Clean, obsidian-chassis dashboard that stays docked to your screen while browsing—with real-time sound auditioning, live volume sliders, particle controls, and dedicated storage telemetry across tabs.
- **💾 Transparent Storage & Data Management:** Real-time capacity meter tracking client-side quota usage and itemized byte allocation with safe two-step history reset and local data clearing.
- **🛡️ Smart Juicer Anti-Farming Shield:** Post permalink fingerprinting and 1,000ms velocity cadence throttling preventing repetitive like/unlike stat manipulation while keeping user feeds safe from rate limits.
- **🌓 Independent Appearance Theming:** Native tri-state theme switcher (System, Dark, Light) built with modern shadcn CSS variables, instant zero-FOUC initialization, and seamless synchronization with OS preferences.
- **🔒 Privacy-First & Minimal Permissions:** Only requests access to `threads.com` (and legacy `threads.net`) plus local storage. Zero background analytics, zero tracking scripts, and zero invasive permissions.

---

## 🛠️ Complete Tech Stack

| Layer                   | Technology                                 | Details                                                                |
| :---------------------- | :----------------------------------------- | :--------------------------------------------------------------------- |
| **Monorepo**            | npm Workspaces                             | Unified package management across extension and website                |
| **Extension Framework** | [WXT](https://wxt.dev/) (v0.21+)           | Modern Vite-powered browser extension framework                        |
| **UI Framework**        | React 19 + TypeScript                      | High-performance component rendering                                   |
| **Styling**             | Tailwind CSS v4 + shadcn CSS Variables     | Dual Light/Dark theming (`system` / `dark` / `light`) & zero-FOUC sync |
| **UI Primitives**       | shadcn/ui + Radix UI (`radix-ui`, `cn`)    | Accessible components, custom variants, and button/slider/switch UIs   |
| **Iconography**         | Lucide React                               | Standardized explicit `Icon` suffix convention (`*Icon`)               |
| **Linter & Formatter**  | OXC (`oxlint` + `oxfmt`)                   | High-performance Rust-based JavaScript/TypeScript linter & formatter   |
| **Audio Synthesis**     | ZzFX (< 1 KB Web Audio)                    | In-memory procedural sound synthesizer (MIT)                           |
| **Visual FX**           | Canvas Confetti                            | Hardware-accelerated particle canvas                                   |
| **Progression Engine**  | Procedural Juicer Milestones               | 7 sensory ranks, lifetime odometer, and victory fanfare audio          |
| **Extension UI**        | Chrome Side Panel API (`chrome.sidePanel`) | Persistent browser sidebar with global `Alt+Shift+T` toggle shortcut   |
| **Landing Page**        | Vite + React 19 + Tailwind CSS v4          | Interactive Threads simulator & soundboard                             |
| **Distribution**        | Cloudflare R2                              | Direct zip downloads with $0 egress fees via `/download`               |
| **Hosting**             | Vercel                                     | Dual-domain fallback (`threadfx.nmrisrl.dev` ⇄ `threadfx.vercel.app`)  |

---

## 🖥️ Cross-OS & Platform Support

ThreadFX is architected for seamless performance across all major desktop operating systems:

### Tier 1: Current Operating System Support (v1.0)

- **Windows (10 / 11):** 100% native support on Google Chrome, Brave, Microsoft Edge, and Opera.
- **macOS (Sonoma, Sequoia, and newer):** Fully supported on Chrome, Brave, Arc Browser, and Edge for Mac with native Side Panel docking and Retina-scaled particle canvas.
- **Linux (Ubuntu, Fedora, Arch, Debian):** Fully supported on Chrome, Chromium, Brave, and Edge using Linux native PulseAudio / PipeWire through Web Audio API.

### Tier 2: Multi-Platform & Browser Roadmap

- **🌐 Social Platform Adapters (Next):** Expand ThreadFX's tactile interaction suite to **Bluesky** and **X/Twitter**, leveraging our decoupled modular DOM observer architecture.
- **🍎 Safari on macOS (Web Extension):** Convert the WXT build using Xcode’s `safari-web-extension-converter` to bring ThreadFX to native Safari desktop users.
- **🦊 Firefox Desktop Support:** Compiling cross-browser targets (`npm run build:firefox` via WXT) to support Firefox on Windows, macOS, and Linux.
- **📱 Mobile Chromium Browsers:** Testing unpacked loading on Android browsers that support desktop extensions (Kiwi, Orion).
- **🎮 Web Haptic Feedback:** Exploring Gamepad / Web Haptic API integration for tactile vibration on supported trackpads and controllers.

---

## 📦 How to Install (Unpacked Extension)

Since ThreadFX is currently distributed as an open-source unpacked package:

1. **[Download the Latest Release (.zip)](https://threadfx.nmrisrl.dev/download)**
2. Unzip `threadfx-latest.zip` to a folder on your computer.
3. Open Google Chrome (or Brave / Edge / Arc) and navigate to `chrome://extensions/`.
4. Enable **Developer Mode** using the toggle in the top-right corner.
5. Click **"Load unpacked"** in the top-left corner.
6. Select the unzipped `threadfx` folder (or `.output/chrome-mv3`).
7. Open [threads.com](https://threads.com), click the ThreadFX icon in your browser toolbar to open your Side Panel, and start liking!

### 🔄 How to Update

When a new release notification appears:

1. Download the latest `.zip`.
2. Extract and overwrite the files in your existing ThreadFX folder.
3. Click the circular **Reload icon (`↻`)** on `chrome://extensions`. All your lifetime stats, unlocked 3D badges, and sound preferences are stored in Chrome local storage and are 100% preserved.

---

## 💻 Local Development Workflow (npm)

### Prerequisites

- [Node.js](https://nodejs.org/) v18+ (tested on Node 24)
- [npm](https://docs.npmjs.com/) (Standard, included with Node)

### 1. Clone & Install

```bash
git clone https://github.com/nmrisrl11/threadfx.git
cd threadfx
npm install
```

### 2. Available npm Scripts

| Command                 | Action                                                                       |
| :---------------------- | :--------------------------------------------------------------------------- |
| **`npm run dev:ext`**   | Launches Chrome with the extension loaded & live hot-reloading (HMR) enabled |
| **`npm run dev:web`**   | Launches the local Vite development server for the landing page              |
| **`npm run build:all`** | Compiles extension, zips it, and compiles the website in one command         |
| **`npm run build:ext`** | Compiles the extension to `.output/chrome-mv3`                               |
| **`npm run zip:ext`**   | Generates the unpacked distribution zip in `extension/.output/`              |
| **`npm run build:web`** | Compiles the production landing page to `website/dist/`                      |
| **`npm run lint`**      | Runs `oxlint` across codebase with zero-warning threshold                    |
| **`npm run format`**    | Formats entire codebase using `oxfmt`                                        |

---

## 📂 Monorepo Structure

```text
threadfx/
├── .agents/skills/                 # Installed agent skills (WXT, shadcn, audio, etc.)
├── .vscode/                        # Recommended extensions, settings & task runner v2.0.0
├── extension/                      # WXT Browser Extension (Manifest V3)
│   ├── components/                 # UI components
│   │   ├── sidepanel/              # Shared chrome (Header, MetricStrip, MilestonesPopover, ThemeToggle, Footer)
│   │   │   ├── sound-fx/           # Tab coordinator, header, grid, channel strips, waveform monitor
│   │   │   ├── particles/          # Tab coordinator, palettes grid, physics sliders, particle stage dock
│   │   │   └── data/               # Tab coordinator, capacity meter, itemized breakdown, actions, dock monitor
│   │   └── ui/                     # Primitives (Button, Slider, Switch, Tabs, Popover, etc.)
│   ├── entrypoints/
│   │   ├── sidepanel/              # Native Chrome Side Panel React 19 App
│   │   │   ├── index.html
│   │   │   ├── main.tsx            # Synchronous early theme initialization (zero-FOUC)
│   │   │   ├── App.tsx             # Interactive soundboard, volume, likes counter
│   │   │   ├── fonts.css           # SubsetFont Latin variable typography definitions
│   │   │   └── style.css           # Tailwind v4 CSS variables & light/dark design tokens
│   │   ├── background.ts           # Configures openPanelOnActionClick & Alt+Shift+T shortcut toggling
│   │   └── content.ts              # threads.com DOM like-observer & ZzFX trigger
│   ├── hooks/                      # useSettingsSelector, useTheme, useAudioSettings, useStorageTelemetry, useActiveTabStatus
│   ├── lib/
│   │   ├── storage.ts              # Type-safe chrome.storage.local synchronization
│   │   ├── threads-detector.ts     # Dedicated action classifier & vector path fingerprinting
│   │   └── utils.ts                # cn utility wrapper
│   ├── public/
│   │   ├── badges/                 # 7 transparent 3D WebP achievement badges (1-7)
│   │   └── icon/                   # 16, 32, 48, 96, 128px MV3 icons
│   ├── components.json             # shadcn/ui configuration
│   ├── package.json
│   └── wxt.config.ts               # Minimal permissions ("sidePanel", "storage")
│
├── website/                        # Landing Page (Vite + React 19 + Tailwind CSS v4)
│   ├── src/
│   │   ├── components/             # shadcn/ui components & Hero/Simulator
│   │   ├── fonts.css               # SubsetFont Latin variable typography definitions
│   │   ├── lib/                    # Shared cn utility wrapper
│   │   ├── App.tsx                 # Hero, Like Simulator, 3-Step Install Guide
│   │   ├── index.css               # AMOLED dark design tokens
│   │   └── main.tsx
│   ├── public/
│   │   ├── badges/                 # 7 transparent 3D WebP achievement badges (1-7)
│   │   ├── icons/                  # High-res PWA & responsive browser icons (16-512px)
│   │   ├── favicon.ico             # Multi-layer ICO (16, 32, 48px)
│   │   ├── favicon.svg             # Razor-sharp vector tab icon
│   │   ├── og-image.png            # 1200x630 Open Graph preview
│   │   ├── site.webmanifest        # PWA application manifest
│   │   ├── components.json         # shadcn/ui configuration
│   ├── vercel.json                 # Decoupled /download redirect for Cloudflare R2
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
│   ├── SECURITY_AND_DISTRIBUTION.md # Security posture, VirusTotal audits & distribution
│   └── UNIVERSAL_FX_ROADMAP.md     # Multi-platform adapter roadmap
│
├── AGENTS.md                       # Technical guidelines for AI agents
├── LICENSE                         # MIT License
├── PENDING_CHANGES.md              # Staging area for unreleased changes
├── skills-lock.json                # Agent skills dependency lockfile
└── package.json                    # Monorepo scripts with native npm workspaces
```

---

## 🤖 Agent Workflows & Skills

ThreadFX includes dedicated agent skills located in `.agents/skills/` that can be referenced by name or invoked via slash commands:

- **`/load-project-context`**: Loads architecture, constraints, storage schema, and enforces asking before committing or pushing.
- **`/commit-and-push`**: Pre-flight format/lint checks, conventional commit formatting with grouped responsibility descriptions.
- **`/release-extension`**: Lockstep version bumping, packaging `.zip` archives, and drafting GitHub Releases.
- **`/create-changelog`**: Authors consumer-facing, Apple-style release notes with sensory benefits and zero technical jargon.
- **`/sync-documentation`**: Audits and updates documentation across all packages to eliminate drift.
- **`/verify-project`**: Runs an end-to-end health check (`oxfmt`, `oxlint`, `build:all`, and version sync).

---

## 📄 Documentation Links

- [**AGENTS.md**](AGENTS.md) — Technical guidelines for AI coding agents and contributors.
- [**docs/SECURITY_AND_DISTRIBUTION.md**](docs/SECURITY_AND_DISTRIBUTION.md) — Security posture, VirusTotal audits, and distribution guide.
- [**docs/BRAND.md**](docs/BRAND.md) — Design tokens, color palette, and typography system.
- [**docs/ARCHITECTURE.md**](docs/ARCHITECTURE.md) — Detailed runtime lifecycle and sequence diagrams.
- [**docs/FEATURE_BLUEPRINT.md**](docs/FEATURE_BLUEPRINT.md) — Feature specifications and sensory wireframes.
- [**docs/UNIVERSAL_FX_ROADMAP.md**](docs/UNIVERSAL_FX_ROADMAP.md) — Multi-platform adapter expansion roadmap.
- [**PENDING_CHANGES.md**](PENDING_CHANGES.md) — Staging area for unreleased changes and release notes.

---

## 🛡️ Security, Privacy & VirusTotal Audit

ThreadFX is engineered from the ground up for zero-telemetry and total privacy:

- **0 / 70 Clean Detection on VirusTotal:** Fully scanned and verified with zero malware, zero adware, and zero suspicious heuristics.
- **Strictly Scoped Permissions:** Only requests `["sidePanel", "storage"]` restricted exclusively to `threads.com` (and legacy `threads.net`).
- **Zero Remote Code or Binary Audio Files:** 100% of code and procedural audio synthesis runs locally on-device without connecting to third-party CDNs.

For technical details on browser reputation scoring, developer mode notifications, and security verification, read the [Security & Distribution Guide](docs/SECURITY_AND_DISTRIBUTION.md).

---

## ⚖️ Open Source & License

ThreadFX is 100% free and open-source software distributed under the terms of the **[MIT License](LICENSE)** with a **Trademark & Proprietary Visual Assets Reservation**:

- **Source Code & Procedural Engines:** 100% open source under the permissive [MIT License](LICENSE). You are free to inspect, modify, fork, and build upon the code.
- **Brand Names & Trademarks:** The names "ThreadFX", brand mark, official domain names, and identity are trademarks of Nomer Israel.
- **Visual Assets & 3D Badges:** The bespoke 3D WebP achievement badges (`milestone-1.webp` through `milestone-7.webp`) and official icons are proprietary artwork and may not be used in competing extensions, commercial packages, or unauthorized Web Store re-publications.

- **Author & Maintainer:** [Nomer Israel (@nmrisrl)](https://threads.com/@nmrisrl)
- **Repository:** [https://github.com/nmrisrl11/threadfx](https://github.com/nmrisrl11/threadfx)
- **Issue Tracker:** [https://github.com/nmrisrl11/threadfx/issues](https://github.com/nmrisrl11/threadfx/issues)
