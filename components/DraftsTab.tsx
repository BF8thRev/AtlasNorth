"use client";

import { useState, useEffect } from "react";

type DraftDomain = "newton" | "dime" | "general" | "scc";
type DraftStatus = "pending" | "approved" | "revise" | "sent";
type DraftType = "email" | "linkedin" | "social" | "copy" | "other";

type Comment = {
  text: string;
  timestamp: string;
  from: "bryan" | "atlas";
};

type Draft = {
  id: string;
  title: string;
  domain: DraftDomain;
  agent: string;
  type: DraftType;
  status: DraftStatus;
  createdAt: string;
  content: string;
  notes?: string;
  comments: Comment[];
  approvedAt: string | null;
  sentAt: string | null;
};

const domainConfig: Record<DraftDomain, { label: string; icon: string; color: string; badge: string }> = {
  newton: { label: "Newton",    icon: "🔬", color: "border-purple-200 bg-purple-50", badge: "bg-purple-100 text-purple-700" },
  dime:   { label: "The Dime",  icon: "🎙️", color: "border-blue-200 bg-blue-50",   badge: "bg-blue-100 text-blue-700" },
  general:{ label: "General",   icon: "📁", color: "border-gray-200 bg-gray-50",    badge: "bg-gray-100 text-gray-600" },
  scc:    { label: "SCC/HUSA",  icon: "🧪", color: "border-green-200 bg-green-50",  badge: "bg-green-100 text-green-700" },
};

const statusConfig: Record<DraftStatus, { label: string; icon: string; color: string }> = {
  pending:  { label: "Pending Review", icon: "⏳", color: "bg-yellow-100 text-yellow-700" },
  approved: { label: "Approved",       icon: "✅", color: "bg-green-100 text-green-700" },
  revise:   { label: "Needs Revision", icon: "🔁", color: "bg-orange-100 text-orange-700" },
  sent:     { label: "Sent",           icon: "📤", color: "bg-gray-100 text-gray-500" },
};

const typeConfig: Record<DraftType, { label: string; icon: string }> = {
  email:    { label: "Email",       icon: "✉️" },
  linkedin: { label: "LinkedIn",    icon: "💼" },
  social:   { label: "Social Post", icon: "📣" },
  copy:     { label: "Copy",        icon: "✍️" },
  other:    { label: "Other",       icon: "📄" },
};

const agentIcons: Record<string, string> = {
  Atlas: "🗂️", Olg: "✍️", "Rob C": "📣", Hunter: "🎯", Pulse: "📡",
  "Dr. Frankl": "🧠", Ledger: "📊", Voss: "⚔️", Spark: "⚡",
  "Bob the Builder": "🔧", "Detective Niessen": "🕵️",
};

const STORAGE_KEY = "atlas-drafts-comments";

export default function DraftsTab() {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [filterDomain, setFilterDomain] = useState<DraftDomain | "all">("all");
  const [filterStatus, setFilterStatus] = useState<DraftStatus | "all">("pending");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [localOverrides, setLocalOverrides] = useState<Record<string, Partial<Draft>>>({});

  useEffect(() => {
    fetch(`/data/drafts.json?t=${Date.now()}`)
      .then((r) => r.json())
      .then((json) => {
        const serverDrafts: Draft[] = json.drafts || [];
        try {
          const saved = localStorage.getItem(STORAGE_KEY);
          const overrides: Record<string, Partial<Draft>> = saved ? JSON.parse(saved) : {};
          setLocalOverrides(overrides);
          const merged = serverDrafts.map((d) => ({
            ...d,
            ...(overrides[d.id] || {}),
          }));
          setDrafts(merged);
        } catch {
          setDrafts(serverDrafts);
        }
      })
      .catch(() => setDrafts([]));
  }, []);

  const saveOverride = (id: string, patch: Partial<Draft>) => {
    const updated = { ...localOverrides, [id]: { ...(localOverrides[id] || {}), ...patch } };
    setLocalOverrides(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setDrafts((prev) => prev.map((d) => (d.id === id ? { ...d, ...patch } : d)));
  };

  const setStatus = (id: string, status: DraftStatus) => {
    const now = new Date().toLocaleDateString();
    saveOverride(id, {
      status,
      approvedAt: status === "approved" ? now : undefined,
      sentAt: status === "sent" ? now : undefined,
    } as Partial<Draft>);
  };

  const addComment = (id: string, from: "bryan" | "atlas") => {
    const text = commentInputs[id]?.trim();
    if (!text) return;
    const draft = drafts.find((d) => d.id === id);
    if (!draft) return;
    const newComment: Comment = { text, timestamp: new Date().toLocaleString(), from };
    const updatedComments = [...(draft.comments || []), newComment];
    saveOverride(id, { comments: updatedComments });
    setCommentInputs((prev) => ({ ...prev, [id]: "" }));
  };

  const pendingCount = drafts.filter((d) => d.status === "pending").length;

  const filtered = drafts
    .filter((d) => filterDomain === "all" || d.domain === filterDomain)
    .filter((d) => filterStatus === "all" || d.status === filterStatus);

  const grouped: Record<DraftDomain, Draft[]> = { newton: [], dime: [], general: [], scc: [] };
  filtered.forEach((d) => grouped[d.domain].push(d));
  const domainOrder: DraftDomain[] = ["dime", "newton", "general", "scc"];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Drafts</h1>
          <p className="text-gray-500 text-sm mt-1">
            {pendingCount > 0
              ? <span className="text-orange-500 font-semibold">{pendingCount} awaiting your review</span>
              : <span className="text-green-600 font-semibold">All caught up</span>}
            {" · Approve, revise, or comment. Atlas logs everything."}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap mt-4 mb-6">
        {(["all", "pending", "revise", "approved", "sent"] as const).map((s) => (
          <button key={s} onClick={() => setFilterStatus(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
              filterStatus === s ? "bg-gray-900 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}>
            {s === "all" ? "All" : `${statusConfig[s].icon} ${statusConfig[s].label}`}
          </button>
        ))}
        <div className="w-px bg-gray-200 mx-1" />
        {(["all", "dime", "newton", "general", "scc"] as const).map((d) => (
          <button key={d} onClick={() => setFilterDomain(d)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterDomain === d ? "bg-gray-900 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}>
            {d === "all" ? "All Topics" : `${domainConfig[d].icon} ${domainConfig[d].label}`}
          </button>
        ))}
      </div>

      {/* Grouped by domain */}
      {filtered.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-400 text-sm">
          No drafts here. Atlas will push items as they're produced.
        </div>
      )}

      {domainOrder.map((domain) => {
        const items = grouped[domain];
        if (items.length === 0) return null;
        const dc = domainConfig[domain];
        return (
          <div key={domain} className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">{dc.icon}</span>
              <h2 className="font-bold text-gray-900">{dc.label}</h2>
              <span className="text-xs text-gray-400">{items.length} draft{items.length !== 1 ? "s" : ""}</span>
            </div>

            <div className="space-y-3">
              {items.map((draft) => {
                const sc = statusConfig[draft.status];
                const tc = typeConfig[draft.type];
                const isOpen = expandedId === draft.id;

                return (
                  <div key={draft.id} className={`bg-white rounded-xl border shadow-sm overflow-hidden ${draft.status === "sent" ? "opacity-50" : "border-gray-200"}`}>
                    {/* Card header */}
                    <button onClick={() => setExpandedId(isOpen ? null : draft.id)}
                      className="w-full text-left px-5 py-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${sc.color}`}>{sc.icon} {sc.label}</span>
                            <span className="text-xs text-gray-400">{tc.icon} {tc.label}</span>
                            <span className="text-xs text-gray-400">{agentIcons[draft.agent] || "🤖"} {draft.agent}</span>
                            {draft.comments.length > 0 && (
                              <span className="text-xs text-blue-500">💬 {draft.comments.length}</span>
                            )}
                          </div>
                          <p className="font-semibold text-gray-900 text-sm">{draft.title}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{draft.createdAt}</p>
                        </div>
                        <span className="text-gray-400 text-sm flex-shrink-0">{isOpen ? "▲" : "▼"}</span>
                      </div>
                    </button>

                    {/* Expanded */}
                    {isOpen && (
                      <div className="border-t border-gray-100 px-5 py-4 space-y-4">
                        {/* Draft content */}
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Draft Content</p>
                          <pre className="text-sm text-gray-800 whitespace-pre-wrap font-sans leading-relaxed">{draft.content}</pre>
                        </div>

                        {/* Notes */}
                        {draft.notes && (
                          <div className="bg-yellow-50 rounded-lg px-4 py-3">
                            <p className="text-xs font-semibold text-yellow-700 mb-1">📌 Atlas Notes</p>
                            <p className="text-xs text-yellow-800">{draft.notes}</p>
                          </div>
                        )}

                        {/* Action buttons */}
                        {draft.status !== "sent" && (
                          <div className="flex gap-2 flex-wrap">
                            {draft.status !== "approved" && (
                              <button onClick={() => setStatus(draft.id, "approved")}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg text-xs font-semibold hover:bg-green-700">
                                ✅ Approve
                              </button>
                            )}
                            {draft.status !== "revise" && (
                              <button onClick={() => setStatus(draft.id, "revise")}
                                className="px-4 py-2 bg-orange-500 text-white rounded-lg text-xs font-semibold hover:bg-orange-600">
                                🔁 Request Revision
                              </button>
                            )}
                            {draft.status === "approved" && (
                              <button onClick={() => setStatus(draft.id, "sent")}
                                className="px-4 py-2 bg-gray-700 text-white rounded-lg text-xs font-semibold hover:bg-gray-800">
                                📤 Mark Sent
                              </button>
                            )}
                          </div>
                        )}

                        {/* Comments / Feedback log */}
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                            Feedback Log {draft.comments.length > 0 && `(${draft.comments.length})`}
                          </p>

                          {draft.comments.length === 0 && (
                            <p className="text-xs text-gray-400 italic mb-3">No comments yet.</p>
                          )}

                          <div className="space-y-2 mb-3">
                            {draft.comments.map((c, i) => (
                              <div key={i} className={`rounded-lg px-3 py-2 text-xs ${c.from === "bryan" ? "bg-blue-50 text-blue-800" : "bg-gray-100 text-gray-700"}`}>
                                <span className="font-semibold">{c.from === "bryan" ? "Bryan" : "Atlas"}</span>
                                <span className="text-gray-400 ml-2">{c.timestamp}</span>
                                <p className="mt-0.5">{c.text}</p>
                              </div>
                            ))}
                          </div>

                          <div className="flex gap-2">
                            <input
                              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Add feedback or note..."
                              value={commentInputs[draft.id] || ""}
                              onChange={(e) => setCommentInputs((prev) => ({ ...prev, [draft.id]: e.target.value }))}
                              onKeyDown={(e) => { if (e.key === "Enter") addComment(draft.id, "bryan"); }}
                            />
                            <button
                              onClick={() => addComment(draft.id, "bryan")}
                              className="px-3 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700"
                            >
                              Add
                            </button>
                          </div>
                        </div>

                        {/* Approval/sent timestamps */}
                        {(draft.approvedAt || draft.sentAt) && (
                          <div className="flex gap-4 text-xs text-gray-400">
                            {draft.approvedAt && <span>✅ Approved: {draft.approvedAt}</span>}
                            {draft.sentAt && <span>📤 Sent: {draft.sentAt}</span>}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
