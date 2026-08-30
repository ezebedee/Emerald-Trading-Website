import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { getPublicLedgerChronologyEntries } from "@/data/selectors";
import type { LedgerChronologyEntry } from "@/data/selectors";

type LedgerRecordChronologyProps = Readonly<{
  entries?: readonly LedgerChronologyEntry[];
}>;

const CUMULATIVE_DISPLAY_TOLERANCE = 0.01;

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

const trimLedgerTitle = (title: string) =>
  title.replace(/^Emerald Ledger\s*-\s*/i, "");

const getMetricLabelPrefix = (entry: LedgerChronologyEntry) =>
  entry.periodType === "Cumulative" ? "Cumulative" : "Period";

const getPeriodBadgeVariant = (periodType: string) => {
  if (periodType === "Cumulative") {
    return "positive" as const;
  }

  if (periodType === "Weekly") {
    return "premium" as const;
  }

  return "neutral" as const;
};

const getPeriodTypeDescription = (periodType: string) => {
  if (periodType === "Cumulative") {
    return "Aggregate public record through period end";
  }

  if (periodType === "Weekly") {
    return "Multi-day weekly summary";
  }

  return "Single-day reporting entry";
};

const hasMeaningfulCumulativeContext = (entry: LedgerChronologyEntry) => {
  if (!entry.cumulative || entry.periodType === "Cumulative") {
    return false;
  }

  return (
    Math.abs(entry.cumulative.netProfit - entry.period.netProfit) >
      CUMULATIVE_DISPLAY_TOLERANCE ||
    Math.abs(entry.cumulative.returnPct - entry.period.returnPct) >
      CUMULATIVE_DISPLAY_TOLERANCE
  );
};

function Metric({
  label,
  value,
  primary = false,
}: {
  label: string;
  value: string;
  primary?: boolean;
}) {
  return (
    <div className="min-w-0">
      <dt className="type-label text-subtle-foreground">{label}</dt>
      <dd
        className={
          primary
            ? "numeric text-foreground mt-2 text-xl font-semibold md:text-2xl"
            : "numeric text-foreground mt-2 text-base font-semibold"
        }
      >
        {value}
      </dd>
    </div>
  );
}

function CumulativeContext({ entry }: { entry: LedgerChronologyEntry }) {
  if (!hasMeaningfulCumulativeContext(entry) || !entry.cumulative) {
    return null;
  }

  return (
    <div className="bg-surface/75 mt-5 rounded-md border border-[var(--border)] p-4">
      <p className="type-label text-gold-warm">Cumulative To Date</p>
      <dl className="mt-4 grid gap-4 sm:grid-cols-2">
        <Metric
          label="Net Profit"
          value={formatCurrency(entry.cumulative.netProfit)}
        />
        <Metric
          label="Return"
          value={formatPercent(entry.cumulative.returnPct)}
        />
      </dl>
    </div>
  );
}

function ChronologyRecordCard({
  entry,
  index,
}: {
  entry: LedgerChronologyEntry;
  index: number;
}) {
  const metricPrefix = getMetricLabelPrefix(entry);

  return (
    <li className="relative pl-8 md:pl-10">
      <div
        aria-hidden="true"
        className="bg-surface absolute top-6 left-0 grid size-7 place-items-center rounded-full border border-[var(--border-gold)]"
      >
        <span className="bg-gold-warm size-2 rounded-full" />
      </div>

      <article className="surface-elevated rounded-lg p-5 md:p-6">
        <div className="flex flex-col gap-4 border-b border-[var(--border)] pb-5 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={getPeriodBadgeVariant(entry.periodType)}>
                {entry.periodType}
              </Badge>
              <Badge variant="neutral">{entry.performanceClassification}</Badge>
              <span className="type-label text-subtle-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="type-heading-4 text-foreground mt-4 text-balance">
              {trimLedgerTitle(entry.title)}
            </h3>
            <p className="text-muted-foreground mt-3 text-sm leading-6">
              {getPeriodTypeDescription(entry.periodType)}
            </p>
          </div>

          <div className="text-left md:text-right">
            <p className="type-label text-subtle-foreground">Coverage</p>
            <p className="text-foreground mt-2 text-sm font-semibold">
              {entry.coverageLabel}
            </p>
          </div>
        </div>

        <dl className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
          <Metric
            label={`${metricPrefix} Net Profit`}
            value={formatCurrency(entry.period.netProfit)}
            primary
          />
          <Metric
            label={`${metricPrefix} Return`}
            value={formatPercent(entry.period.returnPct)}
            primary
          />
          <Metric
            label="Total Trades"
            value={formatInteger(entry.period.totalTrades)}
          />
          <Metric
            label="Win Rate"
            value={formatPercent(entry.period.winRatePct)}
          />
        </dl>

        <CumulativeContext entry={entry} />
      </article>
    </li>
  );
}

export function LedgerRecordChronology({
  entries = getPublicLedgerChronologyEntries(),
}: LedgerRecordChronologyProps) {
  if (entries.length === 0) {
    return (
      <section className="border-t border-[var(--border)] py-12 md:py-14 xl:py-16">
        <Container size="wide">
          <div className="surface-elevated rounded-lg p-5 md:p-6">
            <SectionLabel variant="gold">Ledger Chronology</SectionLabel>
            <h2 className="type-heading-2 text-foreground mt-4 text-balance">
              A chronological record of documented daily, weekly, and cumulative
              reporting.
            </h2>
            <p className="type-body text-muted-foreground mt-5">
              No public Ledger records are currently available.
            </p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-surface/70 border-t border-[var(--border)] py-12 md:py-14 xl:py-16">
      <Container size="wide">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <SectionLabel variant="gold">Ledger Chronology</SectionLabel>
            <h2 className="type-heading-2 text-foreground mt-4 text-balance">
              A chronological record of documented daily, weekly, and cumulative
              reporting.
            </h2>
            <p className="type-body text-muted-foreground mt-5">
              The chronology preserves each published public Forward Performance
              record as a distinct reporting checkpoint, from daily entries
              through weekly and cumulative summaries.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="neutral">{entries.length} Public Records</Badge>
            <Badge variant="positive">
              {entries[0]?.performanceClassification}
            </Badge>
          </div>
        </div>

        <div className="relative mx-auto mt-8 max-w-5xl">
          <div
            aria-hidden="true"
            className="absolute top-4 bottom-4 left-[13px] w-px bg-[linear-gradient(to_bottom,rgba(244,201,93,0.38),rgba(0,168,107,0.32))]"
          />
          <ol className="grid list-none gap-4 p-0">
            {entries.map((entry, index) => (
              <ChronologyRecordCard
                key={entry.id}
                entry={entry}
                index={index}
              />
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
