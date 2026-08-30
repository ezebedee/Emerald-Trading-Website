import type {
  AssetReferenceId,
  ContentStatus,
  ISODateString,
  MarketCategory,
  ReadableId,
  Slug,
  Visibility,
} from "../common/types";

export type ResearchItem = Readonly<{
  id: ReadableId;
  slug: Slug;
  title: string;
  summary: string;
  status: ContentStatus;
  visibility: Visibility;
  publishedDate?: ISODateString;
  markets?: readonly MarketCategory[];
  documentAssetId?: AssetReferenceId;
  thumbnailAssetId?: AssetReferenceId;
  relatedSystemIds?: readonly ReadableId[];
  notes?: string;
}>;
