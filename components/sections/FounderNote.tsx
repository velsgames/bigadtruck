import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { site } from '@/content/site';

/**
 * Homepage founder spotlight — puts a face and a point of view to the group.
 * Copy and identity come from `content/site.ts` (site.founder).
 */
export function FounderNote() {
  const { fullName, role } = site.founder;
  return (
    <section className="border-y border-line bg-surface/30">
      <div className="container grid items-center gap-10 py-20 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16 lg:py-28">
        <ScrollReveal className="relative mx-auto aspect-[5/6] w-full max-w-xs overflow-hidden rounded-[1.75rem] border border-line lg:max-w-sm">
          <Image
            src="/images/about/founder.svg"
            alt={`${fullName}, ${role} of ${site.name}`}
            fill
            sizes="(max-width: 1024px) 80vw, 30vw"
            className="object-cover"
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-navy/70 to-transparent"
            aria-hidden
          />
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <Eyebrow>From the founder</Eyebrow>
          <blockquote className="mt-6 text-balance font-display text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-[1.15] tracking-tight text-ink">
            “We don’t sell hours or deliverables — we sell outcomes. One team carries the whole
            load so nothing falls through the gaps between agencies.”
          </blockquote>
          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2">
            <div>
              <div className="font-display text-lg font-semibold text-ink">{fullName}</div>
              <div className="text-sm text-muted">
                {role}, {site.name}
              </div>
            </div>
            <Link
              href="/about"
              className="group ml-auto inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-ink hover:text-accent"
            >
              Read our story
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
