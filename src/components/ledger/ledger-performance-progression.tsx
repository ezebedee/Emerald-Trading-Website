import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { getCumulativePerformanceSeries } from "@/data/selectors";
import type { CumulativePerformancePoint } from "@/data/selectors";

type LedgerPerformanceProgressionProps = Readonly<{
  points?: readonly CumulativePerformancePoint[];
}>;

const monthLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

const chartWidth = 520;
const chartHeight = 320;
const chartMargin = {
  top: 28,
  right: 42,
  bottom: 64,
  left: 64,
} as const;

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const compactCurrencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
  notation: "compact",
});

const percentFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const parseIsoDateUtc = (date: string) => {
  const [year, month, day] = date.split("-").map(Number);

  return Date.UTC(year, month - 1, day);
};

const formatChartDate = (date: string) => {
  const [year, month, day] = date.split("-").map(Number);
  const monthLabel = monthLabels[month - 1];

  if (!monthLabel || !year || !day) {
    return date;
  }

  return `${monthLabel} ${day}`;
};

const formatTableDate = (date: string) => {
  const [year, month, day] = date.split("-").map(Number);
  const monthLabel = monthLabels[month - 1];

  if (!monthLabel || !year || !day) {
    return date;
  }

  return `${monthLabel} ${day}, ${year}`;
};

const formatCurrency = (value: number) => currencyFormatter.format(value);

const formatCompactCurrency = (value: number) =>
  value === 0 ? "$0" : compactCurrencyFormatter.format(value).toLowerCase();

const formatPercent = (value: number) => `${percentFormatter.format(value)}%`;

const isFinitePoint = (point: CumulativePerformancePoint) =>
  Number.isFinite(point.netProfit) &&
  Number.isFinite(point.returnPct) &&
  Number.isFinite(parseIsoDateUtc(point.date));

const getNiceStep = (rawStep: number) => {
  if (rawStep <= 0 || !Number.isFinite(rawStep)) {
    return 1;
  }

  const magnitude = 10 ** Math.floor(Math.log10(rawStep));
  const normalized = rawStep / magnitude;

  if (normalized <= 1) {
    return magnitude;
  }

  if (normalized <= 2) {
    return 2 * magnitude;
  }

  if (normalized <= 5) {
    return 5 * magnitude;
  }

  return 10 * magnitude;
};

const getChartDomain = (points: readonly CumulativePerformancePoint[]) => {
  const values = points.map((point) => point.netProfit);
  const rawMin = Math.min(...values, 0);
  const rawMax = Math.max(...values, 0);

  if (rawMin === rawMax) {
    const padding = Math.max(Math.abs(rawMax) * 0.1, 1);

    return { min: rawMin - padding, max: rawMax + padding };
  }

  const step = getNiceStep((rawMax - rawMin) / 4);
  const min = Math.floor(rawMin / step) * step;
  const max = Math.ceil(rawMax / step) * step;

  return min === max ? { min: min - step, max: max + step } : { min, max };
};

const getYTicks = (min: number, max: number) => {
  const step = getNiceStep((max - min) / 4);
  const ticks: number[] = [];
  const firstTick = Math.ceil(min / step) * step;

  for (let tick = firstTick; tick <= max + step * 0.5; tick += step) {
    ticks.push(Object.is(tick, -0) ? 0 : tick);
  }

  return ticks.slice(0, 6);
};

const createChartGeometry = (points: readonly CumulativePerformancePoint[]) => {
  const sortedPoints = [...points].toSorted((first, second) =>
    first.date.localeCompare(second.date),
  );
  const firstDate = parseIsoDateUtc(sortedPoints[0]?.date ?? "");
  const lastDate = parseIsoDateUtc(sortedPoints.at(-1)?.date ?? "");
  const dateRange = lastDate - firstDate;
  const plotWidth = chartWidth - chartMargin.left - chartMargin.right;
  const plotHeight = chartHeight - chartMargin.top - chartMargin.bottom;
  const { min, max } = getChartDomain(sortedPoints);
  const valueRange = max - min;

  const toX = (date: string) => {
    if (!Number.isFinite(dateRange) || dateRange === 0) {
      return chartMargin.left + plotWidth / 2;
    }

    return (
      chartMargin.left +
      ((parseIsoDateUtc(date) - firstDate) / dateRange) * plotWidth
    );
  };

  const toY = (value: number) => {
    if (!Number.isFinite(valueRange) || valueRange === 0) {
      return chartMargin.top + plotHeight / 2;
    }

    return chartMargin.top + (1 - (value - min) / valueRange) * plotHeight;
  };

  const plottedPoints = sortedPoints.map((point) => ({
    ...point,
    x: toX(point.date),
    y: toY(point.netProfit),
  }));
  const linePath = plottedPoints
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");
  const areaPath = `${linePath} L ${
    plottedPoints.at(-1)?.x ?? chartMargin.left
  } ${toY(0)} L ${plottedPoints[0]?.x ?? chartMargin.left} ${toY(0)} Z`;

  return {
    areaPath,
    linePath,
    max,
    min,
    plottedPoints,
    plotBottom: chartMargin.top + plotHeight,
    plotLeft: chartMargin.left,
    plotRight: chartMargin.left + plotWidth,
    yTicks: getYTicks(min, max),
    toY,
  };
};

function LedgerProgressionEmptyState({
  points,
}: {
  points: readonly CumulativePerformancePoint[];
}) {
  return (
    <section className="border-t border-[var(--border)] py-12 md:py-14 xl:py-16">
      <Container size="wide">
        <div className="surface-elevated rounded-lg p-5 md:p-6">
          <SectionLabel variant="gold">Performance Progression</SectionLabel>
          <h2 className="type-heading-2 text-foreground mt-4 text-balance">
            Cumulative performance across documented reporting checkpoints.
          </h2>
          <p className="type-body text-muted-foreground mt-5 max-w-3xl">
            Not enough documented cumulative checkpoints are available to show
            progression.
          </p>

          {points.length === 1 ? (
            <div className="mt-6">
              <CheckpointTable points={points} />
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}

function CheckpointTable({
  points,
}: {
  points: readonly CumulativePerformancePoint[];
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-[var(--border)]">
      <table className="w-full table-fixed border-collapse text-left text-xs sm:text-sm">
        <thead className="bg-surface-soft/70">
          <tr>
            <th scope="col" className="table-header w-[34%] px-3 py-3 sm:px-4">
              Date
            </th>
            <th
              scope="col"
              className="table-header px-3 py-3 text-right sm:px-4"
            >
              Net Profit
            </th>
            <th
              scope="col"
              className="table-header px-3 py-3 text-right sm:px-4"
            >
              Return
            </th>
          </tr>
        </thead>
        <tbody>
          {points.map((point) => (
            <tr key={point.date} className="table-row last:border-b-0">
              <th
                scope="row"
                className="text-foreground px-3 py-3 text-left font-semibold sm:px-4"
              >
                {formatTableDate(point.date)}
              </th>
              <td className="numeric text-foreground px-3 py-3 text-right font-semibold sm:px-4">
                {formatCurrency(point.netProfit)}
              </td>
              <td className="numeric text-muted-foreground px-3 py-3 text-right sm:px-4">
                {formatPercent(point.returnPct)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function LedgerPerformanceProgression({
  points: providedPoints,
}: LedgerPerformanceProgressionProps) {
  const points = (providedPoints ?? getCumulativePerformanceSeries()).filter(
    isFinitePoint,
  );

  if (points.length < 2) {
    return <LedgerProgressionEmptyState points={points} />;
  }

  const chart = createChartGeometry(points);
  const latestPoint = points.at(-1);

  if (!latestPoint) {
    return <LedgerProgressionEmptyState points={points} />;
  }

  return (
    <section className="border-t border-[var(--border)] py-12 md:py-14 xl:py-16">
      <Container size="wide">
        <div className="max-w-3xl">
          <SectionLabel variant="gold">Performance Progression</SectionLabel>
          <h2 className="type-heading-2 text-foreground mt-4 text-balance">
            Cumulative performance across documented reporting checkpoints.
          </h2>
          <p className="type-body text-muted-foreground mt-5">
            Each point represents a documented cumulative checkpoint in the
            public Forward Performance record. Lines connect documented
            cumulative checkpoints for readability; they do not represent
            continuous account sampling between reported dates.
          </p>
        </div>

        <div className="mt-8 grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
          <article className="surface-data overflow-hidden rounded-lg p-4 md:p-5">
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="type-label text-muted-foreground">
                  Cumulative Net Profit
                </p>
                <p className="text-muted-foreground mt-2 text-sm">
                  Documented public checkpoints
                </p>
              </div>
              <Badge variant="neutral">{points.length} Checkpoints</Badge>
            </div>

            <div className="mx-auto w-full max-w-3xl">
              <svg
                aria-hidden="true"
                className="h-auto w-full overflow-visible"
                focusable="false"
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              >
                <rect
                  x={chart.plotLeft}
                  y={chartMargin.top}
                  width={chart.plotRight - chart.plotLeft}
                  height={chart.plotBottom - chartMargin.top}
                  fill="rgba(255,255,255,0.015)"
                  rx="6"
                />

                {chart.yTicks.map((tick) => (
                  <g key={tick}>
                    <line
                      x1={chart.plotLeft}
                      x2={chart.plotRight}
                      y1={chart.toY(tick)}
                      y2={chart.toY(tick)}
                      stroke="var(--chart-grid)"
                      strokeWidth="1"
                    />
                    <text
                      x={chart.plotLeft - 12}
                      y={chart.toY(tick) + 4}
                      fill="var(--chart-axis)"
                      fontSize="12"
                      textAnchor="end"
                    >
                      {formatCompactCurrency(tick)}
                    </text>
                  </g>
                ))}

                <line
                  x1={chart.plotLeft}
                  x2={chart.plotRight}
                  y1={chart.toY(0)}
                  y2={chart.toY(0)}
                  stroke="rgba(244,201,93,0.26)"
                  strokeWidth="1"
                />

                <path
                  d={chart.areaPath}
                  fill="rgba(0,168,107,0.08)"
                  stroke="none"
                />
                <path
                  d={chart.linePath}
                  fill="none"
                  stroke="var(--emerald)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                />

                {chart.plottedPoints.map((point, index) => {
                  const isLatest = index === chart.plottedPoints.length - 1;

                  return (
                    <g key={point.date}>
                      <circle
                        cx={point.x}
                        cy={point.y}
                        r={isLatest ? 6 : 4}
                        fill={isLatest ? "var(--gold-warm)" : "var(--surface)"}
                        stroke={
                          isLatest
                            ? "var(--gold-warm)"
                            : "var(--emerald-bright)"
                        }
                        strokeWidth={isLatest ? 2 : 2.5}
                      />
                      <text
                        x={point.x}
                        y={chart.plotBottom + 25}
                        fill="var(--muted-foreground)"
                        fontSize="13"
                        textAnchor="middle"
                        transform={`rotate(-20 ${point.x} ${chart.plotBottom + 25})`}
                      >
                        {formatChartDate(point.date)}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </article>

          <aside className="surface-premium rounded-lg p-5 md:p-6">
            <p className="type-label text-gold-warm">
              Latest Documented Checkpoint
            </p>
            <dl className="mt-5 grid gap-5">
              <div>
                <dt className="type-label text-subtle-foreground">Date</dt>
                <dd className="text-foreground mt-2 text-base font-semibold">
                  {formatTableDate(latestPoint.date)}
                </dd>
              </div>
              <div>
                <dt className="type-label text-subtle-foreground">
                  Cumulative Net Profit
                </dt>
                <dd className="numeric text-foreground mt-2 text-2xl font-semibold">
                  {formatCurrency(latestPoint.netProfit)}
                </dd>
              </div>
              <div>
                <dt className="type-label text-subtle-foreground">
                  Cumulative Return
                </dt>
                <dd className="numeric text-foreground mt-2 text-xl font-semibold">
                  {formatPercent(latestPoint.returnPct)}
                </dd>
              </div>
            </dl>
          </aside>
        </div>

        <div className="mt-5">
          <CheckpointTable points={points} />
        </div>
      </Container>
    </section>
  );
}
