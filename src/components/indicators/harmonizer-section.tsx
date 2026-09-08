import type { ReactNode } from "react";

import { IndicatorImageFrame } from "@/components/indicators/indicator-image-frame";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import type { ImageAsset } from "@/types/assets";

type HarmonizerSectionProps = Readonly<{
  scalpAsset?: ImageAsset;
  rangeAsset?: ImageAsset;
  harmonizerAsset?: ImageAsset;
  harmonizerSafeAsset?: ImageAsset;
}>;

function RelationshipNode({ children }: { children: ReactNode }) {
  return (
    <span className="bg-surface-elevated text-foreground inline-flex min-h-12 items-center justify-center rounded-md border border-[var(--border-strong)] px-4 text-sm font-semibold">
      {children}
    </span>
  );
}

export function HarmonizerSection({
  scalpAsset,
  rangeAsset,
  harmonizerAsset,
  harmonizerSafeAsset,
}: HarmonizerSectionProps) {
  const comparisonAssets = [
    scalpAsset
      ? {
          asset: scalpAsset,
          caption: "Scalp Signal - same-market MT4 chart",
        }
      : undefined,
    rangeAsset
      ? {
          asset: rangeAsset,
          caption: "Range Signal - same-market MT4 chart",
        }
      : undefined,
    harmonizerAsset
      ? {
          asset: harmonizerAsset,
          caption: "Harmonizer - same-market MT4 chart",
        }
      : undefined,
    harmonizerSafeAsset
      ? {
          asset: harmonizerSafeAsset,
          caption: "Harmonizer + SAFE - same-market MT4 chart",
        }
      : undefined,
  ].filter((item): item is { asset: ImageAsset; caption: string } =>
    Boolean(item),
  );

  return (
    <section className="py-14 md:py-16 xl:py-20">
      <Container size="wide">
        <div className="grid gap-8 lg:grid-cols-2">
          <article className="surface-elevated rounded-lg p-5 md:p-6">
            <SectionLabel variant="gold">Harmonizer</SectionLabel>
            <h2 className="type-heading-2 text-foreground mt-4 text-balance">
              Scalp and Range context synthesized into one primary module.
            </h2>
            <p className="type-body text-muted-foreground mt-5">
              Harmonizer combines Scalp Signal and Range Signal outputs inside
              the Emerald signal framework. The page shows the relationship at a
              conceptual level only; no mathematical combination logic is
              implied.
            </p>
            <div
              aria-label="Scalp Signal plus Range Signal leads to Harmonizer"
              className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <RelationshipNode>Scalp Signal</RelationshipNode>
              <span className="text-gold-warm text-xl font-semibold">+</span>
              <RelationshipNode>Range Signal</RelationshipNode>
              <span className="text-gold-warm text-xl font-semibold">=</span>
              <RelationshipNode>Harmonizer</RelationshipNode>
            </div>
            {harmonizerAsset ? (
              <div className="mt-6">
                <IndicatorImageFrame
                  asset={harmonizerAsset}
                  caption="Harmonizer - MT4 chart example"
                  loading="eager"
                  sizes="(min-width: 1024px) 44vw, 100vw"
                />
              </div>
            ) : null}
          </article>
          <article className="surface-premium rounded-lg p-5 md:p-6">
            <SectionLabel variant="gold">Harmonizer SAFE</SectionLabel>
            <h2 className="type-heading-2 text-foreground mt-4 text-balance">
              Optional auxiliary defensive context beside a preferred signal.
            </h2>
            <p className="type-body text-muted-foreground mt-5">
              Harmonizer SAFE is an auxiliary defensive and reversal signal that
              can help identify when a trader may want to close or exit an
              opposing position. It provides signal context only and does not
              itself guarantee an exit, place a stop order, or prevent losses.
            </p>
            <div
              aria-label="Preferred primary signal plus Harmonizer SAFE adds defensive context"
              className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <RelationshipNode>Preferred Primary Signal</RelationshipNode>
              <span className="text-gold-warm text-xl font-semibold">+</span>
              <RelationshipNode>Harmonizer SAFE</RelationshipNode>
              <span className="text-gold-warm text-xl font-semibold">=</span>
              <RelationshipNode>Defensive Context</RelationshipNode>
            </div>
            <div className="mt-6">
              <Badge variant="premium">Auxiliary Layer</Badge>
            </div>
            {harmonizerSafeAsset ? (
              <div className="mt-6">
                <IndicatorImageFrame
                  asset={harmonizerSafeAsset}
                  caption="Harmonizer + SAFE - MT4 chart example"
                  loading="eager"
                  sizes="(min-width: 1024px) 44vw, 100vw"
                />
              </div>
            ) : null}
          </article>
        </div>
        <article className="surface-data mt-8 rounded-lg p-5 md:p-6">
          <SectionLabel variant="gold">
            Different Signal Engines. The Same Market.
          </SectionLabel>
          <p className="text-muted-foreground mt-4 max-w-4xl text-sm leading-6">
            The sequence shows how different signal modules can produce
            different analytical outputs on the same market structure. It is not
            a performance, accuracy, win-rate, or profit comparison.
          </p>
          {comparisonAssets.length > 0 ? (
            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              {comparisonAssets.map((item) => (
                <IndicatorImageFrame
                  key={item.asset.id}
                  asset={item.asset}
                  caption={item.caption}
                  loading="eager"
                  sizes="(min-width: 1024px) 44vw, 100vw"
                />
              ))}
            </div>
          ) : null}
        </article>
      </Container>
    </section>
  );
}
