import {
  brandAssets,
  documentAssets,
  ledgerAssets,
  siteAssets,
  videoAssets,
} from "@/data/assets";
import type {
  BaseAsset,
  BrandAsset,
  DocumentAsset,
  ImageAsset,
  LedgerMediaAsset,
  VideoReference,
} from "@/types/assets";

export type ResolvedAsset =
  | BaseAsset
  | BrandAsset
  | DocumentAsset
  | ImageAsset
  | LedgerMediaAsset
  | VideoReference;

const allAssets = [
  brandAssets.signatureMark,
  brandAssets.horizontalLogo,
  ...brandAssets.logos,
  ...brandAssets.marks,
  ...brandAssets.favicon,
  ...ledgerAssets.daily,
  ...ledgerAssets.weekly,
  ...ledgerAssets.cumulative,
  ...siteAssets.systems,
  ...siteAssets.indicators,
  ...siteAssets.signals,
  ...siteAssets.technology,
  ...siteAssets.research,
  ...siteAssets.verification,
  ...siteAssets.general,
  ...siteAssets.socialOg,
  ...siteAssets.socialThumbnails,
  ...documentAssets.ledger,
  ...documentAssets.verification,
  ...documentAssets.research,
  ...videoAssets.youtube,
  ...videoAssets.posters,
] as const satisfies readonly ResolvedAsset[];

const assetById = new Map(allAssets.map((asset) => [asset.id, asset]));

export const getAllAssets = () => allAssets;

export const getAssetById = (id: string) => assetById.get(id);

export const requireAssetById = (id: string) => {
  const asset = getAssetById(id);

  if (!asset) {
    throw new Error(`Unknown asset "${id}".`);
  }

  return asset;
};
