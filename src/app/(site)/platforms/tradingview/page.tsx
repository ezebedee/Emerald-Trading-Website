import type { Metadata } from "next";

import { PlatformGuidance } from "@/components/platforms/platform-guidance";
import { JsonLd } from "@/components/seo/json-ld";
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
  return (
    <>
      <JsonLd data={pageJsonLd} />
      <PlatformGuidance platformId="tradingview" />
    </>
  );
}
