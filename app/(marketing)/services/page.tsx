import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import { getServices } from '@/lib/cms';
import { PageHero } from '@/components/sections/PageHero';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { ScrollRevealGroup, ScrollRevealItem } from '@/components/ui/ScrollReveal';
import { CTASection } from '@/components/sections/CTASection';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { SectionHeading } from '@/components/ui/SectionHeading';

export const metadata: Metadata = pageMeta({
  title: 'Services',
  description:
    'The full Bigadtruck service stack: advertising & branding, digital & social, web & app development, media, government media, lead generation, DPR, architecture, project management and more.',
  path: '/services',
});

const faqs = [
  {
    question: 'Can we hire you for just one service?',
    answer:
      'Absolutely. Take a single capability — a website, a campaign, a DPR — or the whole stack. Either way it ships from one accountable team.',
  },
  {
    question: 'Do you work across both Pune and Mumbai?',
    answer:
      'Yes. We operate from both cities and serve clients across Maharashtra and India, on-ground and remotely.',
  },
  {
    question: 'How do you price projects?',
    answer:
      'By scope and outcome, not hours. We scope the work, agree a fixed plan and a measurable goal, then deliver against it.',
  },
  {
    question: 'Do you handle government and public-sector work?',
    answer:
      'Yes — through Buzzmore Media, our specialist arm for government advertising, the GeM ecosystem, public-awareness campaigns and lead generation.',
  },
];

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <>
      <PageHero
        eyebrow="Capabilities"
        title="A full load of services — strategy to delivery."
        intro="Tap any service to see what you get and the outcome it drives. Everything below ships from one roof, with one accountable owner."
      />

      <section className="container py-16 lg:py-24">
        <ScrollRevealGroup className="grid auto-rows-min grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ScrollRevealItem
              key={service.id}
              className={
                service.span === 'wide'
                  ? 'sm:col-span-2'
                  : service.span === 'tall'
                    ? 'lg:row-span-2'
                    : ''
              }
            >
              <ServiceCard service={service} />
            </ScrollRevealItem>
          ))}
        </ScrollRevealGroup>
      </section>

      <section className="border-t border-line">
        <div className="container py-20 lg:py-28">
          <SectionHeading eyebrow="Questions" title="Good things to know." className="mb-12" />
          <FAQAccordion items={faqs} />
        </div>
      </section>

      <CTASection title="Need a few of these at once?" subtitle="That’s the whole point of one roof. Tell us the goal and we’ll bundle the right services into one plan." />
    </>
  );
}
