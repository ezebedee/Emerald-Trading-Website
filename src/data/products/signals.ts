import { signalProductSchema, type SignalProduct } from "@/domain";

const rawSignalProducts = [
  {
    id: "emerald-directional-signal-stream",
    slug: "emerald-directional-signal-stream",
    name: "Emerald Directional Signal Stream",
    description:
      "Structured directional trading signals derived from Emerald Legacy Systems indicator and strategy logic for supported markets and platforms.",
    contentStatus: "published",
    visibility: "public",
    signalCategory: "directional",
    deliveryMethods: ["chart"],
    platforms: ["MT4"],
    marketCategories: ["metals"],
    instruments: ["XAUUSD"],
    capabilities: [
      "directional trade signals",
      "instrument-specific signal output",
      "platform-based visualization",
    ],
    featuredAssetId: "indicator-emerald-signal-mt4-01",
    assetIds: ["indicator-emerald-signal-mt4-01"],
    relatedSystemIds: ["emerald-quant-system"],
    relatedIndicatorIds: ["emerald-signal-indicator"],
    tags: ["signals", "directional", "xauusd"],
    notes:
      "Public signal-stream catalog record. This does not define individual trade-signal events or guarantee signal outcomes.",
  },
] as const;

export const signalProducts = signalProductSchema
  .array()
  .parse(rawSignalProducts) as readonly SignalProduct[];

export const emeraldDirectionalSignalStream = signalProducts[0];
