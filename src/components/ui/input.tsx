import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean;
};

export function Input({ className, hasError = false, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "focus-emerald transition-standard bg-surface text-foreground placeholder:text-subtle-foreground h-10 w-full rounded-md border px-3 text-sm disabled:cursor-not-allowed disabled:opacity-45",
        hasError
          ? "border-negative"
          : "border-[var(--border)] hover:border-[var(--border-strong)]",
        className,
      )}
      {...props}
    />
  );
}
