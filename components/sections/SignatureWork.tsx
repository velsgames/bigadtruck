import type { CaseStudy } from '@/content/caseStudies';
import { CaseStudyCard } from '@/components/cards/CaseStudyCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollRevealGroup, ScrollRevealItem } from '@/components/ui/ScrollReveal';

/** Featured case studies grid with one oversized lead card. */
export function SignatureWork({ studies }: { studies: CaseStudy[] }) {
  const featuredCaseStudies = studies;
  return (
    <section className="container py-20 lg:py-28">
      <SectionHeading
        index="02"
        eyebrow="Signature work"
        title="Loads we’ve delivered — and the numbers that came back."
        link={{ href: '/work', label: 'All case studies' }}
      />

      <ScrollRevealGroup className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 lg:grid-cols-2">
        {featuredCaseStudies.slice(0, 3).map((study, i) => (
          <ScrollRevealItem key={study.slug} className={i === 0 ? 'lg:col-span-2' : ''}>
            <CaseStudyCard study={study} large={i === 0} />
          </ScrollRevealItem>
        ))}
      </ScrollRevealGroup>
    </section>
  );
}
