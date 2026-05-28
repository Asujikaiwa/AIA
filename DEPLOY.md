# คู่มือ Deploy เว็บขึ้น Vercel

ใช้ Vercel (ฟรีสำหรับ Next.js) — deploy ง่ายที่สุด ใช้เวลา ~15 นาที

## ขั้นตอนสั้นๆ

1. **เตรียม GitHub repo** (push code ขึ้น)
2. **สมัคร Vercel** + เชื่อม GitHub
3. **Import โปรเจกต์** + ใส่ env vars
4. **Deploy** (กดปุ่มเดียว)
5. **ตั้ง custom domain** (ถ้ามี)

---

## 1. Push code ขึ้น GitHub

ถ้ายังไม่มี repo:

```powershell
cd "C:\Users\Nice\OneDrive\Documents\Claude\Projects\Web AIA"

# สร้าง local repo (ถ้ายังไม่มี)
git init
git add .
git commit -m "Initial commit"

# สร้าง repo ใหม่บน https://github.com/new (ตั้งเป็น Private ก็ได้)
# แล้ว push
git remote add origin https://github.com/<your-username>/phaiboon-aia.git
git branch -M main
git push -u origin main
```

> **⚠ ก่อน push** ตรวจว่า `.gitignore` ครอบ `.env*.local` และไฟล์ลับอื่นๆ ครบแล้ว
> (ในโปรเจกต์นี้มีให้แล้ว)

---

## 2. Deploy บน Vercel

1. ไปที่ <https://vercel.com/signup> สมัครด้วย GitHub
2. กด **"Add New… → Project"**
3. เลือก repo ที่เพิ่ง push
4. Vercel จะตรวจเจอ Next.js อัตโนมัติ — กด **Deploy** ได้เลย
5. รอ ~2-3 นาที จะได้ URL ชั่วคราว เช่น `phaiboon-aia.vercel.app`

---

## 3. ใส่ Environment Variables

ไปที่ **Project Settings → Environment Variables** เพิ่มทีละตัว:

| Name                       | ตัวอย่างค่า                | คำอธิบาย                                  |
| -------------------------- | -------------------------- | ----------------------------------------- |
| `LEAD_WEBHOOK_URL`         | `https://hook.eu1.make.com/...` | ที่อยู่รับ lead form (Make/Zapier/n8n) — ดูคำสั่งด้านล่าง |
| `NEXT_PUBLIC_GA_ID`        | `G-XXXXXXXXXX`             | Google Analytics 4 Measurement ID         |

> หลังเพิ่ม env แล้วต้อง **Redeploy** ครั้งหนึ่งให้ค่าใหม่มีผล

### วิธีตั้ง LEAD_WEBHOOK_URL

เลือก 1 บริการ:

- **Make.com** (ฟรี 1,000 ops/เดือน) — สร้าง scenario เริ่มจาก "Webhook → Custom webhook" → copy URL มาใส่
- **Zapier** — Zap "Webhooks by Zapier (Catch Hook)" → copy URL
- **n8n self-hosted** — workflow trigger "Webhook"
- **Discord** — สร้าง webhook ในช่องของคุณ ใส่ URL ได้เลย (ส่งทันที)
- **Google Sheets** — ผ่าน Apps Script web app

### วิธีหา GA Measurement ID

1. ไปที่ <https://analytics.google.com>
2. Admin → Data Streams → Web → กด "Add stream" → ใส่ URL เว็บ
3. คัดลอก **Measurement ID** (รูปแบบ `G-XXXXXXXXXX`)

> GA จะ**โหลดเฉพาะเมื่อผู้ใช้กดยอมรับคุกกี้** (เคารพ PDPA)

---

## 4. ตั้ง Custom Domain (ถ้ามี)

1. ซื้อโดเมน เช่นที่ Namecheap, Cloudflare, GoDaddy
2. ใน Vercel → **Project Settings → Domains** → กด **"Add"** → กรอกโดเมน
3. Vercel จะบอก DNS record ที่ต้องตั้ง — copy ไปใส่ที่ผู้ให้บริการโดเมน
4. รอ DNS propagate (5 นาที - 24 ชม.)

จากนั้นแก้ `siteUrl` ใน `app/layout.tsx` และ `lib/seo.ts` ให้เป็นโดเมนจริง

---

## 5. หลัง deploy — เช็คลิสต์

- [ ] เปลี่ยน LINE OA URL จริงใน 4 ไฟล์ (StickyContact, Recommender, Hero, Footer)
- [ ] Submit sitemap ที่ Google Search Console: `https://<your-domain>/sitemap.xml`
- [ ] ทดสอบ JSON-LD: <https://search.google.com/test/rich-results> ใส่ URL
- [ ] เช็ค Lighthouse score (Vercel มีให้กดดูในแท็บ Analytics)
- [ ] ลองยิง lead form ทดสอบว่า webhook รับได้
- [ ] เช็ค GA realtime ว่าเก็บ traffic แล้ว

---

## เรื่องขนาด PDF (160 MB)

โบรชัวร์ 65 ไฟล์รวม ~160 MB อาจช้าครั้งแรกที่โหลด:

- **Vercel จะ cache อัตโนมัติ** หลังครั้งแรก (มี header `Cache-Control: immutable, max-age=1 year` ใน `vercel.json` แล้ว)
- ถ้าอยากเล็กลง: ใช้ Ghostscript บีบ
  ```powershell
  # ติดตั้ง: https://www.ghostscript.com/releases/gsdnld.html
  # บีบทุกไฟล์ใน public/brochures/
  Get-ChildItem public\brochures\*.pdf | ForEach-Object {
    gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook `
      -dNOPAUSE -dQUIET -dBATCH `
      -sOutputFile="public\brochures\compressed_$($_.Name)" $_.FullName
  }
  ```
  มักลดได้ 50-70% (ภาพอ่านได้ปกติ)

หรือย้าย PDF ไปเก็บที่ Cloudflare R2 / Google Cloud Storage แทน
(แก้ `lib/brochures.ts` ให้ใช้ absolute URL)

---

## ต้นทุน

- Vercel Hobby (ฟรี): bandwidth 100 GB/เดือน ใช้กับลูกค้าทั่วไปเหลือเฟือ
- โดเมน: ~300-500 บาท/ปี
- GA4 + Search Console: ฟรี
- Lead webhook (Make/Zapier ฟรีก็พอ)

รวม: ~500 บาท/ปี
