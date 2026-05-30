import { NextResponse } from "next/server";

// ============================================================================
// Lead Form API — security-hardened
// ============================================================================

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 4 * 1024;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const rateMap = new Map<string, number[]>();

function rateLimitOk(ip: string): boolean {
  const now = Date.now();
  const hits = (rateMap.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  hits.push(now);
  rateMap.set(ip, hits);
  if (rateMap.size > 5000) {
    for (const [k, v] of rateMap) {
      if (v.every((t) => now - t > RATE_WINDOW_MS)) rateMap.delete(k);
    }
  }
  return hits.length <= RATE_MAX;
}

function getIP(req: Request): string {
  const h = req.headers;
  return (
    h.get("cf-connecting-ip") ||
    h.get("x-real-ip") ||
    (h.get("x-forwarded-for") || "").split(",")[0].trim() ||
    "unknown"
  );
}

function clean(s: unknown, maxLen: number): string {
  if (typeof s !== "string") return "";
  return s.replace(/[\x00-\x1f\x7f]/g, " ").trim().slice(0, maxLen);
}

const PHONE_RE = /^[0-9+()\-\s]{8,20}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type LeadPayload = {
  name?: string;
  phone?: string;
  email?: string;
  interest?: string;
  message?: string;
  website?: string;
  form_started_at?: number;
};

const MIN_FORM_FILL_MS = 3000;

async function forwardLead(
  payload: Required<Pick<LeadPayload, "name" | "phone">> & LeadPayload
) {
  const token = process.env.LINE_ACCESS_TOKEN;
  const userId = process.env.LINE_USER_ID;
  if (!token || !userId) {
    console.warn("[lead] LINE_ACCESS_TOKEN/LINE_USER_ID not set");
    return;
  }

  const text = [
    "🚨 มีลูกค้าสนใจประกันติดต่อมาใหม่",
    "",
    `ชื่อ: ${payload.name}`,
    `เบอร์โทร: ${payload.phone}`,
    `อีเมล: ${payload.email || "-"}`,
    `สนใจ: ${payload.interest || "-"}`,
    "",
    "ข้อความ:",
    payload.message || "(ไม่มีข้อความเพิ่มเติม)"
  ].join("\n");

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);
  try {
    const res = await fetch("https://api.line.me/v2/bot/message/push", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        to: userId,
        messages: [{ type: "text", text }]
      }),
      signal: controller.signal
    });
    if (!res.ok) {
      console.error(`[lead] LINE API ${res.status}`);
    }
  } catch (e) {
    console.error("[lead] LINE fetch failed:", e instanceof Error ? e.message : e);
  } finally {
    clearTimeout(timeoutId);
  }
}

const methodNotAllowed = () =>
  NextResponse.json({ ok: false }, { status: 405, headers: { Allow: "POST" } });

export const GET = methodNotAllowed;
export const PUT = methodNotAllowed;
export const DELETE = methodNotAllowed;
export const PATCH = methodNotAllowed;

export async function POST(req: Request) {
  const ct = req.headers.get("content-type") || "";
  if (!ct.includes("application/json")) {
    return NextResponse.json({ ok: false }, { status: 415 });
  }

  const len = Number(req.headers.get("content-length") || "0");
  if (len > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false }, { status: 413 });
  }

  const ip = getIP(req);
  if (!rateLimitOk(ip)) {
    return NextResponse.json(
      { ok: false, error: "ส่งคำขอบ่อยเกินไป ลองใหม่อีกครั้งภายหลัง" },
      { status: 429, headers: { "Retry-After": "600" } }
    );
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (!raw || typeof raw !== "object") {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const data = raw as LeadPayload;

  if (typeof data.website === "string" && data.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  if (typeof data.form_started_at === "number") {
    const elapsed = Date.now() - data.form_started_at;
    if (elapsed >= 0 && elapsed < MIN_FORM_FILL_MS) {
      return NextResponse.json({ ok: true });
    }
  }

  const name = clean(data.name, 100);
  const phone = clean(data.phone, 25);
  const email = clean(data.email, 120);
  const interest = clean(data.interest, 60);
  const message = clean(data.message, 1000);

  if (!name || !phone) {
    return NextResponse.json(
      { ok: false, error: "กรุณากรอกชื่อและเบอร์โทรศัพท์" },
      { status: 400 }
    );
  }

  if (!PHONE_RE.test(phone)) {
    return NextResponse.json(
      { ok: false, error: "รูปแบบเบอร์โทรไม่ถูกต้อง" },
      { status: 400 }
    );
  }
  if (email && !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "รูปแบบอีเมลไม่ถูกต้อง" },
      { status: 400 }
    );
  }

  try {
    await forwardLead({ name, phone, email, interest, message });
  } catch (e) {
    console.error("[lead] forward error:", e instanceof Error ? e.message : e);
  }

  return NextResponse.json({ ok: true });
}
