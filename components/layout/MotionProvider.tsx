'use client';

import { MotionConfig } from 'framer-motion';

/**
 * Makes every framer-motion animation honour the OS "reduce motion" setting.
 * The CSS rule in globals.css only disables CSS animations/transitions; JS-driven
 * transforms need this to be quietened too.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
