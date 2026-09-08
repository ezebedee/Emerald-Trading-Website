import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

const comparisonRows = [
  {
    capability: "First trade",
    recovery: "Trader initiated",
    quant: "Automated",
  },
  {
    capability: "Management",
    recovery: "Semi-automated",
    quant: "Fully automated",
  },
  {
    capability: "Access",
    recovery: "Public Subscription",
    quant: "Private Investor",
  },
  {
    capability: "Product layer",
    recovery: "Assisted Execution",
    quant: "Automated Execution",
  },
] as const;

export function RecoveryVsQuant() {
  return (
    <section className="py-14 md:py-16 xl:py-20">
      <Container size="wide">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <SectionLabel variant="gold">
              Recovery Expert vs Quant System
            </SectionLabel>
            <h2 className="type-heading-2 text-foreground mt-4 text-balance">
              Assisted management is separate from private full automation.
            </h2>
            <p className="type-body text-muted-foreground mt-5">
              Recovery Expert is a public subscription product built around
              trader-first entry. Emerald Quant System is a private investor
              system with broader proprietary automated execution logic.
            </p>
            <div className="mt-7">
              <LinkButton
                href="/systems/quant"
                variant="premium"
                trailingIcon={<ArrowRight aria-hidden="true" />}
              >
                Explore Quant System
              </LinkButton>
            </div>
          </div>

          <div className="grid gap-4 md:hidden">
            {comparisonRows.map((row) => (
              <article
                key={row.capability}
                className="surface-elevated rounded-lg p-5"
              >
                <p className="type-label text-subtle-foreground">
                  {row.capability}
                </p>
                <div className="mt-4 grid gap-3">
                  <div>
                    <Badge variant="neutral">Recovery Expert</Badge>
                    <p className="text-foreground mt-2 font-semibold">
                      {row.recovery}
                    </p>
                  </div>
                  <div>
                    <Badge variant="premium">Quant System</Badge>
                    <p className="text-foreground mt-2 font-semibold">
                      {row.quant}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="surface-data hidden overflow-hidden rounded-lg md:block">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">
                Recovery Expert and Quant System product comparison
              </caption>
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="type-label text-subtle-foreground p-4">
                    Capability
                  </th>
                  <th className="type-label text-subtle-foreground p-4">
                    Recovery Expert
                  </th>
                  <th className="type-label text-subtle-foreground p-4">
                    Quant System
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr
                    key={row.capability}
                    className="border-b border-[var(--border)] last:border-b-0"
                  >
                    <th className="text-foreground p-4 text-sm font-semibold">
                      {row.capability}
                    </th>
                    <td className="text-muted-foreground p-4 text-sm">
                      {row.recovery}
                    </td>
                    <td className="text-muted-foreground p-4 text-sm">
                      {row.quant}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </section>
  );
}
