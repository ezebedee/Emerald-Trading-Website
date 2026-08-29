import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const dividerVariants = {
  default: "border-[var(--border)]",
  emerald: "border-[var(--border-emerald)]",
  gold: "border-[var(--border-gold)]",
} as const;

type DividerVariant = keyof typeof dividerVariants;

export type DividerProps = HTMLAttributes<HTMLHRElement> & {
  variant?: DividerVariant;
};

export function Divider({
  className,
  variant = "default",
  ...props
}: DividerProps) {
  return (
    <hr
      className={cn(
        "h-px w-full border-0 border-t",
        dividerVariants[variant],
        className,
      )}
      {...props}
    />
  );
}
