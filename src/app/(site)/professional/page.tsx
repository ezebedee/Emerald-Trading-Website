import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/dev/page-placeholder";
import { JsonLd } from "@/components/seo/json-ld";
import {
  createPageMetadata,
  createRouteWebPageJsonLd,
  routeSeoMetadata,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(
  routeSeoMetadata["/professional"],
);

const pageJsonLd = createRouteWebPageJsonLd("/professional", [
  { name: "Home", path: "/" },
  { name: "Professional & Investor", path: "/professional" },
]);

export default function ProfessionalPage() {
  return (
    <>
      <JsonLd data={pageJsonLd} />
      <PagePlaceholder title="Investor / Professional Page" />
    </>
  );
}
