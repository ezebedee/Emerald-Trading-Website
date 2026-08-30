import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const publicDir = path.join(root, "public");
const manifestPath = path.join(root, "src", "data", "assets.ts");

const auditedRoots = [
  "brand",
  "images",
  "social",
  "video",
  "documents",
  "icons",
].map((segment) => path.join(publicDir, segment));

const mediaExtensions = new Set([
  ".avif",
  ".gif",
  ".ico",
  ".jpeg",
  ".jpg",
  ".pdf",
  ".png",
  ".svg",
  ".webp",
  ".mp4",
  ".mov",
  ".mkv",
]);

const formatBytes = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
};

const toPublicPath = (absolutePath) =>
  `/${path.relative(publicDir, absolutePath).replaceAll(path.sep, "/")}`;

const walkFiles = (directory) => {
  if (!existsSync(directory)) return [];

  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return walkFiles(entryPath);
    return [entryPath];
  });
};

const manifestSource = readFileSync(manifestPath, "utf8");
const manifestRefs = new Set(
  [...manifestSource.matchAll(/\b(?:src|href):\s*"([^"]+)"/g)]
    .map((match) => match[1])
    .filter((value) => value.startsWith("/")),
);

const publicMedia = auditedRoots
  .flatMap(walkFiles)
  .filter((filePath) =>
    mediaExtensions.has(path.extname(filePath).toLowerCase()),
  )
  .filter((filePath) => path.basename(filePath) !== ".gitkeep");

const publicPaths = new Set(publicMedia.map(toPublicPath));
const missingManifestFiles = [...manifestRefs].filter(
  (ref) => !existsSync(path.join(publicDir, ref.slice(1))),
);
const orphanMedia = [...publicPaths].filter((ref) => !manifestRefs.has(ref));

const hashes = new Map();
for (const filePath of publicMedia) {
  const hash = createHash("sha256")
    .update(readFileSync(filePath))
    .digest("hex");
  const files = hashes.get(hash) ?? [];
  files.push(toPublicPath(filePath));
  hashes.set(hash, files);
}

const duplicates = [...hashes.entries()]
  .map(([hash, files]) => ({ hash, files }))
  .filter((entry) => entry.files.length > 1);

const videoMasters = publicMedia.filter((filePath) =>
  [".mp4", ".mov", ".mkv"].includes(path.extname(filePath).toLowerCase()),
);

const sizeRows = publicMedia
  .map((filePath) => ({
    publicPath: toPublicPath(filePath),
    bytes: statSync(filePath).size,
  }))
  .sort((a, b) => b.bytes - a.bytes);

const totalBytes = sizeRows.reduce((sum, row) => sum + row.bytes, 0);

console.log("Asset audit");
console.log(`Manifest references: ${manifestRefs.size}`);
console.log(`Public media files: ${publicMedia.length}`);
console.log(`Total public media size: ${formatBytes(totalBytes)}`);
console.log("");

console.log("Size summary:");
for (const row of sizeRows) {
  const flags = [];
  if (row.bytes > 4 * 1024 * 1024) flags.push(">4MB");
  else if (row.bytes > 2 * 1024 * 1024) flags.push(">2MB");
  else if (row.bytes > 1024 * 1024) flags.push(">1MB");
  console.log(
    `- ${row.publicPath}: ${formatBytes(row.bytes)}${flags.length ? ` (${flags.join(", ")})` : ""}`,
  );
}
console.log("");

if (missingManifestFiles.length) {
  console.error("Missing manifest files:");
  for (const ref of missingManifestFiles) console.error(`- ${ref}`);
}

if (orphanMedia.length) {
  console.error("Orphan public media:");
  for (const ref of orphanMedia) console.error(`- ${ref}`);
}

if (duplicates.length) {
  console.error("Duplicate public media:");
  for (const duplicate of duplicates) {
    console.error(`- ${duplicate.hash}`);
    for (const ref of duplicate.files) console.error(`  - ${ref}`);
  }
}

if (videoMasters.length) {
  console.error("Large/raw video candidates found:");
  for (const filePath of videoMasters)
    console.error(`- ${toPublicPath(filePath)}`);
}

const hasFailures =
  missingManifestFiles.length ||
  orphanMedia.length ||
  duplicates.length ||
  videoMasters.length;

if (hasFailures) {
  process.exitCode = 1;
} else {
  console.log(
    "No missing manifest files, orphan media, duplicate media, or public video masters found.",
  );
}
