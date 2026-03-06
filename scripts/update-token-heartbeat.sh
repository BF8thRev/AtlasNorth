#!/bin/bash
# update-token-heartbeat.sh
# Reads TOKEN_USAGE.jsonl → computes per-model totals → updates HEARTBEAT.md token section
# Called by heartbeat cron after each update

WORKSPACE="/Users/atlasnorth/.openclaw/workspace"
TOKEN_FILE="$WORKSPACE/TOKEN_USAGE.jsonl"
HEARTBEAT="$WORKSPACE/HEARTBEAT.md"

if [ ! -f "$TOKEN_FILE" ]; then
  echo "TOKEN_USAGE.jsonl not found. Skipping token summary."
  exit 0
fi

# Compute per-model token totals using python
TOKEN_SUMMARY=$(python3 - <<'EOF'
import json, sys

totals = {}  # model -> {input, output, total, calls}
grand = {"input": 0, "output": 0, "total": 0, "calls": 0}

with open("/Users/atlasnorth/.openclaw/workspace/TOKEN_USAGE.jsonl") as f:
    for line in f:
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        try:
            e = json.loads(line)
        except:
            continue
        m = e.get("model", "unknown")
        if m not in totals:
            totals[m] = {"input": 0, "output": 0, "total": 0, "calls": 0}
        totals[m]["input"]  += e.get("input_tokens", 0)
        totals[m]["output"] += e.get("output_tokens", 0)
        totals[m]["total"]  += e.get("total_tokens", 0)
        totals[m]["calls"]  += 1
        grand["input"]  += e.get("input_tokens", 0)
        grand["output"] += e.get("output_tokens", 0)
        grand["total"]  += e.get("total_tokens", 0)
        grand["calls"]  += 1

gt = grand["total"] or 1  # avoid div/0

lines = []
lines.append(f"| {'Model':<35} | {'Calls':>5} | {'Input':>8} | {'Output':>8} | {'Total':>8} | {'% Share':>7} |")
lines.append(f"|{'-'*37}|{'-'*7}|{'-'*10}|{'-'*10}|{'-'*10}|{'-'*9}|")
for model, s in sorted(totals.items(), key=lambda x: -x[1]["total"]):
    pct = round(s["total"] / gt * 100, 1)
    lines.append(f"| {model:<35} | {s['calls']:>5} | {s['input']:>8,} | {s['output']:>8,} | {s['total']:>8,} | {pct:>6.1f}% |")
lines.append(f"| {'**TOTAL**':<35} | {grand['calls']:>5} | {grand['input']:>8,} | {grand['output']:>8,} | {grand['total']:>8,} | {'100%':>7} |")

print("\n".join(lines))
EOF
)

TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

# Replace or append the Token Usage section in HEARTBEAT.md
if grep -q "## Token Usage by Model" "$HEARTBEAT"; then
  # Remove existing section and rewrite
  python3 - <<PYEOF
content = open("$HEARTBEAT").read()
marker = "## Token Usage by Model"
idx = content.find(marker)
if idx != -1:
    # Find next ## section or end
    next_section = content.find("\n## ", idx + 1)
    if next_section == -1:
        content = content[:idx]
    else:
        content = content[:idx] + content[next_section:]

section = f"""## Token Usage by Model
_Last updated: $TIMESTAMP_

$TOKEN_SUMMARY

"""
content = content.rstrip() + "\n\n" + section
open("$HEARTBEAT", "w").write(content)
print("Token section updated.")
PYEOF
else
  # Append new section
  cat >> "$HEARTBEAT" << SECTION

## Token Usage by Model
_Last updated: $TIMESTAMP_

$TOKEN_SUMMARY

SECTION
  echo "Token section appended."
fi
