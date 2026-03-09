#!/bin/bash
# push-to-github.sh
# Runs at 11 AM and 5 PM EST
# Pulls remote changes, then pushes all local commits to GitHub

REPO="/Users/atlasnorth/.openclaw/workspace"
LOG="/Users/atlasnorth/.openclaw/workspace/FILE_AUDIT_LOG.jsonl"
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
WINDOW=$(TZ="America/New_York" date +"%H:%M")

cd "$REPO" || exit 1

# Stage any outstanding vault changes before pull
git add data/vault/ 2>&1
if ! git diff --cached --quiet; then
  git commit -m "auto: pre-push vault sync $(TZ='America/New_York' date '+%Y-%m-%d %H:%M EST')" 2>&1
fi

# Pull and rebase
git pull --rebase origin main 2>&1

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
