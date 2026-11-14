---
name: verify-project
description: Run an end-to-end health audit of the ThreadFX monorepo, verifying code formatting, zero lint warnings/errors, TypeScript compilation, and clean production builds for both extension and website.
---

# Verify Project Health

Use this skill whenever you want to run a complete, pre-commit or pre-release health audit of the **ThreadFX** monorepo to guarantee the entire project is in pristine condition.

---

## 1. Automated Health Verification Steps

Execute these steps in order using `npm.cmd` (PowerShell on Windows):

### Step 1: Code Formatting Check
Verify that all files comply with `oxfmt` formatting standards:
```powershell
npm.cmd run format:check
```
*If unformatted files are detected, automatically run `npm.cmd run format` to fix them.*

### Step 2: Rust-Powered Linting Check
Verify that there are zero linter errors and zero linter warnings:
```powershell
npm.cmd run lint
```
*Criteria: Must report `Found 0 warnings and 0 errors`.*

### Step 3: Full Monorepo Compilation & Packaging
Verify that both the extension (WXT) and the landing page (Vite) build without compilation errors:
```powershell
npm.cmd run build:all
```
*Verify that `extension/.output/threadfx-<version>-chrome.zip` is generated.*

### Step 4: Lockstep Version Check
Ensure `package.json`, `extension/package.json`, and `website/package.json` all share the exact same version string.

---

## 2. Health Check Summary Report

Present the results to the user using this concise status card:

```markdown
### 🛡️ ThreadFX Health Audit Report

- **Code Formatting (`oxfmt`):** ✅ Passed (All files formatted)
- **Code Linting (`oxlint`):** ✅ Passed (0 warnings, 0 errors)
- **Extension Build (WXT):** ✅ Passed (`.output/chrome-mv3` compiled)
- **Extension Archive (.zip):** ✅ Passed (`threadfx-1.0.0-chrome.zip` generated)
- **Website Build (Vite):** ✅ Passed (`dist/` production assets ready)
- **Version Alignment:** ✅ Synced across all packages (v1.0.0)
```
