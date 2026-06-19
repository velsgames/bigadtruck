/**
 * Client testimonials for the homepage slider. Placeholder quotes in the
 * Bigadtruck voice — swap for real, attributed client quotes when available.
 */

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      'We stopped chasing five different agencies. Bigadtruck carried the whole load — brand, website and media — and delivered numbers we could actually report to the board.',
    author: 'Rohit Deshmukh',
    role: 'Marketing Head',
    company: 'Metro Retail Co.',
  },
  {
    quote:
      'Buzzmore turned our admission marketing around. Qualified enquiries landed with our counsellors in minutes, not days, and the cost per lead dropped sharply.',
    author: 'Dr. Anjali Kulkarni',
    role: 'Director of Admissions',
    company: 'Confidential University',
  },
  {
    quote:
      'Their DPR cleared on the first submission. The financial model and compliance were airtight — exactly what the funding body needed.',
    author: 'S. Patil',
    role: 'Project Lead',
    company: 'Regional Infrastructure Body',
  },
  {
    quote:
      'The 3D visualization let us pre-sell before we broke ground. One team handled design, documentation and the marketing site.',
    author: 'Karan Mehta',
    role: 'Director',
    company: 'Skyline Developers',
  },
  {
    quote:
      'Plain-spoken, fast and accountable. One owner kept brand, web and media on a single plan — no finger-pointing, no slipped dates.',
    author: 'Priya Nair',
    role: 'Founder',
    company: 'Urban Spaces',
  },
];
