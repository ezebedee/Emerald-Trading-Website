import {
  ArrowRight,
  ChartNoAxesCombined,
  Monitor,
  Route,
  Shield,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

const boundaryCards = [
  {
    title: "Manual Interpretation",
    icon: ChartNoAxesCombined,
    copy: "A user may interpret signal context manually inside their own workflow.",
  },
  {
    title: "Scanner Monitoring",
    icon: Monitor,
    copy: "Emerald Signal Scanner can monitor multiple symbols and multiple Emerald signal modules from one dashboard.",
  },
  {
    title: "Assisted Execution",
    icon: Shield,
    copy: "Emerald Recovery Expert is a separate semi-automated trade-management product where the trader initiates the first trade.",
  },
  {
    title: "Private Automation",
    icon: Route,
    copy: "Emerald Quant System may evaluate signal inputs inside broader proprietary execution and risk logic.",
  },
] as const;

export function SignalTradeBoundary() {
  return (
    <section
      id="signal-vs-trade"
      className="scroll-anchor bg-surface-soft/25 py-14 md:py-16 xl:py-20"
    >
      <Container size="wide">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionLabel variant="gold">Signal vs Trade Boundary</SectionLabel>
            <h2 className="text-foreground md:type-heading-2 mt-4 text-[1.55rem] leading-[1.12] font-semibold text-balance break-words">
              A signal is not automatically a trade.
            </h2>
            <p className="type-body text-muted-foreground mt-5">
              Signal modules provide analytical or directional context. Recovery
              Expert and Emerald Quant System apply separate execution and
              trade-management logic, so visible signal arrows should not be
              treated as automated trade instructions.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <LinkButton
                href="/signal-scanner"
                className="h-auto min-h-12 w-full px-4 py-3 text-center text-sm leading-6 whitespace-normal sm:w-auto sm:text-base [&>span]:whitespace-normal"
                variant="secondary"
                trailingIcon={<ArrowRight aria-hidden="true" />}
              >
                Explore Signal Scanner
              </LinkButton>
              <LinkButton
                href="/recovery-expert"
                className="h-auto min-h-12 w-full px-4 py-3 text-center text-sm leading-6 whitespace-normal sm:w-auto sm:text-base [&>span]:whitespace-normal"
                variant="secondary"
                trailingIcon={<ArrowRight aria-hidden="true" />}
              >
                Explore Recovery Expert
              </LinkButton>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {boundaryCards.map((card) => {
              const Icon = card.icon;

              return (
                <article
                  key={card.title}
                  className="surface-elevated rounded-lg p-5 md:p-6"
                >
                  <Icon aria-hidden="true" className="text-gold-warm size-5" />
                  <Badge variant="neutral" className="mt-5">
                    Context Path
                  </Badge>
                  <h3 className="text-foreground mt-4 text-xl font-semibold">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground mt-3 text-sm leading-6">
                    {card.copy}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
