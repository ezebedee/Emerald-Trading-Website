import Link from "next/link";
import { Activity, Database, Eye, FileCheck2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

const trustItems = [
  {
    title: "Public Demo Reference Account",
    description:
      "Public account classification is stated clearly before performance details are presented.",
    icon: Database,
  },
  {
    title: "Forward Performance Record",
    description:
      "Public forward-performance records are maintained separately from historical backtests.",
    icon: Activity,
  },
  {
    title: "Documented Performance",
    description:
      "Results are organized over time with supporting methodology and account evidence.",
    icon: FileCheck2,
  },
  {
    title: "Read-Only Review Access",
    description: "Read-only review access may be provided separately.",
    icon: Eye,
  },
] as const;

export function HomeTrustStrip() {
  return (
    <section className="bg-surface/70 border-y border-[var(--border)] py-8 md:py-10 xl:py-12">
      <Container size="wide">
        <div className="grid gap-7">
          <div className="max-w-4xl">
            <SectionLabel variant="gold">
              Documented Performance Framework
            </SectionLabel>
            <h2 className="type-heading-3 text-foreground mt-4 max-w-2xl text-balance">
              Forward performance, documented with clear account classification.
            </h2>
            <p className="type-body text-muted-foreground mt-4 max-w-3xl">
              The public performance record uses a designated Public Demo
              Reference Account and remains distinct from historical backtesting
              or private account information.
            </p>
            <Link
              href="/verification"
              className="focus-emerald transition-standard text-emerald-bright hover:text-foreground mt-5 inline-flex text-sm font-semibold underline decoration-[var(--border-emerald)] underline-offset-4"
            >
              How Performance Is Documented
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {trustItems.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="bg-surface-elevated/70 rounded-lg border border-[var(--border)] p-3.5"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      aria-hidden="true"
                      className="text-gold-warm size-4 shrink-0"
                      strokeWidth={1.8}
                    />
                    <h3 className="text-foreground text-sm font-semibold">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground mt-2 text-xs leading-5">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
