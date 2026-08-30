import { getAssetById } from "@/data/selectors/assets";
import { siteBrand } from "@/data/site";

import { createCanonicalUrl, routeSeoMetadata } from "./metadata";

export type JsonLdPrimitive = string | number | boolean | null;
export type JsonLdValue =
  JsonLdPrimitive | JsonLdObject | readonly JsonLdValue[];
export interface JsonLdObject {
  readonly [key: string]: JsonLdValue | undefined;
}

export const organizationJsonLdId = `${createCanonicalUrl("/")}#organization`;
export const websiteJsonLdId = `${createCanonicalUrl("/")}#website`;

export type BreadcrumbItemInput = Readonly<{
  name: string;
  path: string;
}>;

export type WebPageJsonLdInput = Readonly<{
  title: string;
  description?: string;
  path: string;
  breadcrumbs?: readonly BreadcrumbItemInput[];
}>;

type ArticleJsonLdInput = Readonly<{
  headline: string;
  description: string;
  path: string;
  datePublished?: string;
  dateModified?: string;
  authors?: readonly string[];
  imageAssetId?: string;
}>;

type VideoJsonLdInput = Readonly<{
  name: string;
  description: string;
  thumbnailAssetId: string;
  uploadDate?: string;
  duration?: string;
  contentUrl?: string;
  embedUrl?: string;
}>;

const compactJsonLd = <T extends JsonLdObject>(value: T) =>
  Object.fromEntries(
    Object.entries(value).filter((entry) => entry[1] !== undefined),
  ) as T;

const organizationReference = () => ({
  "@id": organizationJsonLdId,
});

const websiteReference = () => ({
  "@id": websiteJsonLdId,
});

const imageUrlFromAssetId = (assetId: string) => {
  const asset = getAssetById(assetId);

  if (!asset || !("src" in asset)) {
    return undefined;
  }

  return createCanonicalUrl(asset.src);
};

export const createOrganizationJsonLd = (): JsonLdObject => {
  const logoUrl = imageUrlFromAssetId("brand-elq-signature-mark");

  return compactJsonLd({
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationJsonLdId,
    name: siteBrand.name,
    url: createCanonicalUrl("/"),
    description: siteBrand.metadataDescription,
    email: siteBrand.supportEmail,
    logo: logoUrl,
  });
};

export const createWebsiteJsonLd = (): JsonLdObject => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": websiteJsonLdId,
  name: siteBrand.name,
  url: createCanonicalUrl("/"),
  description: siteBrand.metadataDescription,
  publisher: organizationReference(),
});

export const createBreadcrumbJsonLd = (
  items: readonly BreadcrumbItemInput[],
): JsonLdObject => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: createCanonicalUrl(item.path),
  })),
});

export const createWebPageJsonLd = ({
  title,
  description = siteBrand.metadataDescription,
  path,
  breadcrumbs,
}: WebPageJsonLdInput): JsonLdObject => {
  const canonicalUrl = createCanonicalUrl(path);

  return compactJsonLd({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: title,
    description,
    isPartOf: websiteReference(),
    about: organizationReference(),
    breadcrumb: breadcrumbs ? createBreadcrumbJsonLd(breadcrumbs) : undefined,
  });
};

export const createRouteWebPageJsonLd = (
  path: keyof typeof routeSeoMetadata,
  breadcrumbs?: readonly BreadcrumbItemInput[],
): JsonLdObject =>
  createWebPageJsonLd({
    ...routeSeoMetadata[path],
    breadcrumbs,
  });

export const createArticleJsonLd = ({
  headline,
  description,
  path,
  datePublished,
  dateModified,
  authors,
  imageAssetId,
}: ArticleJsonLdInput): JsonLdObject => {
  const canonicalUrl = createCanonicalUrl(path);
  const imageUrl = imageAssetId ? imageUrlFromAssetId(imageAssetId) : undefined;

  return compactJsonLd({
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${canonicalUrl}#article`,
    headline,
    description,
    url: canonicalUrl,
    datePublished,
    dateModified,
    author: authors?.map((name) => ({
      "@type": "Person",
      name,
    })),
    publisher: organizationReference(),
    image: imageUrl,
  });
};

export const createVideoJsonLd = ({
  name,
  description,
  thumbnailAssetId,
  uploadDate,
  duration,
  contentUrl,
  embedUrl,
}: VideoJsonLdInput): JsonLdObject | undefined => {
  if (!contentUrl && !embedUrl) {
    return undefined;
  }

  const thumbnailUrl = imageUrlFromAssetId(thumbnailAssetId);

  if (!thumbnailUrl) {
    return undefined;
  }

  return compactJsonLd({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description,
    thumbnailUrl: [thumbnailUrl],
    uploadDate,
    duration,
    contentUrl,
    embedUrl,
    publisher: organizationReference(),
  });
};
