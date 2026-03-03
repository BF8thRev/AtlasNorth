import fs from "fs";
import path from "path";

const WORKSPACE = process.env.WORKSPACE_PATH || path.join(process.cwd(), "data/vault");
const AUDIT_LOG = path.join(WORKSPACE, "FILE_AUDIT_LOG.jsonl");

export type AuditEvent = "read" | "write" | "edit" | "delete_attempt" | "error";

export interface AuditEntry {
  event: AuditEvent;
  timestamp: string;
  file: string;
  method: "local" | "github" | "unknown";
  actor?: string; // "atlas" | "bob" | "user" | etc
  size_bytes?: number;
  success: boolean;
  note?: string;
}

export function appendAudit(entry: AuditEntry): void {
  try {
    const line = JSON.stringify({ ...entry, timestamp: new Date().toISOString() }) + "\n";
    fs.appendFileSync(AUDIT_LOG, line, "utf-8");
  } catch {
    // Audit log failure must never crash the app — silent fail only
  }
}
