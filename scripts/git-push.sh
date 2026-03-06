#!/bin/bash
# git-push.sh — Push workspace to GitHub
# Called by LaunchAgent crons at specific times
# Usage: bash git-push.sh "[commit-message]"

WORKSPACE="/Users/atlasnorth/.openclaw/workspace"
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
COMMIT_MSG="${1:-[Scheduled] Automated sync}"

cd "$WORKSPACE" || exit 1

# Stage all changes
git add -A

# Check if there are changes to commit
if git diff --cached --quiet; then
  echo "[$TIMESTAMP] No changes to commit. Skipping push."
  exit 0
fi

# Commit
git commit -m "$COMMIT_MSG"

# Push to origin/main
if git push origin main 2>/dev/null; then
  echo "[$TIMESTAMP] ✅ Push successful — $COMMIT_MSG"
  exit 0
else
  echo "[$TIMESTAMP] ❌ Push failed — $COMMIT_MSG"
  exit 1
fi
