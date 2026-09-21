import {
  productPlatformImplementationSchema,
  type ProductPlatformImplementation,
} from "@/domain/products";

const productAccessModels = {
  "emerald-legacy-system": "public-subscription",
  "emerald-signal-scanner": "public-subscription",
  "emerald-recovery-expert": "public-subscription",
  "emerald-quant-system-product": "private-investor",
} as const;

const platformIds = ["mt4", "mt5", "tradingview", "ninjatrader"] as const;

const highResolutionCapabilityForPlatform = (platformId: string) =>
  platformId === "mt4" || platformId === "mt5"
    ? (["custom-high-resolution-chart-builder"] as const)
    : (["native-high-resolution-chart-workflow"] as const);

const productCapabilityIds = (
  productId: keyof typeof productAccessModels,
  platformId: (typeof platformIds)[number],
) => {
  if (productId === "emerald-legacy-system") {
    return [
      "standard-platform-implementation",
      ...highResolutionCapabilityForPlatform(platformId),
    ] as const;
  }

  if (productId === "emerald-signal-scanner") {
    return [
      "standard-platform-implementation",
      "scanner-finescalp-high-resolution-support",
      ...highResolutionCapabilityForPlatform(platformId),
    ] as const;
  }

  if (productId === "emerald-recovery-expert") {
    return [
      "standard-platform-implementation",
      "trader-first-entry-recovery-workflow",
    ] as const;
  }

  return ["standard-platform-implementation"] as const;
};

const implementationNotesForProduct = (
  productId: keyof typeof productAccessModels,
  platformId: (typeof platformIds)[number],
) => {
  const isMetaTrader = platformId === "mt4" || platformId === "mt5";

  if (productId === "emerald-legacy-system") {
    return isMetaTrader
      ? "Emerald Legacy System implementation can support FineScalp custom high-resolution tick and seconds chart workflows on MetaTrader."
      : "Emerald Legacy System implementation can use native FineScalp high-resolution chart capability where available; no MetaTrader offline/custom-chart mechanics are implied.";
  }

  if (productId === "emerald-signal-scanner") {
    return isMetaTrader
      ? "Emerald Signal Scanner implementation can participate in and monitor FineScalp custom high-resolution workflows on MetaTrader."
      : "Emerald Signal Scanner implementation can support native FineScalp high-resolution workflows where available.";
  }

  if (productId === "emerald-recovery-expert") {
    return "Emerald Recovery Expert implementation follows a trader-first-entry, semi-automated trade-management workflow for subsequent recovery actions.";
  }

  return "Emerald Quant System product-level platform availability is modeled separately from the current public Metals / XAUUSD MT4 performance configuration.";
};

const rawPlatformImplementations = Object.entries(productAccessModels).flatMap(
  ([productId, accessModel]) =>
    platformIds.map((platformId) => ({
      id: `${productId}-${platformId}`,
      productId,
      platformId,
      availability: "available",
      accessModel,
      capabilityIds: productCapabilityIds(
        productId as keyof typeof productAccessModels,
        platformId,
      ),
      documentationStatus: "planned",
      implementationNotes: implementationNotesForProduct(
        productId as keyof typeof productAccessModels,
        platformId,
      ),
    })),
);

export const productPlatformImplementations =
  productPlatformImplementationSchema
    .array()
    .parse(
      rawPlatformImplementations,
    ) as readonly ProductPlatformImplementation[];
