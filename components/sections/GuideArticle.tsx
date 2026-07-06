'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Check, Copy } from 'lucide-react';
import type { AiGuide, Bi } from '@/content/aiGuides';
import { cn, formatDate } from '@/lib/utils';

type Lang = 'en' | 'hi';

const L = {
  whatItIs: { en: 'What it is', hi: 'यह क्या है' },
  bestFor: { en: 'Best for', hi: 'किसके लिए सबसे अच्छा' },
  bestPractices: { en: 'Best practices', hi: 'बेहतरीन तरीके' },
  examples: { en: 'Example prompts', hi: 'उदाहरण प्रॉम्प्ट' },
  tips: { en: 'Pro tips', hi: 'प्रो टिप्स' },
  updated: { en: 'Updated', hi: 'अपडेट' },
  back: { en: 'AI Learning Guide', hi: 'AI लर्निंग गाइड' },
  copy: { en: 'Copy', hi: 'कॉपी' },
  copied: { en: 'Copied', hi: 'कॉपी हुआ' },
} as const;

function CopyButton({ text, lang }: { text: string; lang: Lang }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setDone(true);
          setTimeout(() => setDone(false), 1500);
        } catch {
          /* clipboard unavailable */
        }
      }}
      className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent hover:text-accent"
    >
      {done ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {done ? L.copied[lang] : L.copy[lang]}
    </button>
  );
}

function Bullets({ items, lang }: { items: Bi[]; lang: Lang }) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3 text-pretty text-muted">
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
          <span>{it[lang]}</span>
        </li>
      ))}
    </ul>
  );
}

export function GuideArticle({ guide }: { guide: AiGuide }) {
  const [lang, setLang] = useState<Lang>('en');

  return (
    <article>
      <header className="tech-glow relative overflow-hidden border-b border-line">
        <div className="tech-grid pointer-events-none absolute inset-0" aria-hidden />
        <div className="container relative pb-12 pt-32 lg:pt-40">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link href="/ai-guides" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink">
              <ArrowLeft className="h-4 w-4" /> {L.back[lang]}
            </Link>
            {/* Language toggle */}
            <div className="inline-flex rounded-full border border-line p-1 text-sm">
              {(['en', 'hi'] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={cn(
                    'rounded-full px-4 py-1.5 transition-colors',
                    lang === l ? 'bg-accent text-white' : 'text-muted hover:text-ink',
                  )}
                >
                  {l === 'en' ? 'English' : 'हिन्दी'}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="relative aspect-[16/9] w-full max-w-xs overflow-hidden rounded-2xl border border-line sm:w-56">
              <Image src={guide.cover} alt={`${guide.name} — ${guide.maker}`} fill sizes="240px" className="object-cover" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
                <span className="rounded-full bg-accent/90 px-3 py-1 font-semibold text-white">{guide.category}</span>
                <span>{guide.maker}</span>
                <span aria-hidden>·</span>
                <span>{guide.edition}</span>
              </div>
              <h1 className="mt-3 font-display text-h1 font-semibold tracking-tight text-ink">{guide.name}</h1>
              <p className="mt-3 max-w-xl text-pretty text-lg text-muted">{guide.tagline[lang]}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container py-14 lg:py-20">
        <div className="mx-auto max-w-2xl space-y-14">
          <Section title={L.whatItIs[lang]}>
            <p className="text-pretty text-lg leading-relaxed text-ink/90">{guide.whatItIs[lang]}</p>
          </Section>

          <Section title={L.bestFor[lang]}>
            <Bullets items={guide.bestFor} lang={lang} />
          </Section>

          <Section title={L.bestPractices[lang]}>
            <Bullets items={guide.bestPractices} lang={lang} />
          </Section>

          <Section title={L.examples[lang]}>
            <div className="mt-5 space-y-4">
              {guide.examples.map((ex, i) => (
                <div key={i} className="overflow-hidden rounded-2xl border border-line bg-navy">
                  <div className="flex items-center justify-between gap-4 border-b border-line bg-surface/60 px-4 py-2.5">
                    <span className="term-dots relative block h-2.5 w-2.5" aria-hidden />
                    <span className="ml-auto font-mono text-[11px] uppercase tracking-widest text-muted">prompt</span>
                    <CopyButton text={ex.prompt} lang={lang} />
                  </div>
                  <div className="px-5 py-4">
                    <code className="block whitespace-pre-wrap font-mono text-sm leading-relaxed text-ink">{ex.prompt}</code>
                  </div>
                  <p className="border-t border-line px-5 py-3 text-sm text-muted">{ex.note[lang]}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title={L.tips[lang]}>
            <Bullets items={guide.tips} lang={lang} />
          </Section>

          <p className="text-xs text-muted">
            {L.updated[lang]}: {formatDate(guide.updated)} · {guide.edition}
          </p>
        </div>
      </div>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">{title}</h2>
      {children}
    </section>
  );
}
