import { ArrowRight } from "lucide-react";

import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { TextLink } from "@/components/ui/text-link";

export function SignalsFinalCta() {
  return (
    <section id="final-cta" className="scroll-anchor py-14 md:py-16 xl:py-20">
      <Container size="wide">
        <div className="surface-premium rounded-lg p-5 md:p-8 xl:p-10">
          <h2 className="text-foreground md:type-heading-2 max-w-4xl text-[1.55rem] leading-[1.12] font-semibold text-balance break-words">
            Choose the signal context that fits the workflow.
          </h2>
          <p className="type-body text-muted-foreground mt-5 max-w-3xl">
            Emerald Legacy System provides the signal framework, Signal Scanner
            monitors outputs, and separate execution products handle trade
            management or automation where appropriate.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <LinkButton
              href="/indicators"
              className="h-auto min-h-12 w-full px-4 py-3 text-center text-sm leading-6 whitespace-normal sm:w-auto sm:text-base [&>span]:whitespace-normal"
              size="lg"
              trailingIcon={<ArrowRight aria-hidden="true" />}
            >
              Explore Emerald Legacy System
            </LinkButton>
            <LinkButton
              href="/signal-scanner"
              className="h-auto min-h-12 w-full px-4 py-3 text-center text-sm leading-6 whitespace-normal sm:w-auto sm:text-base [&>span]:whitespace-normal"
              variant="secondary"
              size="lg"
              trailingIcon={<ArrowRight aria-hidden="true" />}
            >
              View Signal Scanner
            </LinkButton>
          </div>
          <p className="type-body-small text-muted-foreground mt-5">
            Platform implementation details remain separate.{" "}
            <TextLink href="/platforms">Explore Platforms</TextLink>
          </p>
        </div>
      </Container>
    </section>
  );
}
