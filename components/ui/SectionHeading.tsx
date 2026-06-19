import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { cn } from '@/lib/utils';

/** Standard section header: eyebrow + title + optional intro and link. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  link,
  index,
  className,
  align = 'left',
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  link?: { href: string; label: string };
  /** Optional oversized section numeral, e.g. "01" (Holmes-style identifier). */
  index?: string;
  className?: string;
  align?: 'left' | 'center';
}) {
  return (
    <ScrollReveal
      className={cn(
        'flex flex-col gap-6',
        align === 'center' ? 'items-center text-center' : 'lg:flex-row lg:items-end lg:justify-between',
        className,
      )}
    >
      <div className={cn('max-w-2xl', align === 'center' && 'mx-auto')}>
        <div className={cn('flex items-center gap-4', align === 'center' && 'justify-center')}>
          {index && (
            <span
              className="font-display text-[clamp(2.25rem,5vw,3.25rem)] font-bold leading-none text-accent/25"
              aria-hidden
            >
              {index}.
            </span>
          )}
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
        <h2 className="mt-5 text-balance font-display text-h2 font-semibold tracking-tight text-ink">
          {title}
        </h2>
        {intro && <p className="mt-4 text-pretty text-muted">{intro}</p>}
      </div>
      {link && (
        <Link
          href={link.href}
          className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-ink hover:text-accent"
        >
          {link.label}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      )}
    </ScrollReveal>
  );
}
