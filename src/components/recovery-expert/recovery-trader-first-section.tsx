import { MousePointer2, Play } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

export function RecoveryTraderFirstSection() {
  return (
    <section className="py-14 md:py-16 xl:py-20">
      <Container size="wide">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <SectionLabel variant="gold">Trader-First Entry</SectionLabel>
            <h2 className="type-heading-2 text-foreground mt-4 text-balance">
              You choose the first trade.
            </h2>
            <p className="type-body text-muted-foreground mt-5 max-w-3xl">
              Emerald Recovery Expert begins its management role after the
              initial position is opened by the trader. The product is
              semi-automated: the trader remains responsible for the initial
              market decision and first trade.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <article className="surface-elevated rounded-lg p-5 md:p-6">
              <MousePointer2
                aria-hidden="true"
                className="text-gold-warm size-5"
              />
              <h3 className="text-foreground mt-4 text-xl font-semibold">
                User control stays first
              </h3>
              <p className="text-muted-foreground mt-3 text-sm leading-6">
                A signal or market view may inform the decision, but the Expert
                does not select the first entry automatically.
              </p>
            </article>
            <article className="surface-elevated rounded-lg p-5 md:p-6">
              <Play aria-hidden="true" className="text-gold-warm size-5" />
              <h3 className="text-foreground mt-4 text-xl font-semibold">
                Management begins after entry
              </h3>
              <p className="text-muted-foreground mt-3 text-sm leading-6">
                Once the first trade exists, subsequent recovery and
                trade-management actions can be handled algorithmically.
              </p>
            </article>
          </div>
        </div>
      </Container>
    </section>
  );
}
