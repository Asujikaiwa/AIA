# ============================================================================
# Upload PDFs + thumbnails ขึ้น Cloudflare R2 (หรือ S3-compatible storage อื่น)
# ----------------------------------------------------------------------------
# วิธีใช้:
#   1) ติดตั้ง AWS CLI:  https://aws.amazon.com/cli/
#   2) สร้าง R2 bucket + API token ที่ https://dash.cloudflare.com → R2
#   3) ตั้ง env vars ใน PowerShell session นี้:
#        $env:AWS_ACCESS_KEY_ID = "R2_ACCESS_KEY"
#        $env:AWS_SECRET_ACCESS_KEY = "R2_SECRET_KEY"
#        $env:R2_ACCOUNT_ID = "your-cloudflare-account-id"
#        $env:R2_BUCKET = "phaiboon-aia-brochures"
#   4) รัน:  powershell -ExecutionPolicy Bypass -File .\upload-to-r2.ps1
#   5) นำ public URL ที่ได้ (รูปแบบ https://pub-xxxx.r2.dev) ไปใส่ใน .env:
#        NEXT_PUBLIC_BROCHURE_CDN=https://pub-xxxx.r2.dev
#   6) เปิด public access ที่ Cloudflare → R2 → Bucket → Settings → "Public R2.dev Bucket"
#
# ใช้กับ AWS S3 / Backblaze B2 ก็ได้ — แค่เปลี่ยน endpoint URL ใน $endpoint
# ============================================================================

$ErrorActionPreference = "Stop"

# ตรวจสอบ env vars
foreach ($v in @("AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY", "R2_ACCOUNT_ID", "R2_BUCKET")) {
  if ([string]::IsNullOrWhiteSpace([Environment]::GetEnvironmentVariable($v, "Process"))) {
    Write-Host "❌ ไม่พบ env var: $v" -ForegroundColor Red
    Write-Host "โปรดตั้งค่าก่อน เช่น: `$env:$v = '...'" -ForegroundColor Yellow
    exit 1
  }
}

$bucket   = $env:R2_BUCKET
$endpoint = "https://$($env:R2_ACCOUNT_ID).r2.cloudflarestorage.com"
$srcDir   = Join-Path $PSScriptRoot "public\brochures"

if (-not (Test-Path $srcDir)) {
  Write-Host "❌ ไม่พบโฟลเดอร์ต้นทาง: $srcDir" -ForegroundColor Red
  exit 1
}

Write-Host "📤 กำลังอัปโหลดไปยัง bucket: $bucket" -ForegroundColor Cyan
Write-Host "    endpoint: $endpoint" -ForegroundColor Gray
Write-Host ""

# Sync ไฟล์ทั้งหมด (ไม่ลบไฟล์เก่าใน bucket)
# - PDF: Cache-Control 1 ปี + content-type
# - JPG thumb: Cache-Control 1 ปี
aws s3 sync $srcDir "s3://$bucket/" `
  --endpoint-url $endpoint `
  --exclude "*" `
  --include "*.pdf" `
  --content-type "application/pdf" `
  --cache-control "public, max-age=31536000, immutable" `
  --acl public-read

aws s3 sync (Join-Path $srcDir "thumbs") "s3://$bucket/thumbs/" `
  --endpoint-url $endpoint `
  --exclude "*" `
  --include "*.jpg" `
  --content-type "image/jpeg" `
  --cache-control "public, max-age=31536000, immutable" `
  --acl public-read

Write-Host ""
Write-Host "✅ เสร็จแล้ว!" -ForegroundColor Green
Write-Host ""
Write-Host "ขั้นตอนต่อไป:" -ForegroundColor Cyan
Write-Host "  1. ไปที่ Cloudflare R2 → Bucket → Settings"
Write-Host "  2. เปิด 'Public R2.dev Bucket' (เพื่อให้ public อ่านได้ฟรี)"
Write-Host "  3. Copy public URL (รูปแบบ: https://pub-XXXXXXXX.r2.dev)"
Write-Host "  4. ใส่ใน Vercel → Project Settings → Environment Variables:"
Write-Host "       NEXT_PUBLIC_BROCHURE_CDN = https://pub-XXXXXXXX.r2.dev" -ForegroundColor Yellow
Write-Host "  5. Redeploy"
Write-Host ""
Write-Host "หลังจากนั้น เว็บจะดึง PDF/thumbnail จาก R2 แทน /public/brochures/"
Write-Host "และคุณสามารถลบโฟลเดอร์ public/brochures/ ออกจาก repo ได้ (ประหยัดพื้นที่ 160 MB)"
