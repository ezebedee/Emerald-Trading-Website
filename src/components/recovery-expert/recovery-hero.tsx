import Image from "next/image";
import { ArrowRight, Route } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import type { PlatformDefinition, TradingProductDefinition } from "@/domain";
import type { ImageAsset } from "@/types/assets";

type RecoveryHeroProps = Readonly<{
  product?: TradingProductDefinition;
  platforms: readonly PlatformDefinition[];
  asset?: ImageAsset;
  isTemporaryAsset: boolean;
}>;

export function RecoveryHero({
  product,
  platforms,
  asset,
  isTemporaryAsset,
}: RecoveryHeroProps) {
  const platformCount = platforms.length;

  return (
    <section className="border-b border-[var(--border)] py-14 md:py-18 xl:py-24">
      <Container size="wide">
        <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <div>
            <SectionLabel variant="gold">Assisted Execution Layer</SectionLabel>
            <h1 className="type-display text-foreground mt-5 text-balance">
              {product?.name ?? "Emerald Recovery Expert"}
            </h1>
            <p className="text-gold-warm mt-4 text-lg font-semibold md:text-xl">
              Semi-Automated Trade Management
            </p>
            <p className="type-body-large text-muted-foreground mt-6 max-w-3xl">
              The trader chooses and enters the first trade. After that initial
              entry, Emerald Recovery Expert manages the subsequent
              trade-management and recovery workflow according to its configured
              logic.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Badge variant="neutral">Public Subscription</Badge>
              <Badge variant="neutral">Trader-First Entry</Badge>
              <Badge variant="neutral">Assisted Execution</Badge>
              <Badge variant="neutral">
                {platformCount === 4 ? "All Platforms" : "Supported Platforms"}
              </Badge>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LinkButton
                href="/systems"
                size="lg"
                leadingIcon={<Route aria-hidden="true" />}
                trailingIcon={<ArrowRight aria-hidden="true" />}
              >
                Explore Systems & Products
              </LinkButton>
              <LinkButton
                href="/platforms"
                variant="secondary"
                size="lg"
                trailingIcon={<ArrowRight aria-hidden="true" />}
              >
                View Platforms
              </LinkButton>
            </div>
          </div>

          <figure className="surface-elevated overflow-hidden rounded-lg">
            {asset ? (
              <Image
                src={asset.src}
                alt="Conceptual Emerald Recovery Expert workflow showing a trader-initiated first entry followed by algorithm-managed recovery steps toward a configured objective."
                width={asset.width}
                height={asset.height}
                priority
                loading="eager"
                sizes="(min-width: 1280px) 54vw, (min-width: 1024px) 50vw, 100vw"
                className="aspect-[16/10] w-full object-cover"
              />
            ) : (
              <div className="surface-data flex aspect-[16/10] min-h-72 items-center justify-center p-6">
                <p className="type-body text-muted-foreground text-center">
                  Temporary Product Workflow Preview
                </p>
              </div>
            )}
            <figcaption className="border-t border-[var(--border)] p-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="neutral">Conceptual Workflow Preview</Badge>
                {isTemporaryAsset ? (
                  <Badge variant="neutral">Temporary Product Visual</Badge>
                ) : null}
              </div>
              <p className="text-muted-foreground mt-3 text-sm leading-6">
                Emerald Recovery Expert - conceptual workflow preview. This
                visual is temporary product context, not a final EA interface.
              </p>
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}
