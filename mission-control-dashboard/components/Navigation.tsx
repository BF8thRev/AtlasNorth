"use client";

import { SecurityStatus } from "./AlertsTab";

export type TabId =
  | "blockers" | "loops" | "roster" | "kanban"
  | "routines" | "decisions" | "access" | "vault"
  | "budget" | "podcast" | "alerts" | "drafts" | "goals" | "models";

type NavigationProps = {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
  securityStatus: SecurityStatus;
};

export default function Navigation({ activeTab, setActiveTab, securityStatus }: NavigationProps) {
  const navItems: { id: TabId; label: string; shortLabel: string; icon: string }[] = [
    { id: "blockers",  label: "Blockers for You",     shortLabel: "Blockers",  icon: "🚧" },
    { id: "loops",     label: "Open Loops",            shortLabel: "Loops",     icon: "🔄" },
    { id: "kanban",    label: "The Ops Board",         shortLabel: "Ops",       icon: "📋" },
    { id: "roster",    label: "Roster",                shortLabel: "Roster",    icon: "🃏" },
    { id: "routines",  label: "Routines",              shortLabel: "Routines",  icon: "🔁" },
    { id: "decisions", label: "Decisions Log",         shortLabel: "Decisions", icon: "⚖️" },
    { id: "podcast",   label: "Podcast Review",        shortLabel: "Podcast",   icon: "🎙️" },
    { id: "budget",    label: "Budget Meter",          shortLabel: "Budget",    icon: "📈" },
    { id: "access",    label: "Access & Integrations", shortLabel: "Access",    icon: "🔌" },
    { id: "vault",     label: "Memory Vault",          shortLabel: "Vault",     icon: "🗄️" },
    { id: "drafts",    label: "Drafts",                shortLabel: "Drafts",    icon: "📝" },
    { id: "goals",     label: "Growth Goals",          shortLabel: "Goals",     icon: "🎯" },
    { id: "alerts",    label: "Security Alerts",       shortLabel: "Alerts",    icon: securityStatus === "flagged" ? "🔴" : "🟢" },
    { id: "models",    label: "Model Status",           shortLabel: "Models",    icon: "🧠" },
  ];

  return (
    <>
      {/* ── Desktop Sidebar (hidden on mobile) ── */}
      <nav className="hidden md:flex fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 flex-col">
        <div className="p-6 flex-1 overflow-y-auto">
          {/* Header with security signal */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Mission Control</h2>
            <button
              onClick={() => setActiveTab("alerts")}
              title={securityStatus === "flagged" ? "Security flag raised — click to view" : "All clear"}
              className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className={`w-2.5 h-2.5 rounded-full ${securityStatus === "flagged" ? "bg-red-500 animate-pulse" : "bg-green-400"}`} />
              <span className={`text-xs font-semibold ${securityStatus === "flagged" ? "text-red-600" : "text-green-600"}`}>
                {securityStatus === "flagged" ? "Alert" : "Clear"}
              </span>
            </button>
          </div>

          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`
                    w-full text-left px-4 py-2.5 rounded-lg font-medium text-sm
                    transition-colors duration-200
                    ${activeTab === item.id
                      ? "bg-blue-600 text-white"
                      : item.id === "alerts" && securityStatus === "flagged"
                        ? "bg-red-50 text-red-700 hover:bg-red-100"
                        : "text-gray-700 hover:bg-gray-100"
                    }
                  `}
                >
                  <span className="mr-2.5">{item.icon}</span>
                  {item.label}
                  {item.id === "alerts" && securityStatus === "flagged" && activeTab !== "alerts" && (
                    <span className="ml-2 inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">Built for Bryan Fields</p>
        </div>
      </nav>

      {/* ── Mobile Bottom Tab Bar (hidden on md+) ── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 overflow-x-auto">
        <div className="flex min-w-max">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{ minHeight: "56px" }}
              className={`
                flex flex-col items-center justify-center px-3 py-2 text-xs font-medium
                transition-colors duration-200 flex-shrink-0
                ${activeTab === item.id
                  ? "text-blue-600 border-t-2 border-blue-600 bg-blue-50"
                  : item.id === "alerts" && securityStatus === "flagged"
                    ? "text-red-600"
                    : "text-gray-500"
                }
              `}
            >
              <span className="text-lg leading-none mb-0.5">{item.icon}</span>
              <span className="whitespace-nowrap">{item.shortLabel}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
