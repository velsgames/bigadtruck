import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import type { AiGuide } from '@/content/aiGuides';
import { cn } from '@/lib/utils';

/** Tool card for the AI Learning Guide grid — logo tile, category, name, tagline. */
export function GuideCard({ guide }: { guide: AiGuide }) {
  return (
    <Link
      href={`/ai-guides/${guide.slug}`}
      data-cursor="hover"
      className="card-glow group flex flex-col rounded-2xl border border-line bg-surface/40 p-3 backdrop-blur"
    >
      <div className="relative w-full overflow-hidden rounded-xl border border-line bg-navy">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={guide.cover}
            alt={`${guide.name} — ${guide.maker}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-expo group-hover:scale-[1.04]"
          />
        </div>
        <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-navy/70 px-3 py-1 font-mono text-[11px] font-medium text-white backdrop-blur">
          {guide.category}
        </span>
        <span className="absolute right-3 top-3 inline-flex h-8 w-8 translate-y-1 items-center justify-center rounded-full bg-accent text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
      <div className="px-1 pb-1 pt-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className={cn('font-display text-xl font-semibold tracking-tight text-ink transition-colors group-hover:text-accent')}>
            {guide.name}
          </h3>
          <span className="shrink-0 rounded-full border border-line px-2 py-0.5 font-mono text-[10px] text-muted">EN · हिन्दी</span>
        </div>
        <p className="mt-2 text-pretty text-sm text-muted line-clamp-2">{guide.tagline.en}</p>
      </div>
    </Link>
  );
}
