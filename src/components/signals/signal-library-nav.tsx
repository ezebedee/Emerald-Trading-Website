import Link from "next/link";

import { Container } from "@/components/ui/container";
import type { SignalModule } from "@/domain";

import { getSignalModulePresentation } from "./signal-module-presentation";

type SignalLibraryNavProps = Readonly<{
  modules: readonly SignalModule[];
}>;

export function SignalLibraryNav({ modules }: SignalLibraryNavProps) {
  return (
    <nav
      aria-label="Signal library sections"
      className="bg-background/95 border-b border-[var(--border)] py-5"
    >
      <Container size="wide">
        <ul className="flex flex-wrap gap-2">
          {modules.map((module) => (
            <li key={module.id}>
              <Link
                href={`#${module.slug}`}
                className="focus-emerald transition-standard type-label bg-surface-soft text-muted-foreground hover:text-gold-warm inline-flex min-h-10 items-center rounded-full border border-[var(--border)] px-4 py-2 hover:border-[var(--border-gold)]"
              >
                {getSignalModulePresentation(module).anchorLabel}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  );
}
