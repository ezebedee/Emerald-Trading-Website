import { Activity, Crosshair, Eye, ListChecks, Target } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

const workflowSteps = [
  {
    number: "01",
    title: "Trader Chooses Opportunity",
    copy: "The trader evaluates market context and decides whether an opportunity is worth entering.",
    icon: Crosshair,
  },
  {
    number: "02",
    title: "Trader Opens First Trade",
    copy: "The initial position is entered manually before the assisted workflow begins.",
    icon: Activity,
  },
  {
    number: "03",
    title: "Recovery Expert Monitors Trade State",
    copy: "The Expert monitors the managed sequence and trade state according to its configured logic.",
    icon: Eye,
  },
  {
    number: "04",
    title: "Recovery Logic Manages Subsequent Actions",
    copy: "Subsequent recovery and trade-management actions are handled algorithmically after the first trade.",
    icon: ListChecks,
  },
  {
    number: "05",
    title: "Sequence Is Managed Toward Configured Objective",
    copy: "The workflow is designed around recovery of accumulated loss exposure toward a configured objective.",
    icon: Target,
  },
] as const;

export function RecoveryWorkflow() {
  return (
    <section className="bg-surface-soft/25 border-y border-[var(--border)] py-14 md:py-16 xl:py-20">
      <Container size="wide">
        <div className="max-w-3xl">
          <SectionLabel variant="gold">Assisted Workflow</SectionLabel>
          <h2 className="type-heading-2 text-foreground mt-4 text-balance">
            From manual entry to assisted trade management.
          </h2>
          <p className="type-body text-muted-foreground mt-5">
            The workflow starts with the trader&apos;s first trade, then shifts
            into configured management logic for the active sequence.
          </p>
        </div>

        <ol className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {workflowSteps.map((step) => {
            const Icon = step.icon;

            return (
              <li key={step.number} className="surface-elevated rounded-lg p-5">
                <div className="flex items-center justify-between gap-4">
                  <span className="type-label text-gold-warm">
                    {step.number}
                  </span>
                  <Icon aria-hidden="true" className="text-gold-warm size-5" />
                </div>
                <h3 className="text-foreground mt-4 text-lg font-semibold">
                  {step.title}
                </h3>
                <p className="text-muted-foreground mt-3 text-sm leading-6">
                  {step.copy}
                </p>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
