# General Learnings

## 2026-02-15
- **Cron timezone mistake:** When using `tz` parameter in cron, the expr should be in LOCAL time, not UTC. Set `0 8 * * *` with `tz: America/New_York` for 8 AM EST. Do NOT convert to UTC when tz is specified.
- **First deliverable missed.** No excuses — double-check scheduled jobs by verifying nextRunAtMs converts to the expected time.

## 2026-02-24
- **Never deliver output that requires Bryan to copy-paste.** If I produce something (prospect list, content, task updates) that needs to land in a sheet/doc/system, I should either write it there directly OR explicitly say "I need access to X to save you this step." My job = offload work, not create steps for him.
