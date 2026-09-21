import { IndicatorImageFrame } from "@/components/indicators/indicator-image-frame";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import type { SignalsPageAssetMap } from "@/data/selectors";
import type { ImageAsset } from "@/types/assets";

type SameMarketComparisonProps = Readonly<{
  assets: SignalsPageAssetMap;
}>;

const comparisonAssetOrder = [
  ["scalp", "Scalp"] as const,
  ["range", "Range"] as const,
  ["harmonizer", "Harmonizer"] as const,
  ["harmonizerSafe", "Harmonizer + SAFE"] as const,
];

type ComparisonAsset = Readonly<{
  asset: ImageAsset;
  label: string;
  caption: string;
}>;

export function SameMarketComparison({ assets }: SameMarketComparisonProps) {
  const comparisonAssets = comparisonAssetOrder.reduce<ComparisonAsset[]>(
    (items, [key, label]) => {
      const asset = assets[key] as ImageAsset | undefined;

      if (asset) {
        items.push({
          asset,
          label,
          caption: `${label} - same-market MT4 chart`,
        });
      }

      return items;
    },
    [],
  );

  return (
    <section
      id="same-market-comparison"
      className="scroll-anchor py-14 md:py-16 xl:py-20"
    >
      <Container size="wide">
        <div className="surface-data rounded-lg p-5 md:p-6">
          <SectionLabel variant="gold">
            Different Signal Engines. The Same Market.
          </SectionLabel>
          <h2 className="text-foreground md:type-heading-2 mt-4 max-w-4xl text-[1.55rem] leading-[1.12] font-semibold text-balance break-words">
            One market structure can produce different signal perspectives.
          </h2>
          <p className="type-body text-muted-foreground mt-5 max-w-4xl">
            Different signal modules can identify different analytical contexts
            on the same underlying market structure. This is not a performance,
            profitability, accuracy, win-rate, or backtest comparison.
          </p>
          {comparisonAssets.length > 0 ? (
            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              {comparisonAssets.map((item) => (
                <article key={item.asset.id}>
                  <h3 className="type-label text-gold-warm mb-3">
                    {item.label}
                  </h3>
                  <IndicatorImageFrame
                    asset={item.asset}
                    caption={item.caption}
                    loading="lazy"
                    sizes="(min-width: 1024px) 44vw, 100vw"
                  />
                </article>
              ))}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
