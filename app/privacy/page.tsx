import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "นโยบายความเป็นส่วนตัว",
  description:
    "นโยบายความเป็นส่วนตัวของเว็บไซต์ Phaiboon Pilachai - ตัวแทนประกัน AIA ตามกฎหมาย PDPA",
  alternates: { canonical: "/privacy" }
};

const lastUpdated = "27 พฤษภาคม 2569";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-28 sm:pt-36 pb-12 bg-gradient-to-b from-aia-redLight/40 via-aia-redLight/10 to-white">
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
              <ShieldCheck size={14} className="inline mr-1 -mt-0.5" />
              PDPA Compliance
            </span>
            <h1 className="section-title text-4xl sm:text-5xl">
              นโยบายความเป็นส่วนตัว
            </h1>
            <p className="mt-4 text-sm text-aia-gray">
              ปรับปรุงล่าสุด: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      <article className="py-12">
        <div className="section-container">
          <div className="max-w-3xl mx-auto prose-style space-y-8">
            <Section title="1. ผู้ควบคุมข้อมูลส่วนบุคคล">
              <p>
                เว็บไซต์นี้บริหารโดย <strong>นายไพบูลย์ พิลาชัย</strong> ตัวแทน
                ประกันชีวิต บริษัท เอไอเอ จำกัด (เลขที่ใบอนุญาต 6901006784)
                ในฐานะตัวแทนผู้ติดต่อกับลูกค้า มิใช่นิติบุคคล
              </p>
              <p>
                ช่องทางติดต่อ: อีเมล{" "}
                <a href="mailto:phaiboonaia@gmail.com" className="text-aia-red">
                  phaiboonaia@gmail.com
                </a>{" "}
                / โทร{" "}
                <a href="tel:+66962492611" className="text-aia-red">
                  096-249-2611
                </a>
              </p>
            </Section>

            <Section title="2. ข้อมูลส่วนบุคคลที่เก็บรวบรวม">
              <p>เราอาจเก็บข้อมูลต่อไปนี้เมื่อคุณใช้งานเว็บไซต์:</p>
              <ul>
                <li>
                  <strong>ข้อมูลที่คุณกรอกในแบบฟอร์มติดต่อ</strong>: ชื่อ
                  เบอร์โทรศัพท์ อีเมล ข้อความ และข้อมูลอื่นที่คุณระบุ
                </li>
                <li>
                  <strong>ข้อมูลจากตัวช่วยแนะนำแบบประกัน (/recommend)</strong>:
                  อายุ ช่วงชีวิต เป้าหมาย งบประมาณ ที่คุณเลือกในแบบสอบถาม
                </li>
                <li>
                  <strong>ข้อมูลการใช้งานทั่วไป</strong>: IP address ประเภทเบราว์เซอร์
                  หน้าที่เข้าชม เวลาที่ใช้งาน ผ่านคุกกี้และเครื่องมือวิเคราะห์
                </li>
              </ul>
            </Section>

            <Section title="3. วัตถุประสงค์ในการใช้ข้อมูล">
              <ul>
                <li>เพื่อติดต่อกลับเมื่อคุณขอใบเสนอ ปรึกษา หรือสอบถามผลิตภัณฑ์</li>
                <li>เพื่อจัดทำใบเสนอแบบประกันที่เหมาะสมกับความต้องการของคุณ</li>
                <li>
                  เพื่อปรับปรุงเว็บไซต์ วัดประสิทธิภาพ และพัฒนาประสบการณ์ผู้ใช้
                </li>
                <li>เพื่อปฏิบัติตามกฎหมายและคำสั่งของหน่วยงานที่กำกับดูแล</li>
              </ul>
            </Section>

            <Section title="4. ฐานทางกฎหมายในการประมวลผล">
              <p>
                เราประมวลผลข้อมูลของคุณภายใต้ฐานความยินยอม (Consent)
                เมื่อคุณกรอกข้อมูลในแบบฟอร์มหรือยินยอมรับคุกกี้
                และฐานสัญญา (Contract) เมื่อต้องดำเนินการตามคำขอของคุณ
                เช่น จัดทำใบเสนอแบบประกัน
              </p>
            </Section>

            <Section title="5. การเปิดเผยข้อมูล">
              <p>
                เราจะ <strong>ไม่ขายหรือแบ่งปันข้อมูลของคุณ</strong>{" "}
                ให้กับบุคคลที่สามเพื่อวัตถุประสงค์ทางการตลาด
                ข้อมูลของคุณอาจถูกเปิดเผยให้กับ:
              </p>
              <ul>
                <li>
                  บริษัท เอไอเอ จำกัด ในฐานะผู้รับประกันภัย เมื่อคุณตัดสินใจ
                  ทำประกัน เพื่อพิจารณารับประกันและออกกรมธรรม์
                </li>
                <li>
                  หน่วยงานราชการหรือผู้กำกับดูแล (เช่น คปภ.) เมื่อมีคำสั่ง
                  ตามกฎหมาย
                </li>
                <li>
                  ผู้ให้บริการเทคโนโลยีของเว็บไซต์ (เช่น hosting, analytics)
                  เฉพาะข้อมูลที่จำเป็นในการให้บริการ
                </li>
              </ul>
            </Section>

            <Section title="6. ระยะเวลาในการเก็บรักษา">
              <p>
                เราจะเก็บข้อมูลของคุณไว้เท่าที่จำเป็นต่อวัตถุประสงค์
                หรือตามที่กฎหมายกำหนด เช่น
              </p>
              <ul>
                <li>
                  ข้อมูลคำขอใบเสนอที่ยังไม่ได้ทำกรมธรรม์: 6 เดือน นับจาก
                  วันที่ติดต่อล่าสุด
                </li>
                <li>
                  ข้อมูลของลูกค้าที่ทำกรมธรรม์: ตลอดอายุกรมธรรม์ + 10 ปี
                  ตามที่กฎหมายกำหนด
                </li>
                <li>
                  ข้อมูลคุกกี้เพื่อวิเคราะห์: สูงสุด 24 เดือน
                </li>
              </ul>
            </Section>

            <Section title="7. สิทธิของเจ้าของข้อมูลภายใต้ PDPA">
              <p>ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 คุณมีสิทธิ:</p>
              <ul>
                <li>ขอเข้าถึงและขอสำเนาข้อมูลส่วนบุคคลของคุณ</li>
                <li>ขอแก้ไขให้ข้อมูลถูกต้องและเป็นปัจจุบัน</li>
                <li>ขอลบหรือทำลายข้อมูล</li>
                <li>ขอจำกัดการใช้ข้อมูล</li>
                <li>ขอคัดค้านการประมวลผลข้อมูล</li>
                <li>ขอถอนความยินยอมเมื่อใดก็ได้</li>
                <li>
                  ร้องเรียนต่อสำนักงานคณะกรรมการคุ้มครองข้อมูลส่วนบุคคล (สคส.)
                  หากเห็นว่ามีการประมวลผลที่ไม่ชอบ
                </li>
              </ul>
              <p>
                ใช้สิทธิข้างต้นได้โดยติดต่อผ่านอีเมล{" "}
                <a href="mailto:phaiboonaia@gmail.com" className="text-aia-red">
                  phaiboonaia@gmail.com
                </a>{" "}
                เราจะดำเนินการภายใน 30 วัน
              </p>
            </Section>

            <Section title="8. การใช้คุกกี้ (Cookies)">
              <p>เว็บไซต์ใช้คุกกี้ใน 2 ประเภท:</p>
              <ul>
                <li>
                  <strong>คุกกี้จำเป็น</strong>: เพื่อให้เว็บไซต์ทำงานได้ปกติ
                  เช่น จดจำการเลือกภาษา ปิดไม่ได้
                </li>
                <li>
                  <strong>คุกกี้วิเคราะห์</strong>: เพื่อนับจำนวนผู้เข้าชมและ
                  เข้าใจพฤติกรรมการใช้งานแบบไม่ระบุตัวตน
                  คุณสามารถปฏิเสธได้จากแบนเนอร์ที่แสดงด้านล่างของเว็บไซต์
                </li>
              </ul>
            </Section>

            <Section title="9. การเปลี่ยนแปลงนโยบาย">
              <p>
                เราอาจปรับปรุงนโยบายนี้เป็นระยะ
                โดยจะแจ้งวันที่ปรับปรุงล่าสุดที่ส่วนหัวของหน้านี้
                การที่คุณใช้งานเว็บไซต์ต่อหลังจากการปรับปรุง
                ถือว่าคุณรับทราบและยอมรับนโยบายฉบับใหม่
              </p>
            </Section>

            <Section title="10. ติดต่อเรา">
              <p>
                หากมีคำถามเกี่ยวกับนโยบายความเป็นส่วนตัวฉบับนี้
                หรือต้องการใช้สิทธิตาม PDPA สามารถติดต่อได้ที่:
              </p>
              <ul>
                <li>อีเมล: phaiboonaia@gmail.com</li>
                <li>โทรศัพท์: 096-249-2611</li>
              </ul>
            </Section>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}

function Section({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-xl sm:text-2xl font-bold text-aia-slate mb-3">
        {title}
      </h2>
      <div className="text-aia-gray leading-relaxed space-y-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_a]:underline-offset-2 hover:[&_a]:underline [&_strong]:text-aia-slate">
        {children}
      </div>
    </section>
  );
}
