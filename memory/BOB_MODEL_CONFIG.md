# Bob the Builder — Model Configuration

## Updated: 2026-03-24 @ 5:40 PM EST

### Current Configuration
**Primary:** `ollama/qwen3.5-coder:27b` (local, offline reasoning for complex builds)  
**Fallback 1:** `ollama/deepseek-coder:33b` (different architecture, strong coding alternative)  
**Fallback 2:** `ollama/phi4-mini:latest` (fast, lightweight backup when both primary/fallback1 under load)

### Rationale
- **Local-first strategy** — No API latency, unlimited tokens, offline capability
- **Qwen3.5-Coder** — Best coding capability, sophisticated reasoning for complex technical builds
- **DeepSeek-Coder 33B** — Different architecture provides fallback diversity, competitive on most coding tasks
- **Phi4-Mini** — Lightweight safety net, fast response when resources constrained
- **Removed:** `claude-sonnet-4-20250514` (no remote API fallback; stays local)

### Changes Applied
- Config patched in openclaw.json
- Gateway restarted (SIGUSR1)
- Status: ✅ Active and running

### Testing
Run Bob on coding tasks — verify it uses Qwen first, falls to Phi4 if needed.

---

### Related Configurations
- **Atlas Orchestrator:** `ollama/deepseek-r1:14b` (reasoning-first for coordination)
- **Olg (Writer):** `ollama/qwen3.5-coder:27b` (same primary as Bob)
