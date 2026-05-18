import { NextResponse } from "next/server";

/**
 * Lead submission endpoint.
 *
 * By default this just validates and logs the payload — replace the
 * `forwardLead` body with your preferred destination:
 *   - Webhook (Zapier, Make, n8n, Discord, Slack)
 *   - Email API (Resend, SendGrid, Mailgun)
 *   - Database (Supabase, Firestore, Notion)
 *
 * Set LEAD_WEBHOOK_URL in your .env.local to enable webhook forwarding.
 */

type LeadPayload = {
  name?: string;
  phone?: string;
  email?: string;
  interest?: string;
  message?: string;
};

async function forwardLead(payload: LeadPayload) {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) {
    // Local/dev: just log so you can verify wiring.
    console.log("[lead] (no webhook configured) ", payload);
    return;
  }

  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      submittedAt: new Date().toISOString(),
      source: "phaiboon-aia-landing"
    })
  });
}

export async function POST(req: Request) {
  try {
    const data = (await req.json()) as LeadPayload;

    if (!data.name || !data.phone) {
      return NextResponse.json(
        { ok: false, error: "ชื่อและเบอร์โทรเป็นข้อมูลที่จำเป็น" },
        { status: 400 }
      );
    }

    // Light validation: phone must contain digits
    if (!/\d/.test(data.phone)) {
      return NextResponse.json(
        { ok: false, error: "รูปแบบเบอร์โทรไม่ถูกต้อง" },
        { status: 400 }
      );
    }

    await forwardLead(data);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[lead] error:", err);
    return NextResponse.json(
      { ok: false, error: "เกิดข้อผิดพลาดภายในระบบ" },
      { status: 500 }
    );
  }
}
