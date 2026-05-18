"use client";

import { motion } from "framer-motion";
import { Award, Heart, Users } from "lucide-react";

const credentials = [
  {
    icon: Award,
    title: "ตัวแทนที่ได้รับใบอนุญาตจาก คปภ.",
    desc: "ใบอนุญาตเลขที่ XXXXXXXX | ผ่านการอบรมหลักสูตรของ AIA Thailand อย่างต่อเนื่อง"
  },
  {
    icon: Heart,
    title: "ที่ปรึกษาที่ยึดลูกค้าเป็นที่ตั้ง",
    desc: "ฟังก่อนเสนอ ออกแบบแผนตามเป้าหมายและงบประมาณของลูกค้าจริง ๆ ไม่ขายของไม่จำเป็น"
  },
  {
    icon: Users,
    title: "ดูแลตลอดอายุกรมธรรม์",
    desc: "ติดตามต่อเนื่อง ทบทวนแผนทุกปี ช่วยเหลือเรื่องเคลม และตอบทุกคำถามอย่างเป็นมิตร"
  }
];

export default function About() {
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
          <span className="section-eyebrow">เกี่ยวกับฉัน</span>
          <h2 className="section-title">
            ที่ปรึกษาทางการเงินที่จริงใจ <br className="hidden sm:block" />
            พร้อมดูแลคุณในทุกช่วงชีวิต
          </h2>
          <p className="mt-5 text-lg text-aia-gray leading-relaxed">
            สวัสดีครับ ผม <strong className="text-aia-slate">ไพบูลย์ พิลาชัย</strong>{" "}
            ตัวแทนประกันจาก AIA ที่เชื่อว่า “ประกันที่ดี”
            คือประกันที่ตอบโจทย์ชีวิตจริง ไม่ใช่แค่แผนที่ขายได้
            ผมยินดีรับฟังเป้าหมาย กังวล และสถานะการเงินของคุณ
            ก่อนออกแบบแผนความคุ้มครองที่เหมาะสมที่สุด
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {credentials.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
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
                  {item.title}
                </h3>
                <p className="text-sm text-aia-gray leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
