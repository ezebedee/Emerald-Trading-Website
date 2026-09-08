import { ArrowRight } from "lucide-react";

import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import type { SignalsPageContext } from "@/data/selectors";

export function SignalsHero({
  signalFramework,
  legacySystem,
}: Pick<SignalsPageContext, "signalFramework" | "legacySystem">) {
  return (
    <section className="border-b border-[var(--border)] py-14 md:py-18 xl:py-24">
      <Container size="wide">
        <div className="max-w-5xl">
          <SectionLabel variant="gold">Signal Library</SectionLabel>
          <h1 className="text-foreground md:type-display mt-5 max-w-4xl text-[2rem] leading-[1.03] font-semibold text-balance break-words">
            Different signal modules for different market contexts.
          </h1>
          <p className="type-body-large text-muted-foreground mt-6 max-w-3xl">
            {legacySystem?.name ?? "Emerald Legacy System"} contains multiple
            signal modules inside one configurable framework. Each module is
            designed around a different analytical or trading context, so users
            can choose which signal modules are relevant to their workflow.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="type-label text-gold-warm rounded-full border border-[var(--border-gold)] bg-[var(--gold-soft)] px-3 py-1.5">
              {signalFramework?.shortName ?? "Signal Framework"}
            </span>
            <span className="type-label bg-surface-soft text-muted-foreground rounded-full border border-[var(--border)] px-3 py-1.5">
              Five Primary Modules
            </span>
            <span className="type-label bg-surface-soft text-muted-foreground rounded-full border border-[var(--border)] px-3 py-1.5">
              One Auxiliary Layer
            </span>
          </div>
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
        </div>
      </Container>
    </section>
  );
}
