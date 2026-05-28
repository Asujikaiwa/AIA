"use client";

import { useEffect, useState } from "react";
import { MessageCircle, Phone, X } from "lucide-react";

// ปรับลิงก์/เบอร์จริงตรงนี้ที่เดียว
const LINE_URL = "https://lin.ee/your-line-oa"; // TODO: ใส่ LINE OA จริง
const PHONE = "096-249-2611";
const PHONE_TEL = "+66962492611";

export default function StickyContact() {
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
      {/* Expanded options */}
      <div
        className={`flex flex-col items-end gap-2 transition-all duration-200 ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        <a
          href={`tel:${PHONE_TEL}`}
          className="group flex items-center gap-3 bg-white rounded-full pl-4 pr-2 py-2 shadow-card hover:shadow-lg transition-all border border-gray-100"
          aria-label={`โทรหา ${PHONE}`}
        >
          <span className="text-sm font-semibold text-aia-slate hidden sm:inline">
            {PHONE}
          </span>
          <span className="sm:hidden text-sm font-semibold text-aia-slate">
            โทร
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
          aria-label="แชทผ่าน LINE"
        >
          <span className="text-sm font-semibold text-aia-slate">แชท LINE</span>
          <span className="w-10 h-10 rounded-full bg-[#06C755] text-white flex items-center justify-center group-hover:scale-105 transition-transform">
            <MessageCircle size={18} />
          </span>
        </a>
      </div>

      {/* Main toggle button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "ปิดเมนูติดต่อ" : "เปิดเมนูติดต่อ"}
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
