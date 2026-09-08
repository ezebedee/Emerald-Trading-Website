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
    title: "Trading Systems",
    description:
      "Algorithmic trading systems developed by Emerald Legacy Systems, including signal-generation, risk-management, and execution technology.",
    path: "/systems",
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
      "Signal library foundation for Emerald signal modules, including primary and auxiliary signal categories.",
    path: "/signals",
  },
  "/signal-scanner": {
    title: "Emerald Signal Scanner",
    description:
      "Product page foundation for multi-symbol and multi-signal monitoring across supported trading platforms.",
    path: "/signal-scanner",
  },
  "/recovery-expert": {
    title: "Emerald Recovery Expert",
    description:
      "Product page foundation for a semi-automated trade-management tool where the trader initiates the first trade.",
    path: "/recovery-expert",
  },
  "/platforms": {
    title: "Trading Platforms",
    description:
      "Platform overview foundation for Emerald product availability across MT4, MT5, TradingView, and NinjaTrader.",
    path: "/platforms",
  },
  "/platforms/mt4": {
    title: "MT4 Trading Tools",
    description:
      "MT4 product implementation guide foundation for Emerald Legacy System, Signal Scanner, Recovery Expert, and private Quant System availability.",
    path: "/platforms/mt4",
  },
  "/platforms/mt5": {
    title: "MT5 Trading Tools",
    description:
      "MT5 product implementation guide foundation for Emerald Legacy System, Signal Scanner, Recovery Expert, and private Quant System availability.",
    path: "/platforms/mt5",
  },
  "/platforms/tradingview": {
    title: "TradingView Trading Tools",
    description:
      "TradingView product implementation guide foundation for Emerald Legacy System, Signal Scanner, Recovery Expert, and private Quant System availability.",
    path: "/platforms/tradingview",
  },
  "/platforms/ninjatrader": {
    title: "NinjaTrader Trading Tools",
    description:
      "NinjaTrader product implementation guide foundation for Emerald Legacy System, Signal Scanner, Recovery Expert, and private Quant System availability.",
    path: "/platforms/ninjatrader",
  },
  "/performance": {
    title: "Performance",
    description:
      "Documented performance records, comparisons, and analytical views from Emerald Legacy Systems.",
    path: "/performance",
  },
  "/performance/compare": {
    title: "Performance Comparison",
    description:
      "Compare documented Emerald Legacy Systems performance records across periods and system views.",
    path: "/performance/compare",
  },
  "/performance/live-vs-backtest": {
    title: "Live vs Backtest Performance",
    description:
      "Compare forward-performance records with historical backtest results while keeping methodology and scope distinct.",
    path: "/performance/live-vs-backtest",
  },
  "/technology": {
    title: "Technology",
    description:
      "Explore the quantitative trading technology, system architecture, automation, and analytical framework behind Emerald Legacy Systems.",
    path: "/technology",
  },
  "/research": {
    title: "Research",
    description:
      "Research, methodologies, technical notes, and quantitative trading studies from Emerald Legacy Systems.",
    path: "/research",
  },
  "/verification": {
    title: "Performance Verification",
    description:
      "Methods and supporting evidence used to document and review Emerald Legacy Systems public performance records.",
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
      "Information for professional, institutional, and investor audiences evaluating Emerald Legacy Systems technology and documented performance.",
    path: "/professional",
  },
  "/about": {
    title: "About",
    description:
      "Learn about Emerald Legacy Systems and its quantitative trading technology, research, and system-development approach.",
    path: "/about",
  },
  "/privacy": {
    title: "Privacy Policy",
    description: "Privacy policy for Emerald Legacy Systems.",
    path: "/privacy",
  },
  "/terms": {
    title: "Terms of Use",
    description: "Terms of use for the Emerald Legacy Systems website.",
    path: "/terms",
  },
  "/risk-disclosure": {
    title: "Risk Disclosure",
    description:
      "Risk disclosures relating to trading, performance information, and the use of Emerald Legacy Systems technology.",
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
