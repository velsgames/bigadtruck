import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import { getIndustries } from '@/lib/cms';
import { site } from '@/content/site';
import { PageHero } from '@/components/sections/PageHero';
import { ScrollRevealGroup, ScrollRevealItem } from '@/components/ui/ScrollReveal';
import { CTASection } from '@/components/sections/CTASection';
import { cn } from '@/lib/utils';

export const metadata: Metadata = pageMeta({
  title: 'Industries',
  description:
    'Bigadtruck Group serves 75+ industries — including education, real estate, government, manufacturing, healthcare and retail — with advertising, marketing, technology and project delivery.',
  path: '/industries',
});

export default async function IndustriesPage() {
  const industries = await getIndustries();
  return (
    <>
      <PageHero
        eyebrow={`${site.industriesServed} industries served`}
        title="We’ve delivered to almost every destination."
        intro="From classrooms to construction sites, government offices to shop floors — the load changes, the discipline doesn’t. Here’s a sample of where we work."
      />

      <section className="container py-16 lg:py-24">
        <ScrollRevealGroup className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind) => (
            <ScrollRevealItem key={ind.name}>
              <div
                className={cn(
                  'group h-full rounded-2xl border border-line bg-surface p-6 transition-all hover:-translate-y-1 hover:border-white/20',
                  ind.highlight && 'ring-1 ring-accent/30',
                )}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-semibold text-ink">{ind.name}</h3>
                  {ind.highlight && (
                    <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-accent">
                      Specialism
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-muted">{ind.blurb}</p>
              </div>
            </ScrollRevealItem>
          ))}
        </ScrollRevealGroup>

        <p className="mt-10 text-center text-sm text-muted">
          …and {site.industriesServed.replace('+', '')}+ more. If your sector isn’t listed, it almost
          certainly still fits — <a href="/contact" className="text-ink underline-offset-4 hover:text-accent hover:underline">ask us</a>.
        </p>
      </section>

      <CTASection title="Your industry, your destination." subtitle="Tell us where you operate and what you’re trying to move. We’ll bring sector-savvy ideas to the table." />
    </>
  );
}
