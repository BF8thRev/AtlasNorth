# Mission Control Dashboard - Deployment Guide

## Quick Start for Bryan

### Prerequisites
- GitHub account
- Vercel account (free tier works great)

---

## Step 1: Push to GitHub

1. **Create a new repository on GitHub:**
   - Go to https://github.com/new
   - Repository name: `mission-control-dashboard`
   - Set to Private (recommended)
   - Don't initialize with README (we already have one)
   - Click "Create repository"

2. **Push the code:**
   ```bash
   cd mission-control-dashboard
   git remote add origin https://github.com/YOUR-USERNAME/mission-control-dashboard.git
   git push -u origin main
   ```

---

## Step 2: Deploy to Vercel

### Option A: Via Vercel Dashboard (Recommended - Easiest!)

1. **Go to Vercel:**
   - Visit https://vercel.com
   - Sign in (or create account with GitHub)

2. **Import project:**
   - Click "Add New..." → "Project"
   - Select "Import Git Repository"
   - Choose your `mission-control-dashboard` repo
   - Click "Import"

3. **Configure deployment:**
   - Framework Preset: **Next.js** (should auto-detect)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)

4. **Add environment variable:**
   - Click "Environment Variables"
   - Add variable:
     - **Name:** `DASHBOARD_PASSWORD`
     - **Value:** Your secure password (e.g., `BryanFields2026!`)
     - Select: ✅ Production ✅ Preview ✅ Development
   - Click "Add"

5. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes for deployment to complete
   - 🎉 Your dashboard is live!

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (from project directory)
cd mission-control-dashboard
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? mission-control-dashboard
# - Directory? ./
# - Override settings? No

# Add password via dashboard after deployment
```

---

## Step 3: Access Your Dashboard

After deployment, Vercel provides a URL like:
```
https://mission-control-dashboard-abc123.vercel.app
```

**First access:**
- Your browser will prompt for authentication
- Username: (leave blank or type anything)
- Password: The password you set in `DASHBOARD_PASSWORD`

The password is remembered for 1 week via cookie.

---

## Step 4: Set Up Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your domain (e.g., `mission.bryanfields.com`)
4. Follow DNS configuration instructions
5. Vercel auto-configures HTTPS

---

## Updating the Dashboard Data

### Method 1: Direct File Edit (Simplest)

```bash
cd mission-control-dashboard
nano data/mission-control.json  # or use your preferred editor

# After editing:
git add data/mission-control.json
git commit -m "Update mission control data"
git push origin main
```

Vercel automatically detects the push and deploys in ~1 minute.

### Method 2: Use the Update Script

```bash
cd mission-control-dashboard
./update-data.sh
```

This script:
- Validates JSON format (if jq is installed)
- Commits the changes
- Pushes to GitHub
- Triggers automatic Vercel deployment

### Method 3: Python Script (Programmatic)

```bash
cd mission-control-dashboard

# Edit update-data.py to add your items
# Example functions available:
# - add_blocker(title, impact, difficulty, notes, status)
# - add_loop(title, impact, difficulty, notes, status)
# - update_status(item_id, new_status)
# - remove_item(item_id)

python update-data.py
```

---

## Data Format Reference

Each item in `data/mission-control.json` needs:

```json
{
  "id": "unique-id",
  "title": "Item Title",
  "impact": 85,           // 1-100
  "difficulty": 20,       // 1-100
  "notes": "Description and context",
  "status": "pending"     // pending|blocked|in-progress|waiting|done
}
```

**Status options:**
- `pending` - Needs attention (yellow)
- `blocked` - Cannot proceed (red)
- `in-progress` - Currently working (blue)
- `waiting` - Waiting on something (purple)
- `done` - Completed (green)

**Score colors:**
- 80-100: Red (high)
- 60-79: Orange (medium-high)
- 40-59: Yellow (medium)
- 1-39: Green (low)

---

## Changing the Password

1. Go to Vercel dashboard
2. Select your project
3. Settings → Environment Variables
4. Edit `DASHBOARD_PASSWORD`
5. Enter new password
6. Click "Save"
7. Redeploy (or wait for next automatic deployment)

---

## Troubleshooting

### Problem: "Authentication required" keeps appearing

**Solution:**
- Check that `DASHBOARD_PASSWORD` is set in Vercel environment variables
- Try a different browser or incognito mode
- Clear cookies and try again

### Problem: Data not updating

**Solution:**
- Check that JSON is valid: `cat data/mission-control.json | jq .`
- Verify git push was successful: `git log`
- Check Vercel deployment logs in dashboard

### Problem: Deployment failed

**Solution:**
- Check Vercel deployment logs
- Ensure all dependencies are in package.json
- Try redeploying: In Vercel, click "Deployments" → "..." → "Redeploy"

### Problem: 404 error

**Solution:**
- Ensure you're accessing the production URL from Vercel
- Check that deployment completed successfully
- Try the preview deployment first

---

## Local Development (Optional)

To test changes locally before deploying:

```bash
cd mission-control-dashboard

# Install dependencies (first time only)
npm install

# Set local password
echo "DASHBOARD_PASSWORD=test123" > .env.local

# Run development server
npm run dev

# Open http://localhost:3000
# Username: (anything)
# Password: test123
```

---

## Maintenance

### Auto-deployments
- Every push to `main` branch triggers a new deployment
- Deployments take 1-2 minutes
- Vercel sends email notifications on deployment status

### Monitoring
- Vercel provides analytics (free tier: basic metrics)
- Check deployment logs for errors
- Monitor in Vercel dashboard

### Backup
- Your code is in GitHub (versioned)
- Data is in the git repository
- Vercel keeps deployment history

---

## Next Steps

**For Bryan:**
1. Push to GitHub
2. Deploy to Vercel (5 minutes)
3. Access your dashboard
4. Share URL with team if needed

**For Atlas:**
1. Use `update-data.sh` or `update-data.py` to update data
2. Push changes to trigger deployment
3. Data updates live in ~1 minute

---

## Support Resources

- **Next.js Docs:** https://nextjs.org/docs
- **Vercel Docs:** https://vercel.com/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
- **GitHub Help:** https://docs.github.com

---

**Built with ⚡ for Bryan Fields**

Fast MVP → Quick iterations → Ship and learn 🚀
