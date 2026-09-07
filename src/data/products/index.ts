import { ledgerEntries } from "@/data/ledger";
import { ledgerAssets, siteAssets } from "@/data/assets";
import { indicators } from "./indicators";
import { platformDefinitions } from "./platforms";
import { productPlatformImplementations } from "./platform-implementations";
import { productRelationships, tradingProductCatalog } from "./product-catalog";
import { signalModules } from "./signal-modules";
import { signalProducts } from "./signals";
import { systemFamilies } from "./system-families";
import { tradingSystems } from "./systems";

export * from "./indicators";
export * from "./platform-implementations";
export * from "./platforms";
export * from "./product-catalog";
export * from "./signal-modules";
export * from "./signals";
export * from "./system-families";
export * from "./systems";

const idsFrom = (records: readonly { id: string }[]) =>
  records.map((record) => record.id);

const assetIds = new Set([
  ...idsFrom(ledgerAssets.daily),
  ...idsFrom(ledgerAssets.weekly),
  ...idsFrom(ledgerAssets.cumulative),
  ...idsFrom(siteAssets.systems),
  ...idsFrom(siteAssets.indicators),
  ...idsFrom(siteAssets.signals),
  ...idsFrom(siteAssets.technology),
  ...idsFrom(siteAssets.research),
  ...idsFrom(siteAssets.verification),
  ...idsFrom(siteAssets.general),
  ...idsFrom(siteAssets.socialOg),
  ...idsFrom(siteAssets.socialThumbnails),
]);

const systemIds = new Set(tradingSystems.map((system) => system.id));
const systemFamilyIds = new Set(systemFamilies.map((family) => family.id));
const indicatorIds = new Set(indicators.map((indicator) => indicator.id));
const platformIds = new Set(platformDefinitions.map((platform) => platform.id));
const productIds = new Set(tradingProductCatalog.map((product) => product.id));
const signalModuleIds = new Set(signalModules.map((module) => module.id));
const signalProductIds = new Set(signalProducts.map((signal) => signal.id));
const performanceRecordIds = new Set(ledgerEntries.map((entry) => entry.id));

const assertKnownIds = (
  owner: string,
  relationship: string,
  ids: readonly string[] | undefined,
  knownIds: ReadonlySet<string>,
) => {
  for (const id of ids ?? []) {
    if (!knownIds.has(id)) {
      throw new Error(`${owner} references unknown ${relationship} "${id}".`);
    }
  }
};

for (const system of tradingSystems) {
  assertKnownIds(
    system.id,
    "system family",
    [system.familyId],
    systemFamilyIds,
  );
  assertKnownIds(system.id, "asset", system.assetIds, assetIds);
  assertKnownIds(
    system.id,
    "asset",
    system.featuredAssetId ? [system.featuredAssetId] : undefined,
    assetIds,
  );
  assertKnownIds(
    system.id,
    "indicator",
    system.relatedIndicatorIds,
    indicatorIds,
  );
  assertKnownIds(
    system.id,
    "signal",
    system.relatedSignalIds,
    signalProductIds,
  );
  assertKnownIds(
    system.id,
    "performance record",
    system.performanceRecordIds,
    performanceRecordIds,
  );
}

for (const family of systemFamilies) {
  assertKnownIds(
    family.id,
    "system configuration",
    family.configurationIds,
    systemIds,
  );

  for (const configurationId of family.configurationIds) {
    const configuration = tradingSystems.find(
      (system) => system.id === configurationId,
    );

    if (configuration?.familyId !== family.id) {
      throw new Error(
        `${family.id} references configuration "${configurationId}" without a matching familyId back-reference.`,
      );
    }
  }
}

for (const indicator of indicators) {
  assertKnownIds(indicator.id, "asset", indicator.assetIds, assetIds);
  assertKnownIds(
    indicator.id,
    "asset",
    indicator.featuredAssetId ? [indicator.featuredAssetId] : undefined,
    assetIds,
  );
  assertKnownIds(indicator.id, "system", indicator.relatedSystemIds, systemIds);
  assertKnownIds(
    indicator.id,
    "signal",
    indicator.relatedSignalIds,
    signalProductIds,
  );
}

for (const signalProduct of signalProducts) {
  assertKnownIds(signalProduct.id, "asset", signalProduct.assetIds, assetIds);
  assertKnownIds(
    signalProduct.id,
    "asset",
    signalProduct.featuredAssetId ? [signalProduct.featuredAssetId] : undefined,
    assetIds,
  );
  assertKnownIds(
    signalProduct.id,
    "system",
    signalProduct.relatedSystemIds,
    systemIds,
  );
  assertKnownIds(
    signalProduct.id,
    "indicator",
    signalProduct.relatedIndicatorIds,
    indicatorIds,
  );
  assertKnownIds(
    signalProduct.id,
    "signal module",
    signalProduct.signalModuleIds,
    signalModuleIds,
  );
}

for (const product of tradingProductCatalog) {
  assertKnownIds(
    product.id,
    "platform",
    product.supportedPlatformIds,
    platformIds,
  );
  assertKnownIds(product.id, "asset", product.assetIds, assetIds);
  assertKnownIds(
    product.id,
    "signal module",
    product.signalModuleIds,
    signalModuleIds,
  );
  assertKnownIds(
    product.id,
    "related product",
    product.relatedProductIds,
    productIds,
  );
}

for (const relationship of productRelationships) {
  assertKnownIds(
    relationship.id,
    "source product",
    [relationship.sourceProductId],
    productIds,
  );
  assertKnownIds(
    relationship.id,
    "target product",
    [relationship.targetProductId],
    productIds,
  );
}

for (const signalModule of signalModules) {
  assertKnownIds(
    signalModule.id,
    "generated-by product",
    [signalModule.generatedByProductId],
    productIds,
  );
  assertKnownIds(
    signalModule.id,
    "consuming product",
    signalModule.consumedByProductIds,
    productIds,
  );
  assertKnownIds(
    signalModule.id,
    "related signal module",
    signalModule.relatedSignalModuleIds,
    signalModuleIds,
  );
}

for (const implementation of productPlatformImplementations) {
  assertKnownIds(
    implementation.id,
    "product",
    [implementation.productId],
    productIds,
  );
  assertKnownIds(
    implementation.id,
    "platform",
    [implementation.platformId],
    platformIds,
  );
}
