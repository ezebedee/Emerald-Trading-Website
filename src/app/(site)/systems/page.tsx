import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/dev/page-placeholder";
import { JsonLd } from "@/components/seo/json-ld";
import {
  createPageMetadata,
  createRouteWebPageJsonLd,
  routeSeoMetadata,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(
  routeSeoMetadata["/systems"],
);

const pageJsonLd = createRouteWebPageJsonLd("/systems", [
  { name: "Home", path: "/" },
  { name: "Trading Systems", path: "/systems" },
]);

export default function SystemsPage() {
  return (
    <>
      <JsonLd data={pageJsonLd} />
      <PagePlaceholder title="Systems" />
    </>
  );
}
