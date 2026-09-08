import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { ScannerProductImage } from "@/components/scanner/scanner-product-image";
import type { ImageAsset } from "@/types/assets";

type ScannerStageSectionProps = Readonly<{
  id: string;
  eyebrow: string;
  title: string;
  copy: string;
  bullets: readonly string[];
  asset?: ImageAsset;
  caption: string;
  reverse?: boolean;
}>;

export function ScannerStageSection({
  id,
  eyebrow,
  title,
  copy,
  bullets,
  asset,
  caption,
  reverse = false,
}: ScannerStageSectionProps) {
  return (
    <section id={id} className="scroll-anchor py-14 md:py-16 xl:py-20">
      <Container size="wide">
        <div
          className={`grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-center ${
            reverse ? "lg:[&>figure]:order-first" : ""
          }`}
        >
          <article className="surface-elevated rounded-lg p-5 md:p-6">
            <Badge variant="premium">{eyebrow}</Badge>
            <h2 className="type-heading-2 text-foreground mt-4 text-balance">
              {title}
            </h2>
            <p className="type-body text-muted-foreground mt-5">{copy}</p>
            <ul className="mt-6 grid gap-3">
              {bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="bg-surface-soft/60 text-muted-foreground rounded-md border border-[var(--border)] px-4 py-3 text-sm leading-6"
                >
                  {bullet}
                </li>
              ))}
            </ul>
          </article>
          <ScannerProductImage asset={asset} caption={caption} />
        </div>
      </Container>
    </section>
  );
}
