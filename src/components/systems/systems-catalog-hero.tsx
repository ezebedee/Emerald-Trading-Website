import { ArrowRight, Boxes } from "lucide-react";

import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

export function SystemsCatalogHero() {
  return (
    <section className="bg-background py-14 md:py-16 xl:py-20">
      <Container size="wide">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,0.88fr)_minmax(360px,0.72fr)] xl:items-center">
          <div className="max-w-4xl">
            <SectionLabel variant="gold">
              Emerald Systems & Products
            </SectionLabel>
            <h1 className="type-display text-foreground mt-4 text-balance">
              Trading technology across analysis, monitoring, assisted
              execution, and full automation.
            </h1>
            <p className="type-heading-3 text-muted-foreground mt-5 max-w-3xl text-balance">
              Emerald Legacy Systems develops a family of trading tools spanning
              signal generation, market monitoring, semi-automated management,
              and private automated execution.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LinkButton
                href="#product-catalog"
                size="lg"
                trailingIcon={<ArrowRight aria-hidden="true" />}
              >
                Explore Products
              </LinkButton>
              <LinkButton
                href="/platforms"
                size="lg"
                variant="secondary"
                trailingIcon={<ArrowRight aria-hidden="true" />}
              >
                View Platforms
              </LinkButton>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="surface-data relative min-h-[320px] overflow-hidden rounded-lg p-5 md:p-6"
          >
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(0,120,86,0.18),transparent_42%),radial-gradient(circle_at_80%_20%,rgba(244,201,93,0.1),transparent_32%)]" />
            <div className="relative flex items-center justify-between border-b border-[var(--border)] pb-4">
              <span className="type-label text-gold-warm">
                Product Ecosystem
              </span>
              <Boxes className="text-emerald-bright size-5" />
            </div>
            <div className="relative mt-6 grid gap-4">
              {[
                "Analysis & Signal",
                "Monitoring & Scanning",
                "Assisted Execution",
                "Automated Execution",
              ].map((label, index) => (
                <div
                  key={label}
                  className="bg-surface-elevated/90 rounded-md border border-[var(--border-strong)] p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-foreground text-sm font-semibold">
                      {label}
                    </span>
                    <span className="numeric text-subtle-foreground text-xs">
                      0{index + 1}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-muted-foreground relative mt-6 text-sm leading-6">
              Products can support different workflows independently; the
              catalog does not imply a mandatory purchase sequence.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
