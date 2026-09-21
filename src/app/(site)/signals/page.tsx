import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { FineScalpTechnicalSection } from "@/components/signals/finescalp-technical-section";
import { SameMarketComparison } from "@/components/signals/same-market-comparison";
import { SignalEcosystemSection } from "@/components/signals/signal-ecosystem-section";
import { SignalFrameworkOverview } from "@/components/signals/signal-framework-overview";
import { SignalLibraryNav } from "@/components/signals/signal-library-nav";
import { SignalModuleSection } from "@/components/signals/signal-module-section";
import { SignalResearchSection } from "@/components/signals/signal-research-section";
import { SignalTradeBoundary } from "@/components/signals/signal-trade-boundary";
import { SignalsFinalCta } from "@/components/signals/signals-final-cta";
import { SignalsHero } from "@/components/signals/signals-hero";
import { getSignalsPageContext } from "@/data/selectors";
import {
  createPageMetadata,
  createRouteWebPageJsonLd,
  routeSeoMetadata,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(
  routeSeoMetadata["/signals"],
);

const pageJsonLd = createRouteWebPageJsonLd("/signals", [
  { name: "Home", path: "/" },
  { name: "Signal Library", path: "/signals" },
]);

export default function SignalsPage() {
  const context = getSignalsPageContext();
  const modulesBySlug = new Map(
    [...context.primarySignalModules, ...context.auxiliarySignalModules].map(
      (module) => [module.slug, module],
    ),
  );
  const mainSignal = modulesBySlug.get("main");
  const fineScalp = modulesBySlug.get("finescalp");
  const scalpSignal = modulesBySlug.get("scalp");
  const rangeSignal = modulesBySlug.get("range");
  const harmonizer = modulesBySlug.get("harmonizer");
  const harmonizerSafe = modulesBySlug.get("harmonizer-safe");

  return (
    <>
      <JsonLd data={pageJsonLd} />
      <SignalsHero
        signalFramework={context.signalFramework}
        legacySystem={context.legacySystem}
      />
      <SignalLibraryNav
        modules={[
          ...context.primarySignalModules,
          ...context.auxiliarySignalModules,
        ]}
      />
      <SignalFrameworkOverview
        primarySignalModules={context.primarySignalModules}
        auxiliarySignalModules={context.auxiliarySignalModules}
      />
      {mainSignal ? (
        <SignalModuleSection
          module={mainSignal}
          asset={context.assets.main}
          imagePriority
        />
      ) : null}
      {fineScalp ? (
        <FineScalpTechnicalSection
          module={fineScalp}
          asset={context.assets.fineScalp}
        />
      ) : null}
      {scalpSignal ? (
        <SignalModuleSection
          module={scalpSignal}
          asset={context.assets.scalp}
        />
      ) : null}
      {rangeSignal ? (
        <SignalModuleSection
          module={rangeSignal}
          asset={context.assets.range}
        />
      ) : null}
      {harmonizer ? (
        <SignalModuleSection
          module={harmonizer}
          asset={context.assets.harmonizer}
          variant="featured"
        />
      ) : null}
      {harmonizerSafe ? (
        <SignalModuleSection
          module={harmonizerSafe}
          asset={context.assets.harmonizerSafe}
          variant="premium"
        />
      ) : null}
      <SameMarketComparison assets={context.assets} />
      <SignalTradeBoundary />
      <SignalEcosystemSection
        platforms={context.platforms}
        relatedProducts={context.relatedProducts}
      />
      <SignalResearchSection />
      <SignalsFinalCta />
    </>
  );
}
