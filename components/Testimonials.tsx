"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "คุณนภา ส.",
    role: "พนักงานบริษัท, กรุงเทพฯ",
    quote:
      "คุณไพบูลย์อธิบายเข้าใจง่ายมาก ช่วยเลือกแผนสุขภาพที่ตรงกับงบประมาณ ตอนเคลมก็ดูแลทุกขั้นตอน รู้สึกอุ่นใจมาก"
  },
  {
    name: "คุณวิทยา จ.",
    role: "เจ้าของธุรกิจ SME",
    quote:
      "ผมเคยลังเลเรื่องประกันมาก แต่หลังคุยกับพี่ไพบูลย์ ได้แผนที่ลดหย่อนภาษีและสะสมเงินไปด้วย เพอร์เฟกต์เลย"
  },
  {
    name: "คุณพรทิพย์ ก.",
    role: "ครู, ต่างจังหวัด",
    quote:
      "ติดต่อง่าย ตอบไลน์ไว ไม่กดดันให้ซื้อ ใส่ใจรายละเอียดมาก ๆ แนะนำเพื่อนต่อหลายคนแล้วค่ะ"
  }
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-20 sm:py-28 bg-white"
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-14"
        >
          <span className="section-eyebrow">เสียงจากลูกค้า</span>
          <h2 className="section-title">
            ลูกค้าจริง รีวิวจริง
          </h2>
          <p className="mt-5 text-lg text-aia-gray">
            ความไว้ใจจากลูกค้า
            คือเครื่องยืนยันคุณภาพการบริการของผม
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-aia-bg rounded-2xl p-7 border border-gray-100 relative"
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
              <blockquote className="text-aia-slate leading-relaxed mb-5">
                “{t.quote}”
              </blockquote>
              <figcaption>
                <div className="font-semibold text-aia-slate">
                  {t.name}
                </div>
                <div className="text-sm text-aia-gray">{t.role}</div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
