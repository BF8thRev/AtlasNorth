#!/bin/bash
# extract-token-usage.sh — Extract actual token usage from OpenClaw sessions
# Usage: bash extract-token-usage.sh [hours_back] [output_file]
# Default: 24 hours back, output to stdout

HOURS_BACK="${1:-24}"
OUTPUT_FILE="${2:-}"
WORKSPACE="/Users/atlasnorth/.openclaw/workspace"

# Get sessions data from OpenClaw
SESSIONS_JSON=$(openclaw sessions --json --all-agents --active $((HOURS_BACK * 60)))

if [ $? -ne 0 ]; then
  echo "Error: Failed to get sessions data from OpenClaw" >&2
  exit 1
fi

# Parse and format the data
echo "$SESSIONS_JSON" | jq -r '
.sessions[]? | 
select(.totalTokens != null and .totalTokens > 0) |
{
  timestamp: (.updatedAt / 1000 | strftime("%Y-%m-%dT%H:%M:%SZ")),
  model: ((.modelProvider + "/" + .model) // "unknown"),
  agent: .agentId,
  task_ref: (
    if .key | contains("cron:") then
      (.key | split(":") | .[2:] | join(":") | split(":run:") | .[0])
    elif .key | contains("subagent:") then 
      "subagent"
    elif .key | contains("main") then
      "main-session"
    else
      "direct-session"
    end
  ),
  input_tokens: (.inputTokens // 0),
  output_tokens: (.outputTokens // 0), 
  total_tokens: .totalTokens,
  category: (
    if .key | contains("cron:") then "cron"
    elif .key | contains("subagent:") then "subagent"
    else "interactive"
    end
  )
} | 
@json' | if [ -n "$OUTPUT_FILE" ]; then
  tee "$OUTPUT_FILE"
else
  cat
fi