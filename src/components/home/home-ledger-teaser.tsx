import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { getHomepageLedgerTeaserEntries } from "@/data/selectors";
import type { LedgerEntry, PerformanceMetrics } from "@/domain";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const percentFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const integerFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

const periodLabels = {
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
  quarterly: "Quarterly",
  annual: "Annual",
  cumulative: "Cumulative",
  custom: "Custom",
} as const;

const formatCurrency = (value?: number) =>
  value === undefined ? "-" : currencyFormatter.format(value);

const formatPercent = (value?: number) =>
  value === undefined ? "-" : `${percentFormatter.format(value)}%`;

const formatInteger = (value?: number) =>
  value === undefined ? "-" : integerFormatter.format(value);

const formatPeriodRange = (startDate: string, endDate: string) => {
  const start = new Date(`${startDate}T00:00:00Z`);
  const end = new Date(`${endDate}T00:00:00Z`);

  if (startDate === endDate) {
    return dateFormatter.format(end);
  }

  if (start.getUTCFullYear() === end.getUTCFullYear()) {
    const startMonth = new Intl.DateTimeFormat("en-US", {
      month: "short",
      timeZone: "UTC",
    }).format(start);
    const endMonth = new Intl.DateTimeFormat("en-US", {
      month: "short",
      timeZone: "UTC",
    }).format(end);

    if (startMonth === endMonth) {
      return `${startMonth} ${start.getUTCDate()}-${end.getUTCDate()}, ${end.getUTCFullYear()}`;
    }
  }

  return `${dateFormatter.format(start)} - ${dateFormatter.format(end)}`;
};

const getConciseEntryTitle = (entry: LedgerEntry) =>
  entry.title
    .replace("Emerald Ledger - ", "")
    .replace("Day 00", "Day ")
    .replace("Week 0", "Week ")
    .replace("First Two Weeks", "First Two Weeks");

const getMetricsForEntry = (entry: LedgerEntry): PerformanceMetrics =>
  entry.periodMetrics;

const getEntryMetrics = (metrics: PerformanceMetrics) =>
  [
    { label: "Net Profit", value: formatCurrency(metrics.netProfit) },
    { label: "Return", value: formatPercent(metrics.returnPct) },
    { label: "Trades", value: formatInteger(metrics.totalTrades) },
    { label: "Win Rate", value: formatPercent(metrics.winRatePct) },
  ] as const;

export function HomeLedgerTeaser() {
  const entries = getHomepageLedgerTeaserEntries();

  return (
    <section className="py-14 md:py-16 xl:py-20">
      <Container size="wide">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,0.34fr)_minmax(0,0.66fr)]">
          <div className="max-w-3xl">
            <SectionLabel variant="gold">Emerald Ledger</SectionLabel>
            <h2 className="type-heading-2 text-foreground mt-4 max-w-3xl text-balance">
              A documented record, updated over time.
            </h2>
            <p className="type-body text-muted-foreground mt-5 max-w-2xl">
              The Emerald Ledger presents structured public Forward Performance
              updates across daily, weekly, and cumulative periods for the
              Public Demo Reference Account.
            </p>
            <div className="mt-6">
              <LinkButton
                href="/ledger"
                size="lg"
                trailingIcon={<ArrowRight aria-hidden="true" />}
              >
                View Full Emerald Ledger
              </LinkButton>
            </div>
          </div>

          {entries.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {entries.map((entry) => {
                const metrics = getMetricsForEntry(entry);

                return (
                  <article
                    key={entry.id}
                    className="surface-elevated flex min-h-full flex-col rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <Badge
                          variant={
                            entry.periodType === "cumulative"
                              ? "premium"
                              : "neutral"
                          }
                        >
                          {periodLabels[entry.periodType]}
                        </Badge>
                        <h3 className="text-foreground mt-4 text-lg font-semibold">
                          {getConciseEntryTitle(entry)}
                        </h3>
                        <p className="text-muted-foreground mt-2 text-sm">
                          {formatPeriodRange(entry.startDate, entry.endDate)}
                        </p>
                      </div>
                      <div className="bg-surface-soft text-gold-warm rounded-md border border-[var(--border)] p-2">
                        <FileText aria-hidden="true" className="size-5" />
                      </div>
                    </div>

                    <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-5">
                      {getEntryMetrics(metrics).map((metric) => (
                        <div key={metric.label}>
                          <dt className="type-label text-muted-foreground">
                            {metric.label}
                          </dt>
                          <dd className="numeric text-foreground mt-2 text-base font-semibold">
                            {metric.value}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    <Link
                      href="/ledger"
                      aria-label={`View ${getConciseEntryTitle(entry)} in the Emerald Ledger`}
                      className="focus-emerald transition-standard text-emerald-bright hover:text-foreground mt-6 inline-flex min-h-10 items-center text-sm font-semibold underline decoration-[var(--border-emerald)] underline-offset-4"
                    >
                      View ledger record
                    </Link>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="surface-elevated rounded-lg p-5">
              <p className="type-body text-muted-foreground">
                Public forward-performance Ledger records are not currently
                available.
              </p>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
