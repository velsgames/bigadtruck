import { defineField, defineType } from 'sanity';

export const industry = defineType({
  name: 'industry',
  title: 'Industry',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'order', type: 'number' }),
    defineField({ name: 'blurb', type: 'text', rows: 2 }),
    defineField({ name: 'highlight', title: 'Specialism (highlighted)', type: 'boolean', initialValue: false }),
  ],
  orderings: [{ title: 'Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'name', subtitle: 'blurb' } },
});
