import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const badgeVariants = {
  default: "border-[var(--border)] bg-surface-soft text-muted-foreground",
  positive:
    "border-[var(--border-emerald)] bg-[var(--emerald-soft)] text-emerald-bright",
  negative: "border-transparent bg-[var(--negative-soft)] text-negative",
  warning: "border-transparent bg-[var(--warning-soft)] text-warning",
  info: "border-transparent bg-[rgba(90,167,232,0.10)] text-info",
  premium: "border-[var(--border-gold)] bg-[var(--gold-soft)] text-gold-warm",
  neutral: "border-[var(--border)] bg-transparent text-muted-foreground",
  live: "border-[var(--border-emerald)] bg-[var(--emerald-soft)] text-emerald-bright",
} as const;

type BadgeVariant = keyof typeof badgeVariants;

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "text-label inline-flex min-h-6 items-center rounded-full border px-2.5 py-1",
        badgeVariants[variant],
        className,
      )}
      {...props}
    />
  );
}
