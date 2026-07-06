import Link from 'next/link';
import Image from 'next/image';
import type { Post } from '@/content/posts';
import { cn, formatDate } from '@/lib/utils';

/**
 * Article card for the Digital BAT listing — magazine style: cover thumbnail,
 * category chip, headline, and date · read-time meta.
 */
export function PostCard({ post, large }: { post: Post; large?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      data-cursor="hover"
      className={cn('group flex flex-col', large && 'lg:col-span-2')}
    >
      <div className={cn('relative w-full overflow-hidden rounded-2xl border border-line bg-surface', large ? 'aspect-[16/9]' : 'aspect-[16/10]')}>
        <Image
          src={post.cover}
          alt={post.title}
          fill
          sizes={large ? '(max-width: 1024px) 100vw, 66vw' : '(max-width: 1024px) 100vw, 33vw'}
          className="object-cover transition-transform duration-700 ease-expo group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-accent/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
          {post.category}
        </span>
      </div>

      <div className="mt-4 flex flex-1 flex-col">
        <h3
          className={cn(
            'text-balance font-display font-semibold tracking-tight text-ink transition-colors group-hover:text-accent',
            large ? 'text-2xl lg:text-3xl' : 'text-lg lg:text-xl',
          )}
        >
          {post.title}
        </h3>
        <p className={cn('mt-2 text-pretty text-sm text-muted', large ? 'max-w-2xl' : 'line-clamp-2')}>
          {post.excerpt}
        </p>
        <div className="mt-3 flex items-center gap-2 text-xs text-muted">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden>·</span>
          <span>{post.readMins} min read</span>
        </div>
      </div>
    </Link>
  );
}
