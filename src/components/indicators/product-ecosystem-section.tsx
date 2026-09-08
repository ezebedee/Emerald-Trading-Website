import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import type { TradingProductDefinition } from "@/domain";

type ProductEcosystemSectionProps = Readonly<{
  relatedProducts: readonly TradingProductDefinition[];
}>;

const productPresentation: Record<
  string,
  { role: string; detail: string; href: string; cta: string }
> = {
  "emerald-signal-scanner": {
    role: "Multi-symbol / multi-signal monitoring",
    detail: "Scanner monitors signal-module outputs across selected symbols.",
    href: "/signal-scanner",
    cta: "Explore Signal Scanner",
  },
  "emerald-recovery-expert": {
    role: "Semi-automated trade management",
    detail:
      "The trader initiates the first trade before management logic acts.",
    href: "/recovery-expert",
    cta: "Explore Recovery Expert",
  },
  "emerald-quant-system-product": {
    role: "Fully automated quantitative trading system",
    detail:
      "Private-investor execution remains separate from public signal modules.",
    href: "/systems",
    cta: "Explore Trading Systems",
  },
};

const formatAccessModel = (accessModel: string) =>
  accessModel === "private-investor"
    ? "Private Investor"
    : "Public Subscription";

export function ProductEcosystemSection({
  relatedProducts,
}: ProductEcosystemSectionProps) {
  return (
    <section className="py-14 md:py-16 xl:py-20">
      <Container size="wide">
        <div className="max-w-3xl">
          <SectionLabel variant="gold">Product Ecosystem</SectionLabel>
          <h2 className="type-heading-2 text-foreground mt-4 text-balance">
            A signal can inform workflows without becoming an automatic trade.
          </h2>
          <p className="type-body text-muted-foreground mt-5">
            Emerald signal modules produce analytical outputs. A trader may
            interpret them manually, Scanner may monitor them, and execution
            products may use them as inputs while applying separate trade
            management or execution logic.
          </p>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {relatedProducts.map((product) => {
            const presentation = productPresentation[product.id];

            if (!presentation) {
              return null;
            }

            return (
              <article
                key={product.id}
                className={
                  product.accessModel === "private-investor"
                    ? "surface-premium flex min-h-full flex-col rounded-lg p-5 md:p-6"
                    : "surface-elevated flex min-h-full flex-col rounded-lg p-5 md:p-6"
                }
              >
                <Badge
                  variant={
                    product.accessModel === "private-investor"
                      ? "premium"
                      : "neutral"
                  }
                >
                  {formatAccessModel(product.accessModel)}
                </Badge>
                <h3 className="text-foreground mt-4 text-xl font-semibold">
                  {product.name}
                </h3>
                <p className="text-gold-warm mt-3 text-sm font-semibold">
                  {presentation.role}
                </p>
                <p className="text-muted-foreground mt-3 text-sm leading-6">
                  {presentation.detail}
                </p>
                <div className="mt-auto pt-6">
                  <LinkButton
                    href={presentation.href}
                    variant={
                      product.accessModel === "private-investor"
                        ? "premium"
                        : "secondary"
                    }
                    size="md"
                    trailingIcon={<ArrowRight aria-hidden="true" />}
                  >
                    {presentation.cta}
                  </LinkButton>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
