/**
 * Sanity environment configuration. The site runs fine WITHOUT these — it
 * falls back to the typed files in /content. Set them to enable the CMS:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET
 */
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-10-01';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';

/** True only when a Sanity project is configured. Pages branch on this. */
export const sanityConfigured = projectId.length > 0;
