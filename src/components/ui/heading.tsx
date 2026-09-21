import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const headingSizes = {
  displayXl: "type-display-xl",
  display: "type-display",
  h1: "type-heading-1",
  h2: "type-heading-2",
  h3: "type-heading-3",
  h4: "type-heading-4",
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
