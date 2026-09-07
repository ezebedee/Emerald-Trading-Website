import { ArrowRight } from "lucide-react";

import { IndicatorImageFrame } from "@/components/indicators/indicator-image-frame";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import type { TradingProductDefinition } from "@/domain";
import type { ImageAsset } from "@/types/assets";

type IndicatorsHeroProps = Readonly<{
  product?: TradingProductDefinition;
  heroAsset?: ImageAsset;
}>;

const formatAccessModel = (accessModel?: string) =>
  accessModel === "public-subscription"
    ? "Public Subscription"
    : "Access Model Pending";

export function IndicatorsHero({ product, heroAsset }: IndicatorsHeroProps) {
  return (
    <section className="border-b border-[var(--border)] py-14 md:py-18 xl:py-24">
      <Container size="wide">
        <div className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr] xl:gap-12">
          <div className="max-w-4xl">
            <SectionLabel variant="gold">Signal & Analysis Layer</SectionLabel>
            <h1 className="type-display text-foreground mt-5 text-balance">
              {product?.name ?? "Emerald Legacy System"}
            </h1>
            <p className="text-gold-warm mt-5 text-lg font-semibold">
              {product?.role ?? "Unified Multi-Signal Indicator"}
            </p>
            <p className="type-body text-muted-foreground mt-5 max-w-3xl">
              One configurable indicator framework combines multiple Emerald
              signal engines into a single product across MT4, MT5, TradingView,
              and NinjaTrader.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Badge variant="premium">
                {formatAccessModel(product?.accessModel)}
              </Badge>
              <Badge variant="neutral">Multi-Instrument</Badge>
              <Badge variant="positive">Signal Framework</Badge>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LinkButton
                href="/signals"
                size="lg"
                trailingIcon={<ArrowRight aria-hidden="true" />}
              >
                Explore Signal Library
              </LinkButton>
              <LinkButton
                href="/signal-scanner"
                variant="secondary"
                size="lg"
                trailingIcon={<ArrowRight aria-hidden="true" />}
              >
                View Signal Scanner
              </LinkButton>
            </div>
          </div>
          {heroAsset ? (
            <IndicatorImageFrame
              asset={heroAsset}
              caption="Emerald Legacy System - MT4 implementation"
              priority
            />
          ) : (
            <div className="surface-elevated rounded-lg p-5 md:p-6">
              <Badge variant="neutral">Product Visual Pending</Badge>
              <p className="text-muted-foreground mt-4 text-sm leading-6">
                Approved Emerald Legacy System media can be added here through
                the asset registry when available.
              </p>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
