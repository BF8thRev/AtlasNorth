# Mission Control Dashboard

A clean, fast MVP dashboard for Bryan Fields to track blockers and open loops.

## Features

- ✅ Next.js 15 + Tailwind CSS
- ✅ Vertical navigation on the left side
- ✅ Two sections: "Blockers for You" and "Open Loops"
- ✅ Impact/Difficulty scores with color coding
- ✅ Status badges
- ✅ Mobile-responsive design
- ✅ JSON-based data source
- ✅ Basic password protection
- ✅ Ready for Vercel deployment

## Getting Started

### Prerequisites

- Node.js 20+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd mission-control-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Updating Data

### For Atlas: How to Update the Dashboard Data

The dashboard reads from `data/mission-control.json`. To update the data:

1. **Direct File Edit:**
   ```bash
   cd mission-control-dashboard
   # Edit data/mission-control.json with your preferred editor
   nano data/mission-control.json
   ```

2. **Via Script (Recommended):**
   
   Create a simple script to update the data programmatically:
   
   ```bash
   # update-mission-control.sh
   #!/bin/bash
   
   cat > data/mission-control.json << 'EOF'
   {
     "blockersForYou": [
       {
         "id": "blocker-1",
         "title": "Your Title Here",
         "impact": 85,
         "difficulty": 20,
         "notes": "Description here",
         "status": "pending"
       }
     ],
     "openLoops": [
       {
         "id": "loop-1",
         "title": "Task Title",
         "impact": 60,
         "difficulty": 15,
         "notes": "Task description",
         "status": "in-progress"
       }
     ]
   }
   EOF
   
   git add data/mission-control.json
   git commit -m "Update mission control data"
   git push origin main
   ```

3. **Data Format:**

   Each item requires:
   - `id`: Unique identifier (string)
   - `title`: Item title (string)
   - `impact`: Score 1-100 (number)
   - `difficulty`: Score 1-100 (number)
   - `notes`: Description/context (string)
   - `status`: One of: `"pending"`, `"blocked"`, `"in-progress"`, `"waiting"`, `"done"`

4. **After updating:**
   - Commit and push to GitHub
   - Vercel will automatically redeploy with new data

## Password Protection Setup

### Development

The default password is `mission2026` (set in `.env.local`)

### Production (Vercel)

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add a new variable:
   - **Name:** `DASHBOARD_PASSWORD`
   - **Value:** Your secure password (e.g., a strong passphrase)
   - **Environments:** Check "Production", "Preview", and "Development"
4. Click "Save"
5. Redeploy the app

### Accessing the Dashboard

When you visit the dashboard, your browser will prompt for credentials:
- **Username:** (leave blank or type anything)
- **Password:** The password you set in `DASHBOARD_PASSWORD`

The authentication cookie lasts 1 week, so you won't need to re-enter it frequently.

## Deployment to Vercel

### Option 1: Via Vercel Dashboard (Easiest)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Click "Add New Project"
4. Import your GitHub repository
5. Configure:
   - **Framework Preset:** Next.js
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
6. Add environment variable:
   - `DASHBOARD_PASSWORD` = your-secure-password
7. Click "Deploy"

### Option 2: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Follow the prompts
# Add environment variables when prompted or via dashboard
```

### After Deployment

Vercel will provide:
- **Production URL:** https://mission-control-dashboard.vercel.app (or your custom domain)
- **Automatic deployments:** Every push to main branch triggers a new deployment
- **Preview deployments:** Pull requests get their own preview URLs

## Project Structure

```
mission-control-dashboard/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main dashboard page
│   └── globals.css         # Global styles
├── components/
│   ├── BlockerCard.tsx     # Card component for items
│   └── Navigation.tsx      # Left sidebar navigation
├── data/
│   └── mission-control.json # Data source (edit this!)
├── public/                  # Static assets
├── middleware.ts            # Password protection
├── next.config.ts           # Next.js config
├── tailwind.config.ts       # Tailwind config
└── package.json             # Dependencies

```

## Customization

### Change Colors

Edit `tailwind.config.ts` to customize the color scheme.

### Add New Sections

1. Add new data array to `data/mission-control.json`
2. Add navigation item in `components/Navigation.tsx`
3. Update the tab logic in `app/page.tsx`

### Modify Score Thresholds

Edit the `getScoreColor` function in `components/BlockerCard.tsx` to adjust color coding.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Deployment:** Vercel
- **Authentication:** HTTP Basic Auth with cookies

## Support

For issues or questions:
- Check the [Next.js documentation](https://nextjs.org/docs)
- Review [Tailwind CSS docs](https://tailwindcss.com/docs)
- Contact Atlas for data update questions

---

Built with ⚡ for Bryan Fields | MVP shipped fast, iterate faster
