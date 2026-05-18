import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";

const prompt = Prompt({
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-prompt",
  display: "swap"
});

const siteUrl = "https://phaiboon-aia.com";
const siteName = "Phaiboon Pilachai | ตัวแทนประกัน AIA มืออาชีพ";
const siteDescription =
  "ปรึกษาวางแผนประกันสุขภาพ ประกันชีวิต โรคร้ายแรง และวางแผนภาษีกับ คุณไพบูลย์ พิลาชัย ตัวแทน AIA — บริการครบวงจร ดูแลใกล้ชิด ช่วยเคลมรวดเร็ว";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: "%s | Phaiboon Pilachai - AIA"
  },
  description: siteDescription,
  keywords: [
    "ประกันสุขภาพ",
    "ประกันชีวิต",
    "AIA",
    "ตัวแทนประกัน AIA",
    "ประกันโรคร้ายแรง",
    "ลดหย่อนภาษี",
    "วางแผนการเงิน",
    "Phaiboon Pilachai",
    "ไพบูลย์ พิลาชัย"
  ],
  authors: [{ name: "Phaiboon Pilachai" }],
  creator: "Phaiboon Pilachai",
  openGraph: {
    type: "website",
    locale: "th_TH",
    url: siteUrl,
    siteName,
    title: siteName,
    description: siteDescription,
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Phaiboon Pilachai - AIA Insurance Agent"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: ["/profile.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className={prompt.variable}>
      <body className="font-sans antialiased bg-white text-aia-slate">
        {children}
      </body>
    </html>
  );
}
