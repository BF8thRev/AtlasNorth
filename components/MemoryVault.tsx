"use client";

import { useState } from "react";

type VaultFile = {
  name: string;
  description: string;
  path: string;
  tag?: string;
};

type VaultSection = {
  label: string;
  icon: string;
  color: string;
  files: VaultFile[];
};

const vault: VaultSection[] = [
  {
    label: "System Core",
    icon: "⚙️",
    color: "border-gray-300 bg-gray-50",
    files: [
      { name: "SOUL.md", description: "Atlas identity, persona, operating rules, and prime directive", path: "SOUL.md" },
      { name: "AGENTS.md", description: "Core capabilities, execution gates, context tagging, and weekly deliverables", path: "AGENTS.md" },
      { name: "MEMORY.md", description: "Long-term memory — Bryan profile, access log, API status, core values", path: "MEMORY.md" },
      { name: "IDENTITY.md", description: "Atlas identity card — name, vibe, avatar", path: "IDENTITY.md" },
      { name: "HEARTBEAT.md", description: "Periodic task scheduler — what Atlas checks on automatically", path: "HEARTBEAT.md" },
    ],
  },
  {
    label: "The Dime",
    icon: "🎙️",
    color: "border-blue-200 bg-blue-50",
    files: [
      { name: "DIME_MISSION.md", description: "The Dime podcast mission, goals, and north star", path: "DIME_MISSION.md" },
      { name: "DIME_STRATEGY_WIKI.md", description: "Full strategy wiki — positioning, growth plays, content model", path: "DIME_STRATEGY_WIKI.md" },
      { name: "DIME_STYLE_GUIDE.md", description: "Voice, tone, and content standards for The Dime", path: "DIME_STYLE_GUIDE.md" },
      { name: "DIME_LEARNINGS.md", description: "Lessons learned — what worked, what didn't, pattern archive", path: "DIME_LEARNINGS.md" },
      { name: "DIME_VICTORY_FAILURE_LOG.md", description: "Win/loss log — decisions made and outcomes tracked", path: "DIME_VICTORY_FAILURE_LOG.md" },
    ],
  },
  {
    label: "Newton Insights",
    icon: "🔬",
    color: "border-purple-200 bg-purple-50",
    files: [
      { name: "Newton_tasks.md", description: "Active Newton task registry — lead gen, nurture, content pipeline", path: "Newton_tasks.md" },
      { name: "NEWTON_SALES_PLAYBOOK.md", description: "Full sales playbook — positioning, objection handling, outreach", path: "NEWTON_SALES_PLAYBOOK.md" },
      { name: "future4200_executive_summary.md", description: "Future4200 prospect — executive summary and opportunity overview", path: "future4200_executive_summary.md", tag: "Prospect" },
      { name: "future4200_research_2026-02-24.md", description: "Future4200 — deep research file (Feb 24, 2026)", path: "future4200_research_2026-02-24.md", tag: "Prospect" },
      { name: "future4200_engagement_plan_bryan.md", description: "Future4200 — engagement and outreach plan", path: "future4200_engagement_plan_bryan.md", tag: "Prospect" },
      { name: "future4200_prospect_outreach.md", description: "Future4200 — prospect outreach messaging", path: "future4200_prospect_outreach.md", tag: "Prospect" },
      { name: "future4200_direct_quotes.md", description: "Future4200 — direct quotes for use in outreach", path: "future4200_direct_quotes.md", tag: "Prospect" },
      { name: "future4200_solvent_loss_post.md", description: "Future4200 — solvent loss content post", path: "future4200_solvent_loss_post.md", tag: "Prospect" },
    ],
  },
  {
    label: "General Ops",
    icon: "📁",
    color: "border-green-200 bg-green-50",
    files: [
      { name: "GENERAL_TASKS.md", description: "General task registry and research notes", path: "GENERAL_TASKS.md" },
      { name: "GENERAL_STYLE_GUIDE.md", description: "Bryan's communication style and preferences", path: "GENERAL_STYLE_GUIDE.md" },
      { name: "GENERAL_LEARNINGS.md", description: "Cross-domain lessons and operational patterns", path: "GENERAL_LEARNINGS.md" },
      { name: "BRYAN_PROFILE.md", description: "Full Bryan Fields profile — background, preferences, context", path: "BRYAN_PROFILE.md" },
    ],
  },
  {
    label: "Agent Systems",
    icon: "🤖",
    color: "border-yellow-200 bg-yellow-50",
    files: [
      { name: "ROSTER.md", description: "Full 11-agent roster with baseball cards and power trios", path: "ROSTER.md" },
      { name: "OLG_SYSTEM.md", description: "Olg's operating system — how he works and what he produces", path: "OLG_SYSTEM.md" },
      { name: "ROB_C_SYSTEM.md", description: "Rob C's operating system — engagement strategy and platform logic", path: "ROB_C_SYSTEM.md" },
    ],
  },

  {
    label: "Specs & Protocols",
    icon: "📐",
    color: "border-red-200 bg-red-50",
    files: [
      { name: "DAILY_BRIEF_SPEC.md", description: "Daily brief format — 3-part structure, delivery rules, constraints", path: "memory/DAILY_BRIEF_SPEC.md" },
      { name: "GETTING_STARTED.md", description: "OpenClaw onboarding and setup reference", path: "GETTING_STARTED.md" },
    ],
  },
];

export default function MemoryVault() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const totalFiles = vault.reduce((sum, s) => sum + s.files.length, 0);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Memory Vault</h1>
        <p className="text-gray-500 text-sm mt-1">
          {totalFiles} files across {vault.length} domains · Everything Atlas knows and uses
        </p>
      </div>

      <div className="space-y-3">
        {vault.map((section) => {
          const isOpen = expandedSection === section.label;
          return (
            <div
              key={section.label}
              className={`rounded-xl border ${section.color} overflow-hidden`}
            >
              {/* Section Header */}
              <button
                onClick={() => setExpandedSection(isOpen ? null : section.label)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{section.icon}</span>
                  <span className="font-semibold text-gray-900">{section.label}</span>
                  <span className="text-xs text-gray-500 font-normal">
                    {section.files.length} file{section.files.length !== 1 ? "s" : ""}
                  </span>
                </div>
                <span className="text-gray-400 text-sm">{isOpen ? "▲" : "▼"}</span>
              </button>

              {/* File List */}
              {isOpen && (
                <div className="border-t border-gray-200 divide-y divide-gray-100">
                  {section.files.map((file) => (
                    <div key={file.name} className="px-5 py-3 bg-white flex items-start gap-3">
                      <span className="text-gray-400 text-sm mt-0.5">📄</span>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{file.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{file.description}</p>
                        <p className="text-xs text-gray-400 mt-0.5 font-mono">{file.path}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
