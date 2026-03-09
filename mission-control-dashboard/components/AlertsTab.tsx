"use client";

import { useState, useEffect } from "react";

export type SecurityStatus = "clear" | "flagged";

type AlertSeverity = "high" | "medium" | "low";

type Alert = {
  id: string;
  date: string;
  title: string;
  detail: string;
  severity: AlertSeverity;
  resolved: boolean;
  resolvedOn?: string;
  source: string;
};

const severityConfig: Record<AlertSeverity, { label: string; color: string; bg: string }> = {
  high:   { label: "High",   color: "text-red-700",    bg: "bg-red-50 border-red-200" },
  medium: { label: "Medium", color: "text-orange-600", bg: "bg-orange-50 border-orange-200" },
  low:    { label: "Low",    color: "text-yellow-700", bg: "bg-yellow-50 border-yellow-200" },
};

const STORAGE_KEY = "atlas-alerts";
const STATUS_KEY = "atlas-security-status";

function generateId() { return Math.random().toString(36).slice(2, 10); }

type AlertsTabProps = {
  onStatusChange?: (status: SecurityStatus) => void;
};

export default function AlertsTab({ onStatusChange }: AlertsTabProps) {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState<"open" | "resolved" | "all">("open");
  const [form, setForm] = useState<Omit<Alert, "id" | "resolved" | "resolvedOn">>({
    date: new Date().toISOString().slice(0, 10),
    title: "",
    detail: "",
    severity: "medium",
    source: "Detective Niessen",
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setAlerts(JSON.parse(saved));
    } catch {}
  }, []);

  const updateStatus = (currentAlerts: Alert[]) => {
    const hasOpen = currentAlerts.some((a) => !a.resolved);
    const status: SecurityStatus = hasOpen ? "flagged" : "clear";
    localStorage.setItem(STATUS_KEY, status);
    onStatusChange?.(status);
  };

  const save = (updated: Alert[]) => {
    setAlerts(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    updateStatus(updated);
  };

  const addAlert = () => {
    if (!form.title.trim()) return;
    const a: Alert = { ...form, id: generateId(), resolved: false };
    save([a, ...alerts]);
    setForm({ date: new Date().toISOString().slice(0, 10), title: "", detail: "", severity: "medium", source: "Detective Niessen" });
    setShowModal(false);
  };

  const resolveAlert = (id: string) => {
    save(alerts.map((a) => a.id === id ? { ...a, resolved: true, resolvedOn: new Date().toLocaleDateString() } : a));
  };

  const deleteAlert = (id: string) => save(alerts.filter((a) => a.id !== id));

  const filtered = alerts.filter((a) =>
    filter === "all" ? true : filter === "open" ? !a.resolved : a.resolved
  );

  const openCount = alerts.filter((a) => !a.resolved).length;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Security Alerts</h1>
          <p className="text-gray-500 text-sm mt-1">
            {openCount > 0
              ? <span className="text-red-500 font-semibold">🔴 {openCount} open alert{openCount !== 1 ? "s" : ""} — Niessen is flagged</span>
              : <span className="text-green-600 font-semibold">🟢 All clear — no open alerts</span>
            }
            {" · Swept weekly by Detective Niessen"}
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700"
        >
          + Log Alert
        </button>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mt-4 mb-6">
        {(["open", "resolved", "all"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
              filter === f ? "bg-gray-900 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {f === "open" ? `🔴 Open (${openCount})` : f === "resolved" ? "✅ Resolved" : "All"}
          </button>
        ))}
      </div>

      {/* Alert Cards */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-400 text-sm">
            {filter === "open" ? "🟢 No open alerts. System is clear." : "Nothing here yet."}
          </div>
        )}
        {filtered.map((alert) => {
          const sc = severityConfig[alert.severity];
          return (
            <div key={alert.id} className={`rounded-xl border shadow-sm p-5 ${alert.resolved ? "bg-gray-50 border-gray-200 opacity-60" : sc.bg}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`text-xs font-bold uppercase tracking-wide ${sc.color}`}>{sc.label} Severity</span>
                    {alert.resolved && <span className="text-xs text-green-600 font-medium">✅ Resolved {alert.resolvedOn}</span>}
                  </div>
                  <p className="font-semibold text-gray-900">{alert.title}</p>
                  <p className="text-sm text-gray-600 mt-1">{alert.detail}</p>
                  <p className="text-xs text-gray-400 mt-2">Source: {alert.source} · {alert.date}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  {!alert.resolved && (
                    <button onClick={() => resolveAlert(alert.id)}
                      className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-xs font-semibold hover:bg-green-700">
                      Resolve
                    </button>
                  )}
                  <button onClick={() => deleteAlert(alert.id)}
                    className="text-xs text-red-400 hover:text-red-600 px-2">✕</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Alert Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Log Security Alert</h2>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Alert Title *</label>
                <input className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="What was flagged?" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Detail</label>
                <textarea className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" rows={3}
                  value={form.detail} onChange={(e) => setForm({ ...form, detail: e.target.value })}
                  placeholder="What was observed, where, and why it's suspicious." />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Severity</label>
                  <select className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={form.severity} onChange={(e) => setForm({ ...form, severity: e.target.value as AlertSeverity })}>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Source</label>
                  <input className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })} />
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={addAlert} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700">Log Alert</button>
              <button onClick={() => setShowModal(false)} className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
