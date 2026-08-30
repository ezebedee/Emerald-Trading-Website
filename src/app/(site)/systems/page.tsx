import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { SystemCapabilityArchitecture } from "@/components/systems/system-capability-architecture";
import { SystemConfigurationArchitecture } from "@/components/systems/system-configuration-architecture";
import { SystemPerformanceContext } from "@/components/systems/system-performance-context";
import { SystemPositioning } from "@/components/systems/system-positioning";
import { SystemRelationshipOverview } from "@/components/systems/system-relationship-overview";
import { SystemsHero } from "@/components/systems/systems-hero";
import {
  getSystemsPageConfigurationArchitecture,
  getSystemsPagePerformanceContext,
  getSystemsPagePrimarySystem,
} from "@/data/selectors";
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
  const configurationArchitecture = getSystemsPageConfigurationArchitecture();
  const performanceContext = system
    ? getSystemsPagePerformanceContext(system.id)
    : undefined;

  return (
    <>
      <JsonLd data={pageJsonLd} />
      <SystemsHero system={system} />
      <SystemPositioning system={system} />
      <SystemRelationshipOverview system={system} />
      <SystemCapabilityArchitecture system={system} />
      <SystemPerformanceContext context={performanceContext} />
      <SystemConfigurationArchitecture
        architecture={configurationArchitecture}
      />
    </>
  );
}
