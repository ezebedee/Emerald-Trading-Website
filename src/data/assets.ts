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
  daily: [
    {
      id: "ledger-day-001-2026-08-17-thumbnail",
      kind: "image",
      src: "/images/ledger/daily/ledger-day-001-2026-08-17-thumbnail.png",
      alt: "Emerald Ledger Day 001 public demo reference account thumbnail.",
      format: "png",
      width: 1672,
      height: 941,
      description:
        "Approved public Emerald Ledger thumbnail for Day 001, showing summarized public reference-account results.",
      provenance: {
        source: "Emerald Legacy Systems",
      },
      ledgerEntryId: "day-001",
      mediaType: "thumbnail",
      dateRange: {
        start: "2026-08-17",
        end: "2026-08-17",
      },
    },
    {
      id: "ledger-day-002-2026-08-18-thumbnail",
      kind: "image",
      src: "/images/ledger/daily/ledger-day-002-2026-08-18-thumbnail.png",
      alt: "Emerald Ledger Day 002 public demo record thumbnail.",
      format: "png",
      width: 1672,
      height: 941,
      description:
        "Approved public Emerald Ledger thumbnail for Day 002, showing summarized public demo record results.",
      provenance: {
        source: "Emerald Legacy Systems",
      },
      ledgerEntryId: "day-002",
      mediaType: "thumbnail",
      dateRange: {
        start: "2026-08-18",
        end: "2026-08-18",
      },
    },
    {
      id: "ledger-day-003-2026-08-19-thumbnail",
      kind: "image",
      src: "/images/ledger/daily/ledger-day-003-2026-08-19-thumbnail.png",
      alt: "Emerald Ledger Day 003 public performance record thumbnail.",
      format: "png",
      width: 1672,
      height: 941,
      description:
        "Approved public Emerald Ledger thumbnail for Day 003, showing summarized public performance record results.",
      provenance: {
        source: "Emerald Legacy Systems",
      },
      ledgerEntryId: "day-003",
      mediaType: "thumbnail",
      dateRange: {
        start: "2026-08-19",
        end: "2026-08-19",
      },
    },
  ] satisfies LedgerMediaAsset[],
  weekly: [
    {
      id: "ledger-week-01-2026-08-17-2026-08-21-thumbnail",
      kind: "image",
      src: "/images/ledger/weekly/ledger-week-01-2026-08-17_2026-08-21-thumbnail.png",
      alt: "Emerald Ledger Week 01 public performance thumbnail.",
      format: "png",
      width: 1672,
      height: 941,
      description:
        "Approved public Emerald Ledger thumbnail for Week 01, covering 2026-08-17 through 2026-08-21.",
      provenance: {
        source: "Emerald Legacy Systems",
      },
      ledgerEntryId: "week-01",
      mediaType: "thumbnail",
      dateRange: {
        start: "2026-08-17",
        end: "2026-08-21",
      },
    },
  ] satisfies LedgerMediaAsset[],
  cumulative: [
    {
      id: "ledger-cumulative-2-weeks-2026-08-17-2026-08-28-thumbnail",
      kind: "image",
      src: "/images/ledger/cumulative/ledger-cumulative-2-weeks-2026-08-17_2026-08-28-thumbnail.png",
      alt: "Emerald Ledger two-week cumulative public performance thumbnail.",
      format: "png",
      width: 1672,
      height: 941,
      description:
        "Approved public Emerald Ledger cumulative thumbnail covering 2026-08-17 through 2026-08-28.",
      provenance: {
        source: "Emerald Legacy Systems",
      },
      ledgerEntryId: "cumulative-2-weeks",
      mediaType: "thumbnail",
      dateRange: {
        start: "2026-08-17",
        end: "2026-08-28",
      },
    },
  ] satisfies LedgerMediaAsset[],
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
