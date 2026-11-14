# AGENTS.md — ThreadFX Development Guidelines for AI Agents

> This document defines the architectural rules, coding standards, and operational guidelines for AI agents and developers working on the **ThreadFX** monorepo.

---

## 1. Project Overview & Architecture

**ThreadFX** is an interactive effects and tactile feedback suite for [Threads](https://threads.net). It enhances user interactions (especially custom likes) with zero-latency procedural sound effects (ZzFX), visual confetti bursts, and motion feedback.

### Monorepo Structure
```text
threadfx/
├── extension/                      # WXT Browser Extension (Manifest V3)
│   ├── entrypoints/
│   │   ├── background.ts           # Service worker (sidePanel behavior)
│   │   ├── content.ts              # Threads.net DOM observer & sound trigger
│   │   └── sidepanel/              # Native Chrome Side Panel React App
│   │       ├── index.html
│   │       ├── main.tsx
│   │       └── App.tsx
│   ├── lib/
│   │   ├── zzfx.ts                 # Procedural audio synthesis engine
│   │   ├── presets.ts              # Sound effect number arrays
│   │   └── storage.ts              # Type-safe chrome.storage helpers
│   ├── package.json
│   └── wxt.config.ts
│
└── website/                        # Landing Page (Vite + React)
    ├── src/
    │   ├── components/             # Hero, SoundboardDemo, InstallGuide
    │   └── App.tsx
    ├── public/
    ├── vercel.json                 # /download redirect to Cloudflare R2
    └── package.json
```

---

## 2. Core Technical Constraints & Rules

### Rule 1: Zero External Audio Files
- **NEVER** import or fetch loose `.mp3`, `.wav`, or `.ogg` files in the core extension.
- All sound effects **MUST** be synthesized procedurally using `ZzFX` or the native browser `Web Audio API` (`AudioContext`).
- Sound presets are stored as compact numeric parameter arrays in `extension/lib/presets.ts`.

### Rule 2: Minimal Manifest V3 Permissions
To preserve user trust with unpacked distribution, permissions in `wxt.config.ts` must remain strictly minimal:
* `permissions`: `["sidePanel", "storage"]`
* `host_permissions`: `["https://*.threads.net/*", "https://threads.net/*"]`
* **DO NOT** add invasive permissions like `<all_urls>`, `webRequest`, `cookies`, or `tabs`.

### Rule 3: Resilient DOM Targeting on Threads
Meta obfuscates and frequently changes class names (e.g. `.x1i10hfl`). 
* **NEVER** use minified class names for DOM querying.
* **ALWAYS** target semantic attributes:
  * `[role="button"][aria-label*="Like" i]`
  * `svg[aria-label*="Like" i]`
  * Heart icon SVG paths or action bar button containers.
* Use `MutationObserver` on the main feed container (`main[role="main"]`) with debounced handlers to track dynamically loaded posts.

### Rule 4: Isolated Styling (No Style Bleed)
* The **Side Panel** runs inside its own isolated iframe/document (`sidepanel/index.html`). Standard Tailwind CSS and shadcn/ui components work here without risk.
* If rendering visual confetti or particle effects inside `content.ts` on `threads.net`, use a dedicated top-level canvas element (`#threadfx-canvas-overlay`) positioned `fixed` with `pointer-events: none` and `z-index: 999999`.

### Rule 5: Decoupled Domain & Storage
* All landing page asset links must be **relative**.
* The download button must link to `/download`, which resolves via `vercel.json` to the Cloudflare R2 bucket.
* The public production URL is `https://threadfx.nmrisrl.dev`, with `https://threadfx.vercel.app` as the permanent fallback.

---

## 3. Tech Stack Reference

| Layer | Technology |
| :--- | :--- |
| **Extension Framework** | [WXT](https://wxt.dev/) (Vite-based) |
| **UI Framework** | React 19 / 18 + TypeScript |
| **Styling** | Tailwind CSS + shadcn/ui |
| **Audio Engine** | ZzFX (MIT, procedural Web Audio) |
| **Extension UI** | Chrome Side Panel API (`chrome.sidePanel`) |
| **Website Hosting** | Vercel (Hobby) |
| **Zip Distribution** | Cloudflare R2 (`/download` redirect) |

---

## 4. Key Workflows & Scripts

### Extension Development
```bash
cd extension
npm install
npm run dev              # Launches Chrome with the extension loaded & HMR enabled
npm run build            # Builds output to .output/chrome-mv3
npm run zip              # Generates unpacked .zip package in .output/
```

### Website Development
```bash
cd website
npm install
npm run dev              # Runs local Vite dev server
npm run build            # Builds static distribution for Vercel
```

---

## 5. Storage Schema (`chrome.storage.local`)

State shared between `content.ts` and `sidepanel` must follow this schema:

```typescript
export interface ThreadFXSettings {
  enabled: boolean;          // Master toggle (default: true)
  volume: number;           // 0.0 to 1.0 (default: 0.5)
  soundPack: 'bubble' | 'retro' | 'hype'; // Active ZzFX preset
  confettiEnabled: boolean; // Visual confetti on like (default: true)
  likesJuicedCount: number; // Lifetime counter of likes enhanced
}
```

Whenever `sidepanel` updates settings via `chrome.storage.local.set()`, `content.ts` receives the update immediately via `chrome.storage.onChanged`.
