import Link, { type LinkProps } from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils";

export const buttonVariants = {
  primary:
    "border-[var(--border-emerald)] bg-emerald-dark text-foreground hover:bg-emerald",
  secondary:
    "border-[var(--border)] bg-surface-elevated text-foreground hover:border-[var(--border-strong)] hover:bg-surface-soft",
  outline:
    "border-[var(--border-strong)] bg-transparent text-foreground hover:border-[var(--border-emerald)] hover:bg-[var(--emerald-soft)]",
  ghost:
    "border-transparent bg-transparent text-muted-foreground hover:bg-surface-soft hover:text-foreground",
  premium:
    "border-[var(--border-gold)] bg-[var(--gold-soft)] text-gold-warm shadow-[var(--shadow-gold)] hover:border-gold hover:text-foreground",
  danger:
    "border-transparent bg-negative text-background hover:bg-[color-mix(in_srgb,var(--negative)_88%,white)]",
} as const;

export const buttonSizes = {
  sm: "h-9 gap-2 px-3 text-xs",
  md: "h-10 gap-2.5 px-4 text-sm",
  lg: "h-12 gap-3 px-5 text-base",
} as const;

export type ButtonVariant = keyof typeof buttonVariants;
export type ButtonSize = keyof typeof buttonSizes;

export function getButtonClassName({
  className,
  variant = "primary",
  size = "md",
  isLoading = false,
}: {
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}) {
  return cn(
    "focus-emerald transition-standard inline-flex items-center justify-center rounded-md border font-semibold whitespace-nowrap disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-45 aria-disabled:pointer-events-none aria-disabled:opacity-45",
    buttonVariants[variant],
    buttonSizes[size],
    isLoading && "cursor-wait opacity-75",
    className,
  );
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
};

export function Button({
  className,
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  leadingIcon,
  trailingIcon,
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      className={getButtonClassName({ className, variant, size, isLoading })}
      disabled={disabled || isLoading}
      type={type}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {leadingIcon ? (
        <span aria-hidden="true" className="inline-flex size-4 items-center">
          {leadingIcon}
        </span>
      ) : null}
      <span>{children}</span>
      {trailingIcon ? (
        <span aria-hidden="true" className="inline-flex size-4 items-center">
          {trailingIcon}
        </span>
      ) : null}
    </button>
  );
}

export type LinkButtonProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
    isDisabled?: boolean;
    leadingIcon?: ReactNode;
    trailingIcon?: ReactNode;
  };

export function LinkButton({
  className,
  children,
  variant = "primary",
  size = "md",
  isDisabled = false,
  leadingIcon,
  trailingIcon,
  href,
  ...props
}: LinkButtonProps) {
  return (
    <Link
      aria-disabled={isDisabled || undefined}
      className={getButtonClassName({ className, variant, size })}
      href={href}
      tabIndex={isDisabled ? -1 : props.tabIndex}
      {...props}
    >
      {leadingIcon ? (
        <span aria-hidden="true" className="inline-flex size-4 items-center">
          {leadingIcon}
        </span>
      ) : null}
      <span>{children}</span>
      {trailingIcon ? (
        <span aria-hidden="true" className="inline-flex size-4 items-center">
          {trailingIcon}
        </span>
      ) : null}
    </Link>
  );
}
