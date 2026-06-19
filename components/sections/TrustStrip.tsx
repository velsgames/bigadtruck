import { Marquee } from '@/components/ui/Marquee';

const CAPABILITIES = [
  'Advertising',
  'Branding',
  'Digital Marketing',
  'Web & Apps',
  'Performance Media',
  'Government Media',
  'Lead Generation',
  'DPR Creation',
  'Architecture',
  'Project Management',
  'TV · Radio · OOH',
  'Events',
];

const INDUSTRIES = [
  'Education',
  'Real Estate',
  'Government',
  'Manufacturing',
  'Healthcare',
  'Retail',
  'Infrastructure',
  'Hospitality',
  'Automotive',
  'BFSI',
  'FMCG',
  'Technology',
];

/** Two counter-scrolling marquees: capabilities over industries served. */
export function TrustStrip() {
  return (
    <section className="border-y border-line bg-surface/30 py-8" aria-label="Capabilities and industries">
      <Marquee items={CAPABILITIES} />
      <div className="h-6" />
      <Marquee items={INDUSTRIES} reverse separator="·" />
    </section>
  );
}
