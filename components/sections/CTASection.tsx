import { ButtonLink } from '@/components/ui/Button';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { contact } from '@/content/site';

/**
 * Big closing call-to-action. Reused across most pages.
 */
export function CTASection({
  title = 'Got a destination in mind?',
  subtitle = 'Tell us where your brand needs to go. We’ll load up the right mix of strategy, creative, media and technology — and deliver it.',
  primaryLabel = 'Start a project',
}: {
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
}) {
  return (
    <section className="container py-20 lg:py-28">
      <ScrollReveal className="relative overflow-hidden rounded-[2rem] border border-line bg-surface px-6 py-16 text-center lg:px-12 lg:py-24">
        {/* road accent */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-60"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -top-24 left-1/2 h-56 w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-accent/20 blur-3xl"
          aria-hidden
        />
        <h2 className="mx-auto max-w-3xl text-balance font-display text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.02] tracking-tight text-ink">
          {title}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-muted">{subtitle}</p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <MagneticButton>
            <ButtonLink href="/contact" variant="primary" size="lg" withArrow>
              {primaryLabel}
            </ButtonLink>
          </MagneticButton>
          <ButtonLink href={contact.whatsappHref} variant="ghost" size="lg">
            {contact.whatsappLabel}
          </ButtonLink>
        </div>
      </ScrollReveal>
    </section>
  );
}
