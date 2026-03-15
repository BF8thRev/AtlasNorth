# Subagent Auto-Save Hook

## Purpose
Every spawned subagent MUST write to its own MEMORY.md at session end automatically. This prevents Atlas from having to manually log findings and keeps each agent's memory in sync.

## Implementation Pattern

### For Pulse (Research Agent)
At end of research cycle, append to `/Users/atlasnorth/.openclaw/workspace/agents/pulse/MEMORY.md`:

```markdown
| [TOPIC] | [CONTEXT: Dime/Newton/HUSA/General] | [TODAY'S DATE] | [ONE-LINE KEY FINDING] | [WHO NEEDS THIS] | [NOTES] |
```

### For Hunter (Sales Agent)
At end of prospect research, append to `/Users/atlasnorth/.openclaw/workspace/agents/hunter/MEMORY.md`:

```markdown
| [COMPANY] | [PROSPECT NAME] | [TODAY'S DATE] | [PRIMARY OBJECTION] | [STRONGEST WEDGE] | [NEXT ACTION] |
```

### For All Agents (Generic Pattern)
1. Determine what data to log (what actually happened in this session)
2. Identify the correct table in agent's MEMORY.md
3. Add one row with: [Date], [What happened], [Key finding/output], [Next owner], [Status/notes]
4. Append to file (do not overwrite)
5. Confirm write succeeded (stat the file, show last modified time)

## Trigger
Auto-save hook runs at the very end of subagent task execution — after all work is complete, before returning to requester.

## Proof of Success
Each agent's session end should show:
- `write` or `edit` call to their MEMORY.md
- File timestamp updated to current time
- One row added to the appropriate table
- Zero overwriting of existing data

## Why This Matters
Without auto-save, Atlas becomes the memory keeper for all agents. That defeats the purpose of standalone agents. Each agent owns its own history.
