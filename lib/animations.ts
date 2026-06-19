import type { Variants } from 'framer-motion';

export const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

/** Container that staggers children into view. */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

/** Standard fade + rise reveal. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_EXPO },
  },
};

/** Subtle scale + fade, used for cards and media. */
export const fadeScale: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: EASE_EXPO },
  },
};

/** Word/line reveal for kinetic headlines (used with split text). */
export const lineReveal: Variants = {
  hidden: { y: '110%' },
  show: {
    y: '0%',
    transition: { duration: 0.8, ease: EASE_EXPO },
  },
};

/** Reusable whileInView config so reveals trigger once, near viewport. */
export const inViewProps = {
  initial: 'hidden',
  whileInView: 'show',
  viewport: { once: true, margin: '0px 0px -12% 0px' },
} as const;
