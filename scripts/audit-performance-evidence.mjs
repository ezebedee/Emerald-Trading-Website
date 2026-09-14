import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { registerHooks } from "node:module";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import ts from "typescript";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (file) => readFileSync(path.join(root, file), "utf8");

// Run the real TypeScript selectors with their local aliases; no duplicate metric fixtures.
const hooks = registerHooks({
  resolve(specifier, context, next) {
    if (
      specifier.startsWith("@/") ||
      (specifier.startsWith(".") && context.parentURL?.endsWith(".ts"))
    ) {
      const base = specifier.startsWith("@/")
        ? path.join(root, "src", specifier.slice(2))
        : path.resolve(
            path.dirname(fileURLToPath(context.parentURL)),
            specifier,
          );
      const file = [base + ".ts", path.join(base, "index.ts")].find(existsSync);
      if (file) return { url: pathToFileURL(file).href, shortCircuit: true };
    }
    return next(specifier, context);
  },
  load(url, context, next) {
    if (
      url.startsWith(pathToFileURL(path.join(root, "src") + path.sep).href) &&
      url.endsWith(".ts")
    ) {
      return {
        format: "module",
        shortCircuit: true,
        source: ts.transpileModule(readFileSync(fileURLToPath(url), "utf8"), {
          compilerOptions: {
            module: ts.ModuleKind.ESNext,
            target: ts.ScriptTarget.ES2022,
          },
        }).outputText,
      };
    }
    return next(url, context);
  },
});
const { getPublicPerformanceEvidence, formatEvidenceMetric } =
  await import("../src/data/selectors/performance-evidence.ts");
const {
  getPublicLedgerEntriesForConfiguration,
  getDefaultPublicLedgerConfiguration,
} = await import("../src/data/selectors/products.ts");
const { getEffectiveCumulativeMetrics } =
  await import("../src/data/selectors/ledger.ts");
const evidence = getPublicPerformanceEvidence();
const configuration = getDefaultPublicLedgerConfiguration();
const source = getPublicLedgerEntriesForConfiguration(configuration.id).find(
  (entry) => entry.id === evidence.snapshot.id,
);
assert.ok(source, "snapshot belongs to the public configuration");
assert.equal(configuration.configurationName, "Metals / XAUUSD");
assert.deepEqual(configuration.platforms, ["MT4"]);
assert.deepEqual(configuration.instruments, ["XAUUSD"]);
assert.equal(source.accountClassification, "public-demo-reference");
assert.equal(source.performanceClassification, "forward-performance");
for (const field of ["returnPct", "maxDrawdownPct", "totalTrades"]) {
  assert.equal(
    evidence.snapshot[field],
    getEffectiveCumulativeMetrics(source)[field],
    `source mapping: ${field}`,
  );
}
assert.equal(evidence.snapshot.endDate, source.endDate);
assert.equal(formatEvidenceMetric(undefined, "percentage"), "Not documented");
assert.equal(formatEvidenceMetric(NaN, "count"), "Not documented");
assert.equal(formatEvidenceMetric(0, "percentage"), "0.00%");
assert.equal(formatEvidenceMetric(-4.2, "percentage"), "-4.20%");
assert.equal(formatEvidenceMetric(135, "percentage"), "135.00%");
assert.doesNotMatch(
  JSON.stringify(evidence),
  /accountNumber|brokerName|password|credentials|publicAccountNumber/,
);
hooks.deregister();

for (const route of [
  "performance",
  "performance/compare",
  "performance/live-vs-backtest",
  "verification",
]) {
  const page = read(`src/app/(site)/${route}/page.tsx`);
  assert.doesNotMatch(page, /PagePlaceholder/);
  assert.match(page, /@\/components\/performance\//);
}
const content = read("src/data/content/performance-evidence.ts");
for (const label of [
  "Backtest",
  "Forward / Demo Reference",
  "Documented Historical Record",
  "Internal Documentation",
  "Independent Third-Party Verification",
  "where available",
  "Public Demo Reference Account",
  "Forward Performance Record",
])
  assert.ok(content.includes(label), label);
for (const route of [
  "/performance",
  "/performance/compare",
  "/performance/live-vs-backtest",
  "/verification",
  "/ledger",
  "/systems/quant",
])
  assert.ok(content.includes(`href: "${route}"`));
const directory = "src/components/performance";
const presentation = readdirSync(path.join(root, directory))
  .map((file) => read(`${directory}/${file}`))
  .join("\n");
assert.match(presentation, /Not available/);
assert.match(presentation, /notDocumented/);
assert.match(presentation, /not performance evidence/);
assert.match(presentation, /not equivalent to Quant strategy returns/);
assert.match(presentation, /scope="col"/);
assert.match(presentation, /scope="row"/);
assert.match(presentation, /<caption/);
assert.match(presentation, /Losses are possible/);
assert.doesNotMatch(
  presentation,
  /PagePlaceholder|live account|live trading account|verified real-money|guaranteed returns|real-world verified|new Date\(|Date\.now\(/i,
);
assert.doesNotMatch(
  presentation,
  /\b(?:20\.50|10\.67|499|204966\.54)\b/,
  "metrics must not be hardcoded into components",
);
assert.match(
  read("src/components/layout/site-footer.tsx"),
  /Forward vs Backtest/,
);
console.log(
  "Performance evidence audit passed: runtime source ownership/mapping, missing-value formatting, privacy whitelist and narrow source/content guardrails. Browser QA checks rendered claims and links separately.",
);
