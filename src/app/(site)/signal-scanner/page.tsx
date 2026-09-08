import type { Metadata } from "next";

import { ScannerAlerts } from "@/components/scanner/scanner-alerts";
import { ScannerBoundary } from "@/components/scanner/scanner-boundary";
import { ScannerChartContext } from "@/components/scanner/scanner-chart-context";
import { ScannerFiltersFavorites } from "@/components/scanner/scanner-filters-favorites";
import { ScannerFinalCta } from "@/components/scanner/scanner-final-cta";
import { ScannerHero } from "@/components/scanner/scanner-hero";
import { ScannerOverview } from "@/components/scanner/scanner-overview";
import { ScannerPlatformsEcosystem } from "@/components/scanner/scanner-platforms-ecosystem";
import { ScannerStageSection } from "@/components/scanner/scanner-stage-section";
import { ScannerWorkflow } from "@/components/scanner/scanner-workflow";
import { JsonLd } from "@/components/seo/json-ld";
import { getSignalScannerPageContext } from "@/data/selectors";
import {
  createPageMetadata,
  createRouteWebPageJsonLd,
  routeSeoMetadata,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(
  routeSeoMetadata["/signal-scanner"],
);

const pageJsonLd = createRouteWebPageJsonLd("/signal-scanner", [
  { name: "Home", path: "/" },
  { name: "Signal Scanner", path: "/signal-scanner" },
]);

export default function SignalScannerPage() {
  const context = getSignalScannerPageContext();

  return (
    <>
      <JsonLd data={pageJsonLd} />
      <ScannerHero product={context.product} assets={context.assets} />
      <ScannerOverview signalModules={context.signalModules} />
      <ScannerWorkflow />
      <ScannerStageSection
        id="configuration"
        eyebrow="Stage 1 - Scanner Configuration"
        title="Configure signal modules, alerts, dashboard behavior, and chart-template context."
        copy="The configuration screen occurs first. It controls signal inputs, timeframes, alert behavior, dashboard settings, FineScalp-related options, and View-related chart context."
        bullets={[
          "Users may specify a chart template name in Scanner settings.",
          "When View is selected later, the relevant chart may open with the configured chart template applied.",
          "The supplied implementation evidence is MT4; template behavior should not be assumed identical across every supported platform.",
        ]}
        asset={context.assets.configuration}
        caption="Scanner Configuration - MT4"
      />
      <ScannerStageSection
        id="selection"
        eyebrow="Stage 2 - Symbol & Signal Selection"
        title="Choose instruments, favorite symbols, and favorite signal modules."
        copy="Scanner selection lets users define the market universe and signal modules they want to monitor before the dashboard begins organizing results."
        bullets={[
          "Selected symbols define the monitored instrument set.",
          "Favorite symbols can keep preferred instruments close at hand.",
          "Favorite signal modules help focus the Scanner without implying signal ranking.",
        ]}
        asset={context.assets.selection}
        caption="Symbol & Signal Selection - MT4"
        reverse
      />
      <ScannerStageSection
        id="results-dashboard"
        eyebrow="Stage 3 - Signal Results Dashboard"
        title="Scan, filter, and monitor Scanner results from the central dashboard."
        copy="The results dashboard remains the main monitoring interface for populated Scanner signals."
        bullets={[
          "Known fields include Symbol, Signal, Type / Direction, Timeframe, Age, and View.",
          "View is the entry point for chart-context review.",
          "Dashboard rows are signal-monitoring context, not trade instructions.",
        ]}
        asset={context.assets.dashboard}
        caption="Signal Results Dashboard - MT4"
      />
      <ScannerFiltersFavorites />
      <ScannerChartContext asset={context.assets.chartContextAlert} />
      <ScannerAlerts />
      <ScannerBoundary />
      <ScannerPlatformsEcosystem
        platforms={context.platforms}
        relatedProducts={context.relatedProducts}
      />
      <ScannerFinalCta />
    </>
  );
}
