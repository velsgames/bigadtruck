'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { processSteps } from '@/content/process';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { usePrefersReducedMotion } from '@/lib/useReducedMotion';
import { cn } from '@/lib/utils';

/**
 * "How we deliver" sequence.
 * - Desktop: a pinned panel that translates horizontally as you scroll.
 * - Mobile / reduced-motion: a plain vertical list. The pinned horizontal
 *   pattern turns into a very long, sideways-hijacked scroll on touch, so we
 *   never render its 320vh wrapper below `lg`.
 */
export function ProcessStepper() {
  const reduced = usePrefersReducedMotion();
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });
  // Translate across the steps (minus the first, which is visible at rest).
  const x = useTransform(scrollYProgress, [0, 1], ['0%', `-${(processSteps.length - 1) * 25}%`]);
  const progress = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // Reduced motion: vertical list at every size.
  if (reduced) return <VerticalProcess />;

  return (
    <>
      {/* Mobile: vertical list (no 320vh pin, no horizontal hijack). */}
      <VerticalProcess className="lg:hidden" />

      {/* Desktop: pinned horizontal scroll. */}
      <section ref={targetRef} className="relative hidden h-[320vh] lg:block">
        <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
          <div className="container pt-24 lg:pt-28">
            <Header />
            <div className="mt-8 h-1 w-full max-w-xs overflow-hidden rounded-full bg-line">
              <motion.div className="h-full bg-accent" style={{ width: progress }} />
            </div>
          </div>

          <div className="flex flex-1 items-center">
            <motion.ol style={{ x }} className="flex gap-6 pl-[max(1.25rem,calc((100vw-1440px)/2+1.25rem))] pr-6">
              {processSteps.map((step) => (
                <li
                  key={step.number}
                  className="relative flex h-[clamp(18rem,42vh,24rem)] w-[36vw] shrink-0 flex-col justify-between rounded-3xl border border-line bg-surface p-8"
                >
                  <span className="font-display text-[clamp(3rem,6vw,5rem)] font-bold leading-none text-accent/90">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-semibold tracking-tight text-ink lg:text-3xl">
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-sm text-pretty text-muted">{step.description}</p>
                  </div>
                </li>
              ))}
            </motion.ol>
          </div>
        </div>
      </section>
    </>
  );
}

function VerticalProcess({ className }: { className?: string }) {
  return (
    <section className={cn('container py-20 lg:py-28', className)}>
      <Header />
      <ol className="mt-12 space-y-8">
        {processSteps.map((step) => (
          <li key={step.number} className="flex gap-5 border-t border-line pt-6 sm:gap-6">
            <span className="font-display text-3xl font-bold text-accent">{step.number}</span>
            <div>
              <h3 className="font-display text-2xl font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 max-w-xl text-muted">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Header() {
  return (
    <>
      <Eyebrow>How we deliver</Eyebrow>
      <h2 className="mt-5 max-w-2xl text-balance font-display text-h2 font-semibold text-ink">
        Five stops on every route — from first brief to lasting returns.
      </h2>
    </>
  );
}
