import { Facebook, Instagram, MessageCircle } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-aia-slate text-gray-300">
      <div className="section-container py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-lg bg-aia-red text-white flex items-center justify-center font-bold">
                AIA
              </div>
              <div>
                <p className="font-semibold text-white">
                  Phaiboon Pilachai
                </p>
                <p className="text-xs text-gray-400">
                  Insurance Agent | AIA Thailand
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-md">
              ที่ปรึกษาด้านประกันชีวิตและสุขภาพ
              พร้อมดูแลคุณและครอบครัวอย่างจริงใจ — เพราะ
              <em className="text-aia-red not-italic">
                {" "}
                ประกันที่ดี
              </em>{" "}
              ไม่ใช่แค่กรมธรรม์ แต่คือคนที่อยู่ข้างคุณตลอดทาง
            </p>

            <div className="flex items-center gap-3 mt-5">
              <SocialLink
                href="https://lin.ee/your-line-oa"
                label="LINE Official"
              >
                <MessageCircle size={18} />
              </SocialLink>
              <SocialLink
                href="https://facebook.com/your-page"
                label="Facebook"
              >
                <Facebook size={18} />
              </SocialLink>
              <SocialLink
                href="https://instagram.com/your-ig"
                label="Instagram"
              >
                <Instagram size={18} />
              </SocialLink>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold text-white mb-4">เมนู</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#about"
                  className="hover:text-aia-red transition-colors"
                >
                  เกี่ยวกับฉัน
                </a>
              </li>
              <li>
                <a
                  href="#products"
                  className="hover:text-aia-red transition-colors"
                >
                  ผลิตภัณฑ์ประกัน
                </a>
              </li>
              <li>
                <a
                  href="#why-me"
                  className="hover:text-aia-red transition-colors"
                >
                  ทำไมต้องเลือกฉัน
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-aia-red transition-colors"
                >
                  ติดต่อปรึกษา
                </a>
              </li>
            </ul>
          </div>

          {/* License info */}
          <div>
            <h4 className="font-semibold text-white mb-4">ข้อมูลตัวแทน</h4>
            <ul className="space-y-2 text-sm">
              <li>
                ใบอนุญาตตัวแทน คปภ.
                <br />
                <span className="text-gray-400">เลขที่ XXXXXXXXX</span>
              </li>
              <li>
                รหัสตัวแทน AIA
                <br />
                <span className="text-gray-400">XXXXXX</span>
              </li>
              <li className="pt-2">
                <a
                  href="mailto:phaiboonjaae@gmail.com"
                  className="hover:text-aia-red transition-colors"
                >
                  phaiboonjaae@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <p>
            © {year} Phaiboon Pilachai. สงวนลิขสิทธิ์ — เว็บไซต์ส่วนตัวของตัวแทน
            ไม่ใช่เว็บไซต์ทางการของ AIA
          </p>
          <p>
            <a
              href="https://www.aia.co.th/th"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-aia-red transition-colors"
            >
              ข้อมูลผลิตภัณฑ์อย่างเป็นทางการ → AIA.co.th
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-9 h-9 rounded-full bg-white/10 hover:bg-aia-red flex items-center justify-center transition-colors"
    >
      {children}
    </a>
  );
}
