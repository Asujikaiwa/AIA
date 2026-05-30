import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BrochureBrowser from "@/components/BrochureBrowser";
import BrochuresHero, { BrochuresCTA } from "@/components/BrochuresHero";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "โบรชัวร์และแบบประกัน",
  description:
    "รวมโบรชัวร์แบบประกัน AIA ทั้งหมด แบบประกันหลัก ประกันอุบัติเหตุ ค้นหาและดาวน์โหลดได้ฟรี",
  alternates: { canonical: "/brochures" }
};

export default function BrochuresPage() {
  return (
    <main className="min-h-screen bg-white">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Brochures", url: "/brochures" }
        ])}
      />
      <Navbar />
      <BrochuresHero />

      <section className="pb-16">
        <div className="section-container">
          <BrochureBrowser />
        </div>
      </section>

      <BrochuresCTA />
      <Footer />
    </main>
  );
}
