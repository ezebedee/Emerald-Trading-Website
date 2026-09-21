import { GitBranch, RefreshCw, ShieldAlert, Workflow } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

const managedAreas = [
  {
    title: "Open trade state",
    copy: "Monitors the managed sequence and current trade state according to configured logic.",
    icon: ShieldAlert,
  },
  {
    title: "Subsequent recovery actions",
    copy: "Handles recovery actions after the trader-initiated first trade has opened the sequence.",
    icon: RefreshCw,
  },
  {
    title: "Trade lifecycle coordination",
    copy: "Coordinates the sequence through its configured trade-management stages.",
    icon: Workflow,
  },
  {
    title: "Configured objective context",
    copy: "May track accumulated loss exposure and intended recovery or profit objective conceptually.",
    icon: GitBranch,
  },
] as const;

export function RecoveryManagementScope() {
  return (
    <section className="py-14 md:py-16 xl:py-20">
      <Container size="wide">
        <div className="max-w-3xl">
          <SectionLabel variant="gold">Management Scope</SectionLabel>
          <h2 className="type-heading-2 text-foreground mt-4 text-balance">
            What the Expert manages after the first trade.
          </h2>
          <p className="type-body text-muted-foreground mt-5">
            Recovery Expert is not a signal library or performance page. Its
            role is the assisted trade-management layer that follows a
            trader-initiated first entry.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {managedAreas.map((area) => {
            const Icon = area.icon;

            return (
              <article
                key={area.title}
                className="surface-elevated rounded-lg p-5"
              >
                <Icon aria-hidden="true" className="text-gold-warm size-5" />
                <h3 className="text-foreground mt-4 text-lg font-semibold">
                  {area.title}
                </h3>
                <p className="text-muted-foreground mt-3 text-sm leading-6">
                  {area.copy}
                </p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
