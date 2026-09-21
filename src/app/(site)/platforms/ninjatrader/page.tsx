import type { Metadata } from "next";

import { PlatformGuidance } from "@/components/platforms/platform-guidance";
import { JsonLd } from "@/components/seo/json-ld";
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
  return (
    <>
      <JsonLd data={pageJsonLd} />
      <PlatformGuidance platformId="ninjatrader" />
    </>
  );
}
