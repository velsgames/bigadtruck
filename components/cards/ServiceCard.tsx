'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Service } from '@/content/services';
import { cn } from '@/lib/utils';

/**
 * Bento service tile that expands in place to reveal deliverables + outcome.
 * Span hints come from the service data to create an editorial bento rhythm.
 */
export function ServiceCard({ service }: { service: Service }) {
  const [open, setOpen] = useState(false);
  const span =
    service.span === 'wide'
      ? 'sm:col-span-2'
      : service.span === 'tall'
        ? 'lg:row-span-2'
        : '';

  return (
    <div
      id={service.id}
      className={cn(
        'group scroll-mt-28 rounded-3xl border border-line bg-surface p-7 transition-colors hover:border-white/20',
        span,
      )}
    >
      <button
        className="flex w-full items-start justify-between gap-4 text-left"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`${service.id}-panel`}
      >
        <div>
          <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
            {service.title}
          </h3>
          <p className="mt-2 text-pretty text-sm text-muted">{service.blurb}</p>
        </div>
        <span
          className={cn(
            'mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line transition-all duration-300',
            open ? 'rotate-45 bg-accent text-white' : 'text-muted group-hover:text-ink',
          )}
          aria-hidden
        >
          <Plus className="h-4 w-4" />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${service.id}-panel`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-5">
              <ul className="flex flex-wrap gap-2">
                {service.deliverables.map((d) => (
                  <li
                    key={d}
                    className="rounded-full border border-line px-3 py-1 text-xs text-ink/80"
                  >
                    {d}
                  </li>
                ))}
              </ul>
              <p className="mt-4 border-l-2 border-accent pl-3 text-sm text-ink/90">
                {service.outcomes}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
