"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationLinks, isActiveRoute } from "@/components/layout/navigation";
import { cn } from "@/lib/utils";

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary navigation" className="hidden xl:block">
      <ul className="flex items-center gap-6 2xl:gap-8">
        {navigationLinks.map((link) => {
          const isActive = isActiveRoute(pathname, link.href);

          return (
            <li key={link.href}>
              <Link
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "focus-emerald transition-standard text-muted-foreground hover:text-foreground relative inline-flex h-10 items-center text-sm font-medium",
                  isActive && "text-gold-warm",
                  "after:bg-emerald after:absolute after:right-0 after:-bottom-px after:left-0 after:h-0.5 after:origin-center after:scale-x-0 after:opacity-0 after:transition-transform after:duration-180 after:ease-out",
                  isActive && "after:scale-x-100 after:opacity-100",
                )}
                href={link.href}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
