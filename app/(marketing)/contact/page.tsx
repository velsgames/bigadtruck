import type { Metadata } from 'next';
import { Mail, Phone, MessageCircle, MapPin } from 'lucide-react';
import { pageMeta } from '@/lib/seo';
import { contact, socials, site } from '@/content/site';
import { PageHero } from '@/components/sections/PageHero';
import { ContactForm } from '@/components/sections/ContactForm';

export const metadata: Metadata = pageMeta({
  title: 'Contact',
  description:
    'Start a project with Bigadtruck Group. Tell us your goal and we’ll bring the right mix of strategy, creative, media and technology. Offices in Pune & Mumbai.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Start a project"
        title="Tell us the destination. We’ll deliver."
        intro="Share your brief below and the right team will get back to you. Prefer to talk? Call or WhatsApp us directly."
      />

      <section className="container py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          {/* Form */}
          <div className="order-2 lg:order-1">
            <ContactForm />
          </div>

          {/* Details */}
          <div className="order-1 space-y-8 lg:order-2">
            <div className="rounded-3xl border border-line bg-surface p-7">
              <h2 className="font-display text-lg font-semibold text-ink">Reach us directly</h2>
              <ul className="mt-5 space-y-4 text-sm">
                <li>
                  <a href={`mailto:${contact.email}`} className="group flex items-center gap-3 text-ink hover:text-accent">
                    <Mail className="h-5 w-5 text-accent" /> {contact.email}
                  </a>
                </li>
                <li>
                  <a href={`tel:${contact.phoneHref}`} className="group flex items-center gap-3 text-ink hover:text-accent">
                    <Phone className="h-5 w-5 text-accent" /> {contact.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a
                    href={contact.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 text-ink hover:text-accent"
                  >
                    <MessageCircle className="h-5 w-5 text-accent" /> {contact.whatsappLabel}
                  </a>
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border border-line bg-surface p-7">
              <h2 className="font-display text-lg font-semibold text-ink">Our offices</h2>
              <ul className="mt-5 space-y-5">
                {contact.offices.map((o) => (
                  <li key={o.city}>
                    <div className="flex items-center gap-2 text-ink">
                      <MapPin className="h-4 w-4 text-accent" />
                      <span className="font-medium">{o.label}</span>
                    </div>
                    <p className="mt-1 pl-6 text-sm text-muted">{o.address}</p>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(o.mapQuery)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block pl-6 text-xs text-accent hover:underline"
                    >
                      View on map →
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-line bg-surface p-7">
              <h2 className="font-display text-lg font-semibold text-ink">Follow along</h2>
              <ul className="mt-5 flex flex-wrap gap-3 text-sm">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-line px-4 py-1.5 text-ink transition-colors hover:border-accent hover:text-accent"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="mt-12 overflow-hidden rounded-3xl border border-line">
          <iframe
            title={`${site.name} offices — Pune & Mumbai`}
            src="https://maps.google.com/maps?q=Pune%2C%20Maharashtra&t=&z=9&ie=UTF8&iwloc=&output=embed"
            className="h-[360px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
}
