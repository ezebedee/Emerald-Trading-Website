import type { Metadata } from "next";

import { FineScalpSection } from "@/components/indicators/finescalp-section";
import { HarmonizerSection } from "@/components/indicators/harmonizer-section";
import { IndicatorsHero } from "@/components/indicators/indicators-hero";
import { PlatformAvailability } from "@/components/indicators/platform-availability";
import { ProductEcosystemSection } from "@/components/indicators/product-ecosystem-section";
import { ResearchExtensibility } from "@/components/indicators/research-extensibility";
import { SignalModuleOverview } from "@/components/indicators/signal-module-overview";
import { UnifiedFrameworkSection } from "@/components/indicators/unified-framework-section";
import { JsonLd } from "@/components/seo/json-ld";
import { getIndicatorsPageContext } from "@/data/selectors";
import {
  createPageMetadata,
  createRouteWebPageJsonLd,
  routeSeoMetadata,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(
  routeSeoMetadata["/indicators"],
);

const pageJsonLd = createRouteWebPageJsonLd("/indicators", [
  { name: "Home", path: "/" },
  { name: "Emerald Legacy System", path: "/indicators" },
]);

export default function IndicatorsPage() {
  const context = getIndicatorsPageContext();

  return (
    <>
      <JsonLd data={pageJsonLd} />
      <IndicatorsHero product={context.product} heroAsset={context.heroAsset} />
      <UnifiedFrameworkSection settingsAsset={context.assets.settings} />
      <SignalModuleOverview
        primarySignalModules={context.primarySignalModules}
        auxiliarySignalModules={context.auxiliarySignalModules}
        mainSignalAsset={context.assets.mainSignal}
      />
      <FineScalpSection fineScalpAsset={context.assets.fineScalp} />
      <HarmonizerSection
        scalpAsset={context.assets.scalp}
        rangeAsset={context.assets.range}
        harmonizerAsset={context.assets.harmonizer}
        harmonizerSafeAsset={context.assets.harmonizerSafe}
      />
      <PlatformAvailability platforms={context.platforms} />
      <ProductEcosystemSection relatedProducts={context.relatedProducts} />
      <ResearchExtensibility />
    </>
  );
}
