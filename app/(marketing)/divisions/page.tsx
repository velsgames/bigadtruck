import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import { getDivisions } from '@/lib/cms';
import { PageHero } from '@/components/sections/PageHero';
import { DivisionCard } from '@/components/cards/DivisionCard';
import { ScrollRevealGroup, ScrollRevealItem } from '@/components/ui/ScrollReveal';
import { CTASection } from '@/components/sections/CTASection';

export const metadata: Metadata = pageMeta({
  title: 'Divisions',
  description:
    'Five divisions, one group: Bigadtruck (core advertising, marketing & tech), Buzzmore Media (government & lead generation), DPR Creation, Architectural Services and Project Management.',
  path: '/divisions',
});

export default async function DivisionsPage() {
  const divisions = await getDivisions();
  return (
    <>
      <PageHero
        eyebrow="One group, five divisions"
        title="Specialist arms that carry every kind of load."
        intro="Each division is a focused team in its own right — and the group makes sure the work connects, so you get one plan, one timeline and one accountable owner."
      />

      <section className="container py-16 lg:py-24">
        <ScrollRevealGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {divisions.map((division, i) => (
            <ScrollRevealItem key={division.slug} className={i === 0 ? 'sm:col-span-2 lg:row-span-2' : ''}>
              <DivisionCard division={division} featured={i === 0} />
            </ScrollRevealItem>
          ))}
        </ScrollRevealGroup>
      </section>

      <CTASection title="Not sure which division you need?" subtitle="Tell us the destination — we’ll bring the right team to the table." />
    </>
  );
}
