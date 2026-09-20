import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { registerHooks } from "node:module";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import ts from "typescript";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (file) =>
  readFileSync(path.join(root, file), "utf8").replace(/\s+/g, " ");

// Execute the real selector and canonical records, following the evidence audit loader.
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
const { getPlatformGuidanceMatrix, availabilityLabel } =
  await import("../src/data/selectors/platform-guidance.ts");
const {
  getPublicTradingProducts,
  getPublicPlatformDefinitions,
  getProductPlatformImplementation,
  getDefaultPublicLedgerConfiguration,
} = await import("../src/data/selectors/products.ts");
const { platformGuides, productGuidanceLinks } =
  await import("../src/data/content/platform-guidance.ts");
const matrix = getPlatformGuidanceMatrix();
assert.deepEqual(matrix.platforms, getPublicPlatformDefinitions());
assert.equal(matrix.products.length, 4);
assert.deepEqual(
  matrix.products.map((product) => product.id),
  getPublicTradingProducts().map((product) => product.id),
);
for (const product of matrix.products) {
  assert.ok(productGuidanceLinks[product.id]);
  assert.equal(product.cells.length, 4);
  for (const cell of product.cells) {
    const source = getProductPlatformImplementation({
      productId: product.id,
      platformId: cell.platformId,
    });
    assert.ok(source);
    assert.equal(cell.availability, source.availability);
    assert.equal(cell.accessModel, source.accessModel);
    assert.equal(cell.documentationStatus, source.documentationStatus);
    assert.equal(cell.notes, source.implementationNotes);
  }
}
assert.equal(availabilityLabel("not-documented"), "Not Documented");
assert.equal(availabilityLabel("planned"), "Planned");
const configuration = getDefaultPublicLedgerConfiguration();
assert.equal(configuration.configurationName, "Metals / XAUUSD");
assert.deepEqual(configuration.platforms, ["MT4"]);
assert.deepEqual(configuration.instruments, ["XAUUSD"]);
assert.match(platformGuides.tradingview.access, /managed-access/);
assert.match(platformGuides.tradingview.context, /distinct from MetaTrader/);
assert.notEqual(platformGuides.mt4.context, platformGuides.mt5.context);
for (const guide of Object.values(platformGuides)) {
  assert.equal(guide.steps.length, 4);
  assert.ok(
    guide.context.length > 100 &&
      guide.access.length > 100 &&
      guide.workflow.length > 100,
  );
}
hooks.deregister();

for (const route of [
  "platforms",
  ...Object.keys(platformGuides).map((id) => `platforms/${id}`),
]) {
  const page = read(`src/app/(site)/${route}/page.tsx`);
  assert.doesNotMatch(page, /PagePlaceholder/);
  assert.match(page, /@\/components\/platforms\/platform-guidance/);
  assert.ok(page.includes(`routeSeoMetadata["/${route}"]`));
}
const component = read("src/components/platforms/platform-guidance.tsx");
const content = component + read("src/data/content/platform-guidance.ts");
assert.match(component, /getPlatformGuidanceMatrix\(\)/);
assert.match(component, /matrix\.products\.map/);
assert.match(component, /product\.cells\.map/);
assert.match(component, /availabilityLabel\(cell\.availability\)/);
assert.match(component, /<caption/);
assert.match(component, /scope="row"/);
assert.match(component, /scope="col"/);
assert.match(component, /overflow-x-auto/);
assert.match(component, /tabIndex=\{0\}/);
assert.match(component, /Metals \/ XAUUSD \/ MT4/);
assert.match(component, /do not provide public installers/);
assert.match(component, /href=\{portalLoginUrl\}/);
assert.match(
  read("src/lib/portal.ts"),
  /https:\/\/portal\.emeraldforexsystem\.com\/login/,
);
assert.doesNotMatch(
  component,
  /\bdownload[=\s>]|href=["'][^"']*\.(exe|zip|msi)/i,
);
assert.doesNotMatch(
  content,
  /guaranteed compatibility|zero-latency|institutional execution quality|broker-independent behavior|identical performance across all platforms/i,
);
assert.doesNotMatch(
  content,
  /\/api\/|session lease|device identifier|password|BEGIN.*PRIVATE KEY|licenseKey|validation endpoint|sha256|database/i,
);
console.log(
  "Platform guidance audit passed: 5 routes, 16 canonical availability cells, access, scope and public-boundary checks.",
);
