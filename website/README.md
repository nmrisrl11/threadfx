# ThreadFX Website & Landing Page

> The official landing page and live interactive sound simulator for [ThreadFX](https://threadfx.nmrisrl.dev).

---

## 🛠️ Tech Stack

* **Framework:** [Vite](https://vite.dev/) + React 19 + TypeScript
* **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`) with custom AMOLED dark tokens
* **Audio Engine:** Shared in-memory `zzfx.ts` procedural synthesizer
* **Visual Effects:** `canvas-confetti`
* **Icons:** Lucide React
* **Hosting:** Vercel (Hobby) with dual-domain fallback
* **Storage:** Cloudflare R2 for unpacked extension `.zip` distribution

---

## 💻 npm Development Scripts

Run these from within the `website/` directory (or use `npm run <script>:web` from the monorepo root):

```bash
npm install               # Install dependencies
npm run dev               # Start local Vite dev server
npm run build             # Compile static site to dist/
npm run preview           # Preview production build locally
```

---

## 🌐 Domains & Cloudflare R2 Routing

* **Production URL:** `https://threadfx.nmrisrl.dev`
* **Vercel Fallback:** `https://threadfx.vercel.app`
* **Decoupled Downloads:** The landing page links to `/download`, which resolves via `vercel.json` to the Cloudflare R2 bucket holding `threadfx-latest.zip`.
