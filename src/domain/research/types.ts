import type {
  AssetReferenceId,
  ContentStatus,
  ReadableId,
  Slug,
  Visibility,
} from "../common/types";

export const RESEARCH_PUBLICATION_STATUSES = [
  "draft",
  "submitted",
  "under-review",
  "accepted",
  "published",
  "archived",
] as const;
export type ResearchPublicationStatus =
  (typeof RESEARCH_PUBLICATION_STATUSES)[number];

export const RESEARCH_TYPES = [
  "journal-article",
  "conference-paper",
  "technical-report",
  "research-note",
  "methodology",
  "case-study",
  "other",
] as const;
export type ResearchType = (typeof RESEARCH_TYPES)[number];

export type ResearchItem = Readonly<{
  id: ReadableId;
  slug: Slug;
  title: string;
  shortTitle?: string;
  summary: string;
  researchType: ResearchType;
  publicationStatus: ResearchPublicationStatus;
  contentStatus: ContentStatus;
  visibility: Visibility;
  authors?: readonly string[];
  venue?: string;
  publicationYear?: number;
  doi?: string;
  publisherUrl?: string;
  externalUrl?: string;
  documentAssetId?: AssetReferenceId;
  thumbnailAssetId?: AssetReferenceId;
  relatedSystemIds?: readonly ReadableId[];
  relatedIndicatorIds?: readonly ReadableId[];
  relatedSignalIds?: readonly ReadableId[];
  tags?: readonly string[];
  notes?: string;
}>;
