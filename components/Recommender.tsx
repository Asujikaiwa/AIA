"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  FileText,
  MessageCircle,
  Sparkles
} from "lucide-react";
import { brochures, type Brochure, type SubCategoryId } from "@/lib/brochures";

type Goal = "health" | "saving" | "ci" | "retire" | "family" | "tax";
type Budget = "low" | "mid" | "high" | "premium";
type Stage = "single" | "family" | "parent" | "near-retire" | "retired";

type Answers = {
  age?: number;
  stage?: Stage;
  goals: Goal[];
  budget?: Budget;
};

const goalOptions: { id: Goal; label: string; desc: string }[] = [
  { id: "health", label: "ดูแลค่ารักษาพยาบาล", desc: "Health Happy, AHC, Health Saver" },
  { id: "ci", label: "คุ้มครองโรคร้ายแรง", desc: "CI Care, MPCI Plus, Care for Cancer" },
  { id: "saving", label: "ออมเงิน / สะสมทรัพย์", desc: "SavingSure, Endowment, Smart Wealth" },
  { id: "retire", label: "วางแผนเกษียณ", desc: "Annuity Sure, Annuity Fix" },
  { id: "family", label: "คุ้มครองครอบครัว / มรดก", desc: "Legacy Prestige, WealthMax" },
  { id: "tax", label: "ลดหย่อนภาษี", desc: "Annuity + ประกันชีวิตชนิดต่างๆ" }
];

const stageOptions: { id: Stage; label: string; desc: string }[] = [
  { id: "single", label: "โสด / เพิ่งเริ่มทำงาน", desc: "อายุ 22-30" },
  { id: "family", label: "มีครอบครัวแล้ว", desc: "มีคู่/ลูกที่ต้องดูแล" },
  { id: "parent", label: "ดูแลพ่อแม่", desc: "อยากซื้อให้คนในครอบครัว" },
  { id: "near-retire", label: "ใกล้เกษียณ", desc: "อายุ 50+ วางแผนวัยเกษียณ" },
  { id: "retired", label: "เกษียณแล้ว / ผู้สูงอายุ", desc: "60+ เน้นรักษาทรัพย์สิน" }
];

const budgetOptions: { id: Budget; label: string; desc: string }[] = [
  { id: "low", label: "ต่ำกว่า 1,500 บาท / เดือน", desc: "เน้นเริ่มต้น คุ้มครองพื้นฐาน" },
  { id: "mid", label: "1,500 - 5,000 บาท / เดือน", desc: "ครอบคลุมโรคทั่วไป + โรคร้าย" },
  { id: "high", label: "5,000 - 15,000 บาท / เดือน", desc: "วงเงินสูง + ออม + ลงทุน" },
  { id: "premium", label: "มากกว่า 15,000 บาท / เดือน", desc: "พรีเมียม + วางแผนมรดก" }
];

const STEPS = ["age", "stage", "goals", "budget", "result"] as const;
type Step = (typeof STEPS)[number];

// Map goal → preferred subcategories (in priority order)
const goalToSubs: Record<Goal, SubCategoryId[]> = {
  health: ["rider"],
  ci: ["rider", "ci-whole-life"],
  saving: ["endowment", "unit-linked"],
  retire: ["annuity"],
  family: ["whole-life", "unit-linked"],
  tax: ["annuity", "whole-life", "rider"]
};

// Map budget → preferred product "tier"
const budgetTier: Record<Budget, "starter" | "mid" | "premium" | "prestige"> = {
  low: "starter",
  mid: "mid",
  high: "premium",
  premium: "prestige"
};

// Heuristic score for ranking
function scoreBrochure(b: Brochure, ans: Answers): number {
  let score = 0;
  const tier = ans.budget ? budgetTier[ans.budget] : "mid";

  // Goal alignment
  for (const g of ans.goals) {
    const subs = goalToSubs[g];
    const idx = subs.indexOf(b.subcategory);
    if (idx >= 0) score += 10 - idx * 2;
  }

  // Stage-specific
  if (ans.stage === "near-retire" || ans.stage === "retired") {
    if (b.subcategory === "annuity") score += 4;
    if (b.code.toLowerCase().includes("senior")) score += 6;
  }
  if (ans.stage === "family") {
    if (b.subcategory === "whole-life") score += 3;
    if (b.code.includes("Happy Kids")) score += 5;
  }
  if (ans.stage === "single" && b.subcategory === "rider") score += 2;
  if (ans.stage === "parent" && b.code.toLowerCase().includes("senior")) score += 5;

  // Tier alignment
  const isPrestige = /Prestige/i.test(b.code);
  const isLight = /(Starter|Plus|Saver|10\/15|5\/10|Excellent)/i.test(b.code);
  if (tier === "prestige" && isPrestige) score += 5;
  if (tier === "premium" && isPrestige) score += 2;
  if (tier === "starter" && isLight) score += 3;
  if (tier === "starter" && isPrestige) score -= 4;

  // Avoid showing handbook/Term tables in recommendation
  if (b.subcategory === "rider-handbook" || b.subcategory === "term") score -= 100;

  // Age sanity (kids)
  if (b.code.includes("Happy Kids") && (ans.age ?? 30) > 18) score -= 6;

  return score;
}

function recommendList(ans: Answers, limit = 6): Brochure[] {
  const scored = brochures
    .map((b) => ({ b, s: scoreBrochure(b, ans) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s);
  // de-dupe by subcategory to keep results varied
  const seen = new Set<string>();
  const out: Brochure[] = [];
  for (const { b } of scored) {
    const key = b.subcategory;
    const cnt = [...seen].filter((s) => s.startsWith(key)).length;
    if (cnt >= 2) continue;
    seen.add(`${key}-${cnt}`);
    out.push(b);
    if (out.length >= limit) break;
  }
  return out;
}

const LINE_URL = "https://lin.ee/your-line-oa";

export default function Recommender() {
  const [step, setStep] = useState<Step>("age");
  const [answers, setAnswers] = useState<Answers>({ goals: [] });

  const recommendations = useMemo(
    () => (step === "result" ? recommendList(answers) : []),
    [step, answers]
  );

  const stepIdx = STEPS.indexOf(step);
  const progress = ((stepIdx + 1) / STEPS.length) * 100;

  const canGoNext = (() => {
    switch (step) {
      case "age":
        return typeof answers.age === "number" && answers.age >= 1 && answers.age <= 90;
      case "stage":
        return !!answers.stage;
      case "goals":
        return answers.goals.length > 0;
      case "budget":
        return !!answers.budget;
      default:
        return false;
    }
  })();

  const next = () => {
    const i = STEPS.indexOf(step);
    if (i < STEPS.length - 1) setStep(STEPS[i + 1]);
  };
  const prev = () => {
    const i = STEPS.indexOf(step);
    if (i > 0) setStep(STEPS[i - 1]);
  };
  const restart = () => {
    setAnswers({ goals: [] });
    setStep("age");
  };

  const lineMessage = useMemo(() => {
    const goalLabels = answers.goals
      .map((g) => goalOptions.find((o) => o.id === g)?.label)
      .filter(Boolean)
      .join(", ");
    const stage = stageOptions.find((o) => o.id === answers.stage)?.label;
    const budget = budgetOptions.find((o) => o.id === answers.budget)?.label;
    return [
      "สวัสดีครับ ขอใบเสนอแบบประกันจากเครื่องช่วยเลือกบนเว็บครับ",
      `อายุ: ${answers.age ?? "-"} ปี`,
      `ช่วงชีวิต: ${stage ?? "-"}`,
      `เป้าหมาย: ${goalLabels || "-"}`,
      `งบประมาณ: ${budget ?? "-"}`,
      `แบบที่สนใจ: ${recommendations.map((r) => r.code).join(", ")}`
    ].join("\n");
  }, [answers, recommendations]);

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-xs text-aia-gray mb-2">
          <span>
            ขั้นตอนที่ {stepIdx + 1} จาก {STEPS.length}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
            className="h-full bg-gradient-to-r from-aia-red to-aia-redDark rounded-full"
          />
        </div>
      </div>

      {/* Steps */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {step === "age" && (
            <Card title="คุณอายุเท่าไหร่?" subtitle="เบี้ยและประเภทแบบประกันที่เหมาะขึ้นกับช่วงอายุ">
              <input
                type="number"
                min={1}
                max={90}
                value={answers.age ?? ""}
                onChange={(e) =>
                  setAnswers((a) => ({
                    ...a,
                    age: e.target.value ? Number(e.target.value) : undefined
                  }))
                }
                placeholder="เช่น 32"
                className="w-full text-2xl font-semibold text-center py-5 px-6 rounded-2xl border-2 border-gray-200 focus:border-aia-red focus:outline-none focus:ring-4 focus:ring-aia-red/20 transition-all"
              />
            </Card>
          )}

          {step === "stage" && (
            <Card title="ตอนนี้คุณอยู่ในช่วงไหนของชีวิต?" subtitle="เลือก 1 ข้อที่ใกล้เคียงที่สุด">
              <div className="grid sm:grid-cols-2 gap-3">
                {stageOptions.map((o) => (
                  <OptionButton
                    key={o.id}
                    label={o.label}
                    desc={o.desc}
                    selected={answers.stage === o.id}
                    onClick={() => setAnswers((a) => ({ ...a, stage: o.id }))}
                  />
                ))}
              </div>
            </Card>
          )}

          {step === "goals" && (
            <Card title="คุณอยากได้แบบประกันเพื่ออะไร?" subtitle="เลือกได้หลายข้อ">
              <div className="grid sm:grid-cols-2 gap-3">
                {goalOptions.map((o) => {
                  const selected = answers.goals.includes(o.id);
                  return (
                    <OptionButton
                      key={o.id}
                      label={o.label}
                      desc={o.desc}
                      selected={selected}
                      onClick={() =>
                        setAnswers((a) => ({
                          ...a,
                          goals: selected
                            ? a.goals.filter((g) => g !== o.id)
                            : [...a.goals, o.id]
                        }))
                      }
                    />
                  );
                })}
              </div>
            </Card>
          )}

          {step === "budget" && (
            <Card title="งบเบี้ยที่จ่ายไหวต่อเดือน?" subtitle="ประมาณการเบื้องต้น เพื่อแนะนำแบบที่เหมาะ">
              <div className="space-y-3">
                {budgetOptions.map((o) => (
                  <OptionButton
                    key={o.id}
                    label={o.label}
                    desc={o.desc}
                    selected={answers.budget === o.id}
                    onClick={() => setAnswers((a) => ({ ...a, budget: o.id }))}
                  />
                ))}
              </div>
            </Card>
          )}

          {step === "result" && (
            <div>
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-aia-redLight rounded-full text-aia-red text-sm font-semibold mb-4">
                  <Sparkles size={16} />
                  ผลการแนะนำ
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-aia-slate">
                  {recommendations.length > 0
                    ? `${recommendations.length} แบบที่น่าจะเหมาะกับคุณ`
                    : "ยังจับคู่ไม่เจอ ขอข้อมูลเพิ่ม"}
                </h2>
                <p className="mt-3 text-aia-gray">
                  ระบบเรียงตามความเหมาะสมจากคำตอบของคุณ คลิกดูโบรชัวร์
                  หรือทักผมเพื่อขอใบเสนอจริง
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {recommendations.map((b, i) => {
                  const slug = b.file.replace(/\.pdf$/i, "");
                  return (
                    <motion.div
                      key={b.file}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.06 }}
                      className="flex gap-4 bg-white rounded-2xl p-4 border border-gray-100 hover:shadow-card hover:border-aia-red/30 transition-all"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/brochures/thumbs/${slug}.jpg`}
                        alt={b.title}
                        className="w-16 h-22 object-cover rounded-md flex-shrink-0 bg-aia-redLight"
                        style={{ aspectRatio: "3/4" }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-aia-red">
                          อันดับ {i + 1}
                        </p>
                        <h3 className="font-bold text-aia-slate text-sm leading-snug mb-1">
                          {b.title}
                        </h3>
                        <p className="text-xs text-aia-gray line-clamp-2 mb-2">
                          {b.description}
                        </p>
                        <a
                          href={`/brochures/${b.file}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-aia-red hover:text-aia-redDark"
                        >
                          <FileText size={12} />
                          เปิดโบรชัวร์
                        </a>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* CTA */}
              <div className="rounded-3xl bg-gradient-to-br from-aia-red to-aia-redDark p-6 sm:p-8 text-white text-center">
                <h3 className="text-xl sm:text-2xl font-bold">
                  อยากได้ใบเสนอจริง?
                </h3>
                <p className="mt-2 text-white/90">
                  ทักผมพร้อมส่งข้อมูลที่กรอกแล้ว ผมจะจัดใบเสนอที่เหมาะกับคุณภายใน 1-2 วัน
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={`${LINE_URL}?text=${encodeURIComponent(lineMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-aia-red font-semibold px-7 py-3 hover:bg-aia-redLight transition-colors"
                  >
                    <MessageCircle size={18} />
                    ส่งข้อมูลทาง LINE
                  </a>
                  <Link
                    href="/#contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/40 text-white font-semibold px-7 py-3 hover:bg-white/10 transition-colors"
                  >
                    ฝากเบอร์แทน
                  </Link>
                </div>
              </div>

              <div className="mt-8 text-center">
                <button
                  type="button"
                  onClick={restart}
                  className="text-sm text-aia-gray hover:text-aia-red transition-colors"
                >
                  เริ่มใหม่อีกครั้ง
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Nav buttons */}
      {step !== "result" && (
        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            onClick={prev}
            disabled={stepIdx === 0}
            className="inline-flex items-center gap-1.5 text-aia-gray hover:text-aia-slate disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeft size={16} />
            ย้อนกลับ
          </button>
          <button
            type="button"
            onClick={next}
            disabled={!canGoNext}
            className="inline-flex items-center gap-2 rounded-full bg-aia-red text-white font-semibold px-7 py-3 hover:bg-aia-redDark disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:-translate-y-0.5 hover:shadow-card"
          >
            {step === "budget" ? "ดูผลแนะนำ" : "ถัดไป"}
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

function Card({
  title,
  subtitle,
  children
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-aia-slate text-center">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-aia-gray text-center mb-8">{subtitle}</p>
      )}
      <div className={subtitle ? "" : "mt-8"}>{children}</div>
    </div>
  );
}

function OptionButton({
  label,
  desc,
  selected,
  onClick
}: {
  label: string;
  desc?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group w-full text-left rounded-2xl p-5 border-2 transition-all flex items-start gap-4 ${
        selected
          ? "border-aia-red bg-aia-redLight/40"
          : "border-gray-200 bg-white hover:border-aia-red/40 hover:bg-aia-redLight/20"
      }`}
    >
      <span
        className={`flex-shrink-0 mt-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
          selected
            ? "bg-aia-red border-aia-red text-white"
            : "border-gray-300 group-hover:border-aia-red/50"
        }`}
      >
        {selected && <Check size={14} strokeWidth={3} />}
      </span>
      <span className="flex-1">
        <span className="block font-semibold text-aia-slate">{label}</span>
        {desc && (
          <span className="block text-sm text-aia-gray mt-0.5">{desc}</span>
        )}
      </span>
    </button>
  );
}
