import type { AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type TextLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;

export function TextLink({ className, ...props }: TextLinkProps) {
  return (
    <a
      className={cn(
        "focus-emerald transition-standard text-emerald-bright hover:text-foreground hover:decoration-emerald font-medium underline decoration-[var(--border-emerald)] underline-offset-4",
        className,
      )}
      {...props}
    />
  );
}
