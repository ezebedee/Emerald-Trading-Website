"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { isActiveRoute, navigationLinks } from "@/components/layout/navigation";
import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const pathname = usePathname();
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setIsOpen(false));

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    }

    function handlePointerDown(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !rootRef.current?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    function handleDesktopResize(event: MediaQueryListEvent) {
      if (event.matches) {
        setIsOpen(false);
      }
    }

    const desktopQuery = window.matchMedia("(min-width: 1280px)");
    desktopQuery.addEventListener("change", handleDesktopResize);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      desktopQuery.removeEventListener("change", handleDesktopResize);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen]);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <div ref={rootRef} className="xl:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-controls={panelId}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        className="focus-emerald transition-standard bg-surface text-foreground hover:bg-surface-elevated flex size-11 items-center justify-center rounded-md border border-[var(--border-strong)]"
        onClick={() => setIsOpen((current) => !current)}
      >
        {isOpen ? (
          <X aria-hidden="true" className="size-5" strokeWidth={1.8} />
        ) : (
          <Menu aria-hidden="true" className="size-5" strokeWidth={1.8} />
        )}
      </button>

      {isOpen ? (
        <div
          data-mobile-menu-panel=""
          id={panelId}
          className="fixed top-[var(--header-height-mobile)] right-0 left-0 z-30 max-h-[calc(100dvh-var(--header-height-mobile))] animate-[mobile-menu-enter_180ms_ease-out] overflow-y-auto border-y border-t-[var(--border)] border-b-[var(--border-strong)] bg-[rgba(9,13,11,0.98)] py-5 backdrop-blur-sm motion-reduce:animate-none md:py-7 xl:hidden"
        >
          <Container size="wide">
            <nav aria-label="Mobile navigation">
              <ul className="grid gap-1">
                {navigationLinks.map((link) => {
                  const isActive = isActiveRoute(pathname, link.href);

                  return (
                    <li key={link.href}>
                      <Link
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "focus-emerald transition-standard text-muted-foreground hover:text-foreground relative flex min-h-11 items-center border-l-2 border-transparent py-2.5 pr-3 pl-4 text-base font-medium",
                          isActive && "border-l-emerald text-gold-warm",
                        )}
                        href={link.href}
                        onClick={closeMenu}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="mt-5 border-t border-[var(--border)] pt-5 md:mt-6 md:flex md:items-center md:gap-3 md:pt-6">
              <LinkButton
                className="w-full md:w-auto"
                href="/ledger"
                size="md"
                variant="primary"
                onClick={closeMenu}
              >
                Follow Performance
              </LinkButton>
              <LinkButton
                className="mt-3 w-full md:mt-0 md:w-auto"
                href="/private-access"
                size="md"
                variant="premium"
                onClick={closeMenu}
              >
                Request Private Access
              </LinkButton>
            </div>
          </Container>
        </div>
      ) : null}
    </div>
  );
}
