import type { Metadata } from 'next';
import { Sparkles } from 'lucide-react';
import { pageMeta, breadcrumbJsonLd } from '@/lib/seo';
import { site } from '@/content/site';
import { aiGuides } from '@/content/aiGuides';
import { GuideFilter } from '@/components/sections/GuideFilter';
import { CTASection } from '@/components/sections/CTASection';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = pageMeta({
  title: 'AI Learning Guide — Claude, ChatGPT & more, in English & हिन्दी',
  description:
    'Free, practical guides to the top AI tools — Claude, ChatGPT, Gemini, Lovable, Antigravity and more. Best practices and example prompts in English and Hindi, by Bigadtruck Group & Buzzmore Media.',
  path: '/ai-guides',
});

export default function AiGuidesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'AI Learning Guide', path: '/ai-guides' },
        ])}
      />
      <header className="tech-glow relative overflow-hidden border-b border-line">
        <div className="tech-grid pointer-events-none absolute inset-0" aria-hidden />
        <div className="container relative pb-14 pt-32 lg:pt-40">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-4 py-1.5 font-mono text-xs font-medium tracking-wide text-ink/90">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            Buzzmore Media × {site.name}
          </div>
          <h1 className="text-gradient mt-6 font-display text-[clamp(2.75rem,8vw,6rem)] font-bold leading-[0.92] tracking-tight">
            AI Learning Guide
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg text-muted">
            Master the tools reshaping marketing and work — Claude, ChatGPT, Gemini, Lovable,
            Antigravity and more. Practical best practices and example prompts, in{' '}
            <span className="text-ink">English</span> and <span className="text-ink">हिन्दी</span>.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 font-mono text-xs">
            {[
              `${aiGuides.length} tools`,
              'EN · हिन्दी',
              'Updated monthly',
              `Curated by ${site.founder.fullName}`,
            ].map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/50 px-3 py-1.5 text-muted backdrop-blur"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                {chip}
              </span>
            ))}
          </div>
        </div>
      </header>

      <section className="container py-14 lg:py-20">
        <GuideFilter guides={aiGuides} />
      </section>

      <CTASection
        title="Want AI working inside your marketing?"
        subtitle="Bigadtruck and Buzzmore put these tools to work on real campaigns — strategy, creative, media and lead generation. Tell us the destination."
      />
    </>
  );
}
