import { ArrowRight, Bell, Smartphone } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

const alertFlow = [
  "Configuration",
  "Alerts enabled",
  "Scanner detects fresh signal",
  "Popup / push notification",
] as const;

export function ScannerAlerts() {
  return (
    <section className="bg-surface-soft/25 border-y border-[var(--border)] py-14 md:py-16 xl:py-20">
      <Container size="wide">
        <div className="grid gap-8 lg:grid-cols-[0.76fr_1.24fr] lg:items-center">
          <div>
            <SectionLabel variant="gold">Fresh-Signal Alerts</SectionLabel>
            <h2 className="type-heading-2 text-foreground mt-4 text-balance">
              Alerts operate alongside Scanner monitoring.
            </h2>
            <p className="type-body text-muted-foreground mt-5">
              If enabled, the Scanner can notify the user when fresh signals are
              populated. Alerts are informational signal context, not trade
              execution, financial advice, or assured notification delivery.
            </p>
          </div>
          <div className="surface-data rounded-lg p-5 md:p-6">
            <div className="grid gap-3 md:grid-cols-4">
              {alertFlow.map((step, index) => (
                <div key={step} className="flex items-center gap-3 md:block">
                  <article className="surface-elevated min-h-full rounded-lg p-4">
                    <span className="numeric text-gold-warm text-xs font-semibold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-foreground mt-2 text-sm font-semibold">
                      {step}
                    </p>
                  </article>
                  {index < alertFlow.length - 1 ? (
                    <ArrowRight
                      aria-hidden="true"
                      className="text-muted-foreground size-4 shrink-0 md:hidden"
                    />
                  ) : null}
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <article className="surface-elevated rounded-lg p-5">
                <Bell aria-hidden="true" className="text-gold-warm size-5" />
                <Badge className="mt-4" variant="premium">
                  Popup Alerts
                </Badge>
                <p className="text-muted-foreground mt-3 text-sm leading-6">
                  MetaTrader popup alerts may notify the user when newly
                  surfaced Scanner signals appear.
                </p>
              </article>
              <article className="surface-elevated rounded-lg p-5">
                <Smartphone
                  aria-hidden="true"
                  className="text-gold-warm size-5"
                />
                <Badge className="mt-4" variant="neutral">
                  Push Notifications
                </Badge>
                <p className="text-muted-foreground mt-3 text-sm leading-6">
                  Push notifications can also be enabled on supported platform
                  configurations.
                </p>
              </article>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
