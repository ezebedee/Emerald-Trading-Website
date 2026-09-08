import { ArrowRight, ShieldAlert } from "lucide-react";

import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

const boundaryItems = [
  "View opens chart context; it does not execute trades.",
  "Signal arrows and markers identify signal context; they are not order records.",
  "Take-Profit Reference means a suggested/reference level, not an assured result.",
  "Alerts are informational notifications, not instructions to enter a position.",
] as const;

export function ScannerBoundary() {
  return (
    <section className="py-14 md:py-16 xl:py-20">
      <Container size="wide">
        <div className="surface-premium rounded-lg p-6 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
            <div>
              <ShieldAlert
                aria-hidden="true"
                className="text-gold-warm size-6"
              />
              <SectionLabel className="mt-5" variant="gold">
                Signal vs Trade Boundary
              </SectionLabel>
              <h2 className="type-heading-2 text-foreground mt-4 text-balance">
                Scanner output remains reviewable signal context.
              </h2>
              <p className="type-body text-muted-foreground mt-5">
                The Scanner is a monitoring, filtering, alerting, and chart
                review product. Execution and trade management remain separate
                product or user workflow decisions.
              </p>
              <div className="mt-6">
                <LinkButton
                  href="/signals"
                  variant="secondary"
                  trailingIcon={<ArrowRight aria-hidden="true" />}
                >
                  Review Signal Library
                </LinkButton>
              </div>
            </div>
            <ul className="grid gap-3">
              {boundaryItems.map((item) => (
                <li
                  key={item}
                  className="bg-surface/70 text-muted-foreground rounded-md border border-[var(--border)] px-4 py-3 text-sm leading-6"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
