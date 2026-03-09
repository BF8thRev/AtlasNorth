"use client";

import { useState, useEffect } from "react";

type KanbanStatus = "backlog" | "in-progress" | "review" | "done" | "archived";

type KanbanCard = {
  id: string;
  title: string;
  agent: string;
  priority: "high" | "medium" | "low";
  notes?: string;
  status: KanbanStatus;
  iterations: number; // Max 3 before escalation to Bryan
};

type KanbanData = {
  cards: KanbanCard[];
};

const columns: { id: KanbanStatus; label: string; icon: string; color: string; headerColor: string }[] = [
  { id: "backlog",     label: "Backlog",     icon: "📋", color: "bg-gray-50 border-gray-200",    headerColor: "bg-gray-100 text-gray-700" },
  { id: "in-progress", label: "In Progress", icon: "⚡", color: "bg-blue-50 border-blue-200",    headerColor: "bg-blue-100 text-blue-700" },
  { id: "review",      label: "Review",      icon: "🔍", color: "bg-yellow-50 border-yellow-200", headerColor: "bg-yellow-100 text-yellow-700" },
  { id: "done",        label: "Done",        icon: "✅", color: "bg-green-50 border-green-200",  headerColor: "bg-green-100 text-green-700" },
  { id: "archived",    label: "Archived",    icon: "🗄️", color: "bg-slate-50 border-slate-200",  headerColor: "bg-slate-200 text-slate-600" },
];

const priorityColors: Record<string, string> = {
  high:   "bg-red-100 text-red-700",
  medium: "bg-yellow-100 text-yellow-700",
  low:    "bg-gray-100 text-gray-600",
};

const agentIcons: Record<string, string> = {
  Atlas: "🗂️", Olg: "✍️", "Rob C": "📣", Hunter: "🎯", Pulse: "📡",
  "Dr. Frankl": "🧠", Ledger: "📊", Voss: "⚔️", Spark: "⚡",
  "Bob the Builder": "🔧", "Detective Niessen": "🕵️",
};

const defaultData: KanbanData = {
  cards: [],
};

function generateId() {
  return Math.random().toString(36).slice(2, 10);
}

export default function KanbanBoard() {
  const [data, setData] = useState<KanbanData>(defaultData);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<Omit<KanbanCard, "id">>({
    title: "",
    agent: "Atlas",
    priority: "medium",
    notes: "",
    status: "backlog",
    iterations: 0,
  });

  // Load from server JSON first, then merge local additions
  useEffect(() => {
    fetch(`/data/ops-board.json?t=${Date.now()}`)
      .then((r) => r.json())
      .then((json) => {
        const serverCards: KanbanCard[] = (json.cards || []).map((c: any) => ({ ...c, isServer: true }));
        try {
          const saved = localStorage.getItem("ops-board");
          const local: KanbanCard[] = saved ? JSON.parse(saved) : [];
          const serverIds = new Set(serverCards.map((c) => c.id));
          const localOnly = local.filter((c) => !serverIds.has(c.id));
          // Apply any local status overrides to server cards
          const localMap: Record<string, KanbanCard> = {};
          local.forEach((c) => { if (serverIds.has(c.id)) localMap[c.id] = c; });
          const merged = serverCards.map((c) => localMap[c.id] ? { ...c, ...localMap[c.id] } : c);
          setData({ cards: [...merged, ...localOnly] });
        } catch {
          setData({ cards: serverCards });
        }
      })
      .catch(() => {
        try {
          const saved = localStorage.getItem("ops-board");
          if (saved) setData(JSON.parse(saved));
        } catch {}
      });
  }, []);

  const save = (updated: KanbanData) => {
    setData(updated);
    localStorage.setItem("ops-board", JSON.stringify(updated));
  };

  const addCard = () => {
    if (!form.title.trim()) return;
    const card: KanbanCard = { ...form, id: generateId(), iterations: 0 };
    save({ cards: [...data.cards, card] });
    setForm({ title: "", agent: "Atlas", priority: "medium", notes: "", status: "backlog", iterations: 0 });
    setShowModal(false);
  };

  const moveCard = (id: string, status: KanbanStatus) => {
    save({ cards: data.cards.map((c) => (c.id === id ? { ...c, status } : c)) });
  };

  const bumpIteration = (id: string) => {
    save({
      cards: data.cards.map((c) => {
        if (c.id !== id) return c;
        const next = (c.iterations || 0) + 1;
        return { ...c, iterations: next };
      }),
    });
  };

  const deleteCard = (id: string) => {
    save({ cards: data.cards.filter((c) => c.id !== id) });
  };

  return (
    <div className="max-w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">The Ops Board</h1>
          <p className="text-gray-500 text-sm mt-1">All active work, tracked in one place. Atlas routes. Team executes.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
        >
          + Add Card
        </button>
      </div>

      {/* Kanban Columns */}
      <div className="flex gap-4 overflow-x-auto pb-6">
        {columns.map((col) => {
          const cards = data.cards.filter((c) => c.status === col.id);
          return (
            <div
              key={col.id}
              className={`flex-shrink-0 w-64 rounded-xl border ${col.color} flex flex-col`}
            >
              {/* Column Header */}
              <div className={`px-4 py-3 rounded-t-xl ${col.headerColor} flex items-center justify-between`}>
                <span className="font-semibold text-sm">
                  {col.icon} {col.label}
                </span>
                <span className="text-xs font-bold opacity-70">{cards.length}</span>
              </div>

              {/* Cards */}
              <div className="p-3 space-y-3 flex-1 min-h-[200px]">
                {cards.length === 0 && (
                  <p className="text-xs text-gray-400 text-center pt-4">Empty</p>
                )}
                {cards.map((card) => (
                  <div
                    key={card.id}
                    className={`bg-white rounded-lg shadow-sm border p-3 ${
                      (card.iterations || 0) >= 3 ? "border-red-400 bg-red-50" : "border-gray-100"
                    }`}
                  >
                    {/* Iteration escalation banner */}
                    {(card.iterations || 0) >= 3 && (
                      <div className="bg-red-100 text-red-700 text-xs font-bold rounded px-2 py-1 mb-2">
                        🚨 ESCALATE — 3 revisions reached. Brief Bryan.
                      </div>
                    )}
                    <p className="text-sm font-semibold text-gray-900 mb-2 leading-snug">{card.title}</p>
                    <div className="flex items-center gap-1 mb-2 flex-wrap">
                      <span className="text-xs text-gray-500">
                        {agentIcons[card.agent] || "🤖"} {card.agent}
                      </span>
                      <span className={`ml-auto text-xs px-2 py-0.5 rounded-full font-medium ${priorityColors[card.priority]}`}>
                        {card.priority}
                      </span>
                    </div>
                    {/* Iteration counter */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-gray-400">Revisions:</span>
                      <div className="flex gap-1">
                        {[1, 2, 3].map((n) => (
                          <div
                            key={n}
                            className={`w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold ${
                              (card.iterations || 0) >= n
                                ? n === 3 ? "bg-red-500 text-white" : "bg-orange-400 text-white"
                                : "bg-gray-100 text-gray-400"
                            }`}
                          >
                            {n}
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => bumpIteration(card.id)}
                        className="text-xs text-gray-400 hover:text-orange-600 ml-1"
                        title="Increment revision count"
                      >
                        +1
                      </button>
                    </div>
                    {card.notes && (
                      <p className="text-xs text-gray-400 mb-2 italic">{card.notes}</p>
                    )}
                    {/* Move buttons */}
                    <div className="flex gap-1 flex-wrap mt-1">
                      {columns
                        .filter((c) => c.id !== col.id)
                        .map((c) => (
                          <button
                            key={c.id}
                            onClick={() => moveCard(card.id, c.id)}
                            className="text-xs text-blue-600 hover:text-blue-800 underline"
                          >
                            → {c.label}
                          </button>
                        ))}
                      <button
                        onClick={() => deleteCard(card.id)}
                        className="text-xs text-red-400 hover:text-red-600 ml-auto"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Card Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">New Card</h2>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Title *</label>
                <input
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="What needs to get done?"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Assigned Agent</label>
                <select
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.agent}
                  onChange={(e) => setForm({ ...form, agent: e.target.value })}
                >
                  {Object.keys(agentIcons).map((a) => (
                    <option key={a} value={a}>{agentIcons[a]} {a}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Priority</label>
                <select
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.priority}
                  onChange={(e) => setForm({ ...form, priority: e.target.value as "high" | "medium" | "low" })}
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Column</label>
                <select
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as KanbanStatus })}
                >
                  {columns.map((c) => (
                    <option key={c.id} value={c.id}>{c.icon} {c.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Notes (optional)</label>
                <textarea
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={2}
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Context, links, instructions..."
                />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button
                onClick={addCard}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700"
              >
                Add Card
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
