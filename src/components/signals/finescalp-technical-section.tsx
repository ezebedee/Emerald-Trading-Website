import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { IndicatorImageFrame } from "@/components/indicators/indicator-image-frame";
import type { SignalModule } from "@/domain";
import type { ImageAsset } from "@/types/assets";

type FineScalpTechnicalSectionProps = Readonly<{
  module: SignalModule;
  asset?: ImageAsset;
}>;

const workflowSteps = [
  "Underlying Market Instrument",
  "Tick or Seconds Mode",
  "User-Defined Aggregation",
  "EL-Prefixed Custom Chart",
  "FineScalp Signal Context",
] as const;

export function FineScalpTechnicalSection({
  module,
  asset,
}: FineScalpTechnicalSectionProps) {
  return (
    <section
      id={module.slug}
      className="scroll-anchor bg-surface-soft/25 py-14 md:py-16 xl:py-20"
    >
      <Container size="wide">
        <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="positive">Primary</Badge>
              <Badge variant="premium">Highest Resolution</Badge>
              <Badge variant="neutral">MT4 Example</Badge>
            </div>
            <h2 className="text-foreground md:type-heading-2 mt-4 text-[1.55rem] leading-[1.12] font-semibold text-balance break-words">
              FineScalp
            </h2>
            <p className="type-body text-muted-foreground mt-5">
              FineScalp is designed for tick and seconds-chart analysis. On MT4
              and MT5, Emerald can generate custom high-resolution charts from
              the underlying instrument; TradingView and NinjaTrader use native
              high-resolution chart capability where available.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <article className="surface-elevated rounded-lg p-4">
                <Badge variant="premium">Tick Mode</Badge>
                <p className="text-muted-foreground mt-3 text-sm leading-6">
                  Aggregation interval 5 means each generated candle contains 5
                  ticks.
                </p>
              </article>
              <article className="surface-elevated rounded-lg p-4">
                <Badge variant="premium">Seconds Mode</Badge>
                <p className="text-muted-foreground mt-3 text-sm leading-6">
                  Aggregation interval 5 means each generated candle represents
                  5 seconds.
                </p>
              </article>
            </div>
            <p className="text-muted-foreground mt-5 text-sm leading-6">
              An EL-prefixed custom/offline chart is derived from the underlying
              market instrument. It is workflow context, not a separate
              financial instrument.
            </p>
          </div>
          <div className="surface-data rounded-lg p-5 md:p-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="neutral">MetaTrader Workflow</Badge>
              <Badge variant="positive">Tick / Seconds</Badge>
            </div>
            <ol className="mt-6 grid gap-3">
              {workflowSteps.map((step, index) => (
                <li
                  key={step}
                  className="bg-surface-elevated/90 flex items-center gap-4 rounded-md border border-[var(--border-strong)] p-4"
                >
                  <span className="numeric text-gold-warm flex size-8 shrink-0 items-center justify-center rounded-full border border-[var(--border-gold)] text-sm font-semibold">
                    {index + 1}
                  </span>
                  <span className="text-foreground text-sm font-semibold">
                    {step}
                  </span>
                  {index < workflowSteps.length - 1 ? (
                    <ArrowRight
                      aria-hidden="true"
                      className="text-muted-foreground ml-auto hidden size-4 sm:block"
                    />
                  ) : null}
                </li>
              ))}
            </ol>
            {asset ? (
              <div className="mt-6">
                <IndicatorImageFrame
                  asset={asset}
                  caption="FineScalp - MT4 custom/offline chart example"
                  loading="lazy"
                  sizes="(min-width: 1024px) 48vw, 100vw"
                />
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
