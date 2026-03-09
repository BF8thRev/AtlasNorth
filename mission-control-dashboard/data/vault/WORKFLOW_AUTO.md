# WORKFLOW_AUTO.md
# Last Updated: 2026-03-03
# Purpose: Defines automated workflow triggers for agent dispatch.
# Read this file on every context reset to restore operating protocols.

---

## 📁 Google Drive Transcript Workflows

### The Dime — Transcript Workflow
- **Folder:** https://drive.google.com/drive/folders/165U0PXhdij9oGsiKs-HDb0whmqN2Rlhn
- **Folder ID:** `165U0PXhdij9oGsiKs-HDb0whmqN2Rlhn`
- **Trigger:** New transcript file appears in folder
- **Agent pipeline:**
  1. **Pulse** — ingests transcript, extracts key topics, market signals, guest insights
  2. **OLG** — drafts content (clips, posts, show notes) based on Pulse output
  3. **Rob_C** — evaluates content against audience engagement rules
- **Output destinations:** TBD when workflow is built
- **Status:** 🟡 Folder ready — workflow not yet built

---

### Newton Insights — Sales Call Transcript Workflow
- **Folder:** https://drive.google.com/drive/folders/1l13Fvo4LWsOE8LRnMkEisa5YI1ywXN_2
- **Folder ID:** `1l13Fvo4LWsOE8LRnMkEisa5YI1ywXN_2`
- **Trigger:** New sales call transcript file appears in folder
- **Agent pipeline:**
  1. **Hunter** — extracts objections, buying signals, prospect pain points
  2. **Ledger** — logs metrics, deal stage, follow-up actions
  3. **Atlas** — surfaces patterns to Bryan weekly
- **Output destinations:** Newton_tasks.md, prospects Google Sheet
- **Status:** 🟡 Folder ready — workflow not yet built

---

## 🔁 Post-Compaction Startup Protocol
On every context reset, Atlas must read:
1. `WORKFLOW_AUTO.md` ← this file
2. Most recent `memory/YYYY-MM-DD.md`
3. `STANDING_INSTRUCTIONS.md`
4. `WORKFLOW_STATE.json`

These 4 files restore full operating context after compaction.

---

## 📋 Standing Rules (cross-reference STANDING_INSTRUCTIONS.md)
- No task is complete without all 4 checklist items
- 90% confidence threshold before execution
- Kiwi required during Observation Mode
- Max 3 revisions before escalation to Bryan
