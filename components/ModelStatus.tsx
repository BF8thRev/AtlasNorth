"use client";

import { useState, useEffect } from "react";

type ModelAvailability = {
  status: "active" | "fallback" | "down";
  type: "api" | "local";
  last_checked: string;
};

type AgentRouting = {
  primary_model: string;
  fallback_model: string;
  role: string;
};

type ModelRouter = {
  model_availability: Record<string, ModelAvailability>;
  agent_routing: Record<string, AgentRouting>;
  model_switch_log: { timestamp: string; agent: string; from: string; to: string; reason: string }[];
};

const AGENT_ICONS: Record<string, string> = {
  atlas: "🗂️",
  olg: "✍️",
  rob_c: "📣",
  hunter: "🎯",
  pulse: "📡",
  dr_frankl: "🧠",
  ledger: "📊",
  voss: "⚔️",
  spark: "⚡",
  bob_the_builder: "🔧",
  detective_niessen: "🕵️",
};

const MODEL_SHORT: Record<string, string> = {
  "claude-opus-4-5-20251101": "Claude Opus",
  "claude-sonnet-4-20250514": "Claude Sonnet",
  "phi-4-mini-local": "Phi-4 Mini",
};

function statusBadge(status: string) {
  if (status === "active") return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">✅ Active</span>;
  if (status === "fallback") return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">⚠️ Fallback</span>;
  return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700">❌ Down</span>;
}

function agentStatusDot(primary: string, fallback: string, availability: Record<string, ModelAvailability>) {
  const primaryStatus = availability[primary]?.status;
  const fallbackStatus = availability[fallback]?.status;
  if (primaryStatus === "active") return <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" title="Primary active" />;
  if (fallbackStatus === "active") return <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block" title="Using fallback" />;
  return <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" title="Both down" />;
}

export default function ModelStatus() {
  const [data, setData] = useState<ModelRouter | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  const loadData = async () => {
    try {
      const res = await fetch("/api/files?path=MODEL_ROUTER.json");
      const json = await res.json();
      const parsed: ModelRouter = JSON.parse(json.content);
      setData(parsed);
      setLastRefresh(new Date());
    } catch (e) {
      setError("Failed to load MODEL_ROUTER.json");
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 60000);
    return () => clearInterval(interval);
  }, []);

  if (error) return <div className="p-8 text-red-500">{error}</div>;
  if (!data) return <div className="p-8 text-gray-400 animate-pulse">Loading model status...</div>;

  const availability = data.model_availability;
  const routing = data.agent_routing;
  const switchLog = data.model_switch_log ?? [];

  // E — count local vs API
  const localAgents = Object.values(routing).filter(a => a.primary_model === "phi-4-mini-local").length;
  const apiAgents = Object.values(routing).filter(a => a.primary_model !== "phi-4-mini-local").length;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">🧠 Model Status</h1>
        <span className="text-xs text-gray-400">Last refresh: {lastRefresh.toLocaleTimeString()}</span>
      </div>

      {/* A — Model Availability Cards */}
      <section>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Model Availability</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {Object.entries(availability).map(([modelId, info]) => (
            <div key={modelId} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-900 text-lg">{MODEL_SHORT[modelId] ?? modelId}</span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${info.type === "local" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`}>
                  {info.type === "local" ? "Local" : "API"}
                </span>
              </div>
              {statusBadge(info.status)}
              <p className="text-xs text-gray-400">Checked: {info.last_checked}</p>
            </div>
          ))}
        </div>
      </section>

      {/* B — Agent Routing Table */}
      <section>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Agent Routing</h2>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Agent</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Primary Model</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Fallback</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(routing).map(([agentId, cfg]) => (
                <tr key={agentId} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-800">
                    <span className="mr-2">{AGENT_ICONS[agentId] ?? "🤖"}</span>
                    {agentId}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{MODEL_SHORT[cfg.primary_model] ?? cfg.primary_model}</td>
                  <td className="px-4 py-3 text-gray-500">{MODEL_SHORT[cfg.fallback_model] ?? cfg.fallback_model}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {agentStatusDot(cfg.primary_model, cfg.fallback_model, availability)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* C — Token Usage */}
      <section>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Token Usage (Current Session)</h2>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4">
          {[
            { label: "Claude Sonnet", pct: 45, color: "bg-blue-500" },
            { label: "Claude Opus",   pct: 57, color: "bg-purple-500" },
          ].map(({ label, pct, color }) => (
            <div key={label}>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span className="font-medium">{label}</span>
                <span>{pct}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div className={`${color} h-3 rounded-full transition-all`} style={{ width: `${pct}%` }} />
              </div>
            </div>
          ))}
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span className="font-medium">Phi-4 Mini</span>
              <span className="text-green-600 font-bold">∞</span>
            </div>
            <div className="w-full bg-green-100 rounded-full h-3">
              <div className="bg-green-500 h-3 rounded-full w-full" />
            </div>
            <p className="text-xs text-green-600 mt-1">Unlimited — local model</p>
          </div>
        </div>
      </section>

      {/* D — Model Switch Log */}
      <section>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Last Model Switches</h2>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          {switchLog.length === 0 ? (
            <p className="text-gray-400 text-sm italic">No switches recorded — all models stable</p>
          ) : (
            <ul className="space-y-3">
              {switchLog.slice(-10).reverse().map((entry, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <span className="text-gray-300 mt-0.5">•</span>
                  <div>
                    <span className="font-medium text-gray-800">{entry.agent}</span>
                    <span className="text-gray-500"> switched from </span>
                    <span className="text-red-500">{MODEL_SHORT[entry.from] ?? entry.from}</span>
                    <span className="text-gray-500"> → </span>
                    <span className="text-green-600">{MODEL_SHORT[entry.to] ?? entry.to}</span>
                    {entry.reason && <span className="text-gray-400"> ({entry.reason})</span>}
                    <p className="text-xs text-gray-400">{entry.timestamp}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* E — Local vs API Distribution */}
      <section>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Local vs API Distribution</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-5 text-center">
            <p className="text-3xl font-bold text-purple-700">{localAgents}</p>
            <p className="text-sm font-medium text-purple-600 mt-1">Local Tasks</p>
            <p className="text-xs text-purple-400">agents on Phi-4 Mini</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-center">
            <p className="text-3xl font-bold text-blue-700">{apiAgents}</p>
            <p className="text-sm font-medium text-blue-600 mt-1">API Tasks</p>
            <p className="text-xs text-blue-400">agents on Claude</p>
          </div>
        </div>
      </section>
    </div>
  );
}
