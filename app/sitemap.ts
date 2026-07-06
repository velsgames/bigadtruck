import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';
import { divisions } from '@/content/divisions';
import { caseStudies } from '@/content/caseStudies';
import { posts } from '@/content/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    '',
    '/about',
    '/divisions',
    '/services',
    '/work',
    '/industries',
    '/contact',
    '/careers',
    '/blog',
  ];

  const now = new Date('2026-06-20');

  const base = staticPaths.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : 0.8,
  }));

  const divisionPaths = divisions.map((d) => ({
    url: `${SITE_URL}/divisions/${d.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const workPaths = caseStudies.map((c) => ({
    url: `${SITE_URL}/work/${c.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const blogPaths = posts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...base, ...divisionPaths, ...workPaths, ...blogPaths];
}
