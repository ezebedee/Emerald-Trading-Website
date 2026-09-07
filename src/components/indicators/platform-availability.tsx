import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import type { PlatformDefinition } from "@/domain";

type PlatformAvailabilityProps = Readonly<{
  platforms: readonly PlatformDefinition[];
}>;

export function PlatformAvailability({ platforms }: PlatformAvailabilityProps) {
  return (
    <section className="bg-surface-soft/25 py-14 md:py-16 xl:py-20">
      <Container size="wide">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionLabel variant="gold">Platform Availability</SectionLabel>
            <h2 className="type-heading-2 text-foreground mt-4 text-balance">
              Supported across four trading-platform environments.
            </h2>
            <p className="type-body text-muted-foreground mt-5">
              Emerald Legacy System is modeled across MT4, MT5, TradingView, and
              NinjaTrader. Platform implementations may differ in UI, settings,
              chart behavior, and workflow.
            </p>
            <div className="mt-7">
              <LinkButton
                href="/platforms"
                variant="secondary"
                size="lg"
                trailingIcon={<ArrowRight aria-hidden="true" />}
              >
                Explore Platforms
              </LinkButton>
            </div>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {platforms.map((platform) => (
              <li
                key={platform.id}
                className="surface-elevated rounded-lg p-5 md:p-6"
              >
                <Badge variant="neutral">Supported Platform</Badge>
                <h3 className="text-foreground mt-4 text-2xl font-semibold">
                  {platform.label}
                </h3>
                <p className="text-muted-foreground mt-3 text-sm leading-6">
                  Product implementation guide content will live at{" "}
                  <span className="text-gold-warm">
                    /platforms/{platform.slug}
                  </span>
                  .
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
