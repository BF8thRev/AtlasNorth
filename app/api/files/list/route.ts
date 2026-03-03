import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const WORKSPACE = process.env.WORKSPACE_PATH || "/Users/atlasnorth/.openclaw/workspace";

function safePath(dirPath: string): string | null {
  const resolved = path.resolve(WORKSPACE, dirPath);
  if (!resolved.startsWith(WORKSPACE)) return null;
  return resolved;
}

export async function GET(req: NextRequest) {
  const dir = req.nextUrl.searchParams.get("dir") || "";

  const abs = safePath(dir);
  if (!abs) return NextResponse.json({ error: "Invalid path" }, { status: 403 });

  try {
    if (!fs.existsSync(abs)) return NextResponse.json({ files: [] });
    const entries = fs.readdirSync(abs);
    const files = entries.filter((f) => {
      try {
        return fs.statSync(path.join(abs, f)).isFile();
      } catch {
        return false;
      }
    });
    return NextResponse.json({ files });
  } catch {
    return NextResponse.json({ error: "List failed" }, { status: 500 });
  }
}
