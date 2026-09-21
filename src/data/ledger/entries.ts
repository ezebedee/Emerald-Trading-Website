import { ledgerEntrySchema, type LedgerEntry } from "@/domain";
import { ledgerAssets } from "@/data/assets";

import { LEDGER_STARTING_BALANCE, publicLedgerAccount } from "./account";

const knownLedgerAssetIds = new Set(
  [
    ...ledgerAssets.daily,
    ...ledgerAssets.weekly,
    ...ledgerAssets.cumulative,
  ].map((asset) => asset.id),
);

const sharedLedgerFields = {
  accountClassification: "public-demo-reference",
  performanceClassification: "forward-performance",
  visibility: "public",
  currency: "USD",
  marketCategories: ["metals"],
  account: publicLedgerAccount,
  instruments: ["XAUUSD"],
  platform: "MT4",
  notes:
    "Emerald Legacy Systems public demo/reference account record. Metrics are entered only where supported by the supplied public record.",
} as const;

const rawLedgerEntries = [
  {
    id: "day-001",
    slug: "day-001",
    title: "Emerald Ledger - Day 001",
    kind: "daily-entry",
    periodType: "daily",
    startDate: "2026-08-17",
    endDate: "2026-08-17",
    ...sharedLedgerFields,
    periodMetrics: {
      netProfit: 11409.6,
      grossProfit: 30322.61,
      grossLoss: 18913.01,
      returnPct: 1.14096,
      startingBalance: LEDGER_STARTING_BALANCE,
      endingBalance: 1011409.6,
      equity: 1011409.6,
      totalTrades: 86,
      winningTrades: 61,
      losingTrades: 25,
      winRatePct: 70.93,
      profitFactor: 1.6,
      maxDrawdownPct: 1.06,
      floatingPnl: 0,
    },
    thumbnailAssetId: "ledger-day-001-2026-08-17-thumbnail",
    mediaAssetIds: ["ledger-day-001-2026-08-17-thumbnail"],
  },
  {
    id: "day-002",
    slug: "day-002",
    title: "Emerald Ledger - Day 002",
    kind: "daily-entry",
    periodType: "daily",
    startDate: "2026-08-18",
    endDate: "2026-08-18",
    ...sharedLedgerFields,
    periodMetrics: {
      netProfit: 20386.88,
      grossProfit: 41418.73,
      grossLoss: 21031.85,
      returnPct: 2.0157,
      startingBalance: 1011409.6,
      endingBalance: 1031796.48,
      equity: 1031796.48,
      totalTrades: 41,
      winningTrades: 27,
      losingTrades: 14,
      winRatePct: 65.85,
      profitFactor: 1.97,
      floatingPnl: 0,
    },
    cumulativeMetrics: {
      netProfit: 31796.48,
      returnPct: 3.179648,
      startingBalance: LEDGER_STARTING_BALANCE,
      endingBalance: 1031796.48,
      equity: 1031796.48,
      totalTrades: 127,
      winningTrades: 88,
      losingTrades: 39,
      winRatePct: 69.29,
    },
    thumbnailAssetId: "ledger-day-002-2026-08-18-thumbnail",
    mediaAssetIds: ["ledger-day-002-2026-08-18-thumbnail"],
  },
  {
    id: "day-003",
    slug: "day-003",
    title: "Emerald Ledger - Day 003",
    kind: "daily-entry",
    periodType: "daily",
    startDate: "2026-08-19",
    endDate: "2026-08-19",
    ...sharedLedgerFields,
    periodMetrics: {
      netProfit: 24093.06,
      returnPct: 2.33536,
      startingBalance: 1031796.48,
      endingBalance: 1055889.54,
      equity: 1055889.54,
      totalTrades: 39,
      winningTrades: 24,
      losingTrades: 15,
      winRatePct: 61.54,
      floatingPnl: 0,
    },
    cumulativeMetrics: {
      netProfit: 55889.54,
      returnPct: 5.588954,
      startingBalance: LEDGER_STARTING_BALANCE,
      endingBalance: 1055889.54,
      equity: 1055889.54,
      totalTrades: 166,
      winningTrades: 112,
      losingTrades: 54,
      winRatePct: 67.47,
    },
    thumbnailAssetId: "ledger-day-003-2026-08-19-thumbnail",
    mediaAssetIds: ["ledger-day-003-2026-08-19-thumbnail"],
  },
  {
    id: "week-01",
    slug: "week-01",
    title: "Emerald Ledger - Week 01",
    kind: "weekly-summary",
    periodType: "weekly",
    startDate: "2026-08-17",
    endDate: "2026-08-21",
    ...sharedLedgerFields,
    periodMetrics: {
      netProfit: 157604.63,
      returnPct: 15.760463,
      startingBalance: LEDGER_STARTING_BALANCE,
      endingBalance: 1157604.63,
      equity: 1157604.63,
      totalTrades: 281,
      winningTrades: 198,
      losingTrades: 83,
      winRatePct: 70.46,
      maxDrawdownPct: 10.67,
      floatingPnl: 0,
    },
    cumulativeMetrics: {
      netProfit: 157604.63,
      returnPct: 15.760463,
      startingBalance: LEDGER_STARTING_BALANCE,
      endingBalance: 1157604.63,
      equity: 1157604.63,
      totalTrades: 281,
      winningTrades: 198,
      losingTrades: 83,
      winRatePct: 70.46,
      maxDrawdownPct: 10.67,
      floatingPnl: 0,
    },
    thumbnailAssetId: "ledger-week-01-2026-08-17-2026-08-21-thumbnail",
    mediaAssetIds: ["ledger-week-01-2026-08-17-2026-08-21-thumbnail"],
  },
  {
    id: "week-02",
    slug: "week-02",
    title: "Emerald Ledger - Week 02",
    kind: "weekly-summary",
    periodType: "weekly",
    startDate: "2026-08-24",
    endDate: "2026-08-28",
    ...sharedLedgerFields,
    periodMetrics: {
      netProfit: 47361.91,
      grossProfit: 476425.37,
      grossLoss: 429063.46,
      returnPct: 4.09135,
      startingBalance: 1157604.63,
      endingBalance: 1204966.54,
      equity: 1204966.54,
      totalTrades: 218,
      winningTrades: 148,
      losingTrades: 70,
      winRatePct: 67.89,
      profitFactor: 1.11,
      maxDrawdownPct: 10.67,
      floatingPnl: 0,
    },
    cumulativeMetrics: {
      netProfit: 204966.54,
      returnPct: 20.496654,
      startingBalance: LEDGER_STARTING_BALANCE,
      endingBalance: 1204966.54,
      equity: 1204966.54,
      totalTrades: 499,
      winningTrades: 346,
      losingTrades: 153,
      winRatePct: 69.34,
      maxDrawdownPct: 10.67,
      floatingPnl: 0,
    },
  },
  {
    id: "cumulative-2-weeks",
    slug: "cumulative-2-weeks",
    title: "Emerald Ledger - First Two Weeks",
    kind: "cumulative-summary",
    periodType: "cumulative",
    startDate: "2026-08-17",
    endDate: "2026-08-28",
    ...sharedLedgerFields,
    periodMetrics: {
      netProfit: 204966.54,
      returnPct: 20.496654,
      startingBalance: LEDGER_STARTING_BALANCE,
      endingBalance: 1204966.54,
      equity: 1204966.54,
      totalTrades: 499,
      winningTrades: 346,
      losingTrades: 153,
      winRatePct: 69.34,
      maxDrawdownPct: 10.67,
      floatingPnl: 0,
    },
    thumbnailAssetId:
      "ledger-cumulative-2-weeks-2026-08-17-2026-08-28-thumbnail",
    mediaAssetIds: [
      "ledger-cumulative-2-weeks-2026-08-17-2026-08-28-thumbnail",
    ],
  },
] as const;

const parsedLedgerEntries = ledgerEntrySchema.array().parse(rawLedgerEntries);

for (const entry of parsedLedgerEntries) {
  const assetIds = [
    entry.thumbnailAssetId,
    entry.statementAssetId,
    entry.platformAssetId,
    ...(entry.mediaAssetIds ?? []),
  ].filter((assetId): assetId is string => Boolean(assetId));

  for (const assetId of assetIds) {
    if (!knownLedgerAssetIds.has(assetId)) {
      throw new Error(
        `Ledger entry ${entry.id} references unknown asset ${assetId}.`,
      );
    }
  }
}

export const ledgerEntries = parsedLedgerEntries as readonly LedgerEntry[];

export const dailyLedgerEntries = ledgerEntries.filter(
  (entry) => entry.kind === "daily-entry",
);

export const weeklyLedgerEntries = ledgerEntries.filter(
  (entry) => entry.kind === "weekly-summary",
);

export const cumulativeLedgerEntries = ledgerEntries.filter(
  (entry) => entry.kind === "cumulative-summary",
);
