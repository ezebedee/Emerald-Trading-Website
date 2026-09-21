import { ArrowRight, CircuitBoard, LineChart } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { TextLink } from "@/components/ui/text-link";

export function HomeFinalCta() {
  return (
    <section className="bg-background py-12 md:py-14 xl:py-16">
      <Container size="wide">
        <div className="surface-premium relative overflow-hidden rounded-lg px-5 py-10 md:px-8 md:py-12 xl:px-10">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,168,107,0.12),transparent_34%),linear-gradient(90deg,rgba(212,175,55,0.12),transparent_42%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(244,201,93,0.55),transparent)]"
          />

          <div className="relative max-w-3xl">
            <SectionLabel variant="gold">
              Quantitative Trading Technology
            </SectionLabel>
            <h2 className="type-heading-2 text-foreground mt-4 max-w-4xl text-balance">
              Follow the record. Explore the systems behind it.
            </h2>
            <p className="type-body text-muted-foreground mt-5 max-w-2xl">
              Review the documented Forward Performance record in the Emerald
              Ledger, or explore the systems, indicators, and technology that
              support the broader Emerald Legacy Systems platform.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LinkButton
                href="/ledger"
                size="lg"
                leadingIcon={<LineChart aria-hidden="true" />}
                trailingIcon={<ArrowRight aria-hidden="true" />}
              >
                Follow Performance
              </LinkButton>
              <LinkButton
                href="/systems"
                variant="secondary"
                size="lg"
                leadingIcon={<CircuitBoard aria-hidden="true" />}
              >
                Explore Systems
              </LinkButton>
            </div>

            <p className="type-body-small text-muted-foreground mt-5">
              For the engineering layer,{" "}
              <TextLink href="/technology">explore the technology</TextLink>.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
