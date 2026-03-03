import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Local dev: reads from workspace. Vercel: reads from data/vault/ in repo.
const WORKSPACE = process.env.WORKSPACE_PATH || path.join(process.cwd(), "data/vault");

function safePath(filePath: string): string | null {
  const resolved = path.resolve(WORKSPACE, filePath);
  if (!resolved.startsWith(path.resolve(WORKSPACE))) return null;
  return resolved;
}

export async function GET(req: NextRequest) {
  const filePath = req.nextUrl.searchParams.get("path");
  if (!filePath) return NextResponse.json({ error: "No path" }, { status: 400 });
  const abs = safePath(filePath);
  if (!abs) return NextResponse.json({ error: "Invalid path" }, { status: 403 });
  try {
    const content = fs.existsSync(abs) ? fs.readFileSync(abs, "utf-8") : "";
    return NextResponse.json({ content });
  } catch {
    return NextResponse.json({ error: "Read failed" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const { path: filePath, content } = await req.json();
  if (!filePath) return NextResponse.json({ error: "No path" }, { status: 400 });
  const abs = safePath(filePath);
  if (!abs) return NextResponse.json({ error: "Invalid path" }, { status: 403 });
  try {
    fs.mkdirSync(path.dirname(abs), { recursive: true });
    fs.writeFileSync(abs, content, "utf-8");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Write failed" }, { status: 500 });
  }
}
