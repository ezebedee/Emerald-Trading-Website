import { ArrowRight, Database, FileClock } from "lucide-react";

import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import type { LedgerPublicRecordOverview } from "@/data/selectors";

type LedgerHeroProps = Readonly<{
  overview: LedgerPublicRecordOverview;
}>;

export function LedgerHero({ overview }: LedgerHeroProps) {
  return (
    <section className="border-b border-[var(--border)] py-12 md:py-14 xl:py-16">
      <Container size="wide">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.56fr)_minmax(340px,0.44fr)] lg:items-center">
          <div className="max-w-4xl">
            <SectionLabel variant="gold">Emerald Ledger</SectionLabel>
            <h1 className="type-heading-1 text-foreground mt-4 max-w-4xl text-balance">
              The public record of documented forward performance.
            </h1>
            <p className="type-body-large text-muted-foreground mt-5 max-w-3xl">
              The Emerald Ledger documents the ongoing Forward Performance
              history of the Emerald Quant System using the Public Demo
              Reference Account.
            </p>

            <dl className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="surface-default rounded-lg p-4">
                <dt className="type-label text-subtle-foreground">
                  Public Record Period
                </dt>
                <dd className="numeric text-foreground mt-2 text-base font-semibold">
                  {overview.coverageLabel ??
                    "Public performance record is not currently available"}
                </dd>
              </div>
              <div className="surface-default rounded-lg p-4">
                <dt className="type-label text-subtle-foreground">
                  Account Type
                </dt>
                <dd className="text-foreground mt-2 text-base font-semibold">
                  {overview.accountClassification}
                </dd>
              </div>
              <div className="surface-default rounded-lg p-4">
                <dt className="type-label text-subtle-foreground">
                  Performance Type
                </dt>
                <dd className="text-foreground mt-2 text-base font-semibold">
                  {overview.performanceClassification ??
                    "Public record unavailable"}
                </dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LinkButton
                href="/verification"
                size="lg"
                trailingIcon={<ArrowRight aria-hidden="true" />}
              >
                Performance Verification
              </LinkButton>
              <LinkButton
                href="/systems"
                variant="secondary"
                size="lg"
                trailingIcon={<ArrowRight aria-hidden="true" />}
              >
                Explore Trading System
              </LinkButton>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="surface-data overflow-hidden rounded-lg p-5 md:p-6"
          >
            <div className="flex items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
              <div>
                <p className="type-label text-gold-warm">Record File</p>
                <p className="text-foreground mt-2 text-sm font-semibold">
                  Public Forward Ledger
                </p>
              </div>
              <div className="bg-surface-soft text-gold-warm rounded-md border border-[var(--border)] p-2">
                <Database className="size-5" />
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {["Daily Entry", "Weekly Summary", "Cumulative Summary"].map(
                (label) => (
                  <div
                    key={label}
                    className="bg-surface/85 flex items-center justify-between gap-4 rounded-md border border-[var(--border)] p-3"
                  >
                    <span className="text-muted-foreground text-sm">
                      {label}
                    </span>
                    <span className="bg-emerald-dark/70 h-2 w-16 rounded-full" />
                  </div>
                ),
              )}
            </div>

            <div className="mt-6 rounded-md border border-[var(--border-gold)] bg-[var(--gold-soft)] p-4">
              <div className="flex items-center gap-3">
                <FileClock className="text-gold-warm size-5" />
                <div>
                  <p className="type-label text-gold-warm">Coverage</p>
                  <p className="numeric text-foreground mt-1 text-sm font-semibold">
                    {overview.coverageLabel ?? "Record unavailable"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
