'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { usePrefersReducedMotion } from '@/lib/useReducedMotion';

/**
 * Animates a number from 0 to its value when scrolled into view. Non-numeric
 * prefixes/suffixes (₹, +, %, x, "states") are preserved. Reduced-motion shows
 * the final value immediately.
 */
export function StatCounter({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' });
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState(reduced ? value : stripNumber(value).reset);

  useEffect(() => {
    if (!inView) return;
    const { number, prefix, suffix, decimals } = stripNumber(value);
    if (reduced || number === null) {
      setDisplay(value);
      return;
    }
    const duration = 1400;
    let raf = 0;
    let start = 0;
    const animate = (t: number) => {
      if (!start) start = t;
      const progress = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = number * eased;
      setDisplay(`${prefix}${current.toFixed(decimals)}${suffix}`);
      if (progress < 1) raf = requestAnimationFrame(animate);
      else setDisplay(value);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, reduced]);

  return (
    <div ref={ref} className={className}>
      <div className="font-display text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-none tracking-tight text-ink">
        {display}
      </div>
      <div className="mt-3 text-sm text-muted">{label}</div>
    </div>
  );
}

function stripNumber(value: string) {
  const match = value.match(/(\d[\d,]*\.?\d*)/);
  if (!match) return { number: null, prefix: '', suffix: '', decimals: 0, reset: value };
  const raw = match[1];
  const index = match.index ?? 0;
  const prefix = value.slice(0, index);
  const suffix = value.slice(index + raw.length);
  const cleaned = raw.replace(/,/g, '');
  const decimals = cleaned.includes('.') ? cleaned.split('.')[1].length : 0;
  return {
    number: parseFloat(cleaned),
    prefix,
    suffix,
    decimals,
    reset: `${prefix}0${suffix}`,
  };
}
