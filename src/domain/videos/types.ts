import type {
  AssetReferenceId,
  ContentStatus,
  ISODateTimeString,
  ReadableId,
  Slug,
  Visibility,
} from "../common/types";

export const VIDEO_PLATFORMS = [
  "youtube",
  "vimeo",
  "internal",
  "other",
] as const;
export type VideoPlatform = (typeof VIDEO_PLATFORMS)[number];

export type VideoRecord = Readonly<{
  id: ReadableId;
  slug: Slug;
  title: string;
  description: string;
  contentStatus: ContentStatus;
  visibility: Visibility;
  videoPlatform: VideoPlatform;
  externalVideoId?: string;
  externalUrl?: string;
  thumbnailAssetId?: AssetReferenceId;
  posterAssetId?: AssetReferenceId;
  publishedAt?: ISODateTimeString;
  durationSeconds?: number;
  relatedLedgerEntryIds?: readonly ReadableId[];
  relatedSystemIds?: readonly ReadableId[];
  relatedIndicatorIds?: readonly ReadableId[];
  relatedSignalIds?: readonly ReadableId[];
  tags?: readonly string[];
  notes?: string;
}>;
