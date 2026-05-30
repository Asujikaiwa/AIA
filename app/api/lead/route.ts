import { NextResponse } from "next/server";

type LeadPayload = {
  name?: string;
  phone?: string;
  email?: string;
  interest?: string;
  message?: string;
};

async function forwardLead(payload: LeadPayload) {
  // นำรหัสของคุณมาใส่ในเครื่องหมายคำพูดด้านล่างนี้
  // (สำหรับการใช้งานจริงบน Production แนะนำให้ย้าย 2 ตัวแปรนี้ไปเก็บไว้ในไฟล์ .env.local นะครับ)
  const LINE_ACCESS_TOKEN = "6ad+hE+rLr4M87MdXG/GYhPYW8J5YcADcnfQJ+E8ch5WqnpORtczVpxhyhmzdxwhur5B74JK3vSGFEVg+VVN8nse/ZWqKLnLpaDqzKxpnjFFQYMSEUrTcYNhOd7N73aFQq3+om+oLLSQ00PHwXaaOAdB04t89/1O/w1cDnyilFU=";
  const YOUR_USER_ID = "U2f698231a14d6ebf30ad38d847233d05"; // ใส่ User ID ที่ต้องการให้ส่งข้อความเข้าไป

  // จัดรูปแบบข้อความที่จะส่งเข้า LINE
  const textMessage = `🚨 มีลูกค้าสนใจประกันติดต่อมาใหม่!\n\nชื่อ: ${payload.name}\nเบอร์โทร: ${payload.phone}\nอีเมล: ${payload.email || "-"}\nสนใจ: ${payload.interest || "-"}\nข้อความ: ${payload.message || "-"}`;

  // ยิง API ไปที่ LINE Messaging API
  const response = await fetch("https://api.line.me/v2/bot/message/push", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${LINE_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      to: YOUR_USER_ID,
      messages: [{ type: "text", text: textMessage }],
    }),
  });

  // เช็คว่าส่งสำเร็จหรือไม่ ถ้าไม่สำเร็จให้ log error ออกมา
  if (!response.ok) {
    const errorDetail = await response.text();
    console.error("[LINE API Error]:", errorDetail);
    throw new Error("Failed to send LINE message");
  }
  
  console.log("[lead] ส่งแจ้งเตือนเข้า LINE สำเร็จ");
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

    // เรียกใช้ฟังก์ชันส่ง LINE
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