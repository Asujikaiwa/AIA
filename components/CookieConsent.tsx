"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

const STORAGE_KEY = "phaiboon-aia-cookie-consent-v1";
const CONSENT_EVENT = "phaiboon-aia-consent-changed";

type ConsentState = "accepted" | "rejected" | null;

export default function CookieConsent() {
  const [state, setState] = useState<ConsentState>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as ConsentState;
      if (saved === "accepted" || saved === "rejected") {
        setState(saved);
      }
    } catch {
      // ignore
    }
  }, []);

  const save = (value: "accepted" | "rejected") => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
      // แจ้ง component อื่น (เช่น Analytics) ให้รู้ทันที
      window.dispatchEvent(new Event(CONSENT_EVENT));
    } catch {
      // ignore
    }
    setState(value);
  };

  if (!mounted || state !== null) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-5 pointer-events-none">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-card border border-gray-100 p-4 sm:p-5 pointer-events-auto">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="hidden sm:flex w-11 h-11 rounded-full bg-aia-redLight text-aia-red items-center justify-center flex-shrink-0">
            <Cookie size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-aia-slate flex items-center gap-2">
              <Cookie size={18} className="sm:hidden text-aia-red" />
              เว็บนี้ใช้คุกกี้
            </h3>
            <p className="text-sm text-aia-gray mt-1 leading-relaxed">
              เราใช้คุกกี้เพื่อปรับปรุงประสบการณ์การใช้งานเว็บไซต์
              และวิเคราะห์การใช้งานอย่างไม่ระบุตัวตน คุณสามารถอ่านรายละเอียดที่{" "}
              <Link
                href="/privacy"
                className="text-aia-red font-semibold underline-offset-2 hover:underline"
              >
                นโยบายความเป็นส่วนตัว
              </Link>
            </p>
            <div className="mt-3 flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={() => save("accepted")}
                className="inline-flex items-center justify-center rounded-full bg-aia-red text-white text-sm font-semibold px-5 py-2 hover:bg-aia-redDark transition-colors"
              >
                ยอมรับทั้งหมด
              </button>
              <button
                type="button"
                onClick={() => save("rejected")}
                className="inline-flex items-center justify-center rounded-full border border-gray-200 text-aia-slate text-sm font-semibold px-5 py-2 hover:border-aia-red hover:text-aia-red transition-colors"
              >
                ปฏิเสธคุกกี้ที่ไม่จำเป็น
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={() => save("rejected")}
            aria-label="ปิด"
            className="flex-shrink-0 text-aia-gray hover:text-aia-slate transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
