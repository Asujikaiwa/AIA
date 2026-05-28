"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  MessageCircle,
  Phone,
  Mail,
  CheckCircle2,
  AlertCircle,
  type LucideIcon
} from "lucide-react";

type FormStatus = "idle" | "sending" | "success" | "error";

const interests = [
  "ประกันสุขภาพเหมาจ่าย",
  "ประกันชีวิตเพื่อครอบครัว",
  "โรคร้ายแรง",
  "ออมทรัพย์และลดหย่อนภาษี",
  "ยังไม่แน่ใจ ขอคำปรึกษา"
];

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      // Replace with your webhook / API route
      const endpoint =
        process.env.NEXT_PUBLIC_LEAD_WEBHOOK ?? "/api/lead";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("ส่งข้อมูลไม่สำเร็จ");

      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "เกิดข้อผิดพลาด กรุณาลองใหม่"
      );
    }
  }

  return (
    <section
      id="contact"
      className="py-20 sm:py-28 bg-gradient-to-b from-white to-aia-redLight/30"
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <span className="section-eyebrow">ติดต่อปรึกษา</span>
          <h2 className="section-title">
            พร้อมรับคำปรึกษาฟรี — ไม่มีค่าใช้จ่าย
          </h2>
          <p className="mt-5 text-lg text-aia-gray">
            กรอกข้อมูลด้านล่าง หรือทักไลน์มาคุยกันได้เลย
            ผมตอบกลับภายใน 1 วันทำการ
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 bg-white rounded-3xl p-7 sm:p-9 shadow-card border border-gray-100"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <Field
                label="ชื่อ - นามสกุล"
                name="name"
                placeholder="ชื่อของคุณ"
                required
              />
              <Field
                label="เบอร์โทรศัพท์"
                name="phone"
                type="tel"
                placeholder="0XX-XXX-XXXX"
                required
              />
            </div>

            <div className="mt-5">
              <Field
                label="อีเมล (ไม่บังคับ)"
                name="email"
                type="email"
                placeholder="you@example.com"
              />
            </div>

            <div className="mt-5">
              <label className="block text-sm font-medium text-aia-slate mb-2">
                สนใจแผนประกัน
              </label>
              <select
                name="interest"
                required
                defaultValue=""
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-aia-slate focus:border-aia-red focus:ring-2 focus:ring-aia-red/20 outline-none transition"
              >
                <option value="" disabled>
                  -- เลือกแผนที่สนใจ --
                </option>
                {interests.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-5">
              <label className="block text-sm font-medium text-aia-slate mb-2">
                ข้อความเพิ่มเติม (ไม่บังคับ)
              </label>
              <textarea
                name="message"
                rows={4}
                placeholder="เล่ารายละเอียดเพื่อให้ผมเตรียมข้อมูลก่อนได้เลย"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-aia-slate focus:border-aia-red focus:ring-2 focus:ring-aia-red/20 outline-none transition resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-primary w-full mt-6 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Send size={18} />
              {status === "sending" ? "กำลังส่ง..." : "ส่งข้อมูลให้ตัวแทนติดต่อกลับ"}
            </button>

            {status === "success" && (
              <p className="mt-4 flex items-center gap-2 text-sm text-green-600 bg-green-50 rounded-lg px-4 py-3">
                <CheckCircle2 size={16} />
                ขอบคุณครับ ผมจะรีบติดต่อกลับโดยเร็วที่สุด
              </p>
            )}
            {status === "error" && (
              <p className="mt-4 flex items-center gap-2 text-sm text-red-600 bg-red-50 rounded-lg px-4 py-3">
                <AlertCircle size={16} />
                {errorMsg || "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง"}
              </p>
            )}

            <p className="mt-4 text-xs text-aia-gray text-center">
              ข้อมูลของคุณจะถูกเก็บเป็นความลับ
              ใช้เฉพาะการติดต่อปรึกษาเท่านั้น
            </p>
          </motion.form>

          {/* Contact channels */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            <div className="bg-aia-red rounded-3xl p-7 text-white">
              <MessageCircle size={32} className="mb-4" />
              <h3 className="text-xl font-bold mb-2">ทักไลน์ </h3>
              <p className="text-sm text-white/90 mb-5">
                สะดวกที่สุด ตอบกลับภายในไม่กี่นาที
                สแกน QR หรือกดปุ่มด้านล่าง
              </p>
              <div className="bg-white rounded-xl p-4 mb-4 flex items-center justify-center">
                {/* Replace src with your real LINE QR */}
                <div className="w-32 h-32 bg-aia-redLight/50 rounded-lg flex items-center justify-center text-aia-red text-xs text-center px-2">
                  วาง LINE QR <br /> ที่นี่
                </div>
              </div>
              <a
                href="https://lin.ee/your-line-oa"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-white text-aia-red font-semibold rounded-full py-3 hover:bg-aia-redLight transition-colors"
              >
                เพิ่มเพื่อนทางไลน์
              </a>
            </div>

            <ContactChannel
              icon={Phone}
              title="โทรหาผมโดยตรง"
              value="096-249-2611"
              href="tel:+66962492611"
            />
            <ContactChannel
              icon={Mail}
              title="อีเมล"
              value="phaiboonaia@gmail.com"
              href="mailto:phaiboonaia@gmail.com"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-aia-slate mb-2"
      >
        {label} {required && <span className="text-aia-red">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-aia-slate focus:border-aia-red focus:ring-2 focus:ring-aia-red/20 outline-none transition"
      />
    </div>
  );
}

function ContactChannel({
  icon: Icon,
  title,
  value,
  href
}: {
  icon: LucideIcon;
  title: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="flex items-center gap-4 bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-card hover:border-aia-red/30 transition-all"
    >
      <div className="w-12 h-12 rounded-xl bg-aia-redLight text-aia-red flex items-center justify-center flex-shrink-0">
        <Icon size={22} />
      </div>
      <div>
        <p className="text-xs text-aia-gray">{title}</p>
        <p className="font-semibold text-aia-slate">{value}</p>
      </div>
    </a>
  );
}
