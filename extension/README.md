# ThreadFX Extension (Manifest V3)

> The official browser extension for [ThreadFX](https://threadfx.nmrisrl.dev) — adding procedural audio, confetti bursts, and interactive effects to [Threads](https://threads.com).

---

## 🛠️ Tech Stack

- **Framework:** [WXT](https://wxt.dev/) (Vite-based)
- **UI:** React 19 + TypeScript
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Audio Engine:** [ZzFX](https://github.com/KilledByAPixel/ZzFX) (Procedural Web Audio API synthesis)
- **Visual FX:** `canvas-confetti`
- **UI Components:** shadcn/ui (`radix-ui`, `cn`), Lucide React
- **Interface:** Native Chrome Side Panel (`chrome.sidePanel`)

---

## 💻 npm Development Scripts

Run these from within the `extension/` directory (or use `npm run <script>:ext` from the monorepo root):

```bash
npm install               # Install dependencies
npm run dev               # Launches Chrome with the extension pre-loaded & HMR active
npm run build             # Compiles extension to .output/chrome-mv3
npm run zip               # Packages output into threadfx-<version>-chrome.zip
npm run dev:firefox       # Launches Firefox target (experimental)
npm run build:firefox     # Compiles Firefox MV2/MV3 build
```

---

## 🖥️ Cross-OS & Platform Support

- **Windows:** Fully supported on Chrome, Brave, Edge, and Opera.
- **macOS:** Fully supported on Chrome, Brave, Edge, and Arc Browser.
- **Linux:** Fully supported on Chrome, Chromium, and Brave via PipeWire/PulseAudio.
- **Planned (Roadmap):** Native Safari on macOS via Safari Web Extension conversion.

---

## 🔒 Permissions Policy

- `permissions`: `["sidePanel", "storage"]`
- `host_permissions`:
  - `https://*.threads.com/*`
  - `https://threads.com/*`
  - `https://*.threads.net/*` (legacy fallback)
  - `https://threads.net/*` (legacy fallback)
- **Zero invasive permissions** (no `<all_urls>`, no webRequest, no cookies, no tracking).

---

## ⚖️ Open Source & Ownership

ThreadFX is free, open-source software licensed under the **[MIT License](../LICENSE)**.  
Created and maintained by [Nomer Israel (@nmrisrl)](https://threads.com/@nmrisrl).  
GitHub Repository: [nmrisrl11/threadfx](https://github.com/nmrisrl11/threadfx).
