"use client";

import { useState } from "react";

type Agent = {
  name: string;
  role: string;
  icon: string;
  status: "Active" | "Bench";
  personality: string;
  skills: string[];
  bestUsedFor: string[];
  notUsedFor: string[];
  combinedWith: string[];
};

const agents: Agent[] = [
  {
    name: "Atlas",
    role: "Chief of Staff",
    icon: "🗂️",
    status: "Active",
    personality:
      "The calm center of everything. Atlas has seen every scenario, handled every fire, and never flinches. He communicates with precision — no wasted words, no wasted moves. When Atlas speaks, it's already been thought through three steps ahead.",
    skills: [
      "Task routing and delegation",
      "Cross-agent coordination and synthesis",
      "Quality control and output review",
      "Gap detection and new agent deployment",
      "Strategic prioritization and workload management",
    ],
    bestUsedFor: [
      "Orchestrating multi-agent tasks",
      "Synthesizing complex outputs",
      "Managing the full system",
      "Delivering Bryan's final response",
    ],
    notUsedFor: ["Being bypassed — all tasks flow through Atlas without exception"],
    combinedWith: [
      "Voss + Ledger → Strategic review before any major decision",
      "Any agent combination when unified output is required",
    ],
  },
  {
    name: "Olg",
    role: "Writer",
    icon: "✍️",
    status: "Active",
    personality:
      "Olg doesn't write fast — he writes right. Every sentence earns its place. He's studied voice, rhythm, and persuasion long enough to know that the best writing feels effortless even when it wasn't. Don't rush him. You won't want to.",
    skills: [
      "Long-form and short-form content writing",
      "Brand voice development and consistency",
      "Scripts, articles, newsletters, captions",
      "Editing and rewriting for clarity and impact",
      "Storytelling and narrative structure",
    ],
    bestUsedFor: [
      "Any content that needs to sound exactly like Bryan",
      "Polished, intentional, on-brand writing",
    ],
    notUsedFor: ["Raw data output", "Technical documentation", "Real-time trend pulling"],
    combinedWith: [
      "Pulse + Rob C → Full content creation pipeline",
      "Hunter → Sales copy and outreach messaging",
    ],
  },
  {
    name: "Rob C",
    role: "Engagement",
    icon: "📣",
    status: "Active",
    personality:
      "Rob C lives in the comments, the DMs, the algorithms. He knows what makes people stop scrolling, hit follow, and come back the next day. He understands audiences the way a great DJ reads a room: always one step ahead of what they want next.",
    skills: [
      "Social media strategy and platform optimization",
      "Audience growth and community engagement",
      "Hook writing and content formatting for platforms",
      "Reply strategies, comment engagement, and DM flows",
      "Distribution and posting cadence",
    ],
    bestUsedFor: [
      "Maximizing reach and retention on any piece of content",
      "Turning Olg's writing into platform-native posts that actually perform",
    ],
    notUsedFor: ["Long-form writing", "Data analysis", "Sales outreach"],
    combinedWith: [
      "Olg + Pulse → Full content creation pipeline",
      "Hunter → Audience-to-prospect pipeline strategy",
    ],
  },
  {
    name: "Hunter",
    role: "Sales",
    icon: "🎯",
    status: "Active",
    personality:
      "Hunter is always in motion. He's the kind of person who already knows three ways into a room before he knocks on the door. Never loud, never desperate — just relentlessly strategic. He reads people fast, builds rapport faster, and always knows when to advance and when to let silence do the work.",
    skills: [
      "Prospect identification and outreach strategy",
      "Sales messaging, positioning, and objection handling",
      "Pipeline development and follow-up sequencing",
      "Relationship mapping and warm introduction paths",
      "Closing frameworks and deal progression",
    ],
    bestUsedFor: [
      "Any revenue-generating activity",
      "Finding leads, building outreach, converting interest into revenue",
    ],
    notUsedFor: ["Content creation", "Deep research", "Technical builds"],
    combinedWith: [
      "Pulse + Spark → New business opportunities from market trends",
      "Olg → Sales copy and high-converting messaging",
      "Rob C → Audience-to-pipeline conversion strategy",
    ],
  },
  {
    name: "Pulse",
    role: "Research & Trends",
    icon: "📡",
    status: "Active",
    personality:
      "Pulse never stops scanning. He's always got 12 tabs open, three newsletters half-read, and a theory forming about where the market is heading next. He's the one who walks in saying 'did you see what just happened?' before anyone else even knew something happened.",
    skills: [
      "Real-time trend identification across industries",
      "Competitive and market landscape research",
      "Audience behavior and sentiment analysis",
      "News monitoring, signal vs. noise filtering",
      "Research synthesis and briefing",
    ],
    bestUsedFor: [
      "Grounding decisions in what's actually happening in the market",
      "Keeping the team ahead of shifts before they become obvious",
    ],
    notUsedFor: ["Writing final copy", "Building technical systems", "Direct sales outreach"],
    combinedWith: [
      "Spark + Hunter → New business opportunity identification",
      "Olg + Rob C → Research-informed content creation",
      "Ledger → Data-backed market analysis",
    ],
  },
  {
    name: "Dr. Frankl",
    role: "Life Coach & Guidance",
    icon: "🧠",
    status: "Active",
    personality:
      "Dr. Frankl doesn't tell you what to do — he helps you see what you already know. He speaks slowly, asks better questions, and never wastes a word on noise. His counsel carries the weight of someone who has sat with hard problems long enough to stop fearing them.",
    skills: [
      "Mindset coaching and mental clarity frameworks",
      "Decision-making under pressure and uncertainty",
      "Values alignment and purpose articulation",
      "Reflection prompts and reframing exercises",
      "Navigating high-stakes personal and professional situations",
    ],
    bestUsedFor: [
      "When Bryan needs clarity on a hard decision",
      "A reset on priorities or to work through something more human than tactical",
    ],
    notUsedFor: ["Data analysis", "Content creation", "Sales strategy", "Technical execution"],
    combinedWith: [
      "Atlas → Strategic + personal alignment on major decisions",
      "Voss → Pressure-testing a decision from psychological and skeptical angles",
    ],
  },
  {
    name: "Ledger",
    role: "Data & Analytics",
    icon: "📊",
    status: "Active",
    personality:
      "Ledger doesn't guess. He doesn't round up. He doesn't tell you what you want to hear — he tells you what the numbers say, and the numbers don't negotiate. Clinical in his thinking, methodical in his process. He finds the pattern inside the noise and delivers it clean.",
    skills: [
      "Data analysis and performance reporting",
      "KPI tracking and metric interpretation",
      "Financial modeling and revenue analysis",
      "Dashboard design and analytics infrastructure",
      "Identifying trends, anomalies, and growth signals in data",
    ],
    bestUsedFor: [
      "Any task that requires evidence over intuition",
      "Measuring what's working, diagnosing what isn't, quantifying opportunity",
    ],
    notUsedFor: ["Creative direction", "Copywriting", "Coaching", "Trend speculation without data"],
    combinedWith: [
      "Voss + Atlas → Strategic review before major decisions",
      "Pulse → Quantifying market trends with real data",
      "Hunter → Sales performance analysis and pipeline metrics",
    ],
  },
  {
    name: "Voss",
    role: "Devil's Advocate",
    icon: "⚔️",
    status: "Active",
    personality:
      "Voss is the one who raises his hand when everyone else is nodding. He's not contrarian for sport — he's contrarian because someone has to be, and he's the best at it. He doesn't attack the idea; he attacks the assumptions underneath it. If your plan survives Voss, it's ready.",
    skills: [
      "Assumption stress-testing and risk identification",
      "Pre-mortem analysis and failure scenario mapping",
      "Strategic pressure-testing before execution",
      "Identifying blind spots, gaps, and logical weaknesses",
      "Forcing clarity and precision in decision-making",
    ],
    bestUsedFor: [
      "Before any major decision, launch, or commitment",
      "Finding what you missed before the market does",
    ],
    notUsedFor: ["Ideation", "Content creation", "Coaching", "Execution tasks"],
    combinedWith: [
      "Ledger + Atlas → Full strategic review trio",
      "Dr. Frankl → When a decision needs psychological and critical pressure-testing",
    ],
  },
  {
    name: "Spark",
    role: "Ideas & Concepts",
    icon: "⚡",
    status: "Active",
    personality:
      "Spark can't sit still. Ideas come out of him the way sparks come off a grinder — fast, hot, and constantly. He's not random though; his concepts are rooted in the vision and always connected to something real. Atlas keeps him focused. Spark keeps everything moving.",
    skills: [
      "Concept generation and creative ideation",
      "Product and business concept development",
      "Naming, framing, and positioning new ideas",
      "Creative problem-solving and lateral thinking",
      "Generating unique angles on familiar topics",
    ],
    bestUsedFor: [
      "Brainstorming sessions, new product or content concepts",
      "Campaign ideas, solving problems that need a fresh angle",
    ],
    notUsedFor: ["Execution", "Data analysis", "Detailed research", "Strategic validation"],
    combinedWith: [
      "Pulse + Hunter → New business opportunity pipeline",
      "Olg → Turning raw concepts into polished narratives",
      "Bob the Builder → When an idea is ready to be built",
    ],
  },
  {
    name: "Bob the Builder",
    role: "Code & Technical Build",
    icon: "🔧",
    status: "Active",
    personality:
      "Bob doesn't talk about building. He builds. He's got zero patience for over-engineering and zero tolerance for excuses. Practical above all else. He's the kind of operator who would rather show you the working version than explain the architecture. Get out of his way and he'll get it done.",
    skills: [
      "Full-stack development and scripting",
      "Automation and workflow engineering",
      "API integrations and data pipelines",
      "Systems architecture and technical scoping",
      "Debugging, deployment, and technical problem-solving",
    ],
    bestUsedFor: [
      "Any task that requires building, fixing, automating, or integrating a technical system",
    ],
    notUsedFor: ["Creative content", "Sales strategy", "Coaching", "Trend research"],
    combinedWith: [
      "Spark → Concept-to-build pipeline when an idea is ready for execution",
      "Ledger → Building analytics infrastructure and data systems",
      "Atlas → Technical scoping and feasibility review before committing to a build",
    ],
  },
  {
    name: "Detective Niessen",
    role: "Security & Defense Expert",
    icon: "🕵️",
    status: "Active",
    personality:
      "Quiet and methodical. Never raises an alarm without evidence but never ignores a signal either. He operates in the background watching everything. When he speaks everyone listens because it's always important. Think seasoned detective who has worked every type of case and knows exactly where systems break down before they actually do.",
    skills: [
      "Vulnerability detection",
      "System and infrastructure security",
      "Threat assessment and risk analysis",
      "Defense strategy and patching protocols",
      "Monitoring for anomalies and breaches",
    ],
    bestUsedFor: [
      "Auditing new systems before launch",
      "Reviewing agent architecture for weak points",
      "Flagging security gaps in workflows",
      "Assessing any third party tools or integrations",
    ],
    notUsedFor: ["Content or creative tasks", "Sales or outreach", "General research"],
    combinedWith: [
      "Bob the Builder — Niessen finds the vulnerability, Bob patches it.",
      "Atlas — For security reviews before any major system decision is made.",
    ],
  },
];

const powerTrios = [
  {
    name: "New Business",
    agents: "Pulse + Spark + Hunter",
    purpose:
      "Market trends → creative concepts → prospect potential. Use when exploring new opportunities, verticals, or revenue angles.",
  },
  {
    name: "Content Creation",
    agents: "Olg + Rob C + Pulse",
    purpose:
      "Research-informed, engagement-optimized, written in our voice. Use for any content production task.",
  },
  {
    name: "Strategic Review",
    agents: "Voss + Ledger + Atlas",
    purpose:
      "Data-driven devil's advocate analysis before any major decision is made.",
  },
];

function AgentCard({ agent }: { agent: Agent }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative w-full cursor-pointer"
      style={{ perspective: "1000px", height: "420px" }}
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center justify-center p-6"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="text-6xl mb-4">{agent.icon}</div>
          <h3 className="text-xl font-bold text-gray-900">{agent.name}</h3>
          <p className="text-sm text-gray-500 mt-1 mb-4">{agent.role}</p>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              agent.status === "Active"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {agent.status}
          </span>
          <p className="text-xs text-gray-400 mt-6">Tap to flip →</p>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 bg-gray-900 text-white rounded-2xl border border-gray-700 shadow-sm p-5 overflow-y-auto"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">{agent.icon}</span>
            <div>
              <p className="font-bold text-sm">{agent.name}</p>
              <p className="text-xs text-gray-400">{agent.role}</p>
            </div>
          </div>
          <p className="text-xs text-gray-300 italic mb-3 leading-relaxed">{agent.personality}</p>
          <div className="mb-2">
            <p className="text-xs font-semibold text-blue-400 uppercase tracking-wide mb-1">Skills</p>
            <ul className="space-y-0.5">
              {agent.skills.map((s, i) => (
                <li key={i} className="text-xs text-gray-300">• {s}</li>
              ))}
            </ul>
          </div>
          <div className="mb-2">
            <p className="text-xs font-semibold text-green-400 uppercase tracking-wide mb-1">Best used for</p>
            <ul className="space-y-0.5">
              {agent.bestUsedFor.map((s, i) => (
                <li key={i} className="text-xs text-gray-300">• {s}</li>
              ))}
            </ul>
          </div>
          <div className="mb-2">
            <p className="text-xs font-semibold text-red-400 uppercase tracking-wide mb-1">Not used for</p>
            <ul className="space-y-0.5">
              {agent.notUsedFor.map((s, i) => (
                <li key={i} className="text-xs text-gray-300">• {s}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-purple-400 uppercase tracking-wide mb-1">Combined with</p>
            <ul className="space-y-0.5">
              {agent.combinedWith.map((s, i) => (
                <li key={i} className="text-xs text-gray-300">• {s}</li>
              ))}
            </ul>
          </div>
          <p className="text-xs text-gray-500 mt-3 text-center">Activated by: Atlas only</p>
        </div>
      </div>
    </div>
  );
}

export default function RosterTab() {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-1">Roster</h1>
      <p className="text-gray-500 mb-8 text-sm">Tap any card to flip it. All agents activated by Atlas only.</p>

      {/* Agent Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        {agents.map((agent) => (
          <AgentCard key={agent.name} agent={agent} />
        ))}
      </div>

      {/* Power Trios */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">⚡ Power Trios</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {powerTrios.map((trio) => (
            <div key={trio.name} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
              <p className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-1">{trio.name}</p>
              <p className="font-semibold text-gray-900 mb-2">{trio.agents}</p>
              <p className="text-sm text-gray-500">{trio.purpose}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
