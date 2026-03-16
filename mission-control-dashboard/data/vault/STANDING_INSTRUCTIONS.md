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

## 📁 FILE PROTOCOL — SINGLE SOURCE OF TRUTH

**Every file has ONE home. It lives in one location only. No copies across directories.**

### File Locations (Non-Negotiable)

**Workspace Root** — Only files loaded every session (always available to Atlas)
```
SOUL.md                  ← Atlas identity & voice
MEMORY.md                ← Current session context
STANDING_INSTRUCTIONS.md ← This file (permanent rules)
IDENTITY.md              ← User/assistant identity
AGENTS.md                ← Agent roster + delegation rules
HEARTBEAT.md             ← System health (auto-updated)
TOOLS.md                 ← Environment-specific notes (cameras, SSH, etc.)
USER.md                  ← About the human
USER_IDENTITY.md         ← User preferences
```

**workspace/reference/** — Static reference docs (read on-demand only)
- Architectural diagrams
- Protocol documentation
- One-time setup guides
- Rarely-changed reference material

**workspace/memory/** — Daily logs, archives, historical data
- `memory/MEMORY_MM-DD-YY.md` ← Rotated daily
- `memory/LEARNINGS.md` files ← Domain-specific learnings
- `memory/PULSE_BRIEF_SPEC.md` ← Static specs (rarely change)
- Archived context older than current session

**mission-control-dashboard/data/vault/** — Dashboard display data (SINGLE SOURCE FOR VERCEL)
```
BLOCKERS.json            ← Top 10 priorities (updated daily @ 6:10 AM by Atlas)
WORKFLOW_STATE.json      ← Open loops & workflow status
podcast-reviews.json     ← YouTube content ratings
TOKEN_USAGE.jsonl        ← API spend history
FILE_AUDIT_LOG.jsonl     ← System file operations log
[+ memory/ subfolder]    ← Synced daily from workspace/memory/
```

### The Rule: Data Flows One Direction

```
Agent work
    ↓
Write to vault/ file (single copy)
    ↓
push-to-github.sh syncs vault/ → GitHub
    ↓
Vercel pulls from GitHub
    ↓
Dashboard reads from vault/
```

**NEVER:**
- ❌ Duplicate a vault file in workspace root
- ❌ Have two copies of the same data in different locations
- ❌ Write to workspace root if the source-of-truth is in vault/
- ❌ Have agents read from workspace root if the vault copy exists

**IF a file needs to be read by both an agent AND the dashboard:**
- The vault copy is the source of truth
- The agent reads FROM vault, not a workspace copy
- Example: BLOCKERS.json lives in `mission-control-dashboard/data/vault/BLOCKERS.json` only

### Before Creating Any New File

**CHECKLIST:**
1. Does this file already exist somewhere? (Search workspace/ + vault/)
2. If yes → Use the existing file (do NOT create a second copy)
3. If no → Choose the right location using rules above
4. If it's dashboard data → Put it in vault/ only
5. If it's workspace context → Put it in workspace root only
6. If it's historical/archived → Put it in workspace/memory/ only

### Sync Workflow

**Local writes → GitHub → Vercel deployment (automatic)**

| Step | What Happens | Who |
|------|-------------|-----|
| Agent creates/updates file | Writes to workspace root or vault/ | Atlas / subagent |
| Local commit | `git add` + `git commit` at end of task | Atlas |
| Scheduled push (11 AM, 5 PM, etc.) | `push-to-github.sh` runs, syncs vault/ to GitHub | Cron |
| GitHub webhook | Notifies Vercel of push | GitHub |
| Vercel deployment | Auto-deploys new code + data/vault/ files to production | Vercel |
| Dashboard refresh | Next page load reads new data from deployed vault/ | Browser |

**Push windows (only times to sync to production):**
- 6:30 AM EST (morning)
- 12:00 PM EST (noon)
- 6:00 PM EST (evening)
- 11:30 PM EST (night)

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

## 📡 Infrastructure References

**For current infrastructure status, URLs, and configuration details:**
→ See **MEMORY.md — "GitHub & Vercel Infrastructure (Status as of...)"**

This file contains only rules about how to use them.

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

## 📋 MISSION CONTROL BLOCKERS BOARD + DAILY EXECUTION CYCLE (Formalized 2026-03-08)

**This is the standing operational procedure for daily momentum + blocker elimination.**

### Daily Cycle (Repeating)

**8 PM EST — Evening Helper Ideas Drop (Cron Job)**
- Review Mission Control blockers board (current focus items)
- Generate 5-10 actionable tasks I (Atlas) can execute tonight/next morning
- For each item: task # | description | North Star impact (Dime/Newton/Personal) | time estimate
- Send numbered list to Bryan via WhatsApp
- Bryan picks which ones to execute

**Overnight/Morning — Atlas Execution**
- Execute on Bryan's selected items
- Maintain detailed logs of what was done + time spent

**Morning — Board Update (Natural)**
- Archive completed items from Mission Control blockers board (log with timestamp + "Vercel Deployment Wave X")
- Add 5-10 NEW focus items to board (next day's attack list)
- Board is stacked + ready for Bryan to attack during the day

**Day — Bryan Eliminates**
- Bryan attacks the board during business hours
- Completes as many items as possible
- Board refreshes for next cycle

### Success Metric
Keep attacking the list. Every day the board should show completed items from previous day + new items added each morning. Show velocity + momentum.

### Cron Job Reference
- **Job Name:** Evening Helper Ideas Drop — 8 PM EST
- **Job ID:** 95af407a-6760-42d0-9d73-7201775ab5f6
- **Schedule:** Daily 8 PM EST (0 20 * * * America/New_York)
- **Delivery:** WhatsApp to +16318775553

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

## 📺 YOUTUBE CONTENT PIPELINE — TWO-STAGE WORKFLOW (Formalized 2026-03-10)

**This is the standing operational procedure for ingesting and evaluating The Dime episodes.**

### Why Two Stages?
- **Part 1 (Daily Ingest):** Fast, lightweight. Load new episodes to dashboard same day for visibility.
- **Part 2 (Weekly Evaluation):** Deep analysis. Rate episodes after time-gates pass (7d shorts, 14d long-form).
- **Result:** Bryan sees new content immediately (unrated) + ratings populate after performance is clear.

### Part 1 — Daily Catalog & Ingest (11 PM EST)

**Job Details:**
- **Name:** YouTube Content Catalog — Daily Pull — 11 PM EST
- **Job ID:** `9dc17356-0dab-41b1-a3e4-85d8b0b9ead7`
- **Schedule:** Every day 11 PM EST (`0 23 * * *` America/New_York)
- **Model:** `claude-haiku-4-5-20251001` (lightweight, fast)
- **Timeout:** 300 seconds

**Task:**
1. Query The Dime YouTube channel (UCcck3tzBNXrJ1WJ8EtIVq1w) for uploads in last 24 hours via YouTube Data API v3
2. For each new episode, collect metadata:
   - Video ID, Title, Publish date (ISO), Duration, View count, Like count
   - Estimate format (short <120s, long ≥120s)
   - Title style (declarative, compressed, colon_subtitle, etc.)
   - Likely theme if identifiable
3. Append to `memory/YOUTUBE_CONTENT_CATALOG.md` (tracking log only)
4. Add entry to `podcast-reviews.json` with schema:
   ```json
   {
     "id": "<youtube-id>",
     "title": "<title>",
     "publishedAt": "<ISO-date>",
     "format": "short|long",
     "viewCount": <number>,
     "likeCount": <number>,
     "addedAt": "<today-ISO>",
     "eligibleDate": "<ISO-date-7d-or-14d>",
     "rating": null,
     "ratingDate": null,
     "category": null,
     "rampStatus": null,
     "slowStarter": null,
     "notes": "Unrated—pending evaluation after time-gate"
   }
   ```
5. Deduplication: Check if ID already in file before adding. Skip duplicates.

**Output:**
- `memory/YOUTUBE_CONTENT_CATALOG.md` — new row appended
- `podcast-reviews.json` — new entry added with rating: null

**Critical Rules:**
- ❌ Do NOT evaluate episodes
- ❌ Do NOT check time-gates
- ❌ Do NOT rate or assign categories
- ✅ Ingest only. Part 2 handles evaluation.

### Part 2 — Weekly Evaluation & Rating (Tuesday 10 AM EST)

**Job Details:**
- **Name:** YouTube Content Rating — Weekly Evaluation — Tuesday 10 AM EST
- **Job ID:** `d69b4947-867a-4456-a471-5bc9bfa553e6`
- **Schedule:** Every Tuesday 10 AM EST (`0 10 * * 2` America/New_York)
- **Model:** `claude-sonnet-4-20250514` (reasoning required for ramp curves)
- **Timeout:** 120 seconds

**Task:**
1. Read `podcast-reviews.json`
2. Filter: `rating === null AND today >= eligibleDate` (time-gates cleared)
3. For each qualifying episode:
   a) Fetch current YouTube stats (views, likes)
   b) Apply performance ramp curve model:
      - Shorts at day-7+: should be ~85% of final 30-day views
      - Long-form at day-14+: should be ~90% of final 60-day views
   c) Rate on 5-point scale:
      - weak (below baseline, declining)
      - solid (at or slightly below baseline, steady)
      - strong (at or above baseline, positive trajectory)
      - exceptional (well above baseline)
      - breakout (exceptional + high engagement)
   d) Assign category: policy_regulatory, market_dynamics, science_tech, extraction_ops, culture_story, brand_content, leadership, investor_lens
   e) Flag slow starters: views < baseline BUT growth > 15% daily
4. Update `podcast-reviews.json` entries with:
   ```json
   {
     "ratedAt": "2026-03-XX",
     "rating": "strong",
     "category": "extraction_ops",
     "daysLive": 7,
     "viewsAtRating": 145,
     "rampStatus": "on-track",
     "slowStarter": false,
     "notes": "[brief insight]"
   }
   ```
5. Sync to Mission Control: `cp podcast-reviews.json mission-control-dashboard/public/data/podcast-reviews.json`
6. Append to `memory/DIME_LEARNINGS.md`:
   - [YYYY-MM-DD] Episode ID | Title | Rating | Category | Key Learning
   - What worked, what didn't, patterns & trends
   - Check existing entries — NO DUPLICATES

**Output:**
- `podcast-reviews.json` — entries updated with rating + category + performance data
- `memory/DIME_LEARNINGS.md` — new learnings appended (dated entries)
- Mission Control dashboard — synced and displayed as RATED

**Critical Rules:**
- ❌ Do NOT ingest new episodes (Part 1 handles daily ingest)
- ❌ Do NOT rate entries before eligibleDate
- ✅ Evaluate only entries where rating === null
- ✅ Use actual YouTube data (no fabrication)
- ✅ Check DIME_LEARNINGS.md for existing entries before appending (no duplicates)

### Dashboard Behavior (Bryan's View)

| Day | Stage | Status | Notes |
|---|---|---|---|
| **0 (publish)** | Part 1 runs 11 PM | **UNRATED** | Episode appears in podcast-reviews.json immediately |
| **1-6 (shorts) / 1-13 (long)** | Both idle | **UNRATED** | Time-gate still active, no evaluation |
| **7 (shorts) / 14 (long)** | Part 2 runs Tue 10 AM | **→ RATED** | Episode evaluates, rating fills in, dashboard updates |

**Result:** New episodes visible daily. Ratings populate after performance is measurable.

### Files Reference

| File | Owner | Purpose | Update Frequency |
|---|---|---|---|
| `memory/YOUTUBE_CONTENT_CATALOG.md` | Part 1 | Tracking log (metadata only) | Daily 11 PM |
| `podcast-reviews.json` | Part 1 + Part 2 | Single source of truth (all episodes + ratings) | Daily 11 PM (ingest) + Tue 10 AM (rating) |
| `memory/DIME_LEARNINGS.md` | Part 2 | Learning database (patterns, insights) | Weekly Tue 10 AM |
| Mission Control Dashboard | Part 2 (via sync) | User-facing display | Weekly Tue 10 AM |

### Permanent Rule
**Part 1 = Never evaluate. Part 2 = Never ingest. Clean separation.**

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

## 🎯 NEWTON COLD EMAIL CAMPAIGN WORKFLOW (Formalized 2026-03-08)

**For coordinated cold email campaigns with multiple prospects, follow this SOP:**

**Reference:** `memory/newton/NEWTON_COLD_EMAIL_CAMPAIGN_SOP.md`

### Three-Person Workflow
- **Atlas:** Prospect selection, research, email drafting (3 variations), calibration to Bryan's voice
- **Hunter:** CRM management (loading prospects, tracking responses, logging objections, updating status)
- **Bryan:** Reviews drafts, personalizes emails, sends from own email, conducts first conversations

### Controlled Run Process
1. **Phase 1:** Atlas selects 10 Ops Leaders from prospect list + researches each
2. **Phase 2:** Load into Newton CRM with persona, pain point, strongest wedge
3. **Phase 3:** Atlas drafts 3 email variations (all using verified hook: Mitchell Osak Substack article)
4. **Phase 4:** Bryan reviews + approves tone, personalizes each email
5. **Phase 5:** Bryan sends 10 emails from his account
6. **Phase 6:** Hunter tracks responses, logs objections, updates CRM status

### Newton CRM Structure (Cold Campaign)
- **Single source of truth:** Newton CRM Google Sheet
- **Columns:** Date | Prospect | Company | Role | Email | Persona | Stage | Primary Problem | Strongest Wedge | Message Type | Message Sent Date | Response | Objection | Next Action | Notes
- **Owner:** Hunter (updates all responses, objections, next actions)
- **Access:** Atlas (initial load), Bryan (review), Hunter (ongoing management)

### Email Framework (3 Variations)
All use: Mitchell Osak Substack (https://mitchellosak.substack.com/p/cannabis-cost-savings-hiding-in-plain)
- **Variation 1:** Feedback Loop angle (technical, process-focused)
- **Variation 2:** Baseline Shift angle (operational, pattern-focused)
- **Variation 3:** Cost Savings angle (economic, margin-focused)

**Standards:** 50-70 words, Bryan's voice, one diagnostic question (no scheduling links), no marketing language

### Metrics to Track (Hunter)
- Reply rate (target: 15-25% for cold B2B)
- Positive response rate
- Objection patterns (budget, prior tool, operator resistance, etc.)
- Best persona (which role responds best)
- Best angle (which variation drives engagement)

### Cron Jobs — Newton Operations
**Hunter Weekly Prospecting (Enabled 2026-03-08):**
- Schedule: Every Monday @ 10:00 AM EST
- Job ID: `7e4b409f-5fc1-4555-8613-52d918894558`
- Task: Search + add 10-20 new Ops Leaders to Newton CRM (no outreach, pipeline building only)
- Sources: LinkedIn, company sites, industry directories
- Delivery: WhatsApp announce (prospects found, added, sources, patterns)
- First run: Monday, March 10, 2026 @ 10:00 AM EST

---

## 🤖 SUBAGENT OPERATIONAL STANDARDS (Formalized 2026-03-06 · Updated 2026-03-10)

### Agent Roster & Deployment Rules

**Active Agents (Registered & Production-Ready):**
1. **Atlas** (self) — Executive partner, task routing, synthesis
2. **Hunter** — Sales research, prospect pipeline, CRM management
3. **Pulse** — Research synthesis, trend intelligence, brief generation
4. **Detective Niessen** — Security audits, system health, cron monitoring
5. **OLG** — Content writing, voice consistency, narrative structure (registered 2026-03-10)
6. **Bob the Builder** — Technical builds, automation, integrations (registered 2026-03-10)

**CRITICAL RULE: No agent spawning without active task.**

| Agent | Spawns Only When | Example Active Task | Rest State |
|-------|-----------------|-------------------|-----------|
| **OLG** | Content writing needed | "Write a 800-word long-form article on [topic] in Bryan's voice" | ❌ Retired |
| **Bob** | Build/automation needed | "Build an API integration between [X] and [Y]" | ❌ Retired |
| **Hunter** | Research needed | "Find 15 Ops Leaders in [state] + load to CRM" | ❌ Retired |
| **Pulse** | Intel brief needed | "Research [topic] + generate 5 signals with sources" | ❌ Retired |
| **Niessen** | Security audit needed | Daily cron (2 AM) — monitoring system health | ✅ Active (cron-driven) |

**Atlas Never Impersonates:**
- ❌ NEVER write as "Olg" or claim to be OLG
- ❌ NEVER write as "Bob" or claim to be Bob the Builder
- ❌ NEVER write code and credit it to Bob
- ❌ NEVER write content and claim it's from OLG
- ✅ DO reference them: "OLG will write this" or "Bob can build this"
- ✅ DO spawn them for active tasks only
- ✅ DO retire them when task completes

### Agent Production-Readiness Checklist

**Before using any agent for the first time, complete this checklist:**
- [ ] Agent has SOUL.md in workspace
- [ ] Agent has IDENTITY.md in workspace
- [ ] Agent is registered in `agents.list` in gateway config
- [ ] Agent has model specified (or uses default)
- [ ] Agent has tools assigned (alsoAllow list)
- [ ] Test spawn: Confirm identity in output
- [ ] Test spawn: Verify SOUL.md + IDENTITY.md were read
- [ ] Test spawn: Verify auto-write to MEMORY.md occurred

**If any box unchecked → agent cannot be used.**

### CRITICAL: Test Run Before Production Use

**CRITICAL: No subagent is production-ready until both requirements are verified in a test run.**

### Requirement 1: Load Own Identity Config
Every spawned subagent MUST load its own SOUL.md and IDENTITY.md at session start.

**Proof Required:**
- Session history shows `read` calls on agent's SOUL.md and IDENTITY.md
- Agent confirms in output: "I loaded my SOUL.md (state core principle)" and "I loaded my IDENTITY.md (state role)"
- Agent is NOT generic/Atlas-like, but personality-specific

**Test:**
- Spawn agent with task that asks it to confirm identity
- Check session_history for read calls + confirmation text
- If confirmation missing, agent failed identity test → do not use

**Example (Pulse):**
```
Session shows: read → /agents/pulse/SOUL.md ✅
Session shows: read → /agents/pulse/IDENTITY.md ✅
Agent states: "I am Pulse. My core principle: Speed is the advantage" ✅
```

### Requirement 2: Auto-Write to Own MEMORY.md
Every spawned subagent MUST write to its own MEMORY.md at session end automatically.

**Proof Required:**
- Session history shows `write` or `edit` call to agent's MEMORY.md
- File timestamp updated to session end time
- One row added to appropriate table (no data loss, no overwrites)
- Agent worked independently — Atlas did NOT manually log for agent

**Test:**
- Spawn agent with task that produces loggable output
- Specify: "Update your MEMORY.md with: [format]"
- Check session_history for write/edit calls to MEMORY.md
- Verify file was actually modified (stat + tail the file)
- If no write call, auto-save hook failed → fix before spawning other agents

**Example (Pulse):**
```
Session shows: write → /agents/pulse/MEMORY.md ✅
File mod time: 2026-03-06T12:00:23Z (matches session end) ✅
File tail shows new row added: | cannabis regulations | Dime | 2026-03-06 | ... | ✅
```

### Production Readiness Checklist
- [ ] Agent loads own SOUL.md (verified in session history)
- [ ] Agent loads own IDENTITY.md (verified in session history)
- [ ] Agent confirms identity in output
- [ ] Agent auto-writes to own MEMORY.md (verified in session history)
- [ ] MEMORY.md file actually modified (stat the file)
- [ ] Atlas did NOT manually update MEMORY.md for agent

**If any box is unchecked → agent is NOT production ready.**

### Auto-Save Hook Pattern

See `subagent-autosave-hook.md` in workspace root for implementation details.

**Generic pattern for all agents:**
1. At session end, gather loggable data (what actually happened)
2. Identify the right table in agent's MEMORY.md
3. Append one row: [Date] | [What happened] | [Finding] | [Owner] | [Status]
4. Use `write` or `edit` to append to file (never overwrite existing data)
5. Confirm write succeeded by checking file timestamp

---

## 🔗 CRON JOB MODEL ROUTING (Formalized 2026-03-06)

**All cron job payloads MUST match MODEL_ROUTER.json agent assignments.**

### Routing Rule
- Check `MODEL_ROUTER.json → agent_routing[agent_name].primary_model`
- Use that model in the cron payload (field: `payload.model`)
- If overriding, document reason in cron job name
- No cron can use a model not in `model_availability`

### Current Mappings (Active — Last Updated 2026-03-06)
| Cron | Day | Agent | Model | Reason |
|---|---|---|---|---|
| Pulse Daily Intel | Weekday 6 AM | pulse | `google/gemini-2.5-flash` | Web search + synthesis |
| Pulse Weekend Brief | Sat 7 AM | pulse | `google/gemini-2.5-flash` | Same as weekday (synthesis) |
| Pulse Weekend Brief | Sun 7 AM | pulse | `google/gemini-2.5-flash` | Same as weekday (synthesis) |
| Daily Brief Format & Send | Weekday 6:15 AM | atlas | `claude-haiku-4-5-20251001` | Lightweight formatting |
| Saturday Brief Format & Send | Sat 7:15 AM | atlas | `claude-haiku-4-5-20251001` | Same as weekday (formatting) |
| Sunday Brief Format & Send | Sun 7:15 AM | atlas | `claude-haiku-4-5-20251001` | Same as weekday (formatting) |
| Morning Brief | Weekday 8 AM | atlas | `claude-sonnet-4-20250514` | Synthesis + prioritization |
| YouTube Content Catalog | Daily 11 PM | atlas | `claude-haiku-4-5-20251001` | Lightweight cataloging |
| YouTube Content Rating | Tue 10 AM | atlas | `claude-sonnet-4-20250514` | Ramp curve analysis + confidence scoring |
| Friday Founder Load | Fri 11 AM | atlas | `claude-sonnet-4-20250514` | Heavy reasoning + comprehensive analysis |

### The Rule (Non-Negotiable)
1. **Every cron payload MUST specify `model` field**
2. **Model MUST match MODEL_ROUTER.json primary assignment** (or override is documented)
3. **Fallback model listed in router MUST be available** in case primary fails
4. **Atlas verifies routing on cron creation/update** — mismatches will be caught

### Pure Command Tasks Use Shell Scripts (Not Agent Sessions)
**When a cron task is pure command execution (no reasoning/synthesis needed):**
- ❌ Do NOT spawn an agent session
- ✅ DO use a shell script instead
- ✅ Shell scripts live in `/workspace/scripts/`
- ✅ Shell scripts are called from LaunchAgents or git push crons
- ✅ Results logged to FILE_AUDIT_LOG.jsonl + TOKEN_USAGE.jsonl

**Example:**
- GitHub push → use `/scripts/git-push.sh` (not agent)
- Token logging → use `/scripts/log-tokens.sh` (not agent)
- File copy/sync → use shell script (not agent)
- Research → use agent (requires synthesis)

### Token Logging for All Cron Runs
**Every cron job MUST log token usage to TOKEN_USAGE.jsonl at session end.**

**Pattern:**
- Agent completes task
- Agent reads its own session token usage (if available)
- Agent or wrapper script calls: `bash /workspace/scripts/log-tokens.sh "<timestamp>" "<model>" "<agent>" "<task_ref>" <input_tokens> <output_tokens> <total_tokens> "[category]"`
- Log entry appended to TOKEN_USAGE.jsonl

**Agent Instruction (add to cron payloads):**
```
At session end, log token usage:
bash /workspace/scripts/log-tokens.sh "$(date -u +\"%Y-%m-%dT%H:%M:%SZ\")" "MODEL_HERE" "AGENT_HERE" "TASK_REF" INPUT OUTPUT TOTAL "category"

Example for Pulse Daily Intel:
bash /workspace/scripts/log-tokens.sh "$(date -u +\"%Y-%m-%dT%H:%M:%SZ\")" "google/gemini-2.5-flash" "pulse" "daily-intel-6am" 0 0 0 "research"
(Note: Agent must fill in actual token counts from its session)
```

**TOKEN_USAGE.jsonl Schema:**
```json
{
  "timestamp": "2026-03-06T06:15:00Z",
  "model": "google/gemini-2.5-flash",
  "agent": "pulse",
  "task_ref": "daily-intel-6am",
  "input_tokens": 8500,
  "output_tokens": 12300,
  "total_tokens": 20800,
  "category": "research"
}
```

**No exceptions. Every cron run = one TOKEN_USAGE.jsonl entry.**

---

## 🔗 LINKEDIN CONNECTIONS PROCESSING WORKFLOW (Formalized 2026-03-10)

**For processing bulk LinkedIn connections (250+ contacts) into Newton CRM:**

### Overview
LinkedIn connections are warm prospects but require classification before outreach. Automated keyword matching catches 80% of extraction-relevant contacts. Deep research verification catches misclassifications (Charlotte's Web example: correctly should be extraction-focused, not non-relevant).

### Two-Phase Workflow

**Phase 1: Automated Categorization**
- Run connections CSV through keyword extraction filter
- Bucket into: "Added to Prospects" (high confidence), "Verify Extraction Focus" (unsure), "Not Relevant" (low score)
- Create marked CSV with "CRM Status" column for all contacts

**Phase 2: Hunter Deep Research Verification**
- Research 100% of "Verify Extraction Focus" contacts (company + role extraction verification)
- Spot-check "Not Relevant" for hidden extraction operations (equipment, compliance, lab, infusion, processing)
- Reclassify any mismatches (e.g., Charlotte's Web found in "Not Relevant" → reclassify to "Added to Prospects")
- Update CRM Status column with verified categorization
- Output: "Connections_Linkedin_v2_VERIFIED.csv"

### Hunter's Verification Checklist (Per Contact)

For each "Verify" or spot-check contact:

1. **Company Search** — Google, LinkedIn, website
   - Does company do extraction? (Explicit: yes/no/unclear)
   - Facility count + locations
   - Product lines (concentrates, edibles, rosin, distillate, etc.)
   
2. **Role Assessment** — LinkedIn title + description
   - Is role extraction-aligned? (Lab, QA, Compliance, Production, Extraction Lab Manager, etc.)
   - Or is role commercial/advisory/adjacent?
   - Implicit extraction? (VP Operations for extraction-confirmed company = likely relevant)

3. **Decision** — Update CRM Status
   - ✅ **Added to Prospects** = Company + Role BOTH extraction-confirmed → Add to Newton CRM Prospects (status: "Warm - LinkedIn Connection")
   - ❓ **Verify Extraction Focus** = Company extracts but role unclear OR role is extraction-adjacent but company unclear → Keep for future research
   - ❌ **Not Relevant** = Confirmed non-extraction → Archive

### Files & Outputs

| File | Purpose | Owner | Format |
|---|---|---|---|
| `Connections_Linkedin_v2.csv` | Raw input (2,348 contacts) | User | CSV |
| `Connections_Linkedin_v2_MARKED.csv` | Phase 1 output (automated categorization) | Atlas | CSV + "CRM Status" column |
| `Connections_Linkedin_v2_VERIFIED.csv` | Phase 2 output (Hunter verified) | Hunter | CSV + "CRM Status" column |
| Newton CRM "Prospects" | Final destination | Hunter | Google Sheet |

### Metrics (Phase 2 Expected Results)

Based on 2,348 contacts:
- **Before verification:** ~50-70 extraction-focused (automated keyword filter)
- **After verification:** ~150-200 extraction-focused (Hunter catches misclassifications)
- **Reclassified from "Not Relevant":** ~30-50 ("Charlotte's Web" type catches)
- **Verify (kept pending):** ~50-100 (company extracts, role unclear)

### Integration with Newton CRM

Once verified:
1. Add all "Added to Prospects" contacts to Newton CRM Prospects sheet
   - Status: "Warm - LinkedIn Connection"
   - Columns: Name | Company | Role | Email | LinkedIn URL | Phone | State | ICP Match | Status | Notes | LinkedIn Verified
2. Create "Verify Extraction Focus" tab in Newton CRM
   - For 58-100 uncertain contacts (need additional research or follow-up)
   - Columns: Name | Company | Role | Email | LinkedIn URL | Verify Type | Status | Notes
3. Create "Non-Relevant Archive" tab
   - For 2,000+ confirmed non-extraction contacts
   - For reference/deduplication only (no action)

### When to Run This Workflow

- **Trigger:** User provides bulk LinkedIn connections list (250+ contacts)
- **Phase 1:** Atlas runs automated categorization (minutes)
- **Phase 2:** Hunter spawned for deep research (hours, depending on volume)
- **Timeline:** Phase 1 + 2 typically 1-4 hours for 2,000+ contacts

---

## Protocol Failures

- Missing any step = protocol failure
- Bryan will call it out
- Log the failure, fix it, do not repeat it

---

## 📁 FILE CREATION PROTOCOL (Added 2026-03-12)

**Every time a new workspace file is created, Atlas must:**

1. Create the file in the root workspace (`/Users/atlasnorth/.openclaw/workspace/`)
2. **Immediately add the filename to the sync script** (`scripts/sync-memory.sh` copy list)
3. Copy the file to `mission-control-dashboard/data/vault/` so MC shows it immediately
4. Commit + push to GitHub

**No exceptions.** If a file is created but not added to the sync script, Mission Control will never show it and Bryan's edits will be lost on the next 30-min sync overwrite.

**MC Edit Flow (when Bryan edits on Mission Control):**
1. Bryan edits file on MC → saves → auto-pushes to GitHub
2. Bryan tells Atlas: "pull MC changes"
3. Atlas pulls + copies `mission-control-dashboard/data/vault/<file>` → root
4. Next 30-min sync keeps MC current going forward

## 📊 MODEL CALL RUNTIME LOGGING (Active 2026-03-12)

**Every model call is logged to MODEL_CALL_LOG.jsonl with:**
- Timestamp + Unix milliseconds
- Agent name + model used
- **Prompt tokens + completion tokens consumed**
- **Fallback triggered? Yes/No + reason**
- **Task source: cron | manual | agent_loop**
- Duration (ms) + cost (USD)
- Context utilization %

**Aggregated Reports (Updated Every 30 Minutes):**
- `/reports/model-calls/summary-24h.json` — Total calls, tokens, cost, fallback rate
- `/reports/model-calls/by-agent-7d.json` — Cost breakdown by agent
- `/reports/model-calls/by-source-7d.json` — Breakdown by task source type
- `/reports/model-calls/fallback-analysis-7d.json` — Fallback patterns + reasons

**Diagnostic Queries:**
See `MODEL_CALL_LOG_GUIDE.md` for 10 common queries (wrong model, cost anomalies, fallback cascades, etc.)

**When a job uses wrong model:** Check `model_used` vs `model_routing.primary_assigned` in log. If different and `fallback_triggered == false` → immediate investigation required.
