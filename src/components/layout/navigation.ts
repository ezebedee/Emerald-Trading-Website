export const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/ledger", label: "Emerald Ledger" },
  { href: "/systems", label: "Systems" },
  { href: "/indicators", label: "Indicators & Signals" },
  { href: "/technology", label: "Technology" },
  { href: "/research", label: "Research" },
  { href: "/about", label: "About" },
] as const;

export function isActiveRoute(pathname: string, href: string) {
  if (href === "/") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}
