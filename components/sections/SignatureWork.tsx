import type { CaseStudy } from '@/content/caseStudies';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CaseStudies3D } from '@/components/sections/CaseStudies3D';

/** Featured case studies as an animated 3D showcase (static-grid fallback). */
export function SignatureWork({ studies }: { studies: CaseStudy[] }) {
  return (
    <section className="container py-20 lg:py-28">
      <SectionHeading
        index="02"
        eyebrow="Signature work"
        title="Loads we’ve delivered — and the numbers that came back."
        link={{ href: '/work', label: 'All case studies' }}
      />

      <div className="mt-12">
        <CaseStudies3D studies={studies} />
      </div>
    </section>
  );
}
