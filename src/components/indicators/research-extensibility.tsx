import { ArrowRight } from "lucide-react";

import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

const researchPaths = [
  "new signal modules",
  "new filters",
  "confirmation methods",
  "signal refinements",
  "platform-specific enhancements",
] as const;

export function ResearchExtensibility() {
  return (
    <section className="bg-surface-soft/25 py-14 md:py-16 xl:py-20">
      <Container size="wide">
        <div className="surface-premium rounded-lg p-5 md:p-8 xl:p-10">
          <SectionLabel variant="gold">Research & Extensibility</SectionLabel>
          <h2 className="type-heading-2 text-foreground mt-4 max-w-4xl text-balance">
            Signal development remains an evolving research program.
          </h2>
          <p className="type-body text-muted-foreground mt-5 max-w-4xl">
            Emerald Legacy Systems treats signal development as an evolving
            research program rather than a fixed collection of indicators. New
            modules and refinements can be incorporated into the unified
            framework after development and review.
          </p>
          <ul className="mt-6 grid gap-3 md:grid-cols-5">
            {researchPaths.map((path) => (
              <li
                key={path}
                className="bg-surface-elevated/80 text-foreground rounded-md border border-[var(--border-strong)] p-3 text-sm font-semibold"
              >
                {path}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <LinkButton
              href="/signals"
              size="lg"
              trailingIcon={<ArrowRight aria-hidden="true" />}
            >
              Explore Signal Library
            </LinkButton>
            <LinkButton
              href="/research"
              variant="secondary"
              size="lg"
              trailingIcon={<ArrowRight aria-hidden="true" />}
            >
              Explore Research
            </LinkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
