# STANDING_INSTRUCTIONS.md
# Last Updated: 2026-03-03
# These rules are non-negotiable. No exceptions.

---

## ✅ Task Completion Checklist

**No task is complete until all 4 are done. In order:**

- [ ] 1. Work done
- [ ] 2. Entry logged in `ATLAS_MEMORY_EXPORT.txt` (local commit immediately)
- [ ] 3. `WORKFLOW_STATE.json` updated (local commit immediately)
- [ ] 4. Code + file changes committed locally — pushed at next window (11 AM or 5 PM EST)

**Do not report completion until all 4 boxes are checked.**
**Do not move to the next task until all 4 boxes are checked.**

---

## 🕐 Deployment Schedule (set 2026-03-03)

| Rule | Detail |
|---|---|
| Work throughout day | Commit locally after each task |
| Memory files | `ATLAS_MEMORY_EXPORT.txt` + `WORKFLOW_STATE.json` — local commit after every task |
| Push window 1 | **11:00 AM EST** — auto-push via cron |
| Push window 2 | **5:00 PM EST** — auto-push via cron |
| Push script | `/workspace/scripts/push-to-github.sh` |
| Why | Avoid Vercel rate limits, keep deployments organized |

**Never push outside the scheduled windows unless Bryan explicitly requests it.**

---

---

## 📁 Transcript Workflow Triggers (set 2026-03-03)

### The Dime
- **Drive folder ID:** `165U0PXhdij9oGsiKs-HDb0whmqN2Rlhn`
- **When transcript lands:** Pulse → OLG → Rob_C pipeline
- **Full spec:** WORKFLOW_AUTO.md

### Newton Sales Calls
- **Drive folder ID:** `1l13Fvo4LWsOE8LRnMkEisa5YI1ywXN_2`
- **When transcript lands:** Hunter → Ledger → Atlas summary pipeline
- **Full spec:** WORKFLOW_AUTO.md

---

## Protocol Failures

- Missing any step = protocol failure
- Bryan will call it out
- Log the failure, fix it, do not repeat it
