import type { Metadata } from 'next';
import { site, contact } from '@/content/site';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || site.url;

type PageMetaArgs = {
  title: string;
  description: string;
  path?: string;
  image?: string;
};

/** Build per-page metadata with canonical URL + OG/Twitter cards. */
export function pageMeta({ title, description, path = '/', image }: PageMetaArgs): Metadata {
  const url = new URL(path, SITE_URL).toString();
  const ogImage = image || '/opengraph-image';
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      siteName: site.name,
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

/** Organization + LocalBusiness JSON-LD for the site root. */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: site.name,
    legalName: site.legalName,
    url: SITE_URL,
    email: contact.email,
    slogan: site.tagline,
    foundingDate: String(site.foundedYear),
    description: site.description,
    sameAs: [
      'https://instagram.com/bigadtruck',
      'https://linkedin.com/company/bigadtruck',
      'https://facebook.com/bigadtruck',
    ],
    address: contact.offices.map((o) => ({
      '@type': 'PostalAddress',
      addressLocality: o.city,
      addressRegion: 'Maharashtra',
      addressCountry: 'IN',
    })),
    founder: { '@type': 'Person', name: site.founder.fullName, jobTitle: site.founder.role },
  };
}

export function localBusinessJsonLd() {
  return contact.offices.map((o) => ({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#localbusiness-${o.city.toLowerCase()}`,
    name: `${site.name} — ${o.city}`,
    image: `${SITE_URL}/opengraph-image`,
    url: SITE_URL,
    email: contact.email,
    telephone: contact.phoneDisplay,
    address: {
      '@type': 'PostalAddress',
      addressLocality: o.city,
      addressRegion: 'Maharashtra',
      addressCountry: 'IN',
    },
    areaServed: 'IN',
  }));
}

/** BlogPosting schema for a Digital BAT article. */
export function articleJsonLd({
  title,
  description,
  slug,
  date,
  author,
  image,
}: {
  title: string;
  description: string;
  slug: string;
  date: string;
  author: string;
  image: string;
}) {
  const url = `${SITE_URL}/blog/${slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: title,
    description,
    datePublished: date,
    dateModified: date,
    image: image.startsWith('http') ? image : `${SITE_URL}${image}`,
    author: { '@type': 'Organization', name: author, url: SITE_URL },
    publisher: { '@id': `${SITE_URL}/#organization` },
    mainEntityOfPage: url,
    url,
  };
}

/** Service schema for a division detail page. */
export function serviceJsonLd(name: string, description: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: 'IN',
    url: new URL(path, SITE_URL).toString(),
  };
}
