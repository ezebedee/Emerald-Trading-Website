import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

const workflowStages = [
  {
    number: "01",
    title: "Configure",
    copy: "Configure signal modules, timeframes, alert behavior, Scanner behavior, and optional chart-template context.",
  },
  {
    number: "02",
    title: "Select",
    copy: "Choose instruments, favorite symbols, and favorite signal modules.",
  },
  {
    number: "03",
    title: "Scan & Filter",
    copy: "Monitor resulting signals and narrow the dashboard using session, direction, Favorites, and other supported filters.",
  },
  {
    number: "04",
    title: "Open & Review",
    copy: "Use View to open the associated chart and inspect the signal arrow, originating candle, vertical marker, and TP reference in context.",
  },
] as const;

export function ScannerWorkflow() {
  return (
    <section className="bg-surface-soft/25 border-y border-[var(--border)] py-14 md:py-16 xl:py-20">
      <Container size="wide">
        <div className="max-w-4xl">
          <SectionLabel variant="gold">Four-Stage Workflow</SectionLabel>
          <h2 className="type-heading-2 text-foreground mt-4 text-balance">
            Configure, select, scan and filter, then open the chart context.
          </h2>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-2">
          {["Configure", "Select", "Scan & Filter", "Open Chart"].map(
            (label, index, labels) => (
              <div key={label} className="flex items-center gap-2">
                <Badge
                  variant={index === labels.length - 1 ? "premium" : "neutral"}
                >
                  {label}
                </Badge>
                {index < labels.length - 1 ? (
                  <ArrowRight
                    aria-hidden="true"
                    className="text-muted-foreground size-4"
                  />
                ) : null}
              </div>
            ),
          )}
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {workflowStages.map((stage) => (
            <article
              key={stage.number}
              className="surface-elevated rounded-lg p-5"
            >
              <span className="numeric text-gold-warm text-sm font-semibold">
                {stage.number}
              </span>
              <h3 className="text-foreground mt-3 text-xl font-semibold">
                {stage.title}
              </h3>
              <p className="text-muted-foreground mt-3 text-sm leading-6">
                {stage.copy}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
