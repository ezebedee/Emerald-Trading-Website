import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import type { TradingProductDefinition } from "@/domain";

type RecoveryEcosystemProps = Readonly<{
  currentProductId?: string;
  relatedProducts: readonly TradingProductDefinition[];
}>;

const ecosystem = [
  {
    id: "emerald-legacy-system",
    name: "Emerald Legacy System",
    layer: "Analysis & Signal",
    copy: "Provides signal and analytical context that may inform a trader's first-entry decision.",
    href: "/indicators",
  },
  {
    id: "emerald-signal-scanner",
    name: "Emerald Signal Scanner",
    layer: "Monitoring",
    copy: "Helps a trader monitor signal context without creating automatic Scanner-to-Recovery execution.",
    href: "/signal-scanner",
  },
  {
    id: "emerald-recovery-expert",
    name: "Emerald Recovery Expert",
    layer: "Assisted Execution",
    copy: "Manages trade handling after the trader initiates the first trade.",
    href: "/recovery-expert",
  },
  {
    id: "emerald-quant-system-product",
    name: "Emerald Quant System",
    layer: "Automated Execution",
    copy: "Private automated execution product kept separate from public subscription tools.",
    href: "/systems/quant",
  },
] as const;

export function RecoveryEcosystem({
  currentProductId,
  relatedProducts,
}: RecoveryEcosystemProps) {
  const availableRelatedIds = new Set(
    relatedProducts.map((product) => product.id),
  );

  return (
    <section className="bg-surface-soft/25 border-y border-[var(--border)] py-14 md:py-16 xl:py-20">
      <Container size="wide">
        <div className="max-w-3xl">
          <SectionLabel variant="gold">Product Ecosystem</SectionLabel>
          <h2 className="type-heading-2 text-foreground mt-4 text-balance">
            Signals can inform the trader; Recovery Expert manages what follows.
          </h2>
          <p className="type-body text-muted-foreground mt-5">
            Emerald Legacy System and the Signal Library provide signal context.
            Recovery Expert is a separate assisted-execution product, and a
            first entry does not have to originate from Emerald signals.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {ecosystem.map((item) => {
            const isCurrent = item.id === currentProductId;
            const isRelated = availableRelatedIds.has(item.id);

            return (
              <article
                key={item.id}
                className={
                  isCurrent
                    ? "surface-premium rounded-lg p-5"
                    : "surface-elevated rounded-lg p-5"
                }
              >
                <div className="flex flex-wrap gap-2">
                  <Badge variant={isCurrent ? "premium" : "neutral"}>
                    {item.layer}
                  </Badge>
                  {isCurrent ? (
                    <Badge variant="neutral">Current Page</Badge>
                  ) : null}
                  {isRelated && !isCurrent ? (
                    <Badge variant="neutral">Related</Badge>
                  ) : null}
                </div>
                <h3 className="text-foreground mt-4 text-lg font-semibold">
                  {item.name}
                </h3>
                <p className="text-muted-foreground mt-3 text-sm leading-6">
                  {item.copy}
                </p>
                {!isCurrent ? (
                  <div className="mt-5">
                    <LinkButton
                      href={item.href}
                      variant="ghost"
                      size="sm"
                      trailingIcon={<ArrowRight aria-hidden="true" />}
                    >
                      Explore
                    </LinkButton>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
