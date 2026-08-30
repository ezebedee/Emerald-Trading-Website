import {
  Activity,
  BarChart3,
  Landmark,
  Percent,
  ShieldAlert,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { getLatestPublicCumulativeLedgerRecord } from "@/data/selectors";
import type { LedgerLatestPerformanceSnapshot } from "@/data/selectors";

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

const formatCurrency = (value?: number) =>
  value === undefined ? "—" : currencyFormatter.format(value);

const formatPercent = (value?: number) =>
  value === undefined ? "—" : `${percentFormatter.format(value)}%`;

const formatInteger = (value?: number) =>
  value === undefined ? "—" : integerFormatter.format(value);

type KpiCardProps = Readonly<{
  label: string;
  value: string;
  helper: string;
  emphasis?: "primary" | "standard" | "risk";
  icon: typeof Activity;
}>;

function KpiCard({
  label,
  value,
  helper,
  emphasis = "standard",
  icon: Icon,
}: KpiCardProps) {
  return (
    <div
      className={
        emphasis === "primary"
          ? "surface-premium rounded-lg p-4 md:p-5"
          : "surface-elevated rounded-lg p-4 md:p-5"
      }
    >
      <div className="flex items-start justify-between gap-3">
        <dt className="type-label text-subtle-foreground">{label}</dt>
        <Icon
          aria-hidden="true"
          className={
            emphasis === "risk"
              ? "text-warning size-5 shrink-0"
              : "text-gold-warm size-5 shrink-0"
          }
        />
      </div>
      <dd>
        <p
          className={
            emphasis === "primary"
              ? "numeric text-foreground mt-4 text-2xl font-semibold md:text-3xl"
              : "numeric text-foreground mt-4 text-xl font-semibold md:text-2xl"
          }
        >
          {value}
        </p>
        <p className="text-muted-foreground mt-3 text-sm leading-6">{helper}</p>
      </dd>
    </div>
  );
}

function LedgerLatestRecordCard({
  snapshot,
}: {
  snapshot: LedgerLatestPerformanceSnapshot;
}) {
  const details = [
    { label: "Record Title", value: snapshot.title },
    { label: "Period Coverage", value: snapshot.coverageLabel },
    { label: "Account Classification", value: snapshot.accountClassification },
    {
      label: "Performance Classification",
      value: snapshot.performanceClassification,
    },
    { label: "Ending Balance", value: formatCurrency(snapshot.endingBalance) },
    { label: "Equity", value: formatCurrency(snapshot.equity) },
  ] as const;

  return (
    <article className="surface-data rounded-lg p-5 md:p-6">
      <div className="flex flex-col gap-4 border-b border-[var(--border)] pb-5 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="type-label text-gold-warm">Latest Cumulative Record</p>
          <h3 className="text-foreground mt-3 text-lg font-semibold">
            {snapshot.title}
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="premium">{snapshot.periodType}</Badge>
          <Badge variant="neutral">{snapshot.coverageLabel}</Badge>
        </div>
      </div>

      <dl className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {details.map((detail) => (
          <div key={detail.label} className="min-w-0">
            <dt className="type-label text-subtle-foreground">
              {detail.label}
            </dt>
            <dd className="numeric text-foreground mt-2 text-sm font-semibold break-words">
              {detail.value}
            </dd>
          </div>
        ))}
      </dl>

      <dl className="mt-5 grid gap-3 border-t border-[var(--border)] pt-5 sm:grid-cols-3">
        <div>
          <dt className="type-label text-subtle-foreground">Total Trades</dt>
          <dd className="numeric text-foreground mt-2 text-base font-semibold">
            {formatInteger(snapshot.totalTrades)}
          </dd>
        </div>
        <div>
          <dt className="type-label text-subtle-foreground">Winning Trades</dt>
          <dd className="numeric text-foreground mt-2 text-base font-semibold">
            {formatInteger(snapshot.winningTrades)}
          </dd>
        </div>
        <div>
          <dt className="type-label text-subtle-foreground">Losing Trades</dt>
          <dd className="numeric text-foreground mt-2 text-base font-semibold">
            {formatInteger(snapshot.losingTrades)}
          </dd>
        </div>
      </dl>
    </article>
  );
}

export function LedgerPerformanceSummary() {
  const snapshot = getLatestPublicCumulativeLedgerRecord();

  if (!snapshot) {
    return (
      <section className="border-t border-[var(--border)] py-12 md:py-14 xl:py-16">
        <Container size="wide">
          <div className="surface-elevated rounded-lg p-5">
            <SectionLabel variant="gold">
              Current Performance Snapshot
            </SectionLabel>
            <h2 className="type-heading-2 text-foreground mt-4 text-balance">
              The latest cumulative Forward Performance snapshot.
            </h2>
            <p className="type-body text-muted-foreground mt-5">
              Current cumulative public performance is not available.
            </p>
          </div>
        </Container>
      </section>
    );
  }

  const kpis = [
    {
      label: "Cumulative Net Profit",
      value: formatCurrency(snapshot.netProfit),
      helper: "Net result across the documented cumulative public record.",
      emphasis: "primary" as const,
      icon: Landmark,
    },
    {
      label: "Cumulative Return",
      value: formatPercent(snapshot.returnPct),
      helper: "Canonical cumulative return, displayed to two decimals.",
      emphasis: "primary" as const,
      icon: Percent,
    },
    {
      label: "Total Trades",
      value: formatInteger(snapshot.totalTrades),
      helper: `${formatInteger(snapshot.winningTrades)} winning / ${formatInteger(snapshot.losingTrades)} losing.`,
      icon: Activity,
    },
    {
      label: "Win Rate",
      value: formatPercent(snapshot.winRatePct),
      helper: "Winning trades as a share of documented total trades.",
      icon: BarChart3,
    },
    {
      label: "Maximum Drawdown",
      value: formatPercent(snapshot.maxDrawdownPct),
      helper: "Maximum observed drawdown in the documented record.",
      emphasis: "risk" as const,
      icon: ShieldAlert,
    },
  ] as const;

  return (
    <section className="border-t border-[var(--border)] py-12 md:py-14 xl:py-16">
      <Container size="wide">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <SectionLabel variant="gold">
              Current Performance Snapshot
            </SectionLabel>
            <h2 className="type-heading-2 text-foreground mt-4 text-balance">
              The latest cumulative Forward Performance snapshot.
            </h2>
            <p className="type-body text-muted-foreground mt-5">
              This section summarizes the most recent cumulative public record
              for the Public Demo Reference Account.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="neutral">{snapshot.accountClassification}</Badge>
            <Badge variant="positive">
              {snapshot.performanceClassification}
            </Badge>
          </div>
        </div>

        <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {kpis.map((kpi) => (
            <KpiCard key={kpi.label} {...kpi} />
          ))}
        </dl>

        <div className="mt-5">
          <LedgerLatestRecordCard snapshot={snapshot} />
        </div>
      </Container>
    </section>
  );
}
