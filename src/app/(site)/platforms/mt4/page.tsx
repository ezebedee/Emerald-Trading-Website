import type { Metadata } from "next";

import { PlatformGuidance } from "@/components/platforms/platform-guidance";
import { JsonLd } from "@/components/seo/json-ld";
import {
  createPageMetadata,
  createRouteWebPageJsonLd,
  routeSeoMetadata,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(
  routeSeoMetadata["/platforms/mt4"],
);

const pageJsonLd = createRouteWebPageJsonLd("/platforms/mt4", [
  { name: "Home", path: "/" },
  { name: "Platforms", path: "/platforms" },
  { name: "MT4", path: "/platforms/mt4" },
]);

export default function Mt4Page() {
  return (
    <>
      <JsonLd data={pageJsonLd} />
      <PlatformGuidance platformId="mt4" />
    </>
  );
}
