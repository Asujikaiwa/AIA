import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BrochureBrowser from "@/components/BrochureBrowser";

export const metadata: Metadata = {
  title: "โบรชัวร์และแบบประกัน",
  description:
    "รวมโบรชัวร์แบบประกัน AIA ทั้งหมด แบบประกันหลัก ประกันอุบัติเหตุ ค้นหาและดาวน์โหลดได้ฟรี",
  alternates: { canonical: "/brochures" }
};

export default function BrochuresPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Header */}
      <section className="pt-28 sm:pt-36 pb-8 bg-gradient-to-b from-aia-redLight/40 via-aia-redLight/10 to-white">
        <div className="section-container">
          <Link
            href="/#products"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-aia-gray hover:text-aia-red transition-colors mb-6"
          >
            <ArrowLeft size={16} />
            กลับหน้าหลัก
          </Link>
          <div className="max-w-3xl">
            <span className="section-eyebrow">Brochures</span>
            <h1 className="section-title text-4xl sm:text-5xl">
              เลือกแบบประกันที่ใช่สำหรับคุณ
            </h1>
            <p className="mt-5 text-lg text-aia-gray">
              รวมโบรชัวร์แบบประกัน AIA ที่ผมดูแล แบ่งหมวดให้เลือกง่าย
              ค้นหาด้วยชื่อแบบประกันหรือกรองตามหมวดหมู่ คลิกการ์ดเพื่อเปิดอ่าน
              หรือดาวน์โหลด PDF ได้เลย
            </p>
          </div>
        </div>
      </section>

      {/* Browser */}
      <section className="pb-16">
        <div className="section-container">
          <BrochureBrowser />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-aia-bg">
        <div className="section-container">
          <div className="rounded-3xl bg-gradient-to-br from-aia-red to-aia-redDark px-6 py-12 sm:px-12 sm:py-16 text-center text-white">
            <h2 className="text-2xl sm:text-3xl font-bold">
              ไม่แน่ใจว่าแบบไหนเหมาะกับคุณ?
            </h2>
            <p className="mt-4 text-white/90 max-w-2xl mx-auto">
              ให้ผมช่วยวิเคราะห์เป้าหมายและงบประมาณของคุณ
              แล้วแนะนำแบบประกันที่ลงตัวที่สุด ปรึกษาฟรี ไม่มีค่าใช้จ่าย
            </p>
            <Link
              href="/#contact"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3 text-base font-semibold text-aia-red shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <MessageCircle size={18} />
              ปรึกษาฟรีกับผม
            </Link>
          </div>
          <p className="mt-6 text-xs text-aia-gray text-center max-w-3xl mx-auto">
            ข้อมูลในโบรชัวร์เป็นเพียงข้อมูลเบื้องต้นเพื่อประกอบการตัดสินใจ
            ผู้ขอเอาประกันควรศึกษารายละเอียดความคุ้มครอง เงื่อนไข
            และข้อยกเว้นเพิ่มเติมจากกรมธรรม์ ความคุ้มครองและผลประโยชน์เป็นไปตามที่ระบุในกรมธรรม์
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
