/**
 * Exports the typed /content seed data to Sanity NDJSON, then you import it:
 *
 *   node --experimental-strip-types scripts/export-to-sanity.mjs > seed.ndjson
 *   npx sanity dataset import seed.ndjson production --replace
 *
 * (Run the import from a folder with sanity.cli.ts, or `npx sanity@latest`.)
 * Documents are created WITHOUT images — the site falls back to the local
 * placeholder SVGs until you upload real images in the Studio.
 */
import { divisions } from '../content/divisions.ts';
import { services } from '../content/services.ts';
import { caseStudies } from '../content/caseStudies.ts';
import { industries } from '../content/industries.ts';
import { testimonials } from '../content/testimonials.ts';
import { site, contact, socials } from '../content/site.ts';

const docs = [];

// Singleton site settings
docs.push({
  _id: 'siteSettings',
  _type: 'siteSettings',
  tagline: site.tagline,
  description: site.description,
  email: contact.email,
  phoneDisplay: contact.phoneDisplay,
  phoneHref: contact.phoneHref,
  whatsappHref: contact.whatsappHref,
  offices: contact.offices.map((o) => ({ _key: o.city, ...o })),
  socials: socials.map((s) => ({ _key: s.label, ...s })),
});

divisions.forEach((d, i) =>
  docs.push({
    _id: `division-${d.slug}`,
    _type: 'division',
    name: d.name,
    slug: { _type: 'slug', current: d.slug },
    order: i,
    kicker: d.kicker,
    short: d.short,
    tagline: d.tagline,
    summary: d.summary,
    intro: d.intro,
    accent: d.accent,
    capabilities: d.capabilities.map((c, j) => ({ _key: `cap${j}`, ...c })),
    process: d.process.map((p, j) => ({ _key: `step${j}`, ...p })),
    useCase: {
      title: d.useCase.title,
      body: d.useCase.body,
      metrics: d.useCase.metrics.map((m, j) => ({ _key: `m${j}`, ...m })),
    },
  }),
);

services.forEach((s, i) =>
  docs.push({
    _id: `service-${s.id}`,
    _type: 'service',
    title: s.title,
    slug: { _type: 'slug', current: s.id },
    order: i,
    blurb: s.blurb,
    deliverables: s.deliverables,
    outcomes: s.outcomes,
    span: s.span || 'normal',
  }),
);

caseStudies.forEach((c) =>
  docs.push({
    _id: `caseStudy-${c.slug}`,
    _type: 'caseStudy',
    title: c.title,
    slug: { _type: 'slug', current: c.slug },
    client: c.client,
    industry: c.industry,
    service: c.service,
    division: c.division,
    year: c.year,
    featured: !!c.featured,
    summary: c.summary,
    hero: c.hero,
    challenge: c.challenge,
    contribution: c.contribution,
    decisions: c.decisions.map((d, j) => ({ _key: `d${j}`, ...d })),
    outcomes: c.outcomes.map((o, j) => ({ _key: `o${j}`, ...o })),
  }),
);

industries.forEach((ind, i) =>
  docs.push({
    _id: `industry-${i}`,
    _type: 'industry',
    name: ind.name,
    order: i,
    blurb: ind.blurb,
    highlight: !!ind.highlight,
  }),
);

testimonials.forEach((t, i) =>
  docs.push({
    _id: `testimonial-${i}`,
    _type: 'testimonial',
    quote: t.quote,
    author: t.author,
    role: t.role,
    company: t.company,
    order: i,
  }),
);

process.stdout.write(docs.map((d) => JSON.stringify(d)).join('\n') + '\n');
