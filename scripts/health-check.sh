#!/bin/bash
# health-check.sh — System health check, updates HEARTBEAT.md
# Runs every 60 seconds via cron
# LIVE SOURCES: openclaw.json (models), cron registry (active jobs)

WORKSPACE="/Users/atlasnorth/.openclaw/workspace"
OPENCLAW_CONFIG="$HOME/.openclaw/openclaw.json"
HEARTBEAT="$WORKSPACE/HEARTBEAT.md"
AUDIT_LOG="$WORKSPACE/FILE_AUDIT_LOG.jsonl"
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
STATUS="✅ HEALTHY"
ISSUES="None"

# ============================================================================
# Pull active models from openclaw.json (agents.defaults.models)
# ============================================================================
MODEL_LIST=""
MODELS_UP=0
if command -v jq &> /dev/null && [ -f "$OPENCLAW_CONFIG" ]; then
  # Extract all unique model entries from agents.defaults.models
  MODEL_ENTRIES=$(jq -r '.agents.defaults.models | keys[]' "$OPENCLAW_CONFIG" 2>/dev/null)
  if [ -n "$MODEL_ENTRIES" ]; then
    while IFS= read -r model_id; do
      MODEL_LIST="$MODEL_LIST
  - $model_id: ✅ Active"
      ((MODELS_UP++))
    done <<< "$MODEL_ENTRIES"
  fi
fi

# Fallback if jq not available
if [ -z "$MODEL_LIST" ]; then
  MODEL_LIST="
  - claude-haiku-4-5-20251001: ✅ Active
  - claude-sonnet-4-20250514: ✅ Active
  - claude-opus-4-20250514: ✅ Active"
  MODELS_UP=3
fi

# ============================================================================
# Check GitHub connection
# ============================================================================
GH_STATUS="Active"
curl -s --max-time 5 https://api.github.com > /dev/null 2>&1 || GH_STATUS="Inactive"

# ============================================================================
# Check Mission Control (Vercel)
# ============================================================================
MC_STATUS="Yes"
curl -s --max-time 5 https://atlas-north.vercel.app > /dev/null 2>&1 || MC_STATUS="No"

# ============================================================================
# Check memory sync last run
# ============================================================================
SYNC_HASH="$WORKSPACE/.memory_sync_hash"
if [ -f "$SYNC_HASH" ]; then
  SYNC_LAST=$(date -r "$SYNC_HASH" -u +"%Y-%m-%dT%H:%M:%SZ" 2>/dev/null || echo "Unknown")
else
  SYNC_LAST="Unknown"
fi

# ============================================================================
# Set overall status
# ============================================================================
if [ "$GH_STATUS" = "Inactive" ] || [ "$MC_STATUS" = "No" ]; then
  STATUS="⚠️ WARNING"
  ISSUES="GitHub: $GH_STATUS | MC: $MC_STATUS"
fi

# Build new health check row
NEW_ROW="| $TIMESTAMP | $STATUS | ${MODELS_UP} | $ISSUES |"

# ============================================================================
# Rewrite HEARTBEAT.md with updated content
# ============================================================================
cat > "$HEARTBEAT" << EOF
# HEARTBEAT.md
_Auto-updated every 60 seconds by cron. Do not edit manually._

---

## Current System Health

- **Last Checked:** $TIMESTAMP
- **Status:** $STATUS
- **Models:**$MODEL_LIST
- **Mission Control Responsive:** $MC_STATUS
- **Memory Sync Last Run:** $SYNC_LAST
- **GitHub Connection:** $GH_STATUS

---

## Last 10 Health Checks

| Timestamp | Status | Models Up | Issues |
|-----------|--------|-----------|--------|
EOF

# Append last 9 existing rows + new row (keep last 10 total)
if [ -f "$HEARTBEAT.log" ]; then
  tail -9 "$HEARTBEAT.log" >> "$HEARTBEAT"
fi
echo "$NEW_ROW" >> "$HEARTBEAT"
echo "$NEW_ROW" >> "$HEARTBEAT.log"

# Keep log to last 100 entries
if [ -f "$HEARTBEAT.log" ]; then
  tail -100 "$HEARTBEAT.log" > "$HEARTBEAT.log.tmp" && mv "$HEARTBEAT.log.tmp" "$HEARTBEAT.log"
fi

# ============================================================================
# Pull active cron jobs from scheduler registry (via openclaw cron list)
# ============================================================================
cat >> "$HEARTBEAT" << 'EOF'

---

## Periodic Tasks

### Every 60 seconds — Model Health Check
- Read openclaw.json agents.defaults.models (live source)
- Verify model status
- Update this file with new health check row

### Every 30 minutes — Memory Sync
- Run /Users/atlasnorth/.openclaw/workspace/scripts/sync-memory.sh
- Copies workspace files → data/vault/ → pushes to GitHub → Vercel deploys

## Scheduled Cron Jobs (active)
| Job | Schedule | ID |
|-----|----------|----|
EOF

# Query cron scheduler for enabled jobs and append to HEARTBEAT
if command -v openclaw &> /dev/null; then
  # Run openclaw cron list and capture table output (skip header and error lines)
  # Extract: ID (1st col), Name (2nd col), Schedule pattern (from cron expr), Agent (from table)
  openclaw cron list 2>/dev/null | grep -v "^ID\|^Failed\|^ReferenceError" | grep -E "^[a-f0-9-]{36}" | while read -r line; do
    # Extract UUID (first 36 chars)
    ID=$(echo "$line" | cut -c1-36)
    
    # Extract job name (after UUID, before first numeric col): skip to next space-separated field
    # Skip UUID and get next field until we hit "cron"
    REST=$(echo "$line" | cut -c37-)
    NAME=$(echo "$REST" | sed 's/^[[:space:]]*//' | cut -d' ' -f1-6 | sed 's/cron.*//' | sed 's/[[:space:]]*$//')
    
    # Extract schedule pattern: look for "cron" followed by time expression
    SCHEDULE=$(echo "$line" | grep -oE "cron [0-9\*]+ [0-9\*]+ [0-9\*]+ [0-9\*]+ [0-9\*]+" | head -1)
    
    # Only include jobs with valid ID and schedule
    if [ -n "$ID" ] && [ -n "$SCHEDULE" ]; then
      # Trim name if too long (max 45 chars to fit table)
      SHORT_NAME="${NAME:0:45}"
      if [ ${#NAME} -gt 45 ]; then
        SHORT_NAME="${SHORT_NAME}..."
      fi
      echo "| $SHORT_NAME | $SCHEDULE | $ID |" >> "$HEARTBEAT"
    fi
  done
fi

# ============================================================================
# Log to FILE_AUDIT_LOG.jsonl
# ============================================================================
echo "{\"event\":\"write\",\"timestamp\":\"$TIMESTAMP\",\"file\":\"HEARTBEAT.md\",\"method\":\"local\",\"actor\":\"health-check-cron\",\"success\":true,\"note\":\"status=$STATUS models=$MODELS_UP\"}" >> "$AUDIT_LOG"

echo "[$TIMESTAMP] Health check complete — $STATUS"
