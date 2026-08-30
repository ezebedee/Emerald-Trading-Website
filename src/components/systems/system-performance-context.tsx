import { ArrowRight, FileCheck2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import type {
  SystemsPagePerformanceContext,
  SystemsPagePerformanceMetric,
} from "@/data/selectors";

type SystemPerformanceContextProps = Readonly<{
  context?: SystemsPagePerformanceContext;
}>;

const formatMetricValue = (metric: SystemsPagePerformanceMetric) => {
  if (metric.kind === "currency") {
    return new Intl.NumberFormat("en-US", {
      currency: "USD",
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
      style: "currency",
    }).format(metric.value);
  }

  if (metric.kind === "percentage") {
    return `${metric.value.toFixed(2)}%`;
  }

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(metric.value);
};

function EmptyPerformanceContext() {
  return (
    <section className="bg-surface/70 border-t border-[var(--border)] py-12 md:py-14 xl:py-16">
      <Container size="wide">
        <div className="surface-elevated rounded-lg p-5 md:p-6">
          <SectionLabel variant="gold">Public Performance Context</SectionLabel>
          <h2 className="type-heading-2 text-foreground mt-4 max-w-3xl text-balance">
            Documented Forward Performance for the current configuration.
          </h2>
          <p className="type-body text-muted-foreground mt-5 max-w-3xl">
            No public cumulative performance record is currently available for
            this configuration.
          </p>
        </div>
      </Container>
    </section>
  );
}

export function SystemPerformanceContext({
  context,
}: SystemPerformanceContextProps) {
  if (!context) {
    return <EmptyPerformanceContext />;
  }

  const record = context.latestCumulativeRecord;

  return (
    <section className="bg-background border-t border-[var(--border)] py-12 md:py-14 xl:py-16">
      <Container size="wide">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,0.44fr)_minmax(0,0.56fr)] xl:items-start">
          <div className="max-w-3xl">
            <SectionLabel variant="gold">
              Public Performance Context
            </SectionLabel>
            <h2 className="type-heading-2 text-foreground mt-4 text-balance">
              Documented Forward Performance for the current Metals / XAUUSD
              configuration.
            </h2>
            <p className="type-body text-muted-foreground mt-5">
              The current public Forward Performance record is associated with
              the {context.configurationName} configuration of the{" "}
              {context.familyName} family. Complete public history remains in
              the Emerald Ledger.
            </p>
            <p className="text-muted-foreground mt-5 text-sm leading-6">
              The {context.familyName} family spans{" "}
              {context.familyMarketCoverage.join(", ")}. The performance shown
              here applies only to the current Metals/XAUUSD public
              configuration.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {context.familyMarketCoverage.map((market) => (
                <Badge key={market} variant="neutral">
                  {market}
                </Badge>
              ))}
            </div>

            <div className="mt-8">
              <LinkButton
                href="/ledger"
                size="lg"
                trailingIcon={<ArrowRight className="size-4" />}
              >
                View Complete Ledger
              </LinkButton>
            </div>
          </div>

          <div className="surface-data rounded-lg p-5 md:p-6">
            <div className="flex flex-col gap-4 border-b border-[var(--border)] pb-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <Badge variant="premium">{context.configurationName}</Badge>
                <h3 className="type-heading-3 text-foreground mt-4 text-balance">
                  Current public record
                </h3>
              </div>
              <FileCheck2
                aria-hidden="true"
                className="text-emerald-bright size-5 shrink-0"
              />
            </div>

            <dl className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="bg-surface/70 rounded-md border border-[var(--border)] p-4">
                <dt className="type-label text-subtle-foreground">
                  Classification
                </dt>
                <dd className="text-foreground mt-3 text-sm font-semibold">
                  {context.performanceClassification}
                </dd>
              </div>
              <div className="bg-surface/70 rounded-md border border-[var(--border)] p-4">
                <dt className="type-label text-subtle-foreground">Coverage</dt>
                <dd className="text-foreground mt-3 text-sm font-semibold">
                  {record?.coverageLabel ?? "Unavailable"}
                </dd>
              </div>
              <div className="bg-surface/70 rounded-md border border-[var(--border)] p-4">
                <dt className="type-label text-subtle-foreground">Platform</dt>
                <dd className="text-foreground mt-3 text-sm font-semibold">
                  {context.platforms.join(" / ")}
                </dd>
              </div>
              <div className="bg-surface/70 rounded-md border border-[var(--border)] p-4">
                <dt className="type-label text-subtle-foreground">Lifecycle</dt>
                <dd className="text-foreground mt-3 text-sm font-semibold">
                  {context.lifecycleStatus}
                </dd>
              </div>
            </dl>

            {record ? (
              <dl className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {record.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="bg-surface-elevated/80 rounded-md border border-[var(--border-strong)] p-4"
                  >
                    <dt className="type-label text-subtle-foreground">
                      {metric.label}
                    </dt>
                    <dd className="numeric text-foreground mt-3 text-xl font-semibold">
                      {formatMetricValue(metric)}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="type-body-small text-muted-foreground bg-surface/70 mt-5 rounded-md border border-[var(--border)] p-4">
                No public cumulative performance record is currently available
                for this configuration.
              </p>
            )}

            <p className="text-muted-foreground mt-5 text-sm leading-6">
              {context.publicRecordCount} Public Ledger Records are associated
              with this configuration.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
