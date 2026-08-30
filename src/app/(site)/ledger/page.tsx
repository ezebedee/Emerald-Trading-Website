import type { Metadata } from "next";

import { LedgerHero } from "@/components/ledger/ledger-hero";
import { LedgerRecordClassification } from "@/components/ledger/ledger-record-classification";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
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
      <section className="border-t border-[var(--border)] py-10 md:py-12">
        <Container size="wide">
          <div className="surface-default rounded-lg p-5 md:p-6">
            <p className="type-label text-gold-warm">
              Ledger Reporting Boundary
            </p>
            <p className="text-muted-foreground mt-3 max-w-3xl text-sm leading-6">
              Detailed performance tables, record chronology, charts,
              verification panels, and media references are reserved for later
              Ledger implementation tasks.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
