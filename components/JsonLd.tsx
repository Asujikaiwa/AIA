// Server component สำหรับฝัง JSON-LD script
// ไม่ render อะไรใน DOM ที่มองเห็น แต่บอท Google จะอ่าน

type Schema = Record<string, unknown> | Array<Record<string, unknown>>;

export default function JsonLd({ data }: { data: Schema }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
