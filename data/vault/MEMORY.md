# Atlas Long-Term Memory

## Bryan Fields Profile
- Owner and user of Atlas assistant
- Runs The Dime podcast
- Works on Newton Insights product
- Prefers clear, bulleted communication
- Located in EST timezone

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

## DIME EPISODE SOP WORKFLOW (Formalized 2026-03-05)

### TRIGGER
- **Event:** "New episode ready"
- **Input:** [Guest Name] + [Transcript Path/Link]
- **Initiator:** Bryan (WhatsApp or dashboard)

### REQUIRED CONSTRAINTS
1. **API Standard:** Use Native Google Docs API (gog docs.create) ONLY. Zero fallback to .txt or .md for final deliverables.
2. **Transcript Ingestion:** Always ingest FULL transcript (approx. 20k–60k tokens) before artifact creation. No exceptions.
3. **Storage:** All output files are NATIVE Google Docs (application/vnd.google-apps.document). ZERO local copies in workspace (temp workspace files OK during processing, must be deleted post-filing).
4. **Artifact Structure:** Compressed artifact = 5 sections (A–E: Quotes, Episode Structure, Tension Map, Clip Candidates, First Principles).
5. **Deliverables:** All final text (Titles, Descriptions, Hooks, Clips, Timestamps) filed in native Google Doc with "Score: PASS" header at top.

### WORKFLOW STEPS
1. **Ingest:** Read full transcript into context (20k–60k tokens).
2. **Compress:** Create 5-section artifact locally (temp).
3. **File Artifact:** Create native Google Doc via `gog docs create --file [artifact.md] --parent [folder-id]`.
4. **Delegate:** Spawn subagents (OLG for hooks/titles/descriptions, Rob_C equivalent for clips).
5. **Await Completion:** Auto-announce on completion. Do not poll.
6. **File Deliverables:** Consolidate all subagent outputs into single native Google Doc via `gog docs create`.
7. **Score Pass:** Add "Score: PASS" header. Verify against Workflow Doc standards.
8. **Cleanup:** Delete all local .md/.txt files. Only GDrive artifacts remain.
9. **Report:** Provide folder link. ZERO content dumps to WhatsApp.

### LIVE LEARNING SYSTEM & HARD RULES (Updated 2026-03-05 12:35 EST)
- **Feedback Doc Location:** https://docs.google.com/document/d/15ewrXDLrhOTWd4nnLJTl0KvdLl7-ebZp0kf8LQErGuk/edit (native Google Doc, updated 2026-03-05)
- **Document ID:** 15ewrXDLrhOTWd4nnLJTl0KvdLl7-ebZp0kf8LQErGuk
- **Purpose:** Continuous SOP refinement + Hard Rules enforcement. Read before every new episode.
- **Read Before Each Episode:** At the start of every 'New Episode' trigger, Atlas MUST read Workflow_Feedback Doc first to check for updates and hard rules.
- **Active Instructions:** Any notes in Feedback Doc become active instructions for that episode. Hard Rules take precedence over this SOP if conflict.
- **Logging:** After each episode, Atlas logs timestamp + what worked + what failed + suggested improvements.

### HARD RULES (Non-Negotiable, from Workflow_Feedback)
1. **NO EM-DASHES EVER** - Any em-dash (—) is immediate failure
2. **INTRO HOOKS MUST BE VERBATIM WITH TIMESTAMPS** - No made-up text, exact quotes only
3. **AUDIO TITLES MUST INCLUDE GUEST NAME** - Non-negotiable for feed discovery
4. **AUDIO OPTION 2 MUST BE EPISODE-RELEVANT** - Not generic angles
5. **YOUTUBE TITLES MUST BE SEO-OPTIMIZED, HIGH-CTR, RELEVANT** - 70-100 chars, keyword phrases
6. **SOCIAL CLIPS REQUIRE TITLES + DESCRIPTIONS FOR SEO** - Every clip must have metadata
7. **SECTION E IS MANDATORY** - 3 newsletter title options + full drafts
8. **CONTEXTUAL AUTOCORRECT ENABLED** - Fix phonetic errors (myclobutanil, Leef Brands, etc.)
9. **ONLY REPORT AFTER STAGE 3 PASSES** - No content dumps to chat, only folder links
10. **ALL DELIVERABLES NATIVE GOOGLE DOCS** - Never .txt or .md uploads

### FOLDER STRUCTURE
```
/The Dime
  /Episodes
    /[Guest-Name-Date]
      - [Guest-Name-Date] — Compressed Artifact (native Google Doc)
      - [Guest-Name-Date] — Deliverables (native Google Doc, Score: PASS header)
  /System
    - Workflow_Feedback (native Google Doc — read before each episode, log updates after)
```

### CRITICAL RULES
- ❌ Never upload .md or .txt files as final deliverables
- ❌ Never dump content to WhatsApp/chat (only folder links)
- ❌ Never assume format conversion — you must execute it
- ❌ Never skip transcript ingestion
- ✅ Always ingest full context before artifact creation
- ✅ Always file as native Google Docs
- ✅ Always read Workflow_Feedback before starting new episode
- ✅ Always log updates to Workflow_Feedback after completion

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
- Gmail OAuth ✅ (configured 2026-02-22, full access confirmed 2026-02-23)
  - Account: atlas.opsman@gmail.com
  - Scopes: read, send, modify
  - Credentials: ~/.openclaw/.env (GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET)
  - Tokens: ~/.openclaw/workspace/credentials/gmail_tokens.json
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

## GitHub Access
- PAT Token: stored in ~/.openclaw/.env as GITHUB_PAT_TOKEN
- Repo: https://github.com/BF8thRev/AtlasNorth
- Access confirmed: 2026-03-02 — commit write access verified
- Token type: Fine-grained PAT with Contents: Read & Write on AtlasNorth repo

## Dime Episode Files (Corrected/Published)

### Micah Anderson Episode (3/4/26) — LEEF Cannabis
- **Compressed Artifact:** https://docs.google.com/document/d/1y8wDE4PJ4AbYy5TN6Y19jdErfJ81QkMQIttGXjICJ7A/edit
  - Doc ID: 1y8wDE4PJ4AbYy5TN6Y19jdErfJ81QkMQIttGXjICJ7A
  - Section A: Verbatim quotes with timestamps
  - Section B: Episode structure and data points
  - Section C: Tension map (5 high-tension moments)
  - Section D: Clip candidates (6 clips with titles and descriptions)
  - Section E: First Principles with 3 newsletter drafts

- **Deliverables (Score: PASS):** https://docs.google.com/document/d/1vx7tVy3wEyz9mNdcl-Gs9hABAgkkfsrdzPcg4L-PhhA/edit
  - Doc ID: 1vx7tVy3wEyz9mNdcl-Gs9hABAgkkfsrdzPcg4L-PhhA
  - Intro Hooks (3 options, verbatim with timestamps)
  - Audio Titles (3 options, includes guest name)
  - YouTube Titles (3 options, SEO-optimized)
  - Social Clips (6 clips with titles and SEO descriptions)
  - Spotify/Apple Description
  - YouTube Description
  - Timestamps (13 segments)
  - First Principles Newsletter (3 options with full drafts)
  - Quality Checklist (all hard rules verified)

- **Status:** Corrected (1 revision cycle), Single-threaded director model
- **Corrections:** Removed em-dashes, verified verbatim hooks, added SEO optimization, completed Section E
- **Filed:** 2026-03-05 12:30 EST

## Current Task Repetition Counts
(Track here as tasks repeat)

## Google Drive — Transcript Folders
- **The Dime workflow transcripts:** https://drive.google.com/drive/folders/165U0PXhdij9oGsiKs-HDb0whmqN2Rlhn
  - Folder ID: `165U0PXhdij9oGsiKs-HDb0whmqN2Rlhn`
  - Agent owners: Pulse (research/synthesis), OLG (content writing)
  - Trigger: New transcript → Pulse ingests → OLG drafts content
- **Newton sales call transcripts:** https://drive.google.com/drive/folders/1l13Fvo4LWsOE8LRnMkEisa5YI1ywXN_2
  - Folder ID: `1l13Fvo4LWsOE8LRnMkEisa5YI1ywXN_2`
  - Agent owners: Hunter (sales patterns), Ledger (data/metrics)
  - Trigger: New transcript → Hunter extracts objections/signals → Ledger logs metrics
