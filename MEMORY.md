# Atlas Long-Term Memory

## ORGANIZATION RULE: Single Source of Truth
**This file = ACTIVE context only.** Historical/completed entries → See **memory/longterm_memory.md**
Procedures & protocols → See **STANDING_INSTRUCTIONS.md**

---

## NORTH STAR STRATEGY (Confirmed 2026-03-08)

Three interdependent tracks — not separate:

1. **The Dime** — Connector platform. Every episode = relationship deepening. Metrics: relationship depth, intro velocity, Newton pipeline. NOT view counts.
2. **Newton** — Warm pipeline from Dime relationships. Cold tactics don't work. Dime is Newton's CAE.
3. **Personal Network** — Industry moat. Be known as THE connector who makes things happen.

---

## BRYAN FIELDS PROFILE

- **Role:** Founder. Runs The Dime podcast + Newton Insights.
- **Location:** New York, NY (EST)
- **Communication:** Direct, executive-to-partner cadence. No assistant language. Compressed.
- **Working style:** Prefers product-led growth. Hates cold outreach. Wants organized growth, start small and compound.
- **Core values:** Punctuality = trust. No fabricated stats. 90% confidence threshold.
- **The Dime YouTube:** Channel ID UCcck3tzBNXrJ1WJ8EtIVq1w
- **Prospects Sheet:** https://docs.google.com/spreadsheets/d/16z5SF0DhaUSdhAY5lwFEx6MxZ1VMNt3W1225U28qvjk/edit

---

## NEWTON INSIGHTS — Product & CRM

- **Website:** newton-insights.com
- **Product:** Real-Time Extraction Visibility & AI Cost Control
- **Hardware:** C1D1 tablet ~$5K (no rental market). Software-only tier: pending decision ($0 or $500/mo).
- **Newton CRM Sheet:** https://docs.google.com/spreadsheets/d/1FxH1YnQ93Oj5KAuXv6h0_TrkV5BS6ejNJ4t_q_0i7i8/edit
- **CRM Status (2026-03-10):** 92 Prospects | 8 Warm Prospects | 15 Company Profiles | 275 Verify | 2,022 Archive

**Active Warm Prospects (Priority):**
1. Micah Anderson (Leef, CA/NY) — Post-demo, managerial adoption issue. Newton pitch PENDING.
2. Dom (Statehouse/Greenfield) — ACTIVE, timing clarity wedge
3. Nick Guarino (Jaunty, NY) — ACTIVE, process rebuild window
4. Luke + Bianna (Aylroom, NY) — CLOSEST TO CLOSE, ethanol focus
5. Jared Glanz-Berger (DMC Cannabis, MA) — Early strategic
6. Elizabeth (MariMed) — Semi-warm, needs research
7. Zach Baker (Bud and Mary) — Semi-warm, needs research

**Key messaging:** Timing clarity = the wedge. Frame as leverage not correction. Hardware friction = tablet hesitation.

---

## SYSTEM CONFIGURATION — Current State (Updated 2026-03-12)

### Heartbeat
- **Interval:** 60 minutes (changed from 30min today)
- **lightContext:** true (STANDING_INSTRUCTIONS.md, MEMORY.md, AGENTS.md NOT loaded on heartbeat)
- **Expected token impact:** ~55K/hr → ~7-10K/hr

### File Sync (Mission Control)
- **Source of truth:** Root workspace files
- **MC reads from:** `mission-control-dashboard/data/vault/`
- **Sync:** Every 30 min via `scripts/sync-memory.sh` (root → MC vault → GitHub → Vercel)
- **MC edit flow:** Bryan edits MC → pushes to GitHub → tell Atlas "pull MC changes" → Atlas pulls + copies to root
- **Rule:** Every new file created must be added to sync script immediately

### Active Agents (6 total)
| Agent | Model | Purpose |
|-------|-------|---------|
| atlas | claude-sonnet-4-6 | Main assistant |
| hunter | claude-haiku | Sales prospecting |
| pulse | gemini-2.5-flash | Research & trends |
| detective-niessen | phi4-mini (local) | Daily security audit 2 AM EST |
| olg | claude-sonnet-4-6 | Content writing |
| bob-the-builder | claude-sonnet-4-6 | Engineering/builds |

### gog Plugin
- **Status:** Removed from all agent allowlists (2026-03-12)
- **Warning loop:** STOPPED as of 18:24 UTC

---

## API ACCESS — Confirmed Working

| Service | Status | Account/Notes |
|---------|--------|---------------|
| Anthropic API | ✅ | Hit zero-balance 2026-03-11 03:00 UTC — add credits |
| YouTube API | ✅ | Configured 2026-02-22 |
| Gmail OAuth | ✅ | atlas.opsman@gmail.com, tokens: credentials/gmail_tokens.json |
| Drive API | ✅ | Working via gog |
| Sheets API | ✅ | Working via gog |
| Calendar API | ✅ | Working via gog |
| Docs API | ✅ | Working via gog |
| Analytics GA4 | ✅ | Dime: 281147332, Newton: 491614945, SCC: 473280391 |
| Search Console | ⚠️ | Enabled, no sites found. Need atlas.opsman@gmail.com added as GSC user |
| People API | ⚠️ | Enabled, but OAuth lacks scope — re-auth needed before use |
| Brave Search | ✅ | Configured 2026-02-23 |
| GitHub | ✅ | https://github.com/BF8thRev/AtlasNorth.git, PAT in ~/.openclaw/.env |

---

## STICKY ITEMS (Active Multi-Day Work — Survive Rotation)

STICKY: Micah Anderson Newton pitch — Ready to send (03-13-26) — Awaiting Bryan go-ahead
STICKY: Capital markets analyst — Book for The Dime (03-13-26) — Hunter prospecting lead required
STICKY: Google Search Console — Add atlas.opsman@gmail.com as GSC user (03-13-26) — Blocking Dime analytics
STICKY: Friday Founder Load cron — Disabled timeout, needs optimization (03-13-26) — Blocked until resolved
STICKY: People API re-auth — OAuth scope missing (03-13-26) — Blocked by scope issue
STICKY: Cron agent ownership audit — 50% complete (03-13-26) — Remaining: fix GitHub push jobs, validate guard
STICKY: Model usage diagnostics — Enabled in config (03-13-26) — Verify spans captured in logs
STICKY: Newton CRM connector tracking — Schema created, Taylor Ladd added (03-13-26) — Waiting for Mikhail → Rugged Roots

---

## GENERAL OPEN ITEMS (as of 2026-03-13)

1. **Add Anthropic credits** — Zero-balance caused 03:00 UTC failure on 2026-03-11

---

## SOUL.md — SINGLE SOURCE OF TRUTH (Formalized 2026-03-13)

**The official identity and operating principles live in ONE place:**
- **Source of Truth:** `mission-control-dashboard/data/vault/SOUL.md` (GitHub)
- **Root Copy:** `/Users/atlasnorth/.openclaw/workspace/SOUL.md` (synced every 30 min)
- **No other SOUL files exist** — all duplicates removed

**What I load at session start:** Root SOUL.md (always in sync with MC vault)

**If SOUL.md changes:**
- Edit in MC vault (GitHub)
- Sync updates root every 30 minutes
- I load updated version on next session

**No duplicates. One identity. One source of truth on MC.**

---

## EXECUTION PROTOCOLS (Active)

- **Observation Mode:** First 14 days — requires "Kiwi" password for execution
- **90% Confidence Rule:** Stop and ask if below threshold
- **10-Time Rule:** Track repetitions before independent execution
- **Max Iteration Limit:** 3 revisions max on any agent output, then escalate to Bryan
