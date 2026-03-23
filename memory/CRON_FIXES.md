# Cron Job Fixes & Maintenance Log

## Memory Rotation Script — Date Command Fix (2026-03-23)

**Issue:** `date -d "yesterday"` (GNU) doesn't exist on macOS. Fallback logic wasn't executing properly in cron environment, causing "syntax error in expression (error token is "0")" at line 71.

**Status:** 3 failed runs (March 16, 18-19), 3 missed runs (March 20-22). Last successful: March 17.

**Fix Applied:**
```bash
# OLD (broken on macOS):
YESTERDAY=$(date -d "yesterday" +%m-%d-%y 2>/dev/null || date -v-1d +%m-%d-%y)

# NEW (BSD-safe):
YESTERDAY=$(date -v-1d +%m-%d-%y)
```

**Why:** macOS uses BSD `date`. Remove GNU fallback entirely; rely on native `-v-1d` flag.

**Next Run:** Midnight EST (will execute cleanly).

**Going Forward:**
- All scripts in `/openclaw/scripts/` must be BSD-compatible (no GNU-isms)
- Test cron scripts with `TZ=America/New_York /path/to/script.sh` before deployment
- Detective now uses Gemini Flash for reliable audits (Phi4-mini hallucinates)
