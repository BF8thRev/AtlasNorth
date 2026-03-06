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

## 🕐 Deployment Schedule (updated 2026-03-05)

| Rule | Detail |
|---|---|
| Work throughout day | Commit locally after each task |
| Memory files | `ATLAS_MEMORY_EXPORT.txt` + `WORKFLOW_STATE.json` — local commit after every task |
| Push window 1 | **6:30 AM EST** — auto-push via cron |
| Push window 2 | **12:00 PM EST (Noon)** — auto-push via cron |
| Push window 3 | **6:00 PM EST** — auto-push via cron |
| Push window 4 | **11:30 PM EST** — auto-push via cron |
| Push script | `/workspace/scripts/push-to-github.sh` |
| Why | Avoid Vercel rate limits, keep deployments organized |

**Never push outside the scheduled windows unless Bryan explicitly requests it.**

---

---

---

## 🧪 Test Run Rule (set 2026-03-03)
**Every new cron, routine, or automated workflow requires a test run before it is considered live.**
- Set up the cron/routine
- Immediately trigger a test run
- Confirm output is correct
- Only then report it as live
- **No exceptions. A cron that hasn't been tested hasn't been deployed.**

---

## ✅ Blocker Resolution Protocol (set 2026-03-03)
When a blocker is resolved, in order:
1. Update `BLOCKERS.json` — set `status: "resolved"` + add `resolved_date`
2. Move entry to `COMPLETED_BLOCKERS.json` (archive)
3. Log to `FILE_AUDIT_LOG.jsonl` with timestamp and resolution note
4. Log to `ATLAS_MEMORY_EXPORT.txt` as `task_type: blocker_resolution`

**No blocker is closed until all 4 steps are done.**

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

## 🎙️ DIME EPISODE SOP WORKFLOW (Formalized 2026-03-05)

**⚠️ CRITICAL: Read this section EVERY TIME Bryan signals "New Episode Ready"**

### Where to Find the Full SOP
- **File:** `MEMORY.md` (root workspace)
- **Section:** "## DIME EPISODE SOP WORKFLOW (Formalized 2026-03-05)"
- **Includes:** 9-step workflow, 5-section artifact structure, 10 Hard Rules, folder structure

### Workflow_Feedback Doc (Live Learning System)
- **Link:** https://docs.google.com/document/d/15ewrXDLrhOTWd4nnLJTl0KvdLl7-ebZp0kf8LQErGuk/edit
- **Doc ID:** `15ewrXDLrhOTWd4nnLJTl0KvdLl7-ebZp0kf8LQErGuk`
- **MANDATORY:** Read this doc BEFORE each new episode trigger
- **Active Instructions:** Any notes in Feedback Doc override SOP if conflict
- **Logging:** After each episode, log timestamp + what worked + what failed + improvements

### Quick Reference: 10 Hard Rules (Never Forget)
1. **NO EM-DASHES EVER** — Any em-dash (—) = immediate failure
2. **INTRO HOOKS MUST BE VERBATIM WITH TIMESTAMPS** — No made-up text
3. **AUDIO TITLES MUST INCLUDE GUEST NAME** — Non-negotiable for feed discovery
4. **AUDIO OPTION 2 MUST BE EPISODE-RELEVANT** — Not generic angles
5. **YOUTUBE TITLES MUST BE SEO-OPTIMIZED, HIGH-CTR, RELEVANT** — 70-100 chars
6. **SOCIAL CLIPS REQUIRE TITLES + DESCRIPTIONS FOR SEO** — Every clip must have metadata
7. **SECTION E IS MANDATORY** — 3 newsletter title options + full drafts
8. **CONTEXTUAL AUTOCORRECT ENABLED** — Fix phonetic errors (myclobutanil, Leef Brands, etc.)
9. **ONLY REPORT AFTER STAGE 3 PASSES** — No content dumps to chat, only folder links
10. **ALL DELIVERABLES NATIVE GOOGLE DOCS** — Never .txt or .md uploads

### Trigger Flow
1. Bryan signals "New episode ready" with [Guest Name] + [Transcript Path]
2. Atlas reads Workflow_Feedback doc first (check for live notes)
3. Ingest full transcript (20k–60k tokens)
4. Create 5-section compressed artifact (local, temp)
5. File as native Google Doc via `gog docs create`
6. Delegate to subagents (OLG + Rob_C equivalent)
7. Await completion, consolidate, score, cleanup
8. Report folder link only (ZERO chat dumps)
9. Log to Workflow_Feedback with timestamp + learnings

---

---

## 🎯 NEWTON INSIGHTS SOP WORKFLOW (Formalized 2026-03-06)

**Read these BEFORE any Newton prospecting, outreach, or CRM work:**

### Core SOP Files (memory/newton/)
1. **NEWTON_BACKGROUND.md** — Thesis, why Newton exists, core value proposition
2. **NEWTON_ICP.md** — Ideal customer profile, objections, buying triggers, 4 wedges
3. **NEWTON_STYLE_GUIDE.md** — Writing tone, email structure (Problem→Insight→Offer→CTA), forbidden phrases
4. **NEWTON_SALES_MEMO.md** — Sales tactics, objection responses, what works vs. what doesn't
5. **NEWTON_PROSPECTS_SOP.md** — 9-point prospecting framework, research requirements
6. **README.md** — Index, quick reference by task

### 10 Operating Rules (Non-Negotiable)
1. **Lead with problem** — margin pressure, delayed feedback, variability (NOT features)
2. **Frame as visibility, not optimization** — Newton observes, doesn't judge
3. **Emphasize "minutes not days"** — Speed of feedback is the differentiator
4. **Software first, hardware later** — Avoid installation friction early
5. **Record → Explain → Prevent** — Trust progression model
6. **Personalize by role** — COO: margins | Director: attribution | VP: firefighting
7. **Email: 50-70 words, one idea, one question** — No scheduling links, no demos
8. **Information integrity: NEVER fabricate** — No data invention, exaggeration, or unverified claims
9. **Forbidden phrases** — reaching out, leverage, unlock, optimize, maximize, AI-powered, etc.
10. **CTA = Questions only** — "Does this show up for you during runs?" NOT "Schedule a demo?"

### CRM Structure
- **Company Profile** — Facility-level (status, health, wedge, pain points)
- **Prospects** — Contact-level (allows multiple per company; status: cold/warm/considering)
- **Outreach Log** — Interaction history (every touch, objection, next action)

### Trigger Flow (Newton Work)
1. Consult memory/newton/ SOP files first
2. Research prospect using CRM research checklist
3. Identify strongest wedge (operational, economic, compliance, or leadership)
4. Draft email using NEWTON_STYLE_GUIDE.md structure
5. Review against NEWTON_PROSPECTS_SOP.md 9-point framework
6. Final check: no fabricated data, problem-led, 50-70 words, one question
7. Log to CRM (Outreach Log + Prospects tab)
8. Track status updates (cold → warm → considering)

---

## Protocol Failures

- Missing any step = protocol failure
- Bryan will call it out
- Log the failure, fix it, do not repeat it
