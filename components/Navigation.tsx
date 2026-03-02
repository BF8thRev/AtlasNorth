"use client";

import { useState } from "react";
import { SecurityStatus } from "./AlertsTab";

export type TabId =
  | "blockers" | "loops" | "roster" | "kanban"
  | "routines" | "decisions" | "access" | "vault"
  | "budget" | "podcast" | "alerts" | "drafts" | "goals";

type NavigationProps = {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
  securityStatus: SecurityStatus;
};

export default function Navigation({ activeTab, setActiveTab, securityStatus }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems: { id: TabId; label: string; icon: string }[] = [
    { id: "blockers",  label: "Blockers for You",     icon: "🚧" },
    { id: "loops",     label: "Open Loops",            icon: "🔄" },
    { id: "kanban",    label: "The Ops Board",         icon: "📋" },
    { id: "roster",    label: "Roster",                icon: "🃏" },
    { id: "routines",  label: "Routines",              icon: "🔁" },
    { id: "decisions", label: "Decisions Log",         icon: "⚖️" },
    { id: "podcast",   label: "Podcast Review",        icon: "🎙️" },
    { id: "budget",    label: "Budget Meter",          icon: "📈" },
    { id: "access",    label: "Access & Integrations", icon: "🔌" },
    { id: "vault",     label: "Memory Vault",          icon: "🗄️" },
    { id: "drafts",    label: "Drafts",                icon: "📝" },
    { id: "goals",     label: "Growth Goals",          icon: "🎯" },
    { id: "alerts",    label: "Security Alerts",       icon: securityStatus === "flagged" ? "🔴" : "🟢" },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          {isOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
        </svg>
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30" onClick={() => setIsOpen(false)} />
      )}

      {/* Sidebar Navigation */}
      <nav className={`
        fixed md:static inset-y-0 left-0 z-40
        w-64 bg-white border-r border-gray-200
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        flex flex-col
      `}>
        <div className="p-6 flex-1 overflow-y-auto">
          {/* Header with security signal */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Mission Control</h2>
            <button
              onClick={() => { setActiveTab("alerts"); setIsOpen(false); }}
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
                  onClick={() => { setActiveTab(item.id); setIsOpen(false); }}
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
    </>
  );
}
