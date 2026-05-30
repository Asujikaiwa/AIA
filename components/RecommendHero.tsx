"use client";

import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useT } from "./I18nProvider";

export default function RecommendHero() {
  const t = useT();
  return (
    <section className="pt-28 sm:pt-36 pb-8 bg-gradient-to-b from-aia-redLight/40 via-aia-redLight/10 to-white">
      <div className="section-container">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-aia-gray hover:text-aia-red transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          {t("broc.back")}
        </Link>
        <div className="max-w-3xl">
          <span className="section-eyebrow">
            <Sparkles size={14} className="inline mr-1 -mt-0.5" />
            {t("rec.eyebrow")}
          </span>
          <h1 className="section-title text-4xl sm:text-5xl">{t("rec.title")}</h1>
          <p className="mt-5 text-lg text-aia-gray">{t("rec.subtitle")}</p>
        </div>
      </div>
    </section>
  );
}

export function RecommendDisclaimer() {
  const t = useT();
  return (
    <section className="py-12 bg-aia-bg">
      <div className="section-container">
        <p className="text-xs text-aia-gray text-center max-w-3xl mx-auto">
          {t("rec.disclaimer")}
        </p>
      </div>
    </section>
  );
}
