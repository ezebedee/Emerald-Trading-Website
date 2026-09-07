import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import type { ImageAsset } from "@/types/assets";

type IndicatorImageFrameProps = Readonly<{
  asset: ImageAsset;
  caption: string;
  priority?: boolean;
}>;

export function IndicatorImageFrame({
  asset,
  caption,
  priority = false,
}: IndicatorImageFrameProps) {
  return (
    <figure className="surface-data overflow-hidden rounded-lg">
      <div className="border-b border-[var(--border)] bg-black/20 px-4 py-3">
        <Badge variant="neutral">{caption}</Badge>
      </div>
      <Image
        src={asset.src}
        alt={asset.alt}
        width={asset.width}
        height={asset.height}
        sizes="(min-width: 1024px) 50vw, 100vw"
        priority={priority}
        className="h-auto w-full"
      />
    </figure>
  );
}
