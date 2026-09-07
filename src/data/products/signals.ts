import { signalProductSchema, type SignalProduct } from "@/domain";

const rawSignalProducts = [
  {
    id: "emerald-directional-signal-stream",
    slug: "emerald-directional-signal-stream",
    name: "Emerald Signal Framework",
    shortName: "Signal Framework",
    description:
      "Umbrella signal framework generated within Emerald Legacy System and organized into primary and auxiliary signal modules.",
    contentStatus: "published",
    visibility: "public",
    signalCategory: "multi-signal",
    deliveryMethods: ["chart", "dashboard"],
    platforms: ["MT4", "MT5", "TradingView", "NinjaTrader"],
    instrumentScope: "multi-instrument",
    signalModuleIds: [
      "emerald-main-signal",
      "emerald-finescalp",
      "emerald-scalp-signal",
      "emerald-range-signal",
      "emerald-harmonizer",
      "emerald-harmonizer-safe",
    ],
    capabilities: [
      "trend-oriented signal output",
      "high-resolution tick / seconds chart signal output",
      "scalping-oriented signal output",
      "range-oriented signal output",
      "signal-synthesis output",
      "auxiliary defensive-helper signal output",
      "platform-based visualization",
    ],
    featuredAssetId: "indicator-emerald-signal-mt4-01",
    assetIds: ["indicator-emerald-signal-mt4-01"],
    relatedSystemIds: ["emerald-quant-system"],
    relatedIndicatorIds: ["emerald-signal-indicator"],
    tags: ["signals", "multi-signal", "multi-instrument"],
    notes:
      "Stable legacy ID preserved and reframed as the umbrella signal framework. This does not define individual trade-signal events, guarantee signal outcomes, or attach Ledger performance to signal modules.",
  },
] as const;

export const signalProducts = signalProductSchema
  .array()
  .parse(rawSignalProducts) as readonly SignalProduct[];

export const emeraldDirectionalSignalStream = signalProducts[0];
