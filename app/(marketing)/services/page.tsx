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
  {
    question: 'How quickly can you start, and how long do projects take?',
    answer:
      'We can usually kick off within a week of agreeing scope. Timelines depend on the work — a campaign or landing-page system can go live in 2–4 weeks, a full brand or website build in 6–12 weeks, and a DPR in roughly 4–8 weeks. We agree the schedule up front and hold to it.',
  },
  {
    question: 'Do you work on monthly retainers or one-off projects?',
    answer:
      'Both. Many clients run us as an always-on marketing partner on a monthly retainer (content, media, reporting), while others bring us in for a defined project. We scope whichever fits where you are right now.',
  },
  {
    question: 'How will I know it’s working?',
    answer:
      'Every engagement is tied to a measurable goal — enquiries, cost per lead, return on ad spend, admissions, site speed — not vanity clicks. You get clear, regular reporting against that goal, and we double down on what moves it.',
  },
  {
    question: 'What do you need from us to get started?',
    answer:
      'A short conversation about your goal, your audience and your budget. From there we handle the heavy lifting — strategy, creative, build and media. Any brand assets, logins or past data you have speed things up, but we can start from scratch too.',
  },
  {
    question: 'Why one agency instead of separate specialists?',
    answer:
      'Because hand-offs are where time, money and consistency leak. Brand, web, media and delivery sit in one team on one plan, so there’s a single owner accountable for the result — not four vendors pointing at each other.',
  },
  {
    question: 'Which industries do you work with?',
    answer:
      'We’ve delivered across 75+ industries — education, real estate, automotive, retail, healthcare, manufacturing, government, infrastructure and more. The playbook adapts; the discipline of tying work to outcomes stays the same.',
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
