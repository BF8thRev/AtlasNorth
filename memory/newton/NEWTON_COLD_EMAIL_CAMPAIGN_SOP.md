# Newton Cold Email Campaign SOP

**Created:** 2026-03-08  
**Status:** Active (Controlled Run: 10 Ops Leaders)  
**Category:** [Newton] — Sales Operations  
**Related:** NEWTON_PROSPECTS_SOP.md (research & writing standards)

---

## Purpose

This SOP defines how to execute a coordinated cold email campaign for Newton Insights. It covers:
- Data flow (Prospect List → Newton CRM → Tracking)
- Roles & responsibilities (Atlas / Hunter / Bryan)
- Controlled run process (segmentation, drafting, sending, tracking)
- CRM management and response handling

**For email writing standards, see:** NEWTON_PROSPECTS_SOP.md

---

## 1. Campaign Architecture — Three-Person Workflow

### **Role 1: Atlas (Message Strategy & Drafting)**
- Segment prospects by persona (Ops Leader, Lab Manager, Extraction Specialist, etc.)
- Research 10 selected prospects (company context, extraction type, pain points)
- Draft 3 email variations (Feedback Loop / Baseline Shift / Cost Savings angles)
- Calibrate tone to Bryan's voice patterns
- Match messaging to NEWTON_STYLE_GUIDE.md standards
- Provide draft for Bryan review

### **Role 2: Hunter (CRM & Operations)**
- Load prospects into Newton CRM (name, company, role, email, LinkedIn, etc.)
- Maintain Newton CRM as single source of truth for all prospects
- Track prospect status (Cold → Warm → Considering → Objecting → Won/Lost)
- Log responses, objections, objection categories, next actions
- Update response rate, conversion metrics, objection patterns
- Provide feedback on which personas/angles drive replies
- Support Bryan with research questions during conversations

### **Role 3: Bryan (Sender & Operator)**
- Receive drafted email variations
- Review & provide feedback on tone/angle/positioning
- Personalize each email (name, company-specific detail, custom hook)
- Send cold emails from your email account
- Track initial responses and first-conversation signals
- Provide feedback to Atlas on what resonates
- Conduct first conversations (10-15 min calls, if engaged)

---

## 2. Newton CRM — Structure & Ownership

**Sheet Link:** https://docs.google.com/spreadsheets/d/1FxH1YnQ93Oj5KAuXv6h0_TrkV5BS6ejNJ4t_q_0i7i8/edit

**Column Headers:**
| Field | Type | Owner | Notes |
|-------|------|-------|-------|
| Date | Date | Hunter | When prospect was added |
| Prospect | Text | Hunter | First Name, Last Name |
| Company | Text | Hunter | Company name |
| Role | Text | Hunter | Job title (Director of Ops, VP Extraction, etc.) |
| Email | Email | Hunter | Primary contact email |
| LinkedIn | URL | Hunter | LinkedIn profile link |
| State | Text | Hunter | Geography |
| Persona | Dropdown | Atlas (initial) | Ops Leader / Lab Manager / Extraction Specialist / Tech Operator |
| Stage | Dropdown | Hunter | Cold / Warm / Considering / Objecting / Won / Lost / Not ICP |
| Primary Problem | Text | Atlas (initial) | Pain point identified (visibility gap, yield attribution, margin pressure) |
| Strongest Wedge | Dropdown | Atlas (initial) | Operational / Economic / Leadership / Compliance |
| Message Type | Text | Hunter | Email version sent (Feedback Loop / Baseline Shift / Cost Savings) |
| Message Sent Date | Date | Hunter | When email was sent |
| Response | Dropdown | Hunter | Yes / No / Pending |
| Response Type | Text | Hunter | Reply, call back, no response, bounce, etc. |
| Objection Category | Text | Hunter | (if applicable) Budget / Prior tool / Operator resistance / Skeptical / Other |
| Objection Detail | Text | Hunter | Specific objection stated |
| Next Action | Text | Hunter | Follow-up type (email, call, wait, nurture, etc.) |
| Next Action Date | Date | Hunter | Scheduled follow-up date |
| Notes | Text | Hunter | Context, conversations, insights |

**Ownership Rule:** Hunter manages all CRM updates. Atlas provides initial persona/problem/wedge. Bryan provides response intel.

---

## 3. Controlled Run Process — 10 Ops Leaders

### **Phase 1: Prospect Selection & Research (Atlas)**

**Timeline:** Hour 0-1

**Input:** Prospect list CSV (300+ contacts)

**Selection Criteria:**
- Title: VP Operations, Director of Extraction, Director of Manufacturing, Head of Operations, COO, Chief Operations Officer
- Company: Multi-location cannabis extraction, solvent-based (butane, CO2, ethanol)
- Size signal: 2+ extraction systems OR multi-facility operations
- Margin pressure: MSO structure, established operation, visible scale

**Output:** 10 Ops Leaders with:
- Name | Company | Role | Email | LinkedIn
- Extraction type | Facility size estimate | Recent news/context
- Primary pain point (hypothesis)
- Strongest wedge for messaging

### **Phase 2: Newton CRM Load (Atlas → Hunter)**

**Timeline:** Hour 1-1.5

**Input:** 10 researched prospects

**Output:** Newton CRM populated with:
- Name | Company | Role | Email | LinkedIn
- State | Persona (Ops Leader) | Stage (Cold)
- Primary Problem | Strongest Wedge
- All other fields blank (to be populated by Hunter on send/response)

---

### **Phase 3: Email Drafting (Atlas)**

**Timeline:** Hour 1.5-3

**Framework:** 3 Variations (all use Mitchell Osak Substack as hook)

**Variation 1: Feedback Loop Angle**
- Opens with: "Read this piece on feedback loops in extraction"
- Core insight: Delayed feedback (5-7 days) = cost compounding
- Positions Bryan as operator quoted in article
- CTA: "How long from batch start to clear understanding of why yield moved?"
- Tone: Technical, process-focused

**Variation 2: Baseline Shift Angle**
- Opens with: "Extraction is constant tradeoffs, but the risk is not seeing when they change"
- Core insight: Small shifts compound; issue is visibility not effort
- Positions Bryan as someone who sees blind spots
- CTA: "When was the last time something changed mid-run and you caught it too late?"
- Tone: Operational, pattern-focused

**Variation 3: Cost Savings Angle**
- Opens with: "Your facility probably has hard cost savings hiding — usually in process visibility"
- Core insight: Feedback loop compression is where savings begin
- Positions Bryan as person thinking about margin preservation
- CTA: "What's one assumption in your SOPs you've never been able to challenge?"
- Tone: Economic, strategic

**All 3 variations:**
- Length: 50-70 words
- Voice: Direct, conversational, operator-to-operator
- No marketing language
- No scheduling links in CTA
- Reference Mitchell Osak article by name + URL
- Mention Bryan Fields / Newton naturally

**Source Material:**
- Hook: https://mitchellosak.substack.com/p/cannabis-cost-savings-hiding-in-plain (feedback loop delay, real-time visibility, trade-offs, margin preservation)
- Style: NEWTON_STYLE_GUIDE.md (tone, forbidden phrases, email structure)
- Voice: Extracted from Bryan Fields' natural emails (direct, specific, conversational)

### **Phase 4: Review & Iteration (Bryan)**

**Timeline:** Hour 3 (before send)

**Input:** 3 draft variations + 10 prospect CRM load

**Output:** Approved versions ready to personalize + send

**Review Questions:**
- Does tone match how you naturally write?
- Do the CTAs feel authentic to your voice?
- Any angle missing or weak?
- Any prospect you want to swap or research differently?

**Max iterations:** 1-2 cycles (goal = send within same day)

### **Phase 5: Personalization & Send (Bryan)**

**Timeline:** Same day (after approval)

**For each of 10 prospects:**
1. Choose which variation fits them best (or blend)
2. Add: prospect name, company name, specific detail (recent news, facility size detail, extraction type context)
3. Send from your email
4. Log in Newton CRM: Message Sent Date, Message Type, Stage → Sent

### **Phase 6: Response Tracking (Hunter)**

**Timeline:** Ongoing (days 1-7)

**For each prospect:**
- Monitor inbox for reply
- Log in Newton CRM: Response (Yes/No), Response Type, Date
- If objection stated: Log Objection Category + Detail
- If positive signal: Update Stage (Warm), set Next Action (call, email follow-up)
- If no response after 3 days: Log as Pending, set reminder for day 5 follow-up

**Metrics to track:**
- Reply rate (target: 15-25% for cold B2B)
- Positive response rate
- Objection patterns (which wedges get resistance?)
- Which persona responds best (Ops Leaders vs. others)
- Which email angle drives engagement

---

## 4. Prospect Segmentation — Persona Definitions

**Focus for Controlled Run: Ops Leaders Only**

### **Ops Leader (TARGET FOR THIS RUN)**
- **Titles:** VP Operations, Director of Operations, Director of Extraction, Head of Manufacturing, COO, Chief Operations Officer
- **Decision Level:** Strategic (can greenlight $5K+ investment)
- **Pain:** Can see blind spots → Knows variability is expensive → Authority to change
- **Wedge:** Leadership pain — "You can't see what's really causing yield swings"
- **Message Angle:** Visibility + control, leadership confidence
- **CTA Fit:** Questions about yield variance, process control, team alignment

---

## 5. Information Integrity — Cold Email Rules

**MUST:**
- ✅ Research prospect company before sending
- ✅ Reference published piece (Mitchell Osak article is verification)
- ✅ Keep claims to observable facts (feedback loop delay, visibility gap, trade-off uncertainty)
- ✅ Position Newton honestly (visibility platform, not optimization guarantee)
- ✅ Acknowledge cold nature implicitly (no pretending you know them)

**NEVER:**
- ❌ Fabricate data or false claims
- ❌ Assume prospect's specific problems without research
- ❌ Promise results Newton hasn't proven
- ❌ Use pushy sales language
- ❌ Send without prospect research

---

## 6. Campaign Tracking & Metrics

**Primary Metrics (after 10 emails sent):**
| Metric | Target | Owner |
|--------|--------|-------|
| Reply Rate | 15-25% | Hunter |
| Positive Response Rate | 3-5 replies (30-50% of replies) | Hunter |
| Objection Pattern | Notes by category | Hunter |
| Best Persona | Which role responds? | Hunter + Atlas |
| Best Angle | Which variation gets replies? | Hunter + Atlas |

**Reporting:** Weekly update (response patterns, objection themes, iteration recommendations)

---

## 7. Iteration & Next Cycle

**After 10 emails have been out 5+ days:**

**Pause & Review:**
- What worked? (which angle, which persona, which wedge resonated)
- What didn't? (silence, specific objections, wrong fit)
- Refinements needed? (tone tweak, angle adjustment, persona shift)

**Next Cycle (if warranted):**
- Select 10 different prospects (next persona: Lab Managers)
- Refine email angles based on learnings
- Repeat Phase 3-6

---

## 8. Related Documents & Resources

**Prospect Research & Email Writing Standards:**
- NEWTON_PROSPECTS_SOP.md — How to research and write prospect emails
- NEWTON_STYLE_GUIDE.md — Writing tone, forbidden phrases, email structure
- NEWTON_ICP.md — Ideal customer profile, buying triggers, objections
- NEWTON_SALES_MEMO.md — Sales approach, objection handling, nurturing

**External References:**
- Mitchell Osak Substack: https://mitchellosak.substack.com/p/cannabis-cost-savings-hiding-in-plain
- Newton CRM Sheet: https://docs.google.com/spreadsheets/d/1FxH1YnQ93Oj5KAuXv6h0_TrkV5BS6ejNJ4t_q_0i7i8/edit
- Newton GDrive Folder: https://drive.google.com/drive/folders/120H543ex-nt1RVDQ7WI1Ookam_My5aR9

**Where This Fits:**
- See STANDING_INSTRUCTIONS.md → "🎯 NEWTON COLD EMAIL CAMPAIGN WORKFLOW"

---

## 9. Controlled Run Status

**Run ID:** 10 Ops Leaders (Batch 1)  
**Start Date:** 2026-03-08  
**Phase:** Prospect Selection & Research  
**Owner:** Atlas  
**Next Checkpoint:** 1 hour from start  

---

**Checklist Before Send:**
- ✅ 10 Ops Leaders selected + researched
- ✅ Newton CRM loaded with prospect data
- ✅ 3 email variations drafted (matching Bryan's voice)
- ✅ Bryan reviews + approves tone
- ✅ Emails personalized with prospect-specific details
- ✅ 10 emails sent from Bryan's account
- ✅ Hunter begins tracking responses

---

**Document Owner:** Atlas  
**Last Updated:** 2026-03-08 17:55 EST  
**Next Review:** After first 10 responses logged
