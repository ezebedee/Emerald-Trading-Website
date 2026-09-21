import { ArrowRight, GitBranch, Route, Shield, Waypoints } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import type { SystemsPagePrimarySystem } from "@/data/selectors";

type SystemsHeroProps = Readonly<{
  system?: SystemsPagePrimarySystem;
}>;

const architectureSteps = [
  { label: "Signal Input", icon: Waypoints },
  { label: "Rule Logic", icon: GitBranch },
  { label: "Risk Logic", icon: Shield },
  { label: "Execution", icon: Route },
] as const;

function ArchitectureMotif({ systemName }: { systemName: string }) {
  return (
    <div
      aria-hidden="true"
      className="surface-data relative min-h-[360px] overflow-hidden rounded-lg p-5 md:min-h-[420px] md:p-6"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(0,168,107,0.12),transparent_34%),radial-gradient(circle_at_78%_18%,rgba(244,201,93,0.11),transparent_30%)]" />
      <div className="relative flex items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
        <span className="type-label text-gold-warm">System Architecture</span>
        <span className="text-subtle-foreground text-xs font-semibold">
          {systemName}
        </span>
      </div>

      <div className="relative mt-8 grid gap-4">
        {architectureSteps.map((step, index) => {
          const Icon = step.icon;

          return (
            <div key={step.label}>
              <div className="bg-surface-elevated/90 flex items-center justify-between gap-4 rounded-md border border-[var(--border-strong)] p-4">
                <div className="flex min-w-0 items-center gap-3">
                  <Icon className="text-gold-warm size-4 shrink-0" />
                  <span className="text-foreground text-sm font-semibold">
                    {step.label}
                  </span>
                </div>
                <span className="numeric text-subtle-foreground text-xs">
                  0{index + 1}
                </span>
              </div>
              {index < architectureSteps.length - 1 ? (
                <div className="mx-5 h-5 border-l border-[var(--border-emerald)]" />
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="relative mt-8 rounded-md border border-[var(--border-gold)] bg-[var(--gold-soft)] p-4">
        <p className="text-gold-warm text-sm font-semibold">
          Signals inform the system.
        </p>
        <p className="text-muted-foreground mt-2 text-sm leading-6">
          Execution is governed by rules, risk logic, and trade handling.
        </p>
      </div>
    </div>
  );
}

function SystemsHeroUnavailable() {
  return (
    <section className="bg-background py-14 md:py-16 xl:py-20">
      <Container size="wide">
        <div className="max-w-3xl">
          <SectionLabel variant="gold">Trading Systems</SectionLabel>
          <h1 className="type-display text-foreground mt-4 text-balance">
            Trading systems
          </h1>
          <p className="type-body text-muted-foreground mt-5">
            Public trading system information is not currently available.
          </p>
        </div>
      </Container>
    </section>
  );
}

export function SystemsHero({ system }: SystemsHeroProps) {
  if (!system) {
    return <SystemsHeroUnavailable />;
  }

  return (
    <section className="bg-background py-14 md:py-16 xl:py-20">
      <Container size="wide">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,0.92fr)_minmax(360px,0.72fr)] xl:items-center">
          <div className="max-w-4xl">
            <SectionLabel variant="gold">Trading Systems</SectionLabel>
            <h1 className="type-display text-foreground mt-4 text-balance">
              {system.name}
            </h1>
            <p className="type-heading-3 text-muted-foreground mt-5 max-w-3xl text-balance">
              Systematic execution built around signals, rules, and risk logic.
            </p>
            <p className="type-body text-muted-foreground mt-5 max-w-3xl">
              {system.name} is the broader algorithmic trading system within
              Emerald Legacy Systems. It incorporates signal-generation inputs,
              rule logic, risk-management logic, and automated execution for its
              supported market scope.
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              <Badge variant="neutral">{system.systemType}</Badge>
              <Badge variant="premium">{system.status}</Badge>
              {system.platforms.map((platform) => (
                <Badge key={platform} variant="neutral">
                  {platform}
                </Badge>
              ))}
              {system.markets.map((market) => (
                <Badge key={market} variant="neutral">
                  {market}
                </Badge>
              ))}
              {system.instruments.map((instrument) => (
                <Badge key={instrument} variant="neutral">
                  {instrument}
                </Badge>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LinkButton
                href="/ledger"
                size="lg"
                trailingIcon={<ArrowRight className="size-4" />}
              >
                View Public Performance
              </LinkButton>
              <LinkButton
                href="/technology"
                size="lg"
                variant="secondary"
                trailingIcon={<ArrowRight className="size-4" />}
              >
                Explore Technology
              </LinkButton>
            </div>
          </div>

          <ArchitectureMotif systemName={system.shortName ?? system.name} />
        </div>
      </Container>
    </section>
  );
}
