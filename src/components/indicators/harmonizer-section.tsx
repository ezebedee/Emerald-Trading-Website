import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

function RelationshipNode({ children }: { children: ReactNode }) {
  return (
    <span className="bg-surface-elevated text-foreground inline-flex min-h-12 items-center justify-center rounded-md border border-[var(--border-strong)] px-4 text-sm font-semibold">
      {children}
    </span>
  );
}

export function HarmonizerSection() {
  return (
    <section className="py-14 md:py-16 xl:py-20">
      <Container size="wide">
        <div className="grid gap-8 lg:grid-cols-2">
          <article className="surface-elevated rounded-lg p-5 md:p-6">
            <SectionLabel variant="gold">Harmonizer</SectionLabel>
            <h2 className="type-heading-2 text-foreground mt-4 text-balance">
              Scalp and Range context synthesized into one primary module.
            </h2>
            <p className="type-body text-muted-foreground mt-5">
              Harmonizer combines Scalp Signal and Range Signal outputs inside
              the Emerald signal framework. The page shows the relationship at a
              conceptual level only; no mathematical combination logic is
              implied.
            </p>
            <div
              aria-label="Scalp Signal plus Range Signal leads to Harmonizer"
              className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <RelationshipNode>Scalp Signal</RelationshipNode>
              <span className="text-gold-warm text-xl font-semibold">+</span>
              <RelationshipNode>Range Signal</RelationshipNode>
              <span className="text-gold-warm text-xl font-semibold">=</span>
              <RelationshipNode>Harmonizer</RelationshipNode>
            </div>
          </article>
          <article className="surface-premium rounded-lg p-5 md:p-6">
            <SectionLabel variant="gold">Harmonizer SAFE</SectionLabel>
            <h2 className="type-heading-2 text-foreground mt-4 text-balance">
              Optional auxiliary defensive context beside a preferred signal.
            </h2>
            <p className="type-body text-muted-foreground mt-5">
              Harmonizer SAFE is an auxiliary helper signal. It can support
              defensive, reversal, or exit-style context beside a preferred
              primary signal, but it should not be interpreted as an exit
              mechanism, stop order, loss-prevention method, or automated trade
              instruction.
            </p>
            <div
              aria-label="Preferred primary signal plus Harmonizer SAFE adds defensive context"
              className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <RelationshipNode>Preferred Primary Signal</RelationshipNode>
              <span className="text-gold-warm text-xl font-semibold">+</span>
              <RelationshipNode>Harmonizer SAFE</RelationshipNode>
              <span className="text-gold-warm text-xl font-semibold">=</span>
              <RelationshipNode>Defensive Context</RelationshipNode>
            </div>
            <div className="mt-6">
              <Badge variant="premium">Auxiliary Layer</Badge>
            </div>
          </article>
        </div>
        <article className="surface-data mt-8 rounded-lg p-5 md:p-6">
          <SectionLabel variant="gold">
            Different Signal Engines. The Same Market.
          </SectionLabel>
          <p className="text-muted-foreground mt-4 max-w-4xl text-sm leading-6">
            The page is prepared for a same-chart comparison of Scalp, Range,
            Harmonizer, and Harmonizer with SAFE once approved processed assets
            are supplied. That future comparison should show different signal
            perspectives on the same market movement without presenting a
            performance comparison.
          </p>
        </article>
      </Container>
    </section>
  );
}
