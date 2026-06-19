import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import type { CaseStudy } from '@/content/caseStudies';
import { cn } from '@/lib/utils';

/**
 * Oversized, hover-reactive case study card: image zoom + clip-path reveal of
 * the outcome stat. Click navigates to the case study detail.
 */
export function CaseStudyCard({ study, large }: { study: CaseStudy; large?: boolean }) {
  return (
    <Link
      href={`/work/${study.slug}`}
      data-cursor="hover"
      className={cn('group block', large && 'lg:col-span-2')}
    >
      <div className="relative overflow-hidden rounded-3xl border border-line bg-surface">
        <div className={cn('relative w-full', large ? 'aspect-[16/10]' : 'aspect-[4/3]')}>
          <Image
            src={study.cover}
            alt={study.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-expo group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/10 to-transparent" />

          {/* category badges (Holmes-style tags) */}
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-navy/70 px-3 py-1 text-xs font-medium text-white backdrop-blur">
              {study.division}
            </span>
            <span className="rounded-full bg-accent/90 px-3 py-1 text-xs font-medium text-white backdrop-blur">
              {study.service}
            </span>
          </div>

          {/* outcome chip — reveals on hover */}
          <div className="absolute inset-x-5 bottom-5 flex translate-y-2 items-end justify-between opacity-0 transition-all duration-500 ease-expo group-hover:translate-y-0 group-hover:opacity-100">
            <div className="rounded-2xl bg-white/95 px-4 py-3 text-navy backdrop-blur">
              <div className="font-display text-2xl font-bold leading-none">{study.hero.value}</div>
              <div className="text-xs font-medium text-navy/70">{study.hero.label}</div>
            </div>
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-accent text-white">
              <ArrowUpRight className="h-5 w-5" />
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
            <span>{study.industry}</span>
            <span aria-hidden>·</span>
            <span>{study.service}</span>
            <span aria-hidden>·</span>
            <span>{study.year}</span>
          </div>
          <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-ink transition-colors group-hover:text-accent lg:text-2xl">
            {study.title}
          </h3>
          <p className="mt-2 max-w-xl text-pretty text-sm text-muted">{study.summary}</p>
        </div>
      </div>
    </Link>
  );
}
