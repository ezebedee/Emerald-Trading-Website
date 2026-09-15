import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { TextLink } from "@/components/ui/text-link";
import {
  companyLegalPages,
  type CompanyLegalPage,
} from "@/data/content/company-legal";

export function CompanyLegalContent({
  page,
}: {
  page: keyof typeof companyLegalPages;
}) {
  const content: CompanyLegalPage = companyLegalPages[page];
  return (
    <Container
      size="narrow"
      className="space-y-10 py-12 md:space-y-12 md:py-16"
    >
      <header className="space-y-5">
        <SectionLabel variant="gold">{content.label}</SectionLabel>
        <h1 className="type-heading-1">{content.title}</h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          {content.introduction}
        </p>
      </header>
      {content.sections.map((section) => (
        <section
          key={section.title}
          className="space-y-4 border-t border-[var(--border)] pt-7"
        >
          <h2 className="type-heading-3">{section.title}</h2>
          {section.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="text-muted-foreground leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
          {section.link ? (
            <TextLink className="inline-block" href={section.link.href}>
              {section.link.label}
            </TextLink>
          ) : null}
        </section>
      ))}
    </Container>
  );
}
