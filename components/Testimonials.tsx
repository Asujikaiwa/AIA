"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { useT, usePick } from "./I18nProvider";
import type { Localized } from "@/lib/i18n";

// รีวิวจาก 2 ท่านที่ยินยอมให้นำชื่อมาแสดง
// TODO: แทนที่ quote ด้วยข้อความจริงจากแต่ละท่าน
type Testimonial = {
  name: string;
  role: Localized;
  quote: Localized;
};

const testimonials: Testimonial[] = [
  {
    name: "คุณไพฑูลย์",
    role: {
      th: "ลูกค้า",
      en: "Customer",
      zh: "客户"
    },
    quote: {
      th: "พี่ไพบูลย์อธิบายแบบประกันได้เข้าใจง่ายมาก ดูแลตั้งแต่ก่อนซื้อจนถึงตอนเคลม ไม่มีบ่ายเบี่ยง ไว้ใจได้จริง ๆ",
      en: "Khun Phaiboon explains insurance plans in a way that's easy to understand. He takes care of everything from pre-purchase to claims — no excuses, truly trustworthy.",
      zh: "Phaiboon 解释保险方案非常清楚易懂,从投保到理赔全程关照,毫不推诿,真的可以信任。"
    }
  },
  {
    name: "คุณอนงค์รัตน์",
    role: {
      th: "ลูกค้า",
      en: "Customer",
      zh: "客户"
    },
    quote: {
      th: "เลือกแผนสุขภาพให้ตรงกับงบ ไม่กดดันให้ซื้อใหญ่ ตอบไลน์ไวมาก ปรึกษาเรื่องประกันได้ทุกเรื่อง ประทับใจค่ะ",
      en: "He picked a health plan that fits my budget — no pressure to upsize, replies on LINE very quickly, and is available for any insurance question. Truly impressed.",
      zh: "为我挑选了符合预算的健康方案,不会催着加大保单,LINE 回讯息很快,任何保险问题都能咨询,印象非常好。"
    }
  }
];

export default function Testimonials() {
  const t = useT();
  const pick = usePick();
  return (
    <section id="testimonials" className="py-20 sm:py-28 bg-white">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-14"
        >
          <span className="section-eyebrow">{t("test.eyebrow")}</span>
          <h2 className="section-title">{t("test.title")}</h2>
          <p className="mt-5 text-lg text-aia-gray">{t("test.subtitle")}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {testimonials.map((review, i) => (
            <motion.figure
              key={review.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-aia-bg rounded-2xl p-7 sm:p-8 border border-gray-100 relative"
            >
              <Quote
                className="absolute top-5 right-5 text-aia-red/20"
                size={40}
              />
              <div className="flex gap-1 mb-4 text-aia-red">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} size={16} fill="currentColor" />
                ))}
              </div>
              <blockquote className="text-aia-slate leading-relaxed mb-5 text-base sm:text-lg">
                &ldquo;{pick(review.quote)}&rdquo;
              </blockquote>
              <figcaption>
                <div className="font-semibold text-aia-slate">{review.name}</div>
                <div className="text-sm text-aia-gray">{pick(review.role)}</div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
