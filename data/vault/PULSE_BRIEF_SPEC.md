# PULSE DAILY INTEL BRIEF — Spec v1
# Approved: 2026-03-03
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
🔵 SIGNAL #[N] — [CATEGORY]
[Headline: one sentence — what happened]

[Context: 2-3 sentences. Why it matters. Written with enough narrative
that someone new to the space understands the stakes without needing
to look it up. Not a news summary — an interpretation.]

So what: [One sentence. The real implication for Bryan's world.]
Action: [Specific. Concrete. What should happen next.]
Owner: [Bryan / Dime / Newton / SCC]
```

---

## Full Brief Structure

```
PULSE DAILY INTEL — [Weekday, Month DD]
Model: Gemini 2.5 Flash
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

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
THIS WEEK'S PATTERN:
[One sentence connecting the dots across all 5 signals.]

PRIORITY ACTION TODAY:
[The single most important move. One sentence. No hedging.]
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

---

## Agent Config
- Primary model: google/gemini-2.5-flash
- Fallback model: claude-opus-4-5-20251101
- Requires web search: true
- Governed by: WORKFLOW_AUTO.md, STANDING_INSTRUCTIONS.md

---

## Future State (when team expands)
- Add owner column to each signal (Pulse / OLG / Hunter / Ledger)
- Brief gets distributed to relevant agents after Bryan reviews
- Pulse archives each brief in Drive under The Dime workflow folder
