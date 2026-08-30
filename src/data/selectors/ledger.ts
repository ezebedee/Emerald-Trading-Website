import {
  cumulativeLedgerEntries,
  dailyLedgerEntries,
  ledgerEntries,
  weeklyLedgerEntries,
} from "@/data/ledger";
import type { LedgerEntry, PerformanceMetrics } from "@/domain";

import { getAssetById } from "./assets";
import type {
  CumulativePerformancePoint,
  LedgerConsistencyIssue,
  PerformanceSummary,
} from "./types";

const MONEY_TOLERANCE = 0.01;
const PERCENTAGE_TOLERANCE = 0.01;

const isPublic = (entry: LedgerEntry) => entry.visibility === "public";

const latestByEndDate = <T extends { endDate: string }>(
  entries: readonly T[],
) =>
  entries.reduce<T | undefined>((latest, entry) => {
    if (!latest || entry.endDate > latest.endDate) {
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

const numbersDiffer = (first: number, second: number, tolerance: number) =>
  Math.abs(first - second) > tolerance;

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

export const getLatestPublicPerformanceSummary = () => {
  const latestEntry = latestByEndDate(cumulativeLedgerEntries.filter(isPublic));

  if (!latestEntry) {
    return undefined;
  }

  const metrics = getEffectiveCumulativeMetrics(latestEntry);

  if (!metrics) {
    return undefined;
  }

  return toPerformanceSummary(latestEntry, metrics);
};

export const getEffectiveCumulativeMetrics = (entry: LedgerEntry) => {
  if (entry.cumulativeMetrics) {
    return entry.cumulativeMetrics;
  }

  if (entry.periodType === "cumulative" || entry.id === "day-001") {
    return entry.periodMetrics;
  }

  return undefined;
};

export const getCumulativePerformanceSeries = () =>
  ledgerEntries
    .filter(isPublic)
    .map((entry) => {
      const metrics = getEffectiveCumulativeMetrics(entry);

      if (!metrics) {
        return undefined;
      }

      return toCumulativePoint(entry, metrics);
    })
    .filter((point): point is CumulativePerformancePoint => Boolean(point))
    .toSorted((first, second) => first.date.localeCompare(second.date));

export const getDailyCumulativePerformanceSeries = () =>
  dailyLedgerEntries
    .filter(isPublic)
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
    .filter(isPublic)
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
