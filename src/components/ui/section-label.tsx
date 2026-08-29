import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const sectionLabelVariants = {
  muted: "text-muted-foreground",
  emerald: "text-emerald-bright",
  gold: "text-gold-warm",
} as const;

type SectionLabelVariant = keyof typeof sectionLabelVariants;

export type SectionLabelProps = HTMLAttributes<HTMLParagraphElement> & {
  variant?: SectionLabelVariant;
};

export function SectionLabel({
  className,
  variant = "muted",
  ...props
}: SectionLabelProps) {
  return (
    <p
      className={cn("text-label", sectionLabelVariants[variant], className)}
      {...props}
    />
  );
}
