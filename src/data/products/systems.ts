import { tradingSystemSchema, type TradingSystem } from "@/domain";
import { ledgerEntries } from "@/data/ledger";

const ledgerPerformanceRecordIds = ledgerEntries.map((entry) => entry.id);

const rawTradingSystems = [
  {
    id: "emerald-quant-system",
    familyId: "emerald-quant-system-family",
    configurationKey: "metals-xauusd",
    configurationName: "Metals / XAUUSD",
    slug: "emerald-quant-system",
    name: "Emerald Quant System",
    shortName: "Emerald Quant",
    description:
      "Algorithmic trading system developed by Emerald Legacy Systems using proprietary signal-generation, market-analysis, risk-management, and trade-execution logic.",
    contentStatus: "published",
    lifecycleStatus: "public-forward-test",
    runtimeStatus: "unknown",
    visibility: "public",
    platforms: ["MT4"],
    marketCategories: ["metals"],
    instruments: ["XAUUSD"],
    capabilities: [
      "signal interpretation",
      "automated trade execution",
      "risk-management logic",
      "position management",
      "trade lifecycle management",
    ],
    featuredAssetId: "indicator-emerald-signal-mt4-01",
    assetIds: ["indicator-emerald-signal-mt4-01"],
    relatedIndicatorIds: ["emerald-signal-indicator"],
    relatedSignalIds: ["emerald-directional-signal-stream"],
    performanceRecordIds: ledgerPerformanceRecordIds,
    tags: ["quantitative", "algorithmic", "automation", "signals", "xauusd"],
    notes:
      "Public catalog record for the current Emerald public forward-performance system. Performance remains authoritative in Ledger records.",
  },
] as const;

export const tradingSystems = tradingSystemSchema
  .array()
  .parse(rawTradingSystems) as readonly TradingSystem[];

export const emeraldQuantSystem = tradingSystems[0];
