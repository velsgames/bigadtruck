import Link from 'next/link';
import { site, contact, socials, footerNav } from '@/content/site';
import { Logo } from '@/components/layout/Logo';
import { NewsletterForm } from '@/components/layout/NewsletterForm';
import { ArrowUpRight } from 'lucide-react';

export function Footer() {
  const year = 2026; // build-time constant; update or wire to a date util if desired

  return (
    <footer className="border-t border-line bg-bg" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="container py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Logo className="h-24 w-auto" />
            <p className="mt-5 max-w-sm text-pretty text-muted">{site.tagline}</p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <a href={`mailto:${contact.email}`} className="text-ink hover:text-accent">
                {contact.email}
              </a>
              <a href={`tel:${contact.phoneHref}`} className="text-ink hover:text-accent">
                {contact.phoneDisplay}
              </a>
            </div>
            <div className="mt-8 max-w-sm">
              <p className="mb-3 text-sm font-medium text-ink">Get the dispatch — ideas & openings.</p>
              <NewsletterForm />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerNav.map((col) => (
              <div key={col.title}>
                <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-ink/80 transition-colors hover:text-accent"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-line pt-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 text-sm text-muted hover:text-ink"
              >
                {s.label}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted">
            <span>Pune · Mumbai, India</span>
            <span className="hidden sm:inline">·</span>
            <span>
              © {year} {site.legalName}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
