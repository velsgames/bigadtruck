import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { pageMeta } from '@/lib/seo';
import { contact } from '@/content/site';
import { PageHero } from '@/components/sections/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollRevealGroup, ScrollRevealItem } from '@/components/ui/ScrollReveal';
import { CTASection } from '@/components/sections/CTASection';

export const metadata: Metadata = pageMeta({
  title: 'Careers',
  description:
    'Join Bigadtruck Group. We’re a 360° advertising, marketing and technology team in Pune & Mumbai looking for people who love delivering measurable work.',
  path: '/careers',
});

const roles = [
  { title: 'Performance Marketing Manager', type: 'Full-time', location: 'Pune', team: 'Bigadtruck Core' },
  { title: 'Full-Stack Developer (Next.js)', type: 'Full-time', location: 'Pune / Remote', team: 'Technology' },
  { title: 'Lead-Gen Campaign Specialist', type: 'Full-time', location: 'Mumbai', team: 'Buzzmore Media' },
  { title: 'Brand & Content Designer', type: 'Full-time', location: 'Pune', team: 'Creative' },
  { title: '3D Visualization Artist', type: 'Contract', location: 'Remote', team: 'Architectural Services' },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Help us carry bigger loads, further."
        intro="We hire people who care about outcomes, move fast, and like seeing their work go live. If that’s you, the door’s open — even if your role isn’t listed."
      />

      <section className="container py-16 lg:py-24">
        <SectionHeading eyebrow="Open roles" title="Where you could fit." className="mb-10" />
        <ScrollRevealGroup className="divide-y divide-line border-y border-line">
          {roles.map((role) => (
            <ScrollRevealItem key={role.title}>
              <a
                href={`mailto:${contact.email}?subject=${encodeURIComponent('Application: ' + role.title)}`}
                className="group flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h3 className="font-display text-xl font-semibold text-ink transition-colors group-hover:text-accent">
                    {role.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{role.team}</p>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted">
                  <span>{role.type}</span>
                  <span aria-hidden>·</span>
                  <span>{role.location}</span>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition-colors group-hover:bg-accent group-hover:text-white">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </a>
            </ScrollRevealItem>
          ))}
        </ScrollRevealGroup>

        <p className="mt-10 text-sm text-muted">
          Don’t see your role?{' '}
          <a href={`mailto:${contact.email}?subject=Open application`} className="text-ink underline-offset-4 hover:text-accent hover:underline">
            Send us your portfolio
          </a>{' '}
          — we’re always glad to meet good people.
        </p>
      </section>

      <CTASection title="Rather work with us than for us?" subtitle="If you’re a freelancer or partner studio, we’d love to hear how we might collaborate." primaryLabel="Get in touch" />
    </>
  );
}
