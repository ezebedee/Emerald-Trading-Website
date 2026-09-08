import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/dev/page-placeholder";
import { JsonLd } from "@/components/seo/json-ld";
import {
  createPageMetadata,
  createRouteWebPageJsonLd,
  routeSeoMetadata,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(
  routeSeoMetadata["/platforms"],
);

const pageJsonLd = createRouteWebPageJsonLd("/platforms", [
  { name: "Home", path: "/" },
  { name: "Platforms", path: "/platforms" },
]);

export default function PlatformsPage() {
  return (
    <>
      <JsonLd data={pageJsonLd} />
      <PagePlaceholder
        title="Trading Platforms"
        description="Platform overview foundation for Emerald product availability across MT4, MT5, TradingView, and NinjaTrader."
      />
    </>
  );
}
