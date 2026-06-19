import Image from 'next/image';
import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import { site, contact } from '@/content/site';
import { PageHero } from '@/components/sections/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollReveal, ScrollRevealGroup, ScrollRevealItem } from '@/components/ui/ScrollReveal';
import { StatCounter } from '@/components/ui/StatCounter';
import { CTASection } from '@/components/sections/CTASection';
import { MapPin } from 'lucide-react';

export const metadata: Metadata = pageMeta({
  title: 'About',
  description:
    'The story behind Bigadtruck Group — a 360° advertising, marketing and technology agency built to carry a full load of ideas to every destination. Founded by V. Vyas, based in Pune & Mumbai.',
  path: '/about',
});

const values = [
  { title: 'Trust, faith & loyalty', body: 'Relationships first. Most of our work comes from clients who stay — and refer.' },
  { title: 'Creativity with a job to do', body: 'Ideas are only as good as what they deliver. We make work that moves numbers.' },
  { title: 'Return on investment', body: 'Every rupee is accountable. We lead with outcomes, not awards (those follow).' },
  { title: 'One accountable team', body: 'No finger-pointing across vendors. One crew owns the whole load, start to finish.' },
];

const timeline = [
  { year: '2017', title: 'The truck rolls out', body: 'Bigadtruck is founded in Pune with a simple idea: put advertising, marketing and technology in one team.' },
  { year: '2019', title: 'Media & technology scale up', body: 'Web, app and performance-media capabilities grow alongside traditional advertising.' },
  { year: '2021', title: 'Buzzmore Media launches', body: 'A dedicated arm for government-sector media and high-volume lead generation.' },
  { year: '2023', title: 'DPR, architecture & PMC', body: 'The group adds Detailed Project Reports, architectural services and project management.' },
  { year: 'Today', title: '75+ industries, two cities', body: 'A 360° group serving 75+ industries from Pune and Mumbai — one roof, one accountable team.' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Bigadtruck Group"
        title="A truckload of ideas. A team built to deliver them."
        intro="We started Bigadtruck so brands would never again chase five different agencies. One crew carries strategy, creative, media, technology and delivery — and gets it to every destination."
      />

      {/* The metaphor / story */}
      <section className="container py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <ScrollReveal>
            <div className="relative aspect-[7/5] overflow-hidden rounded-3xl border border-line">
              <Image
                src="/images/about/story.svg"
                alt="The Big Ad Truck — carrying a full load of advertising, marketing and technology"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-balance font-display text-h2 font-semibold tracking-tight text-ink">
              Why a truck?
            </h2>
            <div className="mt-5 space-y-4 text-pretty text-muted">
              <p>
                Because a truck carries a full load and delivers it — reliably, all the way to the
                destination. That’s exactly how we work. We load up the right mix of advertising,
                marketing and technology, plot the route, and deliver measurable results wherever
                your brand needs to go.
              </p>
              <p>
                Markets have speed-breakers — competition, budgets, deadlines, red tape. Our job is
                to cross them without dropping the load. {site.yearsLabel} in, across {site.industriesServed}{' '}
                industries, that’s still the whole point.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6">
              <StatCounter value="9+" label="Years" />
              <StatCounter value="75+" label="Industries" />
              <StatCounter value="5" label="Divisions" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Founder */}
      <section className="border-y border-line bg-surface/30">
        <div className="container grid gap-12 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:py-28">
          <ScrollReveal>
            <div className="relative mx-auto aspect-[5/6] w-full max-w-sm overflow-hidden rounded-3xl border border-line">
              <Image
                src="/images/about/founder.svg"
                alt={`${site.founder.fullName}, ${site.founder.role} of ${site.name}`}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <SectionHeading
              eyebrow="From the founder"
              title="“We sell outcomes, not hours.”"
            />
            <div className="mt-6 space-y-4 text-pretty text-muted">
              <p>
                I started Bigadtruck because I kept watching good brands lose momentum in the gaps
                between agencies — the photographer waiting on the printer, the developer waiting on
                the media buyer. We put all of it in one team so nothing falls through.
              </p>
              <p>
                Nine years on, the promise is unchanged: load up the best ideas, cross every
                speed-breaker, and deliver returns you can measure.
              </p>
            </div>
            <div className="mt-6">
              <div className="font-display text-lg font-semibold text-ink">{site.founder.fullName}</div>
              <div className="text-sm text-muted">{site.founder.role}, {site.name}</div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Values */}
      <section className="container py-20 lg:py-28">
        <SectionHeading eyebrow="What we value" title="The load we never drop." />
        <ScrollRevealGroup className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {values.map((v) => (
            <ScrollRevealItem key={v.title}>
              <div className="h-full rounded-3xl border border-line bg-surface p-7">
                <h3 className="font-display text-xl font-semibold text-ink">{v.title}</h3>
                <p className="mt-3 text-pretty text-muted">{v.body}</p>
              </div>
            </ScrollRevealItem>
          ))}
        </ScrollRevealGroup>
      </section>

      {/* Timeline */}
      <section className="border-t border-line">
        <div className="container py-20 lg:py-28">
          <SectionHeading eyebrow="The journey" title="Nine years on the road." />
          <ol className="mt-12 space-y-0">
            {timeline.map((t, i) => (
              <ScrollReveal as="li" key={t.year} delay={i * 0.05}>
                <div className="grid gap-4 border-t border-line py-8 lg:grid-cols-[160px_1fr] lg:gap-10">
                  <div className="font-display text-2xl font-bold text-accent">{t.year}</div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-ink">{t.title}</h3>
                    <p className="mt-2 max-w-2xl text-pretty text-muted">{t.body}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Offices */}
      <section className="border-t border-line bg-surface/30">
        <div className="container py-20 lg:py-24">
          <SectionHeading eyebrow="Where we are" title="Two cities. One team." />
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {contact.offices.map((o) => (
              <div key={o.city} className="rounded-3xl border border-line bg-surface p-7">
                <div className="flex items-center gap-2 text-accent">
                  <MapPin className="h-5 w-5" />
                  <span className="font-display text-xl font-semibold text-ink">{o.label}</span>
                </div>
                <p className="mt-3 text-muted">{o.address}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
