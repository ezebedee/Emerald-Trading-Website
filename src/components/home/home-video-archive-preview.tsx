import Link from "next/link";
import { ArrowRight, CalendarRange, FileVideo2, Library } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import type { LedgerMediaContextRecord } from "@/data/selectors/types";

const videoCategoryLabels = {
  "performance-update": "Performance Update",
} as const;

function VideoArchiveCard({ video }: { video: LedgerMediaContextRecord }) {
  return (
    <article className="surface-elevated flex min-h-full flex-col overflow-hidden rounded-lg">
      <div
        aria-hidden="true"
        className="surface-data relative min-h-36 border-b border-[var(--border)] p-4"
      >
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(9,186,132,0.08),transparent_42%,rgba(199,164,74,0.08))]" />
        <div className="relative flex h-full min-h-28 flex-col justify-between rounded-md border border-[var(--border-strong)] bg-black/20 p-4">
          <div className="flex items-center justify-between">
            <FileVideo2 className="text-gold-warm size-5" />
            <span className="numeric text-subtle-foreground text-xs">
              {video.videoPlatform.toUpperCase()}
            </span>
          </div>
          <div className="grid gap-2">
            <div className="h-px w-4/5 bg-[var(--border-emerald)]" />
            <div className="h-px w-3/5 bg-[var(--border-gold)]" />
            <div className="h-px w-2/5 bg-[var(--border)]" />
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="flex flex-wrap gap-2">
          <Badge variant="neutral">
            {videoCategoryLabels["performance-update"]}
          </Badge>
          <Badge variant="premium">{video.availabilityState}</Badge>
        </div>

        <h3 className="type-heading-3 text-foreground mt-4 text-balance">
          {video.title}
        </h3>
        <p className="type-body-small text-muted-foreground mt-4">
          {video.description}
        </p>

        <div className="mt-6 grid gap-3">
          <div className="bg-surface/70 flex items-start gap-3 rounded-md border border-[var(--border)] p-3.5">
            <Library
              aria-hidden="true"
              className="text-gold-warm mt-0.5 size-4 shrink-0"
            />
            <p className="text-muted-foreground text-sm leading-6">
              {video.relatedLedgerTitle}
            </p>
          </div>
          <div className="bg-surface/70 flex items-start gap-3 rounded-md border border-[var(--border)] p-3.5">
            <CalendarRange
              aria-hidden="true"
              className="text-gold-warm mt-0.5 size-4 shrink-0"
            />
            <p className="text-muted-foreground text-sm leading-6">
              {video.relatedLedgerCoverageLabel}
            </p>
          </div>
        </div>

        <Link
          href="/videos"
          aria-label={`Explore Video Archive for ${video.title}`}
          className="focus-emerald transition-standard text-emerald-bright hover:text-foreground mt-auto inline-flex min-h-10 items-center pt-6 text-sm font-semibold underline decoration-[var(--border-emerald)] underline-offset-4"
        >
          View archive entry
        </Link>
      </div>
    </article>
  );
}

export function HomeVideoArchivePreview({
  videos,
}: {
  videos: readonly LedgerMediaContextRecord[];
}) {
  return (
    <section className="bg-surface-soft/25 py-14 md:py-16 xl:py-20">
      <Container size="wide">
        <div className="grid gap-8">
          <div className="max-w-4xl">
            <SectionLabel variant="gold">Video Archive</SectionLabel>
            <h2 className="type-heading-2 text-foreground mt-4 max-w-4xl text-balance">
              Performance updates and technical walkthroughs, organized
              alongside the documented record.
            </h2>
            <p className="type-body text-muted-foreground mt-5 max-w-2xl">
              The video archive is structured to accompany performance updates,
              product demonstrations, and technical research material as a
              supporting content record.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LinkButton
                href="/videos"
                size="lg"
                trailingIcon={<ArrowRight aria-hidden="true" />}
              >
                Explore Video Archive
              </LinkButton>
              <LinkButton href="/ledger" variant="secondary" size="lg">
                View Emerald Ledger
              </LinkButton>
            </div>
          </div>

          {videos.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {videos.map((video) => (
                <VideoArchiveCard key={video.id} video={video} />
              ))}
            </div>
          ) : (
            <div className="surface-elevated rounded-lg p-5 md:p-6">
              <Badge variant="neutral">Archive Entries</Badge>
              <h3 className="type-heading-3 text-foreground mt-4 text-balance">
                Video metadata is not currently available.
              </h3>
              <p className="type-body-small text-muted-foreground mt-4">
                The archive route remains available while public video records
                are prepared for homepage display.
              </p>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
