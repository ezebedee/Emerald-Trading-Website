import type { Metadata } from "next";

import { siteBrand } from "@/data/site";

export const siteUrl = `https://${siteBrand.domain}`;
export const siteMetadataBase = new URL(siteUrl);

export type PageMetadataInput = Readonly<{
  title: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
  noFollow?: boolean;
  type?: "website" | "article";
  keywords?: readonly string[];
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

export const createPageMetadata = ({
  title,
  description = siteBrand.metadataDescription,
  path = "/",
  noIndex = false,
  noFollow = false,
  type = "website",
  keywords,
}: PageMetadataInput): Metadata => {
  const canonicalUrl = createCanonicalUrl(path);

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
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
};
