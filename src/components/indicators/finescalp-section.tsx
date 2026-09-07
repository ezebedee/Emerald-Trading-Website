import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

const workflowSteps = [
  "Live Market Feed",
  "Tick / Seconds Mode",
  "User-Defined Aggregation",
  "Custom High-Resolution Chart",
  "FineScalp Signal",
] as const;

export function FineScalpSection() {
  return (
    <section className="bg-surface-soft/25 py-14 md:py-16 xl:py-20">
      <Container size="wide">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <SectionLabel variant="gold">
              FineScalp High-Resolution Analysis
            </SectionLabel>
            <h2 className="type-heading-2 text-foreground mt-4 text-balance">
              Beyond ordinary one-minute chart context on MetaTrader.
            </h2>
            <p className="type-body text-muted-foreground mt-5">
              FineScalp is designed for high-resolution tick and seconds-chart
              signal analysis. On MT4 and MT5, Emerald can build a custom
              high-resolution chart from the underlying market instrument before
              FineScalp signals are calculated and plotted.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <article className="surface-elevated rounded-lg p-4">
                <Badge variant="premium">Tick Mode</Badge>
                <p className="text-muted-foreground mt-3 text-sm leading-6">
                  Tick mode with aggregation interval 5 creates candles composed
                  of five ticks.
                </p>
              </article>
              <article className="surface-elevated rounded-lg p-4">
                <Badge variant="premium">Seconds Mode</Badge>
                <p className="text-muted-foreground mt-3 text-sm leading-6">
                  Seconds mode with aggregation interval 5 creates five-second
                  candles.
                </p>
              </article>
            </div>
            <p className="text-muted-foreground mt-5 text-sm leading-6">
              TradingView and NinjaTrader implementations should use native
              high-resolution chart capability where available; MetaTrader
              offline/custom-chart mechanics are not implied for those
              platforms.
            </p>
          </div>
          <div className="surface-data rounded-lg p-5 md:p-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="neutral">Conceptual Workflow</Badge>
              <Badge variant="positive">MetaTrader Custom Chart Path</Badge>
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
            <div className="mt-6 rounded-md border border-dashed border-[var(--border-gold)] p-4">
              <p className="type-label text-gold-warm">
                FineScalp screenshot slot
              </p>
              <p className="text-muted-foreground mt-3 text-sm leading-6">
                The real FineScalp custom offline-chart screenshot can be added
                here after a processed asset ID is supplied. The current page
                does not display fabricated platform UI.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
