import type { Metadata } from "next";

import { siteAssets } from "@/data/assets";
import { siteBrand } from "@/data/site";

export const siteUrl = `https://${siteBrand.domain}`;
export const siteMetadataBase = new URL(siteUrl);
export const defaultSocialImageAssetId =
  "social-default-og-emerald-legacy-systems";

export type PageMetadataInput = Readonly<{
  title: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
  noFollow?: boolean;
  type?: "website" | "article";
  keywords?: readonly string[];
  ogImageAssetId?: string;
}>;

export const routeSeoMetadata = {
  "/ledger": {
    title: "Emerald Ledger",
    description:
      "Public forward-performance records from the Emerald Legacy Systems demo reference account.",
    path: "/ledger",
  },
  "/systems": {
    title: "Systems & Products",
    description:
      "Explore Emerald Legacy System, Signal Scanner, Recovery Expert, and private Emerald Quant System across MT4, MT5, TradingView, and NinjaTrader.",
    path: "/systems",
  },
  "/systems/quant": {
    title: "Emerald Quant System",
    description:
      "Explore the fully automated Emerald Quant System, its architecture, public Forward Performance context, and current configuration relationships.",
    path: "/systems/quant",
  },
  "/indicators": {
    title: "Emerald Legacy System",
    description:
      "Explore Emerald Legacy System, a unified multi-signal indicator framework with Main, FineScalp, Scalp, Range, Harmonizer, and Harmonizer SAFE across supported platforms.",
    path: "/indicators",
  },
  "/signals": {
    title: "Signal Library",
    description:
      "Explore Main, FineScalp, Scalp, Range, Harmonizer, and Harmonizer SAFE signal modules within the Emerald Legacy System across supported trading platforms.",
    path: "/signals",
  },
  "/signal-scanner": {
    title: "Emerald Signal Scanner",
    description:
      "Explore Emerald Signal Scanner, a multi-symbol and multi-signal monitoring dashboard with configurable filters, chart-context View workflow, and optional fresh-signal alerts.",
    path: "/signal-scanner",
  },
  "/recovery-expert": {
    title: "Emerald Recovery Expert",
    description:
      "Explore Emerald Recovery Expert, a semi-automated trade-management product where the trader initiates the first trade and the Expert manages subsequent recovery actions across supported trading platforms.",
    path: "/recovery-expert",
  },
  "/platforms": {
    title: "Trading Platforms",
    description:
      "Compare Emerald product availability, platform-specific workflows and access guidance for MT4, MT5, TradingView and NinjaTrader.",
    path: "/platforms",
  },
  "/platforms/mt4": {
    title: "MT4 Trading Tools",
    description:
      "Explore Emerald tools for MetaTrader 4: chart-based workflows, high-level setup, authorized access and configuration-specific performance context.",
    path: "/platforms/mt4",
  },
  "/platforms/mt5": {
    title: "MT5 Trading Tools",
    description:
      "Review Emerald MT5 product compatibility, platform-specific setup and access guidance without assuming MT4 feature or performance parity.",
    path: "/platforms/mt5",
  },
  "/platforms/tradingview": {
    title: "TradingView Trading Tools",
    description:
      "Understand Emerald TradingView product availability, visual analysis and managed-access guidance, distinct from MetaTrader execution workflows.",
    path: "/platforms/tradingview",
  },
  "/platforms/ninjatrader": {
    title: "NinjaTrader Trading Tools",
    description:
      "Explore Emerald NinjaTrader product availability, desktop setup considerations and authorized access for platform-specific implementations.",
    path: "/platforms/ninjatrader",
  },
  "/performance": {
    title: "Documented Performance",
    description:
      "Understand Emerald's documented trading results, public demo forward records, evidence classes and configuration-specific performance limits.",
    path: "/performance",
  },
  "/performance/compare": {
    title: "Performance Evidence Comparison",
    description:
      "Inspect the Quant Metals/XAUUSD MT4 forward record alongside backtest evidence availability, with source-backed metrics and explicit missing data.",
    path: "/performance/compare",
  },
  "/performance/live-vs-backtest": {
    title: "Forward Performance vs Backtest Performance",
    description:
      "Understand algorithmic backtest assumptions, forward demo observation, execution differences and the limits of both evaluation methods.",
    path: "/performance/live-vs-backtest",
  },
  "/technology": {
    title: "Quantitative Trading Technology",
    description:
      "Explore Emerald's algorithmic trading architecture: signal information, Scanner monitoring, automated and assisted execution, and platform adaptation.",
    path: "/technology",
  },
  "/research": {
    title: "Quantitative Trading Research",
    description:
      "Explore quantitative trading research at Emerald: market hypotheses, testing, system development, methodology and non-proprietary findings.",
    path: "/research",
  },
  "/verification": {
    title: "Performance Verification Methodology",
    description:
      "How Emerald documents public performance records: configuration identity, dated sources, media context, correction practices and independent-review boundaries.",
    path: "/verification",
  },
  "/videos": {
    title: "Video Archive",
    description:
      "Performance updates, product demonstrations, and research videos from Emerald Legacy Systems.",
    path: "/videos",
  },
  "/private-access": {
    title: "Private Access",
    description:
      "Request authorized access to selected private Emerald Legacy Systems performance and technology information.",
    path: "/private-access",
  },
  "/professional": {
    title: "Professional & Investor",
    description:
      "Evaluate Emerald trading technology through documented methodology, platform-specific implementation and clearly scoped performance evidence.",
    path: "/professional",
  },
  "/about": {
    title: "About",
    description:
      "Emerald Legacy Systems develops quantitative trading software and market technology through research, engineering and continuous improvement.",
    path: "/about",
  },
  "/privacy": {
    title: "Privacy Policy",
    description:
      "How the current Emerald public website handles browsing, technical information and external links, separately from the Emerald portal.",
    path: "/privacy",
  },
  "/terms": {
    title: "Terms of Use",
    description:
      "Terms for using Emerald's public technology content, including reliance limits, intellectual property, acceptable use and external links.",
    path: "/terms",
  },
  "/risk-disclosure": {
    title: "Risk Disclosure",
    description:
      "Understand trading, leverage, execution and automation risks, and the limitations of historical testing and Emerald's public demo records.",
    path: "/risk-disclosure",
  },
} as const satisfies Record<string, PageMetadataInput & { path: string }>;

export const createCanonicalUrl = (path = "/") => {
  const pathWithoutQueryOrHash = path.split(/[?#]/)[0] ?? "/";
  const normalizedPath = pathWithoutQueryOrHash.startsWith("/")
    ? pathWithoutQueryOrHash
    : `/${pathWithoutQueryOrHash}`;
  const withoutTrailingSlash =
    normalizedPath === "/"
      ? normalizedPath
      : normalizedPath.replace(/\/+$/, "");

  return new URL(withoutTrailingSlash, siteMetadataBase).toString();
};

export const getSocialImageAsset = (assetId?: string) =>
  siteAssets.socialOg.find((asset) => asset.id === assetId) ??
  siteAssets.socialOg.find((asset) => asset.id === defaultSocialImageAssetId);

export const createSocialImageMetadata = (assetId?: string) => {
  const asset = getSocialImageAsset(assetId);

  if (!asset) {
    return undefined;
  }

  return {
    url: createCanonicalUrl(asset.src),
    width: asset.width,
    height: asset.height,
    alt: asset.alt,
  };
};

export const createPageMetadata = ({
  title,
  description = siteBrand.metadataDescription,
  path = "/",
  noIndex = false,
  noFollow = false,
  type = "website",
  keywords,
  ogImageAssetId,
}: PageMetadataInput): Metadata => {
  const canonicalUrl = createCanonicalUrl(path);
  const socialImage = createSocialImageMetadata(ogImageAssetId);

  return {
    title,
    description,
    keywords: keywords ? [...keywords] : undefined,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: !noIndex,
      follow: !noFollow,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: siteBrand.name,
      type,
      locale: "en_US",
      images: socialImage ? [socialImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: socialImage ? [socialImage] : undefined,
    },
  };
};
