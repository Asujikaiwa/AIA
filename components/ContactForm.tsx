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
import { useT } from "./I18nProvider";
import { useI18n } from "./I18nProvider";

type FormStatus = "idle" | "sending" | "success" | "error";

const interestsByLocale = {
  th: [
    "ประกันสุขภาพเหมาจ่าย",
    "ประกันชีวิตเพื่อครอบครัว",
    "โรคร้ายแรง",
    "ออมทรัพย์และลดหย่อนภาษี",
    "ยังไม่แน่ใจ ขอคำปรึกษา"
  ],
  en: [
    "Comprehensive Health Coverage",
    "Life Insurance for Family",
    "Critical Illness",
    "Savings & Tax Planning",
    "Not sure yet, need advice"
  ],
  zh: [
    "综合医疗保障",
    "守护家庭的人寿保险",
    "重大疾病",
    "储蓄与税务规划",
    "尚未决定,需要咨询"
  ]
} as const;

export default function ContactForm() {
  const t = useT();
  const { locale } = useI18n();
  const interests = interestsByLocale[locale];
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
          <span className="section-eyebrow">{t("contact.eyebrow")}</span>
          <h2 className="section-title">{t("contact.title")}</h2>
          <p className="mt-5 text-lg text-aia-gray">{t("contact.subtitle")}</p>
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
                label={t("contact.name")}
                name="name"
                placeholder={t("contact.namePh")}
                required
              />
              <Field
                label={t("contact.phone")}
                name="phone"
                type="tel"
                placeholder={t("contact.phonePh")}
                required
              />
            </div>

            <div className="mt-5">
              <Field
                label={t("contact.email")}
                name="email"
                type="email"
                placeholder={t("contact.emailPh")}
              />
            </div>

            <div className="mt-5">
              <label className="block text-sm font-medium text-aia-slate mb-2">
                {t("products.eyebrow")}
              </label>
              <select
                name="interest"
                required
                defaultValue=""
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-aia-slate focus:border-aia-red focus:ring-2 focus:ring-aia-red/20 outline-none transition"
              >
                <option value="" disabled>
                  --
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
                {t("contact.message")}
              </label>
              <textarea
                name="message"
                rows={4}
                placeholder={t("contact.messagePh")}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-aia-slate focus:border-aia-red focus:ring-2 focus:ring-aia-red/20 outline-none transition resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-primary w-full mt-6 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Send size={18} />
              {status === "sending" ? t("contact.sending") : t("contact.send")}
            </button>

            {status === "success" && (
              <p className="mt-4 flex items-center gap-2 text-sm text-green-600 bg-green-50 rounded-lg px-4 py-3">
                <CheckCircle2 size={16} />
                {t("contact.success")}
              </p>
            )}
            {status === "error" && (
              <p className="mt-4 flex items-center gap-2 text-sm text-red-600 bg-red-50 rounded-lg px-4 py-3">
                <AlertCircle size={16} />
                {errorMsg || t("contact.error")}
              </p>
            )}

            <p className="mt-4 text-xs text-aia-gray text-center">
              {t("contact.consent")}
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
              <h3 className="text-xl font-bold mb-2">{t("contact.lineTitle")}</h3>
              <p className="text-sm text-white/90 mb-5">
                {t("contact.altTitle")}
              </p>
              <div className="bg-white rounded-xl p-4 mb-4 flex items-center justify-center">
                <img 
                  src="/LINE_Contact.jpg" 
                   alt="LINE QR Code" 
                    className="w-32 h-32 object-contain rounded-lg"
                   />
              </div>
              <a
                href="https://line.me/ti/p/YJM6KPxuKR"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-white text-aia-red font-semibold rounded-full py-3 hover:bg-aia-redLight transition-colors"
              >
                {t("contact.lineAdd")}
              </a>
            </div>

            <ContactChannel
              icon={Phone}
              title={t("contact.phoneTitle")}
              value="096-249-2611"
              href="tel:+66962492611"
            />
            <ContactChannel
              icon={Mail}
              title={t("contact.emailTitle")}
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
