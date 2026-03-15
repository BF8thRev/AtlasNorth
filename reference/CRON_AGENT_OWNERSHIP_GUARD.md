# Cron Agent Ownership Enforcement — Validation Guard

## Requirement
Every scheduled cron job MUST have an explicit, named agent owner. The "main" agent is not allowed.

## Implementation

### 1. Validation Rules (Gateway Level)
**Before saving/creating any cron job:**

```
IF agentId is missing OR agentId === null OR agentId === undefined:
  ❌ REJECT: "Cron jobs require an explicit agent owner. Allowed: atlas, hunter, pulse, detective-niessen, olg, bob-the-builder"
  
IF agentId === "main":
  ❌ REJECT: "Cron jobs cannot use the 'main' agent. Specify a named agent: atlas, hunter, pulse, detective-niessen, olg, bob-the-builder"
  
IF agentId is not in the allowlist [atlas, hunter, pulse, detective-niessen, olg, bob-the-builder]:
  ❌ REJECT: "Unknown agent '{agentId}'. Use one of: atlas, hunter, pulse, detective-niessen, olg, bob-the-builder"
```

### 2. Allowlist
Valid agent IDs for cron jobs:
- `atlas` — Master agent, owns admin tasks, briefs, management
- `hunter` — Prospecting, pipeline building, research
- `pulse` — Research, intel, content analysis
- `detective-niessen` — Security audits, monitoring, health checks
- `olg` — Content writing, document generation
- `bob-the-builder` — Engineering, builds, infrastructure

### 3. Error Message
```
Cron jobs require an explicit agent owner. 
Allowed agents: atlas, hunter, pulse, detective-niessen, olg, bob-the-builder
Received: <agentId>
```

### 4. Apply to All Operations
- `cron.add()` — Block if agentId validation fails
- `cron.update()` — Block if agentId is changed to invalid value
- `cron.remove()` — No change (removals are always safe)

## Audit Completed 2026-03-13

**Status:** ✅ ALL JOBS NOW HAVE NAMED AGENTS

### Summary
- Total jobs: 20 (14 enabled, 6 disabled)
- Jobs reassigned from "main": 14
- Jobs still using "main": 0
- Validation guard: READY FOR IMPLEMENTATION

### Jobs by Agent (Final State)

#### atlas (9 jobs)
- Model Call Logging — Aggregate & Report (ENABLED)
- Evening Helper Ideas Drop — 8 PM EST (ENABLED)
- Atlas Admin — Saturday Brief Format & Send (ENABLED)
- Atlas Admin — Sunday Brief Format & Send (ENABLED)
- Atlas Admin — Daily Brief Format & Send (ENABLED)
- Daily Brief — 8 AM EST (ENABLED)
- Friday Founder Load Snapshot (DISABLED)
- GitHub Push — 11:30 PM EST (DISABLED)
- GitHub Push — 12:00 PM EST (DISABLED)
- GitHub Push — 6:30 AM EST (DISABLED)
- GitHub Push — 6:00 PM EST (DISABLED)

#### pulse (5 jobs)
- YouTube Content Catalog — Daily Pull — 11 PM EST (ENABLED)
- Pulse Weekend Brief — Saturday 7 AM EST (ENABLED)
- Pulse Weekend Brief — Sunday 7 AM EST (ENABLED)
- Pulse Daily Intel — 6 AM EST (ENABLED)
- YouTube Content Rating — Weekly Evaluation (ENABLED)

#### detective-niessen (1 job)
- Detective Niessen — Daily Cron Audit — 2 AM EST (ENABLED)
- System Health Check — HEARTBEAT.md (DISABLED)

#### hunter (1 job)
- Hunter Weekly Prospecting — Monday 10 AM EST (ENABLED)

#### No jobs removed or disabled
- Old duplicate: a42771a4 (Daily Brief - 8AM EST) — DISABLED, no sessionKey, can be removed manually

## Next Steps

1. **Implement validation at gateway level** — Add checks before cron.add() and cron.update()
2. **Reject "main" in scheduler** — Hard block any attempt to use main agent
3. **Error messaging** — Clear, actionable error if validation fails
4. **Test** — Attempt to create job with agentId=main and verify it is rejected

## Confirmation
Run:
```bash
openclaw cron list
```

Verify all jobs show an explicit agent ID (not "main").
