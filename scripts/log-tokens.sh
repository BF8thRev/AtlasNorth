#!/bin/bash
# log-tokens.sh — Append token usage to TOKEN_USAGE.jsonl
# Called by cron jobs after execution with: bash log-tokens.sh "<agent>" "<task>" "<category>" <input> <output>
# Usage: log-tokens.sh "Hunter" "Prospect Research" "research" 1500 500

WORKSPACE="/Users/atlasnorth/.openclaw/workspace"
TOKEN_FILE="$WORKSPACE/TOKEN_USAGE.jsonl"

AGENT="${1:-unknown}"
TASK="${2:-unknown}"
CATEGORY="${3:-other}"
INPUT_TOKENS="${4:-0}"
OUTPUT_TOKENS="${5:-0}"
TOTAL_TOKENS=$((INPUT_TOKENS + OUTPUT_TOKENS))
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
MODEL="${6:-unknown}"

# Create file if it doesn't exist
if [ ! -f "$TOKEN_FILE" ]; then
  mkdir -p "$(dirname "$TOKEN_FILE")"
  echo '# TOKEN_USAGE.jsonl — append-only, one JSON object per line' > "$TOKEN_FILE"
  echo '# Schema: {"timestamp":"ISO","model":"string","agent":"string","task_ref":"string","input_tokens":0,"output_tokens":0,"total_tokens":0,"category":"string"}' >> "$TOKEN_FILE"
fi

# Append token entry as JSON
cat >> "$TOKEN_FILE" << EOF
{"timestamp":"$TIMESTAMP","model":"$MODEL","agent":"$AGENT","task_ref":"$TASK","input_tokens":$INPUT_TOKENS,"output_tokens":$OUTPUT_TOKENS,"total_tokens":$TOTAL_TOKENS,"category":"$CATEGORY"}
EOF

echo "[Token Log] $AGENT • $TASK • $TOTAL_TOKENS tokens ($INPUT_TOKENS↑ / $OUTPUT_TOKENS↓) — $(date '+%Y-%m-%d %H:%M:%S %Z')"
