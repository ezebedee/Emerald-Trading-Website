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
