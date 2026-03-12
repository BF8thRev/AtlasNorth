#!/bin/bash
# sync-memory.sh — Auto-sync memory files to GitHub → Vercel
# Runs on cron. Pushes any changed workspace memory files.

WORKSPACE="/Users/atlasnorth/.openclaw/workspace"
DASHBOARD="$WORKSPACE/mission-control-dashboard"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

# Files to sync into the dashboard data layer
MEMORY_FILES=(
  "MEMORY.md"
  "ATLAS_SOUL.md"
  "USER_IDENTITY.md"
  "SYSTEM_ARCHITECTURE.md"
  "ATLAS_MEMORY_EXPORT.txt"
  "WORKFLOW_STATE.json"
  "BRYAN_PROFILE.md"
  "ENGAGEMENT_RULES.md"
  "CALIBRATION_NOTES.md"
  "DECISION_TREES.md"
  "token-log.json"
  "DIME_LEARNINGS.md"
  "DIME_STRATEGY_WIKI.md"
  "DIME_MISSION.md"
  "DIME_STYLE_GUIDE.md"
  "Newton_tasks.md"
  "NEWTON_SALES_PLAYBOOK.md"
  "NEWTON_SALES_ANALYSIS.md"
  "ROSTER.md"
)

cd "$WORKSPACE" || exit 1

# Check if there are any changes to commit
# We track this via a simple hash file
HASH_FILE="$WORKSPACE/.memory_sync_hash"
CURRENT_HASH=$(cat "${MEMORY_FILES[@]/#/$WORKSPACE/}" 2>/dev/null | md5 2>/dev/null || md5sum "${MEMORY_FILES[@]/#/$WORKSPACE/}" 2>/dev/null | md5sum)
LAST_HASH=$(cat "$HASH_FILE" 2>/dev/null || echo "")

if [ "$CURRENT_HASH" = "$LAST_HASH" ] && git diff --quiet HEAD 2>/dev/null; then
  echo "[$TIMESTAMP] No changes detected. Skipping sync."
  exit 0
fi

# Stage all changes from workspace root (never cd into mission-control-dashboard)
git add -A

# Only commit if there's something to commit
if ! git diff --cached --quiet; then
  git commit -m "auto: memory sync $TIMESTAMP"
  git push origin main
  echo "[$TIMESTAMP] Pushed memory sync to GitHub → Vercel deploying."
else
  echo "[$TIMESTAMP] Nothing to commit."
fi

# Update hash
echo "$CURRENT_HASH" > "$HASH_FILE"

# Sync workspace files into repo vault
VAULT="$DASHBOARD/data/vault"
mkdir -p "$VAULT/agents" "$VAULT/memory"

# Copy root files
for f in MEMORY.md SOUL.md AGENTS.md IDENTITY.md USER.md HEARTBEAT.md MODEL_ROUTER.json ATLAS_SOUL.md USER_IDENTITY.md SYSTEM_ARCHITECTURE.md CALIBRATION_NOTES.md DECISION_TREES.md BRYAN_PROFILE.md ATLAS_MEMORY_EXPORT.txt WORKFLOW_STATE.json ENGAGEMENT_RULES.md DIME_MISSION.md DIME_STRATEGY_WIKI.md DIME_STYLE_GUIDE.md DIME_LEARNINGS.md Newton_tasks.md NEWTON_SALES_PLAYBOOK.md NEWTON_SALES_ANALYSIS.md GENERAL_TASKS.md GENERAL_LEARNINGS.md GENERAL_STYLE_GUIDE.md ROSTER.md TOOLS.md token-log.json FILE_AUDIT_LOG.jsonl; do
  [ -f "$WORKSPACE/$f" ] && cp "$WORKSPACE/$f" "$VAULT/$f"
done

# Copy agent directories
for agent in atlas olg rob-c hunter pulse dr-frankl ledger voss spark bob-the-builder detective-niessen; do
  [ -d "$WORKSPACE/agents/$agent" ] && cp -r "$WORKSPACE/agents/$agent" "$VAULT/agents/"
done

# Copy memory snapshots
[ -d "$WORKSPACE/memory" ] && cp -r "$WORKSPACE/memory/." "$VAULT/memory/"
