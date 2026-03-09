"use client";

import { useState, useEffect } from "react";

type GoalColor = "red" | "blue" | "gray" | "green" | "purple";

type Goal = {
  id: string;
  platform: string;
  icon: string;
  metric: string;
  baseline: number | null;
  baselineDate: string;
  current: number | null;
  target: number;
  unit: string;
  url: string;
  autoRefresh: boolean;
  color: GoalColor;
  notes: string;
};

const colorMap: Record<GoalColor, { bar: string; badge: string; ring: string }> = {
  red:    { bar: "bg-red-500",    badge: "bg-red-100 text-red-700",    ring: "ring-red-200" },
  blue:   { bar: "bg-blue-500",   badge: "bg-blue-100 text-blue-700",  ring: "ring-blue-200" },
  gray:   { bar: "bg-gray-500",   badge: "bg-gray-100 text-gray-700",  ring: "ring-gray-200" },
  green:  { bar: "bg-green-500",  badge: "bg-green-100 text-green-700",ring: "ring-green-200" },
  purple: { bar: "bg-purple-500", badge: "bg-purple-100 text-purple-700", ring: "ring-purple-200" },
};

const STORAGE_KEY = "atlas-goals-v1";

function pct(current: number | null, baseline: number | null, target: number): number {
  if (current === null || baseline === null) return 0;
  const progress = current - baseline;
  const needed = target - baseline;
  if (needed <= 0) return 100;
  return Math.min(100, Math.max(0, Math.round((progress / needed) * 100)));
}

function fmt(n: number | null): string {
  if (n === null) return "—";
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  return n.toString();
}

function delta(current: number | null, baseline: number | null): string {
  if (current === null || baseline === null) return "—";
  const d = current - baseline;
  return (d >= 0 ? "+" : "") + d.toLocaleString();
}

export default function GoalsTab() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [overrides, setOverrides] = useState<Record<string, Partial<Goal>>>({});
  const [editing, setEditing] = useState<string | null>(null);
  const [editVals, setEditVals] = useState<{ current: string; target: string; baseline: string }>({ current: "", target: "", baseline: "" });

  useEffect(() => {
    fetch(`/data/goals.json?t=${Date.now()}`)
      .then((r) => r.json())
      .then((json) => {
        const server: Goal[] = json.goals || [];
        try {
          const saved = localStorage.getItem(STORAGE_KEY);
          const ov: Record<string, Partial<Goal>> = saved ? JSON.parse(saved) : {};
          setOverrides(ov);
          const merged = server.map((g) => ({ ...g, ...(ov[g.id] || {}) }));
          setGoals(merged);
        } catch {
          setGoals(server);
        }
      })
      .catch(() => setGoals([]));
  }, []);

  const saveOverride = (id: string, patch: Partial<Goal>) => {
    setOverrides((prevOv) => {
      const updated = { ...prevOv, [id]: { ...(prevOv[id] || {}), ...patch } };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
    setGoals((prev) => prev.map((g) => (g.id === id ? { ...g, ...patch } as Goal : g)));
  };

  const startEdit = (g: Goal) => {
    setEditing(g.id);
    setEditVals({
      current: g.current?.toString() ?? "",
      target: g.target.toString(),
      baseline: g.baseline?.toString() ?? "",
    });
  };

  const commitEdit = (id: string) => {
    const patch: Partial<Goal> = {};
    const c = parseInt(editVals.current);
    const t = parseInt(editVals.target);
    const b = parseInt(editVals.baseline);
    if (!isNaN(c)) patch.current = c;
    if (!isNaN(t)) patch.target = t;
    if (!isNaN(b)) patch.baseline = b;
    if (Object.keys(patch).length > 0) saveOverride(id, patch);
    setEditing(null);
  };

  const needsBaseline = goals.filter((g) => g.current === null).length;
  const totalDelta = goals.reduce((sum, g) => {
    if (g.current === null || g.baseline === null) return sum;
    return sum + (g.current - g.baseline);
  }, 0);

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Growth Goals</h1>
        <p className="text-gray-500 text-sm mt-1">
          Audience growth across all platforms. Baseline set {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}.
          {needsBaseline > 0 && (
            <span className="text-orange-500 font-semibold"> {needsBaseline} platform{needsBaseline !== 1 ? "s" : ""} need a baseline — click the pencil to set.</span>
          )}
        </p>
      </div>

      {/* Summary strip */}
      <div className="bg-gray-900 text-white rounded-2xl p-5 mb-6">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Since Baseline</p>
        <div className="grid grid-cols-4 gap-4">
          {goals.map((g) => {
            const p = pct(g.current, g.baseline, g.target);
            return (
              <div key={g.id} className="text-center">
                <p className="text-lg font-bold">{delta(g.current, g.baseline)}</p>
                <p className="text-xs text-gray-400">{g.icon} {g.platform.split(" ")[0]}</p>
                <div className="h-1 bg-gray-700 rounded-full mt-1 overflow-hidden">
                  <div className={`h-full rounded-full ${colorMap[g.color].bar}`} style={{ width: `${p}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Goal cards */}
      <div className="space-y-4">
        {goals.map((g) => {
          const p = pct(g.current, g.baseline, g.target);
          const c = colorMap[g.color];
          const isEditing = editing === g.id;
          const remaining = g.current !== null ? Math.max(0, g.target - g.current) : null;

          return (
            <div key={g.id} className={`bg-white rounded-2xl border border-gray-200 shadow-sm p-5`}>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{g.icon}</span>
                    <span className="font-bold text-gray-900">{g.platform}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${c.badge}`}>{g.metric}</span>
                    {g.autoRefresh && <span className="text-xs text-green-600 font-medium">🔄 Auto</span>}
                    {!g.autoRefresh && <span className="text-xs text-gray-400">manual update</span>}
                  </div>
                  <a href={g.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline">{g.url.replace("https://", "")}</a>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => isEditing ? commitEdit(g.id) : startEdit(g)}
                    className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold">
                    {isEditing ? "✓ Save" : "✏️ Edit"}
                  </button>
                </div>
              </div>

              {/* Numbers row */}
              {!isEditing ? (
                <div className="grid grid-cols-4 gap-3 mb-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{fmt(g.current)}</p>
                    <p className="text-xs text-gray-400">Current</p>
                  </div>
                  <div>
                    <p className={`text-2xl font-bold ${g.current !== null && g.baseline !== null && g.current > g.baseline ? "text-green-600" : "text-gray-400"}`}>
                      {delta(g.current, g.baseline)}
                    </p>
                    <p className="text-xs text-gray-400">Since baseline</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{fmt(g.target)}</p>
                    <p className="text-xs text-gray-400">Target</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-600">{remaining !== null ? fmt(remaining) : "—"}</p>
                    <p className="text-xs text-gray-400">Remaining</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Baseline</label>
                    <input type="number" className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={editVals.baseline} onChange={(e) => setEditVals({ ...editVals, baseline: e.target.value })} placeholder="e.g. 1240" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Current</label>
                    <input type="number" className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={editVals.current} onChange={(e) => setEditVals({ ...editVals, current: e.target.value })} placeholder="e.g. 1350" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Target</label>
                    <input type="number" className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={editVals.target} onChange={(e) => setEditVals({ ...editVals, target: e.target.value })} placeholder="e.g. 5000" />
                  </div>
                </div>
              )}

              {/* Progress bar */}
              <div>
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Progress to target</span>
                  <span className="font-semibold text-gray-700">{p}%</span>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-500 ${c.bar}`} style={{ width: `${p}%` }} />
                </div>
              </div>

              {/* Notes */}
              {g.notes && (
                <p className="text-xs text-gray-400 mt-3 italic">{g.notes}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
