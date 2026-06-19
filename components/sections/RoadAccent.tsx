'use client';

import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/lib/useReducedMotion';

/**
 * Lightweight animated SVG "road" that sweeps across the hero with a moving
 * dash and a truck travelling the path — the brand's delivery metaphor.
 * Pure SVG/CSS so it never blocks LCP and degrades to a static line under
 * reduced motion. (A heavier R3F element could be lazy-loaded here instead.)
 */
export function RoadAccent() {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden" aria-hidden>
      {/* ambient glows */}
      <div className="absolute -right-32 top-10 h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-[120px]" />
      <div className="absolute -left-32 bottom-0 h-[24rem] w-[24rem] rounded-full bg-electric/10 blur-[120px]" />

      <svg
        className="absolute inset-x-0 bottom-[8%] h-[55%] w-full opacity-[0.5]"
        viewBox="0 0 1440 400"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="road-fade" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--accent)" stopOpacity="0" />
            <stop offset="0.5" stopColor="var(--accent)" stopOpacity="0.9" />
            <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* base road */}
        <path
          id="road-path"
          d="M-50 360 C 320 360, 360 180, 720 180 S 1120 40, 1490 40"
          stroke="var(--line)"
          strokeWidth="2"
        />
        {/* moving dash overlay */}
        <motion.path
          d="M-50 360 C 320 360, 360 180, 720 180 S 1120 40, 1490 40"
          stroke="url(#road-fade)"
          strokeWidth="2.5"
          strokeDasharray="14 22"
          initial={{ strokeDashoffset: 0 }}
          animate={reduced ? undefined : { strokeDashoffset: [0, -360] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        />

        {!reduced && (
          <motion.g
            initial={{ x: -50, y: 360 }}
            animate={{
              // trace the road curve with keyframed translate + a slight climb
              x: [-50, 360, 720, 1120, 1490],
              y: [360, 360, 180, 90, 40],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', repeatType: 'reverse' }}
          >
            <rect x="-14" y="-9" width="28" height="14" rx="2" fill="var(--accent)" />
            <circle cx="-7" cy="6" r="3" fill="var(--navy)" />
            <circle cx="7" cy="6" r="3" fill="var(--navy)" />
          </motion.g>
        )}
      </svg>
    </div>
  );
}
