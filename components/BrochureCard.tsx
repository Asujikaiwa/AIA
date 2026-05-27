"use client";

import { motion } from "framer-motion";
import { FileText, Eye, Download } from "lucide-react";
import type { Brochure } from "@/lib/brochures";

export default function BrochureCard({
  item,
  index = 0
}: {
  item: Brochure;
  index?: number;
}) {
  const href = `/brochures/${item.file}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.06 }}
      className="group relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-card hover:border-aia-red/30 transition-all duration-300 flex flex-col h-full"
    >
      <div className="w-12 h-12 rounded-xl bg-aia-redLight text-aia-red flex items-center justify-center mb-4 group-hover:bg-aia-red group-hover:text-white transition-colors">
        <FileText size={22} />
      </div>

      <p className="text-xs font-semibold uppercase tracking-wider text-aia-red mb-1">
        {item.code}
      </p>
      <h3 className="text-lg font-bold text-aia-slate mb-2 leading-snug">
        {item.title}
      </h3>
      <p className="text-sm text-aia-gray leading-relaxed mb-5 flex-1">
        {item.description}
      </p>

      <div className="flex items-center gap-2">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 flex-1 rounded-full bg-aia-red px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-aia-redDark"
        >
          <Eye size={16} />
          เปิดอ่าน
        </a>
        <a
          href={href}
          download
          aria-label={`ดาวน์โหลดโบรชัวร์ ${item.title}`}
          className="inline-flex items-center justify-center rounded-full border-2 border-aia-red px-3 py-2 text-aia-red transition-colors hover:bg-aia-red hover:text-white"
        >
          <Download size={16} />
        </a>
      </div>
    </motion.article>
  );
}
