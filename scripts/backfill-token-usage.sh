#!/bin/bash
# backfill-token-usage.sh — Backfill TOKEN_USAGE.jsonl with real session data
# This script will extract all historical token usage and create a new clean file

WORKSPACE="/Users/atlasnorth/.openclaw/workspace"
LOGFILE="$WORKSPACE/TOKEN_USAGE.jsonl"
BACKUP_FILE="$WORKSPACE/TOKEN_USAGE.jsonl.backup-$(date +%Y%m%d-%H%M%S)"
TEMP_FILE="$WORKSPACE/TOKEN_USAGE.jsonl.tmp"

echo "Creating backup of current file..."
cp "$LOGFILE" "$BACKUP_FILE"

echo "Extracting all historical token usage from OpenClaw sessions..."

# Create new header
cat > "$TEMP_FILE" <<EOF
# TOKEN_USAGE.jsonl — append-only, one JSON object per line
# Schema: {"timestamp":"ISO","model":"string","agent":"string","task_ref":"string","input_tokens":0,"output_tokens":0,"total_tokens":0,"category":"string"}
EOF

# Get all sessions with token data from the past week
openclaw sessions --json --all-agents --active $((7 * 24 * 60)) | jq -r '
.sessions[]? | 
select(.totalTokens != null and .totalTokens > 0) |
{
  timestamp: (.updatedAt / 1000 | strftime("%Y-%m-%dT%H:%M:%SZ")),
  model: ((.modelProvider + "/" + .model) // "unknown"),
  agent: .agentId,
  task_ref: (
    if .key | contains("cron:") then
      # Extract cron task ID and try to map to human readable names
      (.key | split(":")[2] as $cronId |
        if $cronId == "0c1977ae-7a94-4a9f-944e-aeeabe94db43" then "memory-rotation-verify-6am"
        elif $cronId == "1bd4a6b6-333e-459f-806d-0ff7bd3eb6f6" then "admin-brief-daily-615am"  
        elif $cronId == "95af407a-6760-42d0-9d73-7201775ab5f6" then "blocker-board-refresh-610am"
        elif $cronId == "686887f1-5bbb-4f84-97fa-eafb9de9f74b" then "daily-intel-6am"
        elif $cronId == "77b49d60-a1cd-4d53-b574-732b621c23e7" then "morning-brief-8am"
        elif $cronId == "3fa57eec-62d2-4b92-a82d-5c24c5fece16" then "admin-brief-sun-715am"
        elif $cronId == "a01e8b8a-a007-4b7d-83dc-a4160fafa7a3" then "security-scan-daily-6am"
        else $cronId
        end)
    elif .key | contains("subagent:") then 
      "subagent-task"
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
@json' >> "$TEMP_FILE"

# Sort by timestamp and remove duplicates
echo "Sorting and deduplicating entries..."
grep '^{' "$TEMP_FILE" | sort -t'"' -k4 | uniq > "${TEMP_FILE}.sorted"

# Recreate final file
head -2 "$TEMP_FILE" > "$LOGFILE"
cat "${TEMP_FILE}.sorted" >> "$LOGFILE"

# Cleanup
rm -f "$TEMP_FILE" "${TEMP_FILE}.sorted"

echo "Backfill complete!"
echo "Backup saved to: $BACKUP_FILE"
echo "New entries: $(grep '^{' "$LOGFILE" | wc -l | tr -d ' ')"
echo "Total tokens logged: $(grep '^{' "$LOGFILE" | jq -s 'map(.total_tokens) | add')"