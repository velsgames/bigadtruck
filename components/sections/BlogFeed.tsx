'use client';

import { useMemo, useState } from 'react';
import { postCategories, type Post } from '@/content/posts';
import { PostCard } from '@/components/cards/PostCard';
import { cn } from '@/lib/utils';

/** Category-filterable magazine grid for Digital BAT (Social-Samosa style). */
export function BlogFeed({ posts }: { posts: Post[] }) {
  const [category, setCategory] = useState<string>('All');

  const available = useMemo(() => {
    const present = new Set(posts.map((p) => p.category));
    return postCategories.filter((c) => c === 'All' || present.has(c));
  }, [posts]);

  const filtered = useMemo(
    () => (category === 'All' ? posts : posts.filter((p) => p.category === category)),
    [category, posts],
  );

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 border-b border-line pb-8">
        <span className="mr-1 text-xs font-medium uppercase tracking-[0.18em] text-muted">Topics</span>
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

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post, i) => (
          <PostCard key={post.slug} post={post} large={category === 'All' && i === 0} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-16 text-center text-muted">No articles in this topic yet — check back soon.</p>
      )}
    </div>
  );
}
