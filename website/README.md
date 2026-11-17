# ThreadFX Website & Landing Page

> The official landing page, live interactive simulator, and documentation hub for [ThreadFX](https://threadfx.nmrisrl.dev).

---

## 🛠️ Tech Stack

- **Framework:** [Vite](https://vite.dev/) + React 19 + TypeScript
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`) with semantic light/dark tokens (`system` / `dark` / `light`), layered shadow elevation (`emil-design-eng`), and zero-FOUC anti-flash initialization
- **Theming:** Reactive `useSyncExternalStore` hook (`useTheme`) with `localStorage` (`threadfx_theme`) and system preference synchronization
- **Audio Engine:** Shared in-memory procedural synthesizer via `@data/zzfx` & `@data/presets`
- **Visual Effects:** `canvas-confetti` (particle bursts & celebratory reactions via `@data/particles`)
- **Animation Engine:** [GSAP](https://gsap.com/) & ScrollTrigger (`AnimatedContent` staggered reveals & zoom effects)
- **Interactive Stacking:** `ScrollStack` (ReactBits-inspired hardware-accelerated focal stacking cards)
- **Curtain Reveal Footer:** Fixed scroll-uncovered footer docking with dynamic `ResizeObserver` height synchronization and theme-adaptive semantic tokens
- **Juicer Milestones:** Procedural progression tiers & sensory ranks via `@data/milestones`
- **UI Components:** shadcn/ui (`radix-ui`, `cn`)
- **Iconography:** Lucide React (standardized explicit `*Icon` suffix convention)
- **Typography:** SubsetFont Latin variable typography (`fonts.css`: Inter, Plus Jakarta Sans, Geist Mono)
- **Accessibility (A11Y):** WCAG 2.1/2.2 AA compliant with keyboard skip links, unified `:focus-visible` rings, reduced motion support, descriptive alt/title attributes across all 23 images and 21 anchor links
- **SEO & AI Discovery:** XML sitemap (`sitemap.xml`) with Google Images metadata, Google Search Console verification, `robots.txt` with AI crawler directives (`GPTBot`, `ClaudeBot`, `PerplexityBot`), LLM context files (`llms.txt`, `llms-full.txt`), enhanced Schema.org JSON-LD graph (`SoftwareApplication`, `WebSite`, `FAQPage`), and dual webmanifests (`site.webmanifest`, `manifest.webmanifest`)
- **Web Analytics:** Privacy-first [Vercel Web Analytics](https://vercel.com/analytics) via `@vercel/analytics/react`
- **Code Quality & Canonical Styling:** OXC (`oxlint` + `oxfmt`) + `tailwind-lint` (strict canonical Tailwind v4 class enforcement)
- **Hosting:** Vercel (Hobby) with dual-domain fallback
- **Storage:** Cloudflare R2 for unpacked extension `.zip` distribution

---

## 💻 npm Development Scripts

Run these from within the `website/` directory (or use `npm run <script>:web` from the monorepo root):

```bash
npm install               # Install dependencies
npm run dev               # Start local Vite dev server
npm run build             # Compile static site to dist/
npm run preview           # Preview production build locally
npm run lint              # Lint website files with oxlint
```

### Monorepo Quality & Verification Commands (Run from Root)

```bash
npm run lint:tailwind     # Audits codebase for canonical Tailwind CSS v4 classes
npm run lint:tailwind:fix # Auto-fixes non-canonical Tailwind CSS classes
npm run lint              # High-performance Rust-based linting with oxlint
npm run format            # Formats entire codebase with oxfmt
npm run format:check      # Checks formatting compliance without writing changes
```

---

## 🌐 Domains & Cloudflare R2 Routing

- **Production URL:** `https://threadfx.nmrisrl.dev`
- **Vercel Fallback:** `https://threadfx.vercel.app`
- **R2 Releases Hub:** `https://releases.nmrisrl.dev`
- **Decoupled Downloads:** The landing page links to `/download`, which resolves via `vercel.json` to the Cloudflare R2 bucket holding `https://releases.nmrisrl.dev/threadfx-latest.zip`.

---

## ⚖️ Open Source & Ownership

ThreadFX is free, open-source software licensed under the **[MIT License](../LICENSE)** with Trademark and Proprietary Artwork Reservation. Source code is open under MIT; brand names, official icons, and 3D achievement badges remain the proprietary creative property of [Nomer Israel (@nmrisrl)](https://threads.com/@nmrisrl).  
GitHub Repository: [nmrisrl11/threadfx](https://github.com/nmrisrl11/threadfx).
