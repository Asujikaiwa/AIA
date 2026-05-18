"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MessageCircle, ShieldCheck, Phone } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative pt-28 sm:pt-32 pb-16 sm:pb-24 overflow-hidden bg-gradient-to-br from-white via-aia-redLight/40 to-white"
    >
      {/* Decorative background */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-40 pointer-events-none"
      >
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-aia-red/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-aia-red/10 rounded-full blur-3xl" />
      </div>

      <div className="section-container grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-aia-redLight rounded-full text-aia-red text-sm font-medium mb-6">
            <ShieldCheck size={16} />
            <span>ตัวแทนประกัน AIA มืออาชีพ</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-aia-slate leading-tight tracking-tight">
            วางแผนชีวิตอย่างมั่นคง
            <br />
            <span className="text-aia-red">ด้วยประกันที่ใช่</span>
            <br />
            สำหรับคุณและครอบครัว
          </h1>

          <p className="mt-6 text-lg text-aia-gray leading-relaxed max-w-xl">
            ผมไพบูลย์ พิลาชัย ตัวแทน AIA พร้อมเป็นที่ปรึกษาทางการเงิน
            ที่จริงใจ ช่วยออกแบบแผนประกันสุขภาพ ประกันชีวิต
            และวางแผนภาษีที่เหมาะกับเป้าหมายของคุณ
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href="https://lin.ee/your-line-oa"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <MessageCircle size={20} />
              ปรึกษาฟรี / ทักไลน์
            </a>
            <a href="#contact" className="btn-secondary">
              <Phone size={20} />
              ฝากเบอร์ติดต่อกลับ
            </a>
          </div>

          {/* Trust badges */}
          <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
            <Stat number="500+" label="ลูกค้าที่ดูแล" />
            <Stat number="5+" label="ปีประสบการณ์" />
            <Stat number="98%" label="ความพึงพอใจ" />
          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-md lg:max-w-lg"
        >
          <div className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden shadow-card bg-aia-red">
            <Image
              src="/profile.jpg"
              alt="Phaiboon Pilachai - AIA Insurance Agent"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 500px"
              className="object-cover"
            />
          </div>

          {/* Floating credential badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="absolute -bottom-6 -left-4 sm:-left-6 bg-white shadow-card rounded-2xl px-5 py-4 flex items-center gap-3 max-w-[260px]"
          >
            <div className="w-12 h-12 rounded-full bg-aia-redLight flex items-center justify-center text-aia-red">
              <ShieldCheck size={24} />
            </div>
            <div>
              <p className="text-sm font-semibold text-aia-slate">
                ตัวแทนที่ได้รับใบอนุญาต
              </p>
              <p className="text-xs text-aia-gray">
                คปภ. และ AIA Thailand
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div className="text-2xl sm:text-3xl font-bold text-aia-red">
        {number}
      </div>
      <div className="text-xs sm:text-sm text-aia-gray mt-1">{label}</div>
    </div>
  );
}
