import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  // A singleton — only one of these should exist.
  fields: [
    defineField({ name: 'tagline', type: 'string' }),
    defineField({ name: 'description', type: 'text', rows: 3 }),
    defineField({ name: 'email', type: 'string' }),
    defineField({ name: 'phoneDisplay', title: 'Phone (display)', type: 'string' }),
    defineField({ name: 'phoneHref', title: 'Phone (tel: digits)', type: 'string' }),
    defineField({ name: 'whatsappHref', title: 'WhatsApp link', type: 'url' }),
    defineField({
      name: 'offices',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'city', type: 'string' },
            { name: 'label', type: 'string' },
            { name: 'address', type: 'string' },
            { name: 'mapQuery', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'socials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string' },
            { name: 'handle', type: 'string' },
            { name: 'href', type: 'url' },
          ],
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Site Settings' }) },
});
