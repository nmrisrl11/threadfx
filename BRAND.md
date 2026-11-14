# BRAND.md — ThreadFX Design System & Brand Guidelines

> **ThreadFX** is the tactile effects and interactive juice suite for Threads (`threads.com`). This document defines the visual identity, design tokens, color palette, typography, and voice of the brand.

---

## 1. Brand Identity & Messaging

### Brand Name

- **Full Name:** **ThreadFX**
- **Chrome Web Store Listing Title:** `ThreadFX for Threads`

### Slogans & Taglines

- **Primary Slogan:**  
  ⚡ **"Bring your Threads to life."**
- **Secondary Taglines:**
  - _"Audio, visuals, and interactive juice for Threads."_
  - _"Turn silent scrolling into a full sensory experience."_
  - _"Give your Threads some punch."_
  - _"Satisfying sounds for every like."_

### Elevator Pitch

> Threads introduced custom likes with emojis, stickers, and GIFs, but every interaction is completely silent. ThreadFX electrifies your feed with instant procedural sound effects, confetti bursts, sticker particle explosions, and satisfying visual juice—all running with zero bloat and zero lag.

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

ThreadFX uses an **AMOLED Dark** foundation designed to blend seamlessly with `threads.com` (and legacy `threads.net`), accented with an electrifying tri-color gradient:

### Palette Table

| Token Name          | Hex Code  | Role / Usage                                               |
| :------------------ | :-------- | :--------------------------------------------------------- |
| **`bg-canvas`**     | `#080808` | Deep void background (matches Threads web dark mode)       |
| **`bg-card`**       | `#121212` | Elevated surface for Side Panel cards and website sections |
| **`bg-muted`**      | `#1C1C1C` | Hover states, pill badges, and input backgrounds           |
| **`border-subtle`** | `#262626` | Hairline border lines (standard shadcn aesthetic)          |
| **`border-strong`** | `#383838` | Active border highlights and focused inputs                |
| **`text-primary`**  | `#F3F5F7` | Crisp off-white foreground typography                      |
| **`text-muted`**    | `#8E8E93` | Metadata, subtitles, and secondary labels                  |
| **`accent-neon`**   | `#FF2E93` | Neon pulse pink (echoing the like heart)                   |
| **`accent-violet`** | `#7928CA` | Electric violet (depth, gradients, and glowing accents)    |
| **`accent-cyan`**   | `#00F5FF` | Hyper cyan spark (confetti highlights and particle bursts) |

### Signature Brand Gradients

- **Hero Text & Accent Gradient:**  
  `linear-gradient(135deg, #FF2E93 0%, #7928CA 50%, #00F5FF 100%)`
- **Subtle Glow Shadow:**  
  `0 0 24px -4px rgba(255, 46, 147, 0.25)`

### Tailwind CSS Token Configuration (`tailwind.config.ts`)

```typescript
module.exports = {
	theme: {
		extend: {
			colors: {
				canvas: "#080808",
				card: "#121212",
				muted: "#1C1C1C",
				subtle: "#262626",
				neon: "#FF2E93",
				violet: "#7928CA",
				cyan: "#00F5FF",
			},
			backgroundImage: {
				"brand-gradient": "linear-gradient(135deg, #FF2E93 0%, #7928CA 50%, #00F5FF 100%)",
				"subtle-radial":
					"radial-gradient(circle at top, rgba(121, 40, 202, 0.15), transparent 70%)",
			},
		},
	},
};
```

---

## 4. Typography Hierarchy

- **Headings:** **Geist Sans** (or **Plus Jakarta Sans**)
  - Weight: `700` (Bold) or `800` (Extra Bold)
  - Tracking: `-0.03em` (Tight, modern letter spacing)
- **Body & UI Elements:** **Inter** (or **Geist Sans**)
  - Weight: `400` (Regular) and `500` (Medium)
  - Clean, highly readable at 12px–14px inside the Side Panel.
- **Numbers, Latency & Audio Specs:** **Geist Mono** (or **JetBrains Mono**)
  - Weight: `500` (Medium)
  - Used for: `< 15ms latency`, `ZzFX parameters`, and live stats like `24 likes juiced`.

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

## 6. Icon & Logo Guidelines

- **Concept:** A minimalist `@` Threads loop expanding outwards into **3 acoustic reverberation waves** `)))`, glowing with a subtle `#FF2E93` neon aura.
- **Required Sizes:**
  - `icon-16.png`: Chrome tab / extension toolbar favicon
  - `icon-32.png`: Windows / Retina toolbar icon
  - `icon-48.png`: Chrome Extensions management page
  - `icon-128.png`: High-res store banner / unpacked icon
