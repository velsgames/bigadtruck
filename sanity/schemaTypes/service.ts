import { defineField, defineType } from 'sanity';

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'order', type: 'number' }),
    defineField({ name: 'blurb', type: 'text', rows: 2 }),
    defineField({ name: 'deliverables', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'outcomes', title: 'Outcome', type: 'text', rows: 2 }),
    defineField({
      name: 'span',
      type: 'string',
      options: { list: ['normal', 'wide', 'tall'] },
      initialValue: 'normal',
    }),
  ],
  orderings: [{ title: 'Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'blurb' } },
});
