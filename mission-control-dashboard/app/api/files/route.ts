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

  // ── DEBUG: log every env var relevant to this route ──────────────────────
  const debugEnv = {
    VERCEL:          process.env.VERCEL          ?? "⚠️ NOT SET",
    VERCEL_ENV:      process.env.VERCEL_ENV      ?? "⚠️ NOT SET",
    GITHUB_TOKEN:    process.env.GITHUB_TOKEN    ? `✅ set (${process.env.GITHUB_TOKEN.slice(0, 8)}...)` : "❌ MISSING",
    GITHUB_REPO:     process.env.GITHUB_REPO     ?? "❌ MISSING",
    GITHUB_BRANCH:   process.env.GITHUB_BRANCH   ?? "❌ MISSING (will default to main)",
    WORKSPACE_PATH:  process.env.WORKSPACE_PATH  ?? "❌ NOT SET (using cwd/data/vault)",
    NODE_ENV:        process.env.NODE_ENV        ?? "unknown",
  };
  console.log("[files/PUT] env snapshot:", JSON.stringify(debugEnv, null, 2));
  console.log("[files/PUT] filePath:", filePath, "| contentLength:", content?.length ?? 0);

  const isVercel = process.env.VERCEL === "1";
  console.log("[files/PUT] isVercel:", isVercel);

  if (isVercel) {
    const token  = process.env.GITHUB_TOKEN;
    const repo   = process.env.GITHUB_REPO;
    const branch = process.env.GITHUB_BRANCH || "main";

    if (!token || !repo) {
      const missing = [!token && "GITHUB_TOKEN", !repo && "GITHUB_REPO"].filter(Boolean).join(", ");
      console.error("[files/PUT] ❌ GitHub credentials missing:", missing);
      appendAudit({ event: "error", file: filePath, method: "github", success: false, note: `Missing env vars: ${missing}`, timestamp: "" });
      return NextResponse.json({
        error: "GitHub credentials not configured",
        missing,
        debug: debugEnv,
      }, { status: 500 });
    }

    const repoFilePath = `data/vault/${filePath}`;
    console.log("[files/PUT] GitHub target:", `${repo}/${repoFilePath}@${branch}`);

    // Get current SHA (required for updates)
    const getUrl = `https://api.github.com/repos/${repo}/contents/${repoFilePath}?ref=${branch}`;
    console.log("[files/PUT] Fetching SHA from:", getUrl);
    const getRes = await fetch(getUrl, {
      headers: { Authorization: `token ${token}`, Accept: "application/vnd.github.v3+json" },
    });
    console.log("[files/PUT] SHA fetch status:", getRes.status);

    let sha: string | undefined;
    if (getRes.ok) {
      const existing = await getRes.json();
      sha = existing.sha;
      console.log("[files/PUT] Existing SHA:", sha);
    } else {
      const shaErr = await getRes.json().catch(() => ({}));
      console.warn("[files/PUT] SHA fetch failed (file may be new):", getRes.status, JSON.stringify(shaErr));
    }

    // Commit the file
    const body: Record<string, string> = {
      message: `vault: update ${filePath}`,
      content: Buffer.from(content, "utf-8").toString("base64"),
      branch,
    };
    if (sha) body.sha = sha;

    const putUrl = `https://api.github.com/repos/${repo}/contents/${repoFilePath}`;
    console.log("[files/PUT] Committing to:", putUrl, "| sha included:", !!sha);
    const putRes = await fetch(putUrl, {
      method: "PUT",
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    console.log("[files/PUT] GitHub commit status:", putRes.status);

    if (!putRes.ok) {
      const err = await putRes.json().catch(() => ({ raw: "unparseable" }));
      console.error("[files/PUT] ❌ GitHub commit failed:", putRes.status, JSON.stringify(err));
      appendAudit({ event: "error", file: filePath, method: "github", success: false, note: `GitHub write failed: ${putRes.status}`, timestamp: "" });
      return NextResponse.json({
        error: "GitHub write failed",
        status: putRes.status,
        detail: err,
        debug: debugEnv,
      }, { status: 500 });
    }

    const putData = await putRes.json();
    const commitSha = putData?.commit?.sha?.slice(0, 12) ?? "unknown";
    console.log("[files/PUT] ✅ Committed successfully. Commit SHA:", commitSha);
    appendAudit({ event: "write", file: filePath, method: "github", success: true, size_bytes: content.length, timestamp: "" });
    return NextResponse.json({ ok: true, method: "github", commit: commitSha, debug: debugEnv });

  } else {
    // Local: write to workspace directly
    console.log("[files/PUT] Running LOCAL (not Vercel). Writing to:", WORKSPACE);
    const abs = safePath(filePath);
    if (!abs) return NextResponse.json({ error: "Invalid path" }, { status: 403 });
    try {
      fs.mkdirSync(path.dirname(abs), { recursive: true });
      fs.writeFileSync(abs, content, "utf-8");
      console.log("[files/PUT] ✅ Local write success:", abs);
      appendAudit({ event: "write", file: filePath, method: "local", success: true, size_bytes: content.length, timestamp: "" });
      return NextResponse.json({ ok: true, method: "local", debug: debugEnv });
    } catch (e) {
      console.error("[files/PUT] ❌ Local write failed:", e);
      appendAudit({ event: "error", file: filePath, method: "local", success: false, note: String(e), timestamp: "" });
      return NextResponse.json({ error: "Write failed", detail: String(e), debug: debugEnv }, { status: 500 });
    }
  }
}
