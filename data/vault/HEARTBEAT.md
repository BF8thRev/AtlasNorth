# HEARTBEAT.md
_Last Updated: 2026-03-02_

## Periodic Tasks

### Every 60 seconds — Model Health Check
- Read MODEL_ROUTER.json
- Verify model_availability status for all 3 models
- If any model shows degraded/down → log to FILE_AUDIT_LOG.jsonl
- Update MODEL_ROUTER.json model_availability[model].last_checked timestamp

### Every 30 minutes — Memory Sync
- Run /Users/atlasnorth/.openclaw/workspace/scripts/sync-memory.sh
- Copies workspace files → data/vault/ → pushes to GitHub → Vercel deploys

### Every Friday @ 11am EST — Founder Load Snapshot
- Open Loops: total unresolved, items >7 days old, blocking items
- Tasks to delegate: owner recommendation, time freed
- Revenue items, stuck items, decisions pending
- Ping Bryan via WhatsApp

## Scheduled Cron Jobs (active)
| Job | Schedule | ID |
|-----|----------|----|
| Memory Sync → GitHub → Vercel | Every 30 min | 9ba59fab |

## Model Health Status (updated on check)
| Model | Status | Last Checked |
|-------|--------|-------------|
| claude-opus-4-5-20251101 | ✅ Active | 2026-03-02 |
| claude-sonnet-4-20250514 | ✅ Active | 2026-03-02 |
| phi-4-mini-local | ✅ Active | 2026-03-02 |
