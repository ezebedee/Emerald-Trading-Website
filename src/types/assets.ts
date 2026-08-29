export type AssetKind = "image" | "brand" | "document" | "video";

export type AssetFormat =
  "webp" | "avif" | "png" | "jpg" | "jpeg" | "svg" | "pdf";

export type AssetSource = "Emerald Legacy Systems" | "Third Party";

export type AssetProvenance = Readonly<{
  source: AssetSource;
  license?: string;
  notes?: string;
}>;

export type BaseAsset = Readonly<{
  id: string;
  kind: AssetKind;
  description?: string;
  provenance: AssetProvenance;
}>;

export type ImageAsset = BaseAsset &
  Readonly<{
    kind: "image";
    src: string;
    alt: string;
    format: Exclude<AssetFormat, "pdf">;
    width?: number;
    height?: number;
  }>;

export type BrandAsset = BaseAsset &
  Readonly<{
    kind: "brand";
    src: string;
    alt: "Emerald Legacy Systems" | "";
    format: "svg" | "png" | "webp" | "ico";
    width?: number;
    height?: number;
  }>;

export type LedgerMediaType =
  "thumbnail" | "platform" | "statement" | "equity-curve" | "dashboard";

export type LedgerMediaAsset = ImageAsset &
  Readonly<{
    ledgerEntryId: string;
    mediaType: LedgerMediaType;
    dateRange?: Readonly<{
      start: string;
      end: string;
    }>;
  }>;

export type DocumentAsset = BaseAsset &
  Readonly<{
    kind: "document";
    href: string;
    title: string;
    format: "pdf";
  }>;

export type VideoReference = BaseAsset &
  Readonly<{
    kind: "video";
    youtubeId: string;
    title: string;
    thumbnail?: ImageAsset;
    ledgerEntryId?: string;
  }>;
