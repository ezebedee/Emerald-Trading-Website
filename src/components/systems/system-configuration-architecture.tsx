import { FileText, GitBranch, Layers3, MonitorCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import type {
  SystemsPageConfigurationArchitecture,
  SystemsPageConfigurationArchitectureConfiguration,
} from "@/data/selectors";

type SystemConfigurationArchitectureProps = Readonly<{
  architecture?: SystemsPageConfigurationArchitecture;
}>;

const architectureRules = [
  {
    label: "Instrument Scope",
    description: "Exact tradable instruments are defined per configuration.",
    Icon: GitBranch,
  },
  {
    label: "Platform Scope",
    description: "Platform support is defined per configuration.",
    Icon: MonitorCheck,
  },
  {
    label: "Lifecycle Scope",
    description: "Testing/production lifecycle belongs to each configuration.",
    Icon: Layers3,
  },
  {
    label: "Performance Scope",
    description:
      "Public performance records belong to the specific configuration that generated them.",
    Icon: FileText,
  },
] as const;

function EmptyFamilyState() {
  return (
    <section className="bg-surface/70 border-t border-[var(--border)] py-12 md:py-14 xl:py-16">
      <Container size="wide">
        <div className="surface-elevated rounded-lg p-5 md:p-6">
          <SectionLabel variant="gold">Configuration Architecture</SectionLabel>
          <h2 className="type-heading-2 text-foreground mt-4 max-w-3xl text-balance">
            One system family. Configuration-specific markets, platforms, and
            public records.
          </h2>
          <p className="type-body text-muted-foreground mt-5 max-w-3xl">
            Public system-family configuration details are not currently
            available.
          </p>
        </div>
      </Container>
    </section>
  );
}

function ConfigurationCard({
  configuration,
  isCurrentConfiguration,
}: {
  configuration: SystemsPageConfigurationArchitectureConfiguration;
  isCurrentConfiguration: boolean;
}) {
  return (
    <article className="surface-elevated rounded-lg p-5 md:p-6">
      <div className="flex flex-col gap-4 border-b border-[var(--border)] pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Badge variant="premium">{configuration.configurationName}</Badge>
          <h3 className="type-heading-3 text-foreground mt-4 text-balance">
            {isCurrentConfiguration
              ? "Current Public Configuration"
              : "Public Configuration"}
          </h3>
        </div>
        <FileText
          aria-hidden="true"
          className="text-gold-warm size-5 shrink-0"
        />
      </div>

      <dl className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="bg-surface/70 rounded-md border border-[var(--border)] p-4">
          <dt className="type-label text-subtle-foreground">Market</dt>
          <dd className="text-foreground mt-3 text-sm font-semibold">
            {configuration.markets.join(" / ")}
          </dd>
        </div>
        <div className="bg-surface/70 rounded-md border border-[var(--border)] p-4">
          <dt className="type-label text-subtle-foreground">Instrument</dt>
          <dd className="text-foreground mt-3 text-sm font-semibold">
            {configuration.instruments.join(" / ")}
          </dd>
        </div>
        <div className="bg-surface/70 rounded-md border border-[var(--border)] p-4">
          <dt className="type-label text-subtle-foreground">Platform</dt>
          <dd className="text-foreground mt-3 text-sm font-semibold">
            {configuration.platforms.join(" / ")}
          </dd>
        </div>
        <div className="bg-surface/70 rounded-md border border-[var(--border)] p-4">
          <dt className="type-label text-subtle-foreground">Lifecycle</dt>
          <dd className="text-foreground mt-3 text-sm font-semibold">
            {configuration.lifecycleStatus}
          </dd>
        </div>
        <div className="bg-surface/70 rounded-md border border-[var(--border)] p-4 sm:col-span-2">
          <dt className="type-label text-subtle-foreground">Public Record</dt>
          <dd className="text-foreground mt-3 text-sm font-semibold">
            {configuration.publicRecordLabel ??
              "No public record is currently attached."}
          </dd>
        </div>
      </dl>

      <p className="text-muted-foreground mt-5 text-sm leading-6">
        Current public Forward Performance belongs to this configuration, not to
        every market in the broader family.
      </p>
    </article>
  );
}

export function SystemConfigurationArchitecture({
  architecture,
}: SystemConfigurationArchitectureProps) {
  if (!architecture) {
    return <EmptyFamilyState />;
  }

  return (
    <section className="bg-surface/70 border-t border-[var(--border)] py-12 md:py-14 xl:py-16">
      <Container size="wide">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,0.46fr)_minmax(0,0.54fr)] xl:items-start">
          <div className="max-w-3xl">
            <SectionLabel variant="gold">
              Configuration Architecture
            </SectionLabel>
            <h2 className="type-heading-2 text-foreground mt-4 text-balance">
              One system family. Configuration-specific markets, platforms, and
              public records.
            </h2>
            <p className="type-body text-muted-foreground mt-5">
              {architecture.familyName} is a multi-asset system family.
              Configurations are concrete implementations within that family,
              each with its own market, instrument, platform, lifecycle, and
              public-record relationship.
            </p>
            <p className="text-muted-foreground mt-5 text-sm leading-6">
              Family coverage defines where the system architecture is
              developed; configuration records define what is specifically
              implemented and documented.
            </p>

            <div className="surface-data mt-6 rounded-lg p-5">
              <p className="type-label text-gold-warm">
                System Family Coverage
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {architecture.familyMarketCoverage.map((market) => (
                  <Badge key={market} variant="neutral">
                    {market}
                  </Badge>
                ))}
              </div>
              <p className="text-muted-foreground mt-4 text-sm leading-6">
                Family-level coverage describes where Emerald Legacy Systems
                develops the system architecture.
              </p>
            </div>

            <p className="text-muted-foreground mt-5 text-sm leading-6">
              The architecture can accommodate additional asset-class
              configurations when fully specified.
            </p>
          </div>

          <div className="grid gap-4">
            {architecture.configurations.length ? (
              architecture.configurations.map((configuration) => (
                <ConfigurationCard
                  configuration={configuration}
                  isCurrentConfiguration={
                    architecture.configurations.length === 1
                  }
                  key={configuration.id}
                />
              ))
            ) : (
              <div className="surface-elevated rounded-lg p-5 md:p-6">
                <h3 className="type-heading-3 text-foreground text-balance">
                  Current Public Configuration
                </h3>
                <p className="type-body text-muted-foreground mt-5">
                  No public configuration details are currently available.
                </p>
              </div>
            )}
          </div>
        </div>

        <ul className="mt-8 grid list-none gap-4 md:grid-cols-2 xl:grid-cols-4">
          {architectureRules.map(({ label, description, Icon }) => (
            <li className="surface-elevated rounded-lg p-5" key={label}>
              <div className="flex items-start justify-between gap-4">
                <h3 className="type-label text-subtle-foreground">{label}</h3>
                <Icon
                  aria-hidden="true"
                  className="text-gold-warm size-5 shrink-0"
                />
              </div>
              <p className="text-muted-foreground mt-4 text-sm leading-6">
                {description}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
