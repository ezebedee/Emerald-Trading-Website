import {
  cumulativeLedgerEntries,
  dailyLedgerEntries,
  ledgerEntries,
  publicLedgerAccount,
  weeklyLedgerEntries,
} from "@/data/ledger";
import type { LedgerEntry, PerformanceMetrics } from "@/domain";

import { getAssetById } from "./assets";
import type {
  CumulativePerformancePoint,
  LedgerChronologyEntry,
  LedgerConsistencyIssue,
  LedgerLatestPerformanceSnapshot,
  LedgerPublicRecordOverview,
  PerformanceSummary,
} from "./types";

const MONEY_TOLERANCE = 0.01;
const PERCENTAGE_TOLERANCE = 0.01;

const isPublic = (entry: LedgerEntry) => entry.visibility === "public";

const isPublicForwardPerformance = (entry: LedgerEntry) =>
  isPublic(entry) && entry.performanceClassification === "forward-performance";

const accountClassificationLabels = {
  "public-demo-reference": "Public Demo Reference Account",
  "private-live": "Private Account",
  backtest: "Backtest",
  simulation: "Simulation",
} as const;

const performanceClassificationLabels = {
  "forward-performance": "Forward Performance",
  backtest: "Backtest",
  simulation: "Simulation",
  "private-live-performance": "Private Performance",
} as const;

const periodTypeLabels = {
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
  quarterly: "Quarterly",
  annual: "Annual",
  cumulative: "Cumulative",
  custom: "Custom",
} as const;

const orderedPublicScope = ["daily", "weekly", "cumulative"] as const;

const chronologyPeriodTypePrecedence = {
  daily: 1,
  weekly: 2,
  monthly: 3,
  quarterly: 4,
  annual: 5,
  cumulative: 6,
  custom: 7,
} as const;

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

const latestByEndDate = <T extends { endDate: string }>(
  entries: readonly T[],
) =>
  entries.reduce<T | undefined>((latest, entry) => {
    if (!latest || entry.endDate > latest.endDate) {
      return entry;
    }

    if (
      "id" in entry &&
      "id" in latest &&
      entry.endDate === latest.endDate &&
      String(entry.id).localeCompare(String(latest.id)) > 0
    ) {
      return entry;
    }

    return latest;
  }, undefined);

const toPerformanceSummary = (
  entry: LedgerEntry,
  metrics: PerformanceMetrics,
): PerformanceSummary => ({
  recordId: entry.id,
  startDate: entry.startDate,
  endDate: entry.endDate,
  netProfit: metrics.netProfit,
  returnPct: metrics.returnPct,
  endingBalance: metrics.endingBalance,
  equity: metrics.equity,
  totalTrades: metrics.totalTrades,
  winningTrades: metrics.winningTrades,
  losingTrades: metrics.losingTrades,
  winRatePct: metrics.winRatePct,
  maxDrawdownPct: metrics.maxDrawdownPct,
});

const toCumulativePoint = (
  entry: LedgerEntry,
  metrics: PerformanceMetrics,
): CumulativePerformancePoint => ({
  recordId: entry.id,
  date: entry.endDate,
  label: entry.title,
  netProfit: metrics.netProfit,
  returnPct: metrics.returnPct,
  endingBalance: metrics.endingBalance,
  equity: metrics.equity,
});

const toChronologyMetricSnapshot = (metrics: PerformanceMetrics) => ({
  netProfit: metrics.netProfit,
  returnPct: metrics.returnPct,
  totalTrades: metrics.totalTrades,
  winRatePct: metrics.winRatePct,
});

const numbersDiffer = (first: number, second: number, tolerance: number) =>
  Math.abs(first - second) > tolerance;

const parseIsoDateParts = (date: string) => {
  const [year, month, day] = date.split("-").map(Number);

  return { year, month, day };
};

export const formatPublicRecordCoverage = (
  startDate: string,
  endDate: string,
) => {
  const start = parseIsoDateParts(startDate);
  const end = parseIsoDateParts(endDate);
  const startMonth = monthLabels[start.month - 1];
  const endMonth = monthLabels[end.month - 1];

  if (!startMonth || !endMonth) {
    return `${startDate} - ${endDate}`;
  }

  if (
    start.year === end.year &&
    start.month === end.month &&
    start.day === end.day
  ) {
    return `${endMonth} ${end.day}, ${end.year}`;
  }

  if (start.year === end.year && start.month === end.month) {
    return `${startMonth} ${start.day}-${end.day}, ${end.year}`;
  }

  if (start.year === end.year) {
    return `${startMonth} ${start.day} - ${endMonth} ${end.day}, ${end.year}`;
  }

  return `${startMonth} ${start.day}, ${start.year} - ${endMonth} ${end.day}, ${end.year}`;
};

const formatPublicScope = (entries: readonly LedgerEntry[]) => {
  const availableTypes = new Set(entries.map((entry) => entry.periodType));
  const labels = orderedPublicScope
    .filter((periodType) => availableTypes.has(periodType))
    .map((periodType) => periodTypeLabels[periodType]);

  if (labels.length <= 1) {
    return labels[0];
  }

  return `${labels.slice(0, -1).join(", ")} & ${labels.at(-1)}`;
};

const cumulativeSnapshotPrecedence = (entry: LedgerEntry) => {
  if (entry.periodType === "cumulative") {
    return 4;
  }

  if (entry.periodType === "weekly" && entry.cumulativeMetrics) {
    return 3;
  }

  if (entry.periodType === "daily" && entry.cumulativeMetrics) {
    return 2;
  }

  if (entry.id === "day-001") {
    return 1;
  }

  return 0;
};

export const getLedgerEntryById = (id: string) =>
  ledgerEntries.find((entry) => entry.id === id);

export const requireLedgerEntryById = (id: string) => {
  const entry = getLedgerEntryById(id);

  if (!entry) {
    throw new Error(`Unknown Ledger entry "${id}".`);
  }

  return entry;
};

export const getLedgerEntryBySlug = (slug: string) =>
  ledgerEntries.find((entry) => entry.slug === slug);

export const getDailyLedgerEntries = () => dailyLedgerEntries;

export const getWeeklyLedgerEntries = () => weeklyLedgerEntries;

export const getCumulativeLedgerEntries = () => cumulativeLedgerEntries;

export const getLatestDailyLedgerEntry = () =>
  latestByEndDate(dailyLedgerEntries);

export const getLatestWeeklyLedgerEntry = () =>
  latestByEndDate(weeklyLedgerEntries);

export const getLatestCumulativeLedgerEntry = () =>
  latestByEndDate(cumulativeLedgerEntries);

export const getPublicLedgerEntries = () => ledgerEntries.filter(isPublic);

export const getPublicLedgerChronologyEntriesFromRecords = (
  entries: readonly LedgerEntry[],
): LedgerChronologyEntry[] =>
  entries
    .filter(isPublicForwardPerformance)
    .toSorted((first, second) => {
      const endDateSort = first.endDate.localeCompare(second.endDate);

      if (endDateSort !== 0) {
        return endDateSort;
      }

      const periodTypeSort =
        chronologyPeriodTypePrecedence[first.periodType] -
        chronologyPeriodTypePrecedence[second.periodType];

      if (periodTypeSort !== 0) {
        return periodTypeSort;
      }

      const startDateSort = first.startDate.localeCompare(second.startDate);

      if (startDateSort !== 0) {
        return startDateSort;
      }

      return first.id.localeCompare(second.id);
    })
    .map((entry) => ({
      id: entry.id,
      title: entry.title,
      periodType: periodTypeLabels[entry.periodType],
      startDate: entry.startDate,
      endDate: entry.endDate,
      coverageLabel: formatPublicRecordCoverage(entry.startDate, entry.endDate),
      accountClassification:
        accountClassificationLabels[entry.accountClassification],
      performanceClassification:
        performanceClassificationLabels[entry.performanceClassification],
      period: toChronologyMetricSnapshot(entry.periodMetrics),
      cumulative: entry.cumulativeMetrics
        ? {
            netProfit: entry.cumulativeMetrics.netProfit,
            returnPct: entry.cumulativeMetrics.returnPct,
          }
        : undefined,
    }));

export const getPublicLedgerChronologyEntries = (): LedgerChronologyEntry[] =>
  getPublicLedgerChronologyEntriesFromRecords(ledgerEntries);

const assertTradeOutcomeConsistency = (entry: LedgerEntry) => {
  const metrics = getEffectiveCumulativeMetrics(entry);

  if (
    metrics &&
    metrics.winningTrades + metrics.losingTrades !== metrics.totalTrades
  ) {
    throw new Error(
      `Ledger entry ${entry.id} has cumulative trade outcomes that do not sum to total trades.`,
    );
  }
};

export const getLedgerPublicRecordOverviewFromRecords = (
  entries: readonly LedgerEntry[],
): LedgerPublicRecordOverview => {
  const publicForwardEntries = entries.filter(isPublicForwardPerformance);
  const earliestEntry = publicForwardEntries.reduce<LedgerEntry | undefined>(
    (earliest, entry) => {
      if (!earliest || entry.startDate < earliest.startDate) {
        return entry;
      }

      return earliest;
    },
    undefined,
  );
  const latestEntry = latestByEndDate(publicForwardEntries);
  const performanceClassification = publicForwardEntries[0]
    ? performanceClassificationLabels[
        publicForwardEntries[0].performanceClassification
      ]
    : undefined;

  return {
    accountClassification:
      accountClassificationLabels[publicLedgerAccount.accountClassification],
    performanceClassification,
    coverageLabel:
      earliestEntry && latestEntry
        ? formatPublicRecordCoverage(
            earliestEntry.startDate,
            latestEntry.endDate,
          )
        : undefined,
    scopeLabel: formatPublicScope(publicForwardEntries),
    hasPublicRecord: publicForwardEntries.length > 0,
  };
};

export const getLedgerPublicRecordOverview = (): LedgerPublicRecordOverview =>
  getLedgerPublicRecordOverviewFromRecords(ledgerEntries);

export const getLatestPublicCumulativeLedgerRecordFromRecords = (
  entries: readonly LedgerEntry[],
): LedgerLatestPerformanceSnapshot | undefined => {
  const latestEntry = latestByEndDate(
    entries.filter(
      (entry) =>
        entry.periodType === "cumulative" && isPublicForwardPerformance(entry),
    ),
  );

  if (!latestEntry) {
    return undefined;
  }

  assertTradeOutcomeConsistency(latestEntry);

  const metrics = getEffectiveCumulativeMetrics(latestEntry);

  if (!metrics) {
    return undefined;
  }

  return {
    recordId: latestEntry.id,
    title: latestEntry.title,
    periodType: periodTypeLabels[latestEntry.periodType],
    coverageLabel: formatPublicRecordCoverage(
      latestEntry.startDate,
      latestEntry.endDate,
    ),
    accountClassification:
      accountClassificationLabels[latestEntry.accountClassification],
    performanceClassification:
      performanceClassificationLabels[latestEntry.performanceClassification],
    netProfit: metrics.netProfit,
    returnPct: metrics.returnPct,
    endingBalance: metrics.endingBalance,
    equity: metrics.equity,
    totalTrades: metrics.totalTrades,
    winningTrades: metrics.winningTrades,
    losingTrades: metrics.losingTrades,
    winRatePct: metrics.winRatePct,
    maxDrawdownPct: metrics.maxDrawdownPct,
  };
};

export const getLatestPublicCumulativeLedgerRecord = ():
  LedgerLatestPerformanceSnapshot | undefined =>
  getLatestPublicCumulativeLedgerRecordFromRecords(cumulativeLedgerEntries);

export const getHomepageLedgerTeaserEntries = () => {
  const selectedEntries: LedgerEntry[] = [];
  const selectedEndDates = new Set<string>();

  const addLatestNonDuplicateEntry = (entries: readonly LedgerEntry[]) => {
    const entry = latestByEndDate(
      entries.filter(
        (candidate) =>
          isPublicForwardPerformance(candidate) &&
          !selectedEndDates.has(candidate.endDate),
      ),
    );

    if (entry) {
      selectedEntries.push(entry);
      selectedEndDates.add(entry.endDate);
    }
  };

  addLatestNonDuplicateEntry(cumulativeLedgerEntries);
  addLatestNonDuplicateEntry(weeklyLedgerEntries);
  addLatestNonDuplicateEntry(dailyLedgerEntries);

  return selectedEntries;
};

export const getLatestPublicPerformanceSummaryFromRecords = (
  entries: readonly LedgerEntry[],
) => {
  const latestEntry = latestByEndDate(
    entries.filter(
      (entry) =>
        entry.periodType === "cumulative" && isPublicForwardPerformance(entry),
    ),
  );

  if (!latestEntry) {
    return undefined;
  }

  const metrics = getEffectiveCumulativeMetrics(latestEntry);

  if (!metrics) {
    return undefined;
  }

  return toPerformanceSummary(latestEntry, metrics);
};

export const getLatestPublicPerformanceSummary = () =>
  getLatestPublicPerformanceSummaryFromRecords(cumulativeLedgerEntries);

export const getEffectiveCumulativeMetrics = (entry: LedgerEntry) => {
  if (entry.cumulativeMetrics) {
    return entry.cumulativeMetrics;
  }

  if (entry.periodType === "cumulative" || entry.id === "day-001") {
    return entry.periodMetrics;
  }

  return undefined;
};

export const getCumulativePerformanceSeriesFromRecords = (
  entries: readonly LedgerEntry[],
) =>
  Array.from(
    entries
      .filter(isPublicForwardPerformance)
      .reduce((snapshotsByDate, entry) => {
        const metrics = getEffectiveCumulativeMetrics(entry);

        if (!metrics) {
          return snapshotsByDate;
        }

        const existing = snapshotsByDate.get(entry.endDate);

        if (
          !existing ||
          cumulativeSnapshotPrecedence(entry) >
            cumulativeSnapshotPrecedence(existing.entry)
        ) {
          snapshotsByDate.set(entry.endDate, { entry, metrics });
        }

        return snapshotsByDate;
      }, new Map<string, { entry: LedgerEntry; metrics: PerformanceMetrics }>())
      .values(),
  )
    .map(({ entry, metrics }) => toCumulativePoint(entry, metrics))
    .toSorted((first, second) => first.date.localeCompare(second.date));

export const getCumulativePerformanceSeries = () =>
  getCumulativePerformanceSeriesFromRecords(ledgerEntries);

export const getDailyCumulativePerformanceSeries = () =>
  dailyLedgerEntries
    .filter(isPublicForwardPerformance)
    .map((entry) => {
      const metrics = getEffectiveCumulativeMetrics(entry);

      if (!metrics) {
        return undefined;
      }

      return toCumulativePoint(entry, metrics);
    })
    .filter((point): point is CumulativePerformancePoint => Boolean(point))
    .toSorted((first, second) => first.date.localeCompare(second.date));

export const getWeeklyCumulativePerformanceSeries = () =>
  weeklyLedgerEntries
    .filter(isPublicForwardPerformance)
    .map((entry) => {
      if (!entry.cumulativeMetrics) {
        return undefined;
      }

      return toCumulativePoint(entry, entry.cumulativeMetrics);
    })
    .filter((point): point is CumulativePerformancePoint => Boolean(point))
    .toSorted((first, second) => first.date.localeCompare(second.date));

export const calculateWinRatePct = (
  winningTrades: number,
  totalTrades: number,
) => {
  if (totalTrades === 0) {
    return 0;
  }

  return (winningTrades / totalTrades) * 100;
};

export const calculateProfitFactor = (
  grossProfit?: number,
  grossLoss?: number,
) => {
  if (grossProfit === undefined || grossLoss === undefined || grossLoss === 0) {
    return null;
  }

  return grossProfit / grossLoss;
};

export const calculateReturnPct = (
  startingBalance: number,
  endingBalance: number,
) => {
  if (startingBalance === 0) {
    return null;
  }

  return ((endingBalance - startingBalance) / startingBalance) * 100;
};

export const calculateExpectedEndingBalance = (
  startingBalance: number,
  netProfit: number,
) => startingBalance + netProfit;

export const getProfitDelta = (
  current: PerformanceSummary,
  previous: PerformanceSummary,
) => current.netProfit - previous.netProfit;

export const getReturnDelta = (
  current: PerformanceSummary,
  previous: PerformanceSummary,
) => current.returnPct - previous.returnPct;

export const getLedgerThumbnail = (entry: LedgerEntry) =>
  entry.thumbnailAssetId ? getAssetById(entry.thumbnailAssetId) : undefined;

export const getLedgerThumbnailByEntryId = (id: string) => {
  const entry = getLedgerEntryById(id);

  return entry ? getLedgerThumbnail(entry) : undefined;
};

export const getLedgerConsistencyIssues = () => {
  const issues: LedgerConsistencyIssue[] = [];

  for (const entry of ledgerEntries) {
    const expectedEndingBalance = calculateExpectedEndingBalance(
      entry.periodMetrics.startingBalance,
      entry.periodMetrics.netProfit,
    );

    if (
      numbersDiffer(
        expectedEndingBalance,
        entry.periodMetrics.endingBalance,
        MONEY_TOLERANCE,
      )
    ) {
      issues.push({
        recordId: entry.id,
        field: "periodMetrics.endingBalance",
        expected: expectedEndingBalance,
        actual: entry.periodMetrics.endingBalance,
        tolerance: MONEY_TOLERANCE,
        message:
          "Period ending balance differs from starting balance plus net profit.",
      });
    }

    const expectedWinRate = calculateWinRatePct(
      entry.periodMetrics.winningTrades,
      entry.periodMetrics.totalTrades,
    );

    if (
      numbersDiffer(
        expectedWinRate,
        entry.periodMetrics.winRatePct,
        PERCENTAGE_TOLERANCE,
      )
    ) {
      issues.push({
        recordId: entry.id,
        field: "periodMetrics.winRatePct",
        expected: expectedWinRate,
        actual: entry.periodMetrics.winRatePct,
        tolerance: PERCENTAGE_TOLERANCE,
        message: "Period win rate differs from derived trade counts.",
      });
    }

    const expectedReturn = calculateReturnPct(
      entry.periodMetrics.startingBalance,
      entry.periodMetrics.endingBalance,
    );

    if (
      expectedReturn !== null &&
      numbersDiffer(
        expectedReturn,
        entry.periodMetrics.returnPct,
        PERCENTAGE_TOLERANCE,
      )
    ) {
      issues.push({
        recordId: entry.id,
        field: "periodMetrics.returnPct",
        expected: expectedReturn,
        actual: entry.periodMetrics.returnPct,
        tolerance: PERCENTAGE_TOLERANCE,
        message: "Period return percentage differs from balance movement.",
      });
    }

    const expectedProfitFactor = calculateProfitFactor(
      entry.periodMetrics.grossProfit,
      entry.periodMetrics.grossLoss,
    );

    if (
      expectedProfitFactor !== null &&
      entry.periodMetrics.profitFactor !== undefined &&
      entry.periodMetrics.profitFactor !== null &&
      numbersDiffer(
        expectedProfitFactor,
        entry.periodMetrics.profitFactor,
        PERCENTAGE_TOLERANCE,
      )
    ) {
      issues.push({
        recordId: entry.id,
        field: "periodMetrics.profitFactor",
        expected: expectedProfitFactor,
        actual: entry.periodMetrics.profitFactor,
        tolerance: PERCENTAGE_TOLERANCE,
        message: "Period profit factor differs from gross profit/loss.",
      });
    }
  }

  return issues;
};
