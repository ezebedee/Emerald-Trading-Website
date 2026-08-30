import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/dev/page-placeholder";
import { JsonLd } from "@/components/seo/json-ld";
import {
  createPageMetadata,
  createRouteWebPageJsonLd,
  routeSeoMetadata,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(
  routeSeoMetadata["/indicators"],
);

const pageJsonLd = createRouteWebPageJsonLd("/indicators", [
  { name: "Home", path: "/" },
  { name: "Indicators", path: "/indicators" },
]);

export default function IndicatorsPage() {
  return (
    <>
      <JsonLd data={pageJsonLd} />
      <PagePlaceholder title="Indicators" />
    </>
  );
}
