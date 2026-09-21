import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { IndicatorImageFrame } from "@/components/indicators/indicator-image-frame";
import type { SignalModule } from "@/domain";
import type { ImageAsset } from "@/types/assets";

import { getSignalModulePresentation } from "./signal-module-presentation";

type SignalModuleSectionProps = Readonly<{
  module: SignalModule;
  asset?: ImageAsset;
  variant?: "default" | "featured" | "premium";
  imagePriority?: boolean;
}>;

export function SignalModuleSection({
  module,
  asset,
  variant = "default",
  imagePriority = false,
}: SignalModuleSectionProps) {
  const presentation = getSignalModulePresentation(module);
  const isPremium = variant === "premium";
  const sectionClassName =
    variant === "featured"
      ? "bg-surface-soft/25 py-14 md:py-16 xl:py-20"
      : "py-14 md:py-16 xl:py-20";
  const contentClassName = isPremium ? "surface-premium" : "surface-elevated";

  return (
    <section id={module.slug} className={`${sectionClassName} scroll-anchor`}>
      <Container size="wide">
        <div
          className={`grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-center ${
            variant === "featured" ? "xl:grid-cols-[0.78fr_1.22fr]" : ""
          }`}
        >
          <article className={`${contentClassName} rounded-lg p-5 md:p-6`}>
            <div className="flex flex-wrap gap-2">
              <Badge variant={isPremium ? "premium" : "neutral"}>
                {module.role === "auxiliary" ? "Auxiliary" : "Primary"}
              </Badge>
              <Badge variant="neutral">{presentation.categoryLabel}</Badge>
              <Badge variant="neutral">MT4 Example</Badge>
            </div>
            <h2 className="text-foreground md:type-heading-2 mt-4 text-[1.55rem] leading-[1.12] font-semibold text-balance break-words">
              {module.name}
            </h2>
            <p className="text-gold-warm mt-4 text-sm font-semibold">
              {presentation.roleLabel}
            </p>
            <div className="mt-5 grid gap-4">
              <div>
                <h3 className="type-label text-subtle-foreground">
                  Trading Context
                </h3>
                <p className="text-muted-foreground mt-2 text-sm leading-6">
                  {presentation.purpose}
                </p>
              </div>
              <div>
                <h3 className="type-label text-subtle-foreground">
                  What Makes It Distinct
                </h3>
                <p className="text-muted-foreground mt-2 text-sm leading-6">
                  {presentation.distinction}
                </p>
              </div>
              <div>
                <h3 className="type-label text-subtle-foreground">
                  Conceptual Use
                </h3>
                <p className="text-muted-foreground mt-2 text-sm leading-6">
                  {presentation.concept}
                </p>
              </div>
            </div>
          </article>
          {asset ? (
            <IndicatorImageFrame
              asset={asset}
              caption={presentation.caption}
              priority={imagePriority}
              loading={imagePriority ? "eager" : "lazy"}
              sizes="(min-width: 1280px) 54vw, (min-width: 1024px) 50vw, 100vw"
            />
          ) : (
            <div className="surface-data rounded-lg p-5 md:p-6">
              <Badge variant="neutral">Visual Pending</Badge>
              <p className="text-muted-foreground mt-4 text-sm leading-6">
                Approved MT4 product evidence can be attached through the asset
                registry when available.
              </p>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
