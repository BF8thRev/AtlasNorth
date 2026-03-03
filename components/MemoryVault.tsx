"use client";

import { useState, useEffect, useCallback } from "react";

/* ─── Types ─────────────────────────────────────── */
type FileEntry = {
  name: string;
  path: string;
  description?: string;
};

type AgentDef = {
  id: string;
  label: string;
  emoji: string;
  color: string;        // Tailwind bg for the badge
  textColor: string;
  files: FileEntry[];
};

/* ─── Agents ─────────────────────────────────────── */
const AGENTS: AgentDef[] = [
  {
    id: "atlas",
    label: "Atlas",
    emoji: "🤖",
    color: "bg-indigo-100",
    textColor: "text-indigo-700",
    files: [
      { name: "SOUL.md",       path: "SOUL.md",       description: "Identity, persona, operating rules" },
      { name: "MEMORY.md",     path: "MEMORY.md",     description: "Long-term memory & access log" },
      { name: "AGENTS.md",     path: "AGENTS.md",     description: "Capabilities, gates, context tagging" },
      { name: "IDENTITY.md",   path: "IDENTITY.md",   description: "Name, vibe, avatar card" },
      { name: "USER.md",       path: "USER.md",       description: "Bryan's profile & preferences" },
      { name: "HEARTBEAT.md",       path: "HEARTBEAT.md",           description: "Periodic task scheduler" },
      { name: "ATLAS_SOUL.md",          path: "ATLAS_SOUL.md",          description: "Core identity, principles, decision framework" },
      { name: "USER_IDENTITY.md",       path: "USER_IDENTITY.md",       description: "Bryan's identity, goals, communication style" },
      { name: "SYSTEM_ARCHITECTURE.md", path: "SYSTEM_ARCHITECTURE.md", description: "Agent roster, task flow, file map, north stars" },
      { name: "CALIBRATION_NOTES.md",   path: "CALIBRATION_NOTES.md",   description: "What lands vs. fails — pattern log" },
      { name: "DECISION_TREES.md",      path: "DECISION_TREES.md",      description: "Atlas decision logic — routing, memory, content, build" },
      { name: "BRYAN_PROFILE.md",   path: "BRYAN_PROFILE.md",       description: "Approval/rejection patterns & calibration log" },
      { name: "ATLAS_MEMORY_EXPORT.txt", path: "ATLAS_MEMORY_EXPORT.txt", description: "Task history — source of truth" },
      { name: "WORKFLOW_STATE.json", path: "WORKFLOW_STATE.json",   description: "Current workflow state & open loops" },
      { name: "ENGAGEMENT_RULES.md", path: "ENGAGEMENT_RULES.md",  description: "Behavioral rules (3+ occurrence threshold)" },
    ],
  },
  {
    id: "olg",
    label: "Olg",
    emoji: "✍️",
    color: "bg-amber-100",
    textColor: "text-amber-700",
    files: [
      { name: "SOUL.md",      path: "agents/olg/SOUL.md",      description: "Identity & persona" },
      { name: "IDENTITY.md",  path: "agents/olg/IDENTITY.md",  description: "Name, vibe, avatar" },
      { name: "USER.md",      path: "agents/olg/USER.md",      description: "User profile & preferences" },
      { name: "MEMORY.md",    path: "agents/olg/MEMORY.md",    description: "Long-term memory" },
      { name: "HEARTBEAT.md", path: "agents/olg/HEARTBEAT.md", description: "Periodic task scheduler" },
    ],
  },
  {
    id: "rob-c",
    label: "Rob C",
    emoji: "📣",
    color: "bg-cyan-100",
    textColor: "text-cyan-700",
    files: [
      { name: "SOUL.md",      path: "agents/rob-c/SOUL.md",      description: "Identity & persona" },
      { name: "IDENTITY.md",  path: "agents/rob-c/IDENTITY.md",  description: "Name, vibe, avatar" },
      { name: "USER.md",      path: "agents/rob-c/USER.md",      description: "User profile & preferences" },
      { name: "MEMORY.md",    path: "agents/rob-c/MEMORY.md",    description: "Long-term memory" },
      { name: "HEARTBEAT.md", path: "agents/rob-c/HEARTBEAT.md", description: "Periodic task scheduler" },
    ],
  },
  {
    id: "hunter",
    label: "Hunter",
    emoji: "🎯",
    color: "bg-red-100",
    textColor: "text-red-700",
    files: [
      { name: "SOUL.md",      path: "agents/hunter/SOUL.md",      description: "Identity & persona" },
      { name: "IDENTITY.md",  path: "agents/hunter/IDENTITY.md",  description: "Name, vibe, avatar" },
      { name: "USER.md",      path: "agents/hunter/USER.md",      description: "User profile & preferences" },
      { name: "MEMORY.md",    path: "agents/hunter/MEMORY.md",    description: "Long-term memory" },
      { name: "HEARTBEAT.md", path: "agents/hunter/HEARTBEAT.md", description: "Periodic task scheduler" },
    ],
  },
  {
    id: "pulse",
    label: "Pulse",
    emoji: "📡",
    color: "bg-blue-100",
    textColor: "text-blue-700",
    files: [
      { name: "SOUL.md",      path: "agents/pulse/SOUL.md",      description: "Identity & persona" },
      { name: "IDENTITY.md",  path: "agents/pulse/IDENTITY.md",  description: "Name, vibe, avatar" },
      { name: "USER.md",      path: "agents/pulse/USER.md",      description: "User profile & preferences" },
      { name: "MEMORY.md",    path: "agents/pulse/MEMORY.md",    description: "Long-term memory" },
      { name: "HEARTBEAT.md", path: "agents/pulse/HEARTBEAT.md", description: "Periodic task scheduler" },
    ],
  },
  {
    id: "dr-frankl",
    label: "Dr. Frankl",
    emoji: "🧠",
    color: "bg-violet-100",
    textColor: "text-violet-700",
    files: [
      { name: "SOUL.md",      path: "agents/dr-frankl/SOUL.md",      description: "Identity & persona" },
      { name: "IDENTITY.md",  path: "agents/dr-frankl/IDENTITY.md",  description: "Name, vibe, avatar" },
      { name: "USER.md",      path: "agents/dr-frankl/USER.md",      description: "User profile & preferences" },
      { name: "MEMORY.md",    path: "agents/dr-frankl/MEMORY.md",    description: "Long-term memory" },
      { name: "HEARTBEAT.md", path: "agents/dr-frankl/HEARTBEAT.md", description: "Periodic task scheduler" },
    ],
  },
  {
    id: "ledger",
    label: "Ledger",
    emoji: "📊",
    color: "bg-emerald-100",
    textColor: "text-emerald-700",
    files: [
      { name: "SOUL.md",      path: "agents/ledger/SOUL.md",      description: "Identity & persona" },
      { name: "IDENTITY.md",  path: "agents/ledger/IDENTITY.md",  description: "Name, vibe, avatar" },
      { name: "USER.md",      path: "agents/ledger/USER.md",      description: "User profile & preferences" },
      { name: "MEMORY.md",    path: "agents/ledger/MEMORY.md",    description: "Long-term memory" },
      { name: "HEARTBEAT.md", path: "agents/ledger/HEARTBEAT.md", description: "Periodic task scheduler" },
    ],
  },
  {
    id: "voss",
    label: "Voss",
    emoji: "⚔️",
    color: "bg-orange-100",
    textColor: "text-orange-700",
    files: [
      { name: "SOUL.md",      path: "agents/voss/SOUL.md",      description: "Identity & persona" },
      { name: "IDENTITY.md",  path: "agents/voss/IDENTITY.md",  description: "Name, vibe, avatar" },
      { name: "USER.md",      path: "agents/voss/USER.md",      description: "User profile & preferences" },
      { name: "MEMORY.md",    path: "agents/voss/MEMORY.md",    description: "Long-term memory" },
      { name: "HEARTBEAT.md", path: "agents/voss/HEARTBEAT.md", description: "Periodic task scheduler" },
    ],
  },
  {
    id: "spark",
    label: "Spark",
    emoji: "⚡",
    color: "bg-yellow-100",
    textColor: "text-yellow-700",
    files: [
      { name: "SOUL.md",      path: "agents/spark/SOUL.md",      description: "Identity & persona" },
      { name: "IDENTITY.md",  path: "agents/spark/IDENTITY.md",  description: "Name, vibe, avatar" },
      { name: "USER.md",      path: "agents/spark/USER.md",      description: "User profile & preferences" },
      { name: "MEMORY.md",    path: "agents/spark/MEMORY.md",    description: "Long-term memory" },
      { name: "HEARTBEAT.md", path: "agents/spark/HEARTBEAT.md", description: "Periodic task scheduler" },
    ],
  },
  {
    id: "bob-the-builder",
    label: "Bob the Builder",
    emoji: "🔧",
    color: "bg-green-100",
    textColor: "text-green-700",
    files: [
      { name: "SOUL.md",      path: "agents/bob-the-builder/SOUL.md",      description: "Identity & persona" },
      { name: "IDENTITY.md",  path: "agents/bob-the-builder/IDENTITY.md",  description: "Name, vibe, avatar" },
      { name: "USER.md",      path: "agents/bob-the-builder/USER.md",      description: "User profile & preferences" },
      { name: "MEMORY.md",    path: "agents/bob-the-builder/MEMORY.md",    description: "Long-term memory" },
      { name: "HEARTBEAT.md", path: "agents/bob-the-builder/HEARTBEAT.md", description: "Periodic task scheduler" },
    ],
  },
  {
    id: "detective-niessen",
    label: "Detective Niessen",
    emoji: "🕵️",
    color: "bg-gray-100",
    textColor: "text-gray-700",
    files: [
      { name: "SOUL.md",      path: "agents/detective-niessen/SOUL.md",      description: "Identity & persona" },
      { name: "IDENTITY.md",  path: "agents/detective-niessen/IDENTITY.md",  description: "Name, vibe, avatar" },
      { name: "USER.md",      path: "agents/detective-niessen/USER.md",      description: "User profile & preferences" },
      { name: "MEMORY.md",    path: "agents/detective-niessen/MEMORY.md",    description: "Long-term memory" },
      { name: "HEARTBEAT.md", path: "agents/detective-niessen/HEARTBEAT.md", description: "Periodic task scheduler" },
    ],
  },
];

/* ─── Shared context ─────────────────────────────── */
type SharedSection = {
  label: string;
  emoji: string;
  files: FileEntry[];
};

const SHARED: SharedSection[] = [
  {
    label: "General Ops",
    emoji: "📁",
    files: [
      { name: "GENERAL_TASKS.md",       path: "GENERAL_TASKS.md",       description: "Task registry & research notes" },
      { name: "GENERAL_LEARNINGS.md",   path: "GENERAL_LEARNINGS.md",   description: "Cross-domain lessons & patterns" },
      { name: "GENERAL_STYLE_GUIDE.md", path: "GENERAL_STYLE_GUIDE.md", description: "Bryan's communication style" },
    ],
  },
  {
    label: "The Dime",
    emoji: "🎙️",
    files: [
      { name: "DIME_MISSION.md",           path: "DIME_MISSION.md",           description: "Podcast mission & north star" },
      { name: "DIME_STRATEGY_WIKI.md",     path: "DIME_STRATEGY_WIKI.md",     description: "Strategy wiki & growth plays" },
      { name: "DIME_STYLE_GUIDE.md",       path: "DIME_STYLE_GUIDE.md",       description: "Voice, tone & content standards" },
      { name: "DIME_LEARNINGS.md",         path: "DIME_LEARNINGS.md",         description: "Lessons learned & pattern archive" },
    ],
  },
  {
    label: "Newton Insights",
    emoji: "🔬",
    files: [
      { name: "Newton_tasks.md",             path: "Newton_tasks.md",             description: "Active Newton task registry" },
      { name: "NEWTON_SALES_PLAYBOOK.md",    path: "NEWTON_SALES_PLAYBOOK.md",    description: "Sales playbook & objection handling" },
      { name: "NEWTON_SALES_ANALYSIS.md",   path: "NEWTON_SALES_ANALYSIS.md",   description: "Sales analysis & market data" },
    ],
  },
  {
    label: "Specs & Protocols",
    emoji: "📐",
    files: [
      { name: "DAILY_BRIEF_SPEC.md", path: "memory/DAILY_BRIEF_SPEC.md", description: "Daily brief format & delivery rules" },
      { name: "TOOLS.md",            path: "TOOLS.md",                   description: "Local tool notes & device names" },
      { name: "SOUL.md",             path: "SOUL.md",                    description: "Atlas identity & operating rules" },
    ],
  },
  {
    label: "Memory Archive",
    emoji: "🧠",
    files: [
      { name: "MEMORY.md",            path: "MEMORY.md",                  description: "Long-term memory & access log" },
      { name: "DAILY_BRIEF_SPEC.md",  path: "memory/DAILY_BRIEF_SPEC.md", description: "Daily brief spec" },
    ],
  },
];

/* ─── Helpers ─────────────────────────────────────── */
async function readFile(filePath: string): Promise<string> {
  const res = await fetch(`/api/files?path=${encodeURIComponent(filePath)}`);
  const data = await res.json();
  return data.content ?? "";
}

async function writeFile(filePath: string, content: string): Promise<boolean> {
  const res = await fetch("/api/files", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path: filePath, content }),
  });
  return res.ok;
}

/* ─── Component ─────────────────────────────────────── */
export default function MemoryVault() {
  const [selectedFile, setSelectedFile] = useState<FileEntry | null>(null);
  const [content, setContent] = useState<string>("");
  const [originalContent, setOriginalContent] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved" | "error">("idle");
  const [expandedAgents, setExpandedAgents] = useState<Set<string>>(new Set(["atlas"]));
  const [expandedShared, setExpandedShared] = useState<Set<string>>(new Set(["General Ops"]));

  const isDirty = content !== originalContent;

  const openFile = useCallback(async (file: FileEntry) => {
    setSelectedFile(file);
    setLoading(true);
    setSaveStatus("idle");
    const text = await readFile(file.path);
    setContent(text);
    setOriginalContent(text);
    setLoading(false);
  }, []);

  const save = async () => {
    if (!selectedFile) return;
    setSaving(true);
    const ok = await writeFile(selectedFile.path, content);
    setSaving(false);
    setSaveStatus(ok ? "saved" : "error");
    if (ok) setOriginalContent(content);
    setTimeout(() => setSaveStatus("idle"), 2500);
  };

  const toggleAgent = (id: string) => {
    setExpandedAgents((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleShared = (label: string) => {
    setExpandedShared((prev) => {
      const next = new Set(prev);
      next.has(label) ? next.delete(label) : next.add(label);
      return next;
    });
  };

  const totalSharedFiles = SHARED.reduce((s, sec) => s + sec.files.length, 0);
  const totalAgentFiles = AGENTS.reduce((s, a) => s + a.files.length, 0);

  return (
    <div className="flex h-[calc(100vh-120px)] gap-0 rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-white">
      {/* ── Sidebar ─────────────────────────────── */}
      <aside className="w-72 flex-shrink-0 border-r border-gray-200 overflow-y-auto bg-gray-50 flex flex-col">
        {/* Agent Files */}
        <div className="border-b border-gray-200">
          <div className="px-4 py-3 flex items-center gap-2">
            <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Agent Files</span>
            <span className="text-[10px] text-gray-400">· {totalAgentFiles} files</span>
          </div>
          {AGENTS.map((agent) => {
            const open = expandedAgents.has(agent.id);
            return (
              <div key={agent.id}>
                <button
                  onClick={() => toggleAgent(agent.id)}
                  className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${agent.color} ${agent.textColor}`}>
                      {agent.emoji} {agent.label}
                    </span>
                  </div>
                  <span className="text-gray-400 text-xs">{open ? "▲" : "▼"}</span>
                </button>
                {open && (
                  <div className="pb-1">
                    {agent.files.map((file) => (
                      <FileRow
                        key={file.path}
                        file={file}
                        selected={selectedFile?.path === file.path}
                        onClick={() => openFile(file)}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Shared Context */}
        <div className="flex-1">
          <div className="px-4 py-3 flex items-center gap-2">
            <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Shared Context</span>
            <span className="text-[10px] text-gray-400">· {totalSharedFiles} files</span>
          </div>
          {SHARED.map((section) => {
            const open = expandedShared.has(section.label);
            return (
              <div key={section.label}>
                <button
                  onClick={() => toggleShared(section.label)}
                  className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-100 transition-colors"
                >
                  <span className="text-sm text-gray-700 font-medium">
                    {section.emoji} {section.label}
                  </span>
                  <span className="text-gray-400 text-xs">{open ? "▲" : "▼"}</span>
                </button>
                {open && (
                  <div className="pb-1">
                    {section.files.map((file) => (
                      <FileRow
                        key={file.path}
                        file={file}
                        selected={selectedFile?.path === file.path}
                        onClick={() => openFile(file)}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>

      {/* ── Editor Panel ─────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {selectedFile ? (
          <>
            {/* Editor Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 bg-white flex-shrink-0">
              <div>
                <p className="text-sm font-semibold text-gray-900">{selectedFile.name}</p>
                <p className="text-xs text-gray-400 font-mono">{selectedFile.path}</p>
                {selectedFile.description && (
                  <p className="text-xs text-gray-500 mt-0.5">{selectedFile.description}</p>
                )}
              </div>
              <div className="flex items-center gap-3">
                {isDirty && (
                  <span className="text-xs text-amber-500 font-medium">● Unsaved changes</span>
                )}
                {saveStatus === "saved" && (
                  <span className="text-xs text-green-600 font-medium">✓ Saved</span>
                )}
                {saveStatus === "error" && (
                  <span className="text-xs text-red-500 font-medium">✗ Save failed</span>
                )}
                <button
                  onClick={save}
                  disabled={!isDirty || saving}
                  className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                    isDirty
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {saving ? "Saving…" : "Save"}
                </button>
              </div>
            </div>

            {/* Textarea */}
            {loading ? (
              <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
                Loading…
              </div>
            ) : (
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="flex-1 p-5 font-mono text-sm text-gray-800 resize-none outline-none bg-white leading-relaxed"
                spellCheck={false}
                placeholder="File is empty."
              />
            )}
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 gap-3">
            <span className="text-5xl">🗂️</span>
            <p className="text-sm font-medium">Select a file to view or edit</p>
            <p className="text-xs text-gray-300">Agent files · Shared context · Live editor</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── File Row ─────────────────────────────────────── */
function FileRow({
  file,
  selected,
  onClick,
}: {
  file: FileEntry;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-2 flex items-start gap-2 transition-colors ${
        selected
          ? "bg-indigo-50 border-l-2 border-indigo-500"
          : "hover:bg-gray-100 border-l-2 border-transparent"
      }`}
    >
      <span className="text-gray-400 text-xs mt-0.5 flex-shrink-0">📄</span>
      <div className="min-w-0">
        <p className={`text-xs font-semibold truncate ${selected ? "text-indigo-700" : "text-gray-800"}`}>
          {file.name}
        </p>
        {file.description && (
          <p className="text-[10px] text-gray-400 truncate mt-0.5">{file.description}</p>
        )}
      </div>
    </button>
  );
}
