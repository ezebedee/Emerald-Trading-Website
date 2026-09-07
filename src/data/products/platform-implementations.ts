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
      implementationNotes:
        platformId === "mt4" || platformId === "mt5"
          ? "MetaTrader implementation can support Emerald-generated custom high-resolution chart workflows where the product uses FineScalp."
          : "Platform implementation can use native high-resolution chart workflow where available; no MetaTrader offline/custom-chart builder is implied.",
    })),
);

export const productPlatformImplementations =
  productPlatformImplementationSchema
    .array()
    .parse(
      rawPlatformImplementations,
    ) as readonly ProductPlatformImplementation[];
