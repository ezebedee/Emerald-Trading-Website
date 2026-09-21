import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import type {
  HomepageFeaturedSystemContext,
  LedgerLatestPerformanceSnapshot,
} from "@/data/selectors/types";

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
  value === undefined ? "-" : currencyFormatter.format(value);

const formatPercent = (value?: number) =>
  value === undefined ? "-" : `${percentFormatter.format(value)}%`;

const formatInteger = (value?: number) =>
  value === undefined ? "-" : integerFormatter.format(value);

const getSnapshotMetrics = (summary: LedgerLatestPerformanceSnapshot) =>
  [
    {
      label: "Cumulative Net Profit",
      value: formatCurrency(summary.netProfit),
      tone: "positive",
    },
    {
      label: "Cumulative Return",
      value: formatPercent(summary.returnPct),
      tone: "positive",
    },
    {
      label: "Total Trades",
      value: formatInteger(summary.totalTrades),
      tone: "neutral",
    },
    {
      label: "Win Rate",
      value: formatPercent(summary.winRatePct),
      tone: "neutral",
    },
    {
      label: "Maximum Drawdown",
      value: formatPercent(summary.maxDrawdownPct),
      tone: "caution",
    },
  ] as const;

export function HomePerformanceSnapshot({
  configurationScope,
  summary,
}: {
  configurationScope?: HomepageFeaturedSystemContext["configuration"];
  summary?: LedgerLatestPerformanceSnapshot;
}) {
  return (
    <section className="bg-surface-soft/45 py-14 md:py-16 xl:py-20">
      <Container size="wide">
        <div className="max-w-3xl">
          <SectionLabel variant="gold">Public Forward Performance</SectionLabel>
          <h2 className="type-heading-2 text-foreground mt-4 max-w-3xl text-balance">
            Documented performance for the current public configuration.
          </h2>
          <p className="type-body text-muted-foreground mt-5 max-w-2xl">
            Current cumulative results are derived from the documented public
            Forward Performance record and are presented separately from
            historical backtests.
          </p>
        </div>

        {summary ? (
          <>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              {configurationScope ? (
                <span className="text-muted-foreground flex flex-wrap items-center gap-2 text-sm">
                  <span className="type-label text-subtle-foreground">
                    Current Public Configuration
                  </span>
                  <Badge variant="neutral">
                    {configurationScope.configurationName}
                  </Badge>
                </span>
              ) : null}
              <Badge variant="premium">{summary.accountClassification}</Badge>
              <Badge variant="positive">
                {summary.performanceClassification}
              </Badge>
              <span className="text-muted-foreground text-sm">
                Period: {summary.coverageLabel}
              </span>
            </div>

            <dl className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {getSnapshotMetrics(summary).map((metric) => (
                <div
                  key={metric.label}
                  className="surface-elevated rounded-lg p-4"
                >
                  <dt className="type-label text-muted-foreground">
                    {metric.label}
                  </dt>
                  <dd
                    className={`numeric mt-4 text-2xl font-semibold tracking-normal ${
                      metric.tone === "positive"
                        ? "text-emerald-bright"
                        : metric.tone === "caution"
                          ? "text-warning"
                          : "text-foreground"
                    }`}
                  >
                    {metric.value}
                  </dd>
                </div>
              ))}
            </dl>
          </>
        ) : (
          <div className="surface-elevated mt-8 rounded-lg p-5">
            <p className="type-body text-muted-foreground">
              Public forward-performance metrics are not currently available.
            </p>
          </div>
        )}

        <div className="mt-8">
          <LinkButton
            href="/ledger"
            size="lg"
            trailingIcon={<ArrowRight aria-hidden="true" />}
          >
            View Full Emerald Ledger
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
