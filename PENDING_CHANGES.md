# PENDING_CHANGES.md — ThreadFX Staged Updates

> Staging area for user-facing changes during ongoing development.
> Entries here are queued and will be published to `data/changelog.ts` when running `/create-changelog` or `/release-extension`.
> Scope covers the complete ThreadFX experience: in-feed extension interactions, sound packs, Side Panel tools, and companion web hub capabilities.

---

## Unreleased

### Added

### Changed

- **Optimized Landing Page Bundling & Preloading**: Configured manual vendor chunking for GSAP, React, and UI dependencies, splitting the monolithic bundle into cached parallel chunks, and preloaded the high-priority hero emblem for faster first-paint rendering.

### Fixed

- **Cleaned Up Micro-Timer Lifecycles**: Bound transient audition and animation timers in the landing page waveform, simulator, and milestone panels to component lifecycles to prevent unmount retention.

### Removed

---

## Changelog Guidelines

- Write from the user's perspective (what they hear, see, and feel).
- Use sensory, engaging language with bold title prefixes:
  `**Feature Name**: Description of what this brings to the user's feed and how it works.`
- **Zero Technical Jargon**: Never mention React, hooks, WXT, Tailwind, AudioContext, DOM classes, or npm packages.
