"use client";

import { useEffect, useState } from "react";
import { MessageCircle, Phone, X } from "lucide-react";
import { useT } from "./I18nProvider";
// หากใช้ Next.js แนะนำให้ import Image from "next/image" มาใช้แทน <img> เพื่อ Optimize รูปภาพครับ

const LINE_URL = "https://line.me/ti/p/YJM6KPxuKR";
const PHONE = "096-249-2611";
const PHONE_TEL = "+66962492611";
const LINE_QR_SRC = "/LINE_Contact.jpg"; // Path ของรูปภาพในโฟลเดอร์ public

export default function StickyContact() {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-3 transition-all duration-300 ${
        scrolled
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <div
        className={`flex flex-col items-end gap-2 transition-all duration-200 ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        {/* ส่วนที่เพิ่มใหม่: QR Code Card แสดงเฉพาะบนจอ sm ขึ้นไป */}
        <div className="hidden sm:flex flex-col items-center bg-white p-2 rounded-xl shadow-card border border-gray-100 mb-1">
          <img 
            src={LINE_QR_SRC} 
            alt="LINE QR Code" 
            className="w-24 h-24 object-contain rounded-lg"
          />
          <span className="text-[10px] font-semibold text-gray-500 mt-1">
            Scan to Add LINE
          </span>
        </div>

        <a
          href={`tel:${PHONE_TEL}`}
          className="group flex items-center gap-3 bg-white rounded-full pl-4 pr-2 py-2 shadow-card hover:shadow-lg transition-all border border-gray-100"
          aria-label={`${t("sticky.phone")} ${PHONE}`}
        >
          <span className="text-sm font-semibold text-aia-slate hidden sm:inline">
            {PHONE}
          </span>
          <span className="sm:hidden text-sm font-semibold text-aia-slate">
            {t("sticky.phone")}
          </span>
          <span className="w-10 h-10 rounded-full bg-aia-red text-white flex items-center justify-center group-hover:scale-105 transition-transform">
            <Phone size={18} />
          </span>
        </a>

        <a
          href={LINE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 bg-white rounded-full pl-4 pr-2 py-2 shadow-card hover:shadow-lg transition-all border border-gray-100"
          aria-label={t("sticky.line")}
        >
          <span className="text-sm font-semibold text-aia-slate">
            {t("sticky.line")}
          </span>
          <span className="w-10 h-10 rounded-full bg-[#06C755] text-white flex items-center justify-center group-hover:scale-105 transition-transform">
            <MessageCircle size={18} />
          </span>
        </a>
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? t("sticky.closeMenu") : t("sticky.openMenu")}
        aria-expanded={open}
        className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-card flex items-center justify-center transition-all hover:shadow-lg hover:-translate-y-0.5 ${
          open ? "bg-aia-slate text-white" : "bg-aia-red text-white"
        }`}
        style={{
          boxShadow: open
            ? "0 10px 30px -10px rgba(44,62,80,0.5)"
            : "0 10px 30px -8px rgba(211,17,69,0.55)"
        }}
      >
        {open ? <X size={26} /> : <MessageCircle size={26} />}
        {!open && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white" />
        )}
      </button>
    </div>
  );
}