"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock, HandHeart, Sparkles } from "lucide-react";

const reasons = [
  {
    icon: Sparkles,
    title: "แผนเฉพาะบุคคล (Personalized Planning)",
    desc: "ไม่มีแผนสำเร็จรูป — ผมวิเคราะห์รายได้ ภาระ และเป้าหมายของคุณก่อนเสนอความคุ้มครองที่ใช่"
  },
  {
    icon: Clock,
    title: "ช่วยเคลมรวดเร็ว ทันใจ",
    desc: "ทำหน้าที่เป็นตัวกลางระหว่างคุณกับบริษัท ดูแลเอกสารและขั้นตอนเคลม 24/7"
  },
  {
    icon: HandHeart,
    title: "ดูแลระยะยาว (Long-term Care)",
    desc: "ทบทวนแผนทุกปี ปรับให้สอดคล้องกับช่วงชีวิตที่เปลี่ยนไป เช่น แต่งงาน มีลูก ซื้อบ้าน เกษียณ"
  },
  {
    icon: CheckCircle2,
    title: "โปร่งใส ไม่กดดัน",
    desc: "ให้ข้อมูลครบ ทั้งข้อดี ข้อจำกัด และเงื่อนไข เพื่อให้คุณตัดสินใจอย่างมั่นใจที่สุด"
  }
];

export default function WhyChoose() {
  return (
    <section
      id="why-me"
      className="py-20 sm:py-28 bg-aia-slate relative overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-10 pointer-events-none"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-aia-red rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-aia-red rounded-full blur-3xl" />
      </div>

      <div className="section-container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-14"
        >
          <span className="inline-block text-sm font-semibold uppercase tracking-widest text-aia-red mb-3">
            ทำไมต้องเลือกฉัน
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            ตัวแทนที่ไม่ใช่แค่ขายประกัน <br className="hidden sm:block" />
            แต่ดูแลคุณเหมือนคนในครอบครัว
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-aia-red text-white flex items-center justify-center">
                  <Icon size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {r.title}
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {r.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
