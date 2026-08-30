import { ledgerAssets, siteAssets } from "@/data/assets";
import { ledgerEntries } from "@/data/ledger";
import { indicators, signalProducts, tradingSystems } from "@/data/products";

import { researchEntries } from "./research";
import { verificationRecords } from "./verification";
import { videoEntries } from "./videos";

export * from "./research";
export * from "./verification";
export * from "./videos";

const idsFrom = (records: readonly { id: string }[]) =>
  records.map((record) => record.id);

const knownAssetIds = new Set([
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

const knownLedgerEntryIds = new Set(ledgerEntries.map((entry) => entry.id));
const knownSystemIds = new Set(tradingSystems.map((system) => system.id));
const knownIndicatorIds = new Set(indicators.map((indicator) => indicator.id));
const knownSignalIds = new Set(signalProducts.map((signal) => signal.id));

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

for (const researchEntry of researchEntries) {
  assertKnownIds(
    researchEntry.id,
    "asset",
    [researchEntry.documentAssetId, researchEntry.thumbnailAssetId].filter(
      (assetId): assetId is string => Boolean(assetId),
    ),
    knownAssetIds,
  );
  assertKnownIds(
    researchEntry.id,
    "system",
    researchEntry.relatedSystemIds,
    knownSystemIds,
  );
  assertKnownIds(
    researchEntry.id,
    "indicator",
    researchEntry.relatedIndicatorIds,
    knownIndicatorIds,
  );
  assertKnownIds(
    researchEntry.id,
    "signal",
    researchEntry.relatedSignalIds,
    knownSignalIds,
  );
}

for (const videoEntry of videoEntries) {
  assertKnownIds(
    videoEntry.id,
    "asset",
    [videoEntry.thumbnailAssetId, videoEntry.posterAssetId].filter(
      (assetId): assetId is string => Boolean(assetId),
    ),
    knownAssetIds,
  );
  assertKnownIds(
    videoEntry.id,
    "ledger entry",
    videoEntry.relatedLedgerEntryIds,
    knownLedgerEntryIds,
  );
  assertKnownIds(
    videoEntry.id,
    "system",
    videoEntry.relatedSystemIds,
    knownSystemIds,
  );
  assertKnownIds(
    videoEntry.id,
    "indicator",
    videoEntry.relatedIndicatorIds,
    knownIndicatorIds,
  );
  assertKnownIds(
    videoEntry.id,
    "signal",
    videoEntry.relatedSignalIds,
    knownSignalIds,
  );
}

for (const verificationRecord of verificationRecords) {
  assertKnownIds(
    verificationRecord.id,
    "asset",
    [
      verificationRecord.primaryAssetId,
      ...(verificationRecord.assetIds ?? []),
    ].filter((assetId): assetId is string => Boolean(assetId)),
    knownAssetIds,
  );
  assertKnownIds(
    verificationRecord.id,
    "ledger entry",
    verificationRecord.relatedLedgerEntryIds,
    knownLedgerEntryIds,
  );
  assertKnownIds(
    verificationRecord.id,
    "system",
    verificationRecord.relatedSystemIds,
    knownSystemIds,
  );
}
