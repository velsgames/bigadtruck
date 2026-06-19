/**
 * Embedded Sanity Studio at /studio. Edits content live (requires
 * NEXT_PUBLIC_SANITY_PROJECT_ID + NEXT_PUBLIC_SANITY_DATASET).
 */
import { NextStudio } from 'next-sanity/studio';
import config from '@/sanity.config';

export const dynamic = 'force-static';
export { metadata, viewport } from 'next-sanity/studio';

export default function StudioPage() {
  return <NextStudio config={config} />;
}
