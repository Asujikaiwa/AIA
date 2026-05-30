// Schema.org JSON-LD generators
// ใช้ Person + LocalBusiness/FinancialService + WebSite + FAQPage
// เพื่อให้ Google เข้าใจเว็บและแสดง rich result

export const SITE_URL = "https://phaiboon-aia.com";
export const AGENT_NAME = "ไพบูลย์ พิลาชัย";
export const AGENT_NAME_EN = "Phaiboon Pilachai";
export const AGENT_PHONE = "+66962492611";
export const AGENT_EMAIL = "phaiboonaia@gmail.com";
export const LICENSE_NO = "6901006784";

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: AGENT_NAME,
    alternateName: AGENT_NAME_EN,
    jobTitle: "ตัวแทนประกันชีวิต AIA",
    description:
      "ตัวแทนประกันชีวิต บริษัท เอไอเอ จำกัด ที่ปรึกษาวางแผนประกันสุขภาพ ประกันชีวิต โรคร้ายแรง และวางแผนภาษี",
    url: SITE_URL,
    image: `${SITE_URL}/profile.jpg`,
    telephone: AGENT_PHONE,
    email: AGENT_EMAIL,
    worksFor: {
      "@type": "Organization",
      name: "AIA Thailand",
      url: "https://www.aia.co.th"
    },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      name: "ใบอนุญาตตัวแทนประกันชีวิต",
      credentialCategory: "license",
      recognizedBy: {
        "@type": "Organization",
        name: "สำนักงานคณะกรรมการกำกับและส่งเสริมการประกอบธุรกิจประกันภัย (คปภ.)",
        alternateName: "Office of Insurance Commission (OIC)"
      },
      identifier: LICENSE_NO
    }
  };
}

export function financialServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "@id": `${SITE_URL}/#service`,
    name: `${AGENT_NAME} - ตัวแทนประกัน AIA`,
    description:
      "บริการให้คำปรึกษาและวางแผนประกันชีวิต ประกันสุขภาพ โรคร้ายแรง บำนาญ ออมทรัพย์ และยูนิตลิงค์ของ AIA Thailand",
    url: SITE_URL,
    image: `${SITE_URL}/profile.jpg`,
    telephone: AGENT_PHONE,
    email: AGENT_EMAIL,
    priceRange: "ปรึกษาฟรี",
    areaServed: {
      "@type": "Country",
      name: "Thailand"
    },
    serviceType: [
      "ประกันสุขภาพ",
      "ประกันชีวิต",
      "ประกันโรคร้ายแรง",
      "ประกันบำนาญ",
      "ประกันสะสมทรัพย์",
      "ประกันยูนิตลิงค์",
      "ประกันอุบัติเหตุ"
    ],
    provider: { "@id": `${SITE_URL}/#person` }
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: `${AGENT_NAME_EN} | ตัวแทนประกัน AIA มืออาชีพ`,
    inLanguage: "th-TH",
    publisher: { "@id": `${SITE_URL}/#person` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/brochures?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}

export function breadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`
    }))
  };
}

/**
 * FAQPage schema สำหรับ SEO
 * ใช้ภาษาไทยเป็นหลัก (ตาม inLanguage ของเว็บ) เพื่อให้ Google ไทยแสดง rich result
 * รับได้ทั้ง { q: string; a: string } และ Localized
 */
export function faqSchema(
  faqs: Array<{ q: string | { th: string }; a: string | { th: string } }>
) {
  const text = (v: string | { th: string }): string =>
    typeof v === "string" ? v : v.th;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: text(f.q),
      acceptedAnswer: {
        "@type": "Answer",
        text: text(f.a)
      }
    }))
  };
}
