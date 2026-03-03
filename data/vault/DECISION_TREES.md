# DECISION_TREES.md
_Last Updated: 2026-03-02 | Version: 1.0_

## Tree 1: Incoming Task Routing

```
Incoming task from Bryan
        ↓
Is confidence ≥ 90%?
  NO  → Stop. Message Bryan with specific ambiguity. Wait.
  YES → Continue
        ↓
Is Observation Mode active?
  YES → Is this Strategic Channel (analyze/propose/flag)?
          YES → Proceed without Kiwi
          NO  → Show plan. Ask for Kiwi. Wait.
  NO  → Continue
        ↓
Classify task type:
  Research/Trends    → Pulse
  Concept/Ideation   → Spark (fed by Pulse)
  Writing            → Olg
  Engagement/Distrib → Rob C
  Sales/Outreach     → Hunter
  Data/Analytics     → Ledger
  Build/Code         → Bob the Builder
  Security           → Detective Niessen
  Coaching/Clarity   → Dr. Frankl
  Decision review    → Voss + Ledger + Atlas
        ↓
Agent produces output
        ↓
Atlas reviews (revision count: 1)
  PASS → Deliver to Bryan
  FAIL → Revise (max 3x)
        ↓ (after 3 fails)
Escalate to Bryan with: task / output / why it failed / recommendation
```

## Tree 2: Memory Update Decision

```
Task completed?
  YES →
    1. Append to ATLAS_MEMORY_EXPORT.txt
    2. Update WORKFLOW_STATE.json
    3. Log tokens to token-log.json
    4. Did Bryan approve/reject/edit output?
         YES → Update BRYAN_PROFILE.md
    5. Did a new behavioral pattern emerge?
         YES → Is this 3rd+ occurrence?
                 YES → Add to ENGAGEMENT_RULES.md
                 NO  → Log as weak signal in CALIBRATION_NOTES.md
```

## Tree 3: Content Decision (The Dime)

```
New episode or short?
        ↓
Check DIME_AUDIENCE_INTELLIGENCE.md
        ↓
Title format:
  Use declarative → 67% strong rate
  Avoid colon-subtitle → only 15% strong rate
        ↓
Does it imply CONSEQUENCE?
  NO  → Rewrite until it does
  YES → Proceed
        ↓
Long-form: Operations/Scale theme (avg 391 views), Finance/Market ceiling 593+
Shorts: Science/Tech theme (avg 200 views)
        ↓
Outside-in framing (Tobacco/Pharma/AI lens)?
  YES → Reach multiplier — prioritize
```

## Tree 4: Build Request

```
Build request received
        ↓
Give time estimate FIRST. No exceptions.
Format: "Estimated time: X minutes. Starting now."
        ↓
Is this Bob the Builder's domain?
  YES → Route to Bob. Log as Bob's task.
        ↓
Does it touch live systems (Vercel, GitHub, prod)?
  YES → Show plan. Get Kiwi. Then execute.
        ↓
Post-build: update token-log, ATLAS_MEMORY_EXPORT, push to GitHub
```
