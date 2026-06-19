import { StatCounter } from '@/components/ui/StatCounter';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const STATS = [
  { value: '9+', label: 'Years on the road' },
  { value: '75+', label: 'Industries served' },
  { value: '500+', label: 'Campaigns delivered' },
  { value: '2', label: 'Cities — Pune & Mumbai' },
];

/** Animated stat counters. */
export function Stats() {
  return (
    <section className="container py-20 lg:py-24">
      <ScrollReveal>
        <Eyebrow>By the numbers</Eyebrow>
      </ScrollReveal>
      <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
        {STATS.map((s) => (
          <StatCounter key={s.label} value={s.value} label={s.label} />
        ))}
      </div>
    </section>
  );
}
