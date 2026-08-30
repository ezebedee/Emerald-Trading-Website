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

console.log("Data source text audit");
console.log(`Domains checked: ${domains.length}`);
console.log(`Production data files scanned: ${productionDataFiles.length}`);

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
