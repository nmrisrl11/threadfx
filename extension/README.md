# ThreadFX Extension (Manifest V3)

> The official browser extension for [ThreadFX](https://threadfx.nmrisrl.dev) — adding procedural audio, visual particle bursts, and tactile micro-interactions to social threads (flagship: [Threads](https://threads.com)).

---

## 🛠️ Tech Stack

- **Framework:** [WXT](https://wxt.dev/) (Vite-based)
- **UI:** React 19 + TypeScript
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`) + modern shadcn CSS variables architecture
- **Theming:** Independent tri-state theme switcher (`system`, `dark`, `light`) with zero-FOUC early initialization
- **Audio Engine:** [ZzFX](https://github.com/KilledByAPixel/ZzFX) (Procedural Web Audio API synthesis via `@data/zzfx` & `@data/presets`)
- **Visual FX:** `canvas-confetti` (particle bursts & celebratory reactions via `@data/particles`)
- **Juicer Milestones:** Procedural progression tiers & sensory ranks via `@data/milestones`
- **Anti-Farming Shield:** Post permalink fingerprinting and 1,000ms velocity cadence throttling protecting user feeds and stats
- **UI Components:** shadcn/ui (`radix-ui`, `cn`)
- **Iconography:** Lucide React (standardized explicit `*Icon` suffix convention)
- **Interface:** Native Chrome Side Panel (`chrome.sidePanel`) with 3-tab layout (`Sound FX`, `Particles`, `Storage`), ambient `UpdateBanner`, and global `Alt+Shift+T` toggle shortcut
- **Storage Telemetry & Versioning:** Real-time client quota and byte allocation metrics via React 19 `useSyncExternalStore`, and zero-overhead update tracking via `useUpdateCheck`

---

## ⚙️ Storage Configuration (`chrome.storage.local`)

Shared state between the Chrome Side Panel and the `threads.com` content script:

```typescript
export interface ThreadFXSettings {
	enabled: boolean; // Master toggle (default: true)
	volume: number; // 0.0 to 1.0 (default: 0.5)
	soundPack: SoundPackId; // Active ZzFX preset from @data/presets
	pitch: number; // Pitch multiplier 0.5x to 2.0x (default: 1.0)
	confettiEnabled: boolean; // Visual confetti on like (default: true)
	likesJuicedCount: number; // Lifetime counter of likes enhanced
	confettiPalette: ConfettiPaletteId; // Active confetti color palette from @data/particles
	confettiCount: number; // Particle count (default: 30)
	confettiSpread: number; // Particle spread angle (default: 55)
	burstMode: BurstMode; // Active burst mode ("palette" | "emoji")
	selectedEmoji: string; // Active custom reaction emoji (default: "❤️")
	theme: "system" | "dark" | "light"; // Tri-state color scheme (default: "system")
}

// Bounded LRU post cache stored under a separate top-level key for atomic read/write:
// Key: "threadfx_juiced_post_ids" => string[] (max 1,000 permalink post IDs)
```

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
- **Security & VirusTotal Audit:** Verified 0/70 clean on VirusTotal. See [Security & Distribution Guide](../docs/SECURITY_AND_DISTRIBUTION.md).

---

## ⚖️ Open Source & Ownership

ThreadFX is free, open-source software licensed under the **[MIT License](../LICENSE)** with Trademark and Proprietary Artwork Reservation. Source code is open under MIT; brand names, official icons, and 3D achievement badges remain the proprietary creative property of [Nomer Israel (@nmrisrl)](https://threads.com/@nmrisrl).  
GitHub Repository: [nmrisrl11/threadfx](https://github.com/nmrisrl11/threadfx).
