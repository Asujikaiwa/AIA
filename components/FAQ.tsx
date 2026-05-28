"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { faqs } from "@/lib/faqs";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 sm:py-28 bg-aia-bg">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <span className="section-eyebrow">FAQ</span>
          <h2 className="section-title">
            คำถามที่ลูกค้าถามบ่อยที่สุด
          </h2>
          <p className="mt-5 text-lg text-aia-gray">
            รวมคำถามยอดฮิตเกี่ยวกับประกัน AIA ถ้าไม่เจอคำตอบที่ต้องการ
            ทักผมมาถามได้เสมอครับ
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
                className={`bg-white rounded-2xl border transition-all ${
                  isOpen
                    ? "border-aia-red shadow-card"
                    : "border-gray-100 hover:border-aia-red/30"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-start gap-4 text-left p-5 sm:p-6"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                      isOpen
                        ? "bg-aia-red text-white"
                        : "bg-aia-redLight text-aia-red"
                    }`}
                  >
                    <HelpCircle size={18} />
                  </span>
                  <span className="flex-1 font-semibold text-aia-slate text-base sm:text-lg leading-snug pt-1">
                    {item.q}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`flex-shrink-0 text-aia-gray transition-transform mt-1.5 ${
                      isOpen ? "rotate-180 text-aia-red" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-aia-gray leading-relaxed px-5 sm:px-6 pb-5 sm:pb-6 pl-[3.75rem] sm:pl-[4.5rem]">
                      {item.a}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto mt-10 text-center"
        >
          <p className="text-aia-gray mb-4">
            มีคำถามอื่นที่ไม่เจอในนี้?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border-2 border-aia-red bg-white px-7 py-3 text-base font-semibold text-aia-red transition-all duration-300 hover:bg-aia-red hover:text-white"
          >
            ถามผมโดยตรง
          </a>
        </motion.div>
      </div>
    </section>
  );
}
