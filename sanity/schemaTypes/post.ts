import { defineField, defineType } from 'sanity';

export const post = defineType({
  name: 'post',
  title: 'Insight / Article',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'excerpt', type: 'text', rows: 3 }),
    defineField({
      name: 'category',
      type: 'string',
      options: {
        list: ['Advertising', 'Digital', 'Technology', 'Media', 'Insights'],
        layout: 'radio',
      },
      initialValue: 'Insights',
    }),
    defineField({ name: 'date', title: 'Publish date', type: 'date', validation: (r) => r.required() }),
    defineField({ name: 'readMins', title: 'Read time (mins)', type: 'number', initialValue: 5 }),
    defineField({ name: 'author', type: 'string', initialValue: 'Bigadtruck Editorial' }),
    defineField({ name: 'featured', type: 'boolean', initialValue: false }),
    defineField({ name: 'cover', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'tags', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' } }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block', styles: [{ title: 'Normal', value: 'normal' }, { title: 'Heading', value: 'h2' }] }],
    }),
  ],
  orderings: [
    { title: 'Newest', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] },
  ],
  preview: { select: { title: 'title', subtitle: 'category', media: 'cover' } },
});
