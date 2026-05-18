# Phaiboon Pilachai — AIA Insurance Agent Landing Page

A high-conversion, mobile-first lead-generation landing page built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

Designed for **Phaiboon Pilachai**, a professional AIA insurance agent in Thailand. Goal: build trust, showcase expertise, and convert visitors into leads via LINE OA or the contact form.

---

## ✨ Features

- **Modular React components** — `Hero`, `About`, `Products`, `ProductCard`, `WhyChoose`, `Testimonials`, `ContactForm`, `Footer`, `Navbar`
- **AIA brand palette** — primary red `#D31145`, clean white, dark slate
- **Thai/English typography** via Google Font *Prompt*
- **Subtle Framer Motion** fade/slide-up animations
- **Full SEO** — metadata, OpenGraph, Twitter card, robots.txt, sitemap
- **Lead capture** — `/api/lead` route accepts form submissions and optionally forwards to any webhook
- **100% mobile-responsive** with sticky header and mobile drawer
- **Accessible** — semantic landmarks, ARIA labels, focus rings

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. (Optional) configure a webhook for lead forwarding
cp .env.example .env.local
# then edit LEAD_WEBHOOK_URL

# 3. Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
.
├── app/
│   ├── layout.tsx           # Root layout, SEO metadata, font setup
│   ├── page.tsx             # Main landing page (composes all sections)
│   ├── globals.css          # Tailwind + custom component classes
│   ├── sitemap.ts           # Auto-generated sitemap.xml
│   └── api/
│       └── lead/
│           └── route.ts     # Lead submission endpoint
├── components/
│   ├── Navbar.tsx           # Sticky responsive nav with mobile drawer
│   ├── Hero.tsx             # Headline + CTA + profile photo
│   ├── About.tsx            # Agent intro + credentials
│   ├── Products.tsx         # Grid wrapper
│   ├── ProductCard.tsx      # Reusable insurance product card
│   ├── WhyChoose.tsx        # 4 reasons to choose this agent
│   ├── Testimonials.tsx     # Social proof
│   ├── ContactForm.tsx      # Lead form + LINE QR + phone/email
│   └── Footer.tsx           # License info + social links
├── public/
│   ├── profile.jpg          # ⚠️ ADD YOUR PHOTO HERE (replace placeholder)
│   ├── profile-placeholder.svg
│   └── robots.txt
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
└── package.json
```

---

## 🖼 Replace the Profile Photo

Save your professional photo as **`/public/profile.jpg`** (recommended 600×800 portrait or 1200×1200). The `Hero` component references `/profile.jpg`. While you're testing, the placeholder SVG at `/profile-placeholder.svg` is available — just rename it or update the `src` in `components/Hero.tsx`.

---

## 🔗 Connect Your LINE OA & Contact Info

Search the codebase for these placeholders and replace with your real values:

| Placeholder | Where | Replace with |
|---|---|---|
| `https://lin.ee/your-line-oa` | `Hero.tsx`, `ContactForm.tsx`, `Footer.tsx` | Your LINE OA invite link |
| `08X-XXX-XXXX` / `tel:+66800000000` | `ContactForm.tsx` | Your real phone number |
| `เลขที่ XXXXXXXXX` (license) / `รหัสตัวแทน AIA XXXXXX` | `Footer.tsx` | Your real license + agent code |
| LINE QR image | `ContactForm.tsx` (inside the red card) | `<Image src="/line-qr.png" ... />` |
| `https://facebook.com/your-page`, `https://instagram.com/your-ig` | `Footer.tsx` | Your social URLs |
| `https://phaiboon-aia.com` | `app/layout.tsx`, `app/sitemap.ts` | Your real production domain |

---

## 📬 Lead Form Webhook

The form submits to `/api/lead`. By default, payloads are logged to the server console. To forward leads to your own system:

```bash
# .env.local
LEAD_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/XXXXXX/YYYYYY/
```

Compatible with **Zapier, Make.com, n8n, Slack, Discord, Notion** webhooks, or any custom endpoint. The payload shape is:

```json
{
  "name": "...",
  "phone": "...",
  "email": "...",
  "interest": "ประกันสุขภาพเหมาจ่าย",
  "message": "...",
  "submittedAt": "2026-05-16T...Z",
  "source": "phaiboon-aia-landing"
}
```

---

## 🌐 Deploy

Easiest: push to GitHub and import to **Vercel** (zero config). Don't forget to set `LEAD_WEBHOOK_URL` in the Vercel project's Environment Variables.

```bash
npx vercel --prod
```

---

## 🧑‍💼 Credits

- Brand colors: AIA Thailand
- Icons: [Lucide](https://lucide.dev)
- Fonts: [Prompt](https://fonts.google.com/specimen/Prompt) (Google Fonts)
- Reference: [aia.co.th/th](https://www.aia.co.th/th)

> *This is the personal website of an AIA insurance agent. It is not an official AIA Thailand property.*
"# AIA" 
