# นโยบายความปลอดภัย & ชั้นป้องกันของเว็บ

สรุปสิ่งที่เว็บนี้ทำเพื่อกันการโจมตี + สิ่งที่ **คุณต้องทำเองตอน deploy**

---

## ⚠️ ด่วนที่สุด — ก่อนทำอย่างอื่น

ในเวอร์ชันก่อนหน้า `/api/lead/route.ts` มี **LINE_ACCESS_TOKEN เขียน hardcode** ในโค้ด ถ้าคุณเคย `git push` ขึ้น GitHub ไปแล้ว ให้ทำตามนี้ทันที:

1. ไปที่ <https://developers.line.biz> → channel → **Reissue Channel Access Token**
2. token เก่าจะใช้งานไม่ได้ทันที (ไม่ว่าใครจะคัดลอกไป)
3. ใส่ token ใหม่ใน **Vercel → Environment Variables** ในชื่อ `LINE_ACCESS_TOKEN`
4. (ถ้ามี user id) ใส่ `LINE_USER_ID` ด้วย
5. (ถ้า push แล้ว) ลบประวัติด้วย:
   ```powershell
   # ระวัง: rewrite history — ถ้ามีคนอื่น clone ต้องแจ้งให้ทำ git pull --rebase
   git filter-repo --invert-paths --path app/api/lead/route.ts
   git push origin --force --all
   ```

ตอนนี้ในโค้ด token อ่านจาก `process.env.LINE_ACCESS_TOKEN` แล้ว ไม่อยู่ในไฟล์ source

---

## ชั้นที่ 1 — HTTP Security Headers

ตั้งใน `next.config.js` ทุก route จะมี:

| Header | ค่า | กันอะไร |
| --- | --- | --- |
| `Content-Security-Policy` | strict policy (เฉพาะ self + GA + LINE API + R2) | XSS, data exfiltration, script injection |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | downgrade attack, ssl-stripping |
| `X-Frame-Options` | `DENY` | clickjacking (ใครเอาเว็บไปฝัง iframe) |
| `X-Content-Type-Options` | `nosniff` | MIME confusion |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | URL leak ตอนคลิกออก |
| `Permissions-Policy` | ปิด 25+ สิทธิ์เบราว์เซอร์ (camera, mic, geo, USB, ฯลฯ) | abuse สิทธิ์ |
| `Cross-Origin-Opener-Policy` | `same-origin` | Spectre side-channel |
| `Cross-Origin-Resource-Policy` | `same-origin` | resource hijack |

ส่วน Vercel CDN-level headers อยู่ใน `vercel.json` (HSTS + nosniff สำหรับ static files)

---

## ชั้นที่ 2 — API ป้องกัน (/api/lead)

`app/api/lead/route.ts` มีการป้องกัน 10 ชั้น:

1. **Method allowlist** — GET/PUT/DELETE/PATCH ตอบ 405 ทันที
2. **Content-Type check** — รับเฉพาะ `application/json` (ปฏิเสธ form-encoded)
3. **Body size limit** — สูงสุด 4 KB (ป้องกัน large payload DoS)
4. **Rate limit** — 5 ครั้ง / 10 นาที / IP (in-memory; production scale → Vercel KV/Upstash)
5. **IP detection** — เชื่อแค่ header ที่ Vercel/Cloudflare ตั้งเอง (กัน spoof)
6. **Honeypot field** (`website`) — ถ้า bot กรอก → ตอบ 200 ปลอม (ไม่บอกว่าโดนจับ)
7. **Timing check** — ถ้ากรอกเร็วกว่า 3 วินาที → ปฏิเสธเงียบ ๆ
8. **Input sanitize** — strip control chars + null byte, จำกัด length ทุก field
9. **Format validation** — phone (regex), email (regex), required fields
10. **No error leakage** — error จริงไป log; client เห็นเฉพาะข้อความทั่วไป
11. **Timeout** — LINE API call timeout 5 วินาที (ป้องกัน hang)
12. **No credentials/cookies** — fetch จากฟอร์มใช้ `credentials: omit` + `cache: no-store`

---

## ชั้นที่ 3 — Bot Protection

`components/ContactForm.tsx`:

- **Honeypot field** ซ่อนด้วย CSS (off-screen, `aria-hidden`, `tabIndex=-1`) — bot กรอกทุก field รวมถึงตัวนี้ → server ตรวจเจอ ปฏิเสธ
- **Form-start timestamp** — บันทึก `Date.now()` ตอน mount → ส่งไปกับ payload → server เช็คว่าผ่านไปแล้วกี่วินาที (ต่ำกว่า 3 วินาที = bot)
- **No client validation as security** — ทำแค่ UX; ทุกอย่าง re-validate ฝั่ง server

---

## ชั้นที่ 4 — กัน scraping + AI bot

`public/robots.txt`:

- Allow บอททั่วไป index เนื้อหา public
- Disallow `/api/`, `/_next/`
- **Block AI scrapers** ที่ดูดเนื้อหาไปฝึก LLM:
  GPTBot, ChatGPT-User, anthropic-ai, ClaudeBot, Claude-Web, Google-Extended,
  CCBot, PerplexityBot, Bytespider, ImagesiftBot, Omgilibot, FacebookBot

`public/.well-known/security.txt` — ตาม RFC 9116, ผู้พบช่องโหว่ติดต่อได้ทาง email

---

## ชั้นที่ 5 — ลด surface area

- `poweredByHeader: false` — ซ่อน `X-Powered-By: Next.js` (ลด fingerprint)
- ปิด `unsafe-eval` ใน CSP เฉพาะ production
- ไม่มี `dangerouslySetInnerHTML` ที่รับ user input (มีแค่ JSON-LD ที่ hardcode)
- ทุก external `<a target="_blank">` มี `rel="noopener noreferrer"`
- Next.js telemetry: `npm run telemetry-off` (ปิดส่ง analytics ไป Vercel)

---

## ชั้นที่ 6 — PDPA & ข้อมูล lead

- Cookie consent banner เคารพ choice ของ user
- Google Analytics โหลด**เฉพาะเมื่อ user accept** (ไม่โหลดถ้า reject)
- `anonymize_ip: true` ใน GA config (ลบ IP สุดท้ายของ user)
- IP ของ user ไม่ถูกเก็บถาวรในระบบ (ใช้แค่ rate limit ใน memory)
- Privacy Policy ครบ 10 หมวด ที่ `/privacy`

---

## เช็คลิสต์ก่อน deploy

```text
□ ไป LINE Developers → reissue Channel Access Token (ถ้าเคย commit code เก่า)
□ ตั้ง LINE_ACCESS_TOKEN ใน Vercel → Environment Variables
□ ตั้ง LINE_USER_ID ใน Vercel
□ ไม่มีไฟล์ .env, .env.local, .env.production อยู่ใน git (เช็คด้วย: git ls-files | grep env)
□ รัน: npm run build  → ผ่าน
□ รัน: npx tsc --noEmit  → ผ่าน
□ เปิด https://securityheaders.com → grade A หรือ A+
□ เปิด https://observatory.mozilla.org → grade A+
□ ทดสอบยิง lead form ทดสอบว่าได้รับใน LINE
□ ทดสอบ rate limit: ยิงฟอร์ม 6 ครั้งติด → ครั้งที่ 6 ควรได้ 429
□ ทดสอบ honeypot: เปิด DevTools → กรอก hidden field → ส่ง → ไม่ควรได้รับใน LINE
```

---

## สิ่งที่ยังควรเพิ่มในอนาคต (optional)

- **Vercel KV / Upstash Redis** สำหรับ rate limit ที่ persist ข้าม serverless instance
- **hCaptcha** หรือ **Cloudflare Turnstile** ตรง form (anti-bot ระดับสูงขึ้น)
- **Web Application Firewall (WAF)** จาก Vercel Pro หรือ Cloudflare
- **LINE webhook signature verification** ถ้าใช้ LINE replyToken แทน push
- **Sentry** หรือ error monitoring (มองเห็น attack pattern)
- **Dependabot / Renovate** อัปเดต dependencies อัตโนมัติ (Next.js 14.2.5 ปัจจุบันมี CVE)
- **Lock Next.js version** ให้ patch ล่าสุด: `npm install next@^14`

---

## รายงานช่องโหว่

พบช่องโหว่? ติดต่อ:
- 📧 phaiboonaia@gmail.com (เข้ารหัส PGP ถ้าต้องการ — แจ้งก่อน)
- ใน subject ใส่ `[SECURITY]` ผมจะตอบใน 48 ชั่วโมง
