import type { MoneyValue, PercentageValue, ReadableId } from "@/domain";

export type PerformanceSummary = Readonly<{
  recordId: ReadableId;
  startDate: string;
  endDate: string;
  netProfit: MoneyValue;
  returnPct: PercentageValue;
  endingBalance: MoneyValue;
  equity: MoneyValue;
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  winRatePct: PercentageValue;
  maxDrawdownPct?: PercentageValue;
}>;

export type CumulativePerformancePoint = Readonly<{
  recordId: ReadableId;
  date: string;
  label: string;
  netProfit: MoneyValue;
  returnPct: PercentageValue;
  endingBalance: MoneyValue;
  equity: MoneyValue;
}>;

export type LedgerConsistencyIssue = Readonly<{
  recordId: ReadableId;
  field: string;
  expected: number | null;
  actual: number | null;
  tolerance: number;
  message: string;
}>;
