import { ArrowRight } from "lucide-react";

import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function ScannerFinalCta() {
  return (
    <section className="py-14 md:py-16 xl:py-20">
      <Container size="wide">
        <div className="surface-elevated rounded-lg p-6 md:p-8">
          <h2 className="type-heading-2 text-foreground max-w-4xl text-balance">
            Monitor the signal framework, then review chart context with care.
          </h2>
          <p className="type-body text-muted-foreground mt-5 max-w-3xl">
            Emerald Signal Scanner is designed to organize selected symbols,
            selected signal modules, fresh-signal notifications, and chart
            review workflows while keeping execution decisions separate.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <LinkButton
              href="/signals"
              size="lg"
              trailingIcon={<ArrowRight aria-hidden="true" />}
            >
              Explore Signal Library
            </LinkButton>
            <LinkButton
              href="/indicators"
              variant="secondary"
              size="lg"
              trailingIcon={<ArrowRight aria-hidden="true" />}
            >
              Explore Legacy System
            </LinkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
