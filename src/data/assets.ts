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
    alt: "Emerald Legacy Systems - Quantitative Trading Technology",
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
      src: "/images/ledger/daily/ledger-day-001-2026-08-17-thumbnail.webp",
      alt: "Emerald Ledger Day 001 public demo reference account thumbnail.",
      format: "webp",
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
      src: "/images/ledger/daily/ledger-day-002-2026-08-18-thumbnail.webp",
      alt: "Emerald Ledger Day 002 public demo record thumbnail.",
      format: "webp",
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
      src: "/images/ledger/daily/ledger-day-003-2026-08-19-thumbnail.webp",
      alt: "Emerald Ledger Day 003 public performance record thumbnail.",
      format: "webp",
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
      src: "/images/ledger/weekly/ledger-week-01-2026-08-17_2026-08-21-thumbnail.webp",
      alt: "Emerald Ledger Week 01 public performance thumbnail.",
      format: "webp",
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
      src: "/images/ledger/cumulative/ledger-cumulative-2-weeks-2026-08-17_2026-08-28-thumbnail.webp",
      alt: "Emerald Ledger two-week cumulative public performance thumbnail.",
      format: "webp",
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
  indicators: [
    {
      id: "indicator-emerald-legacy-mt4-settings",
      kind: "image",
      src: "/images/indicators/indicator-emerald-legacy-mt4-settings.webp",
      alt: "Emerald Legacy System MT4 settings panel showing configurable signal modules and offline chart controls.",
      format: "webp",
      width: 1272,
      height: 805,
      description:
        "Approved Emerald Legacy System MT4 settings screenshot showing unified signal-module settings, offline chart controls, alerts, and blank license key field.",
      provenance: {
        source: "Emerald Legacy Systems",
      },
    },
    {
      id: "indicator-emerald-legacy-mt4-overview",
      kind: "image",
      src: "/images/indicators/indicator-emerald-legacy-mt4-overview.webp",
      alt: "Emerald Legacy System running on an MT4 chart with signal markers and pip annotations.",
      format: "webp",
      width: 1491,
      height: 1055,
      description:
        "Approved Emerald Legacy System MT4 implementation screenshot showing the unified multi-signal indicator on a chart.",
      provenance: {
        source: "Emerald Legacy Systems",
      },
    },
    {
      id: "indicator-emerald-signal-mt4-01",
      kind: "image",
      src: "/images/indicators/emerald-signal-indicator-mt4-01.webp",
      alt: "MT4 chart showing the Emerald Signal Indicator with trade-direction markers and pip annotations.",
      format: "webp",
      width: 1672,
      height: 941,
      description:
        "Approved Emerald product/interface screenshot showing the Emerald Signal Indicator on an MT4 XAUUSD chart.",
      provenance: {
        source: "Emerald Legacy Systems",
      },
    },
    {
      id: "signal-main-mt4-example",
      kind: "image",
      src: "/images/indicators/signal-main-mt4-example.webp",
      alt: "Main Signal displayed on an MT4 chart.",
      format: "webp",
      width: 1491,
      height: 1055,
      description:
        "Approved Main Signal MT4 screenshot for the Emerald Legacy System signal-module overview.",
      provenance: {
        source: "Emerald Legacy Systems",
      },
    },
    {
      id: "signal-finescalp-mt4-offline-example",
      kind: "image",
      src: "/images/indicators/signal-finescalp-mt4-offline-example.webp",
      alt: "FineScalp signal displayed on an Emerald-generated high-resolution offline MetaTrader chart.",
      format: "webp",
      width: 1491,
      height: 1055,
      description:
        "Approved FineScalp MT4 screenshot showing signal output on an Emerald-generated custom offline chart.",
      provenance: {
        source: "Emerald Legacy Systems",
      },
    },
    {
      id: "signal-scalp-mt4-example",
      kind: "image",
      src: "/images/indicators/signal-scalp-mt4-example.webp",
      alt: "Scalp Signal shown on the same MT4 market chart used for module comparison.",
      format: "webp",
      width: 1491,
      height: 1055,
      description:
        "Approved Scalp Signal MT4 screenshot for the same-market signal comparison.",
      provenance: {
        source: "Emerald Legacy Systems",
      },
    },
    {
      id: "signal-range-mt4-example",
      kind: "image",
      src: "/images/indicators/signal-range-mt4-example.webp",
      alt: "Range Signal shown on the same MT4 market chart used for module comparison.",
      format: "webp",
      width: 1491,
      height: 1055,
      description:
        "Approved Range Signal MT4 screenshot for the same-market signal comparison.",
      provenance: {
        source: "Emerald Legacy Systems",
      },
    },
    {
      id: "signal-harmonizer-mt4-example",
      kind: "image",
      src: "/images/indicators/signal-harmonizer-mt4-example.webp",
      alt: "Harmonizer Signal shown on the same MT4 market chart.",
      format: "webp",
      width: 1491,
      height: 1055,
      description:
        "Approved Harmonizer MT4 screenshot showing Scalp and Range synthesis context on a chart.",
      provenance: {
        source: "Emerald Legacy Systems",
      },
    },
    {
      id: "signal-harmonizer-safe-mt4-example",
      kind: "image",
      src: "/images/indicators/signal-harmonizer-safe-mt4-example.webp",
      alt: "Harmonizer and Harmonizer SAFE signals displayed together on the same MT4 market chart.",
      format: "webp",
      width: 1491,
      height: 1055,
      description:
        "Approved Harmonizer plus Harmonizer SAFE MT4 screenshot showing auxiliary defensive signal context on the same market chart.",
      provenance: {
        source: "Emerald Legacy Systems",
      },
    },
  ] satisfies ImageAsset[],
  signals: [] satisfies ImageAsset[],
  technology: [] satisfies ImageAsset[],
  research: [] satisfies ImageAsset[],
  verification: [
    {
      id: "public-demo-reference-account-info",
      kind: "image",
      src: "/images/verification/public-demo-reference-account-info.webp",
      alt: "Public demo reference account information for the Emerald Legacy Systems performance record.",
      format: "webp",
      width: 1672,
      height: 941,
      description:
        "Approved verification screenshot documenting the public demo reference account used for the Emerald Ledger performance record.",
      provenance: {
        source: "Emerald Legacy Systems",
      },
    },
  ] satisfies ImageAsset[],
  general: [] satisfies ImageAsset[],
  socialOg: [
    {
      id: "social-default-og-emerald-legacy-systems",
      kind: "image",
      src: "/social/og/emerald-legacy-systems-default-og.png",
      alt: "Emerald Legacy Systems - Quantitative Trading Technology",
      format: "png",
      width: 1200,
      height: 630,
      description:
        "Default Open Graph and social-sharing image for Emerald Legacy Systems, using approved brand identity and evergreen positioning.",
      provenance: {
        source: "Emerald Legacy Systems",
      },
    },
  ] satisfies ImageAsset[],
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
