import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import { getCaseStudies } from '@/lib/cms';
import { PageHero } from '@/components/sections/PageHero';
import { WorkGrid } from '@/components/sections/WorkGrid';
import { CTASection } from '@/components/sections/CTASection';

export const metadata: Metadata = pageMeta({
  title: 'Work',
  description:
    'Selected Bigadtruck case studies across advertising, web & app, government media, education lead generation, architecture and DPR — with the measurable outcomes they delivered.',
  path: '/work',
});

export default async function WorkPage() {
  const caseStudies = await getCaseStudies();
  return (
    <>
      <PageHero
        eyebrow="Selected work"
        title="Loads we’ve delivered — and the numbers that came back."
        intro="Filter by industry and service. Every case study leads with the outcome, because that’s the only thing that really counts."
      />

      <section className="container py-16 lg:py-20">
        <WorkGrid caseStudies={caseStudies} />
      </section>

      <CTASection title="Want results like these?" />
    </>
  );
}
