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
  routeSeoMetadata["/platforms/ninjatrader"],
);

const pageJsonLd = createRouteWebPageJsonLd("/platforms/ninjatrader", [
  { name: "Home", path: "/" },
  { name: "Platforms", path: "/platforms" },
  { name: "NinjaTrader", path: "/platforms/ninjatrader" },
]);

export default function NinjaTraderPage() {
  const platform = getPlatformDefinitionBySlug("ninjatrader");

  return (
    <>
      <JsonLd data={pageJsonLd} />
      <PagePlaceholder
        title={platform?.label ?? "NinjaTrader"}
        description="NinjaTrader product implementation guide foundation for Emerald tools across supported product layers."
      />
    </>
  );
}
