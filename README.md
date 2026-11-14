# ⚡ ThreadFX

<div align="center">

**Bring your Threads to life.**  
_Satisfying procedural audio, visual confetti bursts, and interactive juice for [Threads](https://threads.com)._

[![Manifest V3](https://img.shields.io/badge/Manifest-V3-brightgreen.svg)](https://developer.chrome.com/docs/extensions/mv3/intro/)
[![Framework](https://img.shields.io/badge/Extension-WXT%20%2B%20React%2019-blue.svg)](https://wxt.dev/)
[![Styling](https://img.shields.io/badge/Tailwind-v4-cyan.svg)](https://tailwindcss.com/)
[![Audio Engine](<https://img.shields.io/badge/Audio-ZzFX%20(0%20MP3s)-purple.svg>)](https://github.com/KilledByAPixel/ZzFX)
[![License](https://img.shields.io/badge/License-MIT-black.svg)](LICENSE)

[**Website & Live Demo**](https://threadfx.nmrisrl.dev) • [**Download Extension**](https://threadfx.nmrisrl.dev/download) • [**Brand Guide**](BRAND.md) • [**Architecture**](ARCHITECTURE.md) • [**Agent Guidelines**](AGENTS.md)

</div>

---

## 🚀 Features

- **🔊 Zero-Latency Procedural Audio:** Synthesized mathematically on the fly using [ZzFX](https://github.com/KilledByAPixel/ZzFX) via the browser's native Web Audio API. No external `.mp3` or `.wav` files to download.
- **✨ Custom Like Burst:** Tailored sound and particle effects that trigger when liking posts with custom emojis, stickers, or GIFs (e.g. SpongeBob, thread spool).
- **🎉 Neon Confetti Cannons:** Electric particle explosions that burst directly from the heart icon when tapped.
- **📱 Native Chrome Side Panel:** Clean, dark-mode dashboard that stays docked to your screen while browsing Threads—no temporary popups that close when you click.
- **🔒 Privacy-First & Minimal Permissions:** Only requests access to `threads.com` (and legacy `threads.net`) plus local storage. No tracking, no ads, and zero telemetry.

---

## 🛠️ Complete Tech Stack

| Layer                   | Technology                                 | Details                                                               |
| :---------------------- | :----------------------------------------- | :-------------------------------------------------------------------- |
| **Monorepo**            | npm Workspaces                             | Unified package management across extension and website               |
| **Extension Framework** | [WXT](https://wxt.dev/) (v0.21+)           | Modern Vite-powered browser extension framework                       |
| **UI Framework**        | React 19 + TypeScript                      | High-performance component rendering                                  |
| **Styling**             | Tailwind CSS v4                            | New `@theme` CSS variables & zero-config compilation                  |
| **UI Primitives**       | Radix UI (`@radix-ui/react-slider`, etc.)  | Accessible slider and toggle components                               |
| **Audio Synthesis**     | ZzFX (< 1 KB Web Audio)                    | In-memory procedural sound synthesizer (MIT)                          |
| **Visual FX**           | Canvas Confetti                            | Hardware-accelerated particle canvas                                  |
| **Extension UI**        | Chrome Side Panel API (`chrome.sidePanel`) | Persistent browser sidebar                                            |
| **Landing Page**        | Vite + React 19 + Tailwind CSS v4          | Interactive Threads simulator & soundboard                            |
| **Distribution**        | Cloudflare R2                              | Direct zip downloads with $0 egress fees via `/download`              |
| **Hosting**             | Vercel                                     | Dual-domain fallback (`threadfx.nmrisrl.dev` ⇄ `threadfx.vercel.app`) |

---

## 🖥️ Cross-OS & Platform Support

ThreadFX is architected for seamless performance across all major desktop operating systems:

### Tier 1: Current Operating System Support (v1.0)

- **Windows (10 / 11):** 100% native support on Google Chrome, Brave, Microsoft Edge, and Opera.
- **macOS (Sonoma, Sequoia, and newer):** Fully supported on Chrome, Brave, Arc Browser, and Edge for Mac with native Side Panel docking and Retina-scaled particle canvas.
- **Linux (Ubuntu, Fedora, Arch, Debian):** Fully supported on Chrome, Chromium, Brave, and Edge using Linux native PulseAudio / PipeWire through Web Audio API.

### Tier 2: Future Platform Roadmap (Upcoming Releases)

- **🍎 Safari on macOS (Web Extension):** Convert the WXT build using Xcode’s `safari-web-extension-converter` to bring ThreadFX to native Safari desktop users.
- **🦊 Firefox Desktop Support:** Compiling cross-browser targets (`npm run build:firefox` via WXT) to support Firefox on Windows, macOS, and Linux.
- **📱 Mobile Chromium Browsers:** Testing unpacked loading on Android browsers that support desktop extensions (Kiwi, Orion).
- **🎮 Web Haptic Feedback:** Exploring Gamepad / Web Haptic API integration for tactile vibration on supported controllers and trackpads.

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

---

## 📂 Monorepo Structure

```text
threadfx/
├── extension/                      # WXT Browser Extension (Manifest V3)
│   ├── entrypoints/
│   │   ├── sidepanel/              # Native Chrome Side Panel React 19 App
│   │   │   ├── index.html
│   │   │   ├── main.tsx
│   │   │   ├── App.tsx             # Interactive soundboard, volume, likes counter
│   │   │   └── style.css           # Tailwind CSS v4 design tokens
│   │   ├── background.ts           # Configures openPanelOnActionClick: true
│   │   └── content.ts              # threads.com DOM like-observer & ZzFX trigger
│   ├── lib/
│   │   ├── zzfx.ts                 # Pure procedural Web Audio synthesis engine
│   │   ├── presets.ts              # Bubble Pop, 8-Bit Coin, Hype Spark, Minimal Click
│   │   └── storage.ts              # Type-safe chrome.storage.local synchronization
│   ├── package.json
│   └── wxt.config.ts               # Minimal permissions ("sidePanel", "storage")
│
├── website/                        # Landing Page (Vite + React 19 + Tailwind CSS v4)
│   ├── src/
│   │   ├── App.tsx                 # Hero, Like Simulator, 3-Step Install Guide
│   │   ├── lib/                    # Shared zzfx.ts & presets.ts
│   │   └── index.css               # AMOLED dark design tokens
│   ├── public/
│   │   └── threadfx-latest.zip     # Local fallback zip
│   ├── vercel.json                 # Decoupled /download redirect for Cloudflare R2
│   └── package.json
│
├── AGENTS.md                       # Technical guidelines for AI agents
├── BRAND.md                        # Design system, color tokens, and visual voice
├── ARCHITECTURE.md                 # System diagrams & runtime sequence
└── package.json                    # Monorepo scripts with native npm workspaces
```

---

## 📄 Documentation Links

- [**AGENTS.md**](AGENTS.md) — Technical guidelines for AI coding agents and contributors.
- [**BRAND.md**](BRAND.md) — Design tokens, color palette, and typography system.
- [**ARCHITECTURE.md**](ARCHITECTURE.md) — Detailed runtime lifecycle and sequence diagrams.

---

## ⚖️ Open Source & License

ThreadFX is 100% free and open-source software distributed under the terms of the **[MIT License](LICENSE)**.

- **Author & Maintainer:** [Nomer Israel (@nmrisrl)](https://threads.com/@nmrisrl)
- **Repository:** [https://github.com/nmrisrl11/threadfx](https://github.com/nmrisrl11/threadfx)
- **Issue Tracker:** [https://github.com/nmrisrl11/threadfx/issues](https://github.com/nmrisrl11/threadfx/issues)

You are free to use, inspect, modify, and distribute this software for personal or commercial use in accordance with the MIT License terms.
