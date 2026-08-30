export type RouteChangeFrequency =
  "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

export type SeoRoute = Readonly<{
  path: string;
  indexable: boolean;
  includeInSitemap: boolean;
  changeFrequency?: RouteChangeFrequency;
  priority?: number;
}>;

export const publicRouteRegistry = [
  {
    path: "/",
    indexable: true,
    includeInSitemap: true,
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    path: "/ledger",
    indexable: true,
    includeInSitemap: true,
    changeFrequency: "daily",
    priority: 0.9,
  },
  {
    path: "/systems",
    indexable: true,
    includeInSitemap: true,
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    path: "/indicators",
    indexable: true,
    includeInSitemap: true,
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    path: "/signals",
    indexable: true,
    includeInSitemap: true,
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    path: "/performance",
    indexable: true,
    includeInSitemap: true,
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    path: "/performance/compare",
    indexable: true,
    includeInSitemap: true,
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    path: "/performance/live-vs-backtest",
    indexable: true,
    includeInSitemap: true,
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    path: "/technology",
    indexable: true,
    includeInSitemap: true,
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/research",
    indexable: true,
    includeInSitemap: true,
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/verification",
    indexable: true,
    includeInSitemap: true,
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/videos",
    indexable: true,
    includeInSitemap: true,
    changeFrequency: "weekly",
    priority: 0.7,
  },
  {
    path: "/private-access",
    indexable: true,
    includeInSitemap: true,
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    path: "/professional",
    indexable: true,
    includeInSitemap: true,
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    path: "/about",
    indexable: true,
    includeInSitemap: true,
    changeFrequency: "monthly",
    priority: 0.5,
  },
  {
    path: "/privacy",
    indexable: true,
    includeInSitemap: true,
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    path: "/terms",
    indexable: true,
    includeInSitemap: true,
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    path: "/risk-disclosure",
    indexable: true,
    includeInSitemap: true,
    changeFrequency: "yearly",
    priority: 0.4,
  },
] as const satisfies readonly SeoRoute[];

export const internalRoutes = [
  {
    path: "/design-system",
    indexable: false,
    includeInSitemap: false,
  },
] as const satisfies readonly SeoRoute[];

const allRegisteredRoutes = [...publicRouteRegistry, ...internalRoutes];

const assertRouteRegistry = () => {
  const seenPaths = new Set<string>();

  for (const route of allRegisteredRoutes) {
    if (!route.path.startsWith("/")) {
      throw new Error(`SEO route path must start with "/": ${route.path}`);
    }

    if (route.path !== route.path.toLowerCase()) {
      throw new Error(`SEO route path must use lowercase: ${route.path}`);
    }

    if (route.path.includes("?") || route.path.includes("#")) {
      throw new Error(
        `SEO route path must not include query strings or fragments: ${route.path}`,
      );
    }

    if (route.path !== "/" && route.path.endsWith("/")) {
      throw new Error(
        `SEO route path must not include trailing slash: ${route.path}`,
      );
    }

    if (seenPaths.has(route.path)) {
      throw new Error(`Duplicate SEO route path: ${route.path}`);
    }

    seenPaths.add(route.path);
  }
};

assertRouteRegistry();

export const getIndexableRoutes = () =>
  publicRouteRegistry.filter((route) => route.indexable);

export const getSitemapRoutes = () =>
  publicRouteRegistry.filter(
    (route) => route.indexable && route.includeInSitemap,
  );
