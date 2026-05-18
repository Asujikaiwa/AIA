"use client";

import { motion } from "framer-motion";
import {
  HeartPulse,
  Users,
  ShieldAlert,
  PiggyBank
} from "lucide-react";
import ProductCard from "./ProductCard";

const products = [
  {
    icon: HeartPulse,
    subtitle: "Health Insurance",
    title: "ประกันสุขภาพเหมาจ่าย",
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
    subtitle: "Life Protection",
    title: "ประกันชีวิตเพื่อครอบครัว",
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
    subtitle: "Critical Illness",
    title: "คุ้มครองโรคร้ายแรง",
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
    subtitle: "Savings & Tax",
    title: "ออมทรัพย์และลดหย่อนภาษี",
    description:
      "วางแผนสะสมเงินอย่างมีวินัย พร้อมสิทธิประโยชน์ลดหย่อนภาษีและผลตอบแทนการันตี",
    bullets: [
      "ลดหย่อนภาษีได้สูงสุดตามเงื่อนไขกรมสรรพากร",
      "เงินคืนระหว่างสัญญา / ครบกำหนด",
      "เหมาะกับการวางแผนเกษียณและทุนการศึกษา"
    ]
  }
];

export default function Products() {
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
          <span className="section-eyebrow">ผลิตภัณฑ์</span>
          <h2 className="section-title">
            แผนประกันที่ออกแบบมาเพื่อ <br className="hidden sm:block" />
            ทุกช่วงชีวิตของคุณ
          </h2>
          <p className="mt-5 text-lg text-aia-gray">
            เลือกแบบประกันที่เหมาะกับเป้าหมาย และให้ผมช่วยปรับให้
            ลงตัวกับสถานะการเงินของคุณที่สุด
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p, i) => (
            <ProductCard key={p.title} {...p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
