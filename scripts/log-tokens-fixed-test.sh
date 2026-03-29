#!/bin/bash
# log-tokens-fixed.sh — Fixed token logging script that pulls from OpenClaw session data
# Usage: bash log-tokens-fixed.sh [session_key] [custom_task_ref]
# If no session_key provided, extracts all recent cron sessions

WORKSPACE="/Users/atlasnorth/.openclaw/workspace"
LOGFILE="$WORKSPACE/TOKEN_USAGE.jsonl"
SESSION_KEY="$1"
CUSTOM_TASK_REF="$2"

# Function to log a single session
log_session() {
  local session_json="$1"
  local task_ref="$2"
  
  # Extract session data using jq
  local timestamp=$(echo "$session_json" | jq -r '.updatedAt / 1000 | strftime("%Y-%m-%dT%H:%M:%SZ")')
  local model=$(echo "$session_json" | jq -r '(.modelProvider + "/" + .model) // "unknown"')
  local agent=$(echo "$session_json" | jq -r '.agentId')
  local input_tokens=$(echo "$session_json" | jq -r '.inputTokens // 0')
  local output_tokens=$(echo "$session_json" | jq -r '.outputTokens // 0')
  local total_tokens=$(echo "$session_json" | jq -r '.totalTokens // 0')
  
  # Determine category and task_ref if not provided
  if [ -z "$task_ref" ]; then
    local key=$(echo "$session_json" | jq -r '.key')
    if [[ "$key" == *"cron:"* ]]; then
      task_ref=$(echo "$key" | sed -E 's/.*cron:([^:]+).*/\1/')
      category="cron"
    elif [[ "$key" == *"subagent:"* ]]; then
      task_ref="subagent"
      category="subagent"
    else
      task_ref="interactive"
      category="interactive"
    fi
  else
    category="manual"
  fi
  
  # Skip if no token usage
  if [ "$total_tokens" = "0" ] || [ "$total_tokens" = "null" ]; then
    return
  fi
  
  # Create JSON entry
  local json_entry=$(jq -n \
    --arg timestamp "$timestamp" \
    --arg model "$model" \
    --arg agent "$agent" \
    --arg task_ref "$task_ref" \
    --argjson input_tokens "$input_tokens" \
    --argjson output_tokens "$output_tokens" \
    --argjson total_tokens "$total_tokens" \
    --arg category "$category" \
    '{
      timestamp: $timestamp,
      model: $model, 
      agent: $agent,
      task_ref: $task_ref,
      input_tokens: $input_tokens,
      output_tokens: $output_tokens,
      total_tokens: $total_tokens,
      category: $category
    }')
  
  # Append to JSONL file
  echo "$json_entry" >> "$LOGFILE"
  
  echo "[$(date -u +"%Y-%m-%dT%H:%M:%SZ")] Logged: $agent | $model | $task_ref | $total_tokens tokens"
}

# If specific session key provided, log that session
if [ -n "$SESSION_KEY" ]; then
  sessions_json=$(openclaw sessions --json --all-agents --active 60)
  session=$(echo "$sessions_json" | jq --arg key "$SESSION_KEY" '.sessions[] | select(.key == $key)')
  
  if [ -n "$session" ] && [ "$session" != "null" ]; then
    log_session "$session" "$CUSTOM_TASK_REF"
  else
    echo "Error: Session key '$SESSION_KEY' not found" >&2
    exit 1
  fi
else
  # Extract all recent cron sessions with token usage
  sessions_json=$(openclaw sessions --json --all-agents --active 120)
  echo "$sessions_json" | jq -c '.sessions[]? | select(.totalTokens != null and .totalTokens > 0 and (.key | contains("cron:")))' | while read -r session; do
    log_session "$session"
  done
fi