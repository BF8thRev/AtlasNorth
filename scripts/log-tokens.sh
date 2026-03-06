#!/bin/bash
# log-tokens.sh — Log cron job token usage to TOKEN_USAGE.jsonl
# Usage: bash log-tokens.sh "<timestamp>" "<model>" "<agent>" "<task_ref>" <input> <output> <total> "[category]"
# Example: bash log-tokens.sh "2026-03-06T06:00:00Z" "google/gemini-2.5-flash" "pulse" "daily-intel-6am" 8500 12300 20800 "research"

WORKSPACE="/Users/atlasnorth/.openclaw/workspace"
LOGFILE="$WORKSPACE/TOKEN_USAGE.jsonl"

# Parse arguments
TIMESTAMP="${1:-$(date -u +"%Y-%m-%dT%H:%M:%SZ")}"
MODEL="${2:-unknown}"
AGENT="${3:-unknown}"
TASK_REF="${4:-unknown}"
INPUT_TOKENS="${5:-0}"
OUTPUT_TOKENS="${6:-0}"
TOTAL_TOKENS="${7:-0}"
CATEGORY="${8:-cron}"

# Calculate totals if not provided
if [ "$TOTAL_TOKENS" = "0" ] && [ "$INPUT_TOKENS" != "0" ]; then
  TOTAL_TOKENS=$((INPUT_TOKENS + OUTPUT_TOKENS))
fi

# Create JSON entry
JSON=$(cat <<EOF
{"timestamp":"$TIMESTAMP","model":"$MODEL","agent":"$AGENT","task_ref":"$TASK_REF","input_tokens":$INPUT_TOKENS,"output_tokens":$OUTPUT_TOKENS,"total_tokens":$TOTAL_TOKENS,"category":"$CATEGORY"}
EOF
)

# Append to JSONL file
echo "$JSON" >> "$LOGFILE"

# Confirm
echo "[$(date -u +"%Y-%m-%dT%H:%M:%SZ")] Logged: $AGENT | $MODEL | $TASK_REF | $TOTAL_TOKENS tokens"
