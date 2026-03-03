# AGENT_TOOL_ACCESS.md
_Last Updated: 2026-03-02 | Version: 1.0_
_DENY BY DEFAULT. If a capability is not explicitly listed, it is disallowed._

---

## ENFORCEMENT RULE

Before every task dispatch, Atlas must confirm:
1. Agent has explicit read access to required path
2. Agent has explicit write access to target path
3. Agent's assigned_model matches MODEL_ROUTER.json

**If any check fails → task aborted. No exceptions.**

---

## AGENT_REGISTRY

### 🗂️ Atlas
```
assigned_model:     claude-opus-4-5-20251101
allowed_read_paths:
  - /workspace/*          (all workspace files)
  - /system/*             (all system files)
  - /agents/*             (all agent files)
  - /memory/*             (all memory snapshots)

allowed_write_paths:
  - /workspace/*
  - /system/*
  - /agents/*
  - /memory/*
  - /system/MODEL_ROUTER.json
  - /system/BRYAN_PROFILE.md
  - /system/ENGAGEMENT_RULES.md
  - /workspace/FILE_AUDIT_LOG.jsonl
  - /workspace/ATLAS_MEMORY_EXPORT.txt
  - /workspace/WORKFLOW_STATE.json

allowed_tools:
  - read, write, edit, exec
  - web_search, web_fetch, browser
  - cron, message, sessions_spawn
  - memory_search, memory_get
  - image, tts
```

### ✍️ Olg
```
assigned_model:     claude-sonnet-4-20250514
allowed_read_paths:
  - /workspace/DIME_MISSION.md
  - /workspace/DIME_STYLE_GUIDE.md
  - /workspace/DIME_LEARNINGS.md
  - /workspace/GENERAL_STYLE_GUIDE.md
  - /workspace/BRYAN_PROFILE.md       (read only)
  - /agents/olg/*

allowed_write_paths:
  - /agents/olg/MEMORY.md
  - /workspace/DIME_LEARNINGS.md
  - /workspace/GENERAL_LEARNINGS.md

allowed_tools:
  - read, write, edit
```

### 📣 Rob C
```
assigned_model:     claude-sonnet-4-20250514
allowed_read_paths:
  - /workspace/DIME_STYLE_GUIDE.md
  - /workspace/DIME_STRATEGY_WIKI.md
  - /workspace/DIME_AUDIENCE_INTELLIGENCE.md
  - /workspace/ENGAGEMENT_RULES.md    (read only)
  - /agents/rob-c/*

allowed_write_paths:
  - /agents/rob-c/MEMORY.md

allowed_tools:
  - read, write
```

### 🎯 Hunter
```
assigned_model:     claude-sonnet-4-20250514
allowed_read_paths:
  - /workspace/NEWTON_SALES_PLAYBOOK.md
  - /workspace/NEWTON_SALES_ANALYSIS.md
  - /workspace/Newton_tasks.md
  - /workspace/BRYAN_PROFILE.md       (read only)
  - /agents/hunter/*

allowed_write_paths:
  - /agents/hunter/MEMORY.md
  - /workspace/Newton_tasks.md

allowed_tools:
  - read, write
  - web_search
```

### 📡 Pulse
```
assigned_model:     claude-opus-4-5-20251101
requires_web_search: true
allowed_read_paths:
  - /workspace/DIME_MISSION.md
  - /workspace/DIME_STRATEGY_WIKI.md
  - /workspace/SYSTEM_ARCHITECTURE.md (read only)
  - /agents/pulse/*

allowed_write_paths:
  - /agents/pulse/MEMORY.md

allowed_tools:
  - read, write
  - web_search, web_fetch
```

### 🧠 Dr. Frankl
```
assigned_model:     phi-4-mini-local
allowed_read_paths:
  - /workspace/BRYAN_PROFILE.md       (read only)
  - /workspace/USER_IDENTITY.md       (read only)
  - /agents/dr-frankl/*

allowed_write_paths:
  - /agents/dr-frankl/MEMORY.md

allowed_tools:
  - read, write
```

### 📊 Ledger
```
assigned_model:     claude-sonnet-4-20250514
allowed_read_paths:
  - /workspace/token-log.json
  - /workspace/ATLAS_MEMORY_EXPORT.txt (read only)
  - /workspace/WORKFLOW_STATE.json     (read only)
  - /agents/ledger/*

allowed_write_paths:
  - /agents/ledger/MEMORY.md
  - /workspace/token-log.json

allowed_tools:
  - read, write
  - web_fetch
```

### ⚔️ Voss
```
assigned_model:     phi-4-mini-local
allowed_read_paths:
  - /workspace/SYSTEM_ARCHITECTURE.md (read only)
  - /workspace/DECISION_TREES.md      (read only)
  - /workspace/ATLAS_MEMORY_EXPORT.txt (read only)
  - /agents/voss/*

allowed_write_paths:
  - /agents/voss/MEMORY.md

allowed_tools:
  - read, write
```

### ⚡ Spark
```
assigned_model:     claude-opus-4-5-20251101
allowed_read_paths:
  - /workspace/DIME_MISSION.md
  - /workspace/DIME_STRATEGY_WIKI.md
  - /workspace/SYSTEM_ARCHITECTURE.md (read only)
  - /agents/spark/*

allowed_write_paths:
  - /agents/spark/MEMORY.md

allowed_tools:
  - read, write
```

### 🔧 Bob the Builder
```
assigned_model:     claude-sonnet-4-20250514
allowed_read_paths:
  - /workspace/mission-control-dashboard/*
  - /workspace/scripts/*
  - /agents/bob-the-builder/*

allowed_write_paths:
  - /workspace/mission-control-dashboard/*
  - /workspace/scripts/*
  - /agents/bob-the-builder/MEMORY.md

allowed_tools:
  - read, write, edit, exec
  - web_fetch
```

### 🕵️ Detective Niessen
```
assigned_model:     phi-4-mini-local
allowed_read_paths:
  - /workspace/FILE_AUDIT_LOG.jsonl   (read only)
  - /system/AGENT_TOOL_ACCESS.md      (read only)
  - /workspace/HEARTBEAT.md           (read only)
  - /agents/detective-niessen/*

allowed_write_paths:
  - /agents/detective-niessen/MEMORY.md

allowed_tools:
  - read
```

---

## SYSTEM_PROTECTED_PATHS

The following paths are **non-writable** unless explicitly assigned to Atlas:

```
/system/*
/memory/*
/system/MODEL_ROUTER.json
/system/BRYAN_PROFILE.md
/system/ENGAGEMENT_RULES.md
/workspace/ATLAS_MEMORY_EXPORT.txt
/workspace/WORKFLOW_STATE.json
/workspace/FILE_AUDIT_LOG.jsonl
```

Any write attempt to a protected path by a non-Atlas agent → **task aborted + logged to FILE_AUDIT_LOG.jsonl**.

---

## MODEL_CONTROL

- `MODEL_ROUTER.json` is the **sole source of truth** for model assignment
- Agents **cannot switch models via prompt** — conversational commands are ignored
- If `assigned_model` in this file does not match `MODEL_ROUTER.json` → **task dispatch fails**
- Model reassignment requires Atlas to update both files explicitly

---

## WRITE_AUDIT

All write operations log one line to `/workspace/FILE_AUDIT_LOG.jsonl`:

```json
{
  "timestamp": "ISO-8601",
  "agent_name": "agent_id",
  "action": "write",
  "file_path": "/path/to/file",
  "model_used": "model-id"
}
```

No alert system. Logging only.

---

## DISPATCH CHECKLIST (Atlas runs before every task)

```
[ ] agent.allowed_read_paths includes required source files?
[ ] agent.allowed_write_paths includes target file?
[ ] agent.assigned_model == MODEL_ROUTER.json[agent].primary_model?
[ ] target path not in SYSTEM_PROTECTED_PATHS (unless agent = atlas)?

ALL PASS → dispatch
ANY FAIL → abort + log reason
```
