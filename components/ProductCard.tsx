"use client";

import { motion } from "framer-motion";
import { ArrowRight, LucideIcon } from "lucide-react";

export type ProductCardProps = {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  highlightColor?: string;
  index?: number;
  ctaLabel?: string;
};

export default function ProductCard({
  icon: Icon,
  title,
  subtitle,
  description,
  bullets,
  index = 0,
  ctaLabel = "ขอใบเสนอแผน"
}: ProductCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-card hover:border-aia-red/30 transition-all duration-300 flex flex-col h-full"
    >
      <div className="w-14 h-14 rounded-2xl bg-aia-redLight text-aia-red flex items-center justify-center mb-5 group-hover:bg-aia-red group-hover:text-white transition-colors">
        <Icon size={26} />
      </div>

      <p className="text-xs font-semibold uppercase tracking-wider text-aia-red mb-1">
        {subtitle}
      </p>
      <h3 className="text-xl font-bold text-aia-slate mb-3">{title}</h3>
      <p className="text-sm text-aia-gray leading-relaxed mb-5">
        {description}
      </p>

      <ul className="space-y-2 mb-6 flex-1">
        {bullets.map((b) => (
          <li
            key={b}
            className="flex items-start gap-2 text-sm text-aia-slate"
          >
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-aia-red flex-shrink-0" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <a
        href="#contact"
        className="inline-flex items-center gap-1 text-aia-red font-semibold text-sm hover:gap-2 transition-all"
      >
        {ctaLabel}
        <ArrowRight size={16} />
      </a>
    </motion.article>
  );
}
