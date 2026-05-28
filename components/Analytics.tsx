"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const STORAGE_KEY = "phaiboon-aia-cookie-consent-v1";
const CONSENT_EVENT = "phaiboon-aia-consent-changed";

/**
 * Google Analytics 4 loader.
 * - โหลด GA เฉพาะเมื่อ user accept cookie banner เท่านั้น (PDPA-friendly)
 * - ใช้ NEXT_PUBLIC_GA_ID env var เช่น "G-XXXXXXXXXX"
 * - ไม่ใส่ id ไว้ใน code โดยตรง — ถ้า env ไม่มี GA จะไม่โหลด
 *
 * ตั้งค่า:
 *   1) สร้าง property GA4 ที่ https://analytics.google.com
 *   2) copy Measurement ID (G-XXXXX...)
 *   3) ใส่ใน .env.local:  NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
 *   4) build/deploy ใหม่
 */
export default function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    const check = () => {
      try {
        setConsented(localStorage.getItem(STORAGE_KEY) === "accepted");
      } catch {
        setConsented(false);
      }
    };
    check();
    // ฟังการเปลี่ยนแปลง consent (จาก CookieConsent component)
    window.addEventListener(CONSENT_EVENT, check);
    window.addEventListener("storage", check);
    return () => {
      window.removeEventListener(CONSENT_EVENT, check);
      window.removeEventListener("storage", check);
    };
  }, []);

  if (!gaId || !consented) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
