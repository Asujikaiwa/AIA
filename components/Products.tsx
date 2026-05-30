"use client";

import { motion } from "framer-motion";
import {
  HeartPulse,
  Users,
  ShieldAlert,
  PiggyBank,
  FileText,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { useT } from "./I18nProvider";

export default function Products() {
  const t = useT();

  const products = [
    {
      icon: HeartPulse,
      subtitle: t("products.health.sub"),
      title: t("products.health.title"),
      description:
        "คุ้มครองค่ารักษาพยาบาลตามจริง ทั้ง IPD/OPD แผนเหมาจ่ายสูงสุดหลักล้าน รองรับโรงพยาบาลชั้นนำทั่วประเทศ",
      bullets: [
        "ค่าห้องเดี่ยวมาตรฐาน + ICU",
        "ผ่าตัด ค่ายา และการรักษาเฉพาะทาง",
        "เลือกแผนเหมาจ่ายได้ตั้งแต่ 1 - 100 ล้านบาท"
      ]
    },
    {
      icon: Users,
      subtitle: t("products.life.sub"),
      title: t("products.life.title"),
      description:
        "ปกป้องคนที่คุณรักด้วยทุนประกันชีวิตที่เหมาะกับภาระทางการเงิน รายได้ และเป้าหมายอนาคต",
      bullets: [
        "คุ้มครองตลอดชีพ / ระยะเวลาที่กำหนด",
        "เบี้ยคงที่ตลอดสัญญา",
        "เลือกแนบสัญญาเพิ่มเติมได้ยืดหยุ่น"
      ]
    },
    {
      icon: ShieldAlert,
      subtitle: t("products.ci.sub"),
      title: t("products.ci.title"),
      description:
        "รับเงินก้อนทันทีเมื่อตรวจพบโรคร้ายแรง เช่น มะเร็ง โรคหัวใจ หลอดเลือดสมอง เพื่อให้คุณรักษาได้อย่างเต็มที่",
      bullets: [
        "ครอบคลุมโรคร้ายแรงมากกว่า 50 โรค",
        "จ่ายก้อนเดียวเมื่อตรวจพบ",
        "เลือกความคุ้มครองได้สูงสุดหลายล้านบาท"
      ]
    },
    {
      icon: PiggyBank,
      subtitle: t("products.saving.sub"),
      title: t("products.saving.title"),
      description:
        "วางแผนสะสมเงินอย่างมีวินัย พร้อมสิทธิประโยชน์ลดหย่อนภาษีและผลตอบแทนการันตี",
      bullets: [
        "ลดหย่อนภาษีได้สูงสุดตามเงื่อนไขกรมสรรพากร",
        "เงินคืนระหว่างสัญญา / ครบกำหนด",
        "เหมาะกับการวางแผนเกษียณและทุนการศึกษา"
      ]
    }
  ];

  return (
    <section
      id="products"
      className="py-20 sm:py-28 bg-gradient-to-b from-aia-bg to-white"
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-14"
        >
          <span className="section-eyebrow">{t("products.eyebrow")}</span>
          <h2 className="section-title">
            {t("products.title1")} <br className="hidden sm:block" />
            {t("products.title2")}
          </h2>
          <p className="mt-5 text-lg text-aia-gray">
            {t("products.subtitle")}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p, i) => (
            <ProductCard
              key={p.title}
              {...p}
              ctaLabel={t("products.cta")}
              index={i}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-aia-gray mb-4">{t("products.viewAllHint")}</p>
          <Link
            href="/brochures"
            className="inline-flex items-center gap-2 rounded-full border-2 border-aia-red bg-white px-7 py-3 text-base font-semibold text-aia-red transition-all duration-300 hover:bg-aia-red hover:text-white"
          >
            <FileText size={18} />
            {t("products.viewAll")}
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
