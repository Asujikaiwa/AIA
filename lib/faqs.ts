// FAQ ใช้ทั้งใน FAQ component และ JSON-LD FAQPage schema (SEO)
// q + a เป็น Localized (th/en/zh)

import type { Localized } from "@/lib/i18n";

export type Faq = { q: Localized; a: Localized };

export const faqs: Faq[] = [
  {
    q: {
      th: "ประกันสุขภาพเหมาจ่ายต่างจากแบบทั่วไปยังไง?",
      en: "How does a lump-sum health plan differ from a traditional one?",
      zh: "总额报销型健康保险与一般型有什么不同?"
    },
    a: {
      th: "เหมาจ่ายคือบริษัทจ่ายค่ารักษาตามจริงภายในวงเงินที่เลือก (เช่น 1-100 ล้านบาทต่อปี) โดยไม่จำกัดรายการย่อย เช่น ค่าผ่าตัด ค่ายา ค่าห้อง ส่วนแบบทั่วไปจะมีลิมิตแยกรายการชัดเจน เหมาะกับโรงพยาบาลเอกชนที่ค่าใช้จ่ายอาจสูงเกินวงเงินรายการ",
      en: "A lump-sum plan reimburses actual treatment costs within a single annual ceiling (e.g. 1 to 100 million baht), with no per-line sub-limits for surgery, medication, or room. A traditional plan caps each line item separately. Lump-sum suits private hospitals where individual costs may exceed per-line caps.",
      zh: "总额报销型在所选总额(例如每年 1 至 100 百万泰铢)内按实际治疗费用赔付,各细项(手术费、药费、病房费等)没有分项上限。传统型则会逐项设上限。总额型较适合费用可能超出分项上限的私立医院。"
    }
  },
  {
    q: {
      th: "ซื้อประกันชีวิตและสุขภาพช่วยลดหย่อนภาษีได้เท่าไหร่?",
      en: "How much can life and health insurance reduce my taxes?",
      zh: "购买人寿与健康保险可减税多少?"
    },
    a: {
      th: "ปัจจุบันลดหย่อนได้สูงสุด: ประกันชีวิต 100,000 บาท/ปี (รวมประกันชีวิตทั่วไป), ประกันสุขภาพตัวเอง 25,000 บาท (แต่รวมกับประกันชีวิตต้องไม่เกิน 100,000), ประกันสุขภาพพ่อแม่ 15,000 บาท, ประกันบำนาญ 200,000 บาท (รวม RMF/SSF/กบข./กองทุนสำรองเลี้ยงชีพ ไม่เกิน 500,000) ดูเงื่อนไขล่าสุดได้ที่กรมสรรพากร",
      en: "Current Thai deductions: life insurance up to 100,000 THB/year; own health insurance 25,000 THB (combined with life cannot exceed 100,000); parents' health insurance 15,000 THB; annuity 200,000 THB (with RMF/SSF/GPF/PVD combined, cannot exceed 500,000). Check the Thai Revenue Department for the latest rules.",
      zh: "目前泰国可扣除上限:人寿保险每年 100,000 泰铢;本人健康保险 25,000 泰铢(与人寿合计不得超过 100,000);父母健康保险 15,000 泰铢;年金保险 200,000 泰铢(与 RMF/SSF/GPF/PVD 合计不得超过 500,000)。最新规则以泰国税务厅为准。"
    }
  },
  {
    q: {
      th: "อายุเท่าไหร่ถึงควรเริ่มทำประกัน?",
      en: "What age should I start buying insurance?",
      zh: "应该几岁开始投保?"
    },
    a: {
      th: "ยิ่งทำตอนอายุน้อยยิ่งดี เพราะ 1) เบี้ยถูกกว่า (เบี้ยคำนวณจากอายุตอนเริ่ม), 2) สุขภาพดีกว่า ไม่ติดข้อยกเว้น, 3) มีระยะเวลาคุ้มครองนานกว่า โดยทั่วไปแนะนำให้เริ่มประกันสุขภาพ + โรคร้ายก่อนอายุ 30 และเริ่มประกันบำนาญตั้งแต่อายุ 30-35",
      en: "Earlier is better because (1) premium is cheaper (based on age at issue), (2) you're healthier so fewer exclusions, (3) coverage lasts longer. Generally start health + critical illness before age 30, and annuity around 30-35.",
      zh: "越早越好,因为(1)保费更便宜(以投保年龄计算),(2)身体更健康,较少除外责任,(3)保障期较长。一般建议在 30 岁前开始健康险与重疾险,30-35 岁开始年金险。"
    }
  },
  {
    q: {
      th: "ทำประกันแล้วเคลมยากไหม ใช้เวลานานเปล่า?",
      en: "Is making a claim difficult? How long does it take?",
      zh: "理赔会很麻烦吗?需要多久?"
    },
    a: {
      th: "AIA มีระบบเคลม Fax Claim ในโรงพยาบาลคู่สัญญากว่า 400 แห่งทั่วประเทศ ที่ไม่ต้องสำรองจ่าย ส่วนการเคลมแบบ Reimburse จะใช้เวลาประมาณ 7-15 วันทำการหลังเอกสารครบ ในฐานะตัวแทน ผมจะช่วยเตรียมเอกสาร ติดตามเคลม และประสานกับบริษัทตลอดให้ครับ",
      en: "AIA's Fax Claim works at 400+ partner hospitals nationwide with no upfront payment required. Reimbursement claims typically take 7-15 business days after complete documentation. As your agent, I help prepare documents, track the claim, and coordinate with the company throughout.",
      zh: "AIA 在全泰超过 400 家合作医院提供 Fax Claim 直付服务,无需先垫付。报销型理赔通常在文件齐全后约 7-15 个工作天完成。身为您的代理人,我会协助准备文件、跟进进度,并全程与公司沟通协调。"
    }
  },
  {
    q: {
      th: "ยูนิตลิงค์ (Unit Linked) ต่างจากประกันสะสมทรัพย์ยังไง?",
      en: "How is Unit Linked different from an endowment savings plan?",
      zh: "投资型(Unit Linked)和储蓄型寿险有什么不同?"
    },
    a: {
      th: "ยูนิตลิงค์ = ประกันชีวิต + การลงทุนในกองทุนรวม ผลตอบแทนขึ้นอยู่กับกองทุนที่เลือก มีโอกาสได้สูงแต่มีความเสี่ยง เลือกกองทุนเองได้ ส่วนสะสมทรัพย์ = ผลตอบแทนการันตีตามตาราง ไม่ขึ้นกับตลาด ปลอดภัยกว่าแต่ผลตอบแทนน้อยกว่า เหมาะกับคนต่างกัน",
      en: "Unit Linked combines life insurance with mutual fund investments — returns depend on chosen funds, potentially higher but with risk, and you choose the funds yourself. Endowment offers guaranteed returns per schedule, independent of markets — safer but lower returns. They suit different people.",
      zh: "投资型 = 人寿保险 + 共同基金投资,回报取决于所选基金,潜力较大但有风险,可自行选择基金。储蓄型 = 按既定表格的保证回报,与市场无关,较安全但回报较低。两者适合不同需求的人。"
    }
  },
  {
    q: {
      th: "ถ้ามีโรคประจำตัวอยู่แล้วทำประกันได้ไหม?",
      en: "Can I buy insurance if I have a pre-existing condition?",
      zh: "已经有慢性病或既往病史还能投保吗?"
    },
    a: {
      th: "ทำได้ครับ แต่บริษัทอาจมีเงื่อนไขเพิ่ม เช่น 1) ยกเว้นความคุ้มครองโรคที่เป็นอยู่ (Exclusion), 2) คิดเบี้ยเพิ่ม (Loading), 3) ปฏิเสธการรับประกันในกรณีที่อาการรุนแรง ทุกอย่างขึ้นกับประวัติสุขภาพและการพิจารณาของแพทย์บริษัท ผมแนะนำให้แจ้งความจริงทุกอย่างเพื่อไม่ให้มีปัญหาตอนเคลม",
      en: "Yes, but the insurer may add conditions: (1) exclude the existing condition, (2) add a premium loading, or (3) decline cover for severe cases. It depends on your medical history and the insurer's underwriter. I recommend full honest disclosure to avoid claim problems later.",
      zh: "可以,但保险公司可能附加条件:(1)将既有疾病列为除外责任,(2)加费承保,(3)病情严重时拒保。视个人病史与核保医生评估而定。建议如实揭露所有病史,以免日后理赔出现问题。"
    }
  },
  {
    q: {
      th: "ยกเลิกประกันกลางคันได้ไหม จะได้เงินคืนเท่าไหร่?",
      en: "Can I cancel the policy midway? How much do I get back?",
      zh: "可以中途解约吗?能拿回多少钱?"
    },
    a: {
      th: "ยกเลิกได้ทุกเมื่อ แต่จะได้เงินคืนตาม 'มูลค่าเวนคืน' ในตารางกรมธรรม์ ซึ่งช่วงปีแรกๆ มักได้คืนน้อยมาก (อาจ 0% ใน 1-2 ปีแรก) เพราะเบี้ยส่วนใหญ่เป็นค่าคุ้มครองและค่าใช้จ่ายบริษัท ดังนั้นควรซื้อแผนที่จ่ายไหวระยะยาว มากกว่าซื้อใหญ่แล้วยกเลิก",
      en: "You can cancel anytime, but you'll only receive the 'surrender value' shown in the policy schedule, which is very low in early years (often 0% in years 1-2) because most early premium goes to coverage cost and company expenses. Buy a plan you can sustain long-term rather than a big one you may cancel.",
      zh: "随时可以解约,但只能取回保单表内的「解约金」。前几年金额很低(通常前 1-2 年为 0%),因为早期保费多用于保障成本与公司费用。建议选择长期负担得起的方案,而不是先买大额再解约。"
    }
  },
  {
    q: {
      th: "ทำประกันโรคร้ายแรง (CI) ซ้ำกับประกันสุขภาพรึเปล่า?",
      en: "Does critical illness (CI) insurance overlap with health insurance?",
      zh: "买了重疾险还需要健康险吗?会重复吗?"
    },
    a: {
      th: "ไม่ซ้ำครับ คนละจุดประสงค์ — ประกันสุขภาพจ่ายค่ารักษา (ตามใบเสร็จ) แต่ CI จ่ายเงินก้อนทันทีเมื่อตรวจพบโรค ไม่ว่าจะรักษาจริงเท่าไหร่ เงินก้อนนั้นใช้ได้อิสระ เช่น พักรักษาตัว ขาดรายได้ ค่าผู้ดูแล ค่าเดินทางรักษา การมีทั้งสองจะช่วยให้คุณดูแลตัวเองได้เต็มที่",
      en: "No, they serve different purposes. Health insurance reimburses actual treatment costs (per receipts). CI pays a lump sum upon diagnosis, regardless of treatment cost — the money is freely usable for recovery time, lost income, caregivers, or travel for treatment. Having both gives you full coverage.",
      zh: "不重复,目的不同。健康险按收据报销实际治疗费用;重疾险则在确诊时一次性给付,与实际治疗费无关,可自由用于休养期、收入损失、看护费、跨地求医等。两者兼有才能让您更完整地照顾自己。"
    }
  },
  {
    q: {
      th: "ปรึกษาผมต้องเสียค่าใช้จ่ายไหม?",
      en: "Is there a fee for consulting with you?",
      zh: "找您咨询需要费用吗?"
    },
    a: {
      th: "ไม่เสียครับ ปรึกษาฟรีไม่มีข้อผูกมัด ผมจะให้ข้อมูลครบ ทั้งข้อดี ข้อเสีย และค่าใช้จ่าย ให้คุณตัดสินใจเอง ไม่กดดัน ไม่เร่ง คุณซื้อหรือไม่ซื้อก็ไม่เป็นไรครับ ขอแค่ให้ข้อมูลที่ถูกต้องไปประกอบการตัดสินใจ",
      en: "No fee — consultations are free with no obligation. I'll give complete information including pros, cons, and costs so you can decide. No pressure, no rush. You're welcome to buy or not — my goal is to give you accurate information to decide with.",
      zh: "免费咨询,无任何义务。我会完整说明优点、缺点与费用,让您自行决定,绝不施压、绝不催促。买与不买都没关系,只希望提供正确资讯协助您做决定。"
    }
  },
  {
    q: {
      th: "ขอใบเสนอจะใช้เวลานานไหม ต้องเตรียมข้อมูลอะไรบ้าง?",
      en: "How long does a quote take? What info do you need?",
      zh: "索取报价要多久?需要准备什么资料?"
    },
    a: {
      th: "ใช้เวลา 1-2 วันทำการ ขอข้อมูลเบื้องต้น: 1) อายุ + เพศ, 2) อาชีพ, 3) งบเบี้ยที่จ่ายไหว/ปี หรือทุนประกันที่ต้องการ, 4) เป้าหมาย (สุขภาพ/ออมเงิน/มรดก/บำนาญ), 5) ประวัติสุขภาพคร่าวๆ ทักผมทาง LINE หรือกรอกฟอร์มด้านล่าง ผมจัดให้ครับ",
      en: "1-2 business days. I'll need: (1) age + gender, (2) occupation, (3) affordable annual premium or desired sum assured, (4) goals (health/savings/legacy/retirement), (5) brief medical history. Message me on LINE or fill out the form below — I'll prepare the quote.",
      zh: "1-2 个工作天。请准备:(1)年龄与性别,(2)职业,(3)可承担的年保费或希望的保额,(4)目标(健康/储蓄/传承/退休),(5)简要的健康史。可透过 LINE 联络我或填写下方表单,我会为您准备报价。"
    }
  }
];
