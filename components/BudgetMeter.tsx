"use client";

import { useState, useEffect } from "react";

type TokenEntry = {
  id: string;
  timestamp: string;
  agent: string;
  task: string;
  category: string;
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  notes?: string;
};

const categoryColors: Record<string, string> = {
  data_pull: "bg-blue-100 text-blue-700",
  analytics: "bg-purple-100 text-purple-700",
  analysis: "bg-yellow-100 text-yellow-700",
  build: "bg-green-100 text-green-700",
  research: "bg-pink-100 text-pink-700",
  brief: "bg-orange-100 text-orange-700",
  communication: "bg-cyan-100 text-cyan-700",
  other: "bg-gray-100 text-gray-600",
};

const agentIcons: Record<string, string> = {
  Atlas: "🗂️", Olg: "✍️", "Rob C": "📣", Hunter: "🎯", Pulse: "📡",
  "Dr. Frankl": "🧠", Ledger: "📊", Voss: "⚔️", Spark: "⚡",
  "Bob the Builder": "🔧", "Detective Niessen": "🕵️",
};

function formatNum(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : `${n}`;
}

function formatTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("en-US", {
    month: "short", day: "numeric",
    hour: "numeric", minute: "2-digit", hour12: true,
  });
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
}

export default function BudgetMeter() {
  const [entries, setEntries] = useState<TokenEntry[]>([]);
  const [view, setView] = useState<"log" | "by_agent" | "by_category">("log");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/files?path=token-log.json")
      .then((r) => r.json())
      .then((raw) => {
        const data = raw.content ? JSON.parse(raw.content || '{"log":[]}') : raw;
        const sorted = [...(data.log || [])].sort(
          (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        setEntries(sorted);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const totalTokens = entries.reduce((s, e) => s + e.totalTokens, 0);
  const totalInput = entries.reduce((s, e) => s + e.inputTokens, 0);
  const totalOutput = entries.reduce((s, e) => s + e.outputTokens, 0);

  // Per-agent breakdown
  const agentMap: Record<string, { total: number; input: number; output: number; count: number }> = {};
  entries.forEach((e) => {
    if (!agentMap[e.agent]) agentMap[e.agent] = { total: 0, input: 0, output: 0, count: 0 };
    agentMap[e.agent].total += e.totalTokens;
    agentMap[e.agent].input += e.inputTokens;
    agentMap[e.agent].output += e.outputTokens;
    agentMap[e.agent].count += 1;
  });
  const agentRows = Object.entries(agentMap).sort((a, b) => b[1].total - a[1].total);

  // Per-category breakdown
  const catMap: Record<string, { total: number; count: number }> = {};
  entries.forEach((e) => {
    const cat = e.category || "other";
    if (!catMap[cat]) catMap[cat] = { total: 0, count: 0 };
    catMap[cat].total += e.totalTokens;
    catMap[cat].count += 1;
  });
  const catRows = Object.entries(catMap).sort((a, b) => b[1].total - a[1].total);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center text-gray-400 text-sm">
        Loading token log...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Budget Meter</h1>
          <p className="text-gray-500 text-sm mt-1">
            Running token log · {entries.length} tasks tracked · {formatNum(totalTokens)} total tokens
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mt-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Total Tokens</p>
          <p className="text-2xl font-bold text-gray-900">{formatNum(totalTokens)}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Input Tokens</p>
          <p className="text-2xl font-bold text-blue-600">{formatNum(totalInput)}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Output Tokens</p>
          <p className="text-2xl font-bold text-purple-600">{formatNum(totalOutput)}</p>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex gap-2 mb-6">
        {(["log", "by_agent", "by_category"] as const).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              view === v
                ? "bg-gray-900 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {v === "log" ? "Running Log" : v === "by_agent" ? "By Agent" : "By Category"}
          </button>
        ))}
      </div>

      {/* Running Log */}
      {view === "log" && (
        <div className="space-y-2">
          {entries.length === 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-400 text-sm">
              No token usage logged yet.
            </div>
          )}
          {entries.map((e) => (
            <div
              key={e.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm px-4 py-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <span className="text-xl mt-0.5">{agentIcons[e.agent] || "🤖"}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{e.task}</p>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="text-xs text-gray-400">{formatTime(e.timestamp)}</span>
                      <span className="text-xs text-gray-300">·</span>
                      <span className="text-xs text-gray-500">{e.agent}</span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          categoryColors[e.category] || categoryColors.other
                        }`}
                      >
                        {e.category.replace("_", " ")}
                      </span>
                      {e.notes && (
                        <span className="text-xs text-gray-400 italic truncate max-w-xs">{e.notes}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-gray-900">{formatNum(e.totalTokens)}</p>
                  <p className="text-xs text-gray-400">
                    {formatNum(e.inputTokens)}↑ {formatNum(e.outputTokens)}↓
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* By Agent */}
      {view === "by_agent" && (
        <div className="space-y-3">
          {agentRows.map(([agent, stats]) => {
            const pct = Math.round((stats.total / totalTokens) * 100);
            return (
              <div key={agent} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span>{agentIcons[agent] || "🤖"}</span>
                    <span className="font-semibold text-gray-900 text-sm">{agent}</span>
                    <span className="text-xs text-gray-400">{stats.count} task{stats.count !== 1 ? "s" : ""}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-gray-900 text-sm">{formatNum(stats.total)}</span>
                    <span className="text-xs text-gray-400 ml-1">· {pct}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="flex gap-4 text-xs text-gray-400">
                  <span>Input: {formatNum(stats.input)}</span>
                  <span>Output: {formatNum(stats.output)}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* By Category */}
      {view === "by_category" && (
        <div className="space-y-3">
          {catRows.map(([cat, stats]) => {
            const pct = Math.round((stats.total / totalTokens) * 100);
            return (
              <div key={cat} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        categoryColors[cat] || categoryColors.other
                      }`}
                    >
                      {cat.replace("_", " ")}
                    </span>
                    <span className="text-xs text-gray-400">{stats.count} task{stats.count !== 1 ? "s" : ""}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-gray-900 text-sm">{formatNum(stats.total)}</span>
                    <span className="text-xs text-gray-400 ml-1">· {pct}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
