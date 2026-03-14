#!/bin/bash
# Memory Rotation with Logging Wrapper

TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

# Run memory rotation (zero tokens)
bash /Users/atlasnorth/.openclaw/scripts/rotate-memory.sh

# Log the command execution (not an agent turn — shell-level logging)
bash /Users/atlasnorth/.openclaw/workspace/scripts/log-tokens.sh "$TIMESTAMP" "system/shell" "atlas" "memory-rotation-midnight" 0 0 0 "ops"