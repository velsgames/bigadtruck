/**
 * Content access layer. Every page reads content through these helpers.
 *
 * - If Sanity is configured (NEXT_PUBLIC_SANITY_PROJECT_ID set) and has
 *   documents, content comes from the CMS — editable at /studio.
 * - Otherwise it falls back to the typed seed files in /content, so the site
 *   renders perfectly with zero configuration.
 */
/* eslint-disable @typescript-eslint/no-explicit-any -- CMS rows are loosely typed external data */
import 'server-only';
// Both this module and lib/sanity/client are `server-only`, so the Sanity
// client stays in the server bundle and never ships to the browser. (A
// dynamic import() here would instead create a webpack async chunk that App
// Router preloads into the client — the opposite of what we want.)
import { sanityClient } from '@/lib/sanity/client';
import { sanityConfigured } from '@/sanity/env';
import {
  divisionsQuery,
  caseStudiesQuery,
  servicesQuery,
  industriesQuery,
  testimonialsQuery,
  postsQuery,
} from '@/lib/sanity/queries';

import { divisions as localDivisions, type Division } from '@/content/divisions';
import { caseStudies as localCaseStudies, type CaseStudy } from '@/content/caseStudies';
import { services as localServices, type Service } from '@/content/services';
import { industries as localIndustries, type Industry } from '@/content/industries';
import { testimonials as localTestimonials, type Testimonial } from '@/content/testimonials';
import { posts as localPosts, type Post } from '@/content/posts';

/** Fetch from Sanity, falling back to local seed data on empty/error. */
async function fromSanityOrLocal<T>(query: string, local: T[], normalize?: (rows: any[]) => T[]) {
  if (!sanityConfigured) return local;
  try {
    const rows = await sanityClient.fetch<any[]>(query, {}, { next: { revalidate: 60 } });
    if (!rows || rows.length === 0) return local;
    return normalize ? normalize(rows) : (rows as T[]);
  } catch (err) {
    console.error('[cms] Sanity fetch failed, using local content:', err);
    return local;
  }
}

// Divisions ---------------------------------------------------------------
export async function getDivisions(): Promise<Division[]> {
  return fromSanityOrLocal<Division>(divisionsQuery, localDivisions, (rows) =>
    rows.map((r) => ({
      ...r,
      image: r.image || `/images/divisions/${r.slug}.svg`,
    })),
  );
}

export async function getDivision(slug: string): Promise<Division | undefined> {
  return (await getDivisions()).find((d) => d.slug === slug);
}

// Case studies ------------------------------------------------------------
export async function getCaseStudies(): Promise<CaseStudy[]> {
  return fromSanityOrLocal<CaseStudy>(caseStudiesQuery, localCaseStudies, (rows) =>
    rows.map((r) => ({
      ...r,
      cover: r.cover || '/images/work/retail-relaunch.svg',
      gallery: (r.gallery || []).map((g: any) => ({
        src: g.src || '/images/work/gallery-a.svg',
        alt: g.alt || r.title,
      })),
      contribution: r.contribution || [],
      decisions: r.decisions || [],
      outcomes: r.outcomes || [],
    })),
  );
}

export async function getCaseStudy(slug: string): Promise<CaseStudy | undefined> {
  return (await getCaseStudies()).find((c) => c.slug === slug);
}

export async function getFeaturedCaseStudies(): Promise<CaseStudy[]> {
  const all = await getCaseStudies();
  const featured = all.filter((c) => c.featured);
  return featured.length ? featured : all.slice(0, 3);
}

// Services / industries / testimonials ------------------------------------
export async function getServices(): Promise<Service[]> {
  return fromSanityOrLocal<Service>(servicesQuery, localServices);
}

export async function getIndustries(): Promise<Industry[]> {
  return fromSanityOrLocal<Industry>(industriesQuery, localIndustries);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return fromSanityOrLocal<Testimonial>(testimonialsQuery, localTestimonials);
}

// Blog / insights ---------------------------------------------------------
export async function getPosts(): Promise<Post[]> {
  const rows = await fromSanityOrLocal<Post>(postsQuery, localPosts, (r) =>
    r.map((p) => ({
      ...p,
      cover: p.cover || '/images/blog/insight.svg',
      tags: p.tags || [],
      body: p.body || [],
    })),
  );
  // Newest first, regardless of source.
  return [...rows].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(slug: string): Promise<Post | undefined> {
  return (await getPosts()).find((p) => p.slug === slug);
}

export async function getFeaturedPosts(limit = 3): Promise<Post[]> {
  const all = await getPosts();
  const featured = all.filter((p) => p.featured);
  return (featured.length ? featured : all).slice(0, limit);
}
