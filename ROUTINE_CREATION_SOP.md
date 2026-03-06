# ROUTINE CREATION SOP — Mandatory Procedures
**Set:** 2026-03-05  
**Updated:** 2026-03-05  
**Owner:** Atlas

---

## Rule: All New Routines Are Born in Mission Control

**EVERY routine created in cron must immediately be registered in MISSION_CONTROL_ROUTINES.json with:**

| Field | Value |
|-------|-------|
| `id` | Unique slug (e.g., `pulse-daily-intel-6am`) |
| `name` | Human-readable name |
| `phase` | `Researcher` or `Director` or `Admin` |
| `owner` | Agent name (Pulse, Atlas, Hunter, etc.) |
| `schedule` | Cron expression |
| `timezone` | America/New_York (default) |
| `cronJobId` | Copy from cron job response |
| `outputFile` / `inputFile` | File paths if applicable |
| `delivery` | Channel/recipient if output-phase |
| `status` | `active`, `pending`, or `error` |
| `lastRun` | Timestamp (null initially) |
| `nextRun` | Calculated timestamp |
| `createdAt` | Registration timestamp |

---

## Architecture Mandates

### 1. Researcher/Director Split
**REQUIRED.** Every routine splits into two phases:

- **Researcher:** Research, gather, write output to file. No delivery. No agent distribution.
- **Director:** Read file, format, send, sync, report.

**Why:** Decouples logic from delivery. Errors in research don't break distribution. Allows solo testing.

### 2. Timeout Defaults (no exceptions)
- Researcher phases: **300 seconds** (5 min for web research)
- Director phases: **120 seconds** (format + send is fast)
- GitHub sync: **300 seconds** (no rush on push)

### 3. Output File Naming Convention
**Pattern:** `[AGENT]_[ROUTINE]_OUTPUT.md`

Examples:
- `PULSE_DAILY_OUTPUT.md` (research output)
- `PULSE_WEEKEND_SAT_OUTPUT.md` (Saturday brief)
- `HUNTER_PROSPECT_ANALYSIS_OUTPUT.md` (Hunter research)

---

## Workflow: Creating a New Routine

### Step 1: Write the Spec
Create a file in `/workspace`: `[ROUTINE]_SPEC.md`  
Include: purpose, search strategy, output format, tone, delivery rules.

### Step 2: Create Researcher Cron Job
Use `cron add` with:
- `sessionTarget: isolated`
- `payload.kind: agentTurn`
- `timeoutSeconds: 300`
- **Output path:** `/Users/atlasnorth/.openclaw/workspace/[AGENT]_[ROUTINE]_OUTPUT.md`
- **Delivery:** `none` (no WhatsApp, no distribution)

### Step 3: Create Director Cron Job
Use `cron add` with:
- Scheduled **15 minutes after** Researcher job
- `sessionTarget: isolated`
- `payload.kind: agentTurn`
- `timeoutSeconds: 120`
- **Input path:** Same output file from Researcher
- **Delivery:** `announce` (sends WhatsApp + reports)

### Step 4: Register in MISSION_CONTROL_ROUTINES.json
Add entry for both Researcher and Director jobs.
Include all fields from the table above.

### Step 5: Test (STANDING_INSTRUCTIONS.md)
Run both jobs manually before first automatic run.

### Step 6: Document
Add rule to the routine's SPEC.md:
> "All instances of [ROUTINE] are governed by the Researcher/Director split defined in ROUTINE_CREATION_SOP.md and registered in MISSION_CONTROL_ROUTINES.json."

---

## Current Active Routines
See: MISSION_CONTROL_ROUTINES.json

All routines follow this SOP. No exceptions.

---

## Escalation
If a routine fails:
1. Check cron job status: `cron list`
2. Check output file: Does it exist? Is it populated?
3. If Researcher fails → Director doesn't run (15-min delay prevents it)
4. If Director fails → GitHub sync still runs (separate job)
5. Alert: Report to Bryan immediately if any routine misses a run.

---

## Notes
- This SOP is mandatory for all new cron jobs in this workspace.
- If you see a cron job without Mission Control registration, escalate.
- Researcher/Director split is not optional — it's the architecture pattern.
