import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { appendAudit } from "@/lib/auditLog";

const WORKSPACE = process.env.WORKSPACE_PATH || "/Users/atlasnorth/.openclaw/workspace";
const TOKEN_LOG_PATH = path.join(WORKSPACE, "token-log.json");

type TokenEntry = {
  id: string;
  timestamp: string;
  agent: string;
  task: string;
  category: string;
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  notes?: string;
};

export async function POST(req: NextRequest) {
  try {
    const entry: TokenEntry = await req.json();

    let data: { last_updated: string; log: TokenEntry[] } = { last_updated: "", log: [] };

    if (fs.existsSync(TOKEN_LOG_PATH)) {
      try {
        data = JSON.parse(fs.readFileSync(TOKEN_LOG_PATH, "utf-8"));
      } catch {
        // corrupt file — reset
      }
    }

    data.log.push(entry);
    data.last_updated = new Date().toISOString().split("T")[0];

    fs.mkdirSync(path.dirname(TOKEN_LOG_PATH), { recursive: true });
    fs.writeFileSync(TOKEN_LOG_PATH, JSON.stringify(data, null, 2), "utf-8");

    appendAudit({ event: "write", file: "token-log.json", method: "local", success: true, actor: entry.agent, timestamp: "" });
    return NextResponse.json({ ok: true, total: data.log.length });
  } catch (e) {
    appendAudit({ event: "error", file: "token-log.json", method: "local", success: false, note: String(e), timestamp: "" });
    return NextResponse.json({ error: "Failed to append entry" }, { status: 500 });
  }
}

export async function GET() {
  try {
    if (!fs.existsSync(TOKEN_LOG_PATH)) {
      return NextResponse.json({ last_updated: null, log: [] });
    }
    const data = JSON.parse(fs.readFileSync(TOKEN_LOG_PATH, "utf-8"));
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Read failed" }, { status: 500 });
  }
}
