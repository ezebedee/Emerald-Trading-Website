import type { MoneyValue, PercentageValue, ReadableId } from "@/domain";
import type {
  PlatformDefinition,
  ProductPlatformImplementation,
  ProductRelationship,
  SignalModule,
  SignalProduct,
  TradingProductDefinition,
} from "@/domain";
import type { ImageAsset } from "@/types/assets";

export type LedgerPublicRecordOverview = Readonly<{
  accountClassification?: string;
  performanceClassification?: string;
  coverageLabel?: string;
  scopeLabel?: string;
  availablePeriodTypes: readonly string[];
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

export type LedgerConfigurationContext = Readonly<{
  familyId: ReadableId;
  familyName: string;
  configurationId: ReadableId;
  configurationName: string;
  markets: readonly string[];
  instruments: readonly string[];
  platforms: readonly string[];
  lifecycleStatus: string;
  publicRecordCount: number;
}>;

export type LedgerConfigurationOption = Readonly<{
  marketCategory: string;
  label: string;
  available: boolean;
  isSelected: boolean;
  configurationId?: ReadableId;
  configurationName?: string;
  href?: string;
}>;

export type LedgerPageContext = Readonly<{
  selectedConfiguration?: LedgerConfigurationContext;
  configurationOptions: readonly LedgerConfigurationOption[];
  overview: LedgerPublicRecordOverview;
  latestCumulative?: LedgerLatestPerformanceSnapshot;
  summary?: PerformanceSummary;
  progression: readonly CumulativePerformancePoint[];
  chronology: readonly LedgerChronologyEntry[];
  verification: readonly LedgerVerificationEvidenceRecord[];
  media: readonly LedgerMediaContextRecord[];
}>;

export type SystemsPageRelatedProduct = Readonly<{
  id: ReadableId;
  name: string;
  role: string;
  href: string;
}>;

export type SystemsPageCapability = Readonly<{
  id: string;
  label: string;
  description: string;
  category: string;
}>;

export type SystemsPageSystemFamily = Readonly<{
  id: ReadableId;
  name: string;
  marketCoverage: readonly string[];
}>;

export type SystemsPagePrimarySystem = Readonly<{
  id: ReadableId;
  family: SystemsPageSystemFamily;
  configurationKey: string;
  configurationName: string;
  name: string;
  shortName?: string;
  systemType: string;
  status: string;
  platforms: readonly string[];
  markets: readonly string[];
  instruments: readonly string[];
  capabilities: readonly SystemsPageCapability[];
  relatedIndicator?: SystemsPageRelatedProduct;
  relatedSignal?: SystemsPageRelatedProduct;
  publicRecordLabel: string;
}>;

export type SystemsPagePerformanceMetric = Readonly<{
  label: string;
  value?: number;
  kind: "currency" | "percentage" | "count";
}>;

export type SystemsPagePerformanceContext = Readonly<{
  systemId: ReadableId;
  familyId: ReadableId;
  familyName: string;
  familyMarketCoverage: readonly string[];
  configurationName: string;
  configurationMarkets: readonly string[];
  configurationInstruments: readonly string[];
  platforms: readonly string[];
  lifecycleStatus: string;
  performanceClassification: string;
  latestCumulativeRecord?: Readonly<{
    id: ReadableId;
    title: string;
    coverageLabel: string;
    metrics: readonly SystemsPagePerformanceMetric[];
  }>;
  publicRecordCount: number;
}>;

export type SystemsPageConfigurationOption = Readonly<{
  marketCategory: string;
  label: string;
  available: boolean;
  isSelected: boolean;
  configurationId?: ReadableId;
  configurationName?: string;
  href?: string;
}>;

export type SystemsCatalogProduct = Readonly<{
  id: ReadableId;
  name: string;
  shortName?: string;
  description: string;
  role: string;
  layer: string;
  accessModel: string;
  platforms: readonly PlatformDefinition[];
  capabilityIntents: readonly string[];
  href: string;
  cta: string;
  asset?: ImageAsset;
  assetCaption?: string;
  isTemporaryAsset?: boolean;
  evidenceNote?: string;
}>;

export type SystemsCatalogLayer = Readonly<{
  label: string;
  productName: string;
  description: string;
}>;

export type SystemsCatalogWorkflow = Readonly<{
  label: string;
  productName: string;
  description: string;
}>;

export type SystemsCatalogPageContext = Readonly<{
  products: readonly SystemsCatalogProduct[];
  platforms: readonly PlatformDefinition[];
  productImplementations: readonly ProductPlatformImplementation[];
  layers: readonly SystemsCatalogLayer[];
  workflows: readonly SystemsCatalogWorkflow[];
}>;

export type HomepageRelatedProduct = Readonly<{
  id: ReadableId;
  name: string;
  role: string;
  href: string;
}>;

export type HomepageFeaturedSystemContext = Readonly<{
  family: Readonly<{
    id: ReadableId;
    name: string;
    marketCoverage: readonly string[];
  }>;
  configuration: Readonly<{
    id: ReadableId;
    configurationKey: string;
    configurationName: string;
    name: string;
    shortName?: string;
    systemType: string;
    status: string;
    platforms: readonly string[];
    markets: readonly string[];
    instruments: readonly string[];
    capabilities: readonly string[];
  }>;
  relatedIndicator?: HomepageRelatedProduct;
  relatedSignal?: HomepageRelatedProduct;
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

export type IndicatorsPageContext = Readonly<{
  product?: TradingProductDefinition;
  heroAsset?: ImageAsset;
  assets: Readonly<{
    settings?: ImageAsset;
    overview?: ImageAsset;
    mainSignal?: ImageAsset;
    fineScalp?: ImageAsset;
    scalp?: ImageAsset;
    range?: ImageAsset;
    harmonizer?: ImageAsset;
    harmonizerSafe?: ImageAsset;
  }>;
  primarySignalModules: readonly SignalModule[];
  auxiliarySignalModules: readonly SignalModule[];
  platforms: readonly PlatformDefinition[];
  relatedProducts: readonly TradingProductDefinition[];
  relationships: readonly ProductRelationship[];
}>;

export type SignalsPageAssetMap = Readonly<{
  main?: ImageAsset;
  fineScalp?: ImageAsset;
  scalp?: ImageAsset;
  range?: ImageAsset;
  harmonizer?: ImageAsset;
  harmonizerSafe?: ImageAsset;
}>;

export type SignalsPageContext = Readonly<{
  signalFramework?: SignalProduct;
  legacySystem?: TradingProductDefinition;
  primarySignalModules: readonly SignalModule[];
  auxiliarySignalModules: readonly SignalModule[];
  platforms: readonly PlatformDefinition[];
  relatedProducts: readonly TradingProductDefinition[];
  assets: SignalsPageAssetMap;
}>;

export type SignalScannerPageAssetMap = Readonly<{
  configuration?: ImageAsset;
  selection?: ImageAsset;
  dashboard?: ImageAsset;
  chartContextAlert?: ImageAsset;
}>;

export type SignalScannerPageContext = Readonly<{
  product?: TradingProductDefinition;
  legacySystem?: TradingProductDefinition;
  platforms: readonly PlatformDefinition[];
  signalModules: readonly SignalModule[];
  relatedProducts: readonly TradingProductDefinition[];
  assets: SignalScannerPageAssetMap;
}>;

export type RecoveryExpertPageContext = Readonly<{
  product?: TradingProductDefinition;
  platforms: readonly PlatformDefinition[];
  relatedProducts: readonly TradingProductDefinition[];
  placeholderAsset?: ImageAsset;
  isTemporaryAsset: boolean;
}>;
