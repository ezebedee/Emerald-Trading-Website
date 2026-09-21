import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

const researchPaths = [
  "New signal modules",
  "Filters",
  "Confirmation methods",
  "Refinements",
  "Platform-specific improvements",
] as const;

export function SignalResearchSection() {
  return (
    <section
      id="research-development"
      className="scroll-anchor bg-surface-soft/25 py-14 md:py-16 xl:py-20"
    >
      <Container size="wide">
        <div className="surface-premium rounded-lg p-5 md:p-8 xl:p-10">
          <SectionLabel variant="gold">Research & Extensibility</SectionLabel>
          <h2 className="text-foreground md:type-heading-2 mt-4 max-w-4xl text-[1.55rem] leading-[1.12] font-semibold text-balance break-words">
            Signal development is treated as an evolving research program.
          </h2>
          <p className="type-body text-muted-foreground mt-5 max-w-4xl">
            The library can expand over time through additional modules,
            filters, confirmation methods, refinements, and platform-specific
            improvements. Current public modules are presented without exposing
            proprietary formulas or attaching performance records to individual
            signals.
          </p>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
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
              href="/research"
              className="h-auto min-h-12 w-full px-4 py-3 text-center text-sm leading-6 whitespace-normal sm:w-auto sm:text-base [&>span]:whitespace-normal"
              variant="secondary"
              trailingIcon={<ArrowRight aria-hidden="true" />}
            >
              Explore Research
            </LinkButton>
            <LinkButton
              href="/indicators"
              className="h-auto min-h-12 w-full px-4 py-3 text-center text-sm leading-6 whitespace-normal sm:w-auto sm:text-base [&>span]:whitespace-normal"
              trailingIcon={<ArrowRight aria-hidden="true" />}
            >
              Explore Emerald Legacy System
            </LinkButton>
          </div>
          <div className="mt-6">
            <Badge variant="neutral">No Signal Performance Ranking</Badge>
          </div>
        </div>
      </Container>
    </section>
  );
}
