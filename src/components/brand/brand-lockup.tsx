import Image from "next/image";
import { brandAssets } from "@/data/assets";
import { siteBrand } from "@/data/site";
import { cn } from "@/lib/utils";

const brandLockupVariants = {
  header: {
    root: "gap-2.5 sm:gap-3",
    mark: "size-9 sm:size-10 xl:size-11",
    wordmark: "text-sm",
    descriptor: "hidden",
    sizes: "(min-width: 1280px) 44px, (min-width: 640px) 40px, 36px",
  },
  footer: {
    root: "gap-3",
    mark: "size-11",
    wordmark: "text-sm",
    descriptor: "mt-1 text-[0.62rem]",
    sizes: "44px",
  },
} as const;

export type BrandLockupProps = Readonly<{
  variant?: keyof typeof brandLockupVariants;
  className?: string;
  priority?: boolean;
  showDescriptor?: boolean;
}>;

export function BrandLockup({
  variant = "header",
  className,
  priority = false,
  showDescriptor = false,
}: BrandLockupProps) {
  const styles = brandLockupVariants[variant];

  return (
    <span className={cn("inline-flex items-center", styles.root, className)}>
      <span
        aria-hidden="true"
        className={cn(
          "bg-surface-elevated relative shrink-0 overflow-hidden rounded-full border border-[var(--border-gold)]",
          styles.mark,
        )}
      >
        <Image
          src={brandAssets.signatureMark.src}
          alt=""
          width={44}
          height={44}
          sizes={styles.sizes}
          priority={priority}
          className="h-full w-full object-cover"
        />
      </span>
      <span className="flex min-w-0 flex-col leading-none">
        <span className={cn("font-semibold", styles.wordmark)}>
          {siteBrand.shortName.toUpperCase()}
        </span>
        <span className="text-gold-muted mt-1 text-[0.66rem] font-semibold tracking-[0.14em] sm:text-[0.68rem] sm:tracking-[0.16em]">
          LEGACY SYSTEMS
        </span>
        {showDescriptor ? (
          <span
            className={cn(
              "text-subtle-foreground font-semibold tracking-[0.14em] uppercase",
              styles.descriptor,
            )}
          >
            {siteBrand.descriptor}
          </span>
        ) : null}
      </span>
    </span>
  );
}
