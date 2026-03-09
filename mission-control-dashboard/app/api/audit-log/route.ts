import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const WORKSPACE = process.env.WORKSPACE_PATH || path.join(process.cwd(), "data/vault");
const AUDIT_LOG = path.join(WORKSPACE, "FILE_AUDIT_LOG.jsonl");

export async function GET(req: NextRequest) {
  const limit = parseInt(req.nextUrl.searchParams.get("limit") || "50");
  try {
    if (!fs.existsSync(AUDIT_LOG)) return NextResponse.json({ entries: [] });
    const lines = fs.readFileSync(AUDIT_LOG, "utf-8")
      .split("\n")
      .filter(Boolean)
      .slice(-limit)
      .map(line => { try { return JSON.parse(line); } catch { return null; } })
      .filter(Boolean);
    return NextResponse.json({ entries: lines, total: lines.length });
  } catch {
    return NextResponse.json({ error: "Read failed" }, { status: 500 });
  }
}
