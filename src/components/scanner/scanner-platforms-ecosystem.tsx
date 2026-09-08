import { ArrowRight } from "lucide-react";

import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import type { PlatformDefinition, TradingProductDefinition } from "@/domain";

type ScannerPlatformsEcosystemProps = Readonly<{
  platforms: readonly PlatformDefinition[];
  relatedProducts: readonly TradingProductDefinition[];
}>;

const productHrefById: Record<string, string> = {
  "emerald-legacy-system": "/indicators",
  "emerald-signal-scanner": "/signal-scanner",
  "emerald-recovery-expert": "/recovery-expert",
  "emerald-quant-system-product": "/systems",
};

export function ScannerPlatformsEcosystem({
  platforms,
  relatedProducts,
}: ScannerPlatformsEcosystemProps) {
  return (
    <section className="bg-surface-soft/25 border-y border-[var(--border)] py-14 md:py-16 xl:py-20">
      <Container size="wide">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <SectionLabel variant="gold">Platform Availability</SectionLabel>
            <h2 className="type-heading-2 text-foreground mt-4 text-balance">
              Scanner availability is modeled across supported platforms.
            </h2>
            <p className="type-body text-muted-foreground mt-5">
              MT4 evidence is shown for the current page. Platform-specific
              implementation behavior may differ across supported environments.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {platforms.map((platform) => (
                <span
                  key={platform.id}
                  className="type-label bg-surface-soft text-muted-foreground rounded-full border border-[var(--border)] px-3 py-1.5"
                >
                  {platform.label}
                </span>
              ))}
            </div>
            <div className="mt-7">
              <LinkButton
                href="/platforms"
                variant="secondary"
                trailingIcon={<ArrowRight aria-hidden="true" />}
              >
                Explore Platforms
              </LinkButton>
            </div>
          </div>
          <div>
            <SectionLabel variant="gold">Product Ecosystem</SectionLabel>
            <h2 className="type-heading-2 text-foreground mt-4 text-balance">
              Scanner monitors the signal framework; it does not replace the
              product ecosystem.
            </h2>
            <div className="mt-6 grid gap-4">
              {relatedProducts.map((product) => (
                <article
                  key={product.id}
                  className="surface-elevated rounded-lg p-5"
                >
                  <p className="type-label text-subtle-foreground">
                    {product.productLayer.replaceAll("-", " ")}
                  </p>
                  <h3 className="text-foreground mt-3 text-xl font-semibold">
                    {product.name}
                  </h3>
                  <p className="text-muted-foreground mt-3 text-sm leading-6">
                    {product.description}
                  </p>
                  <div className="mt-5">
                    <LinkButton
                      href={productHrefById[product.id] ?? "/"}
                      variant="ghost"
                      size="sm"
                      trailingIcon={<ArrowRight aria-hidden="true" />}
                    >
                      Explore
                    </LinkButton>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
