import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/dev/page-placeholder";
import { JsonLd } from "@/components/seo/json-ld";
import { getPlatformDefinitionBySlug } from "@/data/selectors";
import {
  createPageMetadata,
  createRouteWebPageJsonLd,
  routeSeoMetadata,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(
  routeSeoMetadata["/platforms/tradingview"],
);

const pageJsonLd = createRouteWebPageJsonLd("/platforms/tradingview", [
  { name: "Home", path: "/" },
  { name: "Platforms", path: "/platforms" },
  { name: "TradingView", path: "/platforms/tradingview" },
]);

export default function TradingViewPage() {
  const platform = getPlatformDefinitionBySlug("tradingview");

  return (
    <>
      <JsonLd data={pageJsonLd} />
      <PagePlaceholder
        title={platform?.label ?? "TradingView"}
        description="TradingView product implementation guide foundation for Emerald tools across supported product layers."
      />
    </>
  );
}
