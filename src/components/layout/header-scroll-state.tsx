"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const scrollThreshold = 24;

export type HeaderScrollStateProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
};

export function HeaderScrollState({
  children,
  className,
  ...props
}: HeaderScrollStateProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const isScrolledRef = useRef(false);

  useEffect(() => {
    function updateScrollState() {
      const nextScrolled = window.scrollY > scrollThreshold;

      if (nextScrolled !== isScrolledRef.current) {
        isScrolledRef.current = nextScrolled;
        setIsScrolled(nextScrolled);
      }
    }

    const frame = window.requestAnimationFrame(updateScrollState);
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateScrollState);
    };
  }, []);

  return (
    <header
      data-scrolled={isScrolled ? "true" : "false"}
      className={cn(
        "sticky top-0 z-40 border-b border-[var(--border)] bg-[rgba(7,10,8,0.92)] shadow-none backdrop-blur-sm transition-[background-color,border-color,box-shadow,backdrop-filter] duration-200 ease-out data-[scrolled=true]:border-[var(--border-strong)] data-[scrolled=true]:bg-[rgba(7,10,8,0.985)] data-[scrolled=true]:shadow-[0_8px_24px_rgba(0,0,0,0.18)] motion-reduce:transition-none",
        className,
      )}
      {...props}
    >
      {children}
    </header>
  );
}
