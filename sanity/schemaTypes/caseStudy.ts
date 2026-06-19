import { defineField, defineType } from 'sanity';

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'client', type: 'string' }),
    defineField({ name: 'industry', type: 'string' }),
    defineField({ name: 'service', type: 'string' }),
    defineField({ name: 'division', type: 'string' }),
    defineField({ name: 'year', type: 'string' }),
    defineField({ name: 'featured', type: 'boolean', initialValue: false }),
    defineField({ name: 'summary', type: 'text', rows: 3 }),
    defineField({ name: 'cover', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'hero',
      title: 'Headline metric',
      type: 'object',
      fields: [
        { name: 'value', type: 'string' },
        { name: 'label', type: 'string' },
      ],
    }),
    defineField({ name: 'challenge', type: 'text', rows: 5 }),
    defineField({ name: 'contribution', type: 'array', of: [{ type: 'string' }] }),
    defineField({
      name: 'decisions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string' },
            { name: 'body', type: 'text', rows: 2 },
          ],
        },
      ],
    }),
    defineField({
      name: 'outcomes',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', type: 'string' },
            { name: 'label', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string' }] }],
    }),
  ],
  preview: { select: { title: 'title', subtitle: 'client', media: 'cover' } },
});
