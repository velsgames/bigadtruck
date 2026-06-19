'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { processSteps } from '@/content/process';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { usePrefersReducedMotion } from '@/lib/useReducedMotion';

/**
 * Pinned horizontal "how we deliver" sequence. The outer wrapper is tall; the
 * inner panel sticks and translates horizontally as you scroll through it.
 * Under reduced motion it collapses to an accessible vertical list.
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

  if (reduced) {
    return (
      <section className="container py-20 lg:py-28">
        <Header />
        <ol className="mt-12 space-y-8">
          {processSteps.map((step) => (
            <li key={step.number} className="flex gap-6 border-t border-line pt-6">
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

  return (
    <section ref={targetRef} className="relative h-[320vh]">
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
                className="relative flex h-[clamp(18rem,42vh,24rem)] w-[80vw] shrink-0 flex-col justify-between rounded-3xl border border-line bg-surface p-8 sm:w-[52vw] lg:w-[36vw]"
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
