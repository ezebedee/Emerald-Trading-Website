import type {
  AccountClassification,
  AccountReference,
  AssetReferenceId,
  Currency,
  ISODateString,
  ISODateTimeString,
  MarketCategory,
  MoneyValue,
  PercentageValue,
  PerformanceClassification,
  ReadableId,
  Slug,
  Visibility,
} from "../common/types";

export const PERFORMANCE_PERIOD_TYPES = [
  "daily",
  "weekly",
  "monthly",
  "quarterly",
  "annual",
  "cumulative",
  "custom",
] as const;
export type PerformancePeriodType = (typeof PERFORMANCE_PERIOD_TYPES)[number];

export type PerformanceMetrics = Readonly<{
  netProfit: MoneyValue;
  grossProfit: MoneyValue;
  grossLoss: MoneyValue;
  returnPct: PercentageValue;
  startingBalance: MoneyValue;
  endingBalance: MoneyValue;
  equity: MoneyValue;
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  breakevenTrades?: number;
  winRatePct: PercentageValue;
  profitFactor?: number | null;
  maxDrawdownAmount: MoneyValue;
  maxDrawdownPct: PercentageValue;
  expectedPayoff?: MoneyValue;
  largestWinningTrade?: MoneyValue;
  largestLosingTrade?: MoneyValue;
  averageWinningTrade?: MoneyValue;
  averageLosingTrade?: MoneyValue;
  shortTrades?: number;
  longTrades?: number;
  shortWinRatePct?: PercentageValue;
  longWinRatePct?: PercentageValue;
  floatingPnl?: MoneyValue;
  commission?: MoneyValue;
  swap?: MoneyValue;
  fees?: MoneyValue;
}>;

export type PerformanceRecord = Readonly<{
  id: ReadableId;
  slug: Slug;
  title: string;
  periodType: PerformancePeriodType;
  startDate: ISODateString;
  endDate: ISODateString;
  accountClassification: AccountClassification;
  performanceClassification: PerformanceClassification;
  visibility: Visibility;
  currency?: Currency;
  marketCategories?: readonly MarketCategory[];
  account?: AccountReference;
  periodMetrics: PerformanceMetrics;
  cumulativeMetrics?: PerformanceMetrics;
  thumbnailAssetId?: AssetReferenceId;
  statementAssetId?: AssetReferenceId;
  platformAssetId?: AssetReferenceId;
  notes?: string;
  createdAt?: ISODateTimeString;
  updatedAt?: ISODateTimeString;
}>;
