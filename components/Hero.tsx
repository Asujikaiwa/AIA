"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MessageCircle, ShieldCheck, Phone } from "lucide-react";
import { useT } from "./I18nProvider";

const LINE_URL = "https://lin.ee/your-line-oa";

export default function Hero() {
  const t = useT();
  return (
    <section
      id="hero"
      className="relative pt-28 sm:pt-32 pb-16 sm:pb-24 overflow-hidden bg-gradient-to-br from-white via-aia-redLight/40 to-white"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-40 pointer-events-none"
      >
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-aia-red/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-aia-red/10 rounded-full blur-3xl" />
      </div>

      <div className="section-container grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-aia-redLight rounded-full text-aia-red text-sm font-medium mb-6">
            <ShieldCheck size={16} />
            <span>{t("hero.badge")}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-aia-slate leading-tight tracking-tight">
            {t("hero.title1")}
            <br />
            <span className="text-aia-red">{t("hero.title2")}</span>
            <br />
            {t("hero.title3")}
          </h1>

          <p className="mt-6 text-lg text-aia-gray leading-relaxed max-w-xl">
            {t("hero.subtitle")}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <MessageCircle size={20} />
              {t("hero.cta.line")}
            </a>
            <a href="#contact" className="btn-secondary">
              <Phone size={20} />
              {t("hero.cta.phone")}
            </a>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
            <Stat number={t("hero.stat1.num")} label={t("hero.stat1.label")} />
            <Stat number={t("hero.stat2.num")} label={t("hero.stat2.label")} />
            <Stat number={t("hero.stat3.num")} label={t("hero.stat3.label")} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-md lg:max-w-lg"
        >
          <div className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden shadow-card bg-aia-red">
            <Image
              src="/profile.jpg"
              alt="Phaiboon Pilachai - AIA Insurance Agent"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 500px"
              className="object-cover"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="absolute -bottom-6 -left-4 sm:-left-6 bg-white shadow-card rounded-2xl px-5 py-4 flex items-center gap-3 max-w-[260px]"
          >
            <div className="w-12 h-12 rounded-full bg-aia-redLight flex items-center justify-center text-aia-red">
              <ShieldCheck size={24} />
            </div>
            <div>
              <p className="text-sm font-semibold text-aia-slate">
                {t("hero.badge.cert.title")}
              </p>
              <p className="text-xs text-aia-gray">
                {t("hero.badge.cert.sub")}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div className="text-2xl sm:text-3xl font-bold text-aia-red">
        {number}
      </div>
      <div className="text-xs sm:text-sm text-aia-gray mt-1">{label}</div>
    </div>
  );
}
