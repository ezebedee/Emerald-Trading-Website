import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const routeRegistryPath = path.join(root, "src", "lib", "seo", "routes.ts");
const sitemapPath = path.join(root, "src", "app", "sitemap.ts");
const robotsPath = path.join(root, "src", "app", "robots.ts");
const rootLayoutPath = path.join(root, "src", "app", "layout.tsx");
const designSystemPagePath = path.join(
  root,
  "src",
  "app",
  "design-system",
  "page.tsx",
);
const structuredDataPath = path.join(
  root,
  "src",
  "lib",
  "seo",
  "structured-data.ts",
);
const siteAppRoot = path.join(root, "src", "app", "(site)");

const routePathPattern = /path:\s*"([^"]+)"/g;
const registrySource = readFileSync(routeRegistryPath, "utf8");
const metadataSource = readFileSync(
  path.join(root, "src", "lib", "seo", "metadata.ts"),
  "utf8",
);
const structuredDataSource = existsSync(structuredDataPath)
  ? readFileSync(structuredDataPath, "utf8")
  : "";
const assetSource = readFileSync(
  path.join(root, "src", "data", "assets.ts"),
  "utf8",
);
const rootLayoutSource = readFileSync(rootLayoutPath, "utf8");
const designSystemPageSource = readFileSync(designSystemPagePath, "utf8");
const bannedStructuredDataTypes = [
  "FinancialService",
  "InvestmentFund",
  "AggregateRating",
  "Review",
  "Offer",
  "Product",
  "FinancialProduct",
  "BrokerageAccount",
];
const bannedClaimPhrases = [
  "real-money results",
  "live account",
  "verified profits",
  "audited returns",
  "guaranteed profitability",
  "risk-free",
  "investment advice",
];
const bannedSeoFigures = ["204966.54", "20.496654", "499", "10.67"];
const rootMetadataExemptions = ["/"];

const sourceSlice = (exportName) => {
  const start = registrySource.indexOf(`export const ${exportName} = [`);
  if (start === -1) return "";
  const end = registrySource.indexOf("] as const", start);
  return end === -1 ? "" : registrySource.slice(start, end);
};

const routePathsFromSource = (exportName) =>
  [...sourceSlice(exportName).matchAll(routePathPattern)].map(
    (match) => match[1],
  );

const findPageRoutes = (directory) => {
  const routes = [];

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      routes.push(...findPageRoutes(entryPath));
      continue;
    }

    if (entry.name !== "page.tsx") {
      continue;
    }

    const relativeDirectory = path.relative(siteAppRoot, directory);
    const route =
      relativeDirectory === ""
        ? "/"
        : `/${relativeDirectory.replaceAll(path.sep, "/")}`;

    routes.push(route);
  }

  return routes;
};

const normalized = (values) => [...values].sort((a, b) => a.localeCompare(b));
const unique = (values) => new Set(values).size === values.length;
const sameValues = (first, second) =>
  JSON.stringify(normalized(first)) === JSON.stringify(normalized(second));

const isCanonicalPath = (routePath) =>
  routePath.startsWith("/") &&
  routePath === routePath.toLowerCase() &&
  !routePath.includes("?") &&
  !routePath.includes("#") &&
  (routePath === "/" || !routePath.endsWith("/"));

const publicRegistryPaths = routePathsFromSource("publicRouteRegistry");
const internalRoutePaths = routePathsFromSource("internalRoutes");
const publicAppRoutes = findPageRoutes(siteAppRoot);
const failures = [];
const pageSourceByRoute = new Map(
  publicAppRoutes.map((routePath) => {
    const routeDirectory =
      routePath === "/"
        ? siteAppRoot
        : path.join(siteAppRoot, ...routePath.slice(1).split("/"));

    return [
      routePath,
      readFileSync(path.join(routeDirectory, "page.tsx"), "utf8"),
    ];
  }),
);
const defaultSocialImageAssetIdMatch = metadataSource.match(
  /defaultSocialImageAssetId\s*=\s*"([^"]+)"/,
);
const defaultSocialImageAssetId = defaultSocialImageAssetIdMatch?.[1];

if (!existsSync(sitemapPath)) {
  failures.push("src/app/sitemap.ts is missing.");
}

if (!existsSync(robotsPath)) {
  failures.push("src/app/robots.ts is missing.");
}

if (!structuredDataSource) {
  failures.push("src/lib/seo/structured-data.ts is missing.");
}

if (!unique([...publicRegistryPaths, ...internalRoutePaths])) {
  failures.push("SEO route registry contains duplicate route paths.");
}

for (const routePath of [...publicRegistryPaths, ...internalRoutePaths]) {
  if (!isCanonicalPath(routePath)) {
    failures.push(`SEO route path is not canonical: ${routePath}`);
  }
}

if (!sameValues(publicRegistryPaths, publicAppRoutes)) {
  failures.push(
    `Public route registry does not match src/app/(site) pages. Registry: ${normalized(publicRegistryPaths).join(", ")}. Pages: ${normalized(publicAppRoutes).join(", ")}.`,
  );
}

for (const routePath of publicRegistryPaths) {
  const pageSource = pageSourceByRoute.get(routePath);

  if (!pageSource) {
    continue;
  }

  if (rootMetadataExemptions.includes(routePath)) {
    if (pageSource.includes("createPageMetadata(")) {
      failures.push(
        `${routePath} is configured to inherit root metadata but exports page metadata.`,
      );
    }

    continue;
  }

  if (!metadataSource.includes(`"${routePath}": {`)) {
    failures.push(`Route metadata source is missing ${routePath}.`);
  }

  if (!pageSource.includes("createPageMetadata(")) {
    failures.push(`${routePath} page is missing route metadata export.`);
  }

  if (!pageSource.includes(`routeSeoMetadata["${routePath}"]`)) {
    failures.push(`${routePath} page does not use its routeSeoMetadata entry.`);
  }
}

if (publicRegistryPaths.includes("/design-system")) {
  failures.push("/design-system must not be in the public route registry.");
}

if (!internalRoutePaths.includes("/design-system")) {
  failures.push("/design-system must be listed as an internal route.");
}

if (!rootLayoutSource.includes('canonical: createCanonicalUrl("/")')) {
  failures.push("Root metadata must define the homepage canonical URL.");
}

if (
  !designSystemPageSource.includes("noIndex: true") ||
  !designSystemPageSource.includes("noFollow: true")
) {
  failures.push("/design-system must remain noindex/nofollow.");
}

if (!defaultSocialImageAssetId) {
  failures.push("Default social image asset ID is not defined.");
} else if (!assetSource.includes(`id: "${defaultSocialImageAssetId}"`)) {
  failures.push(
    `Default social image asset ID is not registered: ${defaultSocialImageAssetId}`,
  );
}

if (!structuredDataSource.includes("siteBrand.name")) {
  failures.push("Structured-data module must use the canonical site name.");
}

for (const bannedType of bannedStructuredDataTypes) {
  if (structuredDataSource.includes(`"@type": "${bannedType}"`)) {
    failures.push(`Banned structured-data type found: ${bannedType}`);
  }
}

const seoSources = [
  ["root layout", rootLayoutSource],
  ["metadata", metadataSource],
  ["structured-data", structuredDataSource],
  ...[...pageSourceByRoute.entries()].map(([routePath, source]) => [
    `page ${routePath}`,
    source,
  ]),
];

for (const [label, source] of seoSources) {
  const sourceLower = source.toLowerCase();

  if (sourceLower.includes("localhost")) {
    failures.push(`Hardcoded localhost reference found in ${label}.`);
  }

  for (const bannedPhrase of bannedClaimPhrases) {
    if (sourceLower.includes(bannedPhrase)) {
      failures.push(
        `Banned SEO claim phrase found in ${label}: ${bannedPhrase}`,
      );
    }
  }

  for (const figure of bannedSeoFigures) {
    if (source.includes(figure)) {
      failures.push(`Current performance figure found in ${label}: ${figure}`);
    }
  }
}

console.log("SEO route audit");
console.log(`Public route registry paths: ${publicRegistryPaths.length}`);
console.log(`Current public app routes: ${publicAppRoutes.length}`);
console.log(`Internal route paths: ${internalRoutePaths.length}`);
console.log(
  `Default social image asset ID: ${defaultSocialImageAssetId ?? "missing"}`,
);
console.log(
  `Structured-data module: ${structuredDataSource ? "present" : "missing"}`,
);
console.log(
  `Route metadata coverage: ${publicRegistryPaths.length - rootMetadataExemptions.length}/${publicRegistryPaths.length} route pages plus ${rootMetadataExemptions.length} root exemption`,
);

if (failures.length) {
  console.error("");
  console.error("Failures:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }

  process.exitCode = 1;
} else {
  console.log(
    "Route registry paths are unique, canonical, aligned with current public pages, and keep internal routes out of the sitemap inventory.",
  );
}
