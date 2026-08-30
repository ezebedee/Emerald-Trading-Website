import { ledgerEntries } from "@/data/ledger";
import { ledgerAssets, siteAssets } from "@/data/assets";
import { indicators } from "./indicators";
import { signalProducts } from "./signals";
import { tradingSystems } from "./systems";

export * from "./indicators";
export * from "./signals";
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
const indicatorIds = new Set(indicators.map((indicator) => indicator.id));
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
}
