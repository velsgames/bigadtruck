'use client';

import { motion } from 'framer-motion';
import { fadeUp, inViewProps, staggerContainer } from '@/lib/animations';
import { cn } from '@/lib/utils';

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
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      variants={fadeUp}
      {...inViewProps}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </MotionTag>
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
  return (
    <motion.div className={className} variants={staggerContainer} {...inViewProps}>
      {children}
    </motion.div>
  );
}

export function ScrollRevealItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={cn(className)} variants={fadeUp}>
      {children}
    </motion.div>
  );
}
