#!/bin/bash
# log-tokens.sh (REPLACEMENT) — Modern token logging using OpenClaw session data
# Usage: 
#   bash log-tokens.sh                           # Log recent cron activity
#   bash log-tokens.sh <cron_id> <task_name>    # Log specific cron by ID
#   bash log-tokens.sh <session_key>             # Log specific session

WORKSPACE="/Users/atlasnorth/.openclaw/workspace"
LOGFILE="$WORKSPACE/TOKEN_USAGE.jsonl"

# Function to map common cron IDs to task names
map_cron_id_to_task() {
  local cron_id="$1"
  case "$cron_id" in
    "0c1977ae-7a94-4a9f-944e-aeeabe94db43") echo "memory-rotation-verify-6am" ;;
    "1bd4a6b6-333e-459f-806d-0ff7bd3eb6f6") echo "admin-brief-daily-615am" ;;
    "95af407a-6760-42d0-9d73-7201775ab5f6") echo "blocker-board-refresh-610am" ;;
    "686887f1-5bbb-4f84-97fa-eafb9de9f74b") echo "daily-intel-6am" ;;
    "77b49d60-a1cd-4d53-b574-732b621c23e7") echo "morning-brief-8am" ;;
    "3fa57eec-62d2-4b92-a82d-5c24c5fece16") echo "admin-brief-sun-715am" ;;
    "a01e8b8a-a007-4b7d-83dc-a4160fafa7a3") echo "security-scan-daily-6am" ;;
    *) echo "$cron_id" ;;
  esac
}

# Function to log a session's token usage
log_session_tokens() {
  local session_key="$1"
  local custom_task_ref="$2"
  
  # Get session data
  local sessions_json=$(openclaw sessions --json --all-agents --active 1440)
  local session=$(echo "$sessions_json" | jq --arg key "$session_key" '.sessions[] | select(.key == $key)')
  
  if [ -z "$session" ] || [ "$session" = "null" ]; then
    echo "Warning: Session '$session_key' not found or has no token data" >&2
    return 1
  fi
  
  # Extract session details
  local timestamp=$(echo "$session" | jq -r '.updatedAt / 1000 | strftime("%Y-%m-%dT%H:%M:%SZ")')
  local model=$(echo "$session" | jq -r '(.modelProvider + "/" + .model) // "unknown"')
  local agent=$(echo "$session" | jq -r '.agentId')
  local input_tokens=$(echo "$session" | jq -r '.inputTokens // 0')
  local output_tokens=$(echo "$session" | jq -r '.outputTokens // 0')
  local total_tokens=$(echo "$session" | jq -r '.totalTokens // 0')
  
  # Skip if no token usage
  if [ "$total_tokens" = "0" ] || [ "$total_tokens" = "null" ]; then
    echo "Warning: Session has no token usage to log" >&2
    return 1
  fi
  
  # Determine task_ref and category
  local task_ref="$custom_task_ref"
  local category="manual"
  
  if [ -z "$task_ref" ]; then
    if [[ "$session_key" == *"cron:"* ]]; then
      local cron_id=$(echo "$session_key" | sed -E 's/.*cron:([^:]+).*/\1/')
      task_ref=$(map_cron_id_to_task "$cron_id")
      category="cron"
    elif [[ "$session_key" == *"subagent:"* ]]; then
      task_ref="subagent-task"
      category="subagent"
    else
      task_ref="interactive-session"
      category="interactive"
    fi
  fi
  
  # Create compact JSON entry
  local json_entry=$(jq -nc \
    --arg timestamp "$timestamp" \
    --arg model "$model" \
    --arg agent "$agent" \
    --arg task_ref "$task_ref" \
    --argjson input_tokens "$input_tokens" \
    --argjson output_tokens "$output_tokens" \
    --argjson total_tokens "$total_tokens" \
    --arg category "$category" \
    '{timestamp:$timestamp,model:$model,agent:$agent,task_ref:$task_ref,input_tokens:$input_tokens,output_tokens:$output_tokens,total_tokens:$total_tokens,category:$category}')
  
  # Append to log file
  echo "$json_entry" >> "$LOGFILE"
  echo "[$(date -u +"%Y-%m-%dT%H:%M:%SZ")] Logged: $agent | $model | $task_ref | $total_tokens tokens"
}

# Main logic
if [ $# -eq 0 ]; then
  # No arguments: log all recent cron sessions
  echo "Logging recent cron job token usage..."
  openclaw sessions --json --all-agents --active 60 | jq -r '.sessions[]? | select(.totalTokens != null and .totalTokens > 0 and (.key | contains("cron:"))) | .key' | while read -r session_key; do
    log_session_tokens "$session_key"
  done
  
elif [ $# -eq 1 ]; then
  # One argument: session key or cron ID
  if [[ "$1" == agent:* ]]; then
    # Full session key
    log_session_tokens "$1"
  else
    # Assume it's a cron ID, find the session
    cron_sessions=$(openclaw sessions --json --all-agents --active 1440 | jq -r --arg id "$1" '.sessions[]? | select(.key | contains("cron:" + $id)) | .key')
    if [ -z "$cron_sessions" ]; then
      echo "Error: No sessions found for cron ID '$1'" >&2
      exit 1
    fi
    echo "$cron_sessions" | head -1 | while read -r session_key; do
      log_session_tokens "$session_key"
    done
  fi
  
elif [ $# -eq 2 ]; then
  # Two arguments: cron ID and task name, or session key and task name
  if [[ "$1" == agent:* ]]; then
    # Session key and custom task name
    log_session_tokens "$1" "$2"
  else
    # Cron ID and task name
    cron_sessions=$(openclaw sessions --json --all-agents --active 1440 | jq -r --arg id "$1" '.sessions[]? | select(.key | contains("cron:" + $id)) | .key')
    if [ -z "$cron_sessions" ]; then
      echo "Error: No sessions found for cron ID '$1'" >&2
      exit 1
    fi
    echo "$cron_sessions" | head -1 | while read -r session_key; do
      log_session_tokens "$session_key" "$2"
    done
  fi
  
else
  echo "Usage: $0 [session_key|cron_id] [task_name]" >&2
  echo "  No args:     Log all recent cron jobs" >&2
  echo "  1 arg:       Log specific session or cron ID" >&2 
  echo "  2 args:      Log with custom task name" >&2
  exit 1
fi