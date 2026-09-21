import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { TextLink } from "@/components/ui/text-link";
import { performanceLinks } from "@/data/content/performance-evidence";

export function EvidenceLayout({
  path,
  label,
  title,
  introduction,
  children,
}: {
  path: string;
  label: string;
  title: string;
  introduction: string;
  children: ReactNode;
}) {
  return (
    <Container className="py-12 md:py-16">
      <header className="max-w-4xl space-y-5">
        <SectionLabel variant="gold">{label}</SectionLabel>
        <h1 className="type-heading-1 text-foreground">{title}</h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          {introduction}
        </p>
      </header>
      <nav
        aria-label="Performance resources"
        className="my-10 flex flex-wrap gap-x-6 gap-y-4 border-y border-[var(--border)] py-5 text-sm"
      >
        {performanceLinks.map((link) => (
          <TextLink
            key={link.href}
            href={link.href}
            aria-current={path === link.href ? "page" : undefined}
            className={path === link.href ? "text-gold-warm" : undefined}
          >
            {link.label}
          </TextLink>
        ))}
      </nav>
      <div className="space-y-12 md:space-y-16">{children}</div>
      <aside
        aria-label="Performance risk context"
        className="text-muted-foreground mt-12 border-t border-[var(--border)] pt-6 text-sm leading-relaxed"
      >
        Historical and backtest results do not guarantee future performance.
        Forward/demo records are not real-money performance. Execution
        conditions differ between simulation, demo and real-money trading.
        Losses are possible.
      </aside>
    </Container>
  );
}

export function EvidenceSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-6">
      <h2 className="type-heading-3 text-foreground">{title}</h2>
      {children}
    </section>
  );
}

export function EvidenceNotes({
  items,
}: {
  items: readonly { title: string; text: string }[];
}) {
  return (
    <dl className="grid gap-x-10 md:grid-cols-2">
      {items.map((item) => (
        <div key={item.title} className="border-t border-[var(--border)] py-5">
          <dt className="text-foreground font-semibold">{item.title}</dt>
          <dd className="text-muted-foreground mt-2 leading-relaxed">
            {item.text}
          </dd>
        </div>
      ))}
    </dl>
  );
}
