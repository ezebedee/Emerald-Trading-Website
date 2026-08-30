import type { MoneyValue, PercentageValue, ReadableId } from "@/domain";

export type LedgerPublicRecordOverview = Readonly<{
  accountClassification: string;
  performanceClassification?: string;
  coverageLabel?: string;
  scopeLabel?: string;
  hasPublicRecord: boolean;
}>;

export type LedgerLatestPerformanceSnapshot = Readonly<{
  recordId: ReadableId;
  title: string;
  periodType: string;
  coverageLabel: string;
  accountClassification: string;
  performanceClassification: string;
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

export type LedgerChronologyMetricSnapshot = Readonly<{
  netProfit: MoneyValue;
  returnPct: PercentageValue;
  totalTrades: number;
  winRatePct: PercentageValue;
}>;

export type LedgerChronologyEntry = Readonly<{
  id: ReadableId;
  title: string;
  periodType: string;
  startDate: string;
  endDate: string;
  coverageLabel: string;
  accountClassification: string;
  performanceClassification: string;
  period: LedgerChronologyMetricSnapshot;
  cumulative?: Pick<LedgerChronologyMetricSnapshot, "netProfit" | "returnPct">;
}>;

export type LedgerVerificationEvidenceRecord = Readonly<{
  id: ReadableId;
  title: string;
  method: string;
  status?: string;
  accountClassification?: string;
  description: string;
  relatedLedgerRecordScope?: string;
}>;

export type LedgerMediaContextRecord = Readonly<{
  id: ReadableId;
  title: string;
  videoPlatform: string;
  relatedLedgerEntryId: ReadableId;
  relatedLedgerTitle: string;
  relatedLedgerPeriodType: string;
  relatedLedgerCoverageLabel: string;
  availabilityState: string;
  description: string;
}>;

export type SystemsPageRelatedProduct = Readonly<{
  id: ReadableId;
  name: string;
  role: string;
  href: string;
}>;

export type SystemsPagePrimarySystem = Readonly<{
  id: ReadableId;
  name: string;
  shortName?: string;
  systemType: string;
  status: string;
  platforms: readonly string[];
  markets: readonly string[];
  instruments: readonly string[];
  relatedIndicator?: SystemsPageRelatedProduct;
  relatedSignal?: SystemsPageRelatedProduct;
  publicRecordLabel: string;
}>;

export type LedgerConsistencyIssue = Readonly<{
  recordId: ReadableId;
  field: string;
  expected: number | null;
  actual: number | null;
  tolerance: number;
  message: string;
}>;
