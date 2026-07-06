import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { aiGuides } from '@/content/aiGuides';
import { pageMeta, SITE_URL, breadcrumbJsonLd } from '@/lib/seo';
import { site } from '@/content/site';
import { GuideArticle } from '@/components/sections/GuideArticle';
import { GuideCard } from '@/components/cards/GuideCard';
import { CTASection } from '@/components/sections/CTASection';
import { JsonLd } from '@/components/seo/JsonLd';

export function generateStaticParams() {
  return aiGuides.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const guide = aiGuides.find((g) => g.slug === params.slug);
  if (!guide) return {};
  return pageMeta({
    title: `${guide.name} guide — best practices & prompts (EN & हिन्दी)`,
    description: `${guide.tagline.en} A practical ${guide.name} guide by ${site.name} & Buzzmore Media — best practices and example prompts in English and Hindi.`,
    path: `/ai-guides/${guide.slug}`,
    image: guide.cover,
  });
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const guide = aiGuides.find((g) => g.slug === params.slug);
  if (!guide) notFound();

  const related = aiGuides
    .filter((g) => g.slug !== guide.slug && g.category === guide.category)
    .slice(0, 3);
  const fill = aiGuides.filter((g) => g.slug !== guide.slug && !related.includes(g));
  const more = [...related, ...fill].slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: `${guide.name} — practical guide`,
    description: guide.tagline.en,
    inLanguage: ['en', 'hi'],
    image: `${SITE_URL}${guide.cover}`,
    datePublished: guide.updated,
    dateModified: guide.updated,
    author: { '@type': 'Person', name: site.founder.fullName },
    publisher: { '@id': `${SITE_URL}/#organization` },
    mainEntityOfPage: `${SITE_URL}/ai-guides/${guide.slug}`,
    about: guide.name,
  };

  return (
    <>
      <JsonLd
        data={[
          jsonLd,
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'AI Learning Guide', path: '/ai-guides' },
            { name: guide.name, path: `/ai-guides/${guide.slug}` },
          ]),
        ]}
      />

      <GuideArticle guide={guide} />

      {more.length > 0 && (
        <section className="border-t border-line">
          <div className="container py-16 lg:py-20">
            <div className="flex items-end justify-between">
              <h2 className="font-display text-h2 font-semibold text-ink">More AI guides</h2>
              <Link href="/ai-guides" className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-accent">
                All guides <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((g) => (
                <GuideCard key={g.slug} guide={g} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
