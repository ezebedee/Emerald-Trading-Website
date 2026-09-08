import { ArrowRight } from "lucide-react";

import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function RecoveryFinalCta() {
  return (
    <section className="bg-surface-soft/25 border-t border-[var(--border)] py-14 md:py-16 xl:py-20">
      <Container size="wide">
        <div className="surface-elevated rounded-lg p-6 md:p-8">
          <h2 className="type-heading-2 text-foreground max-w-4xl text-balance">
            Review the full product ecosystem before choosing an execution
            workflow.
          </h2>
          <p className="type-body text-muted-foreground mt-5 max-w-3xl">
            Recovery Expert sits between signal context and private automation:
            the trader initiates the first trade, then the assisted management
            workflow handles subsequent recovery actions according to configured
            logic.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <LinkButton
              href="/systems"
              size="lg"
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
      </Container>
    </section>
  );
}
