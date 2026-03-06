# PULSE DAILY INTEL BRIEF — Spec v1.1
# Approved: 2026-03-03 | Updated: 2026-03-04
# Runs: 6:00 AM EST daily
# Delivered: WhatsApp → Bryan Fields
# Author: Pulse (google/gemini-2.5-flash) | Fallback: claude-opus-4-5-20251101

---

## Mission
Five signals. Each one actionable. Delivered before Bryan's day starts.
Built for one person now. Legible to a team later.

---

## Search Categories (daily)

| # | Category | What Pulse Searches | Domain |
|---|---|---|---|
| 1 | Cannabis Policy | State-level regulatory moves, federal rescheduling signals, enforcement actions | Dime + Newton |
| 2 | Market Moves | MSO earnings, funding rounds, M&A, store closures, operator distress | Dime + Newton |
| 3 | Extraction + Tech | C1D1 hardware, hydrocarbon extraction, AI in cannabis operations, lab tech | Newton ICP |
| 4 | Content Trends | What's moving on cannabis Twitter/X, Reddit, LinkedIn — angles before they peak | Dime |
| 5 | Outside-In Signal | Tobacco, pharma, alcohol, or legacy industry doing something cannabis should watch | Dime (always include one) |

---

## Signal Format

Each of the 5 signals follows this structure:

```
[EMOJI] SIGNAL #[N] — [CATEGORY]
[Headline: one sentence — what happened]

[Context: 2-3 sentences. Why it matters. Written with enough narrative
that someone new to the space understands the stakes without needing
to look it up. Not a news summary — an interpretation.]

So what: [One sentence. The real implication for Bryan's world.]
Action: [Specific. Concrete. What should happen next.]
Owner: [Bryan / Dime / Newton / SCC]
```

**Stats rule (set 2026-03-04):**
- If a signal includes a specific stat or data point, cite the source at the bottom of that signal in italics.
- Format: _Source: [Publication/Study name], [Month Year]_
- Purpose: Bryan can verify powerful stats later if needed.

---

## Full Brief Structure

```
PULSE DAILY INTEL — [Weekday, Month DD]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔵 SIGNAL 1 — POLICY
[...]

🟢 SIGNAL 2 — MARKET
[...]

🟡 SIGNAL 3 — NEWTON / EXTRACTION TECH
[...]

🔴 SIGNAL 4 — CONTENT ANGLE
[...]

⚪ SIGNAL 5 — OUTSIDE-IN
[...]
_Source: [cite if stat used]_

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
THIS WEEK'S PATTERN:
[One sentence connecting the dots across all 5 signals.]

PRIORITY ACTION TODAY:
[The single most important move. One sentence. No hedging. Always included — no exceptions.]
```

---

## Tone Guidelines
- More narrative than bullet-point
- Written like a sharp analyst briefing an operator — not a news aggregator
- Each signal should feel interpreted, not just reported
- Avoid jargon unless it's industry-standard
- Compressed but not cold — there's a point of view in every signal

---

## Delivery Rules
- Channel: WhatsApp
- Time: 6:00 AM EST daily
- Recipient: Bryan Fields
- No brief goes out without all 5 signals populated
- If a category has no signal worth surfacing that day, pull a second Outside-In
- Never fabricate data. If a signal can't be sourced, flag it and skip it
- Always cite stats — no unsourced numbers
- PRIORITY ACTION TODAY is mandatory in every brief

---

## Agent Distribution (set 2026-03-04)
After the brief is delivered to Bryan, Pulse immediately distributes the full brief to 4 agents for knowledge gain + context building. Each agent reads the full brief, extracts what's relevant to their role, and logs it to their LEARNINGS file.

### Distribution Pipeline

**OLG — Content Angles**
- Reads: Full brief
- Extracts: Content angles, headline-worthy moments, post opportunities
- Output: Draft LinkedIn post <200 words based on strongest signal → Task Board
- Logs to: DIME_LEARNINGS.md + OLG task queue

**Hunter — Newton Operator Pain Points**
- Reads: Full brief
- Extracts: Operator pain points, distress signals, prospecting hooks from market/tech signals
- Output: 2-3 prospecting hooks → Newton_tasks.md
- Logs to: NEWTON_SALES_ANALYSIS.md

**Spark — Business Ideas & Implications**
- Reads: Full brief
- Extracts: Strategic concepts, untapped angles, business implications from policy/market signals
- Output: 1-2 developed concepts → Spark idea log
- Logs to: GENERAL_LEARNINGS.md

**Dr. Frankl — Market Psychology**
- Reads: Full brief
- Extracts: Psychological patterns, operator mindset signals, coaching context
- Output: Coaching insight or behavioral note
- Logs to: GENERAL_LEARNINGS.md

### Memory Rule
Each agent must update their respective LEARNINGS file after reading each brief.
Context accumulates daily — agents build on prior briefs, not just the current one.
This is how institutional knowledge compounds over time.

---

## Agent Config
- Primary model: google/gemini-2.5-flash
- Fallback model: claude-opus-4-5-20251101
- Requires web search: true
- Governed by: WORKFLOW_AUTO.md, STANDING_INSTRUCTIONS.md

---

## Test Run Protocol (set 2026-03-04)
Per STANDING_INSTRUCTIONS.md: Every new cron or routine requires a test run before going live.
First brief was delivered 2026-03-04 at 6:00 AM EST — ✅ confirmed delivered to Bryan via WhatsApp.
Feedback incorporated into spec v1.1.

---

## Researcher/Director Architecture (set 2026-03-05)
**All routines now follow the Researcher/Director split pattern.**

- **Researcher phase (Pulse):** Research only. Outputs to file. No delivery, no distribution.
- **Director phase (Atlas):** Formats. Sends. Syncs. Registers with Mission Control.

**Rule: All new routines must follow this split and register their status with Mission Control Dashboard immediately upon creation.**

### Registration Protocol
Every new routine automatically gets:
1. An entry in MISSION_CONTROL_ROUTINES.json (auto-generated)
2. Status field: `pending` → `active` → `error` (tracked per run)
3. Last run + next run timestamps
4. Owner (Pulse / Atlas / other agent)

**Implementation:** On routine creation, immediately add to Mission Control Dashboard via cron registration hook.
