# Newton CRM Schema — Clean & Trackable

**Last Updated:** 2026-03-13  
**CRM Link:** https://docs.google.com/spreadsheets/d/1FxH1YnQ93Oj5KAuXv6h0_TrkV5BS6ejNJ4t_q_0i7i8/edit

---

## Column Definitions (Left to Right)

### Prospecting Core
| Column | Type | Purpose | Example |
|--------|------|---------|---------|
| Date | YYYY-MM-DD | When prospect added or intro happened | 2026-03-13 |
| Prospect | First Last | Contact name | Taylor Ladd |
| Company | Text | Target company | Common Citizens |
| Role | Title | Job title at target | Director of Extraction |
| State | US State | Where company operates | CA |
| Email | email | Contact email (if found) | taylor@commoncitizens.com |
| LinkedIn | URL | LinkedIn profile | https://linkedin.com/in/taylor-ladd |

### Intro Source (NEW)
| Column | Type | Purpose | Example |
|--------|------|---------|---------|
| Intro Source | cold / connector_warm / existing | How you know them | connector_warm |
| Connector Name | Text | Who introduced you | Mitch Pfeifer |
| Connector Company | Text | Their company | Active (extraction hardware) |
| Intro Quality | strong / medium / weak | Relationship strength of intro | strong |
| Intro Notes | Text | Context or relationship depth | "Mitch personally endorsed, extraction industry credibility" |
| Dime Episode | Text (optional) | If from podcast | Ep 42: "Extraction Ops" |

### Pipeline Status
| Column | Type | Purpose | Example |
|--------|------|---------|---------|
| Stage | cold / warm / considering / closed | Sales stage | warm |
| Primary Problem | Text | Pain point identified | Yield loss on CO2 extraction |
| Strongest Wedge | Text | Best conversation starter | "Visibility into extraction costs" |
| Last Contact | YYYY-MM-DD | When you last reached out | 2026-03-10 |
| Next Action | Text | What's the move | Schedule 20-min call |
| Owner | Atlas / Bryan / Hunter | Who owns this prospect | Bryan |

### Research (Optional but Helpful)
| Column | Type | Purpose | Example |
|--------|------|---------|---------|
| Company Size | # systems / # locations | Scale signal | 3+ systems |
| Extraction Type | solvent / solventless / both | Their focus | CO2 + ethanol |
| Notes | Free text | Any intel | "Funding round planned Q3" |

---

## Filter Views (For Easy Navigation)

### View 1: Cold Pipeline
**Filter:** `Intro Source = cold` OR `Intro Source = [blank]`  
**Use:** Hunter prospecting list. Focus on research.

### View 2: Warm Intro Pipeline ⭐
**Filter:** `Intro Source = connector_warm`  
**Use:** Your connector-driven warm list. Highest conversion potential.  
**Columns shown:** Prospect | Company | Connector | Intro Quality | Stage | Next Action

### View 3: Active Conversations
**Filter:** `Stage = warm` OR `Stage = considering`  
**Use:** Who to follow up with this week.

### View 4: Closed (Wins + Losses)
**Filter:** `Stage = closed`  
**Use:** What worked, what didn't.

---

## How to Use

### When a cold prospect is added (Hunter):
- Fill: Date | Prospect | Company | Role | State | Email | LinkedIn
- Set: Stage = "cold"
- Leave Intro Source blank

### When you get a connector intro (Bryan):
- **New row** OR **update existing row**
- Fill: Intro Source = "connector_warm"
- Fill: Connector Name | Connector Company | Intro Quality | Intro Notes
- Set: Stage = "warm" (or "considering" if already warm)
- Fill: Primary Problem (if known) | Strongest Wedge | Next Action

### Weekly (Bryan/Atlas):
- Review "Active Conversations" view
- Update Last Contact
- Update Next Action
- Move to "closed" when deal closes or goes dormant

---

## Example Entries

### Example 1: Mitch Pfeifer (Connector)
```
Date: 2026-03-13
Prospect: [TBD - contacts he introduces]
Company: [TBD - contacts he introduces]
Intro Source: connector_warm (as a source, not a prospect)
Connector Name: Mitch Pfeifer
Connector Company: Active (extraction hardware)
Intro Quality: strong
Intro Notes: "Extraction industry hardware expertise. Early mover in consolidation. Trusted by operators."
Stage: active_connector
Owner: Bryan
```

### Example 2: Mikhail Sagal (Connector)
```
Date: 2026-03-13
Prospect: [Rugged Roots - contact pending]
Company: Rugged Roots
Role: [TBD]
Intro Source: connector_warm
Connector Name: Mikhail Sagal
Connector Company: TSRGrow (lighting)
Intro Quality: strong
Intro Notes: "Mikhail has lighting relationship with Rugged Roots. Not yet introduced but contact available."
Stage: pending_intro
Next Action: "Ask Mikhail for Rugged Roots contact intro"
Owner: Bryan
```

### Example 3: Taylor Ladd (Warm Intro)
```
Date: 2026-03-13
Prospect: Taylor Ladd
Company: Common Citizens
Role: Director of Operations (assumed)
State: CA
Intro Source: connector_warm
Connector Name: Mitch Pfeifer
Connector Company: Active (extraction hardware)
Intro Quality: strong
Intro Notes: "Mitch introduced Taylor and vouched for credibility. Extraction operations focus."
Stage: warm
Primary Problem: "Extraction cost visibility + yield loss"
Strongest Wedge: "Real-time visibility into CO2 extraction costs and output"
Next Action: "20-min diagnostic call to understand current ops"
Owner: Bryan
Last Contact: 2026-03-13
```

---

## Connector Tracking (Added 2026-03-13)

### Active Connectors

| Connector | Company | Industry | Relationship | Intro Capacity | Status |
|-----------|---------|----------|---------------|-----------------|--------|
| Mitch Pfeifer | Active | Extraction Hardware | Strong | 3-5 per quarter | active |
| Mikhail Sagal | TSRGrow | Lighting | Strong | 2-3 per quarter | pending_intros |

**Connector Intel:**
- **Mitch Pfeifer:** Extraction hardware consolidation player. Knows operators at scale. Can refer high-quality ops leaders.
- **Mikhail Sagal:** Lighting tech. Has connection into Rugged Roots (operations-focused). Potential bridge to other operations teams.

**Next Steps:**
- Ask Mikhail for Rugged Roots intro
- Ask Mitch for next 2-3 introductions (prioritize multistate MSOs with margin pressure)

---

## Rules

✅ **DO:**
- Update **Intro Source** immediately when a warm intro happens
- Log **Connector Name** and **Company** (track quality of connector over time)
- Use **Intro Quality** (strong/medium/weak) to weight follow-up urgency
- Keep **Next Action** current (CRM is useless if next step is fuzzy)

❌ **DON'T:**
- Mix cold and warm in the same row; update stage clearly
- Leave **Last Contact** blank; update whenever you reach out
- Forget to log **Connector Name** (we need to track which connectors drive value)
- Leave **Primary Problem** empty on warm prospects (should be known after intro)

---

## Dashboard View (For Quick Briefings)

**Warm Pipeline Summary:**
- Total warm prospects: [count]
- By connector: [Mitch: X | Mikhail: X | Other: X]
- Pending intros: [count]
- Next actions this week: [list]
- Close rate target: [20% of warm → close within 30 days]

