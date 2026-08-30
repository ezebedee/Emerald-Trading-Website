import {
  ArrowRight,
  Cpu,
  GitBranch,
  ShieldCheck,
  Waypoints,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import type { HomepageFeaturedSystemContext } from "@/data/selectors/types";

const architectureSteps = [
  "Signal Input",
  "Rule Engine",
  "Risk Logic",
  "Execution",
] as const;

const getCapabilityItems = (
  configuration: HomepageFeaturedSystemContext["configuration"],
) => {
  const capabilities = new Set(configuration.capabilities);

  return [
    {
      title: "Signal Integration",
      description:
        "Uses signal interpretation as one input inside the broader system logic.",
      icon: Waypoints,
      isSupported: capabilities.has("signal interpretation"),
    },
    {
      title: "Risk Logic",
      description:
        "Applies risk-management logic before trades move through execution.",
      icon: ShieldCheck,
      isSupported: capabilities.has("risk-management logic"),
    },
    {
      title: "Automated Execution",
      description:
        "Supports automated trade execution and trade lifecycle handling.",
      icon: Cpu,
      isSupported:
        capabilities.has("automated trade execution") ||
        capabilities.has("trade lifecycle management"),
    },
    {
      title: "Forward-Test Record",
      description:
        "Connects to documented public forward-performance records in the Ledger.",
      icon: GitBranch,
      isSupported: true,
    },
  ].filter((item) => item.isSupported);
};

function EmptySystemsShowcase() {
  return (
    <section className="bg-surface-soft/25 py-14 md:py-16 xl:py-20">
      <Container size="wide">
        <div className="max-w-3xl">
          <SectionLabel variant="gold">Trading Systems</SectionLabel>
          <h2 className="type-heading-2 text-foreground mt-4 max-w-3xl text-balance">
            Systematic trading infrastructure built around signals, risk logic,
            and execution.
          </h2>
          <p className="type-body text-muted-foreground mt-5 max-w-2xl">
            Public trading system details are not currently available on the
            homepage.
          </p>
          <div className="mt-6">
            <LinkButton
              href="/systems"
              size="lg"
              trailingIcon={<ArrowRight aria-hidden="true" />}
            >
              Explore Trading Systems
            </LinkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function HomeSystemsShowcase({
  context,
}: {
  context?: HomepageFeaturedSystemContext;
}) {
  if (!context) {
    return <EmptySystemsShowcase />;
  }

  const { configuration, family } = context;
  const capabilityItems = getCapabilityItems(configuration);

  return (
    <section className="bg-surface-soft/25 py-14 md:py-16 xl:py-20">
      <Container size="wide">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(380px,0.75fr)] xl:gap-12">
          <div className="max-w-3xl">
            <SectionLabel variant="gold">Trading Systems</SectionLabel>
            <h2 className="type-heading-2 text-foreground mt-4 max-w-4xl text-balance">
              Systematic trading infrastructure built around signals, risk
              logic, and execution.
            </h2>
            <p className="type-body text-muted-foreground mt-5 max-w-2xl">
              {family.name} combines signal-generation inputs, system rules,
              risk-management logic, and automated execution into a structured
              trading workflow across supported asset-class coverage.
            </p>

            <article className="surface-elevated mt-8 rounded-lg p-5 md:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <Badge variant="neutral">System Family</Badge>
                  <h3 className="type-heading-3 text-foreground mt-4 text-balance">
                    {family.name}
                  </h3>
                </div>
                <Badge variant="premium">{configuration.status}</Badge>
              </div>

              <p className="type-body-small text-muted-foreground mt-4 max-w-2xl">
                Signals inform the system; execution is governed by a broader
                rule set covering trade implementation, risk management, and
                position handling.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="bg-surface/70 rounded-md border border-[var(--border)] p-4">
                  <p className="type-label text-gold-warm">Family Coverage</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {family.marketCoverage.map((market) => (
                      <Badge key={market} variant="neutral">
                        {market}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="bg-surface/70 rounded-md border border-[var(--border)] p-4">
                  <p className="type-label text-gold-warm">
                    Current Public Configuration
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge variant="premium">
                      {configuration.configurationName}
                    </Badge>
                    {configuration.platforms.map((platform) => (
                      <Badge key={platform} variant="neutral">
                        {platform} Platform
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <dl className="mt-6 grid gap-3 sm:grid-cols-2">
                {capabilityItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="bg-surface/70 rounded-md border border-[var(--border)] p-4"
                    >
                      <dt className="text-foreground flex items-center gap-2 text-sm font-semibold">
                        <Icon
                          aria-hidden="true"
                          className="text-gold-warm size-4 shrink-0"
                        />
                        {item.title}
                      </dt>
                      <dd className="text-muted-foreground mt-2 text-sm leading-6">
                        {item.description}
                      </dd>
                    </div>
                  );
                })}
              </dl>

              <p className="text-muted-foreground mt-6 text-sm leading-6">
                Documented public forward-performance records are maintained in
                the Emerald Ledger for the current public configuration.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <LinkButton
                  href="/systems"
                  size="lg"
                  trailingIcon={<ArrowRight aria-hidden="true" />}
                >
                  Explore Trading Systems
                </LinkButton>
                <LinkButton href="/ledger" variant="secondary" size="lg">
                  View Public Performance
                </LinkButton>
              </div>
            </article>
          </div>

          <div
            aria-hidden="true"
            className="surface-data relative overflow-hidden rounded-lg p-5 md:p-6 lg:mt-16"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--border-gold)] to-transparent" />
            <div className="flex items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
              <span className="type-label text-gold-warm">System Logic</span>
              <span className="text-muted-foreground text-xs">
                {configuration.shortName ?? family.name}
              </span>
            </div>

            <div className="mt-6 grid gap-3">
              {architectureSteps.map((step, index) => (
                <div key={step}>
                  <div className="bg-surface-elevated/90 rounded-md border border-[var(--border-strong)] p-4">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-foreground text-sm font-semibold">
                        {step}
                      </span>
                      <span className="numeric text-subtle-foreground text-xs">
                        0{index + 1}
                      </span>
                    </div>
                  </div>
                  {index < architectureSteps.length - 1 ? (
                    <div className="mx-5 h-5 border-l border-[var(--border-emerald)]" />
                  ) : null}
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-md border border-[var(--border-gold)] bg-[var(--gold-soft)] p-4">
              <p className="text-gold-warm text-sm font-semibold">
                Related product layer
              </p>
              <p className="text-muted-foreground mt-2 text-sm leading-6">
                {context.relatedIndicator?.name ?? "Indicator input"} and{" "}
                {context.relatedSignal?.name ?? "signal stream"} provide context
                for the current configuration architecture.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
