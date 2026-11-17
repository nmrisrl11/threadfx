# SECURITY_AND_DISTRIBUTION.md — Security Architecture, VirusTotal Audits & Distribution Guide

> **ThreadFX** is built with a zero-telemetry, privacy-first architectural foundation. This document details our security posture, explains how browser security systems interact with unpacked extensions, provides instructions for verifying VirusTotal scan reports, and defines our distribution and archive naming standards.

---

## 1. Executive Summary & Security Scorecard

| Security Metric                 | ThreadFX Specification                                        | Industry Benchmark           |
| :------------------------------ | :------------------------------------------------------------ | :--------------------------- |
| **VirusTotal Detection Ratio**  | **0 / 64 Clean** (Zero malware, zero adware, zero heuristics) | < 1/70                       |
| **Manifest Version**            | **Manifest V3** (Strict W3C & Chromium Standard)              | Manifest V3                  |
| **Extension Permissions**       | `["sidePanel", "storage"]` (Strictly minimal)                 | Typically 5–10 permissions   |
| **Host Permissions**            | Scoped strictly to `threads.com` (and legacy `threads.net`)   | Often `<all_urls>`           |
| **Remote Code Execution**       | **0%** (Strict CSP compliance, no remote `.js` or CDNs)       | Banned in MV3                |
| **Audio File Fetching**         | **0%** (100% procedural Web Audio synthesis via ZzFX)         | Loose `.mp3` / `.wav` assets |
| **Data Collection / Telemetry** | **0 bytes** (All stats & settings stored locally on device)   | Varies                       |
| **Zipped Bundle Footprint**     | **~880 KB** (Optimized SVG/WebP assets, Latin variable fonts) | 3 MB – 25 MB                 |

---

## 2. Browser & PC Warning Systems: Sideloading vs. Malware

When distributing desktop software or browser extensions outside of the Chrome Web Store, operating systems and browsers trigger built-in security alerts. Understanding the difference between **heuristic malware flags** and **reputation-based friction** is essential:

```mermaid
flowchart TD
    A["User Downloads threadfx-1.0.0.zip"] --> B{"Is file downloaded from Chrome Web Store?"}
    B -- Yes --> C["1-Click Install<br/>Zero Warnings (Google Signature Verified)"]
    B -- No (Direct Zip) --> D{"Reputation Scoring<br/>(SmartScreen / Safe Browsing)"}
    D -- New URL / Low Volume --> E["'Not commonly downloaded' Notice<br/>(Reputation Heuristic, Not a Virus)"]
    D -- Known Hash --> F["Standard Download Allowed"]
    E --> G["User Unzips & Enables Developer Mode"]
    G --> H["Chrome: 'Disable developer mode extensions'<br/>(Chromium Sideloading Policy)"]
    H --> I["Extension Operates Safely & Cleanly"]
```

### A. Windows Defender SmartScreen & Chrome Safe Browsing

- **The Prompt:** _"This file is not commonly downloaded and may be dangerous"_ or _"Make sure you trust [filename] before opening."_
- **The Mechanism:** This is **not** an antivirus detection. SmartScreen and Safe Browsing calculate a dynamic reputation score based on URL age and download volume. Because each new version of ThreadFX generates a unique SHA-256 file hash, automated reputation engines treat the newly published file with caution until it accumulates sufficient global download volume.

### B. Chromium's "Disable Developer Mode Extensions" Banner

- **The Prompt:** Chrome or Brave occasionally displays: _"Disable developer mode extensions — Extensions running in developer mode can harm your computer."_
- **The Mechanism:** This is a hardcoded Chromium security policy implemented by Google to prevent rogue desktop installers from silently injecting malicious extensions behind the user's back. **Every legitimate unpacked extension triggers this prompt when Developer Mode is enabled.** It cannot be disabled programmatically by design.

---

## 3. ThreadFX Security & Privacy Architecture

ThreadFX eliminates heuristic red flags by adhering strictly to zero-trust design principles:

### 1. Zero Dynamic Code Execution

- **Zero `eval()` or `new Function()`:** The extension codebase is written in typed TypeScript and compiled to static, deterministic JavaScript modules.
- **Zero Remote Code:** In full compliance with Manifest V3 CSP (`content_security_policy`), ThreadFX loads 100% of its scripts, stylesheets, fonts, and assets from local disk. It never requests external scripts or third-party CDNs.

### 2. Zero External Audio Files

- Instead of downloading binary `.mp3`, `.wav`, or `.ogg` files (which heuristic scanners frequently scrutinize for hidden payloads or steganography), ThreadFX utilizes **ZzFX** (`@data/zzfx`). All sound effects are generated mathematically in-memory using the native browser `AudioContext` and short numeric parameter arrays.

### 3. Strictly Scoped Permissions

- **Permitted API Access:** Only `chrome.sidePanel` (to dock the settings interface) and `chrome.storage.local` (to persist user volume, active presets, and lifetime odometer).
- **Target Hosts:** Strictly restricted to `https://*.threads.com/*` and legacy `https://*.threads.net/*`.
- **Zero Invasive Permissions:** Does **not** request `<all_urls>`, `webRequest`, `cookies`, `management`, `nativeMessaging`, or background tab inspection.

### 4. Zero Keystroke Logging or Form Observation

- The content script DOM observer attaches strictly to trusted user click events on semantic like buttons (`[role="button"][aria-label*="Like" i]`) and heart SVG elements. It contains zero listeners on text areas, password inputs, or authentication forms.

---

## 4. Short-Term Distribution: Unpacked `.zip` & VirusTotal

Until official publication on the Chrome Web Store, ThreadFX is distributed directly to users via our Cloudflare R2 bucket.

### Verifying with VirusTotal

Release packages are scanned and verified via the official VirusTotal API:

1. **Automated Scanner:** Maintainers run `npm run scan:security`, which calculates the SHA-256 hash and uploads the binary to VirusTotal API v3.
2. **0 / 64 Clean Status:** Confirmed zero detections across all 64 major security engines (Microsoft Defender, Avast, BitDefender, Kaspersky, Sophos, Google, etc.).
3. **Public Inspection:** Users and developers can inspect the live cryptographic scan report directly at [virustotal.com/gui/file/d7978549959b...](https://www.virustotal.com/gui/file/d7978549959b4d3cc91d287cb0d9843a29997a08c1c57e4f88878a6c621cfa65). Maintainers link this report directly in every GitHub Release.

### Safe Installation Instructions for Users

1. Download `threadfx-1.0.0.zip` (or `threadfx-latest.zip`) from [threadfx.nmrisrl.dev/download](https://threadfx.nmrisrl.dev/download) or GitHub Releases.
2. Extract the archive into a permanent folder (e.g., `Documents/ThreadFX/`).
3. Open your browser and navigate to `chrome://extensions/` (or `edge://extensions/`, `brave://extensions/`).
4. Enable the **Developer mode** toggle in the top-right corner.
5. Click **Load unpacked** and select the extracted folder containing `manifest.json`.
6. Pin **ThreadFX** to your browser toolbar and start browsing [threads.com](https://threads.com).

### Seamless Updates for Unpacked Installations (10 Seconds, Zero Data Loss)

Because unpacked extensions run from a local directory path, updating to a new version does **not** require removing the extension or resetting user settings:

1. **Keep a Fixed Installation Directory:** Store ThreadFX in a permanent directory (such as `Documents/ThreadFX/` or `extensions/threadfx/`).
2. **Download & Overwrite:** When an update notification appears in the Side Panel header or Storage tab, download the latest `threadfx-<version>.zip` (or `threadfx-latest.zip`) and extract its contents directly over your existing ThreadFX directory, replacing all files.
3. **Reload in Extensions Manager:** Navigate to `chrome://extensions/` and click the circular **Reload icon (`↻`)** on the ThreadFX card.
4. **100% Data Preservation:** All user volume settings, active sound presets, lifetime like counts, and unlocked 3D milestone badges are stored in Chrome's dedicated extension database (`chrome.storage.local`) and remain completely intact across file overwrites.

---

## 5. Extension Archive Naming Standard

ThreadFX standardizes on **clean, universal archive naming** across all Chromium-based desktop browsers:

```text
threadfx-<version>.zip
```

### Examples:

- `threadfx-1.0.0.zip` (Universal Chromium release: Chrome, Brave, Edge, Arc, Opera)
- `threadfx-latest.zip` (Direct convenience link on Cloudflare R2 for `/download` redirects)
- `threadfx-1.0.0-firefox.zip` (Dedicated Firefox target if compiled with `-b firefox`)

### Why Universal Naming (`threadfx-<version>.zip`) is the Best Practice:

1. **Broad User Inclusivity:** Extensions work identically across Chrome, Brave, Arc, Edge, and Opera. Dropping browser-specific tags eliminates confusion for non-Chrome users.
2. **Automated Dual Packaging:** The build pipeline automatically produces both `threadfx-<version>.zip` and `threadfx-latest.zip` in one step with zero manual renaming.

---

## 6. Long-Term Distribution Roadmap (Chrome Web Store)

The ultimate solution that permanently eliminates all SmartScreen warnings, Safe Browsing friction, and Developer Mode prompts is official publication on the **Chrome Web Store**:

1. **Google Cryptographic Signature:** Web Store extensions are digitally signed and distributed directly by Google over trusted `chromewebstore.google.com` infrastructure.
2. **One-Click Installation:** Users install via a single "Add to Chrome" button without enabling Developer Mode or unzipping archives.
3. **Automated Background Updates:** New features and DOM compatibility updates push seamlessly to all users without manual downloads.

_Timeline: ThreadFX v1.0.0 is currently pre-configured for Web Store review with minimal permissions, zero remote code, and clean Manifest V3 architecture._
