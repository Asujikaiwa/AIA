"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Heart, Users, X, ZoomIn } from "lucide-react";
import { useT } from "./I18nProvider";
import type { DictKey } from "@/lib/i18n";

export default function About() {
  const t = useT();
  const [licenseOpen, setLicenseOpen] = useState(false);

  const credentials: Array<{
    icon: typeof Award;
    titleKey: DictKey;
    descKey: DictKey;
  }> = [
    { icon: Award, titleKey: "about.cred1.title", descKey: "about.cred1.desc" },
    { icon: Heart, titleKey: "about.cred2.title", descKey: "about.cred2.desc" },
    { icon: Users, titleKey: "about.cred3.title", descKey: "about.cred3.desc" }
  ];

  return (
    <section id="about" className="py-20 sm:py-28 bg-white">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-14"
        >
          <span className="section-eyebrow">{t("about.eyebrow")}</span>
          <h2 className="section-title">
            {t("about.title1")} <br className="hidden sm:block" />
            {t("about.title2")}
          </h2>
          <p className="mt-5 text-lg text-aia-gray leading-relaxed">
            {t("about.intro")}
          </p>
        </motion.div>

        {/* License showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-12 grid sm:grid-cols-[auto,1fr] gap-6 items-center bg-aia-bg rounded-2xl p-6 sm:p-8 border border-gray-100"
        >
          <button
            type="button"
            onClick={() => setLicenseOpen(true)}
            aria-label={t("about.license.zoom")}
            className="group relative block w-full sm:w-64 aspect-[16/9] rounded-xl overflow-hidden border-2 border-aia-red/20 hover:border-aia-red shadow-soft transition-all"
          >
            <Image
              src="/license-kpb2.JPG"
              alt={t("about.license.title")}
              fill
              sizes="(max-width: 640px) 100vw, 256px"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-aia-red/0 group-hover:bg-aia-red/10 transition-colors flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/95 rounded-full p-2 text-aia-red">
                <ZoomIn size={20} />
              </div>
            </div>
          </button>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-aia-red text-white text-xs font-semibold mb-3">
              <Award size={14} />
              {t("about.license.badge")}
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-aia-slate mb-2">
              {t("about.license.title")}
            </h3>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              <div>
                <dt className="text-aia-gray text-xs">{t("about.license.no")}</dt>
                <dd className="font-semibold text-aia-slate">6901006784</dd>
              </div>
              <div>
                <dt className="text-aia-gray text-xs">{t("about.license.company")}</dt>
                <dd className="font-semibold text-aia-slate">
                  {t("about.license.companyName")}
                </dd>
              </div>
              <div>
                <dt className="text-aia-gray text-xs">{t("about.license.issued")}</dt>
                <dd className="font-semibold text-aia-slate">23/02/2569</dd>
              </div>
              <div>
                <dt className="text-aia-gray text-xs">{t("about.license.expires")}</dt>
                <dd className="font-semibold text-aia-slate">22/02/2570</dd>
              </div>
            </dl>
            <p className="text-xs text-aia-gray mt-3">
              {t("about.license.zoom")}
            </p>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {credentials.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.titleKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-aia-bg rounded-2xl p-6 border border-gray-100 hover:shadow-card transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-aia-red text-white flex items-center justify-center mb-4">
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-semibold text-aia-slate mb-2">
                  {t(item.titleKey)}
                </h3>
                <p className="text-sm text-aia-gray leading-relaxed">
                  {t(item.descKey)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* License lightbox */}
      <AnimatePresence>
        {licenseOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLicenseOpen(false)}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
          >
            <button
              type="button"
              aria-label="ปิด"
              onClick={() => setLicenseOpen(false)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <X size={22} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl cursor-default"
            >
              <Image
                src="/license-kpb2.JPG"
                alt="ใบอนุญาตเป็นตัวแทนประกันชีวิต - คปภ."
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-contain bg-white"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
