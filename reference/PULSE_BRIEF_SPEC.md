# PULSE DAILY INTEL BRIEF — Spec v3.0
# Updated: 2026-03-16 | Two-Step Flow
# Step 1 (Pulse, 6 AM): Research + raw intel
# Step 2 (Atlas, 6:15 AM): North Star alignment + content ideas + flags
# Tools: web_search + last30days (Pulse only)
# No other agent handoffs during delivery

---

## Mission
**Find real signals with real company names and real people. Format for Bryan to act on.**

**Flow:**
1. **Pulse (6 AM):** Search internet + last30days for 3-5 signals. Write raw intel to file. Stop.
2. **Atlas (6:15 AM):** Read Pulse output. Add North Star alignment. Add 2 content ideas. Flag action items. Send to WhatsApp.

**No Hunter/OLG involvement until Bryan approves a signal.**

---

## STEP 1: PULSE RESEARCH (6:00 AM EST)

### Mission
Find 3-5 signals with:
- Specific company name
- Specific person name (when relevant)
- Specific pain point or opportunity
- Evidence (news, SEC filing, social mention, funding announcement)

### Research Process

**Run last30days searches (required):**
```
last30days "cannabis extraction operators problems costs margins" --deep
last30days "cannabis industry executives moving companies" --quick
last30days "cannabis MSO distress closures" --quick
last30days "cannabis investment funding rounds 2026" --quick
```

**Cross-reference with:**
- SEC EDGAR (cannabis industry filings, last 7 days)
- LinkedIn executive moves (feed keywords: "extraction", "operations", "cannabis")
- Cannabis Business Times (news past 7 days)
- MJBizDaily (funding, M&A announcements)

**Quality Gate (Non-Negotiable):**
- Every signal has company name ✓
- Every signal has person name OR specific facility/location ✓
- Every signal includes why it matters (1-2 sentences max) ✓
- Every signal cites the source (news outlet, SEC filing, social post) ✓
- No generic industry commentary ✓

### Signal Format (Raw Intel - Pulse Only)

```
## SIGNAL #[N] — [Company Name] [What Happened]

**Company:** [Legal name + state]
**Key Person:** [Name, Title, Company] (if relevant)
**What Happened:** [1 sentence - the concrete fact]
**Why It Matters:** [1-2 sentences - why Bryan should care about this company/person]
**Evidence:** [Source: Publication/Filing, Date]
**Category:** [Newton Operator / Newton Prospect / Dime Guest Potential / Dime Content Angle / Network Opportunity]

---
```

### Example Signals (Template)

```
## SIGNAL #1 — MedMen Michigan Yield Problems

**Company:** MedMen Enterprises (Michigan operations)
**Key Person:** Jake Feldman, VP Operations, MedMen Michigan
**What Happened:** MedMen Michigan posted on LinkedIn about "optimizing extraction yields" - indicating 35-40% yield variance vs. industry standard 50-55%
**Why It Matters:** This is Newton's core wedge - operators losing money on yield variance. MedMen Michigan has 8 extraction systems = $2-4M annual impact.
**Evidence:** Source: LinkedIn, Jake Feldman post March 14, 2026
**Category:** Newton Operator

---

## SIGNAL #2 — Cresco Labs PA Expansion

**Company:** Cresco Labs (Pennsylvania operations)
**Key Person:** Tim Starog, CEO, Cresco Labs
**What Happened:** Cresco announced $12M investment in new PA extraction facility, hiring 15 operations engineers
**Why It Matters:** New facility = new equipment selection opportunity. Newton can position during their equipment budgeting phase.
**Evidence:** Source: SEC filing 8-K, Cresco Labs, March 12, 2026
**Category:** Newton Prospect

---

## SIGNAL #3 — Sarah Johnson (Canopy CFO) Joins Cannabis REIT

**Company:** Canadian Cannabis REIT (new hire)
**Key Person:** Sarah Johnson, former CFO Canopy Growth, now CFO Canadian Cannabis REIT
**What Happened:** Sarah Johnson (cannabis finance expert, 12 years) took CFO role at new REIT focusing on multi-state operator consolidation
**Why It Matters:** Sarah is a credible guest on cannabis investing, REIT structure, operator consolidation. Available for Dime.
**Evidence:** Source: Business Wire, March 10, 2026
**Category:** Dime Guest Potential

---

## SIGNAL #4 — Cannabis Banking Crisis Escalating

**Company:** Credit union consortium (cannabis banking)
**Key Person:** Multiple credit union CEOs (names in article)
**What Happened:** 3 credit unions simultaneously reduced cannabis lending due to federal pressure. Industry sources say "banking consolidation is accelerating."
**Why It Matters:** This is a Dime episode angle - operators are facing banking bottlenecks. Controversial topic. Multiple expert guests available.
**Evidence:** Source: Cannabis Business Times, March 13, 2026
**Category:** Dime Content Angle

---

## SIGNAL #5 — Tobacco Company R&D Hire in Cannabis

**Company:** Altria subsidiary entering cannabis (hypothetical)
**Key Person:** Dr. Michael Chen, former R&D director Marlboro, now VP Innovation Cannabis Division
**What Happened:** Altria announced hiring of senior tobacco R&D leader to head new cannabis innovation lab
**Why It Matters:** Large tobacco player moving serious resources into cannabis. Strategic relationship opportunity for Bryan's personal network.
**Evidence:** Source: Crunchbase, March 12, 2026
**Category:** Network Opportunity

---
```

### Output Format

Save to: `/Users/atlasnorth/.openclaw/workspace/PULSE_DAILY_OUTPUT.md`

Include all signals (3-5) with full structure above. No commentary, no North Star alignment, no content ideas. **Raw intel only.**

---

## STEP 2: ATLAS REVIEW & ALIGNMENT (6:15 AM EST)

### Mission
1. Read Pulse output
2. Add North Star alignment (Newton vs. Dime vs. Network)
3. Add 2 content ideas spun from the signals
4. Flag action items for Bryan to review
5. Format final brief for WhatsApp

### Process

**Read Pulse output:** `/Users/atlasnorth/.openclaw/workspace/PULSE_DAILY_OUTPUT.md`

**For each signal, determine:**
1. North Star alignment (Newton / Dime / Network)
2. Immediate action value (high / medium / low)
3. Who could act on it (Hunter / OLG / Bryan directly)

**Add North Star Context:**
- If Newton: "Wedge: [pain point]. Entry: [contact method]. Hunter action: Research + CRM add"
- If Dime: "Episode angle: [topic]. Guest: [name]. OLG action: Draft LinkedIn outreach"
- If Network: "Relationship value: [strategic fit]. Intro path: [method]. Bryan direct action"

**Generate 2 Content Ideas:**
Pull 2 themes from the 5 signals and create mini content angles Bryan can pitch or execute:

```
CONTENT IDEA #1: [Theme from signals]
Angle: [Specific pitch]
Why it works: [Why this resonates with Dime audience]
Who to tap: [Guest type / guest name if available]

CONTENT IDEA #2: [Different theme]
Angle: [Specific pitch]
Why it works: [Why this resonates]
Who to tap: [Guest type / guest name if available]
```

### Output Format (WhatsApp Brief)

```
📊 PULSE DAILY INTEL — [Weekday, Month DD] (Atlas Review)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 NEWTON PIPELINE
[Signal #1 if Newton operator distress]
North Star Alignment: [Pain point + wedge]
Your Move: [Specific action - call, research, CRM add]
Hunter Flag: [Yes/No - if yes, what to add to Newton CRM]

[Signal #2 if Newton prospect]
North Star Alignment: [Expansion opportunity + entry point]
Your Move: [Specific action]
Hunter Flag: [Yes/No]

---

🎙️ DIME POSITIONING
[Signal #3 if Dime guest]
North Star Alignment: [Guest expertise + episode angle]
Your Move: [Specific action - LinkedIn DM, intro request]
OLG Flag: [Yes/No - if yes, draft LinkedIn outreach]

[Signal #4 if Dime content angle]
North Star Alignment: [Topic + guest type + episode structure]
Your Move: [Specific action - research guests, book, pitch]
OLG Flag: [Yes/No]

---

🤝 PERSONAL NETWORK
[Signal #5 if strategic relationship]
North Star Alignment: [Strategic value + relationship opportunity]
Your Move: [Specific action - intro request, outreach]
Your Direct Action: [Yes/No - should Bryan handle this directly?]

---

💡 CONTENT IDEAS (From Today's Signals)

CONTENT IDEA #1: [Theme]
Angle: [Specific podcast episode or LinkedIn post angle]
Why it works: [Why audience cares]
Who to tap: [Guest type or name if in signals]

CONTENT IDEA #2: [Different theme]
Angle: [Specific angle]
Why it works: [Why audience cares]
Who to tap: [Guest type or name]

---

⚡ PRIORITY ACTION (Next 2 Hours)
[The single highest-value move from today's signals - specific person, specific company, specific action]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

THIS WEEK'S PATTERN:
[1 sentence connecting the dots across signals]

AGENT ACTIONS PENDING YOUR APPROVAL:
- Hunter: [List what Hunter can add to Newton CRM if you approve]
- OLG: [List what OLG can draft if you approve]
- None: [If no agent handoffs needed]
```

### Quality Checklist

Before sending:
- [ ] Every signal has company name ✓
- [ ] North Star alignment clear (Newton / Dime / Network) ✓
- [ ] At least 2 content ideas provided ✓
- [ ] "Your Move" is actionable (not generic) ✓
- [ ] Priority Action is specific (person + company + action) ✓
- [ ] Agent flags are clear (Hunter/OLG actions pending Bryan approval) ✓

---

## CRON JOBS

### Job 1: Pulse Daily Intel (6:00 AM EST)

**Job ID:** ea9220d2-8cd1-4c3c-92fb-37e781b4a24a  
**Agent:** pulse  
**Model:** google/gemini-2.5-flash  
**Schedule:** 0 6 * * 1-5 (Mon-Fri, 6 AM EST)  
**Timeout:** 300 seconds  
**Delivery:** None (writes to file only)

**Payload:**
```
You are Pulse. Research and write raw daily intel.

STEP 1: Run last30days searches
- "cannabis extraction operators problems costs margins"
- "cannabis industry executives moving companies"
- "cannabis MSO distress closures"
- "cannabis investment funding rounds 2026"

STEP 2: Cross-reference with
- SEC EDGAR filings (cannabis, last 7 days)
- LinkedIn executive moves
- Cannabis Business Times (past 7 days)
- MJBizDaily (past 7 days)

STEP 3: Identify 3-5 signals
- Company name (required)
- Person name OR location (required)
- What happened (1 sentence)
- Why it matters to cannabis operators or content (1-2 sentences)
- Evidence + source

STEP 4: Write to file
Format each signal per PULSE_BRIEF_SPEC.md Signal Format.
Output file: /Users/atlasnorth/.openclaw/workspace/PULSE_DAILY_OUTPUT.md

RULES:
- No generic commentary
- No North Star alignment (Atlas does that)
- No content ideas (Atlas does that)
- Raw intel only
- Every signal has company name + person/location + evidence

At session end, log token usage:
bash /Users/atlasnorth/.openclaw/workspace/scripts/log-tokens.sh "$(date -u +'%Y-%m-%dT%H:%M:%SZ')" "google/gemini-2.5-flash" "pulse" "daily-intel-6am" 0 0 0 "research"
```

### Job 2: Atlas Admin — Daily Brief (6:15 AM EST)

**Job ID:** 77b49d60-a1cd-4d53-b574-732b621c23e7  
**Agent:** atlas  
**Model:** anthropic/claude-haiku-4-5-20251001  
**Schedule:** 15 6 * * 1-5 (Mon-Fri, 6:15 AM EST)  
**Timeout:** 120 seconds  
**Delivery:** WhatsApp to +16318775553

**Payload:**
```
You are Atlas. Review Pulse output and add North Star alignment.

STEP 1: Read Pulse output
File: /Users/atlasnorth/.openclaw/workspace/PULSE_DAILY_OUTPUT.md

STEP 2: For each signal, add North Star alignment
- Which North Star? (Newton / Dime / Network)
- What action type? (Research / Outreach / CRM / Guest booking)
- Who should act? (Hunter / OLG / Bryan direct)
- Flag for approval? (Yes/No)

STEP 3: Generate 2 content ideas
Pull 2 themes from the 5 signals.
Create mini content angles Bryan can execute or pitch.
Include: angle, why it works, who to tap.

STEP 4: Identify priority action
The single highest-value move from today's signals.
Specific company + person + action.

STEP 5: Format for WhatsApp
Use the output format in PULSE_BRIEF_SPEC.md (STEP 2 section).
Include:
- Newton signals (if any) + North Star alignment + Hunter flags
- Dime signals (if any) + North Star alignment + OLG flags
- Network signals (if any) + Bryan direct action
- 2 content ideas
- Priority action
- Pattern/synthesis
- Agent actions pending Bryan approval

STEP 6: Send to WhatsApp
Send formatted brief to Bryan Fields (+16318775553)

STEP 7: Log token usage
bash /Users/atlasnorth/.openclaw/workspace/scripts/log-tokens.sh "$(date -u +'%Y-%m-%dT%H:%M:%SZ')" "anthropic/claude-haiku-4-5-20251001" "atlas" "daily-brief-615am" 0 0 0 "ops"
```

---

## Test Run

**Schedule:** Tomorrow (Tuesday, March 17, 6:00-6:20 AM EST)

**Verify:**
1. Pulse runs at 6:00 AM, outputs to PULSE_DAILY_OUTPUT.md ✓
2. Atlas runs at 6:15 AM, reads Pulse output ✓
3. Atlas adds North Star alignment + content ideas ✓
4. Atlas sends formatted brief to WhatsApp ✓

**Success Criteria:**
- 3-5 signals in Pulse output (raw intel)
- Each signal has company name + person/location + evidence
- Atlas brief has North Star alignment for each signal
- 2 content ideas generated and included
- Brief sent to WhatsApp successfully
- Agent flags are clear (Hunter/OLG pending Bryan approval)

---

## No Other Agents

This flow is **Pulse → Atlas only.**

Hunter and OLG are NOT involved in the brief generation or delivery.

Hunter/OLG act **only when Bryan approves** a signal and explicitly requests action.

---

## Files & Structure

**Research specs:** `/Users/atlasnorth/.openclaw/workspace/reference/PULSE_BRIEF_SPEC.md` (this file)  
**Raw intel output:** `/Users/atlasnorth/.openclaw/workspace/PULSE_DAILY_OUTPUT.md`  
**Final brief:** Sent via WhatsApp (also logged in MEMORY.md)  
**Agent actions:** Only when Bryan approves

---

## Approval & Activation

**Before test run (Tuesday 3/17):**
- [ ] Bryan reviews this spec
- [ ] Cron jobs updated to match (6 AM Pulse, 6:15 AM Atlas)
- [ ] last30days access confirmed for Pulse
- [ ] Test run executed

**After test run:**
- [ ] Pulse output reviewed for signal quality
- [ ] Atlas brief reviewed for North Star alignment + content ideas
- [ ] Feedback incorporated (if any)
- [ ] Spec marked ACTIVE
