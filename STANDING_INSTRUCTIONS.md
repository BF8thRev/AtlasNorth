# STANDING_INSTRUCTIONS.md
# Last Updated: 2026-03-06 14:40 EST
# 
# SOURCE OF TRUTH: All permanent rules, procedures, and protocols.
# Non-negotiable. No exceptions.
#
# ⚠️ ORGANIZATION RULE: Single Source of Truth
# • THIS FILE = Permanent rules & procedures (apply always)
# • MEMORY.md = Dated facts & status updates (what happened when)
# • NO DUPLICATION — each file has its domain
#
# For current infrastructure status, API access status, or recent events → See MEMORY.md

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

## 🕐 Deployment Schedule (updated 2026-03-06)

### ⚠️ CRITICAL: EVERY PUSH = LIVE DEPLOYMENT TO VERCEL

Vercel is configured with **auto-deploy on every push to main**. This is intentional. This means:
- **Each push is an immediate live deployment** (~60-90 seconds)
- **Pushing outside scheduled windows = unplanned live changes**
- **Scheduled windows exist to control deployment frequency** and prevent accidental live updates

### Push Windows (Immutable)

| Time | Window | Auto-triggered by cron |
|---|---|---|
| **6:30 AM EST** | Morning sync | GitHub Push cron job |
| **12:00 PM EST (Noon)** | Midday sync | GitHub Push cron job |
| **6:00 PM EST** | Evening sync | GitHub Push cron job |
| **11:30 PM EST** | Night wrap | GitHub Push cron job |

### Local Commit Workflow (Throughout Day)

Work → Commit locally → Next push window → Vercel deploys

| Action | Detail |
|---|---|
| Work throughout day | Execute tasks, create/modify files |
| Local commits | After each task, commit to local main branch |
| Memory logging | Every task must update `ATLAS_MEMORY_EXPORT.txt` + `WORKFLOW_STATE.json` |
| Push script | `/workspace/scripts/push-to-github.sh` (runs during cron windows only) |

### THE RULE: No Pushes Outside Windows

**NEVER push outside the 4 scheduled windows except by explicit Bryan authorization.**

If you push outside the windows:
1. You trigger an unplanned live deployment
2. You may interrupt Bryan's work or create unexpected user-facing changes
3. You violate the deployment control protocol

**Exception:** Only Bryan can authorize emergency pushes (e.g., critical security fix). Must be explicitly requested.

---

---

## 🔐 SECRETS POLICY (Enforced 2026-03-06)

**NO HARDCODED SECRETS IN CODE. EVER.**

- ❌ Google OAuth Client ID — NEVER hardcode
- ❌ Google OAuth Client Secret — NEVER hardcode
- ❌ API keys, tokens, passwords — NEVER hardcode
- ✅ All credentials MUST come from environment variables (os.environ.get)
- ✅ Load from .env via python-dotenv or read from Vercel env vars
- ✅ All production credentials stored in Vercel Environment Variables

**If secrets are ever exposed in a commit:**
1. Immediately notify Bryan
2. Use BFG repo-cleaner: `brew install bfg`
3. Run: `bfg --replace-text /path/to/secrets.txt --no-blob-protection`
4. Force push: `git push -f origin main`
5. GitHub Push Protection will pass once history is clean

**History note:** Full git history was cleaned of Google OAuth secrets on 2026-03-06 14:32 EST using BFG. Zero secrets remain.

---

## 📡 Infrastructure Reference (2026-03-06)

For detailed infrastructure configuration, see **MEMORY.md — "GitHub & Vercel Infrastructure"** section:

**GitHub:**
- Repo: https://github.com/BF8thRev/AtlasNorth.git
- Remote configured locally
- PAT token in ~/.openclaw/.env

**Vercel:**
- App URL: https://atlas-north.vercel.app/
- Auto-deploy on every push to main (intentional)
- Environment variables: GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET

**Memory Vault:**
- Location: GitHub repo → data/vault/
- Synced via cron at 4 push windows
- Full backup of workspace memory, configs, and audit logs

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

**This is the authoritative SOP.** Current configuration tracked in MEMORY.md.

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
