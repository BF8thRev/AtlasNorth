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

**See:** memory/dime/DIME_EPISODE_SOP.md

**See:** memory/dime/YOUTUBE_CONTENT_PIPELINE.md

**See:** memory/newton/NEWTON_INSIGHTS_SOP.md

**See:** memory/newton/NEWTON_COLD_EMAIL_CAMPAIGN_SOP.md

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

**See:** memory/newton/LINKEDIN_PROCESSING_SOP.md

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

---

## 🔄 MEMORY ROTATION PROTOCOL (Formalized 2026-03-13)

**Goal:** Keep MEMORY.md lean and focused on active context only. Archives preserve history; rotation happens automatically at midnight EST daily.

### How It Works

**Every day at midnight EST:**
- Current MEMORY.md is archived to `memory/MEMORY_MM-DD-YY.md` (yesterday's date)
- Lines prefixed with `STICKY:` are extracted and carried forward into fresh MEMORY.md
- New MEMORY.md is created with today's date header, sticky section, and empty "Today's Context" section
- Cron job: `/Users/atlasnorth/.openclaw/scripts/rotate-memory.sh`
- Idempotent: skips if archive already exists (no double-rotation)

### STICKY: Prefix Rules

**When to use `STICKY:`**
- Active blockers (multi-day, unresolved)
- In-progress work that spans multiple days (e.g., "Micah Anderson Newton pitch — PENDING SEND")
- Pending outreach or decisions awaiting response
- Infrastructure work in progress (e.g., "Cron job audit — 50% complete, remainder pending")

**Format:**
```
STICKY: [Brief description] — [Status] — [Next action]
STICKY: Micah Anderson Newton pitch — Ready to send — Ask Bryan for approval
STICKY: Cron agent ownership — 50% fixes applied — Fix GitHub push jobs next
```

**Max limit:** 10 sticky lines at any time
- If more than 10: consolidate, combine related items, or remove resolved ones
- Force yourself to triage ruthlessly

**Cleanup:**
- Once resolved: Remove the `STICKY:` prefix immediately
- Don't wait until rotation; keep the file clean
- Add a one-line entry to "Today's Context" to document the resolution

### Archive Files (memory/MEMORY_MM-DD-YY.md)

**Read-only. Never modify archives.**
- Preserved for historical reference only
- Automatically created, never manually edited
- Can be reviewed on demand to understand past context or decisions
- Never auto-loaded by heartbeat or agents (on-demand only)
- Naming convention: `MEMORY_MM-DD-YY.md` (e.g., `MEMORY_03-12-26.md`)

### MEMORY.md Timestamp Convention

**All entries in MEMORY.md must include timestamps in EST, MM-DD-YY format**
- ❌ Wrong: "We fixed the cron jobs"
- ✅ Right: "STICKY: Cron audit (03-13-26) — 50% complete"

### Existing Dated Files in memory/

**All existing files in `memory/` (e.g., newton/, longterm_memory.md) stay untouched.**
- Rotation only affects MEMORY.md
- Subdirectories like `memory/newton/`, `memory/dime/` are NOT affected
- Only MEMORY.md follows the rotation protocol

### Rotation Verification

**To verify rotation is working:**
```bash
# Check if script exists and is executable
ls -lh ~/.openclaw/scripts/rotate-memory.sh

# Verify cron job is scheduled
crontab -l | grep rotate-memory

# Check recent log
tail -50 ~/.openclaw/logs/memory-rotation.log

# List archives
ls -lh ~/.openclaw/workspace/memory/MEMORY_*.md
```

### Do NOT Manually Rotate

**Never run `rotate-memory.sh` manually unless instructed.**
- Cron handles it automatically at midnight EST daily
- Manual runs can create duplicate archives
- Let the scheduled job manage the rotation

---
