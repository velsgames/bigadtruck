'use client';

import { motion } from 'framer-motion';
import { ButtonLink } from '@/components/ui/Button';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { RoadAccent } from '@/components/sections/RoadAccent';
import { site } from '@/content/site';
import { lineReveal, EASE_EXPO } from '@/lib/animations';

const HEADLINE = [['A', 'truckload', 'of', 'ideas,'], ['delivered', 'to', 'every'], ['destination.']];

export function Hero() {
  return (
    <section className="relative flex min-h-[92svh] flex-col justify-center overflow-hidden pt-28">
      <RoadAccent />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_EXPO }}
          className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/60 px-4 py-1.5 text-xs font-medium text-ink/80 backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
          {site.yearsLabel} · Pune &amp; Mumbai · {site.industriesServed} industries
        </motion.div>

        {/* Kinetic headline — line-by-line clip reveal */}
        <h1 className="mt-7 max-w-[16ch] font-display text-hero font-semibold text-ink">
          {HEADLINE.map((line, li) => (
            <span key={li} className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className="block"
                variants={lineReveal}
                initial="hidden"
                animate="show"
                transition={{ duration: 0.9, ease: EASE_EXPO, delay: 0.15 + li * 0.12 }}
              >
                {line.map((word, wi) => (
                  <span key={wi}>
                    {word === 'truckload' || word === 'every' || word === 'destination.' ? (
                      <span className="text-accent">{word}</span>
                    ) : (
                      word
                    )}{' '}
                  </span>
                ))}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_EXPO, delay: 0.55 }}
          className="mt-7 max-w-xl text-pretty text-lg text-muted"
        >
          Bigadtruck Group is a 360° advertising, marketing &amp; technology agency. One team
          carries the whole load — strategy, creative, media, web and delivery — to wherever your
          brand needs to go.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_EXPO, delay: 0.7 }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <MagneticButton>
            <ButtonLink href="/contact" variant="primary" size="lg" withArrow>
              Start a project
            </ButtonLink>
          </MagneticButton>
          <ButtonLink href="/work" variant="ghost" size="lg">
            See our work
          </ButtonLink>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="container relative mt-16 hidden items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted lg:flex"
      >
        <span className="relative flex h-9 w-5 items-start justify-center rounded-full border border-line p-1">
          <motion.span
            className="h-1.5 w-1 rounded-full bg-accent"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
        Scroll to explore
      </motion.div>
    </section>
  );
}
