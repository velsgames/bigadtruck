'use client';

/**
 * Sanity Studio configuration. The Studio is embedded in the site at /studio.
 * Requires NEXT_PUBLIC_SANITY_PROJECT_ID + NEXT_PUBLIC_SANITY_DATASET.
 */
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { apiVersion, dataset, projectId } from './sanity/env';
import { schemaTypes } from './sanity/schemaTypes';

export default defineConfig({
  name: 'bigadtruck',
  title: 'Bigadtruck Group — CMS',
  basePath: '/studio',
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Singleton: Site Settings
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.divider(),
            S.documentTypeListItem('division').title('Divisions'),
            S.documentTypeListItem('service').title('Services'),
            S.documentTypeListItem('caseStudy').title('Case Studies'),
            S.documentTypeListItem('industry').title('Industries'),
            S.documentTypeListItem('testimonial').title('Testimonials'),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
