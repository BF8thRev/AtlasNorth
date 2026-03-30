## ⚙️ ATLAS DIME EPISODE WORKFLOW (Updated 2026-03-30)

**This is Atlas's operational guide for Dime episode production.**

**Separate from:** `/Users/atlasnorth/.openclaw/workspace/agents/olg/DIME_EPISODE_SOP.md` (OLG's workflow)

---

## Overview

**Workflow Sequence:**
1. Bryan signals "New episode ready" with [Guest Name] + [Transcript Path]
2. **Atlas spawns OLG** with explicit first instruction to read OLG's SOP
3. **OLG produces artifact** (6 sections, all requirements met)
4. **Atlas receives OLG report** (folder link + compliance verification)
5. **Atlas verifies OLG compliance** before proceeding
6. **Atlas creates Simplecast draft** (credentials, episode notes, contributor setup)
7. **Atlas files episode notes** in Simplecast
8. **Atlas reports to Bryan** with Simplecast draft link

---

## Step 1: Spawn OLG

**Trigger:** Bryan sends [Guest Name] + [Transcript Path]

**Atlas Action:**
```
sessions_spawn(
  runtime="subagent"
  task="OLG: Build Dime episode artifact"
  label="OLG-Dime-Episode-[Guest-Name]"
  mode="run"
)
```

**MANDATORY First Instruction in Task:**
```
CRITICAL: Read DIME_EPISODE_SOP.md at 
/Users/atlasnorth/.openclaw/workspace/agents/olg/DIME_EPISODE_SOP.md 
before doing anything else.

[Then include full OLG task spec]
```

**OLG's Deliverable:** 
- 6-section artifact filed to Episodes folder
- Report with folder link + compliance verification

---

## Step 2: Verify OLG Compliance

**Atlas receives:** OLG completion report with artifact link

**Compliance Checklist (non-negotiable):**
- ✅ Section A: 3 hook options (verbatim + timestamp + duration + explanation)
- ✅ Section B: Show description (3 paragraphs, NO bullets)
- ✅ Section C: 1–3 social clips (verbatim, title, SEO description, viral potential)
- ✅ Section D: Timestamps + key quotes
- ✅ Section E: 3 newsletter options (distinct angles, no em-dashes, full drafts)
- ✅ Section F: YouTube (title 70–100 chars, description with bullets, cover text, links)
- ✅ All 11 hard rules verified (no em-dashes, verbatim hooks, guest name in titles, etc.)

**If non-compliant:** Report failure to Bryan with details. Do NOT proceed to Simplecast.

**If compliant:** Proceed to Step 3.

---

## Step 3: Create Simplecast Draft

**Access Credentials (SECURE — NEVER COMMIT TO GITHUB):**
- Account email: `atlas.opsman+simple@gmail.com`
- Password: `HnyF@@pmRxU6z@q`
- Show ID: `583052dc-8161-4a60-8c68-f486c33c8be9`
- Account ID: `e239093b-4ab7-44ce-89ed-4f890f9603ac`

**Process:**
1. Login to Simplecast (https://simplecast.com)
2. Navigate to Episodes → Drafts tab
3. Click "Add Episode"
4. **Fill Title:** `[Guest Name] – Draft For Contributors`
5. **Add Episode Contributors:**
   - Bryan Fields
   - [Guest Name]
6. **Paste Episode Notes** (see template below) into Episode Notes field
7. **Save as Draft** (do NOT publish, do NOT add audio file yet)

**Do NOT:**
- Publish the episode
- Add audio file
- Edit Section A–F data (OLG data is authoritative)

---

## Step 4: Episode Notes Template

**Copy & paste EXACTLY into Simplecast Episode Notes field:**

```
Our Links

Bryan Fields on Twitter https://x.com/BryanFields24

Kellan Finney on Twitter https://x.com/Kellan_Finney

The Dime on Twitter https://x.com/TheDime_8th

Extraction Teams: Want to cut costs and get more out of every run? Unlock hidden revenue by extracting more from the same input—with Newton Insights https://www.newton-insights.com/?utm_source=Thedime&utm_medium=pod&utm_campaign=simple_link

At Eighth Revolution (8th Rev) https://www.eighthrevolution.com/the-dime/ - we provide services from capital to cannabinoid and everything in between in the cannabinoid industry.

The Dime is a top 5% most shared global podcast https://twitter.com/BryanFields24/status/1597975425321410560/photo/2

The Dime is a top 10 Cannabis Podcast https://www.millionpodcasts.com/marijuana-podcasts/

The Dime has a New Website. Shhhh its not finished. https://dimepodcast.com/

🎥 YouTube: The Dime https://www.youtube.com/channel/UCcck3tzBNXrJ1WJ8EtIVq1w

📸 Instagram: The Dime https://www.instagram.com/thedime_8th

https://www.newton-insights.com/
```

---

## Step 5: Report to Bryan

**When Simplecast draft is complete:**

Send message to Bryan (WhatsApp):
```
[Dime]

Simplecast draft created: [Guest Name] – Draft For Contributors

Status: Ready for audio production
Contributors: Bryan Fields, [Guest Name]
Artifact Link: [OLG Episodes folder link]

Awaiting audio file + publish.
```

---

## Failure Modes

**If OLG report shows non-compliance:**
- Do NOT create Simplecast draft
- Report to Bryan: specific failures + which sections failed
- Wait for Bryan direction before retrying with OLG

**If Simplecast credentials fail:**
- Verify credentials in this file
- Check Simplecast account status
- Report error to Bryan

**If Episode Notes fail to save:**
- Verify format (no special characters)
- Paste as plain text, not formatted
- Report error to Bryan

---

## SOURCE OF TRUTH

- **OLG's SOP:** `/Users/atlasnorth/.openclaw/workspace/agents/olg/DIME_EPISODE_SOP.md`
- **Atlas Workflow (this file):** `/Users/atlasnorth/.openclaw/workspace/ATLAS_DIME_WORKFLOW.md`
- **Dime Content Feedback:** https://docs.google.com/document/d/15ewrXDLrhOTWd4nnLJTl0KvdLl7-ebZp0kf8LQErGuk/edit
- **Episodes Folder:** https://drive.google.com/drive/folders/1N-E2sxnHsus6x83LfSMfKLccSOBzQyV7
