// ข้อมูลโบรชัวร์ผลิตภัณฑ์ AIA สำหรับหน้า /brochures
// ไฟล์ PDF วางอยู่ที่ public/brochures/<file>
// รูปตัวอย่าง (ถ้าสร้างไว้) อยู่ที่ public/brochures/thumbs/<slug>.jpg

export type GroupId = "main" | "accident";

export type SubCategoryId =
  // main
  | "whole-life"
  | "ci-whole-life"
  | "endowment"
  | "annuity"
  | "term"
  | "unit-linked"
  | "rider"
  | "rider-handbook"
  | "vitality"
  // accident
  | "pa"
  | "pa-high-risk"
  | "pa-group"
  | "micro";

export type Brochure = {
  title: string;
  code: string;
  description: string;
  file: string;
  group: GroupId;
  subcategory: SubCategoryId;
  badge: string;
};

export type Group = {
  id: GroupId;
  label: string;
  eyebrow: string;
  description: string;
};

export type SubCategory = {
  id: SubCategoryId;
  label: string;
  group: GroupId;
};

export const groups: Group[] = [
  {
    id: "main",
    label: "แบบประกันหลัก",
    eyebrow: "Main Insurance",
    description:
      "ประกันชีวิตและสุขภาพหลักทุกรูปแบบ ทั้งตลอดชีพ สะสมทรัพย์ บำนาญ ยูนิตลิงค์ สัญญาเพิ่มเติม และ AIA Vitality"
  },
  {
    id: "accident",
    label: "แบบประกันอุบัติเหตุ",
    eyebrow: "Accident Insurance",
    description:
      "แผนคุ้มครองอุบัติเหตุ ทั้งส่วนบุคคล อาชีพเสี่ยงภัยพิเศษ แบบกลุ่ม และไมโครอินชัวรันส์"
  }
];

export const subCategories: SubCategory[] = [
  { id: "whole-life", label: "ประกันตลอดชีพ", group: "main" },
  { id: "ci-whole-life", label: "โรคร้ายแรงตลอดชีพ", group: "main" },
  { id: "endowment", label: "สะสมทรัพย์", group: "main" },
  { id: "annuity", label: "บำนาญ (ลดหย่อนภาษีได้)", group: "main" },
  { id: "term", label: "ประกันกำหนดระยะเวลา", group: "main" },
  { id: "unit-linked", label: "ยูนิตลิงค์ (ควบการลงทุน)", group: "main" },
  { id: "rider", label: "สัญญาเพิ่มเติมสุขภาพ/โรคร้าย", group: "main" },
  { id: "rider-handbook", label: "คู่มือสัญญาเพิ่มเติม", group: "main" },
  { id: "vitality", label: "AIA Vitality", group: "main" },
  { id: "pa", label: "อุบัติเหตุส่วนบุคคล (PA)", group: "accident" },
  { id: "pa-high-risk", label: "อาชีพเสี่ยงภัยพิเศษ", group: "accident" },
  { id: "pa-group", label: "ประกันกลุ่ม (Worksite)", group: "accident" },
  { id: "micro", label: "ไมโครอินชัวรันส์", group: "accident" }
];

export const brochures: Brochure[] = [
  // Whole Life
  { title: "AIA Legacy Prestige", code: "Legacy Prestige", description: "ประกันตลอดชีพระดับพรีเมียมเพื่อการส่งต่อมรดก ทุนประกันสูง วางแผนภาษีและส่งต่อความมั่งคั่งอย่างเป็นระบบ", file: "legacy-prestige.pdf", group: "main", subcategory: "whole-life", badge: "LP" },
  { title: "AIA Legacy Prestige Plus", code: "Legacy Prestige Plus", description: "เวอร์ชันพรีเมียมพลัสของ Legacy Prestige เพิ่มความยืดหยุ่นและสิทธิประโยชน์ในการส่งต่อมรดก", file: "legacy-prestige-plus.pdf", group: "main", subcategory: "whole-life", badge: "LPP" },
  { title: "AIA Legacy Prestige Protection", code: "Legacy Prestige Protection", description: "Legacy Prestige ที่เน้นความคุ้มครองชีวิตสูง เหมาะกับการวางแผนปกป้องครอบครัวระดับสูง", file: "legacy-prestige-protection.pdf", group: "main", subcategory: "whole-life", badge: "LPP" },
  { title: "AIA Protection 65", code: "Protection 65", description: "ประกันคุ้มครองชีวิตจนถึงอายุ 65 ปี เบี้ยประหยัด เหมาะกับการสร้างทุนประกันให้ครอบครัวในวัยทำงาน", file: "protection-65.pdf", group: "main", subcategory: "whole-life", badge: "P65" },
  { title: "AIA Pay Life Plus (Non Par)", code: "Pay Life Plus", description: "ประกันชีวิตตลอดชีพแบบไม่มีเงินปันผล เน้นเบี้ยคุ้มค่าและความคุ้มครองยาวนาน", file: "pay-life-plus.pdf", group: "main", subcategory: "whole-life", badge: "PLP" },
  { title: "AIA 10 & 15 Pay Life (Non Par)", code: "10/15 Pay Life", description: "ตลอดชีพชำระเบี้ย 10 หรือ 15 ปี เหมาะกับผู้ที่ต้องการจ่ายเบี้ยระยะสั้นแต่ได้ความคุ้มครองตลอดชีพ", file: "10-15-pay-life.pdf", group: "main", subcategory: "whole-life", badge: "10/15" },
  { title: "AIA 20 Pay Life (Non Par)", code: "20 Pay Life", description: "ตลอดชีพชำระเบี้ย 20 ปี ความคุ้มครองตลอดชีวิตด้วยภาระเบี้ยที่กำหนดระยะเวลาชัดเจน", file: "20-pay-life.pdf", group: "main", subcategory: "whole-life", badge: "20P" },
  { title: "AIA Senior Happy", code: "Senior Happy", description: "แบบประกันสำหรับผู้สูงอายุ สมัครง่ายไม่ต้องตรวจสุขภาพ มอบเงินก้อนเพื่อค่าใช้จ่ายในยามจำเป็น", file: "senior-happy.pdf", group: "main", subcategory: "whole-life", badge: "SH" },

  // CI Whole Life
  { title: "AIA CI ProCare", code: "CI ProCare", description: "ประกันโรคร้ายแรงตลอดชีพ ครอบคลุมหลายโรคและหลายระยะของโรค พร้อมเงินก้อนเมื่อเข้าเงื่อนไข", file: "ci-procare.pdf", group: "main", subcategory: "ci-whole-life", badge: "CIP" },
  { title: "AIA CI SuperCare", code: "CI SuperCare", description: "คุ้มครองโรคร้ายแรงระยะลุกลามและระยะต้น พร้อมความคุ้มครองชีวิตในกรมธรรม์เดียว", file: "ci-supercare.pdf", group: "main", subcategory: "ci-whole-life", badge: "CIS" },
  { title: "AIA CI SuperCare Prestige", code: "CI SuperCare Prestige", description: "เวอร์ชันพรีเมียมของ CI SuperCare ทุนประกันสูง รองรับการวางแผนรักษาโรคร้ายในระดับสูง", file: "ci-supercare-prestige.pdf", group: "main", subcategory: "ci-whole-life", badge: "CISP" },

  // Endowment
  { title: "AIA SavingSure", code: "SavingSure", description: "ประกันสะสมทรัพย์ ออมเงินอย่างมีวินัย พร้อมเงินคืนเมื่อครบกำหนดและความคุ้มครองชีวิต", file: "savingsure.pdf", group: "main", subcategory: "endowment", badge: "SS" },
  { title: "AIA Excellent (Non Par)", code: "Excellent", description: "สะสมทรัพย์แบบไม่มีเงินปันผล จ่ายเบี้ยสั้น รับเงินคืนตามแผน เหมาะกับเป้าหมายระยะกลาง", file: "excellent.pdf", group: "main", subcategory: "endowment", badge: "EXC" },
  { title: "AIA Endowment 15 Pay 25 (Non Par)", code: "Endowment 15Pay25", description: "สะสมทรัพย์ จ่ายเบี้ย 15 ปี คุ้มครอง 25 ปี รับเงินคืนระหว่างทางและก้อนสุดท้ายเมื่อครบกำหนด", file: "endowment-15pay25.pdf", group: "main", subcategory: "endowment", badge: "15/25" },
  { title: "AIA 5 Pay 10 (Non Par)", code: "5 Pay 10", description: "สะสมทรัพย์จ่ายเบี้ย 5 ปี คุ้มครอง 10 ปี เหมาะกับการออมระยะสั้นพร้อมความคุ้มครอง", file: "5pay10.pdf", group: "main", subcategory: "endowment", badge: "5/10" },

  // Annuity
  { title: "AIA Annuity Sure", code: "Annuity Sure", description: "ประกันบำนาญที่ลดหย่อนภาษีได้ รับเงินบำนาญสม่ำเสมอหลังเกษียณ วางแผนเงินใช้ในวัยเกษียณ", file: "annuity-sure.pdf", group: "main", subcategory: "annuity", badge: "AS" },
  { title: "AIA Annuity Fix", code: "Annuity Fix", description: "ประกันบำนาญแบบกำหนดงวดรับเงินบำนาญที่แน่นอน ลดหย่อนภาษีตามเงื่อนไขกรมสรรพากร", file: "annuity-fix.pdf", group: "main", subcategory: "annuity", badge: "AF" },

  // Term
  { title: "AIA Term (อัตราเบี้ยมาตรฐาน)", code: "Term", description: "เอกสารแสดงอัตราเบี้ยมาตรฐานรายปีสำหรับแบบประกันกำหนดระยะเวลา (Term) เน้นความคุ้มครองชีวิตเฉพาะช่วง", file: "term-premium.pdf", group: "main", subcategory: "term", badge: "TM" },
  { title: "AIA Term 80 (อัตราเบี้ยมาตรฐาน)", code: "Term 80", description: "เอกสารอัตราเบี้ยสำหรับ Term ที่คุ้มครองยาวถึงอายุ 80 ปี เหมาะกับการคุ้มครองภาระทางการเงินระยะยาว", file: "term80-premium.pdf", group: "main", subcategory: "term", badge: "T80" },

  // Unit Linked
  { title: "AIA Elite Income Prestige", code: "Elite Income Prestige", description: "สะสมทรัพย์ระดับพรีเมียม เน้นรับเงินคืนสม่ำเสมอ พร้อมความคุ้มครองชีวิต เหมาะกับการสร้างกระแสเงินสด", file: "elite-income-prestige.pdf", group: "main", subcategory: "unit-linked", badge: "EIP" },
  { title: "AIA WealthMax", code: "WealthMax", description: "ประกันชีวิตเพื่อสะสมทรัพย์และส่งต่อความมั่งคั่ง คุ้มครองชีวิตสูง พร้อมโอกาสรับผลตอบแทน", file: "wealthmax.pdf", group: "main", subcategory: "unit-linked", badge: "WM" },
  { title: "AIA WealthMax Prestige", code: "WealthMax Prestige", description: "เวอร์ชันพรีเมียมของ WealthMax สำหรับผู้ที่ต้องการทุนประกันและการส่งต่อความมั่งคั่งในระดับสูง", file: "wealthmax-prestige.pdf", group: "main", subcategory: "unit-linked", badge: "WMP" },
  { title: "AIA Exclusive Wealth Prestige (Unit Linked)", code: "Exclusive Wealth Prestige", description: "ประกันชีวิตควบการลงทุนระดับพรีเมียม ผสานความคุ้มครองกับโอกาสเติบโตของเงินผ่านกองทุนหลากหลาย", file: "exclusive-wealth-prestige.pdf", group: "main", subcategory: "unit-linked", badge: "EWP" },
  { title: "AIA Infinite Wealth Prestige", code: "Infinite Wealth Prestige", description: "ประกันเพื่อการส่งต่อความมั่งคั่งสู่คนรุ่นต่อไป ทุนประกันสูง พร้อมการวางแผนมรดกอย่างเป็นระบบ", file: "infinite-wealth-prestige.pdf", group: "main", subcategory: "unit-linked", badge: "IWP" },
  { title: "AIA Infinite Gift Prestige (Unit Linked)", code: "Infinite Gift Prestige", description: "ประกันชีวิตควบการลงทุนเพื่อการส่งต่อความมั่งคั่ง ยืดหยุ่นในการลงทุน คุ้มครองชีวิตเพื่อคนที่คุณรัก", file: "infinite-gift-prestige.pdf", group: "main", subcategory: "unit-linked", badge: "IGP" },
  { title: "AIA 20 Pay Link (Unit Linked)", code: "20 Pay Link", description: "ประกันชีวิตควบการลงทุน ชำระเบี้ย 20 ปี เน้นความคุ้มครองระยะยาวควบคู่กับการลงทุน", file: "20pay-link.pdf", group: "main", subcategory: "unit-linked", badge: "20PL" },
  { title: "AIA 20 Pay Link Prestige (Unit Linked)", code: "20 Pay Link Prestige", description: "เวอร์ชันพรีเมียมของ 20 Pay Link สำหรับผู้ที่ต้องการพอร์ตการลงทุนและความคุ้มครองในระดับที่สูงขึ้น", file: "20pay-link-prestige.pdf", group: "main", subcategory: "unit-linked", badge: "20PLP" },
  { title: "AIA Issara Plus (Unit Linked)", code: "Issara Plus", description: "ประกันชีวิตควบการลงทุนแบบยืดหยุ่น ปรับเบี้ยและความคุ้มครองได้ตามช่วงชีวิต", file: "issara-plus.pdf", group: "main", subcategory: "unit-linked", badge: "IS+" },
  { title: "AIA Issara Prestige Plus (Unit Linked)", code: "Issara Prestige Plus", description: "เวอร์ชันพรีเมียมของ Issara Plus ตอบโจทย์การวางแผนการเงินและการลงทุนในระดับสูง", file: "issara-prestige-plus.pdf", group: "main", subcategory: "unit-linked", badge: "ISP+" },
  { title: "AIA Smart Wealth", code: "Smart Wealth", description: "สะสมทรัพย์ชำระเบี้ยระยะสั้น เน้นการออมพร้อมความคุ้มครองชีวิต เหมาะกับเป้าหมายระยะกลาง", file: "smart-wealth.pdf", group: "main", subcategory: "unit-linked", badge: "SW" },
  { title: "AIA Smart Wealth Prestige", code: "Smart Wealth Prestige", description: "เวอร์ชันพรีเมียมของ Smart Wealth สำหรับทุนประกันและเป้าหมายการออมในระดับที่สูงขึ้น", file: "smart-wealth-prestige.pdf", group: "main", subcategory: "unit-linked", badge: "SWP" },
  { title: "AIA Smart Select (Unit Linked)", code: "Smart Select", description: "ประกันชีวิตควบการลงทุน เลือกแผนการลงทุนได้ตามความเสี่ยงที่รับได้ ความคุ้มครองยืดหยุ่น", file: "smart-select.pdf", group: "main", subcategory: "unit-linked", badge: "SSL" },
  { title: "AIA Smart Select Prestige (Unit Linked)", code: "Smart Select Prestige", description: "เวอร์ชันพรีเมียมของ Smart Select รองรับการลงทุนและความคุ้มครองในระดับที่สูงขึ้น", file: "smart-select-prestige.pdf", group: "main", subcategory: "unit-linked", badge: "SSLP" },

  // Riders (สัญญาเพิ่มเติมสุขภาพ/โรคร้าย)
  { title: "AIA Health Happy", code: "Health Happy", description: "สัญญาเพิ่มเติมประกันสุขภาพแบบเหมาจ่าย คุ้มครองค่ารักษาผู้ป่วยใน (IPD) วงเงินสูง", file: "health-happy.pdf", group: "main", subcategory: "rider", badge: "HH" },
  { title: "AIA Health Happy Kids", code: "Health Happy Kids", description: "ประกันสุขภาพเหมาจ่ายสำหรับเด็ก ดูแลค่ารักษาพยาบาลผู้ป่วยในและสิทธิประโยชน์ที่ออกแบบมาเพื่อเด็กโดยเฉพาะ", file: "health-happy-kids.pdf", group: "main", subcategory: "rider", badge: "HHK" },
  { title: "AIA Health Cover (AHC)", code: "AHC", description: "สัญญาเพิ่มเติมค่ารักษาพยาบาล ช่วยดูแลค่าใช้จ่ายเมื่อเข้ารับการรักษาในโรงพยาบาล", file: "ahc.pdf", group: "main", subcategory: "rider", badge: "AHC" },
  { title: "AIA HB Extra (HBX)", code: "HBX", description: "สัญญาเพิ่มเติมชดเชยรายได้รายวันเมื่อต้องนอนพักรักษาตัวในโรงพยาบาล", file: "hbx.pdf", group: "main", subcategory: "rider", badge: "HBX" },
  { title: "AIA Multi-Pay CI Plus (MPCI Plus)", code: "MPCI Plus", description: "สัญญาเพิ่มเติมโรคร้ายแรงแบบจ่ายหลายครั้ง คุ้มครองหลายระยะของโรค รับเงินก้อนได้มากกว่าหนึ่งครั้ง", file: "mpci-plus.pdf", group: "main", subcategory: "rider", badge: "MPCI" },
  { title: "AIA CI Care", code: "CI Care", description: "สัญญาเพิ่มเติมคุ้มครองโรคร้ายแรง มอบเงินก้อนเมื่อตรวจพบโรคร้ายแรงตามเงื่อนไข", file: "ci-care.pdf", group: "main", subcategory: "rider", badge: "CIC" },
  { title: "AIA CI Plus", code: "CI Plus", description: "สัญญาเพิ่มเติมโรคร้ายแรง ครอบคลุมโรคร้ายแรงหลากหลาย พร้อมเงินก้อนช่วยการรักษา", file: "ci-plus.pdf", group: "main", subcategory: "rider", badge: "CI+" },
  { title: "AIA CI", code: "CI", description: "สัญญาเพิ่มเติมโรคร้ายแรงพื้นฐาน รับเงินก้อนเมื่อตรวจพบโรคร้ายแรงตามที่กำหนดในกรมธรรม์", file: "ci.pdf", group: "main", subcategory: "rider", badge: "CI" },
  { title: "AIA Care for Cancer", code: "Care for Cancer", description: "สัญญาเพิ่มเติมเน้นคุ้มครองโรคมะเร็งโดยเฉพาะ มอบเงินก้อนเมื่อตรวจพบมะเร็งตามเงื่อนไข", file: "care-for-cancer.pdf", group: "main", subcategory: "rider", badge: "CFC" },
  { title: "AIA CI Top Up", code: "CI Top Up", description: "สัญญาเพิ่มเติมโรคร้ายแรงแบบ Top Up เพิ่มทุนคุ้มครองโรคร้ายในต้นทุนที่ประหยัด เหมาะกับการเสริมความคุ้มครองเดิม", file: "ci-top-up.pdf", group: "main", subcategory: "rider", badge: "CIT" },
  { title: "AIA Health Plus", code: "Health Plus", description: "สัญญาเพิ่มเติมสุขภาพ ดูแลค่ารักษาพยาบาลด้วยวงเงินที่ยืดหยุ่น เหมาะกับการเสริมความคุ้มครองในต้นทุนที่จับต้องได้", file: "health-plus.pdf", group: "main", subcategory: "rider", badge: "H+" },
  { title: "AIA Health Saver", code: "Health Saver", description: "ประกันสุขภาพแบบมีส่วนรับผิดชอบร่วม (Deductible) เบี้ยประหยัด เหมาะกับผู้ที่มีสวัสดิการอยู่แล้วและต้องการเสริม", file: "health-saver.pdf", group: "main", subcategory: "rider", badge: "HS" },
  { title: "AIA Health Starter", code: "Health Starter", description: "ประกันสุขภาพเริ่มต้นในราคาที่เข้าถึงได้ เหมาะกับวัยทำงานตอนต้นที่อยากเริ่มมีสวัสดิการสุขภาพของตัวเอง", file: "health-starter.pdf", group: "main", subcategory: "rider", badge: "HST" },
  { title: "AIA Infinite Care", code: "Infinite Care", description: "ประกันสุขภาพระดับพรีเมียม วงเงินสูง คุ้มครองครอบคลุมทั่วโลก รองรับการรักษาในโรงพยาบาลชั้นนำต่างประเทศ", file: "infinite-care.pdf", group: "main", subcategory: "rider", badge: "INF" },
  { title: "AIA WPCI (Waiver of Premium on CI)", code: "WPCI", description: "สัญญาเพิ่มเติมยกเว้นเบี้ยประกันภัยกรณีตรวจพบโรคร้ายแรง ช่วยให้กรมธรรม์หลักยังคงมีผลโดยไม่ต้องจ่ายเบี้ย", file: "wpci.pdf", group: "main", subcategory: "rider", badge: "WPCI" },
  { title: "AIA TPD (ทุพพลภาพถาวรสิ้นเชิง)", code: "TPD", description: "สัญญาเพิ่มเติมคุ้มครองกรณีทุพพลภาพถาวรสิ้นเชิง รับเงินก้อนช่วยรองรับค่าใช้จ่ายเมื่อไม่สามารถทำงานได้", file: "tpd.pdf", group: "main", subcategory: "rider", badge: "TPD" },

  // Rider Handbook (คู่มือสัญญาเพิ่มเติม)
  { title: "คู่มือสัญญาเพิ่มเติม - เล่มหลัก", code: "Main Rider Book", description: "เล่มภาพรวมสัญญาเพิ่มเติมของ AIA สรุปสิทธิประโยชน์ เงื่อนไข และข้อยกเว้นของแต่ละแบบในที่เดียว", file: "rider-book-main.pdf", group: "main", subcategory: "rider-handbook", badge: "M" },
  { title: "คู่มือสัญญาเพิ่มเติม - สุขภาพ", code: "Health Rider Book", description: "เล่มรวมรายละเอียดสัญญาเพิ่มเติมกลุ่มสุขภาพทุกแบบ ทั้ง Health Happy, Health Plus, Infinite Care และอื่นๆ", file: "rider-book-health.pdf", group: "main", subcategory: "rider-handbook", badge: "H" },
  { title: "คู่มือสัญญาเพิ่มเติม - โรคร้ายแรง", code: "CI Rider Book", description: "เล่มรวมรายละเอียดสัญญาเพิ่มเติมโรคร้ายแรงทุกแบบ ทั้ง CI, CI Plus, MPCI Plus, Care for Cancer และอื่นๆ", file: "rider-book-ci.pdf", group: "main", subcategory: "rider-handbook", badge: "CI" },
  { title: "คู่มือสัญญาเพิ่มเติม - อุบัติเหตุ", code: "Accident Rider Book", description: "เล่มรวมรายละเอียดสัญญาเพิ่มเติมกลุ่มอุบัติเหตุที่แนบกับแบบประกันหลักได้", file: "rider-book-accident.pdf", group: "main", subcategory: "rider-handbook", badge: "AC" },
  { title: "คู่มือสัญญาเพิ่มเติม - ยกเว้นเบี้ย (Waiver)", code: "Waiver Rider Book", description: "เล่มรวมรายละเอียดสัญญาเพิ่มเติมประเภทยกเว้นเบี้ยประกันภัย เพื่อให้กรมธรรม์หลักยังมีผลในเงื่อนไขที่กำหนด", file: "rider-book-waive.pdf", group: "main", subcategory: "rider-handbook", badge: "W" },

  // Vitality
  { title: "AIA Vitality", code: "Vitality", description: "โปรแกรมส่งเสริมสุขภาพของ AIA สะสมคะแนนจากการดูแลสุขภาพ รับส่วนลดเบี้ยและสิทธิประโยชน์ต่างๆ", file: "vitality.pdf", group: "main", subcategory: "vitality", badge: "VIT" },
  { title: "AIA Vitality V70", code: "Vitality V70", description: "แผน AIA Vitality รุ่น V70 พร้อมรายละเอียดสิทธิประโยชน์และส่วนลดในเวอร์ชันล่าสุด", file: "vitality-v70.pdf", group: "main", subcategory: "vitality", badge: "V70" },
  { title: "AIA Vitality V80", code: "Vitality V80", description: "แผน AIA Vitality รุ่น V80 พร้อมรายละเอียดสิทธิประโยชน์และส่วนลดในเวอร์ชันล่าสุด", file: "vitality-v80.pdf", group: "main", subcategory: "vitality", badge: "V80" },

  // Accident: PA
  { title: "AIA PA (อุบัติเหตุส่วนบุคคล)", code: "PA", description: "ประกันอุบัติเหตุส่วนบุคคล คุ้มครองการเสียชีวิต ทุพพลภาพ และค่ารักษาจากอุบัติเหตุ", file: "pa.pdf", group: "accident", subcategory: "pa", badge: "PA" },

  // Accident: High Risk
  { title: "AIA PA สำหรับอาชีพเสี่ยงภัยพิเศษ", code: "PA High Risk Occ", description: "แผนอุบัติเหตุสำหรับอาชีพที่มีความเสี่ยงสูง ออกแบบความคุ้มครองให้เหมาะกับลักษณะงาน", file: "pa-high-risk.pdf", group: "accident", subcategory: "pa-high-risk", badge: "HR" },

  // Accident: Worksite Marketing
  { title: "AIA WSM PA Plus (รายเดือน)", code: "WSM PA Plus", description: "แผนอุบัติเหตุกลุ่ม PA Plus สำหรับองค์กร ชำระเบี้ยรายเดือน ดูแลพนักงานทั้งทีม", file: "wsm-pa-plus-month.pdf", group: "accident", subcategory: "pa-group", badge: "WSM+" },
  { title: "AIA WSM PA Safe (รายเดือน)", code: "WSM PA Safe", description: "แผนอุบัติเหตุกลุ่ม PA Safe สำหรับองค์กร เบี้ยประหยัด ชำระรายเดือน", file: "wsm-pa-safe-month.pdf", group: "accident", subcategory: "pa-group", badge: "WSMS" },

  // Accident: Micro
  { title: "AIA PA Micro", code: "PA Micro", description: "แผนประกันภัยไมโครอินชัวรันส์ คุ้มครองอุบัติเหตุ ในราคาที่เข้าถึงได้สำหรับรายย่อย", file: "pa-micro.pdf", group: "accident", subcategory: "micro", badge: "PAM" },
  { title: "Micro 100", code: "Micro100", description: "กรมธรรม์ประกันภัย 100 (ไมโครอินชัวรันส์) คุ้มครองพื้นฐานในราคาเริ่มต้น เหมาะกับผู้มีงบจำกัด", file: "micro100.pdf", group: "accident", subcategory: "micro", badge: "M100" },
  { title: "Micro 200", code: "Micro200", description: "ประกันภัย 200 สำหรับรายย่อย (ไมโครอินชัวรันส์) ความคุ้มครองเพิ่มขึ้นในราคาที่เข้าถึงง่าย", file: "micro200.pdf", group: "accident", subcategory: "micro", badge: "M200" },
  { title: "Micro 300", code: "Micro300", description: "อุบัติเหตุเพื่อคนพิการสำหรับรายย่อย (ไมโครอินชัวรันส์) ออกแบบมาเพื่อกลุ่มผู้พิการโดยเฉพาะ", file: "micro300.pdf", group: "accident", subcategory: "micro", badge: "M300" }
];
