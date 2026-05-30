// ข้อมูลโบรชัวร์ผลิตภัณฑ์ AIA สำหรับหน้า /brochures
// description, group label, sub label เป็น Localized (รองรับ th/en/zh)
// ค่าเริ่มต้น: ไฟล์อยู่ที่ public/brochures/<file> และ thumbs/<slug>.jpg (local)
// ถ้าตั้ง env var NEXT_PUBLIC_BROCHURE_CDN จะใช้ URL นั้นแทน (S3/R2/CDN ภายนอก)

import type { Localized } from "@/lib/i18n";

const CDN_BASE = (process.env.NEXT_PUBLIC_BROCHURE_CDN || "").replace(/\/+$/, "");

export function getBrochureUrl(file: string): string {
  return CDN_BASE ? `${CDN_BASE}/${file}` : `/brochures/${file}`;
}

export function getThumbUrl(slug: string): string {
  const filename = slug.endsWith(".jpg") ? slug : `${slug}.jpg`;
  return CDN_BASE
    ? `${CDN_BASE}/thumbs/${filename}`
    : `/brochures/thumbs/${filename}`;
}

export type GroupId = "main" | "accident";

export type SubCategoryId =
  | "whole-life"
  | "ci-whole-life"
  | "endowment"
  | "annuity"
  | "term"
  | "unit-linked"
  | "rider"
  | "rider-handbook"
  | "vitality"
  | "pa"
  | "pa-high-risk"
  | "pa-group"
  | "micro";

export type Brochure = {
  title: string;
  code: string;
  description: Localized;
  file: string;
  group: GroupId;
  subcategory: SubCategoryId;
  badge: string;
};

export type Group = {
  id: GroupId;
  label: Localized;
  eyebrow: string;
  description: Localized;
};

export type SubCategory = {
  id: SubCategoryId;
  label: Localized;
  group: GroupId;
};

export const groups: Group[] = [
  {
    id: "main",
    label: { th: "แบบประกันหลัก", en: "Main Insurance", zh: "主要保险" },
    eyebrow: "Main Insurance",
    description: {
      th: "ประกันชีวิตและสุขภาพหลักทุกรูปแบบ ทั้งตลอดชีพ สะสมทรัพย์ บำนาญ ยูนิตลิงค์ สัญญาเพิ่มเติม และ AIA Vitality",
      en: "All main life and health insurance — whole life, savings, annuity, unit-linked, riders, and AIA Vitality.",
      zh: "所有主要的人寿与健康保险——终身寿险、储蓄、年金、单位连结、附加合约,以及 AIA Vitality。"
    }
  },
  {
    id: "accident",
    label: { th: "แบบประกันอุบัติเหตุ", en: "Accident Insurance", zh: "意外险" },
    eyebrow: "Accident Insurance",
    description: {
      th: "แผนคุ้มครองอุบัติเหตุ ทั้งส่วนบุคคล อาชีพเสี่ยงภัยพิเศษ แบบกลุ่ม และไมโครอินชัวรันส์",
      en: "Accident protection plans — personal, high-risk occupations, group worksite, and microinsurance.",
      zh: "意外保障计划——个人、高风险职业、团体职场,以及微型保险。"
    }
  }
];

export const subCategories: SubCategory[] = [
  { id: "whole-life", label: { th: "ประกันตลอดชีพ", en: "Whole Life", zh: "终身寿险" }, group: "main" },
  { id: "ci-whole-life", label: { th: "โรคร้ายแรงตลอดชีพ", en: "Whole Life CI", zh: "终身重大疾病" }, group: "main" },
  { id: "endowment", label: { th: "สะสมทรัพย์", en: "Endowment / Savings", zh: "储蓄寿险" }, group: "main" },
  { id: "annuity", label: { th: "บำนาญ (ลดหย่อนภาษีได้)", en: "Annuity (Tax-deductible)", zh: "年金(可减税)" }, group: "main" },
  { id: "term", label: { th: "ประกันกำหนดระยะเวลา", en: "Term Life", zh: "定期寿险" }, group: "main" },
  { id: "unit-linked", label: { th: "ยูนิตลิงค์ (ควบการลงทุน)", en: "Unit Linked (Investment-linked)", zh: "单位连结(投资型)" }, group: "main" },
  { id: "rider", label: { th: "สัญญาเพิ่มเติมสุขภาพ/โรคร้าย", en: "Health & CI Riders", zh: "健康/重疾附加合约" }, group: "main" },
  { id: "rider-handbook", label: { th: "คู่มือสัญญาเพิ่มเติม", en: "Rider Handbooks", zh: "附加合约手册" }, group: "main" },
  { id: "vitality", label: { th: "AIA Vitality", en: "AIA Vitality", zh: "AIA Vitality" }, group: "main" },
  { id: "pa", label: { th: "อุบัติเหตุส่วนบุคคล (PA)", en: "Personal Accident (PA)", zh: "个人意外险 (PA)" }, group: "accident" },
  { id: "pa-high-risk", label: { th: "อาชีพเสี่ยงภัยพิเศษ", en: "High-Risk Occupations", zh: "高风险职业" }, group: "accident" },
  { id: "pa-group", label: { th: "ประกันกลุ่ม (Worksite)", en: "Group (Worksite)", zh: "团体(职场)" }, group: "accident" },
  { id: "micro", label: { th: "ไมโครอินชัวรันส์", en: "Microinsurance", zh: "微型保险" }, group: "accident" }
];

export const brochures: Brochure[] = [
  // Whole Life
  { title: "AIA Legacy Prestige", code: "Legacy Prestige", file: "legacy-prestige.pdf", group: "main", subcategory: "whole-life", badge: "LP",
    description: {
      th: "ประกันตลอดชีพระดับพรีเมียมเพื่อการส่งต่อมรดก ทุนประกันสูง วางแผนภาษีและส่งต่อความมั่งคั่งอย่างเป็นระบบ",
      en: "Premium whole life plan for legacy transfer — high sum assured, structured wealth and tax planning.",
      zh: "高端终身寿险,助您传承财富——高保额,有系统地规划税务与资产传承。"
    }
  },
  { title: "AIA Legacy Prestige Plus", code: "Legacy Prestige Plus", file: "legacy-prestige-plus.pdf", group: "main", subcategory: "whole-life", badge: "LPP",
    description: {
      th: "เวอร์ชันพรีเมียมพลัสของ Legacy Prestige เพิ่มความยืดหยุ่นและสิทธิประโยชน์ในการส่งต่อมรดก",
      en: "Premium-plus tier of Legacy Prestige with greater flexibility and enhanced legacy-transfer benefits.",
      zh: "Legacy Prestige 的尊享升级版,提供更高灵活度与更优的财富传承权益。"
    }
  },
  { title: "AIA Legacy Prestige Protection", code: "Legacy Prestige Protection", file: "legacy-prestige-protection.pdf", group: "main", subcategory: "whole-life", badge: "LPP",
    description: {
      th: "Legacy Prestige ที่เน้นความคุ้มครองชีวิตสูง เหมาะกับการวางแผนปกป้องครอบครัวระดับสูง",
      en: "Legacy Prestige focused on high life coverage — ideal for premium-level family protection planning.",
      zh: "侧重高寿险保额的 Legacy Prestige,适合高端家庭保障规划。"
    }
  },
  { title: "AIA Protection 65", code: "Protection 65", file: "protection-65.pdf", group: "main", subcategory: "whole-life", badge: "P65",
    description: {
      th: "ประกันคุ้มครองชีวิตจนถึงอายุ 65 ปี เบี้ยประหยัด เหมาะกับการสร้างทุนประกันให้ครอบครัวในวัยทำงาน",
      en: "Life cover up to age 65 with affordable premium — ideal for building family protection during working years.",
      zh: "保障至 65 岁的人寿保险,保费经济实惠,适合在职期间为家庭建立保障。"
    }
  },
  { title: "AIA Pay Life Plus (Non Par)", code: "Pay Life Plus", file: "pay-life-plus.pdf", group: "main", subcategory: "whole-life", badge: "PLP",
    description: {
      th: "ประกันชีวิตตลอดชีพแบบไม่มีเงินปันผล เน้นเบี้ยคุ้มค่าและความคุ้มครองยาวนาน",
      en: "Non-participating whole life — value-for-money premium with long-lasting protection.",
      zh: "非分红型终身寿险——保费实惠,保障长期。"
    }
  },
  { title: "AIA 10 & 15 Pay Life (Non Par)", code: "10/15 Pay Life", file: "10-15-pay-life.pdf", group: "main", subcategory: "whole-life", badge: "10/15",
    description: {
      th: "ตลอดชีพชำระเบี้ย 10 หรือ 15 ปี เหมาะกับผู้ที่ต้องการจ่ายเบี้ยระยะสั้นแต่ได้ความคุ้มครองตลอดชีพ",
      en: "Whole life with 10 or 15-year premium term — short-pay structure with lifelong coverage.",
      zh: "缴费 10 或 15 年的终身寿险——短期缴费,终身保障。"
    }
  },
  { title: "AIA 20 Pay Life (Non Par)", code: "20 Pay Life", file: "20-pay-life.pdf", group: "main", subcategory: "whole-life", badge: "20P",
    description: {
      th: "ตลอดชีพชำระเบี้ย 20 ปี ความคุ้มครองตลอดชีวิตด้วยภาระเบี้ยที่กำหนดระยะเวลาชัดเจน",
      en: "Whole life paid up in 20 years — lifelong coverage with a clearly defined premium-paying period.",
      zh: "缴费 20 年的终身寿险——清晰的缴费期限,享终身保障。"
    }
  },
  { title: "AIA Senior Happy", code: "Senior Happy", file: "senior-happy.pdf", group: "main", subcategory: "whole-life", badge: "SH",
    description: {
      th: "แบบประกันสำหรับผู้สูงอายุ สมัครง่ายไม่ต้องตรวจสุขภาพ มอบเงินก้อนเพื่อค่าใช้จ่ายในยามจำเป็น",
      en: "Senior plan — easy enrollment with no medical exam, lump-sum payout for when it's needed.",
      zh: "长者计划——无需体检即可投保,在需要时提供一笔款项。"
    }
  },

  // CI Whole Life
  { title: "AIA CI ProCare", code: "CI ProCare", file: "ci-procare.pdf", group: "main", subcategory: "ci-whole-life", badge: "CIP",
    description: {
      th: "ประกันโรคร้ายแรงตลอดชีพ ครอบคลุมหลายโรคและหลายระยะของโรค พร้อมเงินก้อนเมื่อเข้าเงื่อนไข",
      en: "Lifelong critical illness plan covering many illnesses and multiple stages, with lump-sum payouts.",
      zh: "终身重大疾病保险,涵盖多种疾病及多个病期,符合条件时给付一笔款项。"
    }
  },
  { title: "AIA CI SuperCare", code: "CI SuperCare", file: "ci-supercare.pdf", group: "main", subcategory: "ci-whole-life", badge: "CIS",
    description: {
      th: "คุ้มครองโรคร้ายแรงระยะลุกลามและระยะต้น พร้อมความคุ้มครองชีวิตในกรมธรรม์เดียว",
      en: "Covers both early and advanced stages of critical illnesses, plus life coverage in one policy.",
      zh: "在一份保单内同时保障重疾的早期与晚期,并附带寿险保障。"
    }
  },
  { title: "AIA CI SuperCare Prestige", code: "CI SuperCare Prestige", file: "ci-supercare-prestige.pdf", group: "main", subcategory: "ci-whole-life", badge: "CISP",
    description: {
      th: "เวอร์ชันพรีเมียมของ CI SuperCare ทุนประกันสูง รองรับการวางแผนรักษาโรคร้ายในระดับสูง",
      en: "Premium tier of CI SuperCare with higher sum assured for top-tier critical illness planning.",
      zh: "CI SuperCare 的尊享版,保额更高,适合高端重疾规划。"
    }
  },

  // Endowment
  { title: "AIA SavingSure", code: "SavingSure", file: "savingsure.pdf", group: "main", subcategory: "endowment", badge: "SS",
    description: {
      th: "ประกันสะสมทรัพย์ ออมเงินอย่างมีวินัย พร้อมเงินคืนเมื่อครบกำหนดและความคุ้มครองชีวิต",
      en: "Disciplined endowment savings with maturity payout and life coverage.",
      zh: "有纪律的储蓄寿险,期满返还本利,并附带寿险保障。"
    }
  },
  { title: "AIA Excellent (Non Par)", code: "Excellent", file: "excellent.pdf", group: "main", subcategory: "endowment", badge: "EXC",
    description: {
      th: "สะสมทรัพย์แบบไม่มีเงินปันผล จ่ายเบี้ยสั้น รับเงินคืนตามแผน เหมาะกับเป้าหมายระยะกลาง",
      en: "Non-participating endowment with short premium term and scheduled returns — fits mid-term goals.",
      zh: "非分红储蓄寿险,缴费期短,按计划返还,适合中期理财目标。"
    }
  },
  { title: "AIA Endowment 15 Pay 25 (Non Par)", code: "Endowment 15Pay25", file: "endowment-15pay25.pdf", group: "main", subcategory: "endowment", badge: "15/25",
    description: {
      th: "สะสมทรัพย์ จ่ายเบี้ย 15 ปี คุ้มครอง 25 ปี รับเงินคืนระหว่างทางและก้อนสุดท้ายเมื่อครบกำหนด",
      en: "Endowment with 15-year premium, 25-year coverage — interim cashbacks plus lump-sum at maturity.",
      zh: "储蓄寿险,缴费 15 年,保障 25 年——期中返还加期满一笔款项。"
    }
  },
  { title: "AIA 5 Pay 10 (Non Par)", code: "5 Pay 10", file: "5pay10.pdf", group: "main", subcategory: "endowment", badge: "5/10",
    description: {
      th: "สะสมทรัพย์จ่ายเบี้ย 5 ปี คุ้มครอง 10 ปี เหมาะกับการออมระยะสั้นพร้อมความคุ้มครอง",
      en: "Endowment with 5-year premium and 10-year coverage — short-term savings with protection.",
      zh: "缴费 5 年、保障 10 年的储蓄寿险——短期储蓄并附带保障。"
    }
  },

  // Annuity
  { title: "AIA Annuity Sure", code: "Annuity Sure", file: "annuity-sure.pdf", group: "main", subcategory: "annuity", badge: "AS",
    description: {
      th: "ประกันบำนาญที่ลดหย่อนภาษีได้ รับเงินบำนาญสม่ำเสมอหลังเกษียณ วางแผนเงินใช้ในวัยเกษียณ",
      en: "Tax-deductible annuity with regular post-retirement payouts — plan steady income for your retirement.",
      zh: "可减税的年金保险,退休后定期领取年金,为退休生活规划稳定收入。"
    }
  },
  { title: "AIA Annuity Fix", code: "Annuity Fix", file: "annuity-fix.pdf", group: "main", subcategory: "annuity", badge: "AF",
    description: {
      th: "ประกันบำนาญแบบกำหนดงวดรับเงินบำนาญที่แน่นอน ลดหย่อนภาษีตามเงื่อนไขกรมสรรพากร",
      en: "Fixed-period annuity with guaranteed payouts, tax-deductible per Thai Revenue Department rules.",
      zh: "固定年期的年金,给付确定,可按泰国税务规定享受减税。"
    }
  },

  // Term
  { title: "AIA Term (อัตราเบี้ยมาตรฐาน)", code: "Term", file: "term-premium.pdf", group: "main", subcategory: "term", badge: "TM",
    description: {
      th: "เอกสารแสดงอัตราเบี้ยมาตรฐานรายปีสำหรับแบบประกันกำหนดระยะเวลา (Term) เน้นความคุ้มครองชีวิตเฉพาะช่วง",
      en: "Standard annual premium rates for term life plans — pure life coverage for a defined period.",
      zh: "定期寿险的标准年缴保费表——为指定期间提供纯寿险保障。"
    }
  },
  { title: "AIA Term 80 (อัตราเบี้ยมาตรฐาน)", code: "Term 80", file: "term80-premium.pdf", group: "main", subcategory: "term", badge: "T80",
    description: {
      th: "เอกสารอัตราเบี้ยสำหรับ Term ที่คุ้มครองยาวถึงอายุ 80 ปี เหมาะกับการคุ้มครองภาระทางการเงินระยะยาว",
      en: "Premium rates for Term coverage up to age 80 — fits long-term financial liability protection.",
      zh: "保障至 80 岁的定期寿险保费表——适合长期财务责任的保障。"
    }
  },

  // Unit Linked
  { title: "AIA Elite Income Prestige", code: "Elite Income Prestige", file: "elite-income-prestige.pdf", group: "main", subcategory: "unit-linked", badge: "EIP",
    description: {
      th: "สะสมทรัพย์ระดับพรีเมียม เน้นรับเงินคืนสม่ำเสมอ พร้อมความคุ้มครองชีวิต เหมาะกับการสร้างกระแสเงินสด",
      en: "Premium-tier savings focused on regular cashbacks plus life coverage — ideal for building cash flow.",
      zh: "尊享级储蓄方案,定期返还现金,并附带寿险保障——适合建立现金流。"
    }
  },
  { title: "AIA WealthMax", code: "WealthMax", file: "wealthmax.pdf", group: "main", subcategory: "unit-linked", badge: "WM",
    description: {
      th: "ประกันชีวิตเพื่อสะสมทรัพย์และส่งต่อความมั่งคั่ง คุ้มครองชีวิตสูง พร้อมโอกาสรับผลตอบแทน",
      en: "Life insurance for wealth accumulation and transfer — high life coverage with growth potential.",
      zh: "用于积累与传承财富的人寿保险——高寿险保额,兼具成长潜力。"
    }
  },
  { title: "AIA WealthMax Prestige", code: "WealthMax Prestige", file: "wealthmax-prestige.pdf", group: "main", subcategory: "unit-linked", badge: "WMP",
    description: {
      th: "เวอร์ชันพรีเมียมของ WealthMax สำหรับผู้ที่ต้องการทุนประกันและการส่งต่อความมั่งคั่งในระดับสูง",
      en: "Premium tier of WealthMax for those wanting higher sum assured and elevated wealth transfer.",
      zh: "WealthMax 的尊享版,适合需要更高保额与更高端财富传承的客户。"
    }
  },
  { title: "AIA Exclusive Wealth Prestige (Unit Linked)", code: "Exclusive Wealth Prestige", file: "exclusive-wealth-prestige.pdf", group: "main", subcategory: "unit-linked", badge: "EWP",
    description: {
      th: "ประกันชีวิตควบการลงทุนระดับพรีเมียม ผสานความคุ้มครองกับโอกาสเติบโตของเงินผ่านกองทุนหลากหลาย",
      en: "Premium investment-linked life plan combining protection with growth opportunities across many funds.",
      zh: "尊享级投资型寿险,将保障与多元基金的成长机会相结合。"
    }
  },
  { title: "AIA Infinite Wealth Prestige", code: "Infinite Wealth Prestige", file: "infinite-wealth-prestige.pdf", group: "main", subcategory: "unit-linked", badge: "IWP",
    description: {
      th: "ประกันเพื่อการส่งต่อความมั่งคั่งสู่คนรุ่นต่อไป ทุนประกันสูง พร้อมการวางแผนมรดกอย่างเป็นระบบ",
      en: "Insurance for transferring wealth to the next generation — high sum assured with structured legacy planning.",
      zh: "为下一代传承财富的保险——高保额并提供有系统的遗产规划。"
    }
  },
  { title: "AIA Infinite Gift Prestige (Unit Linked)", code: "Infinite Gift Prestige", file: "infinite-gift-prestige.pdf", group: "main", subcategory: "unit-linked", badge: "IGP",
    description: {
      th: "ประกันชีวิตควบการลงทุนเพื่อการส่งต่อความมั่งคั่ง ยืดหยุ่นในการลงทุน คุ้มครองชีวิตเพื่อคนที่คุณรัก",
      en: "Investment-linked life plan for wealth transfer with investment flexibility and life cover for loved ones.",
      zh: "用于财富传承的投资型寿险,投资灵活,并为您所爱的人提供寿险保障。"
    }
  },
  { title: "AIA 20 Pay Link (Unit Linked)", code: "20 Pay Link", file: "20pay-link.pdf", group: "main", subcategory: "unit-linked", badge: "20PL",
    description: {
      th: "ประกันชีวิตควบการลงทุน ชำระเบี้ย 20 ปี เน้นความคุ้มครองระยะยาวควบคู่กับการลงทุน",
      en: "Investment-linked life with a 20-year premium term — long-term protection alongside investing.",
      zh: "缴费 20 年的投资型寿险——长期保障兼顾投资。"
    }
  },
  { title: "AIA 20 Pay Link Prestige (Unit Linked)", code: "20 Pay Link Prestige", file: "20pay-link-prestige.pdf", group: "main", subcategory: "unit-linked", badge: "20PLP",
    description: {
      th: "เวอร์ชันพรีเมียมของ 20 Pay Link สำหรับผู้ที่ต้องการพอร์ตการลงทุนและความคุ้มครองในระดับที่สูงขึ้น",
      en: "Premium tier of 20 Pay Link for those wanting a larger investment portfolio and higher coverage.",
      zh: "20 Pay Link 的尊享版,适合需要更大投资组合与更高保额的客户。"
    }
  },
  { title: "AIA Issara Plus (Unit Linked)", code: "Issara Plus", file: "issara-plus.pdf", group: "main", subcategory: "unit-linked", badge: "IS+",
    description: {
      th: "ประกันชีวิตควบการลงทุนแบบยืดหยุ่น ปรับเบี้ยและความคุ้มครองได้ตามช่วงชีวิต",
      en: "Flexible investment-linked life — adjust premium and coverage to fit each life stage.",
      zh: "灵活的投资型寿险——可根据人生阶段调整保费与保额。"
    }
  },
  { title: "AIA Issara Prestige Plus (Unit Linked)", code: "Issara Prestige Plus", file: "issara-prestige-plus.pdf", group: "main", subcategory: "unit-linked", badge: "ISP+",
    description: {
      th: "เวอร์ชันพรีเมียมของ Issara Plus ตอบโจทย์การวางแผนการเงินและการลงทุนในระดับสูง",
      en: "Premium tier of Issara Plus for higher-level financial and investment planning.",
      zh: "Issara Plus 的尊享版,满足更高层次的财务与投资规划需求。"
    }
  },
  { title: "AIA Smart Wealth", code: "Smart Wealth", file: "smart-wealth.pdf", group: "main", subcategory: "unit-linked", badge: "SW",
    description: {
      th: "สะสมทรัพย์ชำระเบี้ยระยะสั้น เน้นการออมพร้อมความคุ้มครองชีวิต เหมาะกับเป้าหมายระยะกลาง",
      en: "Short-pay savings focused on disciplined saving and life coverage — fits mid-term goals.",
      zh: "短期缴费的储蓄计划,着重储蓄并附寿险保障——适合中期目标。"
    }
  },
  { title: "AIA Smart Wealth Prestige", code: "Smart Wealth Prestige", file: "smart-wealth-prestige.pdf", group: "main", subcategory: "unit-linked", badge: "SWP",
    description: {
      th: "เวอร์ชันพรีเมียมของ Smart Wealth สำหรับทุนประกันและเป้าหมายการออมในระดับที่สูงขึ้น",
      en: "Premium tier of Smart Wealth — higher sum assured and elevated savings goals.",
      zh: "Smart Wealth 的尊享版——更高保额与更高储蓄目标。"
    }
  },
  { title: "AIA Smart Select (Unit Linked)", code: "Smart Select", file: "smart-select.pdf", group: "main", subcategory: "unit-linked", badge: "SSL",
    description: {
      th: "ประกันชีวิตควบการลงทุน เลือกแผนการลงทุนได้ตามความเสี่ยงที่รับได้ ความคุ้มครองยืดหยุ่น",
      en: "Investment-linked life — choose an investment plan that matches your risk appetite, with flexible cover.",
      zh: "投资型寿险——可按个人风险承受度选择投资方案,保障灵活。"
    }
  },
  { title: "AIA Smart Select Prestige (Unit Linked)", code: "Smart Select Prestige", file: "smart-select-prestige.pdf", group: "main", subcategory: "unit-linked", badge: "SSLP",
    description: {
      th: "เวอร์ชันพรีเมียมของ Smart Select รองรับการลงทุนและความคุ้มครองในระดับที่สูงขึ้น",
      en: "Premium tier of Smart Select supporting larger investments and higher coverage.",
      zh: "Smart Select 的尊享版,支持更大额的投资与更高的保额。"
    }
  },

  // Riders
  { title: "AIA Health Happy", code: "Health Happy", file: "health-happy.pdf", group: "main", subcategory: "rider", badge: "HH",
    description: {
      th: "สัญญาเพิ่มเติมประกันสุขภาพแบบเหมาจ่าย คุ้มครองค่ารักษาผู้ป่วยใน (IPD) วงเงินสูง",
      en: "Lump-sum health rider with high inpatient (IPD) coverage limits.",
      zh: "总额报销的健康附约,住院治疗(IPD)保额高。"
    }
  },
  { title: "AIA Health Happy Kids", code: "Health Happy Kids", file: "health-happy-kids.pdf", group: "main", subcategory: "rider", badge: "HHK",
    description: {
      th: "ประกันสุขภาพเหมาจ่ายสำหรับเด็ก ดูแลค่ารักษาพยาบาลผู้ป่วยในและสิทธิประโยชน์ที่ออกแบบมาเพื่อเด็กโดยเฉพาะ",
      en: "Lump-sum health plan for children — inpatient coverage and benefits designed for kids.",
      zh: "儿童总额报销的健康保险——为孩童度身设计的住院与福利保障。"
    }
  },
  { title: "AIA Health Cover (AHC)", code: "AHC", file: "ahc.pdf", group: "main", subcategory: "rider", badge: "AHC",
    description: {
      th: "สัญญาเพิ่มเติมค่ารักษาพยาบาล ช่วยดูแลค่าใช้จ่ายเมื่อเข้ารับการรักษาในโรงพยาบาล",
      en: "Medical expense rider that helps cover hospital treatment costs.",
      zh: "医疗费用附约,协助分担住院治疗的费用。"
    }
  },
  { title: "AIA HB Extra (HBX)", code: "HBX", file: "hbx.pdf", group: "main", subcategory: "rider", badge: "HBX",
    description: {
      th: "สัญญาเพิ่มเติมชดเชยรายได้รายวันเมื่อต้องนอนพักรักษาตัวในโรงพยาบาล",
      en: "Daily hospital cash benefit — compensates daily income while you're hospitalized.",
      zh: "住院期间每日补偿收入的医院日额附约。"
    }
  },
  { title: "AIA Multi-Pay CI Plus (MPCI Plus)", code: "MPCI Plus", file: "mpci-plus.pdf", group: "main", subcategory: "rider", badge: "MPCI",
    description: {
      th: "สัญญาเพิ่มเติมโรคร้ายแรงแบบจ่ายหลายครั้ง คุ้มครองหลายระยะของโรค รับเงินก้อนได้มากกว่าหนึ่งครั้ง",
      en: "Multi-pay critical illness rider — covers multiple stages and pays out more than once.",
      zh: "多重给付的重疾附约——保障多个病期,可获得多次理赔。"
    }
  },
  { title: "AIA CI Care", code: "CI Care", file: "ci-care.pdf", group: "main", subcategory: "rider", badge: "CIC",
    description: {
      th: "สัญญาเพิ่มเติมคุ้มครองโรคร้ายแรง มอบเงินก้อนเมื่อตรวจพบโรคร้ายแรงตามเงื่อนไข",
      en: "Critical illness rider — lump-sum payout upon diagnosis of qualifying critical illnesses.",
      zh: "重疾附约——确诊符合条件的重大疾病时给付一笔款项。"
    }
  },
  { title: "AIA CI Plus", code: "CI Plus", file: "ci-plus.pdf", group: "main", subcategory: "rider", badge: "CI+",
    description: {
      th: "สัญญาเพิ่มเติมโรคร้ายแรง ครอบคลุมโรคร้ายแรงหลากหลาย พร้อมเงินก้อนช่วยการรักษา",
      en: "Critical illness rider covering a wide range of illnesses with a lump-sum to support treatment.",
      zh: "覆盖多种重疾的附约,提供一笔款项以协助治疗。"
    }
  },
  { title: "AIA CI", code: "CI", file: "ci.pdf", group: "main", subcategory: "rider", badge: "CI",
    description: {
      th: "สัญญาเพิ่มเติมโรคร้ายแรงพื้นฐาน รับเงินก้อนเมื่อตรวจพบโรคร้ายแรงตามที่กำหนดในกรมธรรม์",
      en: "Basic critical illness rider — lump-sum payout for illnesses defined in the policy.",
      zh: "基础重疾附约——保单所列重疾确诊时给付一笔款项。"
    }
  },
  { title: "AIA Care for Cancer", code: "Care for Cancer", file: "care-for-cancer.pdf", group: "main", subcategory: "rider", badge: "CFC",
    description: {
      th: "สัญญาเพิ่มเติมเน้นคุ้มครองโรคมะเร็งโดยเฉพาะ มอบเงินก้อนเมื่อตรวจพบมะเร็งตามเงื่อนไข",
      en: "Cancer-focused rider — lump-sum payout upon qualifying cancer diagnosis.",
      zh: "专为癌症设计的附约——确诊符合条件的癌症时给付一笔款项。"
    }
  },
  { title: "AIA CI Top Up", code: "CI Top Up", file: "ci-top-up.pdf", group: "main", subcategory: "rider", badge: "CIT",
    description: {
      th: "สัญญาเพิ่มเติมโรคร้ายแรงแบบ Top Up เพิ่มทุนคุ้มครองโรคร้ายในต้นทุนที่ประหยัด",
      en: "Top-up critical illness rider — add extra CI coverage at an economical cost.",
      zh: "重疾追加附约——以经济实惠的成本提升重疾保额。"
    }
  },
  { title: "AIA Health Plus", code: "Health Plus", file: "health-plus.pdf", group: "main", subcategory: "rider", badge: "H+",
    description: {
      th: "สัญญาเพิ่มเติมสุขภาพ ดูแลค่ารักษาพยาบาลด้วยวงเงินที่ยืดหยุ่น เหมาะกับการเสริมความคุ้มครองในต้นทุนที่จับต้องได้",
      en: "Health rider with flexible coverage limits — ideal for affordable supplementary protection.",
      zh: "保额灵活的健康附约——以可负担的成本补强保障。"
    }
  },
  { title: "AIA Health Saver", code: "Health Saver", file: "health-saver.pdf", group: "main", subcategory: "rider", badge: "HS",
    description: {
      th: "ประกันสุขภาพแบบมีส่วนรับผิดชอบร่วม (Deductible) เบี้ยประหยัด เหมาะกับผู้ที่มีสวัสดิการอยู่แล้วและต้องการเสริม",
      en: "Health plan with deductible — lower premium, great for topping up existing benefits.",
      zh: "含自付额的健康保险——保费较低,适合已有福利、想再补强的人士。"
    }
  },
  { title: "AIA Health Starter", code: "Health Starter", file: "health-starter.pdf", group: "main", subcategory: "rider", badge: "HST",
    description: {
      th: "ประกันสุขภาพเริ่มต้นในราคาที่เข้าถึงได้ เหมาะกับวัยทำงานตอนต้นที่อยากเริ่มมีสวัสดิการสุขภาพของตัวเอง",
      en: "Entry-level health plan at an accessible price — great for early-career workers building their own benefits.",
      zh: "入门级健康保险,价格亲民——适合刚步入职场、想拥有自己医疗保障的人士。"
    }
  },
  { title: "AIA Infinite Care", code: "Infinite Care", file: "infinite-care.pdf", group: "main", subcategory: "rider", badge: "INF",
    description: {
      th: "ประกันสุขภาพระดับพรีเมียม วงเงินสูง คุ้มครองครอบคลุมทั่วโลก รองรับการรักษาในโรงพยาบาลชั้นนำต่างประเทศ",
      en: "Premium health plan with high limits and worldwide coverage — supports treatment at leading hospitals overseas.",
      zh: "尊享级健康保险,保额高,全球承保——支持在海外顶级医院治疗。"
    }
  },
  { title: "AIA WPCI (Waiver of Premium on CI)", code: "WPCI", file: "wpci.pdf", group: "main", subcategory: "rider", badge: "WPCI",
    description: {
      th: "สัญญาเพิ่มเติมยกเว้นเบี้ยประกันภัยกรณีตรวจพบโรคร้ายแรง ช่วยให้กรมธรรม์หลักยังคงมีผลโดยไม่ต้องจ่ายเบี้ย",
      en: "Premium waiver rider on CI diagnosis — keeps your main policy in force without further premium payments.",
      zh: "确诊重疾时豁免保费的附约——主合约持续有效,无需继续缴费。"
    }
  },
  { title: "AIA TPD (ทุพพลภาพถาวรสิ้นเชิง)", code: "TPD", file: "tpd.pdf", group: "main", subcategory: "rider", badge: "TPD",
    description: {
      th: "สัญญาเพิ่มเติมคุ้มครองกรณีทุพพลภาพถาวรสิ้นเชิง รับเงินก้อนช่วยรองรับค่าใช้จ่ายเมื่อไม่สามารถทำงานได้",
      en: "Total permanent disability rider — lump-sum payout to cover expenses when you can no longer work.",
      zh: "全残附约——一旦丧失工作能力,给付一笔款项以支撑日常开销。"
    }
  },

  // Rider Handbook
  { title: "คู่มือสัญญาเพิ่มเติม - เล่มหลัก", code: "Main Rider Book", file: "rider-book-main.pdf", group: "main", subcategory: "rider-handbook", badge: "M",
    description: {
      th: "เล่มภาพรวมสัญญาเพิ่มเติมของ AIA สรุปสิทธิประโยชน์ เงื่อนไข และข้อยกเว้นของแต่ละแบบในที่เดียว",
      en: "Overview handbook of all AIA riders — benefits, conditions, and exclusions in one place.",
      zh: "AIA 附加合约总览手册——所有附约的权益、条件与除外责任一览。"
    }
  },
  { title: "คู่มือสัญญาเพิ่มเติม - สุขภาพ", code: "Health Rider Book", file: "rider-book-health.pdf", group: "main", subcategory: "rider-handbook", badge: "H",
    description: {
      th: "เล่มรวมรายละเอียดสัญญาเพิ่มเติมกลุ่มสุขภาพทุกแบบ ทั้ง Health Happy, Health Plus, Infinite Care และอื่นๆ",
      en: "Detailed handbook of all health riders — Health Happy, Health Plus, Infinite Care, and more.",
      zh: "健康附约详细手册——涵盖 Health Happy、Health Plus、Infinite Care 等。"
    }
  },
  { title: "คู่มือสัญญาเพิ่มเติม - โรคร้ายแรง", code: "CI Rider Book", file: "rider-book-ci.pdf", group: "main", subcategory: "rider-handbook", badge: "CI",
    description: {
      th: "เล่มรวมรายละเอียดสัญญาเพิ่มเติมโรคร้ายแรงทุกแบบ ทั้ง CI, CI Plus, MPCI Plus, Care for Cancer และอื่นๆ",
      en: "Detailed handbook of all CI riders — CI, CI Plus, MPCI Plus, Care for Cancer, and more.",
      zh: "重疾附约详细手册——涵盖 CI、CI Plus、MPCI Plus、Care for Cancer 等。"
    }
  },
  { title: "คู่มือสัญญาเพิ่มเติม - อุบัติเหตุ", code: "Accident Rider Book", file: "rider-book-accident.pdf", group: "main", subcategory: "rider-handbook", badge: "AC",
    description: {
      th: "เล่มรวมรายละเอียดสัญญาเพิ่มเติมกลุ่มอุบัติเหตุที่แนบกับแบบประกันหลักได้",
      en: "Detailed handbook of accident riders attachable to main policies.",
      zh: "可附加于主合约的意外附约详细手册。"
    }
  },
  { title: "คู่มือสัญญาเพิ่มเติม - ยกเว้นเบี้ย (Waiver)", code: "Waiver Rider Book", file: "rider-book-waive.pdf", group: "main", subcategory: "rider-handbook", badge: "W",
    description: {
      th: "เล่มรวมรายละเอียดสัญญาเพิ่มเติมประเภทยกเว้นเบี้ยประกันภัย เพื่อให้กรมธรรม์หลักยังมีผลในเงื่อนไขที่กำหนด",
      en: "Detailed handbook of premium waiver riders — keeps the main policy in force under qualifying conditions.",
      zh: "豁免保费附约详细手册——在符合条件时维持主合约的有效性。"
    }
  },

  // Vitality
  { title: "AIA Vitality", code: "Vitality", file: "vitality.pdf", group: "main", subcategory: "vitality", badge: "VIT",
    description: {
      th: "โปรแกรมส่งเสริมสุขภาพของ AIA สะสมคะแนนจากการดูแลสุขภาพ รับส่วนลดเบี้ยและสิทธิประโยชน์ต่างๆ",
      en: "AIA's wellness program — earn points by staying healthy and unlock premium discounts and rewards.",
      zh: "AIA 健康促进计划——透过维持健康累积积分,享保费折扣与各项权益。"
    }
  },
  { title: "AIA Vitality V70", code: "Vitality V70", file: "vitality-v70.pdf", group: "main", subcategory: "vitality", badge: "V70",
    description: {
      th: "แผน AIA Vitality รุ่น V70 พร้อมรายละเอียดสิทธิประโยชน์และส่วนลดในเวอร์ชันล่าสุด",
      en: "AIA Vitality V70 plan — benefits and discounts in the latest version.",
      zh: "AIA Vitality V70 方案——最新版本的权益与折扣详情。"
    }
  },
  { title: "AIA Vitality V80", code: "Vitality V80", file: "vitality-v80.pdf", group: "main", subcategory: "vitality", badge: "V80",
    description: {
      th: "แผน AIA Vitality รุ่น V80 พร้อมรายละเอียดสิทธิประโยชน์และส่วนลดในเวอร์ชันล่าสุด",
      en: "AIA Vitality V80 plan — benefits and discounts in the latest version.",
      zh: "AIA Vitality V80 方案——最新版本的权益与折扣详情。"
    }
  },

  // Accident: PA
  { title: "AIA PA (อุบัติเหตุส่วนบุคคล)", code: "PA", file: "pa.pdf", group: "accident", subcategory: "pa", badge: "PA",
    description: {
      th: "ประกันอุบัติเหตุส่วนบุคคล คุ้มครองการเสียชีวิต ทุพพลภาพ และค่ารักษาจากอุบัติเหตุ",
      en: "Personal accident insurance covering death, disability, and medical expenses from accidents.",
      zh: "个人意外保险,保障意外身故、残疾,以及因意外产生的医疗费用。"
    }
  },

  // Accident: High Risk
  { title: "AIA PA สำหรับอาชีพเสี่ยงภัยพิเศษ", code: "PA High Risk Occ", file: "pa-high-risk.pdf", group: "accident", subcategory: "pa-high-risk", badge: "HR",
    description: {
      th: "แผนอุบัติเหตุสำหรับอาชีพที่มีความเสี่ยงสูง ออกแบบความคุ้มครองให้เหมาะกับลักษณะงาน",
      en: "Accident plan for high-risk occupations — coverage tailored to the nature of the job.",
      zh: "针对高风险职业的意外保险——保障内容贴合工作性质。"
    }
  },

  // Accident: Worksite
  { title: "AIA WSM PA Plus (รายเดือน)", code: "WSM PA Plus", file: "wsm-pa-plus-month.pdf", group: "accident", subcategory: "pa-group", badge: "WSM+",
    description: {
      th: "แผนอุบัติเหตุกลุ่ม PA Plus สำหรับองค์กร ชำระเบี้ยรายเดือน ดูแลพนักงานทั้งทีม",
      en: "Group PA Plus plan for organizations — monthly premium covering the whole team.",
      zh: "适合企业的团体意外险 PA Plus——按月缴费,保障全体员工。"
    }
  },
  { title: "AIA WSM PA Safe (รายเดือน)", code: "WSM PA Safe", file: "wsm-pa-safe-month.pdf", group: "accident", subcategory: "pa-group", badge: "WSMS",
    description: {
      th: "แผนอุบัติเหตุกลุ่ม PA Safe สำหรับองค์กร เบี้ยประหยัด ชำระรายเดือน",
      en: "Group PA Safe plan for organizations — economical premium, paid monthly.",
      zh: "适合企业的团体意外险 PA Safe——保费经济,按月缴付。"
    }
  },

  // Accident: Micro
  { title: "AIA PA Micro", code: "PA Micro", file: "pa-micro.pdf", group: "accident", subcategory: "micro", badge: "PAM",
    description: {
      th: "แผนประกันภัยไมโครอินชัวรันส์ คุ้มครองอุบัติเหตุ ในราคาที่เข้าถึงได้สำหรับรายย่อย",
      en: "Microinsurance accident plan — accessible pricing for individual policyholders.",
      zh: "微型意外保险方案——价格亲民,适合个人投保。"
    }
  },
  { title: "Micro 100", code: "Micro100", file: "micro100.pdf", group: "accident", subcategory: "micro", badge: "M100",
    description: {
      th: "กรมธรรม์ประกันภัย 100 (ไมโครอินชัวรันส์) คุ้มครองพื้นฐานในราคาเริ่มต้น เหมาะกับผู้มีงบจำกัด",
      en: "Microinsurance 100 — basic coverage at an entry-level price, suited for limited budgets.",
      zh: "微型保险 100——基础保障,入门价位,适合预算有限的人士。"
    }
  },
  { title: "Micro 200", code: "Micro200", file: "micro200.pdf", group: "accident", subcategory: "micro", badge: "M200",
    description: {
      th: "ประกันภัย 200 สำหรับรายย่อย (ไมโครอินชัวรันส์) ความคุ้มครองเพิ่มขึ้นในราคาที่เข้าถึงง่าย",
      en: "Microinsurance 200 — enhanced coverage at an affordable price for retail policyholders.",
      zh: "面向零售客户的微型保险 200——保障升级,价格亲民。"
    }
  },
  { title: "Micro 300", code: "Micro300", file: "micro300.pdf", group: "accident", subcategory: "micro", badge: "M300",
    description: {
      th: "อุบัติเหตุเพื่อคนพิการสำหรับรายย่อย (ไมโครอินชัวรันส์) ออกแบบมาเพื่อกลุ่มผู้พิการโดยเฉพาะ",
      en: "Microinsurance 300 — accident coverage designed specifically for people with disabilities.",
      zh: "微型保险 300——专为残障人士设计的意外保障。"
    }
  }
];
