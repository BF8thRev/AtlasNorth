#!/bin/bash
# eod-blockers-review.sh
# Runs at 5PM EST after push.
# Reviews BLOCKERS.json — marks resolved items, archives to COMPLETED_BLOCKERS.json,
# logs resolutions to FILE_AUDIT_LOG.jsonl and ATLAS_MEMORY_EXPORT.txt

WORKSPACE="/Users/atlasnorth/.openclaw/workspace"
BLOCKERS="$WORKSPACE/BLOCKERS.json"
COMPLETED="$WORKSPACE/COMPLETED_BLOCKERS.json"
AUDIT="$WORKSPACE/FILE_AUDIT_LOG.jsonl"
MEMORY="$WORKSPACE/ATLAS_MEMORY_EXPORT.txt"
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
TODAY=$(date +"%Y-%m-%d")

python3 - <<PYEOF
import json, os

blockers_path = "$BLOCKERS"
completed_path = "$COMPLETED"
audit_path = "$AUDIT"
memory_path = "$MEMORY"
timestamp = "$TIMESTAMP"
today = "$TODAY"

with open(blockers_path) as f:
    blockers_data = json.load(f)

# Initialize COMPLETED_BLOCKERS if needed
if os.path.exists(completed_path):
    with open(completed_path) as f:
        completed_data = json.load(f)
else:
    completed_data = {"last_updated": today, "version": "1.0", "completed_blockers": []}

active = []
archived = []

for b in blockers_data.get("blockers", []):
    if b.get("status") == "resolved":
        b["resolved_date"] = b.get("resolved_date", today)
        archived.append(b)
        # Log to FILE_AUDIT_LOG
        entry = json.dumps({
            "event": "blocker_resolved",
            "timestamp": timestamp,
            "blocker_id": b["id"],
            "description": b["description"][:80],
            "resolved_date": b["resolved_date"]
        })
        with open(audit_path, "a") as f:
            f.write(entry + "\n")
        # Log to ATLAS_MEMORY_EXPORT
        mem_entry = f"BLOCKER_RESOLUTION | {b['id']} | {b['description'][:80]} | resolved {today} | task_type: blocker_resolution"
        with open(memory_path, "a") as f:
            f.write(mem_entry + "\n")
    else:
        active.append(b)

if archived:
    completed_data["completed_blockers"].extend(archived)
    completed_data["last_updated"] = today
    with open(completed_path, "w") as f:
        json.dump(completed_data, f, indent=2)
    print(f"Archived {len(archived)} resolved blocker(s).")

blockers_data["blockers"] = active
blockers_data["last_updated"] = today
with open(blockers_path, "w") as f:
    json.dump(blockers_data, f, indent=2)

print(f"Active blockers remaining: {len(active)}")
PYEOF
