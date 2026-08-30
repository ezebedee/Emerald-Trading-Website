import { ArrowRight, FileCheck2 } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { cn } from "@/lib/utils";
import type {
  SystemsPageConfigurationOption,
  SystemsPagePerformanceContext,
  SystemsPagePerformanceMetric,
} from "@/data/selectors";

type SystemPerformanceContextProps = Readonly<{
  context?: SystemsPagePerformanceContext;
  configurationOptions: readonly SystemsPageConfigurationOption[];
}>;

const formatMetricValue = (metric: SystemsPagePerformanceMetric) => {
  if (metric.value === undefined) {
    return "—";
  }

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

function EmptyPerformanceContext({
  configurationOptions,
}: {
  configurationOptions: readonly SystemsPageConfigurationOption[];
}) {
  return (
    <section className="bg-surface/70 border-t border-[var(--border)] py-12 md:py-14 xl:py-16">
      <Container size="wide">
        <ConfigurationSelector options={configurationOptions} />

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

function ConfigurationSelector({
  options,
}: {
  options: readonly SystemsPageConfigurationOption[];
}) {
  if (!options.length) {
    return null;
  }

  return (
    <nav
      aria-label="Asset-class configuration"
      className="surface-elevated mb-8 rounded-lg p-4 md:p-5"
    >
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <p className="type-label text-gold-warm">Asset-Class Configuration</p>
        <p className="text-muted-foreground text-sm leading-6">
          Select a public configuration to review its configuration-specific
          documented record. Asset classes without a public configuration remain
          family coverage only.
        </p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {options.map((option) =>
          option.available && option.href ? (
            <Link
              aria-current={option.isSelected ? "page" : undefined}
              className={cn(
                "type-label inline-flex min-h-9 items-center rounded-full border px-4 py-2 transition-colors",
                option.isSelected
                  ? "text-gold-warm border-[var(--border-gold)] bg-[var(--gold-soft)]"
                  : "text-muted-foreground hover:text-foreground border-[var(--border)] bg-transparent hover:border-[var(--border-strong)]",
              )}
              href={option.href}
              key={option.marketCategory}
            >
              {option.label}
              {option.isSelected ? (
                <span className="sr-only">, selected</span>
              ) : null}
            </Link>
          ) : (
            <span
              aria-label={`${option.label} - no public configuration currently available`}
              className="type-label text-subtle-foreground inline-flex min-h-9 items-center rounded-full border border-[var(--border)] bg-transparent px-4 py-2 opacity-65"
              key={option.marketCategory}
              title={`No public ${option.label} configuration is currently available.`}
            >
              {option.label}
              <span className="sr-only">
                , no public configuration currently available
              </span>
            </span>
          ),
        )}
      </div>
    </nav>
  );
}

export function SystemPerformanceContext({
  context,
  configurationOptions,
}: SystemPerformanceContextProps) {
  if (!context) {
    return (
      <EmptyPerformanceContext configurationOptions={configurationOptions} />
    );
  }

  const record = context.latestCumulativeRecord;

  return (
    <section className="bg-background border-t border-[var(--border)] py-12 md:py-14 xl:py-16">
      <Container size="wide">
        <ConfigurationSelector options={configurationOptions} />

        <div className="grid gap-8 xl:grid-cols-[minmax(0,0.44fr)_minmax(0,0.56fr)] xl:items-start">
          <div className="max-w-3xl">
            <SectionLabel variant="gold">
              Public Performance Context
            </SectionLabel>
            <h2 className="type-heading-2 text-foreground mt-4 text-balance">
              Documented Forward Performance for the current{" "}
              {context.configurationName} configuration.
            </h2>
            <p className="type-body text-muted-foreground mt-5">
              {context.publicRecordCount
                ? `The current public Forward Performance record is associated with the ${context.configurationName} configuration of the ${context.familyName} family. Complete public history remains in the Emerald Ledger.`
                : `The ${context.configurationName} configuration is selected, but no public Forward Performance record is currently available for this configuration.`}
            </p>
            <p className="text-muted-foreground mt-5 text-sm leading-6">
              Performance shown in this module applies only to the selected{" "}
              {context.configurationName} public configuration.
            </p>

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
                <div className="flex flex-wrap gap-2">
                  <Badge variant="premium">{context.configurationName}</Badge>
                  {context.publicRecordCount ? (
                    <Badge variant="positive">Emerald Ledger</Badge>
                  ) : null}
                </div>
                <h3 className="type-heading-3 text-foreground mt-4 text-balance">
                  {context.publicRecordCount
                    ? "Current public record"
                    : "Configuration details"}
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
                  {context.publicRecordCount
                    ? context.performanceClassification
                    : "No public record"}
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

            {context.publicRecordCount ? (
              <p className="text-muted-foreground mt-5 text-sm leading-6">
                {context.publicRecordCount} Public Ledger Records are associated
                with this configuration.
              </p>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
