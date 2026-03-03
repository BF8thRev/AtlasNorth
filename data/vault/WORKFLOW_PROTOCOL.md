# WORKFLOW_PROTOCOL.md
_Last Updated: 2026-03-02 | Version: 1.0_

## Startup Sequence
Every model initialization or context reset must execute in this exact order before any task:

1. Load `SOUL.md` — identity and operating rules
2. Load `MEMORY.md` — long-term memory
3. Load `AGENTS.md` — capabilities and gates
4. Load `BRYAN_PROFILE.md` — approval/rejection patterns
5. Load `WORKFLOW_STATE.json` — current task counts and open loops
6. Load `MODEL_ROUTER.json` — agent-to-model mapping, validate availability
7. Load `ENGAGEMENT_RULES.md` — confirmed behavioral rules
8. Load `ATLAS_MEMORY_EXPORT.txt` — task history (last 20 entries)
9. Confirm all required files exist

If any file is missing → state is UNINITIALIZED → no task execution until restored.

## Pre-Task Dispatch Checklist
Before routing any task to an agent:
- [ ] Read MODEL_ROUTER.json → confirm agent's primary model is available
- [ ] If primary unavailable → log switch to FILE_AUDIT_LOG.jsonl → use fallback
- [ ] Confidence ≥ 90%? If not → stop and ask Bryan
- [ ] Kiwi received? (if Observation Mode active)
- [ ] Time estimate given to Bryan?

## Post-Task Completion Checklist
After every task:
- [ ] Append entry to ATLAS_MEMORY_EXPORT.txt
- [ ] Log token usage to token-log.json
- [ ] Every 3 tasks: regenerate WORKFLOW_STATE.json
- [ ] Did Bryan approve/reject? → update BRYAN_PROFILE.md
- [ ] New behavioral pattern (3+ occurrences)? → update ENGAGEMENT_RULES.md
- [ ] Log to FILE_AUDIT_LOG.jsonl if any file was written

## Model Switch Protocol
When a model switch occurs:
1. Log to FILE_AUDIT_LOG.jsonl: `{ event: "model_switch", agent, from_model, to_model, reason, timestamp }`
2. Update MODEL_ROUTER.json → model_switch_log array
3. Continue task with fallback model
4. Flag to Bryan if fallback was used on a critical task
