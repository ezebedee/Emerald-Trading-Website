import type {
  BrandAsset,
  DocumentAsset,
  ImageAsset,
  LedgerMediaAsset,
  VideoReference,
} from "@/types/assets";

export const brandAssets = {
  signatureMark: {
    id: "brand-elq-signature-mark",
    kind: "brand",
    src: "/brand/marks/emerald-elq-mark-signature.png",
    alt: "Emerald Legacy Systems",
    format: "png",
    width: 1254,
    height: 1254,
    description:
      "Official ELQ Emerald Legacy Systems signature mark with Quantitative Trading Technology descriptor.",
    provenance: {
      source: "Emerald Legacy Systems",
    },
  } satisfies BrandAsset,
  horizontalLogo: {
    id: "brand-emerald-legacy-systems-horizontal",
    kind: "brand",
    src: "/brand/logos/emerald-legacy-systems-horizontal.png",
    alt: "Emerald Legacy Systems — Quantitative Trading Technology",
    format: "png",
    width: 1672,
    height: 941,
    description:
      "Official Emerald Legacy Systems horizontal banner for future brand showcase and media contexts.",
    provenance: {
      source: "Emerald Legacy Systems",
    },
  } satisfies BrandAsset,
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
