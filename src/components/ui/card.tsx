import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const cardVariants = {
  default: "surface-default",
  elevated: "surface-elevated",
  data: "surface-data",
  premium: "surface-premium",
  interactive:
    "surface-elevated transition-standard hover:-translate-y-0.5 hover:border-[var(--border-emerald)] hover:bg-surface-soft",
} as const;

type CardVariant = keyof typeof cardVariants;

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: CardVariant;
};

export function Card({ className, variant = "default", ...props }: CardProps) {
  return (
    <div
      className={cn("rounded-lg", cardVariants[variant], className)}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-2 p-5 pb-3", className)} {...props} />;
}

export function CardTitle({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("type-heading-4 text-foreground", className)}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("type-body-small text-muted-foreground", className)}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-5 pt-3", className)} {...props} />;
}

export function CardFooter({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("border-t border-[var(--border)] p-5 pt-4", className)}
      {...props}
    />
  );
}
