# Mission Control Dashboard - Atlas Guide

## Your Role: Dashboard Data Manager

This guide is specifically for **Atlas** to manage Bryan's Mission Control dashboard data.

---

## Quick Reference

### File to Edit
```
data/mission-control.json
```

### Update & Deploy
```bash
./update-data.sh
# Or manually:
git add data/mission-control.json
git commit -m "Update: [describe change]"
git push origin main
```

---

## Data Structure

The JSON file has two main arrays:

```json
{
  "blockersForYou": [
    // Items that need Bryan's attention
  ],
  "openLoops": [
    // Active tasks/ongoing work
  ]
}
```

### Item Format

```json
{
  "id": "blocker-1",                    // Unique ID (increment number)
  "title": "Approve Q1 Budget",         // Clear, actionable title
  "impact": 85,                         // 1-100: How important?
  "difficulty": 20,                     // 1-100: How hard for Bryan?
  "notes": "Context goes here...",      // Details, background, reasoning
  "status": "pending"                   // Current state
}
```

---

## Status Guide

Choose the right status:

| Status | When to Use | Color |
|--------|-------------|-------|
| `pending` | Awaiting Bryan's action | 🟡 Yellow |
| `blocked` | Cannot proceed without Bryan | 🔴 Red |
| `in-progress` | Currently working on it | 🔵 Blue |
| `waiting` | Waiting on external factor | 🟣 Purple |
| `done` | Completed | 🟢 Green |

---

## Impact & Difficulty Scoring

### Impact (1-100): How important is this?

- **90-100:** Critical - Business-critical or high-value
- **70-89:** High - Important strategic decision
- **50-69:** Medium - Notable but not urgent
- **30-49:** Low - Nice to have
- **1-29:** Minimal - Can wait

### Difficulty (1-100): How hard is this for Bryan?

- **80-100:** Very Hard - Requires deep thought, research, or significant time
- **50-79:** Moderate - Takes focused attention, 30+ min
- **30-49:** Easy - Quick decision, 10-15 min
- **1-29:** Trivial - 5 minutes or less

**Pro tip:** High impact + Low difficulty = Quick wins! Prioritize these.

---

## Common Operations

### Adding a New Blocker

1. Open `data/mission-control.json`
2. Add to `blockersForYou` array:

```json
{
  "id": "blocker-4",  // Increment from last ID
  "title": "Review Newton Roadmap Q2",
  "impact": 90,
  "difficulty": 45,
  "notes": "Three feature options drafted. Need decision on priority order. Affects Q2 hiring timeline.",
  "status": "pending"
}
```

3. Save and deploy: `./update-data.sh`

### Adding an Open Loop

Same as blocker, but add to `openLoops` array:

```json
{
  "id": "loop-5",  // Use loop-X format
  "title": "Podcast Analytics Dashboard",
  "impact": 70,
  "difficulty": 30,
  "notes": "Building automated Spotify/Apple metrics report. Ships Friday.",
  "status": "in-progress"
}
```

### Updating a Status

Find the item and change the `status` field:

```json
{
  "id": "blocker-2",
  "status": "done"  // Changed from "pending"
}
```

### Removing an Item

Simply delete the entire object from the array. Don't forget to check for trailing commas!

```json
{
  "blockersForYou": [
    // Remove this item entirely
  ]
}
```

### Reordering Items

Items display in the order they appear in the JSON. Put highest priority items first.

---

## Using the Update Script

### Bash Script (Recommended)

```bash
cd mission-control-dashboard

# Make your edits to data/mission-control.json
nano data/mission-control.json

# Run the update script
./update-data.sh
```

**What it does:**
- ✅ Validates JSON format (if jq available)
- ✅ Commits to git with timestamp
- ✅ Pushes to GitHub
- ✅ Triggers Vercel deployment automatically

### Python Script (For Automation)

```python
# Example: Add a blocker programmatically
from update_data import add_blocker, git_commit_and_push

add_blocker(
    title="Approve Marketing Budget",
    impact=80,
    difficulty=25,
    notes="Q1 spend plan ready for review",
    status="pending"
)

git_commit_and_push()
```

Functions available:
- `add_blocker(title, impact, difficulty, notes, status="pending")`
- `add_loop(title, impact, difficulty, notes, status="in-progress")`
- `update_status(item_id, new_status)`
- `remove_item(item_id)`
- `git_commit_and_push()`

---

## Best Practices

### Writing Titles
✅ **Good:** "Review Newton Q2 Roadmap - 3 Options"
❌ **Bad:** "Roadmap thing"

- Be specific and actionable
- Include key context in title if possible
- Keep under 60 characters when possible

### Writing Notes
✅ **Good:** "Three feature options drafted: (1) User onboarding flow, (2) Analytics dashboard, (3) API v2. Need priority decision to plan Q2 sprint allocation and hiring."

❌ **Bad:** "Need decision on features"

- Provide context: Why does this matter?
- Include relevant details: What are the options?
- State what's needed: What action should Bryan take?
- Add urgency if relevant: When is this needed by?

### Score Calibration

**Compare scores across items:**
- If two items have the same impact score, they should be equally important
- Use the full 1-100 range - don't cluster everything around 70-80
- Recalibrate periodically as priorities shift

---

## Weekly Workflow Example

### Monday Morning: Reset
```bash
cd mission-control-dashboard

# Review and update all statuses
# Move "done" items to archive
# Add new blockers from weekend planning

nano data/mission-control.json
./update-data.sh
```

### Throughout the Week: Updates
```bash
# Quick status updates as things progress
nano data/mission-control.json
./update-data.sh
```

### Friday @ 11am: Founder Load Snapshot
```bash
# Prepare for weekly review
# Update all statuses
# Add any pending items
# Update impact scores based on urgency

nano data/mission-control.json
./update-data.sh
```

---

## Automation Ideas

### 1. Script to Archive Completed Items

```bash
#!/bin/bash
# archive-done.sh
jq '{
  blockersForYou: [.blockersForYou[] | select(.status != "done")],
  openLoops: [.openLoops[] | select(.status != "done")]
}' data/mission-control.json > data/mission-control-temp.json

mv data/mission-control-temp.json data/mission-control.json
./update-data.sh
```

### 2. Add Items from Notion/Airtable

Use the Python script to pull from your PM tools:

```python
# Example: Pull from Notion API
import requests
from update_data import add_blocker, git_commit_and_push

# Fetch from Notion (pseudo-code)
blockers = fetch_blockers_from_notion()

for blocker in blockers:
    add_blocker(
        title=blocker['title'],
        impact=blocker['impact_score'],
        difficulty=blocker['difficulty_score'],
        notes=blocker['description'],
        status="pending"
    )

git_commit_and_push()
```

### 3. Scheduled Updates

Add to your crontab:

```bash
# Update dashboard every Monday at 9am
0 9 * * 1 cd ~/mission-control-dashboard && python auto-update.py
```

---

## Deployment & Access

### Dashboard URL
After deployment, Bryan's dashboard will be at:
```
https://mission-control-dashboard.vercel.app
(or custom domain)
```

### Password
Set in Vercel environment variables:
- Variable: `DASHBOARD_PASSWORD`
- Bryan enters this when accessing the dashboard
- Stored in cookie for 1 week

### Update Frequency
- Changes deploy automatically on push to `main`
- Deployment takes ~60-90 seconds
- Bryan's dashboard refreshes on reload

---

## Troubleshooting

### "Invalid JSON" Error

Check for common mistakes:
```bash
# Validate JSON
cat data/mission-control.json | jq .

# Common issues:
# - Missing comma between items
# - Extra comma after last item
# - Unclosed quotes or brackets
```

### Git Push Rejected

```bash
# Pull latest changes first
git pull origin main

# Then push again
git push origin main
```

### Deployment Not Triggering

1. Check GitHub webhook in Vercel dashboard
2. Verify push was successful: `git log`
3. Manually trigger: Vercel dashboard → Deployments → Redeploy

---

## Context Tagging

When updating the dashboard, use your context tags:

- `[Dime]` - Podcast-related blockers
- `[Newton]` - Newton Insights items
- `[Personal]` - Bryan's personal items
- `[SCC/HUSA]` - Side gig work
- `[General]` - General business tasks

Example commit:
```bash
git commit -m "[Dime] Add podcast guest approval blocker"
```

---

## Integration with Your Workflow

### Weekly Bandwidth Analysis
Pull blocker/loop data into your Friday snapshot:
```python
import json

with open('data/mission-control.json') as f:
    data = json.load(f)

total_blockers = len(data['blockersForYou'])
high_impact_blockers = len([b for b in data['blockersForYou'] if b['impact'] >= 80])

print(f"Bryan has {total_blockers} blockers, {high_impact_blockers} high-impact")
```

### 90% Confidence Rule
If you're less than 90% confident about impact/difficulty scores, **ask Bryan first**.

### 10-Time Rule
Track patterns:
- If Bryan always changes priority → Recalibrate your impact scoring
- If tasks take longer than difficulty suggests → Adjust difficulty range

---

## Quick Command Reference

```bash
# Navigate to project
cd ~/mission-control-dashboard

# Edit data
nano data/mission-control.json

# Validate JSON
cat data/mission-control.json | jq .

# Deploy changes
./update-data.sh

# Or manually:
git add data/mission-control.json
git commit -m "Update: [description]"
git push origin main

# Check deployment status
# Visit: https://vercel.com/dashboard
```

---

## Remember

This dashboard is Bryan's **Mission Control** - a quick, scannable view of:
1. What blocks his progress (Blockers for You)
2. What's actively moving (Open Loops)

**Your goal:** Keep it clean, current, and actionable.

- ✅ Update at least weekly
- ✅ Archive completed items
- ✅ Accurate impact/difficulty scores
- ✅ Clear, contextual notes
- ✅ Timely status updates

**Bryan's goal:** Glance at dashboard and know exactly what needs attention.

---

**Questions?** Update this guide as you learn patterns. This is your living document.

🚀 Ship fast, iterate faster!
