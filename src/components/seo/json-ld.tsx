import type { JsonLdValue } from "@/lib/seo";

type JsonLdProps = Readonly<{
  data: JsonLdValue;
}>;

const serializeJsonLd = (data: JsonLdValue) =>
  JSON.stringify(data).replaceAll("<", "\\u003c");

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
