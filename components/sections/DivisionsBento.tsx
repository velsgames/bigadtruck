import type { Division } from '@/content/divisions';
import { DivisionCard } from '@/components/cards/DivisionCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollRevealGroup, ScrollRevealItem } from '@/components/ui/ScrollReveal';

/** Bento grid of the five divisions, first one featured (2x2). */
export function DivisionsBento({ divisions }: { divisions: Division[] }) {
  return (
    <section id="divisions" className="container scroll-mt-24 py-20 lg:py-28">
      <SectionHeading
        index="01"
        eyebrow="One group, five divisions"
        title="Everything under one roof — so you never chase five agencies again."
        intro="From a single campaign to a full project, the right specialist arm carries it — and the group makes sure it all connects."
        link={{ href: '/divisions', label: 'All divisions' }}
      />

      <ScrollRevealGroup className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {divisions.map((division, i) => (
          <ScrollRevealItem key={division.slug} className={i === 0 ? 'sm:col-span-2 lg:row-span-2' : ''}>
            <DivisionCard division={division} featured={i === 0} />
          </ScrollRevealItem>
        ))}
      </ScrollRevealGroup>
    </section>
  );
}
