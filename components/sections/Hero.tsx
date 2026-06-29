'use client';

import { useEffect, useState } from 'react';
import { ButtonLink } from '@/components/ui/Button';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { RoadAccent } from '@/components/sections/RoadAccent';
import { site } from '@/content/site';
import { cn } from '@/lib/utils';

const HEADLINE = [['A', 'truckload', 'of', 'ideas,'], ['delivered', 'to', 'every'], ['destination.']];

/** CSS custom property for a per-element reveal delay (see globals.css). */
const delay = (s: number) => ({ ['--reveal-delay']: `${s}s` }) as React.CSSProperties;

export function Hero() {
  // Above the fold, so reveal on mount. A CSS transition (compositor-driven)
  // does the animation — it still runs when rAF is throttled (Low Power Mode),
  // and the base state is visible if JS never runs at all.
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 30);
    return () => clearTimeout(t);
  }, []);
  const inIf = (extra?: string) => cn('reveal', shown && 'is-in', extra);

  return (
    <section className="relative flex min-h-[92svh] flex-col justify-center overflow-hidden pt-28">
      <RoadAccent />

      <div className="container relative">
        <div
          className={inIf(
            'inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/60 px-4 py-1.5 text-xs font-medium text-ink/80 backdrop-blur',
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
          {site.yearsLabel} · Pune &amp; Mumbai · {site.industriesServed} industries
        </div>

        {/* Kinetic headline — line-by-line clip reveal */}
        <h1 className="mt-7 max-w-[16ch] font-display text-hero font-semibold text-ink">
          {HEADLINE.map((words, li) => (
            <span key={li} className="block overflow-hidden pb-[0.08em]">
              <span
                className={cn('reveal-line block', shown && 'is-in')}
                style={delay(0.1 + li * 0.12)}
              >
                {words.map((word, wi) => (
                  <span key={wi}>
                    {word === 'truckload' || word === 'every' || word === 'destination.' ? (
                      <span className="text-accent">{word}</span>
                    ) : (
                      word
                    )}{' '}
                  </span>
                ))}
              </span>
            </span>
          ))}
        </h1>

        <p className={inIf('mt-7 max-w-xl text-pretty text-lg text-muted')} style={delay(0.5)}>
          Bigadtruck Group is a 360° advertising, marketing &amp; technology agency. One team
          carries the whole load — strategy, creative, media, web and delivery — to wherever your
          brand needs to go.
        </p>

        <div className={inIf('mt-9 flex flex-wrap items-center gap-3')} style={delay(0.62)}>
          <MagneticButton>
            <ButtonLink href="/contact" variant="primary" size="lg" withArrow>
              Start a project
            </ButtonLink>
          </MagneticButton>
          <ButtonLink href="/work" variant="ghost" size="lg">
            See our work
          </ButtonLink>
        </div>
      </div>

      {/* scroll cue */}
      <div
        className={inIf(
          'container relative mt-16 hidden items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted lg:flex',
        )}
        style={delay(0.9)}
      >
        <span className="relative flex h-9 w-5 items-start justify-center rounded-full border border-line p-1">
          <span className="h-1.5 w-1 animate-bounce rounded-full bg-accent" />
        </span>
        Scroll to explore
      </div>
    </section>
  );
}
