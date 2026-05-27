# ============================================================================
# คัดลอกไฟล์โบรชัวร์ AIA จาก Google Drive เข้าโปรเจกต์ (public/brochures)
# วิธีใช้:
#   1) เปิด PowerShell ในโฟลเดอร์โปรเจกต์ (Web AIA)
#   2) รันคำสั่ง:  powershell -ExecutionPolicy Bypass -File .\copy-brochures.ps1
# สคริปต์จะค้นหาไฟล์จากทั้ง 3 โฟลเดอร์ใน Google Drive และคัดลอก
# พร้อมเปลี่ยนชื่อเป็น slug ที่เว็บใช้
# ============================================================================

$ErrorActionPreference = "Stop"

$sourceRoots = @(
  "G:\My Drive\ประกันAIA\Brochure",
  "G:\My Drive\ประกันAIA\เเบบประกันภัยหลัก",
  "G:\My Drive\ประกันAIA\เเบบประกันอุบัติเหตุ"
)

$dst = Join-Path $PSScriptRoot "public\brochures"
New-Item -ItemType Directory -Force -Path $dst | Out-Null

# map: ชื่อไฟล์ต้นทาง (basename) = ชื่อไฟล์ปลายทาง (slug)
$map = [ordered]@{
  # ── Unit Linked ────────────────────────────────────────────────
  "Brochure_AIA_Elite_Income_Prestige_TH_20260401.pdf"      = "elite-income-prestige.pdf"
  "TH_AIAWealthMax_20260120.pdf"                            = "wealthmax.pdf"
  "TH_AIAWealthMaxPrestige_20260120.pdf"                    = "wealthmax-prestige.pdf"
  "TH_AIAExclusiveWealthPrestige(UnitLinked)_20260115.pdf"  = "exclusive-wealth-prestige.pdf"
  "TH_AIAInfiniteWealthPrestige_20260420.pdf"               = "infinite-wealth-prestige.pdf"
  "TH_AIAInfiniteGiftPrestige(UnitLinked)_20260115.pdf"     = "infinite-gift-prestige.pdf"
  "TH_AIA20PayLink(UnitLinked)_20260115.pdf"                = "20pay-link.pdf"
  "TH_AIA20PayLinkPrestige(UnitLinked)_20260115.pdf"        = "20pay-link-prestige.pdf"
  "TH_AIAIssaraPlus_20260120.pdf"                           = "issara-plus.pdf"
  "TH_AIAIssaraPrestigePlus(UnitLinked)_20260115.pdf"       = "issara-prestige-plus.pdf"
  "TH_AIASmartWealth_20260120.pdf"                          = "smart-wealth.pdf"
  "TH_AIASmartWealthPrestige_20260120.pdf"                  = "smart-wealth-prestige.pdf"
  "TH_AIASmartSelect(Unit+Linked)_20260115.pdf"             = "smart-select.pdf"
  "TH_AIASmartSelectPrestige(Unit+Linked)_20260115.pdf"     = "smart-select-prestige.pdf"

  # ── Riders / UDR ───────────────────────────────────────────────
  "AIAHealthHappy-UDR_COR_20250905_2.pdf"                   = "health-happy.pdf"
  "AHC_UDR_20260401.pdf"                                    = "ahc.pdf"
  "HBX_UDR_20260401.pdf"                                    = "hbx.pdf"
  "MPCI_Plus_UDR_20260401.pdf"                              = "mpci-plus.pdf"
  "CICare_UDR_20260401.pdf"                                 = "ci-care.pdf"
  "CI_Plus_UDR_20260401.pdf"                                = "ci-plus.pdf"
  "CI_UDR_20260401.pdf"                                     = "ci.pdf"
  "CareforCancer_UDR_20260401.pdf"                          = "care-for-cancer.pdf"

  # ── Whole Life ─────────────────────────────────────────────────
  "Brochure_AIA_Legacy_Prestige(New)_20250220.pdf"          = "legacy-prestige.pdf"
  "Brochure_AIA_Legacy_Prestige_Plus(New)_20250220.pdf"     = "legacy-prestige-plus.pdf"
  "Brochure_AIA_Legacy_Prestige_Protection(New)_20250220.pdf" = "legacy-prestige-protection.pdf"
  "Brochure_AIA_Protection65_TH_20240425.pdf"               = "protection-65.pdf"
  "AIA+Pay+Life+Plus+(Non+Par)_16Feb2023_20230217.pdf"      = "pay-life-plus.pdf"
  "Brochure+AIA+10&15+Pay+Life+(Non+Par)_18Jan2023_Final_re_20230127.pdf" = "10-15-pay-life.pdf"
  "Brochure+AIA+20Pay+Life+(Non+Par)_18Jan2023_Final_re_20230127.pdf"     = "20-pay-life.pdf"
  "Brochure+AIA+Senior+Happy_18Jan2023_Final_re_20230127.pdf" = "senior-happy.pdf"

  # ── CI Whole Life ──────────────────────────────────────────────
  "Brochure_AIACIProCare_2July2024_20240704.pdf"            = "ci-procare.pdf"
  "Brochure+AIA+CI+SuperCare_18Jan2023_Final_20230127.pdf"  = "ci-supercare.pdf"
  "Brochure+AIA+CI+SuperCare+Prestige_1Feb2023_Final_20230202.pdf" = "ci-supercare-prestige.pdf"

  # ── Endowment / Savings ────────────────────────────────────────
  "AIA_SavingSure_Brochure_20230921.pdf"                    = "savingsure.pdf"
  "Brochure+AIA+Excellent+(Non+Par)_27Jan2023_Final_re_20230127.pdf" = "excellent.pdf"
  "Brochure+AIA+Endowment+15Pay25+(Non+Par)_27Jan2023_Final_re_20230127.pdf" = "endowment-15pay25.pdf"
  "Brochure+5Pay10+(Non+Par)_27Jan2023.pdf_Final_re_20230127.pdf" = "5pay10.pdf"

  # ── Annuity ────────────────────────────────────────────────────
  "Brochure_TH_AIA_Annuity_Sure_20250901.pdf"               = "annuity-sure.pdf"
  "Brochure+AIA+Annuity+Fix_18Jan2023_Final_20230127.pdf"   = "annuity-fix.pdf"

  # ── Vitality ───────────────────────────────────────────────────
  "AIAVitalityBrochure_RemovedHSandUDR_TH_20260410.pdf"     = "vitality.pdf"
  "BROCHURE_Vitality_V70_2025(TH)_20250925.pdf"             = "vitality-v70.pdf"
  "BROCHURE_Vitality_V80_2025(TH)_20250925.pdf"             = "vitality-v80.pdf"

  # ── Term ───────────────────────────────────────────────────────
  "Term_Premuim_20180622.pdf"                               = "term-premium.pdf"
  "Term80_Premuim_20200918.pdf"                             = "term80-premium.pdf"

  # ── Accident: PA Personal ─────────────────────────────────────
  "AIA_PA_Brochure_A5_2026_TH_20260302.pdf"                 = "pa.pdf"

  # ── Accident: High Risk ────────────────────────────────────────
  "AIA_PA_HighRiskOccSpecial_16Feb2023.pdf"                 = "pa-high-risk.pdf"

  # ── Accident: Worksite Marketing ──────────────────────────────
  "WSM_Brochure_PA_Plus_Month_Nov25_20260205.pdf"           = "wsm-pa-plus-month.pdf"
  "02WSM+Brochure_PA+Safe+-+Month_16Feb2023.pdf"            = "wsm-pa-safe-month.pdf"

  # ── Accident: Micro Insurance ─────────────────────────────────
  "AIA_PA_Brochure_Micro[Full]_20260205.pdf"                = "pa-micro.pdf"
  "Micro100_Contract_20180423.pdf"                          = "micro100.pdf"
  "PAMicro200ContractSummary.pdf"                           = "micro200.pdf"
  "Micro300_Contract.pdf"                                   = "micro300.pdf"
}

# Build an index of all PDFs under the source roots once
Write-Host "กำลังสำรวจไฟล์ใน Google Drive (อาจช้าหน่อยครั้งแรก)..." -ForegroundColor Cyan
$index = @{}
foreach ($root in $sourceRoots) {
  if (-not (Test-Path -LiteralPath $root)) {
    Write-Host "  ⚠ ไม่พบโฟลเดอร์: $root" -ForegroundColor Yellow
    continue
  }
  Get-ChildItem -LiteralPath $root -Recurse -Filter *.pdf -File -ErrorAction SilentlyContinue |
    ForEach-Object {
      # เก็บอันแรกที่เจอ (ถ้าชื่อซ้ำ)
      if (-not $index.ContainsKey($_.Name)) {
        $index[$_.Name] = $_.FullName
      }
    }
}
Write-Host ("พบไฟล์ PDF ทั้งหมด {0} ไฟล์ในแหล่งข้อมูล" -f $index.Count) -ForegroundColor Cyan
Write-Host ""

$ok      = 0
$missing = @()

foreach ($srcName in $map.Keys) {
  $dstName = $map[$srcName]
  if ($index.ContainsKey($srcName)) {
    $from = $index[$srcName]
    $to   = Join-Path $dst $dstName
    Copy-Item -LiteralPath $from -Destination $to -Force
    Write-Host ("[OK]   {0,-25} <- {1}" -f $dstName, $srcName) -ForegroundColor Green
    $ok++
  } else {
    Write-Host ("[MISS] {0}" -f $srcName) -ForegroundColor Yellow
    $missing += $srcName
  }
}

Write-Host ""
Write-Host ("คัดลอกสำเร็จ {0}/{1} ไฟล์" -f $ok, $map.Count) -ForegroundColor Cyan
if ($missing.Count -gt 0) {
  Write-Host ""
  Write-Host "ไฟล์ที่หาไม่เจอ (ตรวจชื่อไฟล์ในโฟลเดอร์ Google Drive):" -ForegroundColor Yellow
  $missing | ForEach-Object { Write-Host ("  - {0}" -f $_) }
}
Write-Host ""
Write-Host "เสร็จแล้ว! เปิดเว็บที่ /brochures เพื่อดูผลลัพธ์" -ForegroundColor Green
