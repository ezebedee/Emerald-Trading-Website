import type { HTMLAttributes } from "react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

const pageShellVariants = {
  narrow: "narrow",
  standard: "standard",
  wide: "wide",
  dashboard: "ultra",
} as const;

export type PageShellVariant = keyof typeof pageShellVariants;

export type PageShellProps = HTMLAttributes<HTMLDivElement> & {
  variant?: PageShellVariant;
};

export function PageShell({
  children,
  className,
  variant = "standard",
  ...props
}: PageShellProps) {
  return (
    <Container
      data-page-shell={variant}
      size={pageShellVariants[variant]}
      className={cn("py-12 md:py-16 xl:py-20", className)}
      {...props}
    >
      {children}
    </Container>
  );
}
