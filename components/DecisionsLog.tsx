"use client";

import { useState, useEffect } from "react";

type DecisionStatus = "open" | "decided" | "deferred";
type DecisionCategory = "product" | "revenue" | "operations" | "team" | "content" | "tech";
type DecisionPriority = "urgent" | "high" | "medium" | "low";

type Decision = {
  id: string;
  title: string;
  context: string;
  options?: string[];
  owner: string;
  category: DecisionCategory;
  priority: DecisionPriority;
  status: DecisionStatus;
  deadline?: string;
  decidedOn?: string;
  outcome?: string;
  isCustom?: boolean;
};

const categoryConfig: Record<DecisionCategory, { label: string; icon: string; color: string }> = {
  product:    { label: "Product",    icon: "🔬", color: "bg-purple-100 text-purple-700" },
  revenue:    { label: "Revenue",    icon: "💰", color: "bg-green-100 text-green-700" },
  operations: { label: "Operations", icon: "⚙️", color: "bg-gray-100 text-gray-700" },
  team:       { label: "Team",       icon: "🤝", color: "bg-blue-100 text-blue-700" },
  content:    { label: "Content",    icon: "🎙️", color: "bg-orange-100 text-orange-700" },
  tech:       { label: "Tech",       icon: "🔧", color: "bg-red-100 text-red-700" },
};

const priorityConfig: Record<DecisionPriority, { label: string; color: string; order: number }> = {
  urgent: { label: "Urgent",  color: "bg-red-100 text-red-700",    order: 0 },
  high:   { label: "High",    color: "bg-orange-100 text-orange-700", order: 1 },
  medium: { label: "Medium",  color: "bg-yellow-100 text-yellow-700", order: 2 },
  low:    { label: "Low",     color: "bg-gray-100 text-gray-500",   order: 3 },
};

const statusConfig: Record<DecisionStatus, { label: string; icon: string; color: string }> = {
  open:     { label: "Open",     icon: "🔴", color: "text-red-500" },
  decided:  { label: "Decided",  icon: "✅", color: "text-green-600" },
  deferred: { label: "Deferred", icon: "⏸️", color: "text-gray-400" },
};

const seedDecisions: Decision[] = [
  {
    id: "newton-pricing",
    title: "Newton Software-Only Tier Pricing",
    context: "Software-only tier (no C1D1 tablet hardware) needs a price. Two options on the table. This directly affects PLG strategy and Hunter's outreach messaging.",
    options: ["Free — drive adoption, monetize later", "$500/mo — filter for serious operators"],
    owner: "Bryan",
    category: "product",
    priority: "urgent",
    status: "open",
    decidedOn: undefined,
    outcome: undefined,
  },
  {
    id: "github-access",
    title: "Newton Repo GitHub Access",
    context: "Bob needs repo access to execute Newton product work directly. Currently blocked — all code changes require manual handoff.",
    options: ["Add atlas.opsman@gmail.com as collaborator", "Create a dedicated deploy key"],
    owner: "Bryan",
    category: "tech",
    priority: "high",
    status: "open",
  },
  {
    id: "email-platform",
    title: "Email Platform for Nurture Sequence",
    context: "500-contact cold list nurture sequence (4-email drip) is ready to draft. Need to know the tool Bryan uses to load and activate it.",
    options: ["HubSpot", "Mailchimp", "Instantly", "Apollo", "Other"],
    owner: "Bryan",
    category: "operations",
    priority: "high",
    status: "open",
  },
  {
    id: "journalism-trigger",
    title: "Journalism Repurposing Campaign — Waiting on Articles",
    context: "Full campaign is scoped and ready (2 LinkedIn posts/article, 6 warm reconnect emails, cold list email, 3 large pipeline emails). Trigger = article publication.",
    owner: "Bryan",
    category: "content",
    priority: "medium",
    status: "deferred",
  },
];

function generateId() {
  return Math.random().toString(36).slice(2, 10);
}

const STORAGE_KEY = "atlas-decisions";

export default function DecisionsLog() {
  const [decisions, setDecisions] = useState<Decision[]>(seedDecisions);
  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<DecisionStatus | "all">("open");
  const [filterCategory, setFilterCategory] = useState<DecisionCategory | "all">("all");
  const [form, setForm] = useState<Omit<Decision, "id" | "isCustom">>({
    title: "",
    context: "",
    options: [],
    owner: "Bryan",
    category: "operations",
    priority: "medium",
    status: "open",
    deadline: "",
    outcome: "",
  });
  const [optionsText, setOptionsText] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: Decision[] = JSON.parse(saved);
        const seedIds = new Set(seedDecisions.map((d) => d.id));
        const custom = parsed.filter((d) => d.isCustom);
        const savedSeeds = parsed.filter((d) => !d.isCustom && seedIds.has(d.id));
        const merged = seedDecisions.map((s) => savedSeeds.find((x) => x.id === s.id) ?? s);
        setDecisions([...merged, ...custom]);
      }
    } catch {}
  }, []);

  const save = (updated: Decision[]) => {
    setDecisions(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const setStatus = (id: string, status: DecisionStatus, outcome?: string) => {
    save(
      decisions.map((d) =>
        d.id === id
          ? { ...d, status, outcome: outcome ?? d.outcome, decidedOn: status === "decided" ? new Date().toLocaleDateString() : d.decidedOn }
          : d
      )
    );
  };

  const addDecision = () => {
    if (!form.title.trim()) return;
    const d: Decision = {
      ...form,
      id: generateId(),
      isCustom: true,
      options: optionsText ? optionsText.split("\n").filter((o) => o.trim()) : [],
    };
    save([...decisions, d]);
    setForm({ title: "", context: "", options: [], owner: "Bryan", category: "operations", priority: "medium", status: "open", deadline: "", outcome: "" });
    setOptionsText("");
    setShowModal(false);
  };

  const filtered = decisions
    .filter((d) => filterStatus === "all" || d.status === filterStatus)
    .filter((d) => filterCategory === "all" || d.category === filterCategory)
    .sort((a, b) => priorityConfig[a.priority].order - priorityConfig[b.priority].order);

  const openCount = decisions.filter((d) => d.status === "open").length;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Decisions Log</h1>
          <p className="text-gray-500 text-sm mt-1">
            <span className="text-red-500 font-semibold">{openCount} open</span>
            {" · Sorted by priority · Every undecided thing costs momentum"}
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
        >
          + Add Decision
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap mt-4 mb-6">
        {(["all", "open", "decided", "deferred"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors capitalize ${
              filterStatus === s ? "bg-gray-900 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {s === "all" ? "All" : `${statusConfig[s].icon} ${statusConfig[s].label}`}
          </button>
        ))}
        <div className="w-px bg-gray-200 mx-1" />
        {(["all", "product", "revenue", "operations", "team", "content", "tech"] as const).map((c) => (
          <button
            key={c}
            onClick={() => setFilterCategory(c)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors capitalize ${
              filterCategory === c ? "bg-gray-900 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {c === "all" ? "All Categories" : `${categoryConfig[c].icon} ${categoryConfig[c].label}`}
          </button>
        ))}
      </div>

      {/* Decision Cards */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-400 text-sm">
            No decisions here.
          </div>
        )}
        {filtered.map((d) => {
          const isExpanded = expandedId === d.id;
          const sc = statusConfig[d.status];
          const cc = categoryConfig[d.category];
          const pc = priorityConfig[d.priority];
          return (
            <div
              key={d.id}
              className={`bg-white rounded-xl border shadow-sm overflow-hidden ${
                d.status === "decided" ? "opacity-60" : "border-gray-200"
              }`}
            >
              {/* Card header */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : d.id)}
                className="w-full text-left px-5 py-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${pc.color}`}>{pc.label}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${cc.color}`}>{cc.icon} {cc.label}</span>
                      <span className={`text-xs font-medium ${sc.color}`}>{sc.icon} {sc.label}</span>
                    </div>
                    <p className="font-semibold text-gray-900 text-sm">{d.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">Owner: {d.owner}{d.deadline ? ` · Due: ${d.deadline}` : ""}</p>
                  </div>
                  <span className="text-gray-400 text-sm flex-shrink-0">{isExpanded ? "▲" : "▼"}</span>
                </div>
              </button>

              {/* Expanded body */}
              {isExpanded && (
                <div className="border-t border-gray-100 px-5 py-4 space-y-3">
                  <p className="text-sm text-gray-600">{d.context}</p>

                  {d.options && d.options.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Options on the table</p>
                      <ul className="space-y-1">
                        {d.options.map((opt, i) => (
                          <li key={i} className="text-sm text-gray-700 flex gap-2">
                            <span className="text-gray-400">{i + 1}.</span> {opt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {d.outcome && (
                    <div className="bg-green-50 rounded-lg px-3 py-2">
                      <p className="text-xs font-semibold text-green-700 mb-0.5">Outcome</p>
                      <p className="text-sm text-green-800">{d.outcome}</p>
                      {d.decidedOn && <p className="text-xs text-green-600 mt-0.5">Decided: {d.decidedOn}</p>}
                    </div>
                  )}

                  {/* Action buttons */}
                  {d.status !== "decided" && (
                    <div className="flex gap-2 flex-wrap pt-1">
                      <button
                        onClick={() => {
                          const outcome = prompt("What was decided?");
                          if (outcome) setStatus(d.id, "decided", outcome);
                        }}
                        className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-xs font-semibold hover:bg-green-700"
                      >
                        ✅ Mark Decided
                      </button>
                      {d.status !== "deferred" && (
                        <button
                          onClick={() => setStatus(d.id, "deferred")}
                          className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-xs font-semibold hover:bg-gray-200"
                        >
                          ⏸️ Defer
                        </button>
                      )}
                      {d.status === "deferred" && (
                        <button
                          onClick={() => setStatus(d.id, "open")}
                          className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold hover:bg-blue-200"
                        >
                          🔁 Re-open
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Decision Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 max-h-screen overflow-y-auto">
            <h2 className="text-lg font-bold text-gray-900 mb-4">New Decision</h2>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Title *</label>
                <input
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="What needs to be decided?"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Context</label>
                <textarea
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={2}
                  value={form.context}
                  onChange={(e) => setForm({ ...form, context: e.target.value })}
                  placeholder="Why does this matter? What's blocking?"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Options (one per line)</label>
                <textarea
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={2}
                  value={optionsText}
                  onChange={(e) => setOptionsText(e.target.value)}
                  placeholder="Option A&#10;Option B"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Category</label>
                  <select
                    className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as DecisionCategory })}
                  >
                    {Object.entries(categoryConfig).map(([k, v]) => (
                      <option key={k} value={k}>{v.icon} {v.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Priority</label>
                  <select
                    className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.priority}
                    onChange={(e) => setForm({ ...form, priority: e.target.value as DecisionPriority })}
                  >
                    <option value="urgent">Urgent</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Owner</label>
                  <input
                    className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.owner}
                    onChange={(e) => setForm({ ...form, owner: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Deadline</label>
                  <input
                    className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.deadline}
                    onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                    placeholder="e.g. Mar 1"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button
                onClick={addDecision}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700"
              >
                Add Decision
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
