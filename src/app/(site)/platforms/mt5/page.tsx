import type { Metadata } from "next";

import { PlatformGuidance } from "@/components/platforms/platform-guidance";
import { JsonLd } from "@/components/seo/json-ld";
import {
  createPageMetadata,
  createRouteWebPageJsonLd,
  routeSeoMetadata,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(
  routeSeoMetadata["/platforms/mt5"],
);

const pageJsonLd = createRouteWebPageJsonLd("/platforms/mt5", [
  { name: "Home", path: "/" },
  { name: "Platforms", path: "/platforms" },
  { name: "MT5", path: "/platforms/mt5" },
]);

export default function Mt5Page() {
  return (
    <>
      <JsonLd data={pageJsonLd} />
      <PlatformGuidance platformId="mt5" />
    </>
  );
}
