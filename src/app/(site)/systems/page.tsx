import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { SystemCapabilityArchitecture } from "@/components/systems/system-capability-architecture";
import { SystemPerformanceContext } from "@/components/systems/system-performance-context";
import { SystemPositioning } from "@/components/systems/system-positioning";
import { SystemRelationshipOverview } from "@/components/systems/system-relationship-overview";
import { SystemsHero } from "@/components/systems/systems-hero";
import {
  getPrimaryPublicSystemFamily,
  getSystemsPageConfigurationOptions,
  getSystemsPagePerformanceContext,
  getSystemsPagePrimarySystem,
  getSystemsPageSelectedConfiguration,
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

type SystemsPageProps = Readonly<{
  searchParams?: Promise<{
    configuration?: string | string[];
  }>;
}>;

export default async function SystemsPage({ searchParams }: SystemsPageProps) {
  const resolvedSearchParams = await searchParams;
  const requestedConfigurationId =
    typeof resolvedSearchParams?.configuration === "string"
      ? resolvedSearchParams.configuration
      : undefined;
  const system = getSystemsPagePrimarySystem();
  const family = getPrimaryPublicSystemFamily();
  const selectedConfiguration = family
    ? getSystemsPageSelectedConfiguration({
        familyId: family.id,
        requestedConfigurationId,
      })
    : undefined;
  const configurationOptions = getSystemsPageConfigurationOptions({
    selectedConfigurationId: selectedConfiguration?.id,
  });
  const performanceContext = selectedConfiguration
    ? getSystemsPagePerformanceContext(selectedConfiguration.id)
    : undefined;

  return (
    <>
      <JsonLd data={pageJsonLd} />
      <SystemsHero system={system} />
      <SystemPositioning system={system} />
      <SystemRelationshipOverview system={system} />
      <SystemCapabilityArchitecture system={system} />
      <SystemPerformanceContext
        configurationOptions={configurationOptions}
        context={performanceContext}
      />
    </>
  );
}
