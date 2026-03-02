"use client";

import { useState, useEffect } from "react";

type Frequency = "daily" | "weekly" | "friday" | "monthly" | "as-needed";
type RoutineStatus = "active" | "paused";

type Routine = {
  id: string;
  title: string;
  description: string;
  frequency: Frequency;
  owner: string;
  time?: string;
  status: RoutineStatus;
  lastRun?: string;
  isCustom?: boolean;
};

const frequencyLabels: Record<Frequency, string> = {
  daily: "Daily",
  weekly: "Weekly",
  friday: "Every Friday",
  monthly: "Monthly",
  "as-needed": "As Needed",
};

const frequencyColors: Record<Frequency, string> = {
  daily: "bg-blue-100 text-blue-700",
  weekly: "bg-purple-100 text-purple-700",
  friday: "bg-orange-100 text-orange-700",
  monthly: "bg-green-100 text-green-700",
  "as-needed": "bg-gray-100 text-gray-600",
};

const defaultRoutines: Routine[] = [
  // Daily
  {
    id: "daily-brief",
    title: "Daily Brief",
    description: "3-part brief: Call framing (sales skill), re-engagement prompt, market signal post. Delivered at 8AM EST.",
    frequency: "daily",
    owner: "Atlas",
    time: "8:00 AM EST",
    status: "active",
  },
  // Friday
  {
    id: "friday-founder-load",
    title: "Founder Load Snapshot",
    description: "Open loops count · Items >7 days old · Blocking items · Delegation candidates · Revenue items · Stuck items · Decisions pending.",
    frequency: "friday",
    owner: "Atlas",
    time: "11:00 AM EST",
    status: "active",
  },
  {
    id: "friday-episode-review",
    title: "Dime Episode Review",
    description: "Review new episode drop: flag clip-worthy moments, suggest social hook + caption, identify guest as prospect or connector, draft 48-hour follow-up message.",
    frequency: "friday",
    owner: "Atlas",
    time: "On episode drop",
    status: "active",
  },
  // Weekly
  {
    id: "weekly-10-ideas",
    title: "10 Automation & Improvement Ideas",
    description: "10 ideas to automate, improve, or delegate — each with Impact | Effort | Risk scores and a success indicator.",
    frequency: "weekly",
    owner: "Atlas",
    status: "active",
  },
  {
    id: "weekly-linkedin",
    title: "LinkedIn Content Draft",
    description: "Rotating weekly: Wk1 = industry observation · Wk2 = podcast clip + insight · Wk3 = data point/case study · Wk4 = thought leadership share.",
    frequency: "weekly",
    owner: "Olg + Rob C",
    status: "active",
  },
  {
    id: "weekly-learnings-update",
    title: "LEARNINGS.md Update",
    description: "Update relevant LEARNINGS files after corrections, major outputs, or pattern shifts. One entry minimum per week.",
    frequency: "weekly",
    owner: "Atlas",
    status: "active",
  },
  // Monthly
  {
    id: "monthly-roster-review",
    title: "Roster Review",
    description: "Review all 11 agents — who's active, who should be benched, any gaps to fill, quality issues to address.",
    frequency: "monthly",
    owner: "Atlas",
    status: "active",
  },
  // As needed
  {
    id: "gap-detection",
    title: "Gap Detection & New Agent Spin-Up",
    description: "When a task has no adequate agent coverage — spin up a new agent immediately, notify Bryan with name, role, and Active/Bench status.",
    frequency: "as-needed",
    owner: "Atlas",
    status: "active",
  },
];

function generateId() {
  return Math.random().toString(36).slice(2, 10);
}

const STORAGE_KEY = "atlas-routines";

export default function RoutinesTab() {
  const [routines, setRoutines] = useState<Routine[]>(defaultRoutines);
  const [showModal, setShowModal] = useState(false);
  const [filterFreq, setFilterFreq] = useState<Frequency | "all">("all");
  const [form, setForm] = useState<Omit<Routine, "id" | "isCustom">>({
    title: "",
    description: "",
    frequency: "weekly",
    owner: "Atlas",
    time: "",
    status: "active",
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: Routine[] = JSON.parse(saved);
        // merge custom ones with defaults
        const customOnes = parsed.filter((r) => r.isCustom);
        const defaultIds = new Set(defaultRoutines.map((r) => r.id));
        const savedDefaults = parsed.filter((r) => !r.isCustom && defaultIds.has(r.id));
        const mergedDefaults = defaultRoutines.map((d) => {
          const saved = savedDefaults.find((s) => s.id === d.id);
          return saved ?? d;
        });
        setRoutines([...mergedDefaults, ...customOnes]);
      }
    } catch {}
  }, []);

  const save = (updated: Routine[]) => {
    setRoutines(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const toggleStatus = (id: string) => {
    save(
      routines.map((r) =>
        r.id === id ? { ...r, status: r.status === "active" ? "paused" : "active" } : r
      )
    );
  };

  const deleteRoutine = (id: string) => {
    save(routines.filter((r) => r.id !== id));
  };

  const addRoutine = () => {
    if (!form.title.trim()) return;
    const r: Routine = { ...form, id: generateId(), isCustom: true };
    save([...routines, r]);
    setForm({ title: "", description: "", frequency: "weekly", owner: "Atlas", time: "", status: "active" });
    setShowModal(false);
  };

  const frequencies: (Frequency | "all")[] = ["all", "daily", "friday", "weekly", "monthly", "as-needed"];

  const filtered =
    filterFreq === "all" ? routines : routines.filter((r) => r.frequency === filterFreq);

  const activeCount = routines.filter((r) => r.status === "active").length;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Routines</h1>
          <p className="text-gray-500 text-sm mt-1">
            {activeCount} active routine{activeCount !== 1 ? "s" : ""} · Recurring work that runs without being asked
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
        >
          + Add Routine
        </button>
      </div>

      {/* Frequency Filter */}
      <div className="flex gap-2 flex-wrap mb-6 mt-4">
        {frequencies.map((f) => (
          <button
            key={f}
            onClick={() => setFilterFreq(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterFreq === f
                ? "bg-gray-900 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {f === "all" ? "All" : frequencyLabels[f]}
          </button>
        ))}
      </div>

      {/* Routine Cards */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-400 text-sm">
            No routines in this category yet.
          </div>
        )}
        {filtered.map((routine) => (
          <div
            key={routine.id}
            className={`bg-white rounded-xl border shadow-sm p-5 flex gap-4 ${
              routine.status === "paused" ? "opacity-50" : "border-gray-200"
            }`}
          >
            {/* Status dot */}
            <div className="mt-1">
              <div
                className={`w-3 h-3 rounded-full mt-0.5 ${
                  routine.status === "active" ? "bg-green-400" : "bg-gray-300"
                }`}
              />
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-gray-900">{routine.title}</p>
                  <p className="text-sm text-gray-500 mt-1">{routine.description}</p>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <button
                    onClick={() => toggleStatus(routine.id)}
                    className="text-xs text-gray-400 hover:text-gray-700 px-2 py-1 rounded border border-gray-200 hover:bg-gray-50"
                  >
                    {routine.status === "active" ? "Pause" : "Resume"}
                  </button>
                  {routine.isCustom && (
                    <button
                      onClick={() => deleteRoutine(routine.id)}
                      className="text-xs text-red-400 hover:text-red-600 px-2 py-1 rounded border border-red-100 hover:bg-red-50"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 mt-3 flex-wrap">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${frequencyColors[routine.frequency]}`}>
                  {frequencyLabels[routine.frequency]}
                </span>
                <span className="text-xs text-gray-400">Owner: {routine.owner}</span>
                {routine.time && (
                  <span className="text-xs text-gray-400">🕐 {routine.time}</span>
                )}
                {routine.isCustom && (
                  <span className="text-xs text-gray-400 italic">Custom</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Routine Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">New Routine</h2>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Title *</label>
                <input
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="What's the routine called?"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Description</label>
                <textarea
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={2}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="What happens in this routine?"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Frequency</label>
                <select
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.frequency}
                  onChange={(e) => setForm({ ...form, frequency: e.target.value as Frequency })}
                >
                  <option value="daily">Daily</option>
                  <option value="friday">Every Friday</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="as-needed">As Needed</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Owner</label>
                <input
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.owner}
                  onChange={(e) => setForm({ ...form, owner: e.target.value })}
                  placeholder="Atlas, Olg, Pulse..."
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Time (optional)</label>
                <input
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  placeholder="e.g. 9:00 AM EST"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button
                onClick={addRoutine}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700"
              >
                Add Routine
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
