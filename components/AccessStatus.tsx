"use client";

import { useState } from "react";

type AccessStatus = "connected" | "partial" | "pending" | "blocked";

type AccessItem = {
  name: string;
  description: string;
  status: AccessStatus;
  note?: string;
  unlocks?: string;
  action?: string;
};

type AccessSection = {
  label: string;
  icon: string;
  priority: "critical" | "high" | "medium" | "low";
  items: AccessItem[];
};

const priorityConfig = {
  critical: { label: "Critical", color: "border-red-300 bg-red-50", badge: "bg-red-100 text-red-700", dot: "bg-red-500" },
  high:     { label: "High",     color: "border-orange-300 bg-orange-50", badge: "bg-orange-100 text-orange-700", dot: "bg-orange-400" },
  medium:   { label: "Medium",   color: "border-yellow-200 bg-yellow-50", badge: "bg-yellow-100 text-yellow-700", dot: "bg-yellow-400" },
  low:      { label: "Low",      color: "border-gray-200 bg-gray-50", badge: "bg-gray-100 text-gray-600", dot: "bg-gray-400" },
};

const statusConfig: Record<AccessStatus, { icon: string; label: string; color: string }> = {
  connected: { icon: "✅", label: "Connected",  color: "text-green-600" },
  partial:   { icon: "⚠️", label: "Partial",    color: "text-yellow-600" },
  pending:   { icon: "⏳", label: "Pending",    color: "text-orange-500" },
  blocked:   { icon: "❌", label: "Blocked",    color: "text-red-500" },
};

const sections: AccessSection[] = [
  {
    label: "Revenue & Growth Blockers",
    icon: "🚨",
    priority: "critical",
    items: [
      {
        name: "GitHub / Newton Repo",
        description: "Newton site source code — needed for code pushes, bug fixes, and feature builds.",
        status: "pending",
        note: "NOT YET — coming later",
        unlocks: "Bob the Builder can execute Newton product work directly",
        action: "Share repo access with atlas.opsman@gmail.com",
      },
      {
        name: "Newton Pricing Decision",
        description: "Software-only tier: $0 vs $500/mo — decision blocking product-led growth strategy.",
        status: "blocked",
        note: "Pending Bryan's call",
        unlocks: "Sales positioning, Hunter's outreach messaging, and PLG strategy",
        action: "Bryan decides — Atlas ready to execute immediately after",
      },
      {
        name: "HubSpot / Email Tool",
        description: "Needed to load and activate 500-contact nurture sequence. Copy is ready to draft.",
        status: "pending",
        note: "Not yet configured",
        unlocks: "Automated nurture sequence for 500 cold contacts",
        action: "Connect or confirm email platform Bryan uses",
      },
    ],
  },
  {
    label: "Google APIs",
    icon: "🔌",
    priority: "high",
    items: [
      {
        name: "Gmail OAuth",
        description: "atlas.opsman@gmail.com — full read/write access.",
        status: "connected",
        note: "Confirmed 2026-02-22 · Tokens: credentials/gmail_tokens.json",
      },
      {
        name: "Google Analytics",
        description: "The Dime (281147332) · Newton (491614945) · SCC/HUSA (473280391)",
        status: "connected",
        note: "Confirmed 2026-02-26",
      },
      {
        name: "Drive, Sheets, Docs, Calendar",
        description: "Full Google Workspace access via gog skill.",
        status: "connected",
        note: "All enabled 2026-02-26",
      },
      {
        name: "YouTube API",
        description: "Channel: UCcck3tzBNXrJ1WJ8EtIVq1w — analytics and data access.",
        status: "connected",
        note: "Configured and tested 2026-02-22",
      },
      {
        name: "People API",
        description: "Needed for contact management and Google Contacts workflows.",
        status: "pending",
        note: "Needs enable in Google Cloud Console",
        unlocks: "Contact syncing and CRM-adjacent workflows",
        action: "Enable People API in Cloud Console for atlas.opsman@gmail.com project",
      },
      {
        name: "Search Console API",
        description: "SEO data for newton-insights.com and hellmausa.com.",
        status: "partial",
        note: "API enabled, but no sites found — atlas.opsman@gmail.com not added as user yet",
        unlocks: "SEO tracking and SCC/HUSA growth reporting",
        action: "Add atlas.opsman@gmail.com as Search Console user for each property",
      },
    ],
  },
  {
    label: "Content & Distribution",
    icon: "📡",
    priority: "medium",
    items: [
      {
        name: "Simplecast",
        description: "The Dime podcast hosting and episode management.",
        status: "connected",
        note: "Team member access confirmed",
      },
      {
        name: "Brave Search API",
        description: "Web search for daily brief, trend research, and Pulse workflows.",
        status: "connected",
        note: "Added 2026-02-23",
      },
      {
        name: "Instagram (The Dime)",
        description: "Publishing and scheduling access for Dime social.",
        status: "pending",
        note: "Not yet configured",
        unlocks: "Rob C can post and schedule content directly",
        action: "Connect Instagram account or share credentials",
      },
      {
        name: "Twitter / X (The Dime)",
        description: "Publishing and analytics access.",
        status: "pending",
        note: "Not yet configured",
        unlocks: "Rob C can post and monitor engagement directly",
        action: "Connect X account or share credentials",
      },
    ],
  },
  {
    label: "Data & Analytics",
    icon: "📊",
    priority: "medium",
    items: [
      {
        name: "SCC/HUSA Prospects Sheet",
        description: "Google Sheet: Prospects tracking for SCC/HUSA.",
        status: "connected",
        note: "Sheet ID confirmed in memory",
      },
      {
        name: "Newton Prospects Sheet",
        description: "Google Sheet: Newton pipeline tracking.",
        status: "connected",
        note: "Sheet ID confirmed in memory",
      },
      {
        name: "SCC/HUSA Search Console",
        description: "SEO data for shop.hellmausa.com — organic growth tracking.",
        status: "partial",
        note: "Need atlas.opsman@gmail.com added as user",
        unlocks: "SEO growth proof for SCC/HUSA value reporting",
        action: "Add atlas.opsman@gmail.com in Search Console for hellmausa.com",
      },
    ],
  },
  {
    label: "Infrastructure",
    icon: "🖥️",
    priority: "low",
    items: [
      {
        name: "Chromium on VM",
        description: "Browser automation capability installed.",
        status: "connected",
        note: "Confirmed installed",
      },
      {
        name: "Mission Control Dashboard",
        description: "Next.js app running locally at localhost:3000.",
        status: "connected",
        note: "Live — auto-refresh on blockers/loops",
      },
    ],
  },
];

export default function AccessStatus() {
  const [expanded, setExpanded] = useState<string | null>("Revenue & Growth Blockers");
  const [filterStatus, setFilterStatus] = useState<AccessStatus | "all">("all");

  const allItems = sections.flatMap((s) => s.items);
  const connectedCount = allItems.filter((i) => i.status === "connected").length;
  const pendingCount = allItems.filter((i) => i.status === "pending" || i.status === "partial" || i.status === "blocked").length;

  const priorityOrder: AccessSection["priority"][] = ["critical", "high", "medium", "low"];
  const sorted = [...sections].sort(
    (a, b) => priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority)
  );

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Access & Integrations</h1>
        <p className="text-gray-500 text-sm mt-1">
          <span className="text-green-600 font-semibold">{connectedCount} connected</span>
          {" · "}
          <span className="text-red-500 font-semibold">{pendingCount} need attention</span>
          {" · Sorted by what unlocks the most value"}
        </p>
      </div>

      {/* Status filter */}
      <div className="flex gap-2 flex-wrap mb-6">
        {(["all", "connected", "partial", "pending", "blocked"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors capitalize ${
              filterStatus === s
                ? "bg-gray-900 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {s === "all" ? "All" : `${statusConfig[s]?.icon} ${statusConfig[s]?.label}`}
          </button>
        ))}
      </div>

      {/* Sections */}
      <div className="space-y-3">
        {sorted.map((section) => {
          const cfg = priorityConfig[section.priority];
          const visibleItems = filterStatus === "all"
            ? section.items
            : section.items.filter((i) => i.status === filterStatus);
          if (visibleItems.length === 0) return null;
          const isOpen = expanded === section.label;

          return (
            <div key={section.label} className={`rounded-xl border ${cfg.color} overflow-hidden`}>
              {/* Section header */}
              <button
                onClick={() => setExpanded(isOpen ? null : section.label)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{section.icon}</span>
                  <span className="font-semibold text-gray-900">{section.label}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${cfg.badge}`}>
                    {section.priority.charAt(0).toUpperCase() + section.priority.slice(1)}
                  </span>
                  <span className="text-xs text-gray-500">{visibleItems.length} item{visibleItems.length !== 1 ? "s" : ""}</span>
                </div>
                <span className="text-gray-400 text-sm">{isOpen ? "▲" : "▼"}</span>
              </button>

              {/* Items */}
              {isOpen && (
                <div className="border-t border-gray-200 divide-y divide-gray-100">
                  {visibleItems.map((item) => {
                    const sc = statusConfig[item.status];
                    return (
                      <div key={item.name} className="bg-white px-5 py-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-gray-900 text-sm">{item.name}</span>
                              <span className={`text-xs font-medium ${sc.color}`}>{sc.icon} {sc.label}</span>
                            </div>
                            <p className="text-xs text-gray-500 mb-1">{item.description}</p>
                            {item.note && (
                              <p className="text-xs text-gray-400 italic">{item.note}</p>
                            )}
                            {item.unlocks && (
                              <p className="text-xs text-blue-600 mt-1.5">
                                🔓 Unlocks: {item.unlocks}
                              </p>
                            )}
                            {item.action && (
                              <p className="text-xs text-orange-600 mt-1 font-medium">
                                → Action: {item.action}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
