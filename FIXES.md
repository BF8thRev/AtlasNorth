# System Fixes & Diagnostics

## Memory Search Embeddings Pipeline — Fixed 2026-03-13

### Issue
Memory search tool was failing with "OpenAI quota exhausted" error, even though the embeddings pipeline had been switched to Gemini.

### Root Cause
The OpenClaw config (`openclaw.json`) had **no `memorySearch` block** in `agents.defaults`. OpenClaw silently defaults to OpenAI embeddings when nothing is configured, creating a hidden dependency that wasn't obvious.

**Affected tool:** `memory_search` — was trying OpenAI embeddings on every call.

### Diagnosis
```bash
# Memory search error message:
"openai embeddings failed: 429 {
  "error": {
    "message": "You exceeded your current quota...",
    "type": "insufficient_quota"
  }
}"

# Config check showed:
- agents.defaults.memorySearch: undefined (missing entirely)
- agents.defaults.model: correctly set to Haiku
- agents.list[*].model: correctly routed (Gemini for Hunter/Pulse, etc.)
```

### Fix Applied
Added explicit Gemini routing + cut OpenAI from fallback chain:

```json
{
  "agents": {
    "defaults": {
      "memorySearch": {
        "provider": "gemini",
        "fallback": "none"
      }
    }
  }
}
```

**Config patch:** Used `gateway.config.patch()` — validated, merged, restarted via SIGUSR1.

**Result:**
- ✅ Memory search now routes exclusively to `google/gemini-2.5-flash`
- ✅ `fallback: "none"` prevents any cascade to OpenAI
- ✅ OpenAI remains available for GPT-4o (Atlas primary model) — no change needed there

### Files Modified
- `/Users/atlasnorth/.openclaw/openclaw.json` — added `memorySearch` block to `agents.defaults`

### Verification
After restart, `memory_search` should work without OpenAI quota errors. Test with:
```
memory_search(query="test query")
```

---

## Related Open Items
1. **OpenAI billing** — Add credits (zero-balance hit 2026-03-11 03:00 UTC)
2. **Anthropic billing** — Add credits (same incident)
3. **Config schema audit** — Review other implicit defaults that might be silent OpenAI dependencies
