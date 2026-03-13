"use client";

import { useState, useEffect } from "react";

// ── Types (aligned with /api/runtime-config response) ─────────────────────────

type AgentEntry = {
  id: string;
  name: string;
  emoji: string;
  role: string;
  primary_model: string;
  fallback_models: string[];
  source: "openclaw_runtime" | "mc_config";
  notes?: string;
};

type ModelPoolEntry = {
  type: "api" | "local";
  provider: string;
  status: "active" | "unknown";
};

type RuntimeConfig = {
  source: "openclaw_runtime" | "mc_config";
  loaded_from: string;
  last_updated: string;
  agents: AgentEntry[];
  model_pool: Record<string, ModelPoolEntry>;
  global_defaults: {
    primary: string;
    fallbacks: string[];
  };
};

// ── Display helpers ────────────────────────────────────────────────────────────

const MODEL_SHORT: Record<string, string> = {
  "anthropic/claude-haiku-4-5-20251001": "Claude Haiku",
  "anthropic/claude-haiku-4-6":          "Claude Haiku 4.6",
  "anthropic/claude-sonnet-4-6":         "Claude Sonnet 4.6",
  "anthropic/claude-sonnet-4-20250514":  "Claude Sonnet",
  "anthropic/claude-opus-4-6":           "Claude Opus 4.6",
  "anthropic/claude-opus-4-5-20251101":  "Claude Opus",
  "claude-haiku-4-5-20251001":           "Claude Haiku",
  "claude-sonnet-4-20250514":            "Claude Sonnet",
  "ollama/phi4-mini:latest":             "Phi-4 Mini",
  "ollama/deepseek-r1:14b":              "DeepSeek R1 14B",
  "ollama/qwen3.5-coder:27b":            "Qwen 3.5 Coder 27B",
  "google/gemini-2.5-flash":             "Gemini 2.5 Flash",
  "openai/gpt-4o":                       "GPT-4o",
  "gpt-4o":                              "GPT-4o",
  "openai/gpt-4-turbo":                  "GPT-4 Turbo",
  "gpt-4-turbo":                         "GPT-4 Turbo",
};

function shortModel(id: string): string {
  return MODEL_SHORT[id] ?? id.replace("anthropic/", "").replace("openai/", "").replace("google/", "").replace("ollama/", "");
}

function SourceBadge({ source }: { source: "openclaw_runtime" | "mc_config" }) {
  if (source === "openclaw_runtime") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">
        ⚡ Live Runtime
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
      📄 MC Config
    </span>
  );
}

function ModelTypeBadge({ type }: { type: "api" | "local" }) {
  if (type === "local") {
    return <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">Local</span>;
  }
  return <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">API</span>;
}

export default function ModelStatus() {
  const [data, setData] = useState<RuntimeConfig | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/runtime-config");
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error ?? `HTTP ${res.status}`);
      }
      const json: RuntimeConfig = await res.json();
      setData(json);
      setLastRefresh(new Date());
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  };

  // Single load on mount — no polling. Manual refresh button for updates.
  useEffect(() => { loadData(); }, []);

  if (loading && !data) {
    return <div className="p-8 text-gray-400 animate-pulse">Loading model status...</div>;
  }

  if (error) {
    return (
      <div className="p-8 space-y-4">
        <div className="text-red-500 font-semibold">Failed to load runtime config</div>
        <pre className="text-xs text-red-400 bg-red-50 p-4 rounded-lg overflow-auto">{error}</pre>
        <button onClick={loadData} className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors">
          Retry
        </button>
      </div>
    );
  }

  if (!data) return null;

  const localAgents = data.agents.filter(a => data.model_pool[a.primary_model]?.type === "local").length;
  const apiAgents   = data.agents.filter(a => data.model_pool[a.primary_model]?.type !== "local").length;

  return (
    <div className="max-w-6xl mx-auto space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-gray-900">🧠 Model Status</h1>
          <SourceBadge source={data.source} />
        </div>
        <div className="flex items-center gap-3">
          {lastRefresh && (
            <span className="text-xs text-gray-400">
              Refreshed: {lastRefresh.toLocaleTimeString()}
            </span>
          )}
          <button
            onClick={loadData}
            disabled={loading}
            className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            {loading ? "Refreshing…" : "↻ Refresh"}
          </button>
        </div>
      </div>

      {/* Source info banner */}
      <div className={`rounded-xl border px-5 py-3 text-sm flex items-start gap-3 ${
        data.source === "openclaw_runtime"
          ? "bg-green-50 border-green-200 text-green-800"
          : "bg-blue-50 border-blue-200 text-blue-800"
      }`}>
        <div className="mt-0.5 flex-shrink-0">
          {data.source === "openclaw_runtime" ? "⚡" : "📄"}
        </div>
        <div>
          <span className="font-semibold">
            {data.source === "openclaw_runtime"
              ? "Reading live OpenClaw runtime"
              : "Reading Mission Control config"}
          </span>
          <span className="ml-2 font-mono text-xs opacity-70 break-all">{data.loaded_from}</span>
          <div className="text-xs opacity-60 mt-0.5">
            Last updated: {data.last_updated}
            {data.source === "mc_config" && (
              <> · To see live state, set <code className="font-mono">OPENCLAW_CONFIG_PATH</code> in your env</>
            )}
          </div>
        </div>
      </div>

      {/* A — Agent Routing Table */}
      <section>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Agent Routing</h2>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Agent</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Role</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Primary Model</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Fallbacks</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Type</th>
              </tr>
            </thead>
            <tbody>
              {data.agents.map((agent) => {
                const poolEntry = data.model_pool[agent.primary_model];
                return (
                  <tr key={agent.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">
                      <span className="mr-2">{agent.emoji}</span>
                      {agent.name}
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs max-w-xs truncate" title={agent.role}>
                      {agent.role}
                    </td>
                    <td className="px-4 py-3 text-gray-700 font-mono text-xs">
                      {shortModel(agent.primary_model)}
                      {agent.notes && (
                        <div className="text-gray-400 font-sans text-xs mt-0.5">{agent.notes}</div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs">
                      {agent.fallback_models.map(f => shortModel(f)).join(" → ")}
                    </td>
                    <td className="px-4 py-3">
                      <ModelTypeBadge type={poolEntry?.type ?? "api"} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* B — Model Pool */}
      <section>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Model Pool</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {Object.entries(data.model_pool).map(([modelId, info]) => (
            <div key={modelId} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col gap-2">
              <div className="flex items-start justify-between gap-2">
                <span className="font-bold text-gray-900 text-sm leading-tight break-all">{shortModel(modelId)}</span>
                <ModelTypeBadge type={info.type} />
              </div>
              <div className="text-xs text-gray-400">{info.provider}</div>
              <div className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${info.status === "active" ? "bg-green-500" : "bg-gray-300"}`} />
                <span className="text-xs text-gray-500 capitalize">{info.status}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* C — Local vs API Distribution */}
      <section>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Local vs API Distribution</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-5 text-center">
            <p className="text-3xl font-bold text-purple-700">{localAgents}</p>
            <p className="text-sm font-medium text-purple-600 mt-1">Local-Primary Agents</p>
            <p className="text-xs text-purple-400 mt-0.5">Running on Ollama / Phi</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-center">
            <p className="text-3xl font-bold text-blue-700">{apiAgents}</p>
            <p className="text-sm font-medium text-blue-600 mt-1">API-Primary Agents</p>
            <p className="text-xs text-blue-400 mt-0.5">Claude / GPT / Gemini</p>
          </div>
        </div>
      </section>

      {/* D — Global Defaults */}
      <section>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Global Defaults</h2>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-2 text-sm">
          <div className="flex gap-3">
            <span className="text-gray-500 w-24 flex-shrink-0">Primary</span>
            <span className="font-mono text-gray-800">{shortModel(data.global_defaults.primary)}</span>
          </div>
          <div className="flex gap-3">
            <span className="text-gray-500 w-24 flex-shrink-0">Fallbacks</span>
            <span className="font-mono text-gray-700">
              {data.global_defaults.fallbacks.map(f => shortModel(f)).join(" → ")}
            </span>
          </div>
          <div className="pt-2 border-t border-gray-100 text-xs text-gray-400">
            Applied to agents without explicit model config
          </div>
        </div>
      </section>

    </div>
  );
}
