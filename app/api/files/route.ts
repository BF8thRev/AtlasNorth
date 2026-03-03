import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { appendAudit } from "@/lib/auditLog";

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
    appendAudit({ event: "read", file: filePath, method: "local", success: true, timestamp: "" });
    return NextResponse.json({ content });
  } catch (e) {
    appendAudit({ event: "error", file: filePath, method: "local", success: false, note: String(e), timestamp: "" });
    return NextResponse.json({ error: "Read failed" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const { path: filePath, content } = await req.json();
  if (!filePath) return NextResponse.json({ error: "No path" }, { status: 400 });

  const isVercel = process.env.VERCEL === "1";

  if (isVercel) {
    // Write via GitHub API
    const token = process.env.GITHUB_TOKEN;
    const repo = process.env.GITHUB_REPO; // e.g. "BF8thRev/AtlasNorth"
    const branch = process.env.GITHUB_BRANCH || "main";

    if (!token || !repo) {
      return NextResponse.json({ error: "GitHub credentials not configured" }, { status: 500 });
    }

    // The file lives in data/vault/ in the repo
    const repoFilePath = `data/vault/${filePath}`;

    // Get current SHA (required for update)
    const getRes = await fetch(
      `https://api.github.com/repos/${repo}/contents/${repoFilePath}?ref=${branch}`,
      { headers: { Authorization: `token ${token}`, Accept: "application/vnd.github.v3+json" } }
    );

    let sha: string | undefined;
    if (getRes.ok) {
      const existing = await getRes.json();
      sha = existing.sha;
    }

    // Commit the file
    const body: Record<string, string> = {
      message: `vault: update ${filePath}`,
      content: Buffer.from(content, "utf-8").toString("base64"),
      branch,
    };
    if (sha) body.sha = sha;

    const putRes = await fetch(
      `https://api.github.com/repos/${repo}/contents/${repoFilePath}`,
      {
        method: "PUT",
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!putRes.ok) {
      const err = await putRes.json();
      appendAudit({ event: "error", file: filePath, method: "github", success: false, note: "GitHub write failed", timestamp: "" });
      return NextResponse.json({ error: "GitHub write failed", detail: err }, { status: 500 });
    }

    appendAudit({ event: "write", file: filePath, method: "github", success: true, size_bytes: content.length, timestamp: "" });
    return NextResponse.json({ ok: true, method: "github" });

  } else {
    // Local: write to workspace directly
    const abs = safePath(filePath);
    if (!abs) return NextResponse.json({ error: "Invalid path" }, { status: 403 });
    try {
      fs.mkdirSync(path.dirname(abs), { recursive: true });
      fs.writeFileSync(abs, content, "utf-8");
      appendAudit({ event: "write", file: filePath, method: "local", success: true, size_bytes: content.length, timestamp: "" });
      return NextResponse.json({ ok: true, method: "local" });
    } catch (e) {
      appendAudit({ event: "error", file: filePath, method: "local", success: false, note: String(e), timestamp: "" });
      return NextResponse.json({ error: "Write failed" }, { status: 500 });
    }
  }
}
