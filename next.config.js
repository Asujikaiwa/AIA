/** @type {import('next').NextConfig} */

// Content Security Policy — เข้มงวด ไม่ให้รัน inline script จากผู้อื่น
// 'unsafe-inline' จำเป็นต้องมีสำหรับ Next.js (next/script + framer-motion style)
// 'self' = origin เดียวกัน; whitelist เฉพาะที่จำเป็น
const isProd = process.env.NODE_ENV === "production";

const cspDirectives = [
  "default-src 'self'",
  // scripts: self + next + GA (โหลดเมื่อ user accept cookie)
  `script-src 'self' 'unsafe-inline' ${isProd ? "" : "'unsafe-eval'"} https://www.googletagmanager.com`.trim(),
  // styles: inline จำเป็น (Tailwind generates atomic + Next inserts inline)
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  // images: รวม profile, license, brochures thumbnails (อาจอยู่บน R2)
  "img-src 'self' data: blob: https://*.r2.dev https://*.r2.cloudflarestorage.com",
  // fonts: Google Fonts (Prompt) + self
  "font-src 'self' data: https://fonts.gstatic.com",
  // XHR/fetch: self + GA + LINE API + R2
  "connect-src 'self' https://www.google-analytics.com https://api.line.me https://*.r2.dev https://*.r2.cloudflarestorage.com",
  // frames: ไม่ให้ใครฝัง iframe เลย
  "frame-src 'none'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  // forms post: ไปได้แค่เว็บตัวเอง
  "form-action 'self'",
  // อัปเกรด HTTP → HTTPS อัตโนมัติ
  "upgrade-insecure-requests"
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: cspDirectives },
  // บังคับ HTTPS 2 ปี + รวม subdomain + preload list
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload"
  },
  // ห้ามฝัง iframe (clickjacking)
  { key: "X-Frame-Options", value: "DENY" },
  // ห้าม sniff MIME type
  { key: "X-Content-Type-Options", value: "nosniff" },
  // ปิดข้อมูล referrer เมื่อ user ออกจากเว็บ
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // ปิดสิทธิ์เบราว์เซอร์ที่เว็บไม่ได้ใช้
  {
    key: "Permissions-Policy",
    value: [
      "accelerometer=()",
      "ambient-light-sensor=()",
      "autoplay=()",
      "battery=()",
      "camera=()",
      "display-capture=()",
      "document-domain=()",
      "encrypted-media=()",
      "fullscreen=(self)",
      "geolocation=()",
      "gyroscope=()",
      "magnetometer=()",
      "microphone=()",
      "midi=()",
      "payment=()",
      "picture-in-picture=()",
      "publickey-credentials-get=()",
      "screen-wake-lock=()",
      "sync-xhr=()",
      "usb=()",
      "web-share=(self)",
      "xr-spatial-tracking=()"
    ].join(", ")
  },
  // ปิดข้อมูล cross-origin opener (Spectre mitigation)
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  // resource ของเว็บใช้ได้แค่ origin เดียวกัน
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  // ปิด X-DNS-Prefetch (ลด tracking surface)
  { key: "X-DNS-Prefetch-Control", value: "off" },
  // ป้องกัน XSS รุ่นเก่า (browsers ใหม่ใช้ CSP แทน)
  { key: "X-XSS-Protection", value: "0" }
];

const nextConfig = {
  reactStrictMode: true,
  // ซ่อน X-Powered-By: Next.js (ลด fingerprinting)
  poweredByHeader: false,
  // ป้องกัน MIME confusion + กรอง output ก่อน serve
  compress: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.r2.dev" },
      { protocol: "https", hostname: "**.r2.cloudflarestorage.com" },
      { protocol: "https", hostname: "**.aia.com" }
    ]
  },
  async headers() {
    return [
      {
        // ใช้ security headers กับทุก route
        source: "/:path*",
        headers: securityHeaders
      },
      {
        // PDF + thumbnail: cache 1 ปี (immutable)
        source: "/brochures/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable"
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;
