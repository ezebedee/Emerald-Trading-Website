import type { MetadataRoute } from "next";

import { createCanonicalUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/design-system"],
    },
    sitemap: createCanonicalUrl("/sitemap.xml"),
  };
}
