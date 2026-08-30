import { ArrowRight, BarChart3 } from "lucide-react";
import { HeroSystemVisual } from "@/components/home/hero-system-visual";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { SectionLabel } from "@/components/ui/section-label";
import { siteBrand } from "@/data/site";

const heroSupportingCopy =
  "Emerald Legacy Systems develops algorithmic trading systems, signal-generation technology, and automation workflows supported by documented forward-performance records and research-driven iteration.";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden py-14 md:py-18 xl:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(0,168,107,0.11),transparent_34%),radial-gradient(circle_at_78%_12%,rgba(212,175,55,0.08),transparent_30%)]" />
      <Container
        size="wide"
        className="relative grid items-center gap-10 xl:grid-cols-[minmax(0,0.55fr)_minmax(360px,0.45fr)] xl:gap-14"
      >
        <div className="max-w-3xl">
          <SectionLabel variant="gold">{siteBrand.descriptor}</SectionLabel>
          <h1 className="type-heading-1 text-foreground mt-5 max-w-4xl text-balance">
            Quantitative Trading Technology Built for Systematic Execution
          </h1>
          <p className="type-body-large text-muted-foreground mt-6 max-w-2xl">
            {heroSupportingCopy}
          </p>
          <p className="text-subtle-foreground mt-5 max-w-xl text-sm leading-6">
            {siteBrand.positioning}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <LinkButton
              href="/ledger"
              size="lg"
              aria-label="Follow documented performance records"
              leadingIcon={<BarChart3 aria-hidden="true" />}
              trailingIcon={<ArrowRight aria-hidden="true" />}
            >
              Follow Performance
            </LinkButton>
            <LinkButton
              href="/systems"
              size="lg"
              variant="secondary"
              trailingIcon={<ArrowRight aria-hidden="true" />}
            >
              Explore Systems
            </LinkButton>
          </div>
        </div>

        <HeroSystemVisual />
      </Container>
    </section>
  );
}

export const homeHeroContent = {
  h1: "Quantitative Trading Technology Built for Systematic Execution",
  supportingCopy: heroSupportingCopy,
} as const;
