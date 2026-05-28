"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Heart, Users, X, ZoomIn } from "lucide-react";

const credentials = [
  {
    icon: Award,
    title: "ตัวแทนที่ได้รับใบอนุญาตจาก คปภ.",
    desc: "ใบอนุญาตเลขที่ 6901006784 | ผ่านการอบรมหลักสูตรของ AIA Thailand อย่างต่อเนื่อง"
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
  const [licenseOpen, setLicenseOpen] = useState(false);

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
            aria-label="คลิกเพื่อดูใบอนุญาตเต็มขนาด"
            className="group relative block w-full sm:w-64 aspect-[16/9] rounded-xl overflow-hidden border-2 border-aia-red/20 hover:border-aia-red shadow-soft transition-all"
          >
            <Image
              src="/license-kpb.jpg"
              alt="ใบอนุญาตเป็นตัวแทนประกันชีวิต - คปภ."
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
              ใบอนุญาตจริงจาก คปภ.
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-aia-slate mb-2">
              ตัวแทนประกันชีวิตที่ได้รับใบอนุญาตอย่างถูกต้อง
            </h3>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              <div>
                <dt className="text-aia-gray text-xs">เลขที่ใบอนุญาต</dt>
                <dd className="font-semibold text-aia-slate">6901006784</dd>
              </div>
              <div>
                <dt className="text-aia-gray text-xs">สังกัด</dt>
                <dd className="font-semibold text-aia-slate">บริษัท เอไอเอ จำกัด</dd>
              </div>
              <div>
                <dt className="text-aia-gray text-xs">วันออกใบอนุญาต</dt>
                <dd className="font-semibold text-aia-slate">23/02/2569</dd>
              </div>
              <div>
                <dt className="text-aia-gray text-xs">วันหมดอายุ</dt>
                <dd className="font-semibold text-aia-slate">22/02/2570</dd>
              </div>
            </dl>
            <p className="text-xs text-aia-gray mt-3">
              คลิกที่รูปเพื่อดูใบอนุญาตขนาดเต็ม
            </p>
          </div>
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
                src="/license-kpb.jpg"
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
