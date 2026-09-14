import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (file) =>
  readFileSync(path.join(root, file), "utf8").replace(/\s+/g, " ");
const data = read("src/data/content/engineering.ts");
const technology = read("src/components/engineering/technology-content.tsx");
const research = read("src/components/engineering/research-content.tsx");
const content = data + technology + research;
const catalog = read("src/data/products/product-catalog.ts");

for (const [route, component] of [
  ["technology", "TechnologyContent"],
  ["research", "ResearchContent"],
]) {
  const source = read(`src/app/(site)/${route}/page.tsx`);
  assert.doesNotMatch(source, /PagePlaceholder/);
  assert.ok(source.includes(`<${component} />`));
  assert.ok(source.includes(`routeSeoMetadata["/${route}"]`));
}
for (const product of [
  "Emerald Legacy System",
  "Emerald Signal Scanner",
  "Emerald Recovery Expert",
  "Emerald Quant System",
]) {
  assert.ok(catalog.includes(`name: "${product}"`));
  assert.ok(content.includes(product), product);
}
for (const responsibility of [
  "Signal-generation logic",
  "Indicator presentation",
  "Scanner aggregation",
  "Automated trading logic",
  "Recovery and trade management",
  "Platform adapters",
  "Licensing and entitlement runtime",
  "Performance documentation",
])
  assert.ok(data.includes(responsibility));
for (const stage of [
  "Hypothesis / trading concept",
  "Signal or execution design",
  "Historical testing",
  "Sensitivity and robustness analysis",
  "Implementation validation",
  "Forward / demo reference observation",
  "Documented results",
  "Revision / iteration",
])
  assert.ok(data.includes(stage));
for (const route of [
  "/technology",
  "/research",
  "/systems",
  "/systems/quant",
  "/indicators",
  "/signals",
  "/signal-scanner",
  "/recovery-expert",
  "/performance",
  "/verification",
  "/ledger",
  "/performance/live-vs-backtest",
])
  assert.ok(content.includes(`"${route}"`), route);
assert.match(technology, /getPublicTradingProducts/);
assert.match(technology, /getPublicSignalModules/);
assert.match(technology, /getPublicPlatformDefinitions/);
assert.match(research, /getPublicResearchEntries/);
assert.match(research, /publicationLabels\[entry.publicationStatus\]/);
assert.match(
  research,
  /do not assert that every product has completed every stage/,
);
assert.match(
  research,
  /Validation reduces uncertainty; it does not prove future/,
);
assert.match(content, /Public Demo Reference Account/);
assert.match(content, /Forward Performance Record/);
assert.match(content, /Documented Performance/);
assert.match(content, /Metals \/ XAUUSD/);
assert.match(content, /MT4/);
assert.match(data, /trader opens the first trade/);
assert.match(
  technology,
  /FineScalp capability is not attributed to Recovery Expert or Quant/,
);
assert.match(technology, /documentation remains planned/);
assert.match(research, /not evidence of peer-reviewed publication/);
assert.doesNotMatch(
  content,
  /AI-powered|machine learning|institutional-grade AI|scientifically proven|guaranteed profitability|risk-free trading|live account|independently verified|proven profits|guaranteed returns/i,
);
assert.doesNotMatch(
  content,
  /\b\d+(?:\.\d+)?%|netProfit|returnPct|maxDrawdownPct|totalTrades/,
  "no performance metric additions",
);
assert.doesNotMatch(
  content,
  /href=["']\/platforms|href: ["']\/platforms/,
  "no unfinished platform-guide links",
);
for (const file of readdirSync(path.join(root, "src/components/engineering"))) {
  const source = read(`src/components/engineering/${file}`);
  assert.doesNotMatch(
    source,
    /["']use client["']|fetch\(|localStorage|sessionStorage|document\.cookie|WebSocket/,
  );
  assert.doesNotMatch(
    source,
    /-----BEGIN.*PRIVATE KEY|gh[pousr]_[A-Za-z0-9]+|(?:apiKey|password|secret)\s*[:=]/i,
  );
}
const metadata = read("src/lib/seo/metadata.ts");
for (const title of [
  "Quantitative Trading Technology",
  "Quantitative Trading Research",
])
  assert.ok(metadata.includes(`title: "${title}"`));
console.log(
  "Engineering content audit passed: routes, product names, architectural boundaries, methodology caveats, publication-status rendering, cross-links, metadata and narrow claim/secret guards. Human source review and browser QA remain required.",
);
