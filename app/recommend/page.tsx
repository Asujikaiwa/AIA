import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Recommender from "@/components/Recommender";
import RecommendHero, {
  RecommendDisclaimer
} from "@/components/RecommendHero";
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
          { name: "Home", url: "/" },
          { name: "Recommend", url: "/recommend" }
        ])}
      />
      <Navbar />
      <RecommendHero />

      <section className="pb-20 pt-8">
        <div className="section-container">
          <Recommender />
        </div>
      </section>

      <RecommendDisclaimer />
      <Footer />
    </main>
  );
}
