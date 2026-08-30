import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const domains = [
  {
    name: "Ledger",
    file: "src/data/ledger/entries.ts",
    checkSlugs: true,
  },
  {
    name: "System families",
    file: "src/data/products/system-families.ts",
    checkSlugs: true,
  },
  {
    name: "Systems",
    file: "src/data/products/systems.ts",
    checkSlugs: true,
  },
  {
    name: "Indicators",
    file: "src/data/products/indicators.ts",
    checkSlugs: true,
  },
  {
    name: "Signals",
    file: "src/data/products/signals.ts",
    checkSlugs: true,
  },
  {
    name: "Research",
    file: "src/data/content/research.ts",
    checkSlugs: true,
  },
  {
    name: "Videos",
    file: "src/data/content/videos.ts",
    checkSlugs: true,
  },
  {
    name: "Verification",
    file: "src/data/content/verification.ts",
    checkSlugs: true,
  },
  {
    name: "Assets",
    file: "src/data/assets.ts",
    checkSlugs: false,
  },
];

const productionDataFiles = [
  "src/data/assets.ts",
  "src/data/ledger/account.ts",
  "src/data/ledger/entries.ts",
  "src/data/products/system-families.ts",
  "src/data/products/systems.ts",
  "src/data/products/indicators.ts",
  "src/data/products/signals.ts",
  "src/data/content/research.ts",
  "src/data/content/videos.ts",
  "src/data/content/verification.ts",
];

const suspiciousKeyPattern =
  /\b(password|passwd|secret|apiKey|api_key|token|investorPassword|tradingPassword)\s*:/i;

const readProjectFile = (projectPath) =>
  readFileSync(path.join(root, projectPath), "utf8");

const literalValuesForKey = (source, key) =>
  [...source.matchAll(new RegExp(`\\b${key}:\\s*"([^"]+)"`, "g"))].map(
    (match) => match[1],
  );

const literalArrayValuesForKey = (source, key) =>
  [...source.matchAll(new RegExp(`\\b${key}:\\s*\\[([\\s\\S]*?)\\]`, "g"))].map(
    ([, block]) => [...block.matchAll(/"([^"]+)"/g)].map((match) => match[1]),
  );

const findDuplicates = (values) => {
  const seen = new Set();
  const duplicates = new Set();

  for (const value of values) {
    if (seen.has(value)) {
      duplicates.add(value);
    }

    seen.add(value);
  }

  return [...duplicates];
};

const failures = [];

for (const domain of domains) {
  const source = readProjectFile(domain.file);
  const duplicateIds = findDuplicates(literalValuesForKey(source, "id"));

  if (duplicateIds.length) {
    failures.push(`${domain.name} duplicate IDs: ${duplicateIds.join(", ")}`);
  }

  if (domain.checkSlugs) {
    const duplicateSlugs = findDuplicates(literalValuesForKey(source, "slug"));

    if (duplicateSlugs.length) {
      failures.push(
        `${domain.name} duplicate slugs: ${duplicateSlugs.join(", ")}`,
      );
    }
  }
}

for (const projectPath of productionDataFiles) {
  const source = readProjectFile(projectPath);

  if (suspiciousKeyPattern.test(source)) {
    failures.push(`${projectPath} contains a credential-like property key.`);
  }
}

const systemsSource = readProjectFile("src/data/products/systems.ts");
const systemFamiliesSource = readProjectFile(
  "src/data/products/system-families.ts",
);
const productsSelectorSource = readProjectFile(
  "src/data/selectors/products.ts",
);
const systemCapabilityValues = [
  ...new Set(
    [...systemsSource.matchAll(/capabilities:\s*\[([\s\S]*?)\]/g)].flatMap(
      ([, capabilityBlock]) =>
        [...capabilityBlock.matchAll(/"([^"]+)"/g)].map((match) => match[1]),
    ),
  ),
];
const unmappedSystemCapabilities = systemCapabilityValues.filter(
  (capability) => !productsSelectorSource.includes(`"${capability}"`),
);

if (unmappedSystemCapabilities.length) {
  failures.push(
    `Systems capabilities missing selector presentation mapping: ${unmappedSystemCapabilities.join(", ")}`,
  );
}

const systemIds = literalValuesForKey(systemsSource, "id");
const familyIds = literalValuesForKey(systemFamiliesSource, "id");
const currentFamilyId = "emerald-quant-system-family";
const currentSystemId = "emerald-quant-system";
const currentFamilyIndex = familyIds.indexOf(currentFamilyId);
const currentSystemIndex = systemIds.indexOf(currentSystemId);
const familyConfigurationIds =
  literalArrayValuesForKey(systemFamiliesSource, "configurationIds")[
    currentFamilyIndex
  ] ?? [];
const familyMarketCategories =
  literalArrayValuesForKey(systemFamiliesSource, "marketCategories")[
    currentFamilyIndex
  ] ?? [];
const systemFamilyIds = literalValuesForKey(systemsSource, "familyId");
const systemConfigurationKeys = literalValuesForKey(
  systemsSource,
  "configurationKey",
);
const systemConfigurationNames = literalValuesForKey(
  systemsSource,
  "configurationName",
);
const systemMarketCategories =
  literalArrayValuesForKey(systemsSource, "marketCategories")[
    currentSystemIndex
  ] ?? [];
const systemInstruments =
  literalArrayValuesForKey(systemsSource, "instruments")[currentSystemIndex] ??
  [];
const systemPlatforms =
  literalArrayValuesForKey(systemsSource, "platforms")[currentSystemIndex] ??
  [];
const requiredFamilyMarkets = ["metals", "forex", "futures", "equities"];

for (const configurationId of familyConfigurationIds) {
  if (!systemIds.includes(configurationId)) {
    failures.push(
      `${currentFamilyId} references unknown system configuration "${configurationId}".`,
    );
  }
}

for (const familyId of systemFamilyIds) {
  if (!familyIds.includes(familyId)) {
    failures.push(
      `System configuration references unknown family "${familyId}".`,
    );
  }
}

if (!familyConfigurationIds.includes(currentSystemId)) {
  failures.push(`${currentFamilyId} must include ${currentSystemId}.`);
}

if (systemFamilyIds[currentSystemIndex] !== currentFamilyId) {
  failures.push(`${currentSystemId} must reference ${currentFamilyId}.`);
}

for (const market of requiredFamilyMarkets) {
  if (!familyMarketCategories.includes(market)) {
    failures.push(`${currentFamilyId} is missing market coverage "${market}".`);
  }
}

const unsupportedCurrentMarkets = systemMarketCategories.filter((market) =>
  ["forex", "futures", "equities"].includes(market),
);

if (
  systemMarketCategories.length !== 1 ||
  systemMarketCategories[0] !== "metals" ||
  unsupportedCurrentMarkets.length
) {
  failures.push(`${currentSystemId} must remain scoped only to metals.`);
}

if (systemInstruments.length !== 1 || systemInstruments[0] !== "XAUUSD") {
  failures.push(`${currentSystemId} must remain scoped to XAUUSD.`);
}

if (systemPlatforms.length !== 1 || systemPlatforms[0] !== "MT4") {
  failures.push(`${currentSystemId} must remain scoped to MT4.`);
}

if (
  systemConfigurationKeys[currentSystemIndex] !== "metals-xauusd" ||
  systemConfigurationNames[currentSystemIndex] !== "Metals / XAUUSD"
) {
  failures.push(
    `${currentSystemId} must keep the Metals / XAUUSD configuration identity.`,
  );
}

const configurationKeysByFamily = new Map();

for (const [index, familyId] of systemFamilyIds.entries()) {
  const configurationKey = systemConfigurationKeys[index];
  const existingKeys = configurationKeysByFamily.get(familyId) ?? new Set();

  if (existingKeys.has(configurationKey)) {
    failures.push(
      `Duplicate configurationKey "${configurationKey}" within family "${familyId}".`,
    );
  }

  existingKeys.add(configurationKey);
  configurationKeysByFamily.set(familyId, existingKeys);
}

if (/performanceRecordIds\s*:/.test(systemFamiliesSource)) {
  failures.push("System family records must not contain performanceRecordIds.");
}

if (
  !/performanceRecordIds\s*:\s*ledgerPerformanceRecordIds/.test(systemsSource)
) {
  failures.push(
    `${currentSystemId} must retain configuration-specific Ledger performance relationships.`,
  );
}

console.log("Data source text audit");
console.log(`Domains checked: ${domains.length}`);
console.log(`Production data files scanned: ${productionDataFiles.length}`);
console.log(
  `System capability mappings checked: ${systemCapabilityValues.length}`,
);
console.log(
  `System family configuration links checked: ${familyConfigurationIds.length}`,
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
    "No duplicate domain IDs, duplicate route slugs, or credential-like production data keys found.",
  );
}
