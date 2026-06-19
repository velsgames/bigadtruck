import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Service } from '@/content/services';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollRevealGroup, ScrollRevealItem } from '@/components/ui/ScrollReveal';

/** Compact capability bento linking into the full /services page. */
export function ServicesOverview({ services }: { services: Service[] }) {
  const featured = services.slice(0, 8);
  return (
    <section className="border-y border-line bg-surface/30">
      <div className="container py-20 lg:py-28">
        <SectionHeading
          index="03"
          eyebrow="Capabilities"
          title="A full load of services — strategy to delivery."
          intro="Pick one capability or the whole stack. Either way it ships from one accountable team."
          link={{ href: '/services', label: 'All services' }}
        />

        <ScrollRevealGroup className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((service) => (
            <ScrollRevealItem key={service.id}>
              <Link
                href={`/services#${service.id}`}
                className="group flex h-full flex-col justify-between rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-lg font-semibold text-ink">{service.title}</h3>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </div>
                <p className="mt-3 text-sm text-muted">{service.blurb}</p>
              </Link>
            </ScrollRevealItem>
          ))}
        </ScrollRevealGroup>
      </div>
    </section>
  );
}
