import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowRight, Check } from 'lucide-react';
import { divisions as seedDivisions } from '@/content/divisions';
import { getDivision, getDivisions } from '@/lib/cms';
import { pageMeta, serviceJsonLd } from '@/lib/seo';
import { PageHero } from '@/components/sections/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollReveal, ScrollRevealGroup, ScrollRevealItem } from '@/components/ui/ScrollReveal';
import { StatCounter } from '@/components/ui/StatCounter';
import { ButtonLink } from '@/components/ui/Button';
import { CTASection } from '@/components/sections/CTASection';

export function generateStaticParams() {
  return seedDivisions.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const division = await getDivision(params.slug);
  if (!division) return {};
  return pageMeta({
    title: `${division.name} — ${division.short}`,
    description: division.summary,
    path: `/divisions/${division.slug}`,
  });
}

export default async function DivisionDetailPage({ params }: { params: { slug: string } }) {
  const [division, all] = await Promise.all([getDivision(params.slug), getDivisions()]);
  if (!division) notFound();

  const others = all.filter((d) => d.slug !== division.slug).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceJsonLd(division.name, division.summary, `/divisions/${division.slug}`),
          ),
        }}
      />

      <PageHero eyebrow={division.kicker} title={division.tagline} intro={division.intro}>
        <ButtonLink href="/contact" variant="primary" size="lg" withArrow>
          Work with {division.name}
        </ButtonLink>
      </PageHero>

      {/* Capabilities */}
      <section className="container py-20 lg:py-28">
        <SectionHeading
          eyebrow="What we do"
          title="The capabilities this division carries."
        />
        <ScrollRevealGroup className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {division.capabilities.map((cap) => (
            <ScrollRevealItem key={cap.title}>
              <div className="h-full rounded-3xl border border-line bg-surface p-6">
                <Check className={division.accent === 'primary' ? 'h-5 w-5 text-accent' : 'h-5 w-5 text-electric'} />
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">{cap.title}</h3>
                <p className="mt-2 text-pretty text-sm text-muted">{cap.description}</p>
              </div>
            </ScrollRevealItem>
          ))}
        </ScrollRevealGroup>
      </section>

      {/* Use case / mini case */}
      <section className="border-y border-line bg-surface/30">
        <div className="container grid gap-12 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
          <ScrollReveal>
            <div className="relative aspect-[7/5] overflow-hidden rounded-3xl border border-line">
              <Image
                src={division.image}
                alt={division.useCase.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <SectionHeading eyebrow="In practice" title={division.useCase.title} />
            <p className="mt-5 text-pretty text-muted">{division.useCase.body}</p>
            <div className="mt-10 grid grid-cols-3 gap-6">
              {division.useCase.metrics.map((m) => (
                <StatCounter key={m.label} value={m.value} label={m.label} />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Process */}
      <section className="container py-20 lg:py-28">
        <SectionHeading eyebrow="How it runs" title="A clear route from brief to delivery." />
        <ol className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
          {division.process.map((step, i) => (
            <li key={step.title} className="bg-bg p-6">
              <span className="font-display text-sm font-bold text-accent">
                0{i + 1}
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm text-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Other divisions */}
      <section className="border-t border-line">
        <div className="container py-16 lg:py-20">
          <SectionHeading eyebrow="Explore more" title="Other divisions" link={{ href: '/divisions', label: 'All divisions' }} />
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {others.map((d) => (
              <Link
                key={d.slug}
                href={`/divisions/${d.slug}`}
                className="group rounded-3xl border border-line bg-surface p-6 transition-all hover:-translate-y-1 hover:border-white/20"
              >
                <div className="text-xs uppercase tracking-[0.2em] text-muted">{d.kicker}</div>
                <h3 className="mt-3 font-display text-xl font-semibold text-ink">{d.name}</h3>
                <p className="mt-2 text-sm text-muted">{d.short}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-ink group-hover:text-accent">
                  Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
