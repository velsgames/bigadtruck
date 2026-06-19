'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import type { Testimonial } from '@/content/testimonials';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { usePrefersReducedMotion } from '@/lib/useReducedMotion';

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const reduced = usePrefersReducedMotion();
  const count = testimonials.length;

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + count) % count),
    [count],
  );

  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % count), 6500);
    return () => clearInterval(t);
  }, [count, reduced]);

  const active = testimonials[index];

  return (
    <section className="border-y border-line bg-surface/40">
      <div className="container py-20 lg:py-28">
        <Eyebrow>What clients say</Eyebrow>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="relative min-h-[220px] sm:min-h-[180px]">
            <Quote className="h-10 w-10 text-accent" aria-hidden />
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={index}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="mt-4"
              >
                <p className="max-w-3xl text-balance font-display text-[clamp(1.35rem,2.6vw,2.1rem)] font-medium leading-[1.25] tracking-tight text-ink">
                  “{active.quote}”
                </p>
                <footer className="mt-6 text-sm text-muted">
                  <span className="font-medium text-ink">{active.author}</span> — {active.role},{' '}
                  {active.company}
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-ink hover:text-bg"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-ink hover:text-bg"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-8 flex gap-1.5" role="tablist" aria-label="Testimonials">
          {testimonials.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === index}
              aria-label={`Testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1 rounded-full transition-all ${i === index ? 'w-8 bg-accent' : 'w-4 bg-line'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
