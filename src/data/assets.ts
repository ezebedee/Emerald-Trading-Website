import type {
  BrandAsset,
  DocumentAsset,
  ImageAsset,
  LedgerMediaAsset,
  VideoReference,
} from "@/types/assets";

export const brandAssets = {
  logos: [] satisfies BrandAsset[],
  marks: [] satisfies BrandAsset[],
  favicon: [] satisfies BrandAsset[],
} as const;

export const ledgerAssets = {
  daily: [] satisfies LedgerMediaAsset[],
  weekly: [] satisfies LedgerMediaAsset[],
  cumulative: [] satisfies LedgerMediaAsset[],
} as const;

export const siteAssets = {
  systems: [] satisfies ImageAsset[],
  indicators: [] satisfies ImageAsset[],
  signals: [] satisfies ImageAsset[],
  technology: [] satisfies ImageAsset[],
  research: [] satisfies ImageAsset[],
  verification: [] satisfies ImageAsset[],
  general: [] satisfies ImageAsset[],
  socialOg: [] satisfies ImageAsset[],
  socialThumbnails: [] satisfies ImageAsset[],
} as const;

export const documentAssets = {
  ledger: [] satisfies DocumentAsset[],
  verification: [] satisfies DocumentAsset[],
  research: [] satisfies DocumentAsset[],
} as const;

export const videoAssets = {
  youtube: [] satisfies VideoReference[],
  posters: [] satisfies ImageAsset[],
} as const;
