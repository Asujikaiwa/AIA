// ระบบ i18n แบบเบา (no dependencies)
// - locale เก็บใน localStorage + sync ระหว่างแท็บได้
// - useT() เรียกข้อความตาม key
// - LANG attribute ของ <html> จะเปลี่ยนตามด้วย เพื่อ accessibility และ SEO

import { dictionary } from "./dictionary";

export const LOCALES = ["th", "en", "zh"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "th";
export const STORAGE_KEY = "phaiboon-aia-locale";
export const LOCALE_EVENT = "phaiboon-aia-locale-changed";

export const LOCALE_LABELS: Record<Locale, { name: string; flag: string }> = {
  th: { name: "ไทย", flag: "🇹🇭" },
  en: { name: "English", flag: "🇬🇧" },
  zh: { name: "中文", flag: "🇨🇳" }
};

export type DictKey = keyof typeof dictionary.th;

export function isLocale(v: unknown): v is Locale {
  return typeof v === "string" && (LOCALES as readonly string[]).includes(v);
}

/** แปลข้อความ; fallback ภาษาไทยถ้าไม่มีในภาษานั้น; fallback key ถ้าไม่มีเลย */
export function translate(locale: Locale, key: DictKey): string {
  const localeDict = dictionary[locale] as Record<string, string>;
  if (localeDict && localeDict[key] != null) return localeDict[key];
  const fallback = dictionary[DEFAULT_LOCALE] as Record<string, string>;
  return fallback[key] ?? key;
}

/** ข้อความหลายภาษาแบบ inline (ใช้กับข้อมูลใน data file เช่น brochures, faqs) */
export type Localized = { th: string; en?: string; zh?: string };

/** เลือกข้อความตาม locale; fallback กลับไทยถ้าภาษานั้นยังไม่ได้แปล */
export function pick(v: Localized, locale: Locale): string {
  return v[locale] ?? v.th;
}
