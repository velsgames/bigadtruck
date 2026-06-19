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
      streetAddress: o.address,
    })),
    founder: { '@type': 'Person', name: site.founder.fullName, jobTitle: site.founder.role },
  };
}

export function localBusinessJsonLd() {
  return contact.offices.map((o) => ({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
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
      streetAddress: o.address,
    },
    areaServed: 'IN',
  }));
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
