'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@/lib/useReducedMotion';
import { CaseStudyCard } from '@/components/cards/CaseStudyCard';
import { ScrollRevealGroup, ScrollRevealItem } from '@/components/ui/ScrollReveal';
import type { CaseStudy } from '@/content/caseStudies';

// three.js is heavy — keep it out of the initial bundle and only load it client-side.
const Scene = dynamic(() => import('./CaseStudies3DScene'), {
  ssr: false,
  loading: () => <Skeleton />,
});

function Skeleton() {
  return (
    <div className="h-[clamp(20rem,46vh,30rem)] w-full animate-pulse rounded-3xl border border-line bg-surface/40" />
  );
}

/** Accessible, SSR-friendly fallback — also what crawlers and no-JS users see. */
function StaticGrid({ studies }: { studies: CaseStudy[] }) {
  return (
    <ScrollRevealGroup className="grid grid-cols-1 gap-x-6 gap-y-12 lg:grid-cols-2">
      {studies.slice(0, 3).map((study, i) => (
        <ScrollRevealItem key={study.slug} className={i === 0 ? 'lg:col-span-2' : ''}>
          <CaseStudyCard study={study} large={i === 0} />
        </ScrollRevealItem>
      ))}
    </ScrollRevealGroup>
  );
}

export function CaseStudies3D({ studies }: { studies: CaseStudy[] }) {
  const reduced = usePrefersReducedMotion();
  const [supports3D, setSupports3D] = useState<boolean | null>(null);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const c = document.createElement('canvas');
      setSupports3D(!!(c.getContext('webgl') || c.getContext('experimental-webgl')));
    } catch {
      setSupports3D(false);
    }
  }, []);

  // The ref'd container is always rendered, so the observer attaches on first
  // mount (stable empty deps) regardless of which variant is shown inside.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: '250px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Reduced-motion, no-WebGL, or pre-detection (incl. SSR) → static grid
  // (keeps the case-study links crawlable). Otherwise the 3D scene once in view.
  const use3D = !reduced && supports3D === true;

  return (
    <div ref={ref}>
      {use3D ? (
        inView ? (
          <Scene studies={studies} />
        ) : (
          <Skeleton />
        )
      ) : (
        <StaticGrid studies={studies} />
      )}
    </div>
  );
}
