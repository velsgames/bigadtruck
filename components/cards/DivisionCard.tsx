import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Division } from '@/content/divisions';
import { cn } from '@/lib/utils';

/**
 * Bento-grid card for a division. `featured` cards span two columns and show
 * the tagline; the rest are compact.
 */
export function DivisionCard({ division, featured }: { division: Division; featured?: boolean }) {
  const isPrimary = division.accent === 'primary';
  return (
    <Link
      href={`/divisions/${division.slug}`}
      data-cursor="hover"
      className={cn(
        'group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-line bg-surface p-7 transition-all duration-500 ease-expo hover:-translate-y-1 hover:border-white/20',
        featured ? 'lg:p-9' : '',
      )}
    >
      {/* accent glow */}
      <div
        className={cn(
          'pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-40',
          isPrimary ? 'bg-accent' : 'bg-electric',
        )}
        aria-hidden
      />
      <div className="relative">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
            {division.kicker}
          </span>
          <ArrowUpRight className="h-5 w-5 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
        </div>
        <h3
          className={cn(
            'mt-5 font-display font-semibold tracking-tight text-ink',
            featured ? 'text-[clamp(1.75rem,3vw,2.5rem)]' : 'text-2xl',
          )}
        >
          {division.name}
        </h3>
        <p className="mt-1.5 text-sm font-medium text-muted">{division.short}</p>
        <p
          className={cn(
            'mt-4 text-pretty text-muted',
            featured ? 'max-w-md text-base' : 'text-sm',
          )}
        >
          {featured ? division.tagline : division.summary}
        </p>
      </div>

      <div className="relative mt-8 flex items-center gap-2">
        <span
          className={cn('h-1.5 w-1.5 rounded-full', isPrimary ? 'bg-accent' : 'bg-electric')}
          aria-hidden
        />
        <span className="text-sm font-medium text-ink/70 transition-colors group-hover:text-ink">
          Explore division
        </span>
      </div>
    </Link>
  );
}
