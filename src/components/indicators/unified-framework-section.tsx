import { Layers3, Settings2, SlidersHorizontal } from "lucide-react";

import { IndicatorImageFrame } from "@/components/indicators/indicator-image-frame";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import type { ImageAsset } from "@/types/assets";

const frameworkPoints = [
  {
    label: "One Product",
    description:
      "Signal modules live inside a shared Emerald Legacy System framework rather than requiring separate product surfaces.",
    icon: Layers3,
  },
  {
    label: "Configurable Visibility",
    description:
      "A user can choose which signal modules are relevant to their workflow without implying every module must be enabled together.",
    icon: SlidersHorizontal,
  },
  {
    label: "Extensible Structure",
    description:
      "The same framework can support future signal refinements and platform-specific improvements after review.",
    icon: Settings2,
  },
] as const;

type UnifiedFrameworkSectionProps = Readonly<{
  settingsAsset?: ImageAsset;
}>;

export function UnifiedFrameworkSection({
  settingsAsset,
}: UnifiedFrameworkSectionProps) {
  return (
    <section className="bg-surface-soft/25 py-14 md:py-16 xl:py-20">
      <Container size="wide">
        <div className="max-w-3xl">
          <SectionLabel variant="gold">
            Unified Multi-Signal Framework
          </SectionLabel>
          <h2 className="type-heading-2 text-foreground mt-4 text-balance">
            One indicator framework for multiple Emerald signal modules.
          </h2>
          <p className="type-body text-muted-foreground mt-5">
            Instead of installing and managing a separate indicator for each
            signal type, Emerald Legacy System organizes the signal framework
            into one configurable product interface.
          </p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {frameworkPoints.map((point) => {
            const Icon = point.icon;

            return (
              <article
                key={point.label}
                className="surface-elevated rounded-lg p-5 md:p-6"
              >
                <Icon aria-hidden="true" className="text-gold-warm size-5" />
                <h3 className="text-foreground mt-4 text-lg font-semibold">
                  {point.label}
                </h3>
                <p className="text-muted-foreground mt-3 text-sm leading-6">
                  {point.description}
                </p>
              </article>
            );
          })}
        </div>
        {settingsAsset ? (
          <div className="mt-8">
            <IndicatorImageFrame
              asset={settingsAsset}
              caption="MT4 settings/input panel"
              loading="eager"
              sizes="(min-width: 1024px) 88vw, 100vw"
            />
          </div>
        ) : (
          <aside className="surface-premium mt-8 rounded-lg p-5 md:p-6">
            <Badge variant="premium">Settings Visual</Badge>
            <p className="text-muted-foreground mt-4 text-sm leading-6">
              MT4 Inputs media is managed through the asset registry.
            </p>
          </aside>
        )}
      </Container>
    </section>
  );
}
