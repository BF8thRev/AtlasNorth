# MODEL_CALL_LOG — Usage Guide

## Quick Start

Every model call is logged to `MODEL_CALL_LOG.jsonl` with complete metadata:
- Timestamp + Unix epoch
- Agent name + model used
- **Prompt tokens** + **completion tokens**
- **Fallback triggered?** + fallback reason
- **Task source** (cron | manual | agent_loop)
- Duration + cost

## Real-Time Metrics (Updated Every 30 min)

```bash
cat /Users/atlasnorth/.openclaw/workspace/reports/model-calls/summary-24h.json
```

Shows:
- Total calls (last 24h)
- Total tokens + cost
- Fallback rate

## Common Queries

### 1. Find Which Job Used Wrong Model

**Problem:** "Sonnet ran instead of Haiku at 8 AM Saturday"

```bash
jq 'select(
  .task_source == "cron" and 
  .model_used != .model_routing.primary_assigned
)' MODEL_CALL_LOG.jsonl | \
jq '{
  timestamp,
  task_name,
  primary_assigned: .model_routing.primary_assigned,
  model_used,
  fallback_triggered: .model_routing.fallback_triggered,
  reason: .model_routing.fallback_reason
}'
```

### 2. Cost by Agent (Last 7 Days)

```bash
cat /Users/atlasnorth/.openclaw/workspace/reports/model-calls/by-agent-7d.json
```

Output:
```json
[
  {
    "agent": "atlas",
    "calls": 150,
    "total_tokens": 385420,
    "total_cost": 2.15,
    "avg_duration_ms": 1247
  },
  ...
]
```

### 3. Task Source Breakdown (Last 7 Days)

```bash
cat /Users/atlasnorth/.openclaw/workspace/reports/model-calls/by-source-7d.json
```

Shows cost distribution:
- `cron` — scheduled jobs
- `manual` — direct commands
- `agent_loop` — sub-agent spawning

### 4. Fallback Analysis (Last 7 Days)

```bash
cat /Users/atlasnorth/.openclaw/workspace/reports/model-calls/fallback-analysis-7d.json
```

Shows which models triggered fallbacks and why:
- Rate limit
- API error
- Timeout
- Context too large

### 5. All Fallbacks in Last 24h

```bash
jq 'select(
  .timestamp > "'$(date -u -d '24 hours ago' +%Y-%m-%dT%H:%M:%SZ)'" and
  .model_routing.fallback_triggered == true
)' MODEL_CALL_LOG.jsonl | \
jq '{
  timestamp,
  agent,
  primary_assigned: .model_routing.primary_assigned,
  fallback_used: .model_routing.fallback_model,
  reason: .model_routing.fallback_reason,
  tokens: .tokens.total,
  cost: .cost.total_cost_usd
}'
```

### 6. Slowest Calls (Top 10, Last 7 Days)

```bash
jq 'select(.timestamp > "'$(date -u -d '7 days ago' +%Y-%m-%dT%H:%M:%SZ)'")' \
  MODEL_CALL_LOG.jsonl | \
jq -s 'sort_by(-.performance.duration_ms) | .[0:10] | map({
  task: .task_name,
  agent: .agent,
  duration_ms: .performance.duration_ms,
  tokens: .tokens.total,
  status: .performance.status
})'
```

### 7. Most Expensive Calls (Top 10, Last 7 Days)

```bash
jq 'select(.timestamp > "'$(date -u -d '7 days ago' +%Y-%m-%dT%H:%M:%SZ)'")' \
  MODEL_CALL_LOG.jsonl | \
jq -s 'sort_by(-.cost.total_cost_usd) | .[0:10] | map({
  timestamp,
  agent,
  model_used,
  completion_tokens: .tokens.completion,
  cost_usd: .cost.total_cost_usd
})'
```

### 8. Context Utilization (Which Calls Used Most Context?)

```bash
jq 'select(.timestamp > "'$(date -u -d '7 days ago' +%Y-%m-%dT%H:%M:%SZ)'")' \
  MODEL_CALL_LOG.jsonl | \
jq -s 'sort_by(-.metadata.context_utilization_pct) | .[0:20] | map({
  task: .task_name,
  context_pct: .metadata.context_utilization_pct,
  tokens_used: .metadata.context_tokens_used,
  model: .model_used
})'
```

### 9. Error Calls (Last 24h)

```bash
jq 'select(
  .timestamp > "'$(date -u -d '24 hours ago' +%Y-%m-%dT%H:%M:%SZ)'" and
  .performance.status != "ok"
)' MODEL_CALL_LOG.jsonl | \
jq '{timestamp, agent, task_name, status: .performance.status, error: .performance.error_msg}'
```

### 10. Cron Job Performance (Which Job Uses Most Tokens?)

```bash
jq 'select(.task_source == "cron")' MODEL_CALL_LOG.jsonl | \
jq -s 'group_by(.task_name) | map({
  job: .[0].task_name,
  calls: length,
  avg_tokens: (map(.tokens.total) | add / length),
  total_cost: (map(.cost.total_cost_usd) | add)
}) | sort_by(-.total_cost) | .[0:10]'
```

## Integration with Decision-Making

### Is a Job Using Wrong Model?

Check `model_used` vs `model_routing.primary_assigned`:
- If **different** and `fallback_triggered == true` → Expected (fallback activated)
- If **different** and `fallback_triggered == false` → **BUG** (needs investigation)

### Is a Fallback Cascading?

Check `model_routing.chain` array:
- `["claude-sonnet-4-6", "claude-haiku", "phi-4-mini"]` = fallback chain
- If length > 1, a fallback was triggered

### Cost Anomalies

If a cron job suddenly costs 10x more:
1. Check `tokens.prompt` — context blew up?
2. Check `fallback_triggered` — switched to Sonnet?
3. Check `performance.status` — retries?
4. Check `metadata.context_utilization_pct` — approaching limit?

## Retention Policy

- **Live log:** Current 30 days
- **Archive:** Monthly snapshots (90-day retention)
- **Delete:** >90 days
- **Cost tracking:** Forever (summary row per month)

## Next Steps

1. **Enable in gateway config** — Middleware to capture each call
2. **Hook into OpenClaw responses** — Extract usage data
3. **Set up alerts** — Flag if fallback rate > 10% or cost > $10/day
4. **Dashboard** — Graph costs/tokens/fallbacks over time
