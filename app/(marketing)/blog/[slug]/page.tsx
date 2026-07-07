import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { posts as seedPosts, type PostBlock } from '@/content/posts';
import { getPost, getPosts } from '@/lib/cms';
import { pageMeta, articleJsonLd, breadcrumbJsonLd } from '@/lib/seo';
import { blog } from '@/content/site';
import { PostCard } from '@/components/cards/PostCard';
import { JsonLd } from '@/components/seo/JsonLd';
import { CTASection } from '@/components/sections/CTASection';
import { formatDate } from '@/lib/utils';

export function generateStaticParams() {
  return seedPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return {};
  return pageMeta({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.cover,
  });
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const [post, all] = await Promise.all([getPost(params.slug), getPosts()]);
  if (!post) notFound();

  const related = all.filter((p) => p.slug !== post.slug).slice(0, 3);
  const jsonLd = articleJsonLd({
    title: post.title,
    description: post.excerpt,
    slug: post.slug,
    date: post.date,
    author: post.author,
    image: post.cover,
  });

  return (
    <>
      <JsonLd
        data={[
          jsonLd,
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: blog.name, path: '/blog' },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />

      <article>
        <header className="border-b border-line">
          <div className="container pb-12 pt-32 lg:pt-40">
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink">
              <ArrowLeft className="h-4 w-4" /> {blog.name}
            </Link>
            <div className="mt-8 flex flex-wrap items-center gap-2 text-xs text-muted">
              <span className="rounded-full bg-accent/90 px-3 py-1 font-semibold text-white">{post.category}</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden>·</span>
              <span>{post.readMins} min read</span>
            </div>
            <h1 className="mt-4 max-w-4xl text-balance font-display text-h1 font-semibold tracking-tight text-ink">
              {post.title}
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-lg text-muted">{post.excerpt}</p>
            <div className="mt-6 text-sm text-muted">
              By <span className="text-ink">{post.author}</span>
            </div>
          </div>
          <div className="relative aspect-[16/8] w-full border-t border-line">
            <Image src={post.cover} alt={post.title} fill priority sizes="100vw" className="object-cover" />
          </div>
        </header>

        {/* Body */}
        <div className="container py-16 lg:py-20">
          <div className="mx-auto max-w-2xl space-y-6">
            {post.summary && post.summary.length > 0 && (
              <div className="rounded-2xl border border-line bg-surface p-6">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">The short version</div>
                <ul className="mt-4 space-y-2.5">
                  {post.summary.map((s, i) => (
                    <li key={i} className="flex gap-3 text-pretty text-muted">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {post.body.map((block, i) => (
              <Block key={i} block={block} />
            ))}

            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 border-t border-line pt-8">
                {post.tags.map((t) => (
                  <span key={t} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                    #{t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-line">
          <div className="container py-16 lg:py-20">
            <div className="flex items-end justify-between">
              <h2 className="font-display text-h2 font-semibold text-ink">More from {blog.name}</h2>
              <Link href="/blog" className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-accent">
                All stories <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}

function Block({ block }: { block: PostBlock }) {
  switch (block.type) {
    case 'h2':
      return <h2 className="pt-4 font-display text-2xl font-semibold tracking-tight text-ink">{block.text}</h2>;
    case 'ul':
      return (
        <ul className="space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-pretty text-muted">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      );
    case 'quote':
      return (
        <blockquote className="border-l-2 border-accent pl-5 font-display text-xl font-medium leading-snug text-ink">
          “{block.text}”
          {block.cite && <cite className="mt-2 block text-sm font-normal not-italic text-muted">— {block.cite}</cite>}
        </blockquote>
      );
    case 'stats':
      return (
        <figure className="my-4 rounded-2xl border border-line bg-surface p-6 lg:p-8">
          {block.caption && (
            <figcaption className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              {block.caption}
            </figcaption>
          )}
          <dl className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {block.items.map((s, i) => (
              <div key={i}>
                <dt className="font-display text-3xl font-bold leading-none text-accent lg:text-4xl">{s.value}</dt>
                <dd className="mt-2 text-sm text-muted">{s.label}</dd>
              </div>
            ))}
          </dl>
        </figure>
      );
    case 'callout':
      return (
        <aside className="my-4 rounded-2xl border border-accent/30 bg-accent-soft p-6">
          {block.title && <div className="font-display text-sm font-semibold uppercase tracking-wide text-accent">{block.title}</div>}
          <p className="mt-2 text-pretty text-lg font-medium text-ink">{block.text}</p>
        </aside>
      );
    case 'table':
      return (
        <figure className="my-4">
          {block.caption && (
            <figcaption className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              {block.caption}
            </figcaption>
          )}
          <div className="overflow-x-auto rounded-2xl border border-line">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="bg-surface">
                  {block.headers.map((h, i) => (
                    <th key={i} className="border-b border-line px-4 py-3 font-semibold text-ink">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, r) => (
                  <tr key={r} className="odd:bg-surface/30">
                    {row.map((cell, c) => (
                      <td key={c} className={c === 0 ? 'px-4 py-3 font-medium text-ink' : 'px-4 py-3 text-muted'}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </figure>
      );
    default:
      return <p className="text-pretty text-lg leading-relaxed text-ink/90">{block.text}</p>;
  }
}
