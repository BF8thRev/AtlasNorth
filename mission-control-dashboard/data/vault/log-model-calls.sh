#!/bin/bash
#
# log-model-calls.sh
# Aggregates and analyzes MODEL_CALL_LOG.jsonl for performance + cost tracking
#
# Run via cron every 30 minutes to generate reports
#

set -e

WORKSPACE="/Users/atlasnorth/.openclaw/workspace"
LOG_FILE="$WORKSPACE/MODEL_CALL_LOG.jsonl"
REPORT_DIR="$WORKSPACE/reports/model-calls"
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

mkdir -p "$REPORT_DIR"

if [ ! -f "$LOG_FILE" ]; then
  echo "[$TIMESTAMP] MODEL_CALL_LOG.jsonl not found. Creating empty log."
  touch "$LOG_FILE"
  exit 0
fi

# Count: total calls in last 24 hours
TOTAL_CALLS=$(jq -s 'map(select(.timestamp > "'$(date -u -d '24 hours ago' +%Y-%m-%dT%H:%M:%SZ)'")) | length' "$LOG_FILE")

# Sum: total tokens (last 24h)
TOTAL_TOKENS=$(jq -s 'map(select(.timestamp > "'$(date -u -d '24 hours ago' +%Y-%m-%dT%H:%M:%SZ)'") | .tokens.total) | add' "$LOG_FILE")

# Sum: total cost (last 24h) 
TOTAL_COST=$(jq -s 'map(select(.timestamp > "'$(date -u -d '24 hours ago' +%Y-%m-%dT%H:%M:%SZ)'") | .cost.total_cost_usd) | add' "$LOG_FILE")

# Count: fallback triggers (last 24h)
FALLBACK_COUNT=$(jq -s 'map(select(.timestamp > "'$(date -u -d '24 hours ago' +%Y-%m-%dT%H:%M:%SZ)'" and .model_routing.fallback_triggered == true)) | length' "$LOG_FILE")

# Group by agent (last 7 days)
jq -s 'map(select(.timestamp > "'$(date -u -d '7 days ago' +%Y-%m-%dT%H:%M:%SZ)'")) | group_by(.agent) | map({agent: .[0].agent, calls: length, total_tokens: map(.tokens.total) | add, total_cost: map(.cost.total_cost_usd) | add, avg_duration_ms: (map(.performance.duration_ms) | add / length)})' "$LOG_FILE" > "$REPORT_DIR/by-agent-7d.json"

# Group by task_source (last 7 days)
jq -s 'map(select(.timestamp > "'$(date -u -d '7 days ago' +%Y-%m-%dT%H:%M:%SZ)'")) | group_by(.task_source) | map({source: .[0].task_source, calls: length, total_cost: map(.cost.total_cost_usd) | add})' "$LOG_FILE" > "$REPORT_DIR/by-source-7d.json"

# Fallback analysis (last 7 days)
jq -s 'map(select(.timestamp > "'$(date -u -d '7 days ago' +%Y-%m-%dT%H:%M:%SZ)'" and .model_routing.fallback_triggered == true)) | group_by(.model_routing.fallback_reason) | map({reason: .[0].model_routing.fallback_reason, count: length, models_tried: map(.model_routing.chain)})' "$LOG_FILE" > "$REPORT_DIR/fallback-analysis-7d.json"

# Real-time summary (last 24h)
cat > "$REPORT_DIR/summary-24h.json" << EOF
{
  "timestamp": "$TIMESTAMP",
  "period": "last_24_hours",
  "total_calls": $TOTAL_CALLS,
  "total_tokens": $TOTAL_TOKENS,
  "total_cost_usd": $TOTAL_COST,
  "fallback_triggers": $FALLBACK_COUNT,
  "fallback_rate_pct": $(echo "scale=2; ($FALLBACK_COUNT / $TOTAL_CALLS) * 100" | bc)
}
EOF

echo "[$TIMESTAMP] Model call logging: $TOTAL_CALLS calls | $TOTAL_TOKENS tokens | \$$TOTAL_COST cost | $FALLBACK_COUNT fallbacks"
