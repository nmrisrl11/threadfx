---
name: create-changelog
description: Author consumer-facing, Apple-style changelog entries and release notes with elegant copywriting, sensory benefits, and zero technical jargon or implementation exposure.
---

# Create Changelog & Release Notes

Use this skill whenever authoring release notes, drafting changelog updates, or preparing public announcement copy for a **ThreadFX** release.

---

## 1. Core Copywriting Doctrine (Apple Release Notes Standard)

The public changelog is read by everyday Threads users, creators, and community members. **It must read like premium consumer hardware or OS release notes, never like an engineering commit log.**

### 🚫 Strict Rules: Zero Technical Jargon
- **NEVER** mention internal implementation details, programming languages, libraries, or tooling:
  - ❌ Do NOT mention: `React 19`, `TypeScript`, `Tailwind CSS`, `ZzFX`, `WXT`, `Manifest V3`, `Vite`, `oxlint`, `oxfmt`, `chrome.storage`, `MutationObserver`, `AudioContext`, `hooks`, `props`, `useEffect`, `DOM`, `CSS`, `regex`, `JSON`, `API`, or `npm`.
- **ALWAYS** translate technical work into **sensory, user-facing experiences**:
  - Instead of *"Implemented debounced MutationObserver on main[role=main]"* ➡️ Write *"**Smoother Feed Scrolling:** Liking posts as you fly through fast-scrolling feeds now feels completely fluid with zero lag."*
  - Instead of *"Refactored AudioContext buffer oscillator in zzfx.ts"* ➡️ Write *"**Crisper Bubble Pops:** Tuned the frequency response of our signature bubble pop for a lighter, more satisfying acoustic snap on every tap."*
  - Instead of *"Added chrome.storage.local onChange listener in content.ts"* ➡️ Write *"**Instant Preference Sync:** Changes you make in your Side Panel dashboard now apply immediately across all your active Threads tabs without needing a page refresh."*

---

## 2. Standard Structure & Entry Formatting

Every entry must feature a bold, engaging feature title followed by a colon and a friendly, benefit-driven description:

```markdown
### Added
- **Feature Name:** Friendly, engaging explanation of what this brings to the user's feed, why it makes Threads more enjoyable, and how to use it.

### Improved
- **Polish / Refinement:** What feels smoother, sounds crisper, or looks cleaner.

### Fixed
- **Issue Resolution:** What friction was eliminated or what interaction now works reliably.

### Removed
- **Retired Feature:** Clear, polite note on retired settings or deprecated presets.
```

---

## 3. Step-by-Step Authoring Workflow

### Step 1: Gather Recent Changes
Review recent Git history and unreleased changes:
```powershell
git log -n 15 --oneline
```
Identify the functional changes that actually impact what users see, hear, or configure.

### Step 2: Translate & Group
Filter out developer-only chores (linter configs, build scripts, tests). Group user-impacting changes into:
- **Added**: New sound presets, new confetti patterns, new dashboard toggles.
- **Improved**: Volume slider ergonomics, haptic audio timing, AMOLED dark-mode contrast.
- **Fixed**: Liking custom emojis (stickers/GIFs) that previously didn't trigger audio, side panel layout sizing on smaller displays.

### Step 3: Polish Tone & Emotion
Infuse personality! ThreadFX is about tactile joy, electric pulses, and making social interactions feel satisfying:
- Use sensory words: *tactile, crisp, snappy, fluid, electric, vibrant, punchy, satisfying*.
- Keep paragraphs punchy (2-3 sentences max).

---

## 4. Multi-Channel Output Formats

Always present the finished release notes in these ready-to-use formats:

### Format A: GitHub Release & Web Changelog
```markdown
# ThreadFX v1.1.0 — The Neon Sound Pack & Instant Sync

Bring your Threads to life with brand new tactile audio and responsive side panel controls.

### Added
- **Neon Synthwave Sound Pack:** Experience retro-futuristic audio feedback on your custom likes with warm synth pads and punchy 8-bit blips.
- **Side Panel Volume Preview:** Hear exactly how loud your effects will play right from the slider without having to switch tabs.

### Improved
- **Crisper Particle Bursts:** Neon confetti explosions now spawn with enhanced color contrast and smoother physical gravity.

### Fixed
- **Custom Sticker Like Interception:** Liking threads with custom SpongeBob or sticker reactions now reliably triggers audio feedback.
```

### Format B: Short Threads Post (Under 500 chars)
```text
⚡ ThreadFX v1.1.0 is here!

Turn silent scrolling into a full sensory experience:
✨ Brand new Neon Synthwave sound pack
🔊 Live volume preview right inside your Side Panel
🎉 Crisper, high-contrast confetti bursts
🐞 Fixed audio triggers on custom sticker likes

Grab the free unpacked release at https://threadfx.nmrisrl.dev
```
