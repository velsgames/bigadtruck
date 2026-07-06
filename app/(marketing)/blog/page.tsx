import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMeta, breadcrumbJsonLd } from '@/lib/seo';
import { blog } from '@/content/site';
import { getPosts } from '@/lib/cms';
import { JsonLd } from '@/components/seo/JsonLd';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { PostCard } from '@/components/cards/PostCard';
import { BlogFeed } from '@/components/sections/BlogFeed';
import { CTASection } from '@/components/sections/CTASection';

export const metadata: Metadata = pageMeta({
  title: `${blog.name} — Advertising, Digital & Marketing-Tech`,
  description: blog.description,
  path: '/blog',
});

export default async function BlogIndexPage() {
  const posts = await getPosts();
  const [lead, ...rest] = posts;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: blog.name, path: '/blog' },
        ])}
      />
      {/* Masthead */}
      <header className="border-b border-line">
        <div className="container pb-12 pt-32 lg:pt-40">
          <Eyebrow>The Bigadtruck editorial desk</Eyebrow>
          <h1 className="mt-5 font-display text-[clamp(2.75rem,8vw,6rem)] font-bold leading-[0.95] tracking-tight text-ink">
            {blog.name}
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg text-muted">{blog.tagline}</p>
        </div>
      </header>

      {/* Featured lead story */}
      {lead && (
        <section className="container py-14 lg:py-20">
          <div className="mb-8 flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Top story</span>
          </div>
          <PostCard post={lead} large />
        </section>
      )}

      {/* Feed */}
      <section className="container pb-8">
        {rest.length > 0 ? (
          <BlogFeed posts={rest} />
        ) : (
          <p className="py-12 text-center text-muted">More stories are on the way.</p>
        )}
      </section>

      <div className="container pb-16 text-sm text-muted">
        <Link href="/rss.xml" className="hover:text-accent">
          Subscribe via RSS
        </Link>
      </div>

      <CTASection
        title="Want this kind of thinking on your brand?"
        subtitle="Digital BAT is how we think out loud. Put that team on your next campaign — strategy, creative, media and technology under one roof."
      />
    </>
  );
}
