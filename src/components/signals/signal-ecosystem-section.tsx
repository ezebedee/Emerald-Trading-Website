import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import type { PlatformDefinition, TradingProductDefinition } from "@/domain";

type SignalEcosystemSectionProps = Readonly<{
  platforms: readonly PlatformDefinition[];
  relatedProducts: readonly TradingProductDefinition[];
}>;

const productCards = [
  {
    id: "emerald-legacy-system",
    label: "Signal Generation",
    copy: "The signal modules exist inside Emerald Legacy System as a configurable multi-signal indicator framework.",
    href: "/indicators",
    cta: "Explore Emerald Legacy System",
  },
  {
    id: "emerald-signal-scanner",
    label: "Signal Monitoring",
    copy: "Scanner monitors multiple symbols and multiple Emerald signal modules from one dashboard.",
    href: "/signal-scanner",
    cta: "Explore Signal Scanner",
  },
  {
    id: "emerald-recovery-expert",
    label: "Semi-Automated Management",
    copy: "Recovery Expert remains a separate trade-management product where the trader initiates the first trade.",
    href: "/recovery-expert",
    cta: "Explore Recovery Expert",
  },
  {
    id: "emerald-quant-system-product",
    label: "Private Automated System",
    copy: "The private Quant System may use signal inputs within broader system logic while remaining separate from public signal modules.",
    href: "/systems",
    cta: "Explore Trading Systems",
  },
] as const;

export function SignalEcosystemSection({
  platforms,
  relatedProducts,
}: SignalEcosystemSectionProps) {
  const productsById = new Map(
    relatedProducts.map((product) => [product.id, product]),
  );

  return (
    <section id="ecosystem" className="scroll-anchor py-14 md:py-16 xl:py-20">
      <Container size="wide">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <SectionLabel variant="gold">Emerald Ecosystem</SectionLabel>
            <h2 className="text-foreground md:type-heading-2 mt-4 text-[1.55rem] leading-[1.12] font-semibold text-balance break-words">
              Signals connect to products without collapsing into execution.
            </h2>
            <p className="type-body text-muted-foreground mt-5">
              The signal library explains analytical modules. Monitoring,
              assisted trade management, private automation, and public
              performance records remain distinct product contexts.
            </p>
            <div className="mt-7">
              <LinkButton
                href="/platforms"
                className="h-auto min-h-12 w-full px-4 py-3 text-center text-sm leading-6 whitespace-normal sm:w-auto sm:text-base [&>span]:whitespace-normal"
                variant="secondary"
                trailingIcon={<ArrowRight aria-hidden="true" />}
              >
                Explore Platforms
              </LinkButton>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {platforms.map((platform) => (
                <Badge key={platform.id} variant="neutral">
                  {platform.label}
                </Badge>
              ))}
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {productCards.map((card) => {
              const product = productsById.get(card.id);

              return (
                <article
                  key={card.id}
                  className={
                    product?.accessModel === "private-investor"
                      ? "surface-premium flex min-h-full flex-col rounded-lg p-5 md:p-6"
                      : "surface-elevated flex min-h-full flex-col rounded-lg p-5 md:p-6"
                  }
                >
                  <Badge
                    variant={
                      product?.accessModel === "private-investor"
                        ? "premium"
                        : "neutral"
                    }
                  >
                    {card.label}
                  </Badge>
                  <h3 className="text-foreground mt-4 text-xl font-semibold">
                    {product?.name ?? card.label}
                  </h3>
                  <p className="text-muted-foreground mt-3 text-sm leading-6">
                    {card.copy}
                  </p>
                  <div className="mt-auto pt-6">
                    <LinkButton
                      href={card.href}
                      className="h-auto min-h-12 w-full px-4 py-3 text-center text-sm leading-6 whitespace-normal sm:w-auto sm:text-base [&>span]:whitespace-normal"
                      variant={
                        product?.accessModel === "private-investor"
                          ? "premium"
                          : "secondary"
                      }
                      trailingIcon={<ArrowRight aria-hidden="true" />}
                    >
                      {card.cta}
                    </LinkButton>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
