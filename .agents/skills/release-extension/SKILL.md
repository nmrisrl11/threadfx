---
name: release-extension
description: Step-by-step workflow to bump version in lockstep across root, extension, and website, compile and zip packages, update UI badges, and prepare a GitHub Release draft for ThreadFX.
---

# Release Extension Workflow

Use this skill whenever you are preparing to release a new version of the **ThreadFX** browser extension and companion website.

---

## Step 1: Confirm the Target Version

1. Check the current version from:
   - Root [package.json](file:///C:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/threadfx/package.json)
   - [extension/package.json](file:///C:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/threadfx/extension/package.json)
   - [website/package.json](file:///C:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/threadfx/website/package.json)
2. Ask the user what the new version number should be according to SemVer:
   - **Patch (`1.0.0` → `1.0.1`):** Bug fixes, minor visual adjustments, selector improvements.
   - **Minor (`1.0.0` → `1.1.0`):** New sound packs, new visual effects, side panel features.
   - **Major (`1.0.0` → `2.0.0`):** Breaking architectural changes, cross-browser engine rewrites.
3. **Wait for user confirmation** of the target version before proceeding.

---

## Step 2: Lockstep Version Bump Across All Manifests & UI

Update the `"version"` field in lockstep:

1. **Root Monorepo:** `package.json` line 3 ➡️ `"version": "<NEW_VERSION>"`
2. **Browser Extension:** `extension/package.json` line 3 ➡️ `"version": "<NEW_VERSION>"`
   *(WXT automatically injects this version into `manifest.json` and uses it to name the zip package)*
3. **Website App:** `website/package.json` line 3 ➡️ `"version": "<NEW_VERSION>"`
4. **Central Metadata:** Update `APP_INFO.version` and `APP_INFO.versionTag` in `data/app.ts` (which automatically propagates to both the website navbar badge and the sidepanel footer via `@data/app`).

---

## Step 3: Promote Pending Changes to Changelog

1. Read staged updates from `PENDING_CHANGES.md` under `## Unreleased`.
2. Format the release object and prepend it to `CHANGELOG_DATA` in `data/changelog.ts`.
3. Reset `## Unreleased` in `PENDING_CHANGES.md`.

---

## Step 4: Clean Build & Zip Packaging

Run the full monorepo build pipeline:

```powershell
npm.cmd run build:all
```

Verify the build output:
1. **Extension Compilation:** `.output/chrome-mv3` contains the compiled extension files.
2. **Zip Package Generation:** Verify `extension/.output/threadfx-<NEW_VERSION>.zip` and `extension/.output/threadfx-latest.zip` were generated automatically.
3. **Website Static Dist:** Verify `website/dist/` compiled cleanly.

---

## Step 5: Automated VirusTotal Security Verification

Run the automated VirusTotal verification script:

```powershell
npm.cmd run scan:security
```

1. **Calculates SHA-256:** Computes the SHA-256 cryptographic hash of the compiled zip package.
2. **VirusTotal API Query:** If `VIRUSTOTAL_API_KEY` is present in `.env`, automatically uploads the binary, polls the multi-engine antivirus scanners, and outputs the clean detection ratio.
3. **Embed in Release:** Attach the permanent VirusTotal scan report link (`https://www.virustotal.com/gui/file/<sha256>`) in the GitHub Release description under a dedicated `### 🛡️ Security & Integrity` section for public transparency.

---

## Step 6: Prepare GitHub Release Draft

Generate a pre-filled GitHub Release draft URL for the user:

```text
https://github.com/nmrisrl11/threadfx/releases/new?tag=v<NEW_VERSION>&title=ThreadFX+v<NEW_VERSION>
```

Present this link to the user with the following release instructions:
1. Click the link to open the pre-filled GitHub Release draft.
2. Paste the user-facing changelog notes and the VirusTotal security report link into the release description.
3. Drag and drop `extension/.output/threadfx-<NEW_VERSION>.zip` into the "Attach binaries" area.
4. Click **Publish release**.

---

## Step 7: Distribution Verification (Cloudflare R2 & Vercel)

Remind the user:
- The website download button links to `/download`, which resolves via `website/vercel.json` to the Cloudflare R2 bucket (`https://releases.nmrisrl.dev/threadfx-latest.zip`).
- Upload `threadfx-latest.zip` (automatically generated in `extension/.output/`) directly to the Cloudflare R2 bucket for instant zero-egress public distribution.
- **Zero Vercel Egress:** The zip archive is NEVER placed in `website/public/` or deployed through Vercel, protecting Vercel Hobby bandwidth limits.
- Once Vercel deploys `main`, the website will immediately redirect downloaders to Cloudflare R2!
