import {
  ArrowRight,
  GitBranch,
  Layers3,
  ListChecks,
  Route,
  Shield,
  Waypoints,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import type {
  SystemsPageCapability,
  SystemsPagePrimarySystem,
} from "@/data/selectors";

type SystemCapabilityArchitectureProps = Readonly<{
  system?: SystemsPagePrimarySystem;
}>;

const conceptualFlowOrder = [
  "signal interpretation",
  "risk-management logic",
  "automated trade execution",
  "position management",
  "trade lifecycle management",
] as const;

function CapabilityIcon({ capabilityId }: { capabilityId: string }) {
  const className = "text-gold-warm size-5 shrink-0";

  switch (capabilityId) {
    case "signal interpretation":
      return <Waypoints aria-hidden="true" className={className} />;
    case "automated trade execution":
      return <Route aria-hidden="true" className={className} />;
    case "risk-management logic":
      return <Shield aria-hidden="true" className={className} />;
    case "position management":
      return <Layers3 aria-hidden="true" className={className} />;
    case "trade lifecycle management":
      return <ListChecks aria-hidden="true" className={className} />;
    default:
      return <GitBranch aria-hidden="true" className={className} />;
  }
}

function EmptyCapabilityState() {
  return (
    <section
      className="bg-surface/70 border-t border-[var(--border)] py-12 md:py-14 xl:py-16"
      id="system-capabilities"
    >
      <Container size="wide">
        <div className="surface-elevated rounded-lg p-5 md:p-6">
          <SectionLabel variant="gold">System Capabilities</SectionLabel>
          <h2 className="type-heading-2 text-foreground mt-4 max-w-3xl text-balance">
            System-level capabilities govern how signals become managed trade
            execution.
          </h2>
          <p className="type-body text-muted-foreground mt-5 max-w-3xl">
            Public system capability details are not currently available.
          </p>
        </div>
      </Container>
    </section>
  );
}

function CapabilityCard({
  capability,
  index,
}: {
  capability: SystemsPageCapability;
  index: number;
}) {
  return (
    <li className="xl:col-span-2 xl:[&:nth-last-child(-n+2)]:col-span-3">
      <article className="surface-elevated h-full rounded-lg p-5 md:p-6">
        <div className="flex items-start justify-between gap-4">
          <span className="numeric text-subtle-foreground text-xs">
            {String(index + 1).padStart(2, "0")}
          </span>
          <CapabilityIcon capabilityId={capability.id} />
        </div>
        <Badge className="mt-5" variant="neutral">
          {capability.category}
        </Badge>
        <h3 className="type-heading-4 text-foreground mt-4 text-balance">
          {capability.label}
        </h3>
        <p className="text-muted-foreground mt-4 text-sm leading-6">
          {capability.description}
        </p>
      </article>
    </li>
  );
}

function CapabilityFlow({
  capabilities,
}: {
  capabilities: readonly SystemsPageCapability[];
}) {
  const flowCapabilities = conceptualFlowOrder
    .map((id) => capabilities.find((capability) => capability.id === id))
    .filter((capability): capability is SystemsPageCapability =>
      Boolean(capability),
    );

  if (!flowCapabilities.length) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="surface-data mt-8 overflow-hidden rounded-lg p-5 md:p-6"
    >
      <div className="flex items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
        <span className="type-label text-gold-warm">
          System Handling Layers
        </span>
        <span className="text-subtle-foreground text-xs font-semibold">
          Conceptual relationship
        </span>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-[repeat(5,minmax(0,1fr))] md:items-center">
        {flowCapabilities.map((capability, index) => (
          <div
            className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-center"
            key={capability.id}
          >
            <div className="bg-surface-elevated/90 rounded-md border border-[var(--border-strong)] px-4 py-3">
              <p className="text-foreground text-sm font-semibold">
                {capability.label}
              </p>
            </div>
            {index < flowCapabilities.length - 1 ? (
              <ArrowRight className="text-subtle-foreground hidden size-4 shrink-0 md:block" />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export function SystemCapabilityArchitecture({
  system,
}: SystemCapabilityArchitectureProps) {
  if (!system || !system.capabilities.length) {
    return <EmptyCapabilityState />;
  }

  return (
    <section
      className="bg-surface/70 border-t border-[var(--border)] py-12 md:py-14 xl:py-16"
      id="system-capabilities"
    >
      <Container size="wide">
        <div className="max-w-3xl">
          <SectionLabel variant="gold">System Capabilities</SectionLabel>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <h2 className="type-heading-2 text-foreground text-balance">
              System-level capabilities govern how signals become managed trade
              execution.
            </h2>
            <Badge className="shrink-0" variant="premium">
              {system.capabilities.length} Canonical Capabilities
            </Badge>
          </div>
          <p className="type-body text-muted-foreground mt-5">
            {system.name} is broader than signal generation because it combines
            interpretation, execution, risk logic, position handling, and trade
            lifecycle management within the current public system capability
            set.
          </p>
        </div>

        <ul className="mt-8 grid list-none gap-4 md:grid-cols-2 xl:grid-cols-6">
          {system.capabilities.map((capability, index) => (
            <CapabilityCard
              capability={capability}
              index={index}
              key={capability.id}
            />
          ))}
        </ul>

        <CapabilityFlow capabilities={system.capabilities} />
      </Container>
    </section>
  );
}
