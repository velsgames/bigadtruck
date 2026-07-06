'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * Reveal-on-scroll using IntersectionObserver + CSS classes (see globals.css).
 * The animation runs as a CSS transition, so it survives a throttled rAF (iOS
 * Low Power Mode) where JS-driven motion would freeze. A failsafe timer marks
 * the element visible even if the observer never fires, so content can never
 * stay hidden.
 */
function useInViewClass() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (inView) return;
    const el = ref.current;
    if (!el) return;
    const reveal = () => setInView(true);
    const failsafe = setTimeout(reveal, 2500);
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          reveal();
          io.disconnect();
          clearTimeout(failsafe);
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(failsafe);
    };
  }, [inView]);

  return { ref, inView };
}

const delayStyle = (delay: number) =>
  delay ? ({ ['--reveal-delay']: `${delay}s` } as React.CSSProperties) : undefined;

/** Fade-and-rise a block into view once. */
export function ScrollReveal({
  children,
  className,
  as = 'div',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'article';
  delay?: number;
}) {
  const { ref, inView } = useInViewClass();
  const Tag = as as 'div';
  return (
    <Tag ref={ref} className={cn('reveal', inView && 'is-in', className)} style={delayStyle(delay)}>
      {children}
    </Tag>
  );
}

/** Stagger a group of children (use with <ScrollRevealItem>). */
export function ScrollRevealGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, inView } = useInViewClass();
  return (
    <div ref={ref} className={cn('reveal-group', inView && 'is-in', className)}>
      {children}
    </div>
  );
}

export function ScrollRevealItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn('reveal-item', className)}>{children}</div>;
}
