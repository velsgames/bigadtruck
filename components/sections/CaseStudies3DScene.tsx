'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Canvas, useFrame } from '@react-three/fiber';
import { Image as DreiImage } from '@react-three/drei';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import type * as THREE from 'three';
import type { CaseStudy } from '@/content/caseStudies';

const SPACING = 2.7;
const DEPTH = 1.7;
const ANGLE = 0.5;

/** Signed shortest distance from card i to the active index, around the ring. */
function ringOffset(i: number, active: number, total: number) {
  let d = i - active;
  if (d > total / 2) d -= total;
  if (d < -total / 2) d += total;
  return d;
}

function Card({
  url,
  offset,
  onSelect,
}: {
  url: string;
  offset: number;
  onSelect: () => void;
}) {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((_, dt) => {
    const g = ref.current;
    if (!g) return;
    const tx = offset * SPACING;
    const tz = -Math.abs(offset) * DEPTH;
    const ry = -offset * ANGLE;
    const target = (offset === 0 ? 1.18 : 0.9) * (hovered ? 1.04 : 1);
    const k = 1 - Math.pow(0.0015, dt); // frame-rate-independent smoothing
    g.position.x += (tx - g.position.x) * k;
    g.position.z += (tz - g.position.z) * k;
    g.rotation.y += (ry - g.rotation.y) * k;
    g.scale.x += (target - g.scale.x) * k;
    g.scale.y += (target - g.scale.y) * k;
  });

  return (
    <group
      ref={ref}
      onClick={onSelect}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <DreiImage url={url} scale={[2.4, 1.5]} radius={0.1} toneMapped={false} transparent />
    </group>
  );
}

export default function CaseStudies3DScene({ studies }: { studies: CaseStudy[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = studies.length;

  // Auto-advance unless the visitor is interacting.
  useEffect(() => {
    if (paused || total <= 1) return;
    const t = setInterval(() => setActive((a) => (a + 1) % total), 4200);
    return () => clearInterval(t);
  }, [paused, total]);

  const go = (dir: number) => {
    setPaused(true);
    setActive((a) => (a + dir + total) % total);
  };

  const current = studies[active];
  if (!current) return null;

  return (
    <div
      className="relative"
      onPointerDown={() => setPaused(true)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="h-[clamp(20rem,46vh,30rem)] w-full">
        <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 6], fov: 34 }}>
          <ambientLight intensity={1} />
          {studies.map((s, i) => (
            <Card
              key={s.slug}
              url={s.cover}
              offset={ringOffset(i, active, total)}
              onSelect={() => {
                setPaused(true);
                setActive(i);
              }}
            />
          ))}
        </Canvas>
      </div>

      {/* Caption for the active card */}
      <div className="mt-6 flex flex-col items-center gap-4 text-center">
        <div className="min-h-[4.5rem]">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
            {current.industry} · {current.service}
          </p>
          <h3 className="mt-2 text-balance font-display text-2xl font-semibold text-ink lg:text-3xl">
            {current.title}
          </h3>
          <p className="mt-1 text-sm text-muted">
            <span className="font-semibold text-accent">{current.hero.value}</span> {current.hero.label}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => go(-1)}
            aria-label="Previous case study"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-ink hover:text-bg"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <Link
            href={`/work/${current.slug}`}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-all hover:brightness-110"
          >
            View case study <ArrowUpRight className="h-4 w-4" />
          </Link>
          <button
            onClick={() => go(1)}
            aria-label="Next case study"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-ink hover:text-bg"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-1 flex gap-1.5" role="tablist" aria-label="Case studies">
          {studies.map((s, i) => (
            <button
              key={s.slug}
              role="tab"
              aria-selected={i === active}
              aria-label={`Show ${s.title}`}
              onClick={() => {
                setPaused(true);
                setActive(i);
              }}
              className={`h-1 rounded-full transition-all ${i === active ? 'w-8 bg-accent' : 'w-4 bg-line'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
