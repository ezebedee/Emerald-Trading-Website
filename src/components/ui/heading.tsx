import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const headingSizes = {
  displayXl: "text-display-xl",
  display: "text-display",
  h1: "text-heading-1",
  h2: "text-heading-2",
  h3: "text-heading-3",
  h4: "text-heading-4",
} as const;

type HeadingLevel = "h1" | "h2" | "h3" | "h4";
type HeadingSize = keyof typeof headingSizes;

export type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  level?: HeadingLevel;
  size?: HeadingSize;
};

export function Heading({
  className,
  level = "h2",
  size,
  ...props
}: HeadingProps) {
  const Component = level;
  const resolvedSize = size ?? level;

  return (
    <Component
      className={cn(headingSizes[resolvedSize], "text-foreground", className)}
      {...props}
    />
  );
}
