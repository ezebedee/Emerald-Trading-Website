import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

export function EngineeringLayout({
  label,
  title,
  introduction,
  children,
}: {
  label: string;
  title: string;
  introduction: string;
  children: ReactNode;
}) {
  return (
    <Container className="space-y-12 py-12 md:space-y-16 md:py-16">
      <header className="max-w-4xl space-y-5">
        <SectionLabel variant="gold">{label}</SectionLabel>
        <h1 className="type-heading-1 text-foreground">{title}</h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          {introduction}
        </p>
      </header>
      {children}
    </Container>
  );
}

export function EngineeringSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-6 border-t border-[var(--border)] pt-8">
      <h2 className="type-heading-3">{title}</h2>
      {children}
    </section>
  );
}
