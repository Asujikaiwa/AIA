"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useT } from "./I18nProvider";

export default function BrochuresHero() {
  const t = useT();
  return (
    <section className="pt-28 sm:pt-36 pb-8 bg-gradient-to-b from-aia-redLight/40 via-aia-redLight/10 to-white">
      <div className="section-container">
        <Link
          href="/#products"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-aia-gray hover:text-aia-red transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          {t("broc.back")}
        </Link>
        <div className="max-w-3xl">
          <span className="section-eyebrow">{t("broc.eyebrow")}</span>
          <h1 className="section-title text-4xl sm:text-5xl">
            {t("broc.title")}
          </h1>
          <p className="mt-5 text-lg text-aia-gray">{t("broc.subtitle")}</p>
        </div>
      </div>
    </section>
  );
}

export function BrochuresCTA() {
  const t = useT();
  return (
    <section className="py-16 bg-aia-bg">
      <div className="section-container">
        <div className="rounded-3xl bg-gradient-to-br from-aia-red to-aia-redDark px-6 py-12 sm:px-12 sm:py-16 text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold">{t("broc.cta.title")}</h2>
          <p className="mt-4 text-white/90 max-w-2xl mx-auto">
            {t("broc.cta.body")}
          </p>
          <Link
            href="/#contact"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3 text-base font-semibold text-aia-red shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
          >
            {t("broc.cta.button")}
          </Link>
        </div>
        <p className="mt-6 text-xs text-aia-gray text-center max-w-3xl mx-auto">
          {t("broc.disclaimer")}
        </p>
      </div>
    </section>
  );
}
