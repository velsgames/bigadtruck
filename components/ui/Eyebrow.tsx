import { cn } from '@/lib/utils';

/** Small kicker label with a leading accent tick. */
export function Eyebrow({
  children,
  className,
  accent = 'primary',
}: {
  children: React.ReactNode;
  className?: string;
  accent?: 'primary' | 'secondary';
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.2em] text-muted',
        className,
      )}
    >
      <span
        className={cn('h-1.5 w-1.5 rounded-full', accent === 'primary' ? 'bg-accent' : 'bg-electric')}
        aria-hidden
      />
      {children}
    </span>
  );
}
