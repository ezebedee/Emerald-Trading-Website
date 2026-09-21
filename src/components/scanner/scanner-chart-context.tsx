import { Crosshair, Eye, Goal, PanelTop } from "lucide-react";

import { ScannerProductImage } from "@/components/scanner/scanner-product-image";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import type { ImageAsset } from "@/types/assets";

const chartContextCallouts = [
  {
    title: "Signal Origin",
    icon: Crosshair,
    copy: "Arrow identifies the signal candle.",
  },
  {
    title: "Time Marker",
    icon: PanelTop,
    copy: "Vertical marker helps locate when the signal occurred.",
  },
  {
    title: "TP Reference",
    icon: Goal,
    copy: "Green target line provides a take-profit suggestion/reference.",
  },
  {
    title: "Configured Template",
    icon: Eye,
    copy: "View may open the chart using the user's configured chart template.",
  },
] as const;

type ScannerChartContextProps = Readonly<{
  asset?: ImageAsset;
}>;

export function ScannerChartContext({ asset }: ScannerChartContextProps) {
  return (
    <section
      id="chart-context"
      className="scroll-anchor py-14 md:py-16 xl:py-20"
    >
      <Container size="wide">
        <div className="grid gap-8 xl:grid-cols-[0.7fr_1.3fr] xl:items-center">
          <div>
            <SectionLabel variant="gold">Stage 4 - Open & Review</SectionLabel>
            <h2 className="type-heading-2 text-foreground mt-4 text-balance">
              Open the Signal in Chart Context
            </h2>
            <p className="type-body text-muted-foreground mt-5">
              Selecting View from a Scanner result opens the chart associated
              with that result so the user can inspect the signal inside the
              surrounding price structure. View means open and review chart
              context; it does not execute a trade, open a position, accept a
              signal, or place a market order.
            </p>
            <p className="text-muted-foreground mt-5 text-sm leading-6">
              On MT4 evidence, the chart may show the signal arrow on the
              originating candle, a vertical marker near the signal point, and a
              Take-Profit Reference. When a configured chart template is set in
              Scanner settings, View may open the chart with that configured
              chart template applied.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {chartContextCallouts.map(({ title, icon: Icon, copy }) => (
                <article
                  key={title}
                  className="surface-elevated rounded-lg p-4"
                >
                  <Icon aria-hidden="true" className="text-gold-warm size-5" />
                  <h3 className="text-foreground mt-3 text-base font-semibold">
                    {title}
                  </h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-6">
                    {copy}
                  </p>
                </article>
              ))}
            </div>
          </div>
          <ScannerProductImage
            asset={asset}
            caption="Chart Context & Fresh-Signal Alert - MT4"
            sizes="(min-width: 1280px) 64vw, (min-width: 1024px) 58vw, 100vw"
          />
        </div>
      </Container>
    </section>
  );
}
