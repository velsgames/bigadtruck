import Link from 'next/link';
import { ButtonLink } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <section className="container flex min-h-[70svh] flex-col items-center justify-center py-32 text-center">
      <span className="font-display text-[clamp(5rem,18vw,12rem)] font-bold leading-none text-accent">
        404
      </span>
      <h1 className="mt-4 font-display text-h2 font-semibold text-ink">Wrong destination.</h1>
      <p className="mt-4 max-w-md text-pretty text-muted">
        This load didn’t make it here. The page may have moved or never existed. Let’s get you back
        on the road.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <ButtonLink href="/" variant="primary" size="lg" withArrow>
          Back home
        </ButtonLink>
        <Link href="/work" className="text-sm font-medium text-ink hover:text-accent">
          See our work
        </Link>
      </div>
    </section>
  );
}
