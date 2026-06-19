'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { industriesFilter, servicesFilter, type CaseStudy } from '@/content/caseStudies';
import { CaseStudyCard } from '@/components/cards/CaseStudyCard';
import { cn } from '@/lib/utils';

/** Filterable case-study grid (by industry & service). */
export function WorkGrid({ caseStudies }: { caseStudies: CaseStudy[] }) {
  const [industry, setIndustry] = useState<string>('All');
  const [service, setService] = useState<string>('All');

  const filtered = useMemo(
    () =>
      caseStudies.filter(
        (c) =>
          (industry === 'All' || c.industry === industry) &&
          (service === 'All' || c.service === service),
      ),
    [industry, service, caseStudies],
  );

  return (
    <div>
      <div className="flex flex-col gap-5 border-b border-line pb-8">
        <FilterRow label="Industry" options={[...industriesFilter]} active={industry} onSelect={setIndustry} />
        <FilterRow label="Service" options={[...servicesFilter]} active={service} onSelect={setService} />
      </div>

      <motion.div layout className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 lg:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((study) => (
            <motion.div
              key={study.slug}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <CaseStudyCard study={study} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="py-16 text-center text-muted">
          No case studies match that combination yet — try another filter.
        </p>
      )}
    </div>
  );
}

function FilterRow({
  label,
  options,
  active,
  onSelect,
}: {
  label: string;
  options: string[];
  active: string;
  onSelect: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-xs font-medium uppercase tracking-[0.18em] text-muted">{label}</span>
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onSelect(opt)}
          className={cn(
            'rounded-full border px-4 py-1.5 text-sm transition-colors',
            active === opt
              ? 'border-accent bg-accent text-white'
              : 'border-line text-muted hover:border-white/20 hover:text-ink',
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
