import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const statusVariants = {
  online: "bg-emerald-bright shadow-[0_0_0_3px_var(--emerald-soft)]",
  offline: "bg-negative shadow-[0_0_0_3px_var(--negative-soft)]",
  warning: "bg-warning shadow-[0_0_0_3px_var(--warning-soft)]",
  neutral: "bg-subtle-foreground shadow-[0_0_0_3px_rgba(255,255,255,0.05)]",
  live: "bg-emerald-bright shadow-[0_0_0_3px_var(--emerald-soft)] motion-safe:animate-[status-soft-pulse_2.8s_ease-out_infinite]",
} as const;

type StatusVariant = keyof typeof statusVariants;

export type StatusDotProps = HTMLAttributes<HTMLSpanElement> & {
  status?: StatusVariant;
};

export function StatusDot({
  className,
  status = "neutral",
  ...props
}: StatusDotProps) {
  return (
    <span
      className={cn(
        "inline-block size-2.5 rounded-full",
        statusVariants[status],
        className,
      )}
      {...props}
    />
  );
}
