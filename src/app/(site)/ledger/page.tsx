import type { Metadata } from "next";

import { LedgerHero } from "@/components/ledger/ledger-hero";
import { LedgerPerformanceProgression } from "@/components/ledger/ledger-performance-progression";
import { LedgerPerformanceSummary } from "@/components/ledger/ledger-performance-summary";
import { LedgerRecordChronology } from "@/components/ledger/ledger-record-chronology";
import { LedgerRecordClassification } from "@/components/ledger/ledger-record-classification";
import { JsonLd } from "@/components/seo/json-ld";
import { getLedgerPublicRecordOverview } from "@/data/selectors";
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

export default function LedgerPage() {
  const overview = getLedgerPublicRecordOverview();

  return (
    <>
      <JsonLd data={pageJsonLd} />
      <LedgerHero overview={overview} />
      <LedgerRecordClassification overview={overview} />
      <LedgerPerformanceSummary />
      <LedgerPerformanceProgression />
      <LedgerRecordChronology />
    </>
  );
}
