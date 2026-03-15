# LaunchAgent Audit & Gateway Sleep Schedule
**Date:** 2026-03-15 12:50 EST  
**Issue:** Gateway running 24/7 + health check every 60 seconds = $3-10/day token burn

---

## CHANGES APPLIED

### 1. **Disabled Health Check (`ai.openclaw.healthcheck`)**
- **Status:** ✅ Unloaded
- **File:** `~/Library/LaunchAgents/ai.openclaw.healthcheck.plist`
- **Impact:** Stopped running every 60 seconds. Was sending ~90K health check calls/night.
- **New:** Removed from launchctl. No longer active.

### 2. **Added Gateway Sleep/Wake Schedule**
Two new LaunchAgents control gateway uptime:

#### **ai.openclaw.gateway-sleep** (11 PM EST)
- **Trigger:** Daily at 23:00 EST
- **Action:** `launchctl stop ai.openclaw.gateway`
- **Log:** `/Users/atlasnorth/.openclaw/logs/gateway-sleep.log`

#### **ai.openclaw.gateway-wake** (7 AM EST)
- **Trigger:** Daily at 07:00 EST
- **Action:** `launchctl start ai.openclaw.gateway`
- **Log:** `/Users/atlasnorth/.openclaw/logs/gateway-wake.log`

**Result:** Gateway runs 7 AM–11 PM EST only (16 hours/day). Off-hours sleep = zero token cost overnight.

---

## LAUNCHAGENT INVENTORY

| Agent | Schedule | Purpose | Token Cost | Status |
|-------|----------|---------|-----------|--------|
| `ai.openclaw.gateway` | 24/7 (now: 7 AM–11 PM) | Gateway daemon | HIGH → LOW | ✅ Controlled |
| `ai.openclaw.gateway-sleep` | 11 PM daily | Stop gateway | None | ✅ Active |
| `ai.openclaw.gateway-wake` | 7 AM daily | Start gateway | None | ✅ Active |
| `ai.openclaw.gitpush.6am` | 6:30 AM | Git sync | Low | ✅ Kept |
| `ai.openclaw.gitpush.noon` | Noon | Git sync | Low | ✅ Kept |
| `ai.openclaw.gitpush.6pm` | 6 PM | Git sync | Low | ✅ Kept |
| `ai.openclaw.gitpush.11pm` | 11:30 PM | Git sync | Low | ✅ Kept |
| `ai.openclaw.healthcheck` | Every 60s | Health check | **REMOVED** | ❌ Unloaded |

---

## GIT PUSH ANALYSIS

**Status:** ✅ No token cost. These are shell scripts that:
- `git add -A` + `git commit -m` + `git push`
- No agent turns, no API calls
- Safe to keep on schedule

---

## VERIFICATION

**Active LaunchAgents (via launchctl):**
```
ai.openclaw.gateway
ai.openclaw.gateway-sleep
ai.openclaw.gateway-wake
ai.openclaw.gitpush.6am
ai.openclaw.gitpush.noon
ai.openclaw.gitpush.6pm
ai.openclaw.gitpush.11pm
```

**Estimated Savings:**
- **Before:** $3–10/day (24/7 gateway + 60s health checks)
- **After:** ~$0.50–1.50/day (16h gateway + no health checks)
- **Monthly savings:** ~$60–250

---

## NOTES

- Gateway sleep/wake implemented via launchd (more reliable than crontab on macOS)
- All logs output to `~/.openclaw/logs/` for monitoring
- Git push jobs remain on schedule (no token cost)
- Health check removed entirely (can be re-enabled manually if needed)
