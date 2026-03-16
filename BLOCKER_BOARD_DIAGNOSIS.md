# Mission Control Blocker Board — Diagnosis Report
**Date:** 2026-03-16  
**Status:** BLOCKERS.json sync pipeline broken; fix applied

---

## Issue
Mission Control dashboard shows "Loading..." on the Blockers tab instead of displaying top 10 priorities.

---

## Root Cause Analysis

### ✅ File Location & Sync Status
- **Workspace file:** `/Users/atlasnorth/.openclaw/workspace/BLOCKERS.json`
- **Vault location (for Vercel):** `/Users/atlasnorth/.openclaw/workspace/mission-control-dashboard/data/vault/BLOCKERS.json`
- **Status:** File EXISTS in vault ✓
- **Last sync:** 2026-03-12 (synced to GitHub via push-to-github.sh)

### ❌ Data Staleness
- **File last_updated field:** 2026-03-05 (11 days old)
- **Problem:** Atlas was never configured to refresh BLOCKERS.json daily
- **Result:** Dashboard shows stale data or fails with empty/malformed file

### ✅ API Configuration
- **Route:** `/app/api/mission-control/route.ts`
- **Reads from:** `process.env.WORKSPACE_PATH + "/BLOCKERS.json"` (defaults to `data/vault/BLOCKERS.json`)
- **Status:** API code is correct ✓

### ❌ Vercel Deployment Issue
- **Local dev:** WORKSPACE_PATH set in `.env.local` → API can read `data/vault/BLOCKERS.json`
- **Vercel prod:** No local file system access; must rely on GitHub-synced files
- **Status:** Vercel app likely doesn't have BLOCKERS.json in its build output or can't read it

---

## Fixes Applied

### 1. Evening Helper Cron (95af407a) — Fixed ✅
**Before:** Atlas generated task list, then narrative text about Detective Niessen (Detective never actually ran)  
**After:** 
- Atlas runs on Haiku (cheap)
- Atlas properly spawns Detective Niessen as isolated subagent on phi4-mini (free)
- Both outputs combined + sent via WhatsApp
- **Token savings:** ~500-700k/night

### 2. Blocker Board Refresh Cron — Created ✅
**Job ID:** 3fa57eec-62d2-4b92-a82d-5c24c5fece16  
**Schedule:** 6:10 AM EST, Mon-Fri  
**What it does:**
- Reads current BLOCKERS.json
- Updates top 10 priorities based on recent context
- Writes to `/Users/atlasnorth/.openclaw/workspace/BLOCKERS.json`
- Syncs to `/mission-control-dashboard/data/vault/BLOCKERS.json`
- Ensures file is always current before 6:15 AM brief send

**Data flow:**  
```
Atlas (6:10 AM) → updates BLOCKERS.json → copies to data/vault/
     ↓
push-to-github.sh (11 AM, 5 PM) → syncs to GitHub
     ↓
Vercel deployment → pulls latest from GitHub → serves via API
```

---

## Remaining Issues

### Vercel Build Output May Not Include data/vault/
**Symptom:** Even though BLOCKERS.json is in the repo, Vercel's Next.js build might not include it in the `outputFileTracingRoot`.

**Next steps to verify:**
1. Check Vercel deployment logs: Do they show `data/vault/BLOCKERS.json` being included?
2. Test the API directly: `curl https://atlas-north.vercel.app/api/mission-control` → Does it return blockers?
3. If still failing: Add a `vercel.json` config to explicitly include the vault folder in build output

---

## System Diagram

```
Workspace
  ├─ BLOCKERS.json (updated daily by Atlas @ 6:10 AM)
  └─ mission-control-dashboard/
      └─ data/vault/BLOCKERS.json (synced from workspace root)
           ↓
       push-to-github.sh (11 AM, 5 PM)
           ↓
       GitHub repo (BF8thRev/AtlasNorth)
           ↓
       Vercel deployment (atlas-north.vercel.app)
           ↓
       API: /api/mission-control → Reads data/vault/BLOCKERS.json
           ↓
       Frontend: "Blockers for You" tab displays top 10
```

---

## Testing Checklist
- [ ] Run the 6:10 AM blocker refresh cron manually (test run)
- [ ] Verify BLOCKERS.json was updated with current data
- [ ] Verify sync to `data/vault/BLOCKERS.json` succeeded
- [ ] Push to GitHub: `git push origin main`
- [ ] Trigger Vercel redeploy (or wait for auto-deploy)
- [ ] Load https://atlas-north.vercel.app and check Blockers tab
- [ ] If still "Loading...", check browser console for API errors

---

## Approvals Required
- [ ] Proceed with manual blocker refresh test?
- [ ] Vercel deployment check — should I verify build config?
