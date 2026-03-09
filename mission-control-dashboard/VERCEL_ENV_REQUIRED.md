# Vercel Environment Variables Required

Add these in the Vercel dashboard under **Settings → Environment Variables** for the `atlas-north` project:

| Variable | Value |
|---|---|
| `GITHUB_TOKEN` | *(extract from git remote URL — see below)* |
| `GITHUB_REPO` | `BF8thRev/AtlasNorth` |
| `GITHUB_BRANCH` | `main` |

## How to get GITHUB_TOKEN

Run this locally:
```bash
cd /Users/atlasnorth/.openclaw/workspace/mission-control-dashboard
git remote get-url origin
```
The PAT is embedded in the URL before `@github.com`. Copy that value.

## Why

Memory Vault saves on Vercel now write directly to GitHub via the Contents API instead of the ephemeral local filesystem. These env vars are required for that to work.

After adding them, **redeploy** the project (or it will auto-deploy on the next push).
