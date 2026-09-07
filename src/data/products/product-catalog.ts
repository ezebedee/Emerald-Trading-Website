import {
  productRelationshipSchema,
  tradingProductDefinitionSchema,
  type ProductRelationship,
  type TradingProductDefinition,
} from "@/domain/products";

const allPlatformIds = ["mt4", "mt5", "tradingview", "ninjatrader"] as const;
const signalFrameworkModuleIds = [
  "emerald-main-signal",
  "emerald-finescalp",
  "emerald-scalp-signal",
  "emerald-range-signal",
  "emerald-harmonizer",
  "emerald-harmonizer-safe",
] as const;

const rawTradingProductCatalog = [
  {
    id: "emerald-legacy-system",
    slug: "emerald-legacy-system",
    name: "Emerald Legacy System",
    shortName: "Legacy System",
    description:
      "Unified multi-signal indicator product for public subscription access across supported trading platforms.",
    role: "Unified Multi-Signal Indicator",
    productLayer: "analysis-signal",
    accessModel: "public-subscription",
    visibility: "public",
    contentStatus: "published",
    supportedPlatformIds: allPlatformIds,
    signalModuleIds: signalFrameworkModuleIds,
    relatedProductIds: [
      "emerald-signal-scanner",
      "emerald-recovery-expert",
      "emerald-quant-system-product",
    ],
    specializedRecordIds: [
      "emerald-signal-indicator",
      "emerald-directional-signal-stream",
    ],
    assetIds: ["indicator-emerald-signal-mt4-01"],
    tags: ["indicator", "signals", "public-subscription"],
    notes:
      "The product is distinct from the company name Emerald Legacy Systems. Current Ledger performance is not attributed to this indicator product.",
  },
  {
    id: "emerald-signal-scanner",
    slug: "emerald-signal-scanner",
    name: "Emerald Signal Scanner",
    shortName: "Signal Scanner",
    description:
      "Multi-symbol and multi-signal scanning and monitoring dashboard for public subscription access across supported trading platforms.",
    role: "Multi-symbol / multi-signal scanning and monitoring dashboard",
    productLayer: "monitoring-scanning",
    accessModel: "public-subscription",
    visibility: "public",
    contentStatus: "published",
    supportedPlatformIds: allPlatformIds,
    capabilityIds: [
      "user-defined-symbol-selection",
      "market-watch-symbol-universe",
      "favorite-signals",
      "multi-signal-scanning",
      "dashboard-presentation",
      "session-filtering",
      "directional-filtering",
      "signal-age-context",
      "chart-open-view-workflow",
    ],
    signalModuleIds: signalFrameworkModuleIds,
    relatedProductIds: ["emerald-legacy-system"],
    tags: ["scanner", "signals", "monitoring", "public-subscription"],
    notes:
      "Scanner consumes and monitors Emerald signal framework outputs. Platform UI, settings, and workflow differences will be documented later.",
  },
  {
    id: "emerald-recovery-expert",
    slug: "emerald-recovery-expert",
    name: "Emerald Recovery Expert",
    shortName: "Recovery Expert",
    description:
      "Semi-automated trade-management and recovery expert for public subscription access across supported trading platforms.",
    role: "Semi-automated trade-management / recovery expert",
    productLayer: "assisted-execution",
    accessModel: "public-subscription",
    visibility: "public",
    contentStatus: "published",
    supportedPlatformIds: allPlatformIds,
    capabilityIds: [
      "trader-first-entry",
      "subsequent-recovery-action-management",
      "configured-profit-objective-context",
    ],
    relatedProductIds: ["emerald-legacy-system"],
    tags: ["expert-advisor", "trade-management", "public-subscription"],
    notes:
      "Trader manually initiates the first trade. Subsequent recovery actions are algorithm-managed with no guaranteed recovery or profit claim.",
  },
  {
    id: "emerald-quant-system-product",
    slug: "emerald-quant-system",
    name: "Emerald Quant System",
    shortName: "Quant System",
    description:
      "Fully automated quantitative trading system for private investor access across supported trading platforms.",
    role: "Fully automated quantitative trading system",
    productLayer: "automated-execution",
    accessModel: "private-investor",
    visibility: "public",
    contentStatus: "published",
    supportedPlatformIds: allPlatformIds,
    relatedProductIds: ["emerald-legacy-system"],
    specializedRecordIds: ["emerald-quant-system"],
    tags: ["quant-system", "private-investor", "automated-execution"],
    notes:
      "Product-level platform availability is separate from the current public performance configuration, which remains Metals / XAUUSD on MT4.",
  },
] as const;

const rawProductRelationships = [
  {
    id: "legacy-system-generates-signals",
    sourceProductId: "emerald-legacy-system",
    targetProductId: "emerald-signal-scanner",
    relationshipType: "generates-signals",
    description:
      "Emerald Legacy System generates signal outputs that the Scanner can monitor.",
  },
  {
    id: "scanner-monitors-signal-framework",
    sourceProductId: "emerald-signal-scanner",
    targetProductId: "emerald-legacy-system",
    relationshipType: "monitors-signals",
    description:
      "Emerald Signal Scanner monitors signal modules from the Emerald signal framework.",
  },
  {
    id: "recovery-expert-assisted-execution",
    sourceProductId: "emerald-recovery-expert",
    targetProductId: "emerald-legacy-system",
    relationshipType: "assisted-execution",
    description:
      "Emerald Recovery Expert is an assisted execution layer that may use signal context without making signals automatic trades.",
  },
  {
    id: "quant-system-automated-execution",
    sourceProductId: "emerald-quant-system-product",
    targetProductId: "emerald-legacy-system",
    relationshipType: "automated-execution",
    description:
      "Emerald Quant System is the private automated execution layer in the product ecosystem.",
  },
] as const;

export const tradingProductCatalog = tradingProductDefinitionSchema
  .array()
  .parse(rawTradingProductCatalog) as readonly TradingProductDefinition[];

export const productRelationships = productRelationshipSchema
  .array()
  .parse(rawProductRelationships) as readonly ProductRelationship[];
