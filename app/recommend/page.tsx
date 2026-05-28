import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Recommender from "@/components/Recommender";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "เลือกแบบประกันที่เหมาะกับคุณ",
  description:
    "ตอบคำถามสั้นๆ 4 ข้อ ให้ระบบแนะนำแบบประกัน AIA ที่เหมาะกับช่วงชีวิต เป้าหมาย และงบประมาณของคุณ",
  alternates: { canonical: "/recommend" }
};

export default function RecommendPage() {
  return (
    <main className="min-h-screen bg-white">
      <JsonLd
        data={breadcrumbSchema([
          { name: "หน้าหลัก", url: "/" },
          { name: "เลือกแบบประกัน", url: "/recommend" }
        ])}
      />
      <Navbar />

      <section className="pt-28 sm:pt-36 pb-8 bg-gradient-to-b from-aia-redLight/40 via-aia-redLight/10 to-white">
        <div className="section-container">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-aia-gray hover:text-aia-red transition-colors mb-6"
          >
            <ArrowLeft size={16} />
            กลับหน้าหลัก
          </Link>
          <div className="max-w-3xl">
            <span className="section-eyebrow">
              <Sparkles size={14} className="inline mr-1 -mt-0.5" />
              ตัวช่วยเลือกแบบประกัน
            </span>
            <h1 className="section-title text-4xl sm:text-5xl">
              ไม่รู้จะเลือกแบบไหน? ให้ผมช่วยคุณ
            </h1>
            <p className="mt-5 text-lg text-aia-gray">
              ตอบคำถามสั้นๆ 4 ข้อ ระบบจะแนะนำแบบประกันที่ใกล้เคียงกับคุณที่สุด
              พร้อมโบรชัวร์เต็มและช่องทางขอใบเสนอจริงทันที
            </p>
          </div>
        </div>
      </section>

      <section className="pb-20 pt-8">
        <div className="section-container">
          <Recommender />
        </div>
      </section>

      <section className="py-12 bg-aia-bg">
        <div className="section-container">
          <p className="text-xs text-aia-gray text-center max-w-3xl mx-auto">
            ผลการแนะนำเป็นการประมวลผลเบื้องต้นจากคำตอบของคุณ
            เพื่อใช้เป็นจุดเริ่มต้นในการศึกษาเท่านั้น
            แบบประกันที่เหมาะสมจริงต้องพิจารณาประวัติสุขภาพ
            สถานะการเงิน และเป้าหมายเชิงลึกร่วมด้วย
            ทักผมเพื่อขอคำแนะนำที่ละเอียดและแม่นยำขึ้นได้ครับ
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
