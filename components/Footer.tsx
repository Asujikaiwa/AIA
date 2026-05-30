"use client";

import { Facebook, Instagram, MessageCircle } from "lucide-react";
import { useT } from "./I18nProvider";

export default function Footer() {
  const t = useT();
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
                <p className="font-semibold text-white">Phaiboon Pilachai</p>
                <p className="text-xs text-gray-400">{t("nav.role")}</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-md">
              {t("footer.tagline")}
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
            <h4 className="font-semibold text-white mb-4">{t("footer.menu")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/#about" className="hover:text-aia-red transition-colors">
                  {t("nav.about")}
                </a>
              </li>
              <li>
                <a href="/#products" className="hover:text-aia-red transition-colors">
                  {t("nav.products")}
                </a>
              </li>
              <li>
                <a href="/brochures" className="hover:text-aia-red transition-colors">
                  {t("nav.brochures")}
                </a>
              </li>
              <li>
                <a href="/recommend" className="hover:text-aia-red transition-colors">
                  {t("nav.recommend")}
                </a>
              </li>
              <li>
                <a href="/#faq" className="hover:text-aia-red transition-colors">
                  {t("nav.faq")}
                </a>
              </li>
              <li>
                <a href="/#contact" className="hover:text-aia-red transition-colors">
                  {t("nav.contact")}
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-aia-red transition-colors">
                  {t("footer.privacy")}
                </a>
              </li>
            </ul>
          </div>

          {/* License info */}
          <div>
            <h4 className="font-semibold text-white mb-4">{t("footer.agentInfo")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                {t("footer.license")}
                <br />
                <span className="text-gray-400">
                  {t("footer.licenseNoPrefix")} 6901006784
                </span>
              </li>
              <li>
                {t("footer.affiliation")}
                <br />
                <span className="text-gray-400">
                  {t("about.license.companyName")}
                </span>
              </li>
              <li className="pt-2">
                <a
                  href="mailto:phaiboonaia@gmail.com"
                  className="hover:text-aia-red transition-colors"
                >
                  phaiboonaia@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+66962492611"
                  className="hover:text-aia-red transition-colors"
                >
                  096-249-2611
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <p>© {year} Phaiboon Pilachai. {t("footer.disclaimer")}</p>
          <p>
            <a
              href="https://www.aia.co.th/th"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-aia-red transition-colors"
            >
              {t("footer.officialLink")}
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
