#!/bin/bash
# push-to-github.sh
# Runs at 11 AM and 5 PM EST
# Pulls remote changes, then pushes all local commits to GitHub

REPO="/Users/atlasnorth/.openclaw/workspace/mission-control-dashboard"
LOG="/Users/atlasnorth/.openclaw/workspace/FILE_AUDIT_LOG.jsonl"
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
WINDOW=$(TZ="America/New_York" date +"%H:%M")

cd "$REPO" || exit 1

# Stash any unstaged changes, pull, then restore
git stash 2>&1
git pull --rebase origin main 2>&1
git stash pop 2>&1 || true

# Push
PUSH_OUTPUT=$(git push origin main 2>&1)
PUSH_EXIT=$?

if [ $PUSH_EXIT -eq 0 ]; then
  echo "{\"event\":\"push\",\"timestamp\":\"$TIMESTAMP\",\"window\":\"$WINDOW EST\",\"success\":true,\"note\":\"Scheduled push complete\"}" >> "$LOG"
  echo "✅ Push complete at $WINDOW EST"
else
  echo "{\"event\":\"push\",\"timestamp\":\"$TIMESTAMP\",\"window\":\"$WINDOW EST\",\"success\":false,\"note\":\"$PUSH_OUTPUT\"}" >> "$LOG"
  echo "❌ Push failed at $WINDOW EST: $PUSH_OUTPUT"
fi
