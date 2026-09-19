import type { Metadata } from "next";

import { ResearchContent } from "@/components/engineering/research-content";
import { JsonLd } from "@/components/seo/json-ld";
import {
  createPageMetadata,
  createRouteWebPageJsonLd,
  routeSeoMetadata,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(
  routeSeoMetadata["/research"],
);

const pageJsonLd = createRouteWebPageJsonLd("/research", [
  { name: "Home", path: "/" },
  { name: "Research", path: "/research" },
]);

export default function ResearchPage() {
  return (
    <>
      <JsonLd data={pageJsonLd} />
      <ResearchContent />
    </>
  );
}
