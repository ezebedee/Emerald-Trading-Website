import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const pageSectionVariants = {
  compact: "py-8 md:py-10 xl:py-12",
  default: "py-14 md:py-16 xl:py-20",
  loose: "py-16 md:py-20 xl:py-28",
} as const;

export type PageSectionVariant = keyof typeof pageSectionVariants;

export type PageSectionProps = HTMLAttributes<HTMLDivElement> & {
  variant?: PageSectionVariant;
};

export function PageSection({
  className,
  variant = "default",
  ...props
}: PageSectionProps) {
  return (
    <section
      className={cn(pageSectionVariants[variant], className)}
      {...props}
    />
  );
}
