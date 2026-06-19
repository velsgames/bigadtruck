import { defineField, defineType } from 'sanity';

export const division = defineType({
  name: 'division',
  title: 'Division',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'order', title: 'Order', type: 'number' }),
    defineField({ name: 'kicker', title: 'Kicker (e.g. Division 01)', type: 'string' }),
    defineField({ name: 'short', title: 'Short label', type: 'string' }),
    defineField({ name: 'tagline', type: 'text', rows: 2 }),
    defineField({ name: 'summary', type: 'text', rows: 3 }),
    defineField({ name: 'intro', type: 'text', rows: 5 }),
    defineField({
      name: 'accent',
      type: 'string',
      options: { list: ['primary', 'secondary'] },
      initialValue: 'primary',
    }),
    defineField({ name: 'image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'capabilities',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string' },
            { name: 'description', type: 'text', rows: 2 },
          ],
        },
      ],
    }),
    defineField({
      name: 'process',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string' },
            { name: 'description', type: 'text', rows: 2 },
          ],
        },
      ],
    }),
    defineField({
      name: 'useCase',
      type: 'object',
      fields: [
        { name: 'title', type: 'string' },
        { name: 'body', type: 'text', rows: 3 },
        {
          name: 'metrics',
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
        },
      ],
    }),
  ],
  orderings: [{ title: 'Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'name', subtitle: 'short' } },
});
