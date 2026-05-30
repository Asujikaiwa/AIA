"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Globe } from "lucide-react";
import { useI18n } from "./I18nProvider";
import { LOCALES, LOCALE_LABELS, type Locale } from "@/lib/i18n";

export default function LanguageSwitcher({
  className = "",
  compact = false
}: {
  className?: string;
  compact?: boolean;
}) {
  const { locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const current = LOCALE_LABELS[locale];

  const pick = (l: Locale) => {
    setLocale(l);
    setOpen(false);
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Change language"
        className={`inline-flex items-center gap-1.5 rounded-full transition-colors ${
          compact
            ? "px-2 py-1.5 text-xs"
            : "px-3 py-1.5 text-sm border border-gray-200 hover:border-aia-red bg-white"
        }`}
      >
        <Globe size={compact ? 14 : 16} className="text-aia-gray" />
        <span className="font-medium text-aia-slate">{current.flag}</span>
        {!compact && (
          <span className="font-medium text-aia-slate">{current.name}</span>
        )}
        <ChevronDown
          size={compact ? 12 : 14}
          className={`text-aia-gray transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 min-w-[160px] bg-white border border-gray-100 rounded-2xl shadow-card py-2 z-50"
        >
          {LOCALES.map((l) => {
            const lab = LOCALE_LABELS[l];
            const active = l === locale;
            return (
              <button
                type="button"
                key={l}
                role="menuitemradio"
                aria-checked={active}
                onClick={() => pick(l)}
                className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-left transition-colors ${
                  active
                    ? "bg-aia-redLight text-aia-red font-semibold"
                    : "text-aia-slate hover:bg-aia-bg"
                }`}
              >
                <span className="text-lg leading-none">{lab.flag}</span>
                <span>{lab.name}</span>
                {active && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-aia-red" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
