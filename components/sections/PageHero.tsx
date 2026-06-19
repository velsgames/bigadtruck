import { Eyebrow } from '@/components/ui/Eyebrow';
import { cn } from '@/lib/utils';

/** Consistent hero band for interior pages. */
export function PageHero({
  eyebrow,
  title,
  intro,
  children,
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={cn('relative overflow-hidden border-b border-line', className)}>
      <div
        className="pointer-events-none absolute -top-40 right-0 h-[30rem] w-[30rem] rounded-full bg-accent/10 blur-[120px]"
        aria-hidden
      />
      <div className="container relative pb-14 pt-36 lg:pb-20 lg:pt-44">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-6 max-w-4xl text-balance font-display text-h1 font-semibold tracking-tight text-ink">
          {title}
        </h1>
        {intro && <p className="mt-6 max-w-2xl text-pretty text-lg text-muted">{intro}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </header>
  );
}
