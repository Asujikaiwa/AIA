"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, FileText, Eye, Download, X } from "lucide-react";
import {
  brochures,
  groups,
  subCategories,
  type Brochure,
  type GroupId
} from "@/lib/brochures";

type Filter = "all" | GroupId;

function normalize(s: string) {
  return s.toLowerCase().normalize("NFC");
}

export default function BrochureBrowser() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    return brochures.filter((b) => {
      if (filter !== "all" && b.group !== filter) return false;
      if (!q) return true;
      const haystack = normalize(
        `${b.title} ${b.code} ${b.description} ${b.badge}`
      );
      return haystack.includes(q);
    });
  }, [query, filter]);

  // Group filtered items by group then by subcategory, preserving the
  // subCategories order so the page reads consistently.
  const grouped = useMemo(() => {
    const result: Array<{
      groupId: GroupId;
      sections: Array<{ subId: string; subLabel: string; items: Brochure[] }>;
    }> = [];

    const groupsToShow =
      filter === "all" ? groups.map((g) => g.id) : ([filter] as GroupId[]);

    for (const gid of groupsToShow) {
      const subs = subCategories.filter((s) => s.group === gid);
      const sections = subs
        .map((s) => ({
          subId: s.id,
          subLabel: s.label,
          items: filtered.filter((b) => b.subcategory === s.id)
        }))
        .filter((s) => s.items.length > 0);
      if (sections.length > 0) result.push({ groupId: gid, sections });
    }
    return result;
  }, [filtered, filter]);

  const totalCount = filtered.length;

  return (
    <div>
      {/* Controls */}
      <div className="sticky top-16 sm:top-20 z-30 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-4 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-aia-gray pointer-events-none"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ค้นหาแบบประกัน เช่น Health Happy, สะสมทรัพย์, PA..."
              className="w-full pl-11 pr-10 py-3 rounded-full border border-gray-200 bg-white text-sm text-aia-slate placeholder:text-aia-gray/70 focus:outline-none focus:border-aia-red focus:ring-2 focus:ring-aia-red/20 transition-all"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="ล้างคำค้นหา"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-aia-gray hover:text-aia-red hover:bg-aia-redLight transition-colors"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Group tabs */}
          <div className="flex gap-2 overflow-x-auto -mx-1 px-1">
            <FilterPill
              active={filter === "all"}
              onClick={() => setFilter("all")}
              label="ทั้งหมด"
              count={brochures.length}
            />
            {groups.map((g) => (
              <FilterPill
                key={g.id}
                active={filter === g.id}
                onClick={() => setFilter(g.id)}
                label={g.label}
                count={brochures.filter((b) => b.group === g.id).length}
              />
            ))}
          </div>
        </div>

        <p className="mt-3 text-xs text-aia-gray">
          พบ <span className="font-semibold text-aia-red">{totalCount}</span>{" "}
          แบบประกัน
          {query && (
            <>
              {" "}
              ที่ตรงกับ <span className="font-semibold">&quot;{query}&quot;</span>
            </>
          )}
        </p>
      </div>

      {/* Empty state */}
      {grouped.length === 0 && (
        <div className="py-20 text-center">
          <div className="inline-flex w-16 h-16 rounded-full bg-aia-redLight items-center justify-center text-aia-red mb-4">
            <Search size={28} />
          </div>
          <h3 className="text-lg font-bold text-aia-slate">
            ไม่พบแบบประกันที่ค้นหา
          </h3>
          <p className="mt-2 text-aia-gray">
            ลองเปลี่ยนคำค้นหาหรือเลือกหมวดใหม่ดูครับ
          </p>
        </div>
      )}

      {/* Grouped results */}
      {grouped.map(({ groupId, sections }) => {
        const group = groups.find((g) => g.id === groupId)!;
        return (
          <section key={groupId} className="mt-10">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-aia-red mb-1">
                {group.eyebrow}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-aia-slate">
                {group.label}
              </h2>
              <p className="mt-2 text-aia-gray max-w-3xl">{group.description}</p>
            </div>

            {sections.map((sec) => (
              <div key={sec.subId} className="mb-10">
                <div className="flex items-baseline gap-3 mb-4">
                  <h3 className="text-lg font-bold text-aia-slate">
                    {sec.subLabel}
                  </h3>
                  <span className="text-xs text-aia-gray">
                    {sec.items.length} แบบ
                  </span>
                  <span className="flex-1 h-px bg-gradient-to-r from-aia-redLight to-transparent" />
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {sec.items.map((item, i) => (
                    <BrochureCard
                      key={item.file}
                      item={item}
                      index={i}
                      highlight={query}
                    />
                  ))}
                </div>
              </div>
            ))}
          </section>
        );
      })}
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  label,
  count
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`whitespace-nowrap inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
        active
          ? "bg-aia-red text-white shadow-soft"
          : "bg-white border border-gray-200 text-aia-slate hover:border-aia-red hover:text-aia-red"
      }`}
    >
      {label}
      <span
        className={`text-xs px-1.5 py-0.5 rounded-full ${
          active ? "bg-white/20" : "bg-aia-redLight text-aia-red"
        }`}
      >
        {count}
      </span>
    </button>
  );
}

function BrochureCard({
  item,
  index = 0,
  highlight
}: {
  item: Brochure;
  index?: number;
  highlight?: string;
}) {
  const href = `/brochures/${item.file}`;
  const slug = item.file.replace(/\.pdf$/i, "");
  const thumbSrc = `/brochures/thumbs/${slug}.jpg`;
  const [thumbOk, setThumbOk] = useState(true);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: (index % 4) * 0.05 }}
      className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-card hover:border-aia-red/30 transition-all duration-300 flex flex-col h-full"
    >
      {/* Cover / preview */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative aspect-[3/4] bg-gradient-to-br from-aia-red to-aia-redDark overflow-hidden"
        aria-label={`เปิดดูโบรชัวร์ ${item.title}`}
      >
        {thumbOk ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumbSrc}
            alt={`รูปตัวอย่างโบรชัวร์ ${item.title}`}
            loading="lazy"
            onError={() => setThumbOk(false)}
            className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
          />
        ) : (
          <>
            {/* Decorative pattern */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 1px, transparent 0)",
                backgroundSize: "16px 16px"
              }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white text-center">
              <FileText size={36} className="mb-3 opacity-90" />
              <div className="text-3xl font-bold tracking-tight leading-none">
                {item.badge}
              </div>
              <div className="mt-3 text-[10px] uppercase tracking-[0.2em] font-semibold opacity-80">
                AIA Brochure
              </div>
            </div>
          </>
        )}
        <div className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-white/90 backdrop-blur px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-aia-red">
          PDF
        </div>
      </a>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-aia-red mb-1">
          {item.code}
        </p>
        <h3 className="text-base font-bold text-aia-slate mb-2 leading-snug">
          <Highlight text={item.title} query={highlight} />
        </h3>
        <p className="text-sm text-aia-gray leading-relaxed mb-5 flex-1">
          {item.description}
        </p>

        <div className="flex items-center gap-2">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 flex-1 rounded-full bg-aia-red px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-aia-redDark"
          >
            <Eye size={16} />
            เปิดอ่าน
          </a>
          <a
            href={href}
            download
            aria-label={`ดาวน์โหลดโบรชัวร์ ${item.title}`}
            className="inline-flex items-center justify-center rounded-full border-2 border-aia-red px-3 py-2 text-aia-red transition-colors hover:bg-aia-red hover:text-white"
          >
            <Download size={16} />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

function Highlight({ text, query }: { text: string; query?: string }) {
  const q = (query ?? "").trim();
  if (!q) return <>{text}</>;
  const idx = normalize(text).indexOf(normalize(q));
  if (idx === -1) return <>{text}</>;
  const before = text.slice(0, idx);
  const match = text.slice(idx, idx + q.length);
  const after = text.slice(idx + q.length);
  return (
    <>
      {before}
      <mark className="bg-aia-redLight text-aia-red px-0.5 rounded">
        {match}
      </mark>
      {after}
    </>
  );
}
