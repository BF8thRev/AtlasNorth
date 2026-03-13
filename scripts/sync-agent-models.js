#!/usr/bin/env node
/**
 * sync-agent-models.js
 *
 * Syncs agent→model mappings from Mission Control config into openclaw.json.
 * Run this after editing mission-control-dashboard/data/agent-models.json,
 * then do `openclaw reload` to apply the changes.
 *
 * Usage:
 *   node scripts/sync-agent-models.js [--dry-run] [--verbose]
 *
 * Config flow:
 *   1. Edit: mission-control-dashboard/data/agent-models.json
 *   2. Run: node scripts/sync-agent-models.js
 *   3. Reload: openclaw reload
 *   4. Model Status page reflects new state immediately
 *
 * MODEL_ROUTER.json is NOT touched by this script — it's deprecated.
 * See MODEL_ROUTER.json._DEPRECATED for migration notes.
 */

const fs = require("fs");
const path = require("path");
const os = require("os");

// ── Paths ─────────────────────────────────────────────────────────────────────

const WORKSPACE = path.resolve(__dirname, "..");
const MC_AGENT_MODELS = path.join(WORKSPACE, "mission-control-dashboard", "data", "agent-models.json");
const OPENCLAW_CONFIG = process.env.OPENCLAW_CONFIG_PATH
  ? process.env.OPENCLAW_CONFIG_PATH.replace(/^~/, os.homedir())
  : path.join(os.homedir(), ".openclaw", "openclaw.json");

const isDryRun = process.argv.includes("--dry-run");
const isVerbose = process.argv.includes("--verbose");

function log(...args) { console.log("[sync-agent-models]", ...args); }
function verbose(...args) { if (isVerbose) log(...args); }

// ── Load ──────────────────────────────────────────────────────────────────────

log(`MC config:      ${MC_AGENT_MODELS}`);
log(`openclaw.json:  ${OPENCLAW_CONFIG}`);
if (isDryRun) log("DRY RUN — no files will be written");

if (!fs.existsSync(MC_AGENT_MODELS)) {
  console.error(`ERROR: MC config not found: ${MC_AGENT_MODELS}`);
  process.exit(1);
}

if (!fs.existsSync(OPENCLAW_CONFIG)) {
  console.error(`ERROR: openclaw.json not found: ${OPENCLAW_CONFIG}`);
  process.exit(1);
}

const mcConfig = JSON.parse(fs.readFileSync(MC_AGENT_MODELS, "utf-8"));
const openclawConfig = JSON.parse(fs.readFileSync(OPENCLAW_CONFIG, "utf-8"));

// Build lookup: agent ID → model config from MC
const mcAgentMap = {};
for (const agent of (mcConfig.agents ?? [])) {
  mcAgentMap[agent.id] = agent;
}

// ── Apply ─────────────────────────────────────────────────────────────────────

let changed = 0;
let skipped = 0;

const agentList = openclawConfig?.agents?.list ?? [];

for (const agent of agentList) {
  const mcAgent = mcAgentMap[agent.id];
  if (!mcAgent || !mcAgent.model) {
    verbose(`  SKIP ${agent.id} — not in MC config`);
    skipped++;
    continue;
  }

  const newModel = {
    primary: mcAgent.model.primary,
    fallbacks: mcAgent.model.fallbacks ?? [],
  };

  const current = agent.model;
  const currentPrimary = typeof current === "string" ? current : current?.primary;
  const currentFallbacks = typeof current === "string" ? [] : (current?.fallbacks ?? []);

  const sameModel =
    currentPrimary === newModel.primary &&
    JSON.stringify(currentFallbacks) === JSON.stringify(newModel.fallbacks);

  if (sameModel) {
    verbose(`  SAME  ${agent.id} — ${newModel.primary}`);
    skipped++;
    continue;
  }

  log(`  UPDATE ${agent.id}: ${currentPrimary} → ${newModel.primary}`);
  if (newModel.fallbacks.length) {
    log(`    fallbacks: [${newModel.fallbacks.join(", ")}]`);
  }

  // Apply the change
  if (typeof agent.model === "string") {
    // Was a simple string model reference — upgrade to object form
    agent.model = newModel;
  } else {
    agent.model = { ...agent.model, ...newModel };
  }

  changed++;
}

// Report on MC agents that aren't in openclaw.json (informational only)
const openclawIds = new Set(agentList.map(a => a.id));
for (const mcAgent of (mcConfig.agents ?? [])) {
  if (!openclawIds.has(mcAgent.id)) {
    log(`  INFO  ${mcAgent.id} — defined in MC but not in openclaw.json agents.list (manual add required)`);
  }
}

// ── Update global defaults ────────────────────────────────────────────────────

if (mcConfig.global_defaults && openclawConfig?.agents?.defaults?.model) {
  const mcDefaults = mcConfig.global_defaults;
  const ocDefaults = openclawConfig.agents.defaults.model;

  if (ocDefaults.primary !== mcDefaults.primary || 
      JSON.stringify(ocDefaults.fallbacks) !== JSON.stringify(mcDefaults.fallbacks)) {
    log(`  UPDATE defaults: ${ocDefaults.primary} → ${mcDefaults.primary}`);
    openclawConfig.agents.defaults.model = {
      primary: mcDefaults.primary,
      fallbacks: mcDefaults.fallbacks,
    };
    changed++;
  }
}

// ── Write ─────────────────────────────────────────────────────────────────────

if (changed === 0) {
  log(`✅ Already in sync — ${skipped} agents checked, no changes needed`);
  process.exit(0);
}

if (isDryRun) {
  log(`DRY RUN complete — would apply ${changed} change(s)`);
  process.exit(0);
}

// Backup first
const backupPath = OPENCLAW_CONFIG + `.bak.${Date.now()}`;
fs.copyFileSync(OPENCLAW_CONFIG, backupPath);
verbose(`  Backup: ${backupPath}`);

// Update meta
if (!openclawConfig.meta) openclawConfig.meta = {};
openclawConfig.meta.lastTouchedAt = new Date().toISOString();
openclawConfig.meta.lastSyncedFromMC = new Date().toISOString();

fs.writeFileSync(OPENCLAW_CONFIG, JSON.stringify(openclawConfig, null, 2), "utf-8");

log(`✅ Applied ${changed} change(s). Run: openclaw reload`);
log(`   Backup saved: ${backupPath}`);
