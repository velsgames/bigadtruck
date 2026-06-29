'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

/**
 * Per-route fade/rise transition — applied ONLY on client-side navigation,
 * never on the first paint. The very first render (and any no-JS / reduced-
 * motion / throttled client) returns the content fully visible, so the whole
 * page can never get stuck behind a JS-driven `opacity:0` (the failure that
 * left mobile / iOS Low-Power-Mode visitors staring at a blank screen).
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const firstPath = useRef(pathname);
  const [navigated, setNavigated] = useState(false);

  useEffect(() => {
    if (pathname !== firstPath.current) setNavigated(true);
  }, [pathname]);

  // First load, reduced motion, or no JS: render visible, no animation gate.
  if (!navigated || reduce) return <>{children}</>;

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
