import type { Metadata } from "next";

import { CompanyLegalContent } from "@/components/company/company-legal-content";
import { JsonLd } from "@/components/seo/json-ld";
import {
  createPageMetadata,
  createRouteWebPageJsonLd,
  routeSeoMetadata,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(
  routeSeoMetadata["/about"],
);

const pageJsonLd = createRouteWebPageJsonLd("/about", [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
]);

export default function AboutPage() {
  return (
    <>
      <JsonLd data={pageJsonLd} />
      <CompanyLegalContent page="about" />
    </>
  );
}
