# BRAND.md — ThreadFX Design System & Brand Guidelines

> **ThreadFX** is the tactile effects, procedural audio, and interactive feedback suite for social threads — launching with flagship support for Threads (`threads.com`). This document defines the visual identity, design tokens, color palette, typography, and voice of the brand.

---

## 1. Brand Identity & Messaging

### Brand Name

- **Full Name:** **ThreadFX**
- **Listing Title:** `ThreadFX — Tactile Social Effects Suite`
- **Flagship Launch Target:** `Threads (threads.com)`

### Slogans & Taglines

- **Primary Slogan:**  
  ⚡ **"Turn silent scrolling into a tactile experience."**
- **Secondary Taglines:**
  - _"Tactile audio, visual particle bursts, and physical feedback for social threads."_
  - _"Give your social feeds real mechanical satisfaction."_
  - _"Zero-latency procedural sound and particle dynamics for every like."_
  - _"Bring your social threads to life with tactile juice."_

### Elevator Pitch

> Social feeds are designed for rapid scrolling, yet every tap and interaction remains flat and silent. ThreadFX electrifies your feeds with zero-latency procedural sound synthesis, hardware-accelerated particle bursts, and responsive micro-spring physics—all docked cleanly in a native browser Side Panel with zero bloat, zero tracking, and zero external audio files. Launching with deep, resilient integration for Meta Threads, and engineered for upcoming expansion across modern social feeds.

---

## 2. Brand Archetype & Tone of Voice

- **Aesthetic Archetype:** **"Sleek Power-Tool with an Electric Pulse"**  
  Inspired by _Raycast_, _Linear_, and premium mechanical keyboards. Clean, high-performance, dark-mode native, and tactfully joyful.
- **Tone:**
  - **Punchy & Direct:** Short, confident headlines.
  - **Developer-Friendly & Transparent:** Open-source, privacy-first, zero invasive permissions.
  - **Tactile & Satisfying:** Every action has an instant, crisp physical feel.

---

## 3. Color Palette & Design Tokens

ThreadFX features a dual-theme design system: an **AMOLED Dark** foundation designed to blend seamlessly with `threads.com` (and legacy `threads.net`), and a **Clean Slate Light** mode optimized for daytime reading and high ambient light—both accented with our signature tri-color gradient.

### Theme Tokens Matrix

| Semantic Token                | AMOLED Dark (`.dark`)       | Clean Slate Light (`.light`) | Role / Usage                                      |
| :---------------------------- | :-------------------------- | :--------------------------- | :------------------------------------------------ |
| **`--background`**            | `#09090B`                   | `#FBFBFD`                    | Root canvas background                            |
| **`--foreground`**            | `#FAFAFA`                   | `#09090B`                    | High-contrast primary text                        |
| **`--card`**                  | `#131316`                   | `#FFFFFF`                    | Elevated surfaces, tabs, and soundboard cards     |
| **`--card-foreground`**       | `#FAFAFA`                   | `#09090B`                    | Card title and content text                       |
| **`--secondary` / `--muted`** | `#18181B`                   | `#F4F4F5`                    | Secondary buttons, track backgrounds, badge fills |
| **`--muted-foreground`**      | `#A1A1AA`                   | `#71717A`                    | Metadata, subtitles, and secondary labels         |
| **`--accent`**                | `#202024`                   | `#F4F4F5`                    | Hover states and interactive row highlights       |
| **`--border`**                | `rgba(255, 255, 255, 0.08)` | `rgba(0, 0, 0, 0.08)`        | Hairline container borders                        |
| **`--input`**                 | `rgba(255, 255, 255, 0.12)` | `rgba(0, 0, 0, 0.12)`        | Input outlines and slider track borders           |
| **`--ring`**                  | `rgba(255, 255, 255, 0.2)`  | `rgba(0, 0, 0, 0.2)`         | Focus rings and tactile active boundaries         |

### Signature Brand Accents & Gradients

| Accent Name         | Hex Code  | Role / Usage                                                  |
| :------------------ | :-------- | :------------------------------------------------------------ |
| **`accent-neon`**   | `#FF2E93` | Neon pulse pink (echoing the like heart & particle bursts)    |
| **`accent-violet`** | `#7928CA` | Electric violet (depth, brand gradients, and glowing accents) |
| **`accent-cyan`**   | `#00F5FF` | Hyper cyan spark (confetti highlights and particle bursts)    |

- **Brand Signature Gradient:**  
  `linear-gradient(135deg, #FF2E93 0%, #7928CA 50%, #00F5FF 100%)`
- **Subtle Glow Shadow:**  
  `0 0 24px -4px rgba(255, 46, 147, 0.25)`

### Modern Tailwind CSS v4 & shadcn Architecture (`style.css`)

ThreadFX uses pure CSS variable mapping with zero runtime overhead or manual `dark:` overrides in JSX:

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));

@theme inline {
	--color-background: var(--background);
	--color-foreground: var(--foreground);
	--color-card: var(--card);
	--color-card-foreground: var(--card-foreground);
	--color-muted: var(--muted);
	--color-muted-foreground: var(--muted-foreground);
	--color-border: var(--border);
	--color-accent: var(--accent);
}
```

Scrollbars use native CSS `light-dark()` color resolution:

```css
::-webkit-scrollbar-thumb {
	background: light-dark(#d4d4d8, #262626);
	border-radius: 9999px;
}
```

---

## 4. Typography Hierarchy & Font System

ThreadFX employs self-hosted variable font packages via `@fontsource-variable/*` across both the website and the Chrome Extension Side Panel. This guarantees **zero CSP violations in Manifest V3**, **zero remote network latency**, and **identical pixel-level rendering** across macOS, Windows, and Linux.

### Typeface Roles

1. **Headings & Display (`--font-heading`):** **Plus Jakarta Sans Variable**
   - Package: `@fontsource-variable/plus-jakarta-sans`
   - Weight: `700` (Bold) or `800` (Extra Bold)
   - Tracking: `-0.03em` / `tracking-tight`
   - Rationale: A geometric neo-grotesque with warm, modern curves that shares aesthetic DNA with Threads' **Instagram Sans**, infusing high energy into brand headlines and card titles.

2. **Body & UI Elements (`--font-sans`):** **Inter Variable**
   - Package: `@fontsource-variable/inter`
   - Weight: `400` (Regular) and `500` (Medium)
   - Rationale: The industry benchmark for dense, razor-sharp UI controls, slider values, and settings descriptions at 11px–14px inside the docked Side Panel.

3. **Data, Latency & Audio Specs (`--font-mono`):** **Geist Mono Variable**
   - Package: `@fontsource-variable/geist-mono`
   - Weight: `500` (Medium)
   - Rationale: High-precision tabular monospaced glyphs used for latency badges (`< 15ms`), ZzFX parameter arrays (`[1.2, 0, 420...]`), volume percentages, and the live likes counter.

### Tailwind CSS v4 Theme Integration

Both `website/src/index.css` and `extension/entrypoints/sidepanel/style.css` configure typography via `@theme inline`:

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "@fontsource-variable/plus-jakarta-sans";
@import "@fontsource-variable/inter";
@import "@fontsource-variable/geist-mono";

@theme inline {
	--font-sans:
		"Inter Variable", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
	--font-heading:
		"Plus Jakarta Sans Variable", system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
	--font-mono:
		"Geist Mono Variable", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

body {
	font-family: var(--font-sans);
}

h1,
h2,
h3,
h4,
h5,
h6 {
	font-family: var(--font-heading);
}
```

---

## 5. UI Component Specifications

### Buttons

- **Primary (Download / Action):**  
  Background: `bg-brand-gradient`, text: `#FFFFFF`, font: Medium, border radius: `rounded-full` or `rounded-lg`, hover effect: slight brightness increase with subtle neon glow.
- **Secondary / Outline:**  
  Background: `#121212`, border: `1px solid #262626`, text: `#F3F5F7`, hover: `#1C1C1C`.

### Slider Controls (Volume & FX Intensity)

- **Track:** `#262626` (Subtle dark gray)
- **Progress Fill:** `linear-gradient(90deg, #FF2E93, #7928CA)`
- **Thumb:** `#FFFFFF` circle with subtle `#FF2E93` drop shadow on focus.

### Badges & Tags

- Background: `#1C1C1C`, border: `1px solid #262626`, text: `#8E8E93`, font: `text-xs font-mono`.

---

## 6. Icon, Logo & Asset Architecture

### Brand Mark & Concept

A front-facing 3D squircle tile sculpted from dark obsidian titanium, featuring an embossed **liquid chrome Threads spiral ribbon** with **three sculptural acoustic shockwave arcs `)))`** radiating outward.

### Multi-Resolution File Distribution

```text
threadfx/
├── extension/public/icon/
│   ├── 16.png                  # 16x16 Chrome extension toolbar favicon
│   ├── 32.png                  # 32x32 Retina toolbar icon
│   ├── 48.png                  # 48x48 Chrome Extensions manager tile
│   ├── 96.png                  # 96x96 High-DPI display icon
│   └── 128.png                 # 128x128 Chrome Web Store unpacked icon
│
└── website/public/
    ├── favicon.ico             # Multi-layer ICO (16, 32, 48px)
    ├── favicon.svg             # Razor-sharp vector tab icon
    ├── site.webmanifest        # PWA application manifest
    ├── og-image.png            # 1200x630 Open Graph preview
    └── icons/
        ├── 16.png, 32.png, 48.png, 128.png
        ├── 180.png             # Apple Touch Icon
        ├── 192.png             # Android home screen icon
        ├── 512.png             # High-res master icon
        └── 512.webp            # High-efficiency WebP variant

### Edge Caching Strategy (Vercel CDN)
Static assets and images in `website/vercel.json` are served with aggressive Cache-Control directives:
- `/assets/(.*)`: `public, max-age=31536000, immutable` (1 year cache)
- `/(icons|images)/(.*)`: `public, max-age=2592000, stale-while-revalidate=86400` (30 days edge cache)
- `/(favicon.ico|favicon.svg|og-image.png|site.webmanifest)`: `public, max-age=86400, stale-while-revalidate=86400` (24 hours)
```
