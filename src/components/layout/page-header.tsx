import type { HTMLAttributes, ReactNode } from "react";
import { Heading } from "@/components/ui/heading";
import { SectionLabel } from "@/components/ui/section-label";
import { cn } from "@/lib/utils";

export type PageHeaderProps = HTMLAttributes<HTMLDivElement> & {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
};

export function PageHeader({
  actions,
  className,
  description,
  eyebrow,
  title,
  ...props
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between",
        className,
      )}
      {...props}
    >
      <div className="max-w-[760px]">
        {eyebrow ? <SectionLabel variant="gold">{eyebrow}</SectionLabel> : null}
        <Heading level="h1" size="h1" className={cn(eyebrow && "mt-4")}>
          {title}
        </Heading>
        {description ? (
          <p className="type-body-large text-muted-foreground mt-5 max-w-[720px]">
            {description}
          </p>
        ) : null}
      </div>

      {actions ? (
        <div className="flex flex-col gap-3 sm:flex-row lg:pt-10">
          {actions}
        </div>
      ) : null}
    </div>
  );
}
