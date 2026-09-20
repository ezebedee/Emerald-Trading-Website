import type { Metadata } from "next";

import { PlatformsOverview } from "@/components/platforms/platform-guidance";
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
      <PlatformsOverview />
    </>
  );
}
