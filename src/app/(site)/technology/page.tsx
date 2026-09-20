import type { Metadata } from "next";

import { TechnologyContent } from "@/components/engineering/technology-content";
import { JsonLd } from "@/components/seo/json-ld";
import {
  createPageMetadata,
  createRouteWebPageJsonLd,
  routeSeoMetadata,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(
  routeSeoMetadata["/technology"],
);

const pageJsonLd = createRouteWebPageJsonLd("/technology", [
  { name: "Home", path: "/" },
  { name: "Technology", path: "/technology" },
]);

export default function TechnologyPage() {
  return (
    <>
      <JsonLd data={pageJsonLd} />
      <TechnologyContent />
    </>
  );
}
