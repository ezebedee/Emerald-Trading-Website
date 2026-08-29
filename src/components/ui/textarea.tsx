import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  hasError?: boolean;
};

export function Textarea({
  className,
  hasError = false,
  ...props
}: TextareaProps) {
  return (
    <textarea
      className={cn(
        "focus-emerald transition-standard bg-surface text-foreground placeholder:text-subtle-foreground min-h-28 w-full resize-y rounded-md border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-45",
        hasError
          ? "border-negative"
          : "border-[var(--border)] hover:border-[var(--border-strong)]",
        className,
      )}
      {...props}
    />
  );
}
