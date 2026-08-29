import { PageHeader } from "@/components/layout/page-header";
import {
  PageShell,
  type PageShellVariant,
} from "@/components/layout/page-shell";

type PagePlaceholderProps = Readonly<{
  title: string;
  description?: string;
  variant?: PageShellVariant;
}>;

export function PagePlaceholder({
  title,
  description = "Development Placeholder",
  variant = "standard",
}: PagePlaceholderProps) {
  return (
    <PageShell variant={variant}>
      <PageHeader
        eyebrow="Emerald Legacy Systems"
        title={title}
        description={description}
      />
    </PageShell>
  );
}
