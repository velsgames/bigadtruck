import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Post } from '@/content/posts';
import { blog } from '@/content/site';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollRevealGroup, ScrollRevealItem } from '@/components/ui/ScrollReveal';
import { PostCard } from '@/components/cards/PostCard';

/**
 * Homepage "Digital BAT" strip — surfaces the latest three articles from the
 * editorial desk. Renders nothing if there are no posts.
 */
export function InsightsHome({ posts }: { posts: Post[] }) {
  const latest = posts.slice(0, 3);
  if (latest.length === 0) return null;

  return (
    <section className="border-t border-line bg-surface/30">
      <div className="container py-20 lg:py-28">
        <SectionHeading
          eyebrow={blog.name}
          title="Fresh thinking on advertising, digital & tech"
          intro={blog.tagline}
          link={{ href: '/blog', label: 'Read Digital BAT' }}
        />

        <ScrollRevealGroup className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((post) => (
            <ScrollRevealItem key={post.slug}>
              <PostCard post={post} />
            </ScrollRevealItem>
          ))}
        </ScrollRevealGroup>

        <div className="mt-12 flex justify-center">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
          >
            See all stories
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
