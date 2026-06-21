'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Canvas, useFrame } from '@react-three/fiber';
import { Image as DreiImage, Float, ContactShadows } from '@react-three/drei';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import type * as THREE from 'three';
import type { CaseStudy } from '@/content/caseStudies';

const RADIUS = 3.6;
const ARC = 0.52; // radians between adjacent cards along the arc
const CARD_W = 2.7;
const CARD_H = 1.7;

function wrappedDiff(i: number, pos: number, total: number) {
  let d = i - pos;
  while (d > total / 2) d -= total;
  while (d < -total / 2) d += total;
  return d;
}

/** A single textured card that continuously eases toward its arc slot. */
function Card({ url, getOffset }: { url: string; getOffset: () => number }) {
  const g = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((_, dt) => {
    const grp = g.current;
    if (!grp) return;
    const o = getOffset();
    const ang = o * ARC;
    const tx = Math.sin(ang) * RADIUS;
    const tz = Math.cos(ang) * RADIUS - RADIUS; // front card sits near z = 0
    const ry = -ang * 0.9;
    const center = Math.max(0, 1 - Math.abs(o)); // 1 at front, →0 to the sides
    const targetScale = (0.82 + center * 0.42) * (hovered ? 1.05 : 1);
    const k = 1 - Math.pow(0.0001, dt); // frame-rate-independent easing
    grp.position.x += (tx - grp.position.x) * k;
    grp.position.z += (tz - grp.position.z) * k;
    grp.rotation.y += (ry - grp.rotation.y) * k;
    const s = grp.scale.x + (targetScale - grp.scale.x) * k;
    grp.scale.setScalar(s);
  });

  return (
    <group ref={g} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      <Float speed={2.2} rotationIntensity={0.18} floatIntensity={0.35}>
        <DreiImage url={url} scale={[CARD_W, CARD_H]} radius={0.12} toneMapped={false} transparent />
      </Float>
    </group>
  );
}

function Rig({
  studies,
  posRef,
  pausedRef,
  velRef,
  onActive,
}: {
  studies: CaseStudy[];
  posRef: React.MutableRefObject<number>;
  pausedRef: React.MutableRefObject<boolean>;
  velRef: React.MutableRefObject<number>;
  onActive: (i: number) => void;
}) {
  const root = useRef<THREE.Group>(null);
  const lastIdx = useRef(-1);
  const total = studies.length;

  useFrame((state, dt) => {
    // Continuous drift + momentum from dragging.
    if (!pausedRef.current) posRef.current += dt * 0.32;
    posRef.current += velRef.current;
    velRef.current *= 0.9;

    // Report the front-most card for the caption.
    const idx = ((Math.round(posRef.current) % total) + total) % total;
    if (idx !== lastIdx.current) {
      lastIdx.current = idx;
      onActive(idx);
    }

    // Mouse parallax tilt of the whole rig.
    const r = root.current;
    if (r) {
      r.rotation.y += (state.pointer.x * 0.22 - r.rotation.y) * 0.05;
      r.rotation.x += (-state.pointer.y * 0.12 - r.rotation.x) * 0.05;
    }
  });

  return (
    <group ref={root}>
      {studies.map((s, i) => (
        <Card key={s.slug} url={s.cover} getOffset={() => wrappedDiff(i, posRef.current, total)} />
      ))}
      <ContactShadows position={[0, -1.5, 0]} opacity={0.45} scale={14} blur={2.6} far={3.2} color="#000814" />
    </group>
  );
}

export default function CaseStudies3DScene({ studies }: { studies: CaseStudy[] }) {
  const posRef = useRef(0);
  const pausedRef = useRef(false);
  const velRef = useRef(0);
  const dragRef = useRef<{ on: boolean; x: number; last: number }>({ on: false, x: 0, last: 0 });
  const [active, setActive] = useState(0);

  // Briefly pause auto-drift after an explicit interaction, then resume.
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nudge = (delta: number) => {
    pausedRef.current = true;
    posRef.current = Math.round(posRef.current) + delta;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => (pausedRef.current = false), 4000);
  };
  useEffect(() => {
    return () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, []);

  const current = studies[active];
  if (!current) return null;

  const onDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current = { on: true, x: e.clientX, last: e.clientX };
    pausedRef.current = true;
  };
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!d.on) return;
    const dx = e.clientX - d.last;
    d.last = e.clientX;
    posRef.current -= dx * 0.012;
    velRef.current = -dx * 0.012;
  };
  const endDrag = () => {
    if (!dragRef.current.on) return;
    dragRef.current.on = false;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => (pausedRef.current = false), 3500);
  };

  return (
    <div className="relative">
      <div
        className="h-[clamp(22rem,52vh,34rem)] w-full cursor-grab touch-pan-y active:cursor-grabbing"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={endDrag}
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => {
          endDrag();
          if (!dragRef.current.on) pausedRef.current = false;
        }}
      >
        <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0.25, 6.4], fov: 32 }}>
          <ambientLight intensity={1} />
          <Rig studies={studies} posRef={posRef} pausedRef={pausedRef} velRef={velRef} onActive={setActive} />
        </Canvas>
      </div>

      <div className="mt-4 flex flex-col items-center gap-4 text-center">
        <div className="min-h-[4.75rem]">
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
            onClick={() => nudge(-1)}
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
            onClick={() => nudge(1)}
            aria-label="Next case study"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-ink hover:text-bg"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        <p className="text-xs text-muted">Drag to explore · auto-rotating</p>
      </div>
    </div>
  );
}
