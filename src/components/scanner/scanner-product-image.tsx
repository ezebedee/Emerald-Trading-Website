import { Badge } from "@/components/ui/badge";
import { IndicatorImageFrame } from "@/components/indicators/indicator-image-frame";
import type { ImageAsset } from "@/types/assets";

type ScannerProductImageProps = Readonly<{
  asset?: ImageAsset;
  caption: string;
  priority?: boolean;
  sizes?: string;
}>;

export function ScannerProductImage({
  asset,
  caption,
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: ScannerProductImageProps) {
  if (!asset) {
    return (
      <figure className="surface-data rounded-lg p-5 md:p-6">
        <Badge variant="neutral">Visual Pending</Badge>
        <p className="text-muted-foreground mt-4 text-sm leading-6">
          Approved Scanner product evidence can be attached through the asset
          registry when available.
        </p>
      </figure>
    );
  }

  return (
    <IndicatorImageFrame
      asset={asset}
      caption={caption}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      sizes={sizes}
    />
  );
}
