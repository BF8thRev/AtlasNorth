# 2026-03-30

## Dime Episode g-gailey-3_12_26 — SOP Compliance Failure & Fix

**Status:** ARTIFACT DELIVERED BUT NON-COMPLIANT

**Root Cause:** OLG did not follow SOP because SOP enforcement was implicit, not explicit. Two SOP files created confusion.

**Failures Identified:**
1. OLG provided 1 hook option instead of mandatory 3 (SOP violation)
2. OLG did not demonstrate full transcript review before writing
3. All 6 sections not met (partial artifact)
4. Unnecessary sharing permissions added

**Permanent Fix Applied (2026-03-30):**
- **SINGLE SOP FILE ONLY:** `/Users/atlasnorth/.openclaw/workspace/memory/dime/DIME_EPISODE_SOP.md`
- **Spawn Config Rule (Non-negotiable):** Every OLG spawn includes: "Read DIME_EPISODE_SOP.md at `/Users/atlasnorth/.openclaw/workspace/memory/dime/DIME_EPISODE_SOP.md` before doing anything else."
- **No duplicates.** All updates saved to this path only.
- **All 6 section requirements documented explicitly** (no ambiguity)
- **Trigger Flow step 5 enforces:** Full transcript read before ANY writing
- **Audit failure mode:** Any section non-compliant = STOP, report to Atlas, do NOT file

**Next Episode (Mandatory):**
1. Atlas spawns OLG with explicit first instruction: Read SOP at exact path
2. OLG confirms SOP read before starting
3. No output until full transcript read
4. All 6 sections required, all specific requirements met
5. Self-audit before filing
6. Report compliance verification to Atlas
