import { cn } from '@/lib/utils';

/**
 * Infinite CSS marquee. Duplicates its items so the loop is seamless.
 * Pauses on hover; disabled entirely under prefers-reduced-motion (CSS).
 */
export function Marquee({
  items,
  reverse,
  className,
  separator = '/',
}: {
  items: string[];
  reverse?: boolean;
  className?: string;
  separator?: string;
}) {
  const row = (
    <ul
      className={cn(
        'flex shrink-0 items-center gap-10 pr-10',
        reverse ? 'animate-marquee-reverse' : 'animate-marquee',
      )}
      aria-hidden={false}
    >
      {items.map((item, i) => (
        <li key={i} className="flex items-center gap-10 whitespace-nowrap">
          <span className="font-display text-lg font-medium text-ink/80">{item}</span>
          <span className="text-accent" aria-hidden>
            {separator}
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={cn('mask-fade-x group flex overflow-hidden', className)}>
      <div className="flex group-hover:[animation-play-state:paused]">{row}</div>
      <div className="flex group-hover:[animation-play-state:paused]" aria-hidden>
        {row}
      </div>
    </div>
  );
}
