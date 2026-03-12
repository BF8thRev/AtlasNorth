# MODEL_CALL_LOG Schema — v1.0

## Purpose
Capture every model call with complete metadata for performance analysis, cost tracking, and fallback diagnostics.

## Log Location
`/Users/atlasnorth/.openclaw/workspace/MODEL_CALL_LOG.jsonl`

Append-only. One JSON object per line. Indexed by timestamp.

## Schema

```json
{
  "timestamp": "2026-03-12T14:30:45.123Z",
  "unix_ms": 1773549045123,
  
  "agent": "atlas",
  "model_used": "claude-haiku-4-5-20251001",
  "model_type": "api",
  
  "task_source": "cron",
  "task_id": "b36866aa-77fd-4a37-8c3d-9b0a17b3acc3",
  "task_name": "Pulse Weekend Brief — Saturday 7 AM EST (Research Only)",
  "cron_schedule": "0 7 * * 6",
  
  "tokens": {
    "prompt": 2150,
    "completion": 1420,
    "total": 3570,
    "cached_read": 0
  },
  
  "model_routing": {
    "primary_assigned": "google/gemini-2.5-flash",
    "fallback_triggered": false,
    "fallback_model": null,
    "fallback_reason": null,
    "chain": ["google/gemini-2.5-flash"]
  },
  
  "performance": {
    "duration_ms": 2847,
    "tokens_per_second": 1.25,
    "status": "ok"
  },
  
  "cost": {
    "input_cost_usd": 0.000215,
    "output_cost_usd": 0.001704,
    "total_cost_usd": 0.001919
  },
  
  "metadata": {
    "session_key": "agent:atlas:cron:b36866aa",
    "context_tokens_used": 2150,
    "context_limit": 128000,
    "context_utilization_pct": 1.68,
    "stop_reason": "stop"
  }
}
```

## Fields Explained

| Field | Type | Source | Purpose |
|-------|------|--------|---------|
| `timestamp` | ISO-8601 | Runtime | When call executed |
| `unix_ms` | Integer | Runtime | Millisecond epoch (for fast range queries) |
| `agent` | String | Task config | Which agent ran this |
| `model_used` | String | Gateway response | Actual model that executed |
| `model_type` | String | MODEL_ROUTER | api \| local |
| `task_source` | String | Task payload | cron \| manual \| agent_loop |
| `task_id` | String | Cron job \| Session | Unique ID for this task run |
| `task_name` | String | Cron config | Human-readable task name |
| `cron_schedule` | String | Cron config | Schedule expression (if cron) |
| `tokens.prompt` | Integer | Gateway response | Input tokens consumed |
| `tokens.completion` | Integer | Gateway response | Output tokens generated |
| `tokens.cached_read` | Integer | Gateway response | Cached tokens (if any) |
| `model_routing.primary_assigned` | String | MODEL_ROUTER | Model config said to use |
| `model_routing.fallback_triggered` | Boolean | Gateway | Did fallback activate? |
| `model_routing.fallback_model` | String | Gateway | Which fallback was used |
| `model_routing.fallback_reason` | String | Gateway | Why fallback was triggered |
| `model_routing.chain` | Array | Gateway | Sequence of models tried |
| `performance.duration_ms` | Integer | Gateway | Time to complete |
| `performance.tokens_per_second` | Float | Calculated | Throughput metric |
| `performance.status` | String | Gateway | ok \| error \| timeout |
| `cost.input_cost_usd` | Float | Billing | $ per prompt tokens |
| `cost.output_cost_usd` | Float | Billing | $ per completion tokens |
| `cost.total_cost_usd` | Float | Calculated | Full cost of call |
| `metadata.session_key` | String | OpenClaw | Session identifier |
| `metadata.context_tokens_used` | Integer | Gateway | Tokens in system+user context |
| `metadata.context_limit` | Integer | MODEL_ROUTER | Max tokens for model |
| `metadata.context_utilization_pct` | Float | Calculated | % of context used |
| `metadata.stop_reason` | String | Gateway | How completion stopped |

## Querying Examples

**All calls in last 24 hours:**
```bash
jq 'select(.timestamp > "2026-03-11T14:30Z")' MODEL_CALL_LOG.jsonl
```

**All fallback triggers:**
```bash
jq 'select(.model_routing.fallback_triggered == true)' MODEL_CALL_LOG.jsonl
```

**Cost by agent, last 7 days:**
```bash
jq '[select(.timestamp > "2026-03-05T14:30Z") | {agent, cost: .cost.total_cost_usd}] | group_by(.agent) | map({agent: .[0].agent, total_cost: map(.cost) | add})'  MODEL_CALL_LOG.jsonl
```

**Cron tasks using wrong model:**
```bash
jq 'select(.task_source == "cron" and .model_used != .model_routing.primary_assigned)' MODEL_CALL_LOG.jsonl
```

## Integration Points

1. **Gateway middleware** — Capture every response + metadata
2. **Cron job config** — Add task_source + task_id + task_name
3. **MODEL_ROUTER** — Add logging directive + cost model
4. **FILE_AUDIT_LOG** — Cross-reference for context events
5. **Dashboard** — Query for cost/perf analysis

## Retention
Keep full logs for 90 days. Archive older logs monthly.
