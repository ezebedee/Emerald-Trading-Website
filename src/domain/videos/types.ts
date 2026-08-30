import type {
  AssetReferenceId,
  ContentStatus,
  ISODateString,
  ReadableId,
  Slug,
  VideoReferenceId,
  Visibility,
} from "../common/types";

export type VideoRecord = Readonly<{
  id: VideoReferenceId;
  slug: Slug;
  title: string;
  summary: string;
  status: ContentStatus;
  visibility: Visibility;
  publishedDate?: ISODateString;
  youtubeReferenceId?: VideoReferenceId;
  posterAssetId?: AssetReferenceId;
  relatedLedgerEntryIds?: readonly ReadableId[];
  relatedSystemIds?: readonly ReadableId[];
  notes?: string;
}>;
