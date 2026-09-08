import { Bell, Eye, Filter, ListChecks } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import type { SignalModule } from "@/domain";

const scannerCapabilities = [
  {
    title: "Multi-Signal Monitoring",
    icon: ListChecks,
    copy: "Monitor selected Emerald signal modules across the user's chosen instrument set.",
  },
  {
    title: "Filterable Results",
    icon: Filter,
    copy: "Narrow the dashboard by session, signal direction, Favorites, and supported freshness filters.",
  },
  {
    title: "Chart Context View",
    icon: Eye,
    copy: "Use View to open the associated chart and review the signal in surrounding price structure.",
  },
  {
    title: "Optional Alerts",
    icon: Bell,
    copy: "Fresh-signal alerts can operate alongside monitoring when enabled in Scanner configuration.",
  },
] as const;

type ScannerOverviewProps = Readonly<{
  signalModules: readonly SignalModule[];
}>;

export function ScannerOverview({ signalModules }: ScannerOverviewProps) {
  return (
    <section className="py-14 md:py-16 xl:py-20">
      <Container size="wide">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <SectionLabel variant="gold">What the Scanner Does</SectionLabel>
            <h2 className="type-heading-2 text-foreground mt-4 max-w-3xl text-balance">
              The Scanner centralizes signal monitoring without turning signals
              into trades.
            </h2>
            <p className="type-body text-muted-foreground mt-5">
              It consumes the Emerald signal framework and presents matching
              Scanner results for review. The dashboard is a monitoring and
              context workflow, separate from execution, order placement, or
              account performance reporting.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {signalModules.map((module) => (
                <Badge key={module.id} variant="neutral">
                  {module.name}
                </Badge>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {scannerCapabilities.map(({ title, icon: Icon, copy }) => (
              <article key={title} className="surface-elevated rounded-lg p-5">
                <Icon aria-hidden="true" className="text-gold-warm size-5" />
                <h3 className="text-foreground mt-4 text-xl font-semibold">
                  {title}
                </h3>
                <p className="text-muted-foreground mt-3 text-sm leading-6">
                  {copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
