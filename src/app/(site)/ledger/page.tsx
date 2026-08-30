import type { Metadata } from "next";

import { LedgerConfigurationSelector } from "@/components/ledger/ledger-configuration-selector";
import { LedgerHero } from "@/components/ledger/ledger-hero";
import { LedgerMediaContext } from "@/components/ledger/ledger-media-context";
import { LedgerPerformanceProgression } from "@/components/ledger/ledger-performance-progression";
import { LedgerPerformanceSummary } from "@/components/ledger/ledger-performance-summary";
import { LedgerRecordChronology } from "@/components/ledger/ledger-record-chronology";
import { LedgerRecordClassification } from "@/components/ledger/ledger-record-classification";
import { LedgerVerificationEvidence } from "@/components/ledger/ledger-verification-evidence";
import { JsonLd } from "@/components/seo/json-ld";
import { getLedgerPageContext } from "@/data/selectors";
import {
  createPageMetadata,
  createRouteWebPageJsonLd,
  routeSeoMetadata,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(
  routeSeoMetadata["/ledger"],
);

const pageJsonLd = createRouteWebPageJsonLd("/ledger", [
  { name: "Home", path: "/" },
  { name: "Emerald Ledger", path: "/ledger" },
]);

type LedgerPageProps = Readonly<{
  searchParams?: Promise<{
    configuration?: string | string[];
  }>;
}>;

export default async function LedgerPage({ searchParams }: LedgerPageProps) {
  const resolvedSearchParams = await searchParams;
  const requestedConfigurationId =
    typeof resolvedSearchParams?.configuration === "string"
      ? resolvedSearchParams.configuration
      : undefined;
  const context = getLedgerPageContext({ requestedConfigurationId });

  return (
    <>
      <JsonLd data={pageJsonLd} />
      <LedgerConfigurationSelector
        options={context.configurationOptions}
        selectedConfigurationName={
          context.selectedConfiguration?.configurationName
        }
      />
      <LedgerHero overview={context.overview} />
      <LedgerRecordClassification overview={context.overview} />
      <LedgerPerformanceSummary snapshot={context.latestCumulative} />
      <LedgerPerformanceProgression points={context.progression} />
      <LedgerRecordChronology entries={context.chronology} />
      <LedgerVerificationEvidence records={context.verification} />
      <LedgerMediaContext records={context.media} />
    </>
  );
}
