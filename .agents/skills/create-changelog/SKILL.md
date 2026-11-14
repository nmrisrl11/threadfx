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

## 2. Source of Truth & Lifecycle

ThreadFX follows a centralized two-tier changelog architecture at the monorepo root:

1. **`PENDING_CHANGES.md` (Staging Area):**
   - Located at the monorepo root.
   - During active development, queue user-facing updates under `## Unreleased` (`Added`, `Changed`, `Fixed`, `Removed`).
   - Scope covers the unified ThreadFX product (in-feed extension audio/visuals, Side Panel controls, and major companion web hub capabilities).
2. **`data/changelog.ts` (Centralized Source of Truth):**
   - TypeScript data file at the monorepo root holding the `CHANGELOG_DATA` array.
   - Accessible to both `website` and `extension` via the `@data` path alias.
   - Powers release notes, What's New dialogs, and active version derivation.

---

## 3. Step-by-Step Authoring & Release Workflow

### Step 1: Review Queued Changes in `PENDING_CHANGES.md`
Read the `## Unreleased` section of `PENDING_CHANGES.md` to review all staged bullet points.

### Step 2: Craft the Release Object (`data/changelog.ts`)
1. Create a new `ChangelogRelease` object:
   - `version`: Target version string (e.g. `"1.1.0"`).
   - `date`: Release date formatted as `"MMM DD, YYYY"` (e.g. `"Nov 14, 2026"`).
   - `title`: An engaging, descriptive title capturing the main theme (e.g. `"The Neon Sound Pack & Instant Sync"`).
   - `changes`: Array of category objects (`Added`, `Changed`, `Fixed`, `Removed`). Include only categories with items.
2. Polish raw bullets into cohesive, benefit-focused paragraphs with a bold feature title prefix:
   - Format: `"Feature Title: Friendly explanation of what this enables for the user and how it works."`
3. Prepend the new release object to the beginning of the `CHANGELOG_DATA` array in `data/changelog.ts`.

### Step 3: Reset `PENDING_CHANGES.md`
Clear the entries under `## Unreleased` in `PENDING_CHANGES.md` to reset the staging area for subsequent development:

```markdown
## Unreleased

### Added

### Changed

### Fixed

### Removed
```

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
