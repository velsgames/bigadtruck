import 'server-only';
// Import the pure-data client directly, NOT from `next-sanity` — the
// next-sanity barrel re-exports 'use client' preview components, which would
// otherwise be pulled into every route's client manifest (~185 KB).
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { apiVersion, dataset, projectId, sanityConfigured } from '@/sanity/env';

/**
 * Read-only Sanity client. Only meaningful when a project is configured;
 * the cms layer guards on `sanityConfigured` before using it.
 */
export const sanityClient = createClient({
  projectId: projectId || 'placeholder',
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
});

const builder = imageUrlBuilder({ projectId: projectId || 'placeholder', dataset });

/** Build an optimized URL for a Sanity image reference. */
export function urlForImage(source: unknown) {
  if (!source) return undefined;
  try {
    return builder.image(source as never).auto('format').fit('max').url();
  } catch {
    return undefined;
  }
}

export { sanityConfigured };
