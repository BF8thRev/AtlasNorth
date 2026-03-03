import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const WORKSPACE = process.env.WORKSPACE_PATH || path.join(process.cwd(), "data/vault");
const BLOCKERS_PATH  = path.join(WORKSPACE, "BLOCKERS.json");
const WORKFLOW_PATH  = path.join(WORKSPACE, "WORKFLOW_STATE.json");

export async function GET() {
  try {
    // Load blockers
    let blockersForYou: object[] = [];
    if (fs.existsSync(BLOCKERS_PATH)) {
      const raw = JSON.parse(fs.readFileSync(BLOCKERS_PATH, "utf-8"));
      blockersForYou = (raw.blockers || []).map((b: {
        id: string;
        description: string;
        priority: string;
        owner: string;
        status: string;
        action: string;
      }) => ({
        id: b.id,
        title: b.description,
        impact: b.priority === "🔴" ? 90 : b.priority === "🟠" ? 70 : 50,
        difficulty: 20,
        notes: b.action,
        status: b.status,
        owner: b.owner,
        priority: b.priority,
      }));
    }

    // Load open loops from WORKFLOW_STATE
    let openLoops: object[] = [];
    if (fs.existsSync(WORKFLOW_PATH)) {
      const raw = JSON.parse(fs.readFileSync(WORKFLOW_PATH, "utf-8"));
      openLoops = (raw.open_loops || []).map((loop: { id?: string; description?: string; status?: string }) => ({
        id: loop.id || "loop",
        title: loop.description || String(loop),
        status: loop.status || "open",
      }));
    }

    return NextResponse.json({ blockersForYou, openLoops });
  } catch (e) {
    return NextResponse.json(
      { blockersForYou: [], openLoops: [], error: String(e) },
      { status: 500 }
    );
  }
}
