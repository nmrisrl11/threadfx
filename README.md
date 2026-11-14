# ⚡ ThreadFX

<div align="center">

**Bring your Threads to life.**  
*Satisfying procedural audio, visual confetti bursts, and interactive juice for [Threads](https://threads.net).*

[![Manifest V3](https://img.shields.io/badge/Manifest-V3-brightgreen.svg)](https://developer.chrome.com/docs/extensions/mv3/intro/)
[![Framework](https://img.shields.io/badge/Extension-WXT%20%2B%20React-blue.svg)](https://wxt.dev/)
[![Audio Engine](https://img.shields.io/badge/Audio-ZzFX%20(0%20MP3s)-purple.svg)](https://github.com/KilledByAPixel/ZzFX)
[![License](https://img.shields.io/badge/License-MIT-black.svg)](LICENSE)

[**Website & Live Demo**](https://threadfx.nmrisrl.dev) • [**Download Extension**](https://threadfx.nmrisrl.dev/download) • [**Brand Guide**](BRAND.md) • [**Architecture**](ARCHITECTURE.md)

</div>

---

## 🚀 Features

* **🔊 Zero-Latency Procedural Audio:** Synthesized mathematically on the fly via [ZzFX](https://github.com/KilledByAPixel/ZzFX). No heavy `.mp3` or `.wav` files.
* **✨ Custom Like Burst:** Tailored sound and particle effects that trigger when liking posts with custom emojis, stickers, or GIFs (e.g. SpongeBob, thread spool).
* **🎉 Neon Confetti Cannons:** Electric particle explosions that burst directly from the heart icon when tapped.
* **📱 Native Chrome Side Panel:** Clean, dark-mode dashboard that stays pinned to your screen while browsing Threads—no annoying popups that close when you click.
* **🔒 Privacy-First & Minimal Permissions:** Only requests access to `threads.net` and local storage. No tracking, no external audio telemetry.

---

## 🛠️ Tech Stack

* **Extension:** [WXT](https://wxt.dev/) + React + TypeScript + Tailwind CSS + shadcn/ui
* **Audio Synthesis:** ZzFX (MIT, Procedural Web Audio API)
* **UI Interface:** Chrome Side Panel API (`chrome.sidePanel`)
* **Landing Page:** Vite + React + Tailwind CSS (Hosted on Vercel)
* **Distribution:** Unpacked `.zip` hosted on Cloudflare R2

---

## 📦 How to Install (Unpacked Extension)

Since ThreadFX is currently distributed as an open-source unpacked package:

1. **[Download the Latest Release (.zip)](https://threadfx.nmrisrl.dev/download)**
2. Unzip `threadfx-latest.zip` to a convenient folder on your computer.
3. Open Google Chrome (or Brave / Edge) and navigate to `chrome://extensions/`.
4. Enable **Developer Mode** using the toggle in the top-right corner.
5. Click **"Load unpacked"** in the top-left corner.
6. Select the unzipped `threadfx` folder.
7. Open [threads.net](https://threads.net), click the ThreadFX icon in your browser toolbar to open your Side Panel, and start liking!

---

## 💻 Local Development

### Prerequisites
* [Node.js](https://nodejs.org/) v18+ 
* [npm](https://docs.npmjs.com/) (Standard)

### 1. Clone & Install
```bash
git clone https://github.com/nmrisrl/threadfx.git
cd threadfx
npm install
```

### 2. Run the Extension (with HMR)
```bash
npm run dev:ext
```
*This command compiles the extension and automatically opens a fresh Chrome window with the extension pre-loaded and live hot-reloading enabled.*

### 3. Run the Landing Page
```bash
npm run dev:web
```

### 4. Build Production Zip
```bash
npm run build:all
# Output will be located in extension/.output/threadfx-<version>.zip
```

---

## 📄 Documentation

* [**AGENTS.md**](AGENTS.md) — Technical guidelines for AI coding agents and contributors.
* [**BRAND.md**](BRAND.md) — Design tokens, color palette, and typography system.
* [**ARCHITECTURE.md**](ARCHITECTURE.md) — Detailed runtime lifecycle and sequence diagrams.

---

## ⚖️ License

Distributed under the **MIT License**. Created by [@nmrisrl](https://threads.net/@nmrisrl).
