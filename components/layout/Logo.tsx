import Image from 'next/image';
import { cn } from '@/lib/utils';

/**
 * The official Bigadtruck badge logo (public/brand/logo.png). Best used at a
 * legible size on light/neutral areas (e.g. the footer). Size it with a height
 * class, e.g. <Logo className="h-24 w-auto" />.
 */
export function Logo({ className, priority }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/brand/logo.png"
      alt="Bigadtruck Group"
      width={270}
      height={269}
      priority={priority}
      className={cn('h-24 w-auto', className)}
    />
  );
}

/**
 * Horizontal wordmark lockup for the dark navbar — a white truck mark + the
 * BigAdTruck wordmark. The full badge is reserved for light/large contexts;
 * this stays crisp and legible at header size.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <TruckGlyph className="h-7 w-8 shrink-0 text-ink" />
      <span className="font-display text-[1.35rem] font-extrabold leading-none tracking-tight text-ink">
        Big<span className="text-steel">Ad</span>Truck
      </span>
    </span>
  );
}

/** Left-facing cab-over truck mark, echoing the badge. Inherits text color. */
export function TruckGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 32" className={className} fill="none" aria-hidden>
      <path d="M3 6h21a2 2 0 0 1 2 2v13H1V11a5 5 0 0 1 5-5Z" fill="currentColor" />
      <path d="M4 9h11l2 6H4Z" fill="var(--bg)" opacity="0.85" />
      <circle cx="8" cy="24" r="3.4" fill="currentColor" />
      <circle cx="8" cy="24" r="1.3" fill="var(--bg)" />
      <circle cx="21" cy="24" r="3.4" fill="currentColor" />
      <circle cx="21" cy="24" r="1.3" fill="var(--bg)" />
      <circle cx="26" cy="15" r="2" fill="var(--accent)" />
    </svg>
  );
}
