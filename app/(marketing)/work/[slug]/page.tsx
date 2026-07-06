import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { caseStudies as seedCaseStudies } from '@/content/caseStudies';
import { getCaseStudy, getCaseStudies } from '@/lib/cms';
import { pageMeta, breadcrumbJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { StatCounter } from '@/components/ui/StatCounter';
import { CaseStudyCard } from '@/components/cards/CaseStudyCard';
import { CTASection } from '@/components/sections/CTASection';

export function generateStaticParams() {
  return seedCaseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const study = await getCaseStudy(params.slug);
  if (!study) return {};
  return pageMeta({
    title: study.title,
    description: study.summary,
    path: `/work/${study.slug}`,
    image: study.cover,
  });
}

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
  const [study, all] = await Promise.all([getCaseStudy(params.slug), getCaseStudies()]);
  if (!study) notFound();

  const related = all.filter((c) => c.slug !== study.slug).slice(0, 2);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Work', path: '/work' },
          { name: study.title, path: `/work/${study.slug}` },
        ])}
      />
      <article>
        {/* Hero */}
        <header className="border-b border-line">
          <div className="container pb-12 pt-32 lg:pt-40">
            <Link
              href="/work"
              className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink"
            >
              <ArrowLeft className="h-4 w-4" /> All work
            </Link>
            <div className="mt-8 flex flex-wrap items-center gap-2 text-xs text-muted">
              <span>{study.industry}</span>
              <span aria-hidden>·</span>
              <span>{study.service}</span>
              <span aria-hidden>·</span>
              <span>{study.division}</span>
              <span aria-hidden>·</span>
              <span>{study.year}</span>
            </div>
            <h1 className="mt-4 max-w-4xl text-balance font-display text-h1 font-semibold tracking-tight text-ink">
              {study.title}
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-lg text-muted">{study.summary}</p>
          </div>
          <div className="relative aspect-[16/8] w-full border-t border-line">
            <Image
              src={study.cover}
              alt={study.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </header>

        {/* Body */}
        <div className="container grid gap-12 py-16 lg:grid-cols-[1fr_320px] lg:py-24">
          <div className="space-y-14">
            <Section title="The challenge">
              <p className="text-pretty text-lg text-ink/90">{study.challenge}</p>
            </Section>

            <Section title="Our contribution">
              <ul className="space-y-3">
                {study.contribution.map((c) => (
                  <li key={c} className="flex gap-3 text-pretty text-muted">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    {c}
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Key decisions">
              <div className="space-y-4">
                {study.decisions.map((d) => (
                  <div key={d.title} className="rounded-2xl border border-line bg-surface p-6">
                    <h3 className="font-display text-lg font-semibold text-ink">{d.title}</h3>
                    <p className="mt-2 text-pretty text-muted">{d.body}</p>
                  </div>
                ))}
              </div>
            </Section>

            {study.gallery.length > 0 && (
              <Section title="Gallery">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {study.gallery.map((g, i) => (
                    <div
                      key={i}
                      className={`relative aspect-[4/3] overflow-hidden rounded-2xl border border-line ${i === 0 ? 'sm:col-span-2' : ''}`}
                    >
                      <Image src={g.src} alt={g.alt} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" />
                    </div>
                  ))}
                </div>
              </Section>
            )}
          </div>

          {/* Outcome sidebar */}
          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <div className="rounded-3xl border border-line bg-surface p-7">
              <Eyebrow>The outcome</Eyebrow>
              <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8">
                {study.outcomes.map((o) => (
                  <div key={o.label}>
                    <StatCounter value={o.value} label={o.label} />
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </article>

      {/* Related */}
      <section className="border-t border-line">
        <div className="container py-16 lg:py-20">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-h2 font-semibold text-ink">Related work</h2>
            <Link href="/work" className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-accent">
              All work <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 lg:grid-cols-2">
            {related.map((c) => (
              <CaseStudyCard key={c.slug} study={c} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <ScrollReveal as="section">
      <h2 className="mb-5 font-display text-2xl font-semibold tracking-tight text-ink">{title}</h2>
      {children}
    </ScrollReveal>
  );
}
