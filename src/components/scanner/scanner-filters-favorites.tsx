import { Filter, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

const filters = [
  "Trading session",
  "Signal direction",
  "Favorites",
  "Freshness/time filters where available",
] as const;

export function ScannerFiltersFavorites() {
  return (
    <section className="bg-surface-soft/25 border-y border-[var(--border)] py-14 md:py-16 xl:py-20">
      <Container size="wide">
        <div className="grid gap-8 lg:grid-cols-[0.76fr_1.24fr]">
          <div>
            <SectionLabel variant="gold">Filters & Favorites</SectionLabel>
            <h2 className="type-heading-2 text-foreground mt-4 text-balance">
              Narrow the dashboard without changing the signal meaning.
            </h2>
            <p className="type-body text-muted-foreground mt-5">
              Filters help organize Scanner results for review. They may be
              combined to focus on sessions, directions, favorite instruments,
              favorite signal modules, and freshness where supported.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {filters.map((filter) => (
              <article key={filter} className="surface-elevated rounded-lg p-5">
                <Filter aria-hidden="true" className="text-gold-warm size-5" />
                <h3 className="text-foreground mt-4 text-xl font-semibold">
                  {filter}
                </h3>
                <p className="text-muted-foreground mt-3 text-sm leading-6">
                  Used to refine what the monitoring dashboard displays.
                </p>
              </article>
            ))}
            <article className="surface-premium rounded-lg p-5 sm:col-span-2">
              <Star aria-hidden="true" className="text-gold-warm size-5" />
              <Badge className="mt-4" variant="premium">
                Favorites
              </Badge>
              <p className="text-muted-foreground mt-3 text-sm leading-6">
                Favorites can focus the Scanner around preferred symbols and
                preferred signal modules without implying signal ranking or
                performance priority.
              </p>
            </article>
          </div>
        </div>
      </Container>
    </section>
  );
}
