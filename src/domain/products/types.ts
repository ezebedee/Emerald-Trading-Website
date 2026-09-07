import type {
  AssetReferenceId,
  ContentStatus,
  ReadableId,
  Slug,
  Visibility,
} from "../common";
import type { PlatformId } from "../platforms";

export const PRODUCT_ACCESS_MODELS = [
  "public-subscription",
  "private-investor",
  "internal",
  "research",
] as const;
export type ProductAccessModel = (typeof PRODUCT_ACCESS_MODELS)[number];

export const PRODUCT_LAYERS = [
  "analysis-signal",
  "monitoring-scanning",
  "assisted-execution",
  "automated-execution",
] as const;
export type ProductLayer = (typeof PRODUCT_LAYERS)[number];

export const PRODUCT_RELATIONSHIP_TYPES = [
  "generates-signals",
  "consumes-signals",
  "monitors-signals",
  "assisted-execution",
  "automated-execution",
  "related-product",
] as const;
export type ProductRelationshipType =
  (typeof PRODUCT_RELATIONSHIP_TYPES)[number];

export const PLATFORM_AVAILABILITY_STATUSES = ["available"] as const;
export type PlatformAvailabilityStatus =
  (typeof PLATFORM_AVAILABILITY_STATUSES)[number];

export const PLATFORM_DOCUMENTATION_STATUSES = [
  "planned",
  "draft",
  "published",
] as const;
export type PlatformDocumentationStatus =
  (typeof PLATFORM_DOCUMENTATION_STATUSES)[number];

export const PRODUCT_PLATFORM_CAPABILITY_IDS = [
  "standard-platform-implementation",
  "custom-high-resolution-chart-builder",
  "native-high-resolution-chart-workflow",
  "scanner-finescalp-high-resolution-support",
  "trader-first-entry-recovery-workflow",
] as const;
export type ProductPlatformCapabilityId =
  (typeof PRODUCT_PLATFORM_CAPABILITY_IDS)[number];

export type TradingProductDefinition = Readonly<{
  id: ReadableId;
  slug: Slug;
  name: string;
  shortName?: string;
  description: string;
  role: string;
  productLayer: ProductLayer;
  accessModel: ProductAccessModel;
  visibility: Visibility;
  contentStatus: ContentStatus;
  supportedPlatformIds: readonly PlatformId[];
  capabilityIds?: readonly ReadableId[];
  signalModuleIds?: readonly ReadableId[];
  relatedProductIds?: readonly ReadableId[];
  specializedRecordIds?: readonly ReadableId[];
  assetIds?: readonly AssetReferenceId[];
  tags?: readonly string[];
  notes?: string;
}>;

export type ProductRelationship = Readonly<{
  id: ReadableId;
  sourceProductId: ReadableId;
  targetProductId: ReadableId;
  relationshipType: ProductRelationshipType;
  description: string;
}>;

export type ProductPlatformImplementation = Readonly<{
  id: ReadableId;
  productId: ReadableId;
  platformId: PlatformId;
  availability: PlatformAvailabilityStatus;
  accessModel: ProductAccessModel;
  capabilityIds: readonly ProductPlatformCapabilityId[];
  documentationStatus: PlatformDocumentationStatus;
  implementationNotes?: string;
  assetIds?: readonly AssetReferenceId[];
}>;
