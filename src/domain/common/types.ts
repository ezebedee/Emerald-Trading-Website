export const CURRENCIES = ["USD"] as const;
export type Currency = (typeof CURRENCIES)[number];

// Runtime money values are plain JSON numbers. Values are USD unless a record
// explicitly carries another supported currency.
export type MoneyValue = number;

// Percentages are stored in human percent units: 20.5 means 20.50%, not 0.205.
export type PercentageValue = number;

export type ISODateString = string;
export type ISODateTimeString = string;
export type ReadableId = string;
export type Slug = string;

export const ACCOUNT_CLASSIFICATIONS = [
  "public-demo-reference",
  "private-live",
  "backtest",
  "simulation",
] as const;
export type AccountClassification = (typeof ACCOUNT_CLASSIFICATIONS)[number];

export const PERFORMANCE_CLASSIFICATIONS = [
  "forward-performance",
  "backtest",
  "simulation",
  "private-live-performance",
] as const;
export type PerformanceClassification =
  (typeof PERFORMANCE_CLASSIFICATIONS)[number];

export const VISIBILITIES = ["public", "private", "internal"] as const;
export type Visibility = (typeof VISIBILITIES)[number];

export const TRADING_PLATFORMS = [
  "MT4",
  "MT5",
  "TradingView",
  "Other",
] as const;
export type TradingPlatform = (typeof TRADING_PLATFORMS)[number];

export const MARKET_CATEGORIES = [
  "forex",
  "metals",
  "indices",
  "equities",
  "options",
  "futures",
  "cfds",
  "crypto",
  "other",
] as const;
export type MarketCategory = (typeof MARKET_CATEGORIES)[number];

export const CONTENT_STATUSES = ["draft", "published", "archived"] as const;
export type ContentStatus = (typeof CONTENT_STATUSES)[number];

export const SYSTEM_LIFECYCLE_STATUSES = [
  "research",
  "testing",
  "public-forward-test",
  "private-production",
  "retired",
] as const;
export type SystemLifecycleStatus = (typeof SYSTEM_LIFECYCLE_STATUSES)[number];

export const RUNTIME_STATUSES = [
  "online",
  "offline",
  "paused",
  "maintenance",
  "unknown",
] as const;
export type RuntimeStatus = (typeof RUNTIME_STATUSES)[number];

export type InstrumentSymbol = string;
export type AssetReferenceId = string;
export type VideoReferenceId = string;

export type AccountReference = Readonly<{
  accountClassification: AccountClassification;
  brokerName?: string;
  serverName?: string;
  publicAccountNumber?: string;
  currency?: Currency;
  platform?: TradingPlatform;
  notes?: string;
}>;
