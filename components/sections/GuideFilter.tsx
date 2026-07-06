'use client';

import { useMemo, useState } from 'react';
import { guideCategories, type AiGuide } from '@/content/aiGuides';
import { GuideCard } from '@/components/cards/GuideCard';
import { cn } from '@/lib/utils';

/** Category-filterable grid of AI tool guides. */
export function GuideFilter({ guides }: { guides: AiGuide[] }) {
  const [category, setCategory] = useState<string>('All');

  const available = useMemo(() => {
    const present = new Set(guides.map((g) => g.category));
    return guideCategories.filter((c) => c === 'All' || present.has(c));
  }, [guides]);

  const filtered = useMemo(
    () => (category === 'All' ? guides : guides.filter((g) => g.category === category)),
    [category, guides],
  );

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 border-b border-line pb-8">
        <span className="mr-1 text-xs font-medium uppercase tracking-[0.18em] text-muted">Filter</span>
        {available.map((opt) => (
          <button
            key={opt}
            onClick={() => setCategory(opt)}
            className={cn(
              'rounded-full border px-4 py-1.5 text-sm transition-colors',
              category === opt
                ? 'border-accent bg-accent text-white'
                : 'border-line text-muted hover:border-white/20 hover:text-ink',
            )}
          >
            {opt}
          </button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((guide) => (
          <GuideCard key={guide.slug} guide={guide} />
        ))}
      </div>
    </div>
  );
}
