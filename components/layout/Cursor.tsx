'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { usePrefersReducedMotion } from '@/lib/useReducedMotion';

/**
 * Custom blend-mode cursor dot for desktop fine-pointer devices. Grows over
 * interactive elements. Hidden on touch (CSS) and reduced-motion (here).
 */
export function Cursor() {
  const reduced = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement;
      setActive(!!el.closest('a, button, [data-cursor="hover"]'));
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [reduced, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      className="cursor-dot"
      style={{ x: sx, y: sy }}
      aria-hidden
    >
      <motion.div
        className="rounded-full bg-white"
        animate={{ width: active ? 48 : 12, height: active ? 48 : 12 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        style={{ translateX: '-50%', translateY: '-50%' }}
      />
    </motion.div>
  );
}
