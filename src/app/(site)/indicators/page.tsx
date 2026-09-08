import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/dev/page-placeholder";
import { JsonLd } from "@/components/seo/json-ld";
import { getPublicTradingProductBySlug } from "@/data/selectors";
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
  { name: "Emerald Legacy System", path: "/indicators" },
]);

export default function IndicatorsPage() {
  const product = getPublicTradingProductBySlug("emerald-legacy-system");

  return (
    <>
      <JsonLd data={pageJsonLd} />
      <PagePlaceholder title={product?.name ?? "Emerald Legacy System"} />
    </>
  );
}
