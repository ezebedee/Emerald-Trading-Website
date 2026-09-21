import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import type { SignalModule } from "@/domain";

type SignalFrameworkOverviewProps = Readonly<{
  primarySignalModules: readonly SignalModule[];
  auxiliarySignalModules: readonly SignalModule[];
}>;

export function SignalFrameworkOverview({
  primarySignalModules,
  auxiliarySignalModules,
}: SignalFrameworkOverviewProps) {
  return (
    <section className="py-14 md:py-16 xl:py-20">
      <Container size="wide">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <SectionLabel variant="gold">
              Signal Framework Overview
            </SectionLabel>
            <h2 className="text-foreground md:type-heading-2 mt-4 max-w-3xl text-[1.55rem] leading-[1.12] font-semibold text-balance break-words">
              Five primary signal modules. One auxiliary defensive layer.
            </h2>
            <p className="type-body text-muted-foreground mt-5">
              The Emerald signal framework lets traders select analytical
              modules according to trading style and market context rather than
              rely on one universal signal model. A signal provides context; it
              is not automatically a trade.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-[1fr_0.72fr]">
            <article className="surface-elevated rounded-lg p-5 md:p-6">
              <Badge variant="neutral">Primary Signal Modules</Badge>
              <ul className="mt-5 grid gap-3">
                {primarySignalModules.map((module) => (
                  <li
                    key={module.id}
                    className="bg-surface-soft/60 flex flex-wrap items-center justify-between gap-3 rounded-md border border-[var(--border)] px-4 py-3"
                  >
                    <span className="text-foreground text-sm font-semibold">
                      {module.name}
                    </span>
                    <span className="type-label text-subtle-foreground">
                      {module.category}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
            <article className="surface-premium rounded-lg p-5 md:p-6">
              <Badge variant="premium">Auxiliary Signal Module</Badge>
              <ul className="mt-5 grid gap-3">
                {auxiliarySignalModules.map((module) => (
                  <li
                    key={module.id}
                    className="rounded-md border border-[var(--border-gold)] bg-[var(--gold-soft)] px-4 py-3"
                  >
                    <span className="text-foreground text-sm font-semibold">
                      {module.name}
                    </span>
                    <p className="text-muted-foreground mt-2 text-sm leading-6">
                      Defensive and reversal context beside a preferred primary
                      signal.
                    </p>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </Container>
    </section>
  );
}
