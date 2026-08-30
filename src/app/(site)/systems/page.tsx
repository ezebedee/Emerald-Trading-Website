import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { SystemPositioning } from "@/components/systems/system-positioning";
import { SystemRelationshipOverview } from "@/components/systems/system-relationship-overview";
import { SystemsHero } from "@/components/systems/systems-hero";
import { getSystemsPagePrimarySystem } from "@/data/selectors";
import {
  createPageMetadata,
  createRouteWebPageJsonLd,
  routeSeoMetadata,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(
  routeSeoMetadata["/systems"],
);

const pageJsonLd = createRouteWebPageJsonLd("/systems", [
  { name: "Home", path: "/" },
  { name: "Trading Systems", path: "/systems" },
]);

export default function SystemsPage() {
  const system = getSystemsPagePrimarySystem();

  return (
    <>
      <JsonLd data={pageJsonLd} />
      <SystemsHero system={system} />
      <SystemPositioning system={system} />
      <SystemRelationshipOverview system={system} />
    </>
  );
}
