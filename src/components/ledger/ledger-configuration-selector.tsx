import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import type { LedgerConfigurationOption } from "@/data/selectors";
import { cn } from "@/lib/utils";

type LedgerConfigurationSelectorProps = Readonly<{
  options: readonly LedgerConfigurationOption[];
  selectedConfigurationName?: string;
}>;

export function LedgerConfigurationSelector({
  options,
  selectedConfigurationName,
}: LedgerConfigurationSelectorProps) {
  if (!options.length) {
    return null;
  }

  return (
    <section className="bg-surface/60 border-b border-[var(--border)] py-4 md:py-6">
      <Container size="wide">
        <nav
          aria-label="Ledger asset-class configuration"
          className="surface-elevated rounded-lg p-3.5 md:p-5"
        >
          <div className="flex flex-col gap-2.5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="type-label text-gold-warm">
                Asset-Class Configuration
              </p>
              <p className="text-muted-foreground mt-2 max-w-3xl text-sm leading-6">
                Select an available public configuration. Other asset classes
                remain family coverage only.
              </p>
            </div>

            {selectedConfigurationName ? (
              <div className="flex shrink-0 flex-wrap items-center gap-2 lg:justify-end">
                <span className="type-label text-subtle-foreground">
                  Selected
                </span>
                <Badge variant="premium">{selectedConfigurationName}</Badge>
              </div>
            ) : null}
          </div>

          <div className="mt-3.5 flex flex-wrap gap-2 md:mt-4">
            {options.map((option) =>
              option.available && option.href ? (
                <Link
                  aria-current={option.isSelected ? "page" : undefined}
                  className={cn(
                    "type-label inline-flex min-h-10 items-center rounded-full border px-4 py-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)]",
                    option.isSelected
                      ? "text-gold-warm border-[var(--border-gold)] bg-[var(--gold-soft)]"
                      : "text-muted-foreground hover:text-foreground border-[var(--border)] bg-transparent hover:border-[var(--border-strong)]",
                  )}
                  href={option.href}
                  key={option.marketCategory}
                >
                  {option.label}
                  {option.isSelected ? (
                    <span className="sr-only">, selected</span>
                  ) : null}
                </Link>
              ) : (
                <span
                  aria-label={`${option.label} - no public configuration currently available`}
                  className="type-label text-subtle-foreground inline-flex min-h-10 items-center rounded-full border border-[var(--border)] bg-transparent px-4 py-2 opacity-70"
                  key={option.marketCategory}
                  title={`No public ${option.label} configuration is currently available.`}
                >
                  {option.label}
                  <span className="sr-only">
                    , no public configuration currently available
                  </span>
                </span>
              ),
            )}
          </div>
        </nav>
      </Container>
    </section>
  );
}
