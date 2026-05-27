"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/#about", label: "เกี่ยวกับฉัน" },
  { href: "/#products", label: "ผลิตภัณฑ์" },
  { href: "/brochures", label: "โบรชัวร์" },
  { href: "/#why-me", label: "ทำไมต้องเลือกฉัน" },
  { href: "/#testimonials", label: "รีวิวลูกค้า" },
  { href: "/#contact", label: "ติดต่อ" }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="section-container flex items-center justify-between h-16 sm:h-20">
        <a href="/#hero" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-aia-red text-white flex items-center justify-center font-bold text-lg">
            AIA
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-semibold text-aia-slate leading-tight">
              Phaiboon Pilachai
            </div>
            <div className="text-xs text-aia-gray leading-tight">
              ตัวแทนประกัน AIA
            </div>
          </div>
        </a>

        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-aia-slate hover:text-aia-red transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="/#contact"
          className="hidden lg:inline-flex btn-primary !py-2 !px-5 !text-sm"
        >
          ปรึกษาฟรี
        </a>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 text-aia-slate"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <ul className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-aia-slate font-medium hover:text-aia-red"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/#contact"
                onClick={() => setOpen(false)}
                className="btn-primary w-full"
              >
                ปรึกษาฟรี
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
