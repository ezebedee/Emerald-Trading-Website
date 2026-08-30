import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const routeRegistryPath = path.join(root, "src", "lib", "seo", "routes.ts");
const sitemapPath = path.join(root, "src", "app", "sitemap.ts");
const robotsPath = path.join(root, "src", "app", "robots.ts");
const siteAppRoot = path.join(root, "src", "app", "(site)");

const routePathPattern = /path:\s*"([^"]+)"/g;
const registrySource = readFileSync(routeRegistryPath, "utf8");

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

if (!existsSync(sitemapPath)) {
  failures.push("src/app/sitemap.ts is missing.");
}

if (!existsSync(robotsPath)) {
  failures.push("src/app/robots.ts is missing.");
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

if (publicRegistryPaths.includes("/design-system")) {
  failures.push("/design-system must not be in the public route registry.");
}

if (!internalRoutePaths.includes("/design-system")) {
  failures.push("/design-system must be listed as an internal route.");
}

console.log("SEO route audit");
console.log(`Public route registry paths: ${publicRegistryPaths.length}`);
console.log(`Current public app routes: ${publicAppRoutes.length}`);
console.log(`Internal route paths: ${internalRoutePaths.length}`);

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
