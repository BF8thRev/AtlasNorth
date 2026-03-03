import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const WORKSPACE = process.env.WORKSPACE_PATH || path.join(process.cwd(), "data/vault");
const TOKEN_FILE = path.join(WORKSPACE, "TOKEN_USAGE.jsonl");

type TokenEntry = {
  timestamp: string;
  model: string;
  agent: string;
  task_ref: string;
  input_tokens: number;
  output_tokens: number;
  total_tokens: number;
  category: string;
};

export async function GET() {
  try {
    if (!fs.existsSync(TOKEN_FILE)) {
      return NextResponse.json({ entries: [], totals: {}, grand: { input: 0, output: 0, total: 0, calls: 0 } });
    }

    const lines = fs.readFileSync(TOKEN_FILE, "utf-8").split("\n");
    const entries: TokenEntry[] = [];

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      try {
        entries.push(JSON.parse(trimmed));
      } catch { /* skip malformed */ }
    }

    // Per-model totals
    const totals: Record<string, { input: number; output: number; total: number; calls: number }> = {};
    const grand = { input: 0, output: 0, total: 0, calls: 0 };

    for (const e of entries) {
      const m = e.model || "unknown";
      if (!totals[m]) totals[m] = { input: 0, output: 0, total: 0, calls: 0 };
      totals[m].input  += e.input_tokens  || 0;
      totals[m].output += e.output_tokens || 0;
      totals[m].total  += e.total_tokens  || 0;
      totals[m].calls  += 1;
      grand.input  += e.input_tokens  || 0;
      grand.output += e.output_tokens || 0;
      grand.total  += e.total_tokens  || 0;
      grand.calls  += 1;
    }

    // Add percentage share to each model
    const totalsWithPct = Object.fromEntries(
      Object.entries(totals).map(([model, s]) => [
        model,
        { ...s, pct: grand.total > 0 ? Math.round((s.total / grand.total) * 100) : 0 },
      ])
    );

    return NextResponse.json({
      entries: entries.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()),
      totals: totalsWithPct,
      grand,
    });
  } catch (e) {
    return NextResponse.json({ error: "Read failed", detail: String(e) }, { status: 500 });
  }
}
