import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const containerVariants = {
  narrow: "container-narrow",
  standard: "container-standard",
  wide: "container-wide",
  ultra: "container-ultra",
} as const;

type ContainerVariant = keyof typeof containerVariants;

export type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  size?: ContainerVariant;
};

export function Container({
  className,
  size = "standard",
  ...props
}: ContainerProps) {
  return <div className={cn(containerVariants[size], className)} {...props} />;
}
