import { AlertTriangle, Ban, CheckCircle2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

const notClaims = [
  "choose the first trade automatically",
  "guarantee recovery",
  "guarantee profit",
  "remove market risk",
  "make every signal executable",
  "become the private Quant System",
] as const;

export function RecoveryObjectiveBoundary() {
  return (
    <section className="bg-surface-soft/25 border-y border-[var(--border)] py-14 md:py-16 xl:py-20">
      <Container size="wide">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <article className="surface-premium rounded-lg p-5 md:p-7">
            <SectionLabel variant="gold">Recovery Objective</SectionLabel>
            <h2 className="type-heading-2 text-foreground mt-4 text-balance">
              Designed around a configured recovery and profit objective.
            </h2>
            <p className="type-body text-muted-foreground mt-5">
              Emerald Recovery Expert is designed to manage subsequent recovery
              actions with the objective of recovering accumulated losses and
              pursuing the configured profit objective.
            </p>
            <div className="mt-6 rounded-lg border border-[var(--border)] bg-black/15 p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle
                  aria-hidden="true"
                  className="text-warning mt-1 size-5 shrink-0"
                />
                <p className="text-muted-foreground text-sm leading-6">
                  Recovery logic can involve additional market exposure and does
                  not eliminate the risk of further loss.
                </p>
              </div>
            </div>
          </article>

          <article className="surface-elevated rounded-lg p-5 md:p-7">
            <SectionLabel variant="gold">Claim Boundary</SectionLabel>
            <h2 className="type-heading-3 text-foreground mt-4 text-balance">
              Recovery Expert does not make outcome promises.
            </h2>
            <ul className="mt-6 grid gap-3">
              {notClaims.map((claim) => (
                <li key={claim} className="flex gap-3">
                  <Ban
                    aria-hidden="true"
                    className="text-warning mt-0.5 size-4 shrink-0"
                  />
                  <span className="text-muted-foreground text-sm leading-6">
                    {claim}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              <Badge variant="neutral">
                No formula disclosure in this page
              </Badge>
              <Badge variant="neutral">No performance attribution</Badge>
              <Badge variant="neutral">No checkout or download</Badge>
            </div>
            <p className="text-muted-foreground mt-5 flex gap-3 text-sm leading-6">
              <CheckCircle2
                aria-hidden="true"
                className="text-emerald-bright mt-0.5 size-4 shrink-0"
              />
              <span>
                Exact recovery algorithm, lot-sizing logic, sequence rules, and
                closure conditions remain deferred until supplied by the product
                owner.
              </span>
            </p>
          </article>
        </div>
      </Container>
    </section>
  );
}
