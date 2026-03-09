import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { appendAudit } from "@/lib/auditLog";

const WORKSPACE = process.env.WORKSPACE_PATH || path.join(process.cwd(), "data/vault");
const BLOCKERS_PATH = path.join(WORKSPACE, "BLOCKERS.json");

export async function GET() {
  try {
    if (!fs.existsSync(BLOCKERS_PATH)) {
      return NextResponse.json({ blockers: [], last_updated: null });
    }
    const data = JSON.parse(fs.readFileSync(BLOCKERS_PATH, "utf-8"));
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: "Read failed", detail: String(e) }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    body.last_updated = new Date().toISOString().split("T")[0];
    fs.writeFileSync(BLOCKERS_PATH, JSON.stringify(body, null, 2), "utf-8");
    appendAudit({ event: "write", file: "BLOCKERS.json", method: "local", success: true, timestamp: "" });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "Write failed", detail: String(e) }, { status: 500 });
  }
}
