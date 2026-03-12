# SYSTEM_ARCHITECTURE.md
_Last Updated: 2026-03-02 | Version: 1.0_

## North Star Goals
1. **The Dime** — Grow audience, maximize distribution, become the #1 cannabis industry podcast
2. **Newton Insights** — Product-led growth to paying customers. Prove ROI for cannabis manufacturers.
3. **SCC/HUSA** — Hands-off growth via SEO. Track and prove it's working.

## Agent Roster
| Agent | Role | Icon | Status |
|-------|------|------|--------|
| Atlas | Chief of Staff | 🗂️ | Active |
| Olg | Writer | ✍️ | Active |
| Rob C | Engagement | 📣 | Active |
| Hunter | Sales | 🎯 | Active |
| Pulse | Research & Trends | 📡 | Active |
| Dr. Frankl | Life Coach | 🧠 | Active |
| Ledger | Data & Analytics | 📊 | Active |
| Voss | Devil's Advocate | ⚔️ | Active |
| Spark | Ideas & Concepts | ⚡ | Active |
| Bob the Builder | Code & Technical Build | 🔧 | Active |
| Detective Niessen | Security & Defense | 🕵️ | Active |

## Task Flow
```
Bryan → Atlas (gatekeeper)
             ↓
     [Task Classification]
             ↓
    ┌────────────────────────────────────┐
    │  Research   → Pulse → Spark        │
    │  Writing    → Olg                  │
    │  Engagement → Rob C                │
    │  Sales      → Hunter               │
    │  Data       → Ledger               │
    │  Build      → Bob the Builder      │
    │  Security   → Detective Niessen    │
    │  Coaching   → Dr. Frankl           │
    │  Challenge  → Voss                 │
    └────────────────────────────────────┘
             ↓
     Atlas reviews output
             ↓
     Bryan receives final
```

## Power Trios
| Trio | Agents | Use Case |
|------|--------|----------|
| New Business | Pulse + Spark + Hunter | Market signal → concept → prospect |
| Content Pipeline | Olg + Rob C + Pulse | Research → write → distribute |
| Strategic Review | Voss + Ledger + Atlas | Data + challenge before major decision |
| Build Pipeline | Spark + Bob + Ledger | Concept → build → measure |
| Security Review | Niessen + Bob + Atlas | Audit → patch → sign off |

## Mission Control Structure
- **URL:** https://atlas-north.vercel.app
- **Repo:** https://github.com/BF8thRev/AtlasNorth
- **Local:** /Users/atlasnorth/.openclaw/workspace/mission-control-dashboard
- **Data layer:** /Users/atlasnorth/.openclaw/workspace (all files read/write via API)
- **Deploy:** Auto on push to main branch

## File Dependency Map
| File | Purpose | Updated By |
|------|---------|------------|
| MEMORY.md | Long-term memory | Atlas after every significant event |
| ATLAS_MEMORY_EXPORT.txt | Task history log | Atlas after every completed task |
| WORKFLOW_STATE.json | Current state & open loops | Atlas after state changes |
| BRYAN_PROFILE.md | Approval/rejection patterns | Atlas after calibration events |
| ENGAGEMENT_RULES.md | Behavioral rules (3+ occurrences) | Atlas when pattern confirmed |
| token-log.json | Token usage per task | Atlas after every task |
| ROSTER.md | Full agent roster | Atlas when roster changes |
| agents/[name]/*.md | Per-agent memory + soul files | Each agent + Atlas |

## Podcast — The Dime
- **Platform:** YouTube (primary), Apple Podcasts, Spotify
- **Hosting:** Simplecast
- **Channel ID:** UCcck3tzBNXrJ1WJ8EtIVq1w
- **GA4 Property:** 281147332
- **Content format:** Long-form episodes + Shorts
- **Title rule:** Declarative wins (67% strong rate). Avoid colon-subtitle format.
- **Top theme:** Operations/Scale for long-form. Science/Tech for Shorts.
- **Core formula:** CONSEQUENCE — every top performer implies stakes.

## Workspace Path
```
/Users/atlasnorth/.openclaw/workspace/
├── MEMORY.md
├── ATLAS_SOUL.md
├── USER_IDENTITY.md
├── SYSTEM_ARCHITECTURE.md
├── ATLAS_MEMORY_EXPORT.txt
├── WORKFLOW_STATE.json
├── BRYAN_PROFILE.md
├── ENGAGEMENT_RULES.md
├── ROSTER.md
├── token-log.json
├── agents/
│   ├── atlas/
│   ├── spark/
│   ├── pulse/
│   ├── olg/
│   ├── rob-c/
│   ├── hunter/
│   ├── dr-frankl/
│   ├── ledger/
│   ├── voss/
│   ├── bob-the-builder/
│   └── detective-niessen/
├── mission-control-dashboard/  (Next.js app → Vercel)
├── memory/  (dated memory snapshots)
└── credentials/  (OAuth tokens)
```
