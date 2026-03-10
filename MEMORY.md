# Atlas Long-Term Memory

## ORGANIZATION RULE: Single Source of Truth
**This file contains FACTS & EVENTS ONLY** (dated updates, statuses, outcomes, confirmations).

For permanent rules, procedures, and protocols → See **STANDING_INSTRUCTIONS.md**

---

## NORTH STAR STRATEGY (Confirmed 2026-03-08 00:45 EST)

**Critical Strategic Alignment — All Work Flows Through These 3:**

### 1. The Dime — Connector Platform
**Goal:** Be the connector. Follow curiosity across verticals. Every episode = relationship deepening + idea generation + platform for others. Content as trust signal + networking magnet.

**Operating Principles:**
- Guest selection: Curiosity first, quality + relationship potential second
- Episode framing: "What are you thinking about?" (deeper conversations, not pitches)
- Distribution: Shorts go to network as relationship signal. Long-forms are connector tools.
- Follow-up: Every guest → 3-5 intros you could make for them
- Metrics: Relationship depth, intro velocity, Newton pipeline, industry perception (NOT view counts)

**Success Signal:** Position as THE networked operator in cannabis + adjacent verticals

### 2. Newton — Warm Pipeline
**Goal:** More prospects, more customers. Sourced from Dime relationships + warm intro authority.

**Operating Principle:** 
- Cold/spray tactics don't work (operators buy from trust, not strangers)
- Dime is Newton's customer acquisition engine
- Guest leverage: position guests as natural Newton candidates → warm intro post-episode

**Success Signal:** Pipeline filled with warm, qualified prospects from Dime ecosystem

### 3. Personal — Network Moat
**Goal:** Build a network moat. Be known as the person who knows everyone and makes things happen.

**Operating Principle:** Relationships compound. Connectors create opportunities for others → reciprocal value.

**Success Signal:** Industry perception as THE connector + leverage platform for future ventures

---

**Integration Rule:** These 3 are interdependent. Dime → Newton pipeline. Dime relationships → personal moat. Personal moat → deeper Dime relationships. Not separate tracks.

---

## Workspace Reorganization — Token Optimization (Updated 2026-03-07 14:15 EST)

**COMPLETED:** Moved 39 reference files to memory/ folder to reduce auto-load bloat.

**Files Moved to memory/:**
- **DIME:** DIME_LEARNINGS.md, DIME_AUDIENCE_INTELLIGENCE.md, DIME_MISSION.md, DIME_STRATEGY_WIKI.md, DIME_STYLE_GUIDE.md, DIME_VICTORY_FAILURE_LOG.md
- **NEWTON:** NEWTON_SALES_PLAYBOOK.md, NEWTON_SALES_ANALYSIS.md, Newton_LinkedIn_outreach_FL_MI.md, Newton_prospects_FL_MI.md, Newton_tasks.md
- **GENERAL:** GENERAL_LEARNINGS.md, GENERAL_STYLE_GUIDE.md, GENERAL_TASKS.md
- **PROSPECT RESEARCH:** future4200_* (6 files), ROSTER.md, HUNTER_RESEARCH_OUTPUT.md, JB_followup_draft.md
- **OUTPUT/REFERENCE:** PULSE_DAILY_OUTPUT.md (later reverted), PULSE_WEEKEND_SAT_OUTPUT.md (later reverted), PULSE_WEEKEND_SUN_OUTPUT.md (later reverted), ATLAS_SOUL.md, ATLAS_MEMORY_EXPORT.txt
- **AGENT SYSTEMS:** OLG_SYSTEM.md, ROB_C_SYSTEM.md, ROUTINE_CREATION_SOP.md, ENGAGEMENT_RULES.md, DECISION_TREES.md, CALIBRATION_NOTES.md, BRYAN_PROFILE.md

**Token Impact:** Root workspace context reduced from ~65K to ~15K input tokens per cron session (77% reduction).

**IMPORTANT FIX:** Reverted 3 OUTPUT files back to root (PULSE_*_OUTPUT.md) on 2026-03-07 14:30 EST because:
- Cron jobs read/write these files multiple times daily
- Memory/ folder auto-excluded from context loads
- Daily/Weekend briefs need fast access to these files

**Files Remaining in Root (Essential Layer):**
- SOUL.md (6.0K) — Atlas identity & core instructions
- MEMORY.md (11K) — this file, facts only
- AGENTS.md — agent skill registry
- IDENTITY.md, USER.md, HEARTBEAT.md — system metadata
- STANDING_INSTRUCTIONS.md (16K) — procedures & rules
- OUTPUT FILES: PULSE_DAILY_OUTPUT.md, PULSE_WEEKEND_SAT_OUTPUT.md, PULSE_WEEKEND_SUN_OUTPUT.md (written daily by crons)
- 6 other essential reference files

**Files Moved to memory/ (Fetched On-Demand, 2026-03-08):**
- PULSE_BRIEF_SPEC.md — cron job specifications
- WEEKEND_BRIEF_SPEC.md — weekend cron job specifications
- YOUTUBE_CONTENT_CATALOG.md — live feed data (written by crons)

**Git Commits:**
- Commit 80025be — Move reference files to memory/ (2026-03-07 13:49 EST)
- Commit dc81938 — Revert OUTPUT files to root, disable Friday Founder cron (2026-03-07 14:11 EST)

---

## Cron Configuration — Model Routing (Updated 2026-03-06 22:57 EST)

**Normalized all cron jobs to match MODEL_ROUTER.json assignments:**
- Pulse Daily/Weekend research (all days) → google/gemini-2.5-flash (fixed Sat/Sun from sonnet-4-6)
- Brief Format & Send (all days) → claude-haiku-4-5-20251001 (fixed Sat/Sun from sonnet-4-6)
- YouTube Content Rating → claude-sonnet-4-20250514 (fixed from haiku — reasoning required for ramp curves)
- Friday Founder Load → claude-sonnet-4-20250514 (already correct, timeout 300s)
- YouTube Content Catalog → claude-haiku-4-5-20251001 (already correct)

**Routing rule enforced:** Same task type = same model, regardless of day or schedule.

## PULSE BRIEF PROTOCOL UPDATE (Updated 2026-03-09 17:50 EST)

**Changed:** Removed Item 1 approval gate. Pulse now sends full brief directly to Atlas (not Bryan).

**New workflow:**
1. Pulse generates FULL daily brief at 8 AM EST (no partial drafts)
2. Pulse delivers to Atlas (internal review only)
3. Atlas reviews for quality/fit
4. **Atlas sends final brief to Bryan** (single delivery, no Pulse WhatsApp notifications)
5. No approval gate — Pulse publishes complete brief to Atlas automatically

**Why:** Streamline brief delivery, reduce approval loops, single entry point (Atlas) for Bryan's inbox.

**Config:** Updated locations:
- Removed from Atlas SOUL.md (Operational Protocols sections)
- **Added to Pulse SOUL.md** (new section: "DAILY BRIEF OUTPUT PROTOCOL")
  - Defines full workflow, no-hold policy, delivery target (Atlas only)
  - No Bryan WhatsApp notifications
  - Autonomous publication at 8 AM EST

---

## DIME GUEST AUDIT — Extraction Operators for Newton (Updated 2026-03-09 21:32 EST)

**TASK #2 COMPLETE**

**Last 15 episodes audited (2026-02-09 to 2026-03-09):**

| Episode | Guest | Topic | Newton Fit | Pitched? |
|---------|-------|-------|-----------|----------|
| 2026-03-08 | Micah Anderson (LEEF Brands) | Prop 64 + Extraction Ops | ⭐⭐⭐ HIGH | ❌ NO |
| 2026-03-01-04 | Jonathan Black (Cheech & Chong) | Multi-state brand + ops | ⭐⭐ MEDIUM | ✅ YES (warm intro SOP) |
| 2026-02-22-25 | Eric Rogers + Kristin Rogers (Levia) | Beverage distribution | ⭐ LOW | ❌ NO |
| 2026-02-15-17 | Trent Woloveck | Vertical integration, genetics, 280E | ⭐⭐ MEDIUM | ❌ NO |
| 2026-02-09-10 | John Shute (MBA) | Brand economics | ⭐ LOW | ❌ NO |

**Action:** Micah Anderson is ready for Newton pitch. Extraction ops expert. Regulatory deep-dive. Not yet introduced to product.

---

## CAPITAL MARKETS ANALYST GUEST — Need To Book (Updated 2026-03-09 21:32 EST)

**TASK #3 STATUS: WAITING**

**Finding:** Last 15 episodes contain NO dedicated capital markets analyst.

**Content Performance Data:**
- "Is SNDL a Silent Giant?" — 593v, 5.6% like ratio (HIGH engagement)
- "Tier 1s, Cannabis Debt Crisis, 2026 Reset" — 438v, 5.7% ratio (HIGHEST)
- Finance content = highest engagement ceiling on The Dime

**Recommendation:** Book someone covering:
1. Public cannabis valuations (SNDL, CGC, Tilray, Curaleaf)
2. Tier-1 operator debt structures + capital access
3. 2026 market reset thesis

**Suggested sources:** Brightfield Group analyst, Dope Stocks equity researcher, Marijuana Policy Group capital analyst. Details pending Bryan decision.

---

## Cron Job Status — File Path Audit (Updated 2026-03-07 14:30 EST)

**CRITICAL FIX APPLIED:** All cron jobs verified for valid file paths after workspace reorganization.

**Active Cron Jobs (9 total):**

| Job | Schedule | Status | File References | Notes |
|-----|----------|--------|-----------------|-------|
| YouTube Catalog | Daily 11 PM | ✅ OK | → YOUTUBE_CONTENT_CATALOG.md (root) | Writes to root |
| Pulse Daily Research | Weekdays 6 AM | ✅ OK | → PULSE_DAILY_OUTPUT.md (root, reverted) | Reverted from memory/ |
| Daily Brief Format | Weekdays 6:15 AM | ✅ OK | ← PULSE_DAILY_OUTPUT.md (root) | Reads from root |
| Daily Brief 8 AM | Weekdays 8 AM | ⚠️ DELIVERY ERROR | → MORNING_BRIEF.md (root) | Not file-related error |
| Pulse Sunday Research | Sunday 7 AM | ✅ OK | → PULSE_WEEKEND_SUN_OUTPUT.md (root, reverted) | Reverted from memory/ |
| Sunday Brief Format | Sunday 7:15 AM | ✅ OK | ← PULSE_WEEKEND_SUN_OUTPUT.md (root) | Reads from root |
| Pulse Saturday Research | Saturday 7 AM | ✅ OK | → PULSE_WEEKEND_SAT_OUTPUT.md (root, reverted) | Reverted from memory/ |
| Saturday Brief Format | Saturday 7:15 AM | ✅ OK | ← PULSE_WEEKEND_SAT_OUTPUT.md (root) | Reads from root |
| YouTube Rating | Tuesday 10 AM | ✅ OK | → podcast-reviews.json (root) | Rates episodes, syncs to MC |

**Disabled Cron Jobs (1 total):**

| Job | Schedule | Status | Reason |
|-----|----------|--------|--------|
| Friday Founder Load | Friday 11 AM EST | ❌ DISABLED | Timeout (120s exceeded), references moved LEARNINGS files. Re-enable after fixing SOUL.md → memory/ reference issue |

**Key Rules:**
- All active jobs reference files in root workspace only
- OUTPUT files (PULSE_*_OUTPUT.md) must stay in root — written/read multiple times daily by crons
- Reference files (LEARNINGS, prospect research, agent systems) safely moved to memory/
- Next OUTPUT file move = automatic revert (happened 2026-03-07)

---

## Subagent Status — Production Readiness (Updated 2026-03-06 15:19 EST)

### Pulse (Research & Trends)
- ✅ Loads own SOUL.md at session start (confirmed 2026-03-06)
- ✅ Loads own IDENTITY.md at session start (confirmed 2026-03-06)
- ✅ Confirms identity in output (states core principle + role)
- ✅ Auto-writes to own MEMORY.md at session end (confirmed 2026-03-06)
- ✅ MEMORY.md row successfully appended (no overwrites, data preserved)
- **Status: PRODUCTION READY** ✅

### Hunter (Sales & Revenue)
- ✅ Loads own SOUL.md at session start (confirmed 2026-03-06)
- ✅ Loads own IDENTITY.md at session start (confirmed 2026-03-06)
- ✅ Confirms identity in output (states core principle + role, clarifies vs. Atlas)
- ✅ Runs prospect research independently (Cresco Labs: financials, pain points, wedges, objections)
- ✅ Auto-writes to own MEMORY.md at session end (confirmed 2026-03-06 15:18:41)
- ✅ MEMORY.md row successfully appended (Prospect Pipeline table updated)
- **Status: PRODUCTION READY** ✅

---

## Bryan Fields Profile
- Owner and user of Atlas assistant
- Runs The Dime podcast (YouTube: UCcck3tzBNXrJ1WJ8EtIVq1w)
- Leads Newton Insights product (extraction visibility/AI cost control)
- Prefers clear, bulleted communication
- Located in EST timezone (New York, NY)
- Decision-maker on: product direction, content strategy, sales approach, hiring
- Communication: Direct, executive-to-partner cadence, no assistant language

## Key Strategic Priorities (Active)
1. **The Dime:** Connector platform + relationship deepening (episodes drive Newton pipeline + personal network)
2. **Newton:** Warm pipeline from Dime relationships + verification of extraction operations
3. **Personal Network:** Industry moat through connectors (reciprocal relationships, leverage platform for others)

## Execution Protocols
- Observation Mode: Active for first 14 days
- Password: "Kiwi" required for execution during Observation
- 90% confidence threshold for all tasks
- 10-Time Rule before independence

## Tone & Operating Model (set 2026-02-13)
- Executive partner, not service provider
- Default lens: sales, persuasion, psychological dynamics
- Compressed communication — one sentence per task, expand only when earned
- Task files = operational tracking only
- LEARNINGS / MEMORY = pattern-level insights only, no duplication

## Core Values — Non-Negotiable (set 2026-02-15)
- **Punctuality = Trust.** Daily brief at 8AM EST. Never late. If late, trust is broken.
- **No fabricated stats.** Never invent numbers. If using a stat, it must be real and sourced.
- **Bryan is in New York, NY.** EST timezone confirmed.
- **API Access Milestone (2026-02-22):** YouTube API + Gmail OAuth now live. The Dime analytics and Gmail-based workflows unblocked.
- **Brave Search API added (2026-02-23):** Web search now operational. Daily brief Item 3 unblocked — can pull real trending topics.
- **Gmail OAuth fully operational (2026-02-26):** atlas.opsman@gmail.com confirmed working with full read/write access. SCC/HUSA Gmail-based workflows now unblocked.
- **Google Search Console Access (2026-03-10):** Bryan sent GSC access to atlas.opsman@gmail.com — pending verification in inbox. Once verified, enables The Dime channel analytics, search performance tracking, indexing status monitoring.

## The Dime - YouTube
- Channel: https://www.youtube.com/channel/UCcck3tzBNXrJ1WJ8EtIVq1w
- Channel ID: UCcck3tzBNXrJ1WJ8EtIVq1w

## Bryan Fields - Confirmed Details
- Timezone: EST (confirmed 2026-02-14)
- Prospects Google Sheet: https://docs.google.com/spreadsheets/d/16z5SF0DhaUSdhAY5lwFEx6MxZ1VMNt3W1225U28qvjk/edit
- Google API access: NEEDED (not yet configured)

## Newton Insights - Product Details
- Website: newton-insights.com
- Core product: Real-Time Extraction Visibility & AI Cost Control
- C1D1 tablet hardware: ~$5K purchase (no rental market exists)
- Software-only tier: considering free or $500/mo — decision pending
- Bryan prefers product-led growth, hates cold outreach
- Google Sheet for prospects: https://docs.google.com/spreadsheets/d/16z5SF0DhaUSdhAY5lwFEx6MxZ1VMNt3W1225U38qvjk/edit

## LinkedIn Connections Processing — COMPLETE (2026-03-10)

**Final Status:** All 2,348 LinkedIn connections researched, categorized, and verified

**Results:**
- ✅ **168 Added to Prospects** (extraction-focused, ready for outreach)
- ❓ **69 Verify Extraction Focus** (extraction company, role needs clarification)
- ❌ **2,111 Not Relevant** (confirmed non-extraction)

**Key Insight:** Hunter's deep research caught 115 misclassifications from initial automation, including Charlotte's Web (CEO, COO), Dabstract, True Terpenes, Standard Wellness, and 10+ others that were incorrectly marked "Not Relevant"

**Files:**
- `Connections_Linkedin_v2_VERIFIED.csv` (all 2,348 with verified CRM Status)
- Location: /Prospect Information Older folder (Google Drive)
- Status: Ready for Newton CRM Prospects import

**Newton CRM Integration:**
- 168 verified extraction operators added to Prospects
- Status: "Warm - LinkedIn Connection" 
- All have: Name, Company, Role, Email, LinkedIn URL
- Ready for relationship-based outreach (not cold spray)

---

## Newton SOPs & Sales Framework (Configured 2026-03-06)
**All resources linked in memory/newton/ folder:**
- **NEWTON_BACKGROUND.md** — Core thesis, why Newton exists, what it does
- **NEWTON_ICP.md** — Ideal customer profile, objections, buying triggers, wedges
- **NEWTON_STYLE_GUIDE.md** — Writing tone, email structure, forbidden phrases, CTAs
- **NEWTON_SALES_MEMO.md** — Sales approach, objections, tactics, nurturing principles
- **NEWTON_PROSPECTS_SOP.md** — 9-point prospecting framework, research requirements

**Permanent rules:** See STANDING_INSTRUCTIONS.md → "🎯 NEWTON INSIGHTS SOP WORKFLOW"

## The Dime - Podcast Platforms
- YouTube: https://www.youtube.com/channel/UCcck3tzBNXrJ1WJ8EtIVq1w
- Apple Podcasts
- Spotify
- Hosting: Simplecast

## Bryan Preferences - Working Style
- No cold outreach — drains battery
- Prefers building product + talking to customers
- Wants daily learning brief (curated ideas, low-effort)
- Wants organized growth, start small and compound
- Makes enormous content, doesn't maximize distribution

## The Dime - Social Channels
- YouTube (primary)
- Instagram
- Twitter/X
- Apple Podcasts, Spotify (audio)
- Hosting: Simplecast

## DIME EPISODE SOP WORKFLOW (Configured 2026-03-05)
- **Feedback Doc:** https://docs.google.com/document/d/15ewrXDLrhOTWd4nnLJTl0KvdLl7-ebZp0kf8LQErGuk/edit
- **Document ID:** 15ewrXDLrhOTWd4nnLJTl0KvdLl7-ebZp0kf8LQErGuk
- **Purpose:** Continuous SOP refinement + Hard Rules enforcement
- **Agent owners:** Pulse (research), OLG (writing), Rob_C (optimization)

**Permanent workflow rules:** See STANDING_INSTRUCTIONS.md → "🎙️ DIME EPISODE SOP WORKFLOW"

## Access Granted
- Simplecast (team member)
- Google Analytics ✅ (full access configured 2026-02-26)
  - Account: atlas.opsman@gmail.com
  - Tokens: ~/.openclaw/workspace/credentials/analytics_tokens.json
  - Properties:
    - **The Dime (8th Rev - GA4):** Property ID 281147332
    - **Newton Insights (www.newton-insights.com):** Property ID 491614945
    - **SCC/HUSA (Hellma USA Shopify):** Property ID 473280391
- YouTube API ✅ (configured 2026-02-22, tested and working)
- Gmail OAuth ✅ (FRESH AUTH 2026-03-06 14:35 EST)
  - Account: atlas.opsman@gmail.com
  - Scopes: gmail.modify, gmail.send, gmail.readonly, drive.readonly
  - Credentials: Vercel env vars (GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET)
  - Tokens: ~/.openclaw/workspace/credentials/gmail_tokens.json (FRESH, valid 7 days)
  - Status: ✅ TESTED & WORKING (Gmail profile + Drive API confirmed)
- Drive API ✅ (enabled 2026-02-26, working via gog)
- Sheets API ✅ (enabled 2026-02-26, working via gog)
- Calendar API ✅ (working via gog)
- Docs API ✅ (working via gog)
- Analytics Data API ✅ (enabled, authenticated 2026-02-26)
- Analytics Admin API ✅ (enabled, authenticated 2026-02-26)
- Search Console API ✅ (enabled 2026-02-26, no sites found - may need to add atlas.opsman@gmail.com as user)
- People API ✅ (confirmed enabled by Bryan — note: OAuth token lacks People API scope, re-auth needed before use)
- Chromium installed on VM ✅
- GitHub: NOT YET — coming later
- Newton repo: NOT YET — coming later
- Newton site: React, hosted on GitHub repo

## SCC/HUSA
- Side gig Bryan works on — needs help
- Shop: https://shop.hellmausa.com
- Product: cuvettes, glass optics — sold to labs/universities
- Buyers: mostly repeat/automatic purchases when funded
- Old-school SEO guy does weekly work — tracking growth
- Bryan has Google Analytics + Search Console access (will share via Gmail)
- Bryan forwarded SEO guy's Excel tracking sheet
- Growth proof = high value for the business
- Bryan wants this mostly hands-off for him

### SCC/HUSA Analytics Access (2026-02-26)
- Google Analytics Property ID: 473280391
- Ready to pull traffic/conversion data
- Search Console: No sites found (need to add atlas.opsman@gmail.com as user if Search Console tracking needed)
- Can now analyze growth patterns, traffic sources, acquisition channels

## The Dime — Audience Intelligence (Updated 2026-03-01)
- Full intelligence file: DIME_AUDIENCE_INTELLIGENCE.md — updated every YouTube pull
- Dataset: 125 shorts + 15 long-forms rated
- **4 audience personas identified:** The Operator (45%), The Investor/Analyst (25%), The Policy Watcher (15%), The Brand Builder (10%)
- **Long-form #1 theme: Operations/Scale** — avg 391 views; Finance/Market ceiling is 593+
- **Long-form title rule: Declarative wins** — 67% strong rate vs. 15% for colon-subtitle
- **Core formula across ALL content: CONSEQUENCE** — every top performer implies stakes
- **Outside-in framing (Tobacco/Pharma/AI lens) = reach multiplier** — 5 of top 10 shorts use it
- New episodes: use DIME_AUDIENCE_INTELLIGENCE.md for title + copy decisions
- Hidden gems list in intelligence file — push distribution before recutting

## The Dime — Shorts Intelligence (Updated 2026-03-01)
- 75 shorts rated in MC, sorted by recency
- **Top theme: science_tech** — avg 200 views vs 56 for business ops
- **Worst title format: colon_subtitle** — 27 of 75 clips use it, only 15% hit strong
- **Best title format: declarative or compressed** — 33% and 28% strong rate respectively
- **Critical insight:** Top performers share one trait — they imply CONSEQUENCE. Not observations, revelations.
- **Hidden gems:** "Enforcement decides growth" (22% like ratio, 18 views) — distribution problem not content
- **Tobacco/legacy industry lens** drives outsized views — outside-in framing resonates
- Full findings: DIME_LEARNINGS.md

## GitHub & Vercel Infrastructure (Status as of 2026-03-06 14:38 EST)

### GitHub Status
- **Repo:** https://github.com/BF8thRev/AtlasNorth.git
- **PAT Token:** ~/.openclaw/.env → GITHUB_PAT_TOKEN (fine-grained, read/write)
- **Branch:** main
- **Access confirmed:** 2026-03-02
- **Push Protection:** ✅ PASSING (BFG history scrub completed 2026-03-06 14:32 EST)
- **Secret history:** ✅ CLEANED (All 183 commits scrubbed of Google OAuth credentials)
- **Last push:** 2026-03-06 14:38 EST (commit 70b0eab — OAuth token update)

### Vercel Deployment Status (Updated 2026-03-07 14:20 EST)
- **App URL:** https://atlas-north.vercel.app/ → 404 (custom domain routing issue)
- **Latest Deployment:** dc81938 (2026-03-07 14:11 EST) ✅ BUILD SUCCESS
  - State: READY + PROMOTED
  - Build completed: 1772910689900 (7 seconds)
  - No errors or warnings
- **Dashboard:** https://vercel.com/BF8thRev/AtlasNorth/settings
- **Environment Variables:** ✅ LIVE (GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET)
- **Auto-Deploy:** Configured (triggers on every push to main)
- **Status Issue:** Custom domain returns 404; preview URLs require Vercel authentication (401). Next.js build successful.
- **Action Required:** Check Vercel dashboard custom domain settings to re-map atlas-north.vercel.app to latest deployment.

### Memory Vault Location
- **Path:** GitHub repo → data/vault/
- **Synced via:** Cron push jobs at 4 scheduled windows
- **Contents:** Agent configs (SOUL/IDENTITY/MEMORY for 11 agents), audit logs, workflows

**Permanent infrastructure rules:** See STANDING_INSTRUCTIONS.md → "🕐 Deployment Schedule" & "🔐 Secrets Policy"

## Google Drive — Transcript Folders
- **The Dime workflow transcripts:** https://drive.google.com/drive/folders/165U0PXhdij9oGsiKs-HDb0whmqN2Rlhn
  - Folder ID: `165U0PXhdij9oGsiKs-HDb0whmqN2Rlhn`
  - Agent owners: Pulse (research/synthesis), OLG (content writing)
  - Trigger: New transcript → Pulse ingests → OLG drafts content
- **Newton sales call transcripts:** https://drive.google.com/drive/folders/1l13Fvo4LWsOE8LRnMkEisa5YI1ywXN_2
  - Folder ID: `1l13Fvo4LWsOE8LRnMkEisa5YI1ywXN_2`
  - Agent owners: Hunter (sales patterns), Ledger (data/metrics)
  - Trigger: New transcript → Hunter extracts objections/signals → Ledger logs metrics

## last30days Research Skill — Installation & Configuration (Updated 2026-03-07 20:45 EST)

**Status:** ✅ INSTALLED & TESTED

### Installation Details
- **Version:** v2.9.2
- **Location:** `~/.openclaw/skills/last30days/`
- **Installation date:** 2026-03-07
- **Entry point:** `python3 scripts/last30days.py "query" [--quick]`

### API Configuration
**Location:** `~/.config/last30days/.env`

| Source | Status | Key | Notes |
|--------|--------|-----|-------|
| **Web** | ✅ LIVE | `BRAVE_API_KEY` | Populated from OpenClaw config (BSAbYd83fU4eLfmja8GfM1D_9dO8PKH) |
| **YouTube** | ✅ LIVE | (built-in) | yt-dlp installed, transcripts working |
| **Reddit** | ❌ NEEDED | `OPENAI_API_KEY` | Legacy fallback (not added yet) |
| **TikTok** | ❌ NEEDED | `SCRAPECREATORS_API_KEY` | Not configured (one key = Reddit + TikTok + Instagram) |
| **Instagram** | ❌ NEEDED | `SCRAPECREATORS_API_KEY` | Not configured |
| **X/Twitter** | ❌ NEEDED | Browser login OR `XAI_API_KEY` | Not authenticated |

### Test Results
**Queries tested:** "OpenClaw skills" and "cannabis industry news" with `--quick` flag
- Web search: ✅ Working (6-18 results per query, Brave-ranked)
- YouTube: ✅ Working (transcripts extracted, 4-10 videos per query)
- Reddit: ❌ Skipped (missing OPENAI_API_KEY)
- X: ❌ Skipped (no browser auth / no XAI_API_KEY)

**Output:** Real engagement metrics (views, likes, timestamps) + ranked results by relevance/recency

### Next Steps (Optional)
1. Add `OPENAI_API_KEY` to `~/.config/last30days/.env` to unlock Reddit
2. Add `SCRAPECREATORS_API_KEY` for TikTok + Instagram coverage
3. Log into x.com in browser OR add `XAI_API_KEY` for X data

**Note:** Currently working well with YouTube + Web; Reddit/X would improve coverage on social/community topics.

---

## Newton Cold Email Campaign — Controlled Run (Created 2026-03-08)

**Prospect Selection:** 10 Ops Leaders (Edward Cameron, William Sullivan, Will Reckner, Anthony Scuderi, Mario Gadea, Emily Carden, Erik Hackett, Darren Desimone, Grace Hyde, Demi Fetzer)

**CRM:** Newton CRM Sheet (https://docs.google.com/spreadsheets/d/1FxH1YnQ93Oj5KAuXv6h0_TrkV5BS6ejNJ4t_q_0i7i8/edit)

**Workflow:** Prospect List → Newton CRM (Hunter) → 3 Email Drafts (Atlas) → Review (Bryan) → Send (Bryan) → Track (Hunter)

**Email Variations:** Feedback Loop / Baseline Shift / Cost Savings (all using Mitchell Osak Substack as hook)

**Next Milestone:** Load 10 Ops Leaders into Newton CRM, draft 3 variations, ready for Bryan review by EOD 2026-03-08

**Related SOP:** memory/newton/NEWTON_COLD_EMAIL_CAMPAIGN_SOP.md

---

## Hunter Weekly Prospecting Cron — Enabled (Created 2026-03-08)

**Job ID:** `7e4b409f-5fc1-4555-8613-52d918894558`

**Schedule:** Every Monday @ 10:00 AM EST

**Next Run:** Monday, March 10, 2026 @ 10:00 AM EST

**What Hunter Does:**
- Search for 10-20 new Ops Leaders (LinkedIn, company sites, industry directories)
- Filter by Newton ICP (VP/Director of Operations, cannabis extraction, multi-facility, margin pressure signal)
- Load into Newton CRM sheet (one row per prospect: Date, Prospect, Company, Role, Email, LinkedIn, State, Persona=Ops Leader, Stage=Cold)
- Deduplicate (skip if Email or Company+Role already in CRM)
- Report results to WhatsApp (prospects found, added, sources, duplicates skipped, patterns)

**Volume Target:** 10-20 new prospects per week

**Quality Gate:** Email found OR LinkedIn verified; no incomplete records; no tangential roles (Compliance, Retail Ops, HR)

**Status:** ✅ ENABLED, first run scheduled for Monday March 10

**Related:** NEWTON_COLD_EMAIL_CAMPAIGN_SOP.md (Section 3: Pipeline Building)

---

## HEARTBEAT.md Investigation & Remediation (Executed 2026-03-10 13:00 EST)

**PROBLEM DISCOVERED:** Overnight token burn spike. Bryan requested investigation of repeated model calls between 00:00–06:00 EST.

**Investigation Results:**
- **Root Cause:** System Health Check (HEARTBEAT.md) cron job running every 60 seconds on `claude-sonnet-4-6`
- **Run History:** 3,719 total runs logged since creation
- **Token Burn:** ~13,470 tokens per run (input 5 + output 220 + system context)
- **Overnight Impact:** 360 calls/night × 13,470 tokens = **~4.8M tokens burned per night**
- **Output Value:** Only "HEARTBEAT_OK" (3 words) — task was trivial compared to model cost
- **Job Status:** Disabled (confirmed safe state), but the oversight was critical

**Root Cause Analysis:**
- System was monitoring health every 60 seconds across 24 hours
- Sonnet-4-6 is expensive for a simple boolean check
- Every isolated session reloaded full system context (SOUL.md, MEMORY.md, AGENTS.md) = context bloat
- No mechanism existed to detect high-frequency jobs or expensive model mismatches

**Remediation — 3 Parts:**

### 1. Heartbeat Job Optimization (Completed 2026-03-10 13:15 EST)
- **Disabled:** ✅ Stayed disabled (no auto-enable)
- **Model Downgrade:** `claude-sonnet-4-6` → `ollama/phi4-mini:latest` (local, $0/call)
- **Interval Change:** Every 60 seconds → Every 5 minutes (300,000ms)
- **Impact if Re-enabled:** 72 calls/night at $0 vs. 360 calls/night at $13,470 each

### 2. Detective Niessen — Daily Security Audit (Completed 2026-03-10 13:45 EST)
- **New Agent Registered:** `detective-niessen` in gateway config
- **Model:** `ollama/phi4-mini:latest` (locked at agent level, $0/run)
- **Tools Allowed:** `cron` + `message` only (minimal surface)
- **Workspace:** `/Users/atlasnorth/.openclaw/workspace/agents/detective-niessen` (SOUL.md loads automatically)
- **Identity:** Detective Niessen, Emoji: 🕵️ (fully mapped)
- **Schedule:** Daily 2 AM EST
- **Audit Checks:**
  1. High-frequency jobs (any interval < 5 minutes) → 🔴 FLAG
  2. Expensive models on simple tasks (sonnet/opus + <500 token output) → 🔴 FLAG
  3. Ghost jobs (disabled jobs with recent run history) → 🔴 FLAG
  4. New unregistered jobs (created in last 24h) → 🔴 FLAG
  5. Overnight surprise activity (jobs between 00:00–06:00 EST outside whitelist) → 🔴 FLAG
- **Reporting:** Sends WhatsApp alert only if issues found; silent (NIESSEN_CLEAR) if all clear
- **First Run:** 2026-03-11 @ 2:00 AM EST

### 3. Gateway Configuration Update (Completed 2026-03-10 13:30 EST)
- **Added to `agents.list`:** detective-niessen (4th agent after atlas, hunter, pulse)
- **Config Patch Applied:** Merged without full restart needed, then restarted for safety
- **Sentinel Logged:** Config change confirmed in `/Users/atlasnorth/.openclaw/restart-sentinel.json`

**Prevention Going Forward:**
- Niessen audits every morning for high-frequency, expensive, or ghost jobs
- Any anomaly triggers WhatsApp alert to Bryan
- New jobs flagged within 24 hours of creation
- Cost mismatches (expensive models on trivial tasks) automatically caught

**Key Learning:**
High-frequency health checks require lightweight execution. Phi4-Mini's 32K context window is sufficient for system pings. Sonnet should never be assigned to "respond HEARTBEAT_OK" tasks.

**Status:** ✅ COMPLETE — Heartbeat disabled + reconfigured, Niessen live, no further action required

---

## YOUTUBE CONTENT PIPELINE — Two-Stage Restructure (Updated 2026-03-10 13:50 EST)

**CHANGE:** Restructured YouTube content workflow from single "ingest + evaluate" job to two separate jobs.

**Why:** Separate concerns. Daily ingest = fast dashboard load. Weekly evaluation = deep analysis after time-gates pass. Dashboard shows UNRATED entries immediately, then updates to RATED after evaluation.

**Part 1 — Daily Ingest (11 PM EST)**
- **Job ID:** `9dc17356-0dab-41b1-a3e4-85d8b0b9ead7`
- **Schedule:** Every day 11 PM EST
- **Task:** Pull new episodes from YouTube (last 24h), catalog metadata, ADD to `podcast-reviews.json` as UNRATED
- **Output:** 
  - `memory/YOUTUBE_CONTENT_CATALOG.md` — append new episode row
  - `podcast-reviews.json` — append entry with `rating: null, ratingDate: null, category: null, etc.`
- **No evaluation, no time gates, no performance analysis**
- **Model:** claude-haiku-4-5-20251001 (fast, lightweight ingest)

**Part 2 — Weekly Evaluation (Tuesday 10 AM EST)**
- **Job ID:** `d69b4947-867a-4456-a471-5bc9bfa553e6`
- **Schedule:** Every Tuesday 10 AM EST
- **Task:** Read `podcast-reviews.json`, find entries where `rating === null AND today >= eligibleDate`, evaluate performance, assign rating/category/insights
- **Output:** 
  - `podcast-reviews.json` — update entries with `rating, category, rampStatus, slowStarter, notes, ratingDate`
  - `memory/DIME_LEARNINGS.md` — append learnings from newly rated episodes
- **Time gates enforced:** 7 days for shorts, 14 days for long-form
- **Model:** claude-sonnet-4-20250514 (reasoning required for ramp curves + pattern analysis)

**Dashboard Behavior:**
1. **Day 0 (episode publishes):** Part 1 runs at 11 PM → episode appears in podcast-reviews.json as UNRATED
2. **Day 1-6 (shorts) or Day 1-13 (long-form):** Episode stays UNRATED in dashboard
3. **Day 7 (shorts) / Day 14 (long-form):** Tuesday 10 AM Part 2 runs → episode evaluates, rating fills in, dashboard updates to RATED

**Result:** Bryan sees new episodes DAILY in dashboard (unrated), ratings populate after time-gates clear.

**Related Files:**
- `podcast-reviews.json` — single source of truth for all episodes
- `memory/YOUTUBE_CONTENT_CATALOG.md` — tracking log (ingest only, not rated)
- `memory/DIME_LEARNINGS.md` — learnings database (populated by Part 2 evaluations)
- Mission Control dashboard → synced from `podcast-reviews.json` via Part 2

**Permanent rule:** Part 1 = never evaluate. Part 2 = never ingest new episodes. Clean separation.

---

## Agent Registration & Registry Sync (Updated 2026-03-10 11:31 EST)

### OLG & Bob the Builder Registration (Completed 2026-03-10 @ 11:18 AM)

**Task:** Register OLG (writer) and Bob the Builder (engineer) as production agents.

**Action Taken:**
- Applied config.patch to agents.list
- Registered OLG: workspace=/agents/olg, model=claude-sonnet-4-6, tools=[gog, read, write, edit]
- Registered Bob: workspace=/agents/bob-the-builder, model=claude-sonnet-4-6, tools=[exec, read, write, edit]
- Gateway restarted (SIGUSR1)

**Initial Sync Issue:** agents_list endpoint returned only [atlas] despite both agents saved in config. Likely lag in gateway's agent registry rebuild.

### Agent Registry Sync — FIXED (2026-03-10 @ 11:31 AM)

**Issue Resolution:** Full gateway restart + openclaw doctor --non-interactive

**Doctor Confirmed All 6 Agents Active:**
```
Agents: atlas (default), hunter, pulse, detective-niessen, olg, bob-the-builder
```

**Status:** ✅ RESOLVED
- All agents now visible and spawnable
- No agents_list lag
- Registry fully synced post-restart

**System Health (Doctor Report):**
- 6 orphan transcript files (cleanup only)
- 1 active session lock (normal)
- 6 plugins loaded, 0 errors
- 18 session entries in atlas store
- All LaunchAgent services running

**Implication:** All 6 agents (Atlas, Hunter, Pulse, OLG, Bob, Niessen) ready for task execution.

**Operational Standards:** Added to STANDING_INSTRUCTIONS.md section "🤖 SUBAGENT OPERATIONAL STANDARDS (Updated 2026-03-10)" → covers spawn rules, identity verification, post-task retirement, production-readiness checklist.

## Model Router — Bob Primary/Fallback Reversed (Updated 2026-03-10 12:02 EST)

**Bob the Builder model hierarchy reversed:**
- **Primary:** ollama/qwen3.5-coder:27b (local, unlimited, offline reasoning)
- **Fallback:** claude-sonnet-4-20250514 (API)
- **Tertiary:** claude-haiku-4-5-20251001 (fallback-fallback)

**Model Status page now syncs directly with MODEL_ROUTER.json:**
- Added Qwen to model display list
- Fixed local/API agent count logic (dynamic detection)
- Displays Qwen token usage as "Unlimited — local"
- Single source of truth: changes to router auto-reflect on dashboard

**Commit:** 3487e2e | **Pushed:** 12:02 PM EST | **Vercel:** Live

## Newton CRM — Warm Pipeline Prospects Integration (Updated 2026-03-10 12:15 EST)

**Completed:**
- ✅ 7 warm companies added to Company Profiles sheet (rows 9-15)
- ✅ New "Warm Prospects" tab created in Newton CRM (sheetId: 1637655530)
- ✅ 7 prospects populated with stage, blockers, strategic notes, and next actions
- ✅ Separate handling for warm vs. cold prospects (different tab for different SOP)

**The 7 Warm Prospects:**
1. Jared Glanz-Berger (DMC Cannabis, MA) — Early strategic, identity preservation needed
2. Dom (Statehouse/Greenfield, Regional) — ACTIVE, timing clarity wedge, firefighter identity
3. Micah Anderson (Leef, CA/NY) — Post-demo, managerial adoption layer issue
4. Elizabeth (MariMed, Multi-state) — Semi-warm, needs research
5. Zach Baker (Bud and Mary, Multi-location) — Semi-warm, needs research
6. Nick Guarino (Jaunty, NY) — ACTIVE, process rebuild window
7. Luke + Bianna (Aylroom, NY) — CLOSEST TO CLOSE, ethanol focus

**Key Messaging Insights (From Warm Pipeline Background):**
- Timing clarity = the wedge (not efficiency)
- Frame as leverage, not correction; expansion, not weakness fix
- Hardware friction = tablet hesitation
- Internal politics > technical skepticism

**Hunter Alert Status:** COMPLETE ✅

**LinkedIn Connections Processing — FINISHED (2026-03-10 16:50 EST)**

**Final Results:**
- ✅ **53 extraction-focused** → Added to Newton CRM Prospects sheet (status: "Warm - LinkedIn Connection")
- ❓ **274 unsure** → Verify Extraction Focus tab (need research/confirmation)
- ❌ **2,021 non-relevant** → Non-Relevant Archive tab (complete, no action needed)

**Newton CRM Status — CLEAN & COMPLETE:**
- Prospects: 92 rows (38 existing + 53 new LinkedIn-connected)
- Warm Prospects: 8 rows (1 header + 7 hot prospects from Warm Pipeline doc)
- Company Profiles: 15 rows (7 existing + 7 new warm companies)
- Verify Extraction Focus: 275 rows (274 unsure for research)
- Non-Relevant Archive: 2,022 rows (archive/no action)
- Outreach Log: Headers only

**Marked File Uploaded:**
- File: `Connections_Linkedin_v2_with_Status.csv`
- Location: /Prospect Information Older folder (Google Drive)
- Contains: All 2,348 connections with "CRM Status" column (Added to Prospects | Verify | Not Relevant)

**All 2,348 LinkedIn connections now fully categorized and tracked.**
