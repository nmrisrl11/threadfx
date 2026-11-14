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
4. **Website Navbar Badge:** Update the version pill in `website/src/App.tsx` (e.g. `v<NEW_VERSION>`)
5. **Side Panel Footer:** Update the version label in `extension/entrypoints/sidepanel/App.tsx` (e.g. `v<NEW_VERSION> • Manifest V3`)

---

## Step 3: Clean Build & Zip Packaging

Run the full monorepo build pipeline:

```powershell
npm.cmd run build:all
```

Verify the build output:
1. **Extension Compilation:** `.output/chrome-mv3` contains the compiled extension files.
2. **Zip Package Generation:** Verify `extension/.output/threadfx-<NEW_VERSION>-chrome.zip` was created.
3. **Website Static Dist:** Verify `website/dist/` compiled cleanly.

---

## Step 4: Refresh Local Fallback Archive

Copy the newly built zip to `website/public/threadfx-latest.zip` as a local offline fallback (ensure it remains gitignored):

```powershell
Copy-Item "extension\.output\threadfx-<NEW_VERSION>-chrome.zip" "website\public\threadfx-latest.zip" -Force
```

---

## Step 5: Prepare GitHub Release Draft

Generate a pre-filled GitHub Release draft URL for the user:

```text
https://github.com/nmrisrl11/threadfx/releases/new?tag=v<NEW_VERSION>&title=ThreadFX+v<NEW_VERSION>
```

Present this link to the user with the following release instructions:
1. Click the link to open the pre-filled GitHub Release draft.
2. Paste the user-facing changelog notes into the release description.
3. Drag and drop `extension/.output/threadfx-<NEW_VERSION>-chrome.zip` into the "Attach binaries" area.
4. Click **Publish release**.

---

## Step 6: Distribution Verification (Cloudflare R2 & Vercel)

Remind the user:
- The website download button links to `/download`, which resolves via `website/vercel.json` to the Cloudflare R2 bucket.
- Upload `threadfx-<NEW_VERSION>-chrome.zip` (renamed to `threadfx-latest.zip`) to the Cloudflare R2 bucket for instant zero-egress public distribution.
- Once Vercel deploys `main`, the website will immediately serve the updated release!
