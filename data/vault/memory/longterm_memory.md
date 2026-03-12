# Atlas Long-Term Memory — Archive
_Historical decisions, completed tasks, and reference context. Fetch on-demand._

---

## Workspace Reorganization — Token Optimization (Completed 2026-03-07)

Moved 39 reference files to memory/ folder to reduce auto-load bloat. Root workspace context reduced from ~65K to ~15K input tokens per cron session (77% reduction).

Files moved: DIME_LEARNINGS.md, DIME_AUDIENCE_INTELLIGENCE.md, DIME_MISSION.md, DIME_STRATEGY_WIKI.md, DIME_STYLE_GUIDE.md, DIME_VICTORY_FAILURE_LOG.md, NEWTON_SALES_PLAYBOOK.md, NEWTON_SALES_ANALYSIS.md, Newton_LinkedIn_outreach_FL_MI.md, Newton_prospects_FL_MI.md, Newton_tasks.md, GENERAL_LEARNINGS.md, GENERAL_STYLE_GUIDE.md, GENERAL_TASKS.md, future4200_* (6 files), ROSTER.md, HUNTER_RESEARCH_OUTPUT.md, JB_followup_draft.md, ATLAS_SOUL.md, ATLAS_MEMORY_EXPORT.txt, OLG_SYSTEM.md, ROB_C_SYSTEM.md, ROUTINE_CREATION_SOP.md, ENGAGEMENT_RULES.md, DECISION_TREES.md, CALIBRATION_NOTES.md, BRYAN_PROFILE.md

OUTPUT files (PULSE_*_OUTPUT.md) reverted to root — cron jobs need direct access.

Git commits: 80025be (move), dc81938 (revert output files + disable Friday Founder cron)

---

## Cron Model Routing — Normalization (Completed 2026-03-06)

Normalized all cron jobs to MODEL_ROUTER.json assignments:
- Pulse Daily/Weekend research → google/gemini-2.5-flash
- Brief Format & Send → claude-haiku-4-5-20251001
- YouTube Content Rating → claude-sonnet-4-20250514 (reasoning required)
- Friday Founder Load → claude-sonnet-4-20250514
- YouTube Content Catalog → claude-haiku-4-5-20251001

---

## Pulse Brief Protocol Update (2026-03-09)

Removed Item 1 approval gate. Pulse sends full brief directly to Atlas (not Bryan). Atlas reviews and sends to Bryan. No approval gate, no Pulse WhatsApp notifications. Config: added to Pulse SOUL.md "DAILY BRIEF OUTPUT PROTOCOL" section.

---

## Cron Job File Path Audit (Completed 2026-03-07)

All cron jobs verified for valid file paths after workspace reorganization. OUTPUT files confirmed in root. Friday Founder Load disabled (timeout + LEARNINGS file path issue — re-enable after SOUL.md → memory/ reference fix).

---

## Subagent Production Readiness (Confirmed 2026-03-06)

Both Pulse and Hunter confirmed PRODUCTION READY:
- Pulse: Loads own SOUL.md/IDENTITY.md, writes to own MEMORY.md ✅
- Hunter: Loads own SOUL.md/IDENTITY.md, runs independent research, writes to own MEMORY.md ✅

---

## Newton SOPs — memory/newton/ Folder (Configured 2026-03-06)

- NEWTON_BACKGROUND.md — Core thesis
- NEWTON_ICP.md — ICP, objections, buying triggers, wedges
- NEWTON_STYLE_GUIDE.md — Writing tone, email structure, forbidden phrases
- NEWTON_SALES_MEMO.md — Sales approach, objections, tactics
- NEWTON_PROSPECTS_SOP.md — 9-point prospecting framework

Permanent rules: See STANDING_INSTRUCTIONS.md → "🎯 NEWTON INSIGHTS SOP WORKFLOW"

---

## The Dime — Reference Info

**Platforms:** YouTube (primary), Apple Podcasts, Spotify. Hosting: Simplecast.
**Social:** YouTube, Instagram, Twitter/X, Apple Podcasts, Spotify.
**Feedback Doc:** https://docs.google.com/document/d/15ewrXDLrhOTWd4nnLJTl0KvdLl7-ebZp0kf8LQErGuk/edit
**Agent owners:** Pulse (research), OLG (writing)

**Audience Intelligence (Updated 2026-03-01):**
- 4 personas: The Operator (45%), Investor/Analyst (25%), Policy Watcher (15%), Brand Builder (10%)
- Long-form #1 theme: Operations/Scale (avg 391v); Finance/Market ceiling 593+
- Title rule: Declarative wins (67% strong rate vs. 15% colon-subtitle)
- Core formula: CONSEQUENCE — every top performer implies stakes
- Outside-in framing (Tobacco/Pharma/AI lens) = reach multiplier
- Full file: DIME_AUDIENCE_INTELLIGENCE.md

**Shorts Intelligence (Updated 2026-03-01):**
- Top theme: science_tech (avg 200v vs 56 business ops)
- Worst format: colon_subtitle (only 15% strong rate)
- Best format: declarative or compressed (33-28% strong rate)
- Full findings: DIME_LEARNINGS.md

---

## SCC/HUSA Reference

Side gig. Shop: https://shop.hellmausa.com. Product: cuvettes, glass optics for labs/universities.
Buyers mostly repeat/automatic. Old-school SEO guy does weekly work.
Google Analytics Property ID: 473280391. Search Console: need to add atlas.opsman@gmail.com.

---

## Dime Guest Audit — Extraction Operators for Newton (Completed 2026-03-09)

Last 15 episodes (2026-02-09 to 2026-03-09):
| Episode | Guest | Topic | Newton Fit | Pitched? |
|---------|-------|-------|-----------|----------|
| 2026-03-08 | Micah Anderson (LEEF Brands) | Prop 64 + Extraction Ops | ⭐⭐⭐ HIGH | ❌ NO |
| 2026-03-01-04 | Jonathan Black (Cheech & Chong) | Multi-state brand + ops | ⭐⭐ MEDIUM | ✅ YES |
| 2026-02-22-25 | Eric + Kristin Rogers (Levia) | Beverage distribution | ⭐ LOW | ❌ NO |
| 2026-02-15-17 | Trent Woloveck | Vertical integration, 280E | ⭐⭐ MEDIUM | ❌ NO |
| 2026-02-09-10 | John Shute (MBA) | Brand economics | ⭐ LOW | ❌ NO |

Action: Micah Anderson → Newton pitch pending.

---

## Capital Markets Analyst Guest — Pending Decision (2026-03-09)

No dedicated capital markets analyst in last 15 episodes. Finance content = highest engagement ceiling (593v, 5.7% ratio). Recommended coverage: public cannabis valuations, Tier-1 debt structures, 2026 reset thesis. Sources: Brightfield Group, Dope Stocks, Marijuana Policy Group. Awaiting Bryan decision.

---

## GitHub & Vercel Infrastructure (Configured 2026-03-06)

- **Repo:** https://github.com/BF8thRev/AtlasNorth.git
- **PAT Token:** ~/.openclaw/.env → GITHUB_PAT_TOKEN
- **Branch:** main
- **Push Protection:** ✅ PASSING (BFG scrub completed 2026-03-06)
- **Vercel App:** https://atlas-north.vercel.app/ (auto-deploy on push to main)
- **Env Vars:** GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET (live in Vercel)
- **Memory Vault:** repo → mission-control-dashboard/data/vault/ (synced by sync script)

---

## Google Drive — Transcript Folders

- **Dime transcripts:** https://drive.google.com/drive/folders/165U0PXhdij9oGsiKs-HDb0whmqN2Rlhn (ID: 165U0PXhdij9oGsiKs-HDb0whmqN2Rlhn)
- **Newton sales call transcripts:** https://drive.google.com/drive/folders/1l13Fvo4LWsOE8LRnMkEisa5YI1ywXN_2 (ID: 1l13Fvo4LWsOE8LRnMkEisa5YI1ywXN_2)

---

## last30days Skill — Installation (Completed 2026-03-07)

Version v2.9.2 at ~/.openclaw/skills/last30days/. Config: ~/.config/last30days/.env.
Working: Web (Brave), YouTube (yt-dlp). Not configured: Reddit (needs OPENAI_API_KEY), TikTok/Instagram (needs SCRAPECREATORS_API_KEY), X (needs XAI_API_KEY or browser auth).

---

## Newton Cold Email Campaign — Controlled Run (Created 2026-03-08)

10 Ops Leaders selected. CRM: https://docs.google.com/spreadsheets/d/1FxH1YnQ93Oj5KAuXv6h0_TrkV5BS6ejNJ4t_q_0i7i8/edit
3 email variations: Feedback Loop / Baseline Shift / Cost Savings (Mitchell Osak Substack hook).
SOP: memory/newton/NEWTON_COLD_EMAIL_CAMPAIGN_SOP.md

---

## Hunter Weekly Prospecting Cron (Enabled 2026-03-08)

Job ID: 7e4b409f-5fc1-4555-8613-52d918894558. Schedule: Every Monday 10 AM EST.
Target: 10-20 new Ops Leader prospects/week into Newton CRM. Quality gate: Email OR LinkedIn verified.

---

## HEARTBEAT.md Investigation — Token Burn Spike (Resolved 2026-03-10)

Root cause: Health check cron running every 60s on claude-sonnet-4-6.
Impact: 3,719 runs, ~4.8M tokens/night. Fix: Disabled + reconfigured.
Resolution: Model → phi4-mini:latest (local, $0). Interval → every 5 min. Detective Niessen added for daily security audits.

---

## YouTube Content Pipeline — Two-Stage Restructure (Completed 2026-03-10)

Part 1 (Daily 11 PM, Job 9dc17356): Ingest only → podcast-reviews.json + YOUTUBE_CONTENT_CATALOG.md. Model: haiku.
Part 2 (Tuesday 10 AM, Job d69b4947): Evaluate unrated entries → ratings + DIME_LEARNINGS.md. Model: sonnet. Time gates: 7d shorts, 14d long-form.

---

## Agent Registration — OLG & Bob the Builder (Completed 2026-03-10)

OLG: workspace=/agents/olg, model=claude-sonnet-4-6, tools=[read, write, edit]. Emoji: ✍️
Bob: workspace=/agents/bob-the-builder, model=claude-sonnet-4-6, tools=[exec, read, write, edit]. Emoji: 🔧
All 6 agents confirmed active post-restart: atlas, hunter, pulse, detective-niessen, olg, bob-the-builder.

---

## LinkedIn Connections Processing (Completed 2026-03-10)

All 2,348 connections categorized: 53 extraction-focused (added to CRM), 274 unsure (Verify tab), 2,021 non-relevant (Archive tab).
Newton CRM: 92 Prospects, 8 Warm Prospects, 15 Company Profiles, 275 Verify, 2,022 Archive.
File: Connections_Linkedin_v2_with_Status.csv in Google Drive /Prospect Information Older.
