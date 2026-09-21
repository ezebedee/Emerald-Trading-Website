import type { MetadataRoute } from "next";

import { createCanonicalUrl, getSitemapRoutes } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return getSitemapRoutes().map((route) => ({
    url: createCanonicalUrl(route.path),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
