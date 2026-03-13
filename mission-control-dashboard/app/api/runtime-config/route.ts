/**
 * GET /api/runtime-config
 *
 * Returns live agent→model routing state.
 *
 * Strategy:
 *   - Local dev: reads ~/.openclaw/openclaw.json (OPENCLAW_CONFIG_PATH env)
 *     → reflects what OpenClaw is actually running right now
 *   - Vercel: reads data/agent-models.json from the repo
 *     → reflects the last committed MC config (no direct FS access to host)
 *
 * The Model Status page consumes this endpoint. No polling — single fetch on
 * load plus a manual refresh button.
 */

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import os from "os";

// ── Types ─────────────────────────────────────────────────────────────────────

type AgentModelEntry = {
  id: string;
  name: string;
  emoji: string;
  role: string;
  primary_model: string;
  fallback_models: string[];
  source: "openclaw_runtime" | "mc_config";
  notes?: string;
};

type ModelPoolEntry = {
  type: "api" | "local";
  provider: string;
  status: "active" | "unknown";
  alias?: string;
};

type RuntimeConfigResponse = {
  source: "openclaw_runtime" | "mc_config";
  loaded_from: string;
  last_updated: string;
  agents: AgentModelEntry[];
  model_pool: Record<string, ModelPoolEntry>;
  global_defaults: {
    primary: string;
    fallbacks: string[];
  };
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function resolveHome(p: string): string {
  return p.startsWith("~") ? path.join(os.homedir(), p.slice(1)) : p;
}

function isLocalModel(modelId: string): boolean {
  return (
    modelId.startsWith("ollama/") ||
    modelId.includes("phi") ||
    modelId.includes("deepseek") ||
    modelId.includes("local")
  );
}

function inferProvider(modelId: string): string {
  if (modelId.startsWith("anthropic/") || modelId.includes("claude")) return "Anthropic";
  if (modelId.startsWith("openai/") || modelId.startsWith("gpt")) return "OpenAI";
  if (modelId.startsWith("google/") || modelId.includes("gemini")) return "Google";
  if (modelId.startsWith("ollama/")) return "Ollama (local)";
  if (modelId.includes("phi")) return "Microsoft (local)";
  if (modelId.includes("deepseek")) return "DeepSeek (local)";
  return "Unknown";
}

/** Build model pool from a set of model IDs seen in the config */
function buildModelPool(modelIds: Set<string>): Record<string, ModelPoolEntry> {
  const pool: Record<string, ModelPoolEntry> = {};
  for (const id of modelIds) {
    pool[id] = {
      type: isLocalModel(id) ? "local" : "api",
      provider: inferProvider(id),
      status: "active",
    };
  }
  return pool;
}

// ── Source A: read from openclaw.json (local runtime) ────────────────────────

function loadFromOpenclawRuntime(configPath: string): RuntimeConfigResponse | null {
  try {
    if (!fs.existsSync(configPath)) return null;
    const raw = JSON.parse(fs.readFileSync(configPath, "utf-8"));

    const agentsConfig = raw?.agents;
    if (!agentsConfig) return null;

    const defaults = agentsConfig.defaults ?? {};
    const defaultPrimary: string = defaults?.model?.primary ?? "anthropic/claude-haiku-4-5-20251001";
    const defaultFallbacks: string[] = defaults?.model?.fallbacks ?? [];

    const modelIds = new Set<string>([defaultPrimary, ...defaultFallbacks]);
    const agents: AgentModelEntry[] = [];

    for (const agent of agentsConfig.list ?? []) {
      const modelCfg = agent.model;
      let primary: string;
      let fallbacks: string[];

      if (typeof modelCfg === "string") {
        primary = modelCfg;
        fallbacks = defaultFallbacks;
      } else if (modelCfg?.primary) {
        primary = modelCfg.primary;
        fallbacks = modelCfg.fallbacks ?? defaultFallbacks;
      } else {
        primary = defaultPrimary;
        fallbacks = defaultFallbacks;
      }

      modelIds.add(primary);
      fallbacks.forEach((f: string) => modelIds.add(f));

      agents.push({
        id: agent.id,
        name: agent.name ?? agent.id,
        emoji: agent.identity?.emoji ?? "🤖",
        role: agent.identity?.role ?? "",
        primary_model: primary,
        fallback_models: fallbacks,
        source: "openclaw_runtime",
      });
    }

    // Also add known models from providers
    for (const [provider, cfg] of Object.entries<{ models?: { id: string }[] }>(raw?.models?.providers ?? {})) {
      if (cfg?.models) {
        for (const m of cfg.models) {
          modelIds.add(provider === "ollama" ? `ollama/${m.id}` : m.id);
        }
      }
    }

    return {
      source: "openclaw_runtime",
      loaded_from: configPath,
      last_updated: raw?.meta?.lastTouchedAt ?? new Date().toISOString(),
      agents,
      model_pool: buildModelPool(modelIds),
      global_defaults: {
        primary: defaultPrimary,
        fallbacks: defaultFallbacks,
      },
    };
  } catch (e) {
    console.error("[runtime-config] Failed to parse openclaw.json:", e);
    return null;
  }
}

// ── Source B: read from MC data/agent-models.json ────────────────────────────

function loadFromMcConfig(mcConfigPath: string): RuntimeConfigResponse | null {
  try {
    if (!fs.existsSync(mcConfigPath)) return null;
    const raw = JSON.parse(fs.readFileSync(mcConfigPath, "utf-8"));

    const modelIds = new Set<string>();
    const defaults = raw.global_defaults ?? {};
    const defaultPrimary: string = defaults.primary ?? "anthropic/claude-haiku-4-5-20251001";
    const defaultFallbacks: string[] = defaults.fallbacks ?? [];
    modelIds.add(defaultPrimary);
    defaultFallbacks.forEach((f: string) => modelIds.add(f));

    const agents: AgentModelEntry[] = (raw.agents ?? []).map((a: {
      id: string;
      name: string;
      emoji: string;
      role: string;
      model?: { primary?: string; fallbacks?: string[]; notes?: string };
    }) => {
      const primary = a.model?.primary ?? defaultPrimary;
      const fallbacks = a.model?.fallbacks ?? defaultFallbacks;
      modelIds.add(primary);
      fallbacks.forEach((f: string) => modelIds.add(f));
      return {
        id: a.id,
        name: a.name,
        emoji: a.emoji ?? "🤖",
        role: a.role ?? "",
        primary_model: primary,
        fallback_models: fallbacks,
        source: "mc_config" as const,
        notes: a.model?.notes,
      };
    });

    return {
      source: "mc_config",
      loaded_from: mcConfigPath,
      last_updated: raw._meta?.last_updated ?? "unknown",
      agents,
      model_pool: buildModelPool(modelIds),
      global_defaults: {
        primary: defaultPrimary,
        fallbacks: defaultFallbacks,
      },
    };
  } catch (e) {
    console.error("[runtime-config] Failed to parse agent-models.json:", e);
    return null;
  }
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function GET() {
  const isVercel = process.env.VERCEL === "1";

  // Local: try openclaw.json first (live runtime state)
  if (!isVercel) {
    const openclawPath = resolveHome(
      process.env.OPENCLAW_CONFIG_PATH ?? "~/.openclaw/openclaw.json"
    );
    const runtimeData = loadFromOpenclawRuntime(openclawPath);
    if (runtimeData) {
      return NextResponse.json(runtimeData);
    }
    // Fall through to MC config if openclaw.json unreadable
  }

  // Vercel (or local fallback): read from MC data/agent-models.json
  const mcConfigPath = path.join(process.cwd(), "data", "agent-models.json");
  const mcData = loadFromMcConfig(mcConfigPath);
  if (mcData) {
    return NextResponse.json(mcData);
  }

  return NextResponse.json(
    {
      error: "No config source available",
      tried: [
        process.env.OPENCLAW_CONFIG_PATH ?? "~/.openclaw/openclaw.json",
        mcConfigPath,
      ],
    },
    { status: 500 }
  );
}
