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
  routeSeoMetadata["/signal-scanner"],
);

const pageJsonLd = createRouteWebPageJsonLd("/signal-scanner", [
  { name: "Home", path: "/" },
  { name: "Signal Scanner", path: "/signal-scanner" },
]);

export default function SignalScannerPage() {
  const product = getPublicTradingProductBySlug("emerald-signal-scanner");

  return (
    <>
      <JsonLd data={pageJsonLd} />
      <PagePlaceholder
        title={product?.name ?? "Emerald Signal Scanner"}
        description="Product page foundation for multi-symbol and multi-signal monitoring across supported trading platforms."
      />
    </>
  );
}
