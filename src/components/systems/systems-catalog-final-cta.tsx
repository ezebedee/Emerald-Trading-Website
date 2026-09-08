import { ArrowRight } from "lucide-react";

import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function SystemsCatalogFinalCta() {
  return (
    <section className="bg-surface-soft/25 border-t border-[var(--border)] py-14 md:py-16 xl:py-20">
      <Container size="wide">
        <div className="surface-premium rounded-lg p-5 md:p-8 xl:p-10">
          <h2 className="type-heading-2 text-foreground max-w-4xl text-balance">
            Compare the product family before choosing a workflow path.
          </h2>
          <p className="type-body text-muted-foreground mt-5 max-w-3xl">
            The public catalog is the starting point for product discovery.
            Platform-specific implementation details remain separate, and public
            performance records remain in the Emerald Ledger.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <LinkButton
              href="/platforms"
              size="lg"
              variant="secondary"
              trailingIcon={<ArrowRight aria-hidden="true" />}
            >
              View Platforms
            </LinkButton>
            <LinkButton
              href="/systems/quant"
              size="lg"
              variant="premium"
              trailingIcon={<ArrowRight aria-hidden="true" />}
            >
              Explore Quant System
            </LinkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
