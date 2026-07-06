/**
 * Global site configuration: brand facts, navigation, contact details, socials.
 * Edit here to update the navbar, footer, contact page, and structured data.
 */

export const site = {
  name: 'Bigadtruck Group',
  legalName: 'Bigadtruck Private Limited',
  stylized: 'BigAdTruck',
  domain: 'bigadtruck.com',
  url: 'https://bigadtruck.com',
  tagline: 'A truckload of ideas, delivered to every destination.',
  shortTagline: 'We carry your brand to every destination.',
  description:
    'Bigadtruck Group is a 360° new-age advertising, marketing and technology agency in Pune & Mumbai. One roof for strategy, digital, media, web, government media and project delivery.',
  foundedYear: 2017,
  yearsLabel: '9+ years',
  industriesServed: '75+',
  founder: {
    name: 'Apoorva Vyas',
    fullName: 'Apoorva Vyas',
    role: 'Founder & CEO',
  },
} as const;

export const contact = {
  email: 'vivek@bigadtruck.com',
  phoneDisplay: '+91 79723 61076',
  phoneHref: '+917972361076',
  whatsappHref: 'https://wa.me/917972361076',
  whatsappLabel: 'Chat on WhatsApp',
  offices: [
    {
      city: 'Pune',
      label: 'Pune (HQ)',
      address: 'Pune, Maharashtra, India',
      mapQuery: 'Pune, Maharashtra',
    },
    {
      city: 'Mumbai',
      label: 'Mumbai',
      address: 'Mumbai, Maharashtra, India',
      mapQuery: 'Mumbai, Maharashtra',
    },
  ],
} as const;

export const socials = [
  { label: 'Instagram', handle: '@bigadtruck', href: 'https://instagram.com/bigadtruck' },
  { label: 'LinkedIn', handle: 'Bigadtruck Group', href: 'https://linkedin.com/company/bigadtruck' },
  { label: 'Facebook', handle: 'Bigadtruck', href: 'https://facebook.com/bigadtruck' },
] as const;

export type NavChild = { label: string; href: string; description?: string };
export type NavItem = { label: string; href: string; children?: NavChild[] };

export const nav: NavItem[] = [
  {
    label: 'Divisions',
    href: '/divisions',
    children: [
      { label: 'Bigadtruck — Core', href: '/divisions/bigadtruck', description: 'Advertising, marketing & technology' },
      { label: 'Buzzmore Media', href: '/divisions/buzzmore', description: 'Government media & lead generation' },
      { label: 'DPR Creation', href: '/divisions/dpr', description: 'Bankable Detailed Project Reports' },
      { label: 'Architectural Services', href: '/divisions/architecture', description: 'Architecture, planning & 3D' },
      { label: 'Project Management', href: '/divisions/project-management', description: 'End-to-end delivery & PMC' },
    ],
  },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Advertising & Branding', href: '/services#advertising-branding' },
      { label: 'Digital Marketing & Social', href: '/services#digital-social' },
      { label: 'Web & App Development', href: '/services#web-app' },
      { label: 'Media — TV, Radio, Print, OOH', href: '/services#media' },
      { label: 'Social & WhatsApp Marketing', href: '/services#social-whatsapp' },
      { label: 'Lead Generation Campaigns', href: '/services#lead-generation' },
    ],
  },
  { label: 'Work', href: '/work' },
  { label: 'Industries', href: '/industries' },
  { label: 'Digital BAT', href: '/blog' },
  { label: 'AI Guide', href: '/ai-guides' },
  { label: 'About', href: '/about' },
];

/** The editorial arm — advertising, digital & tech insights (Afaqs/Social-Samosa style). */
export const blog = {
  name: 'Digital BAT',
  path: '/blog',
  tagline: 'Advertising, digital & marketing-tech — unpacked by Bigadtruck.',
  description:
    'Digital BAT is Bigadtruck Group’s editorial desk: original takes on advertising, out-of-home, digital, media and marketing technology across Pune, Mumbai and India.',
} as const;

export const footerNav = [
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Divisions', href: '/divisions' },
      { label: 'Work', href: '/work' },
      { label: 'Digital BAT', href: '/blog' },
      { label: 'AI Learning Guide', href: '/ai-guides' },
      { label: 'Industries', href: '/industries' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Divisions',
    links: [
      { label: 'Bigadtruck — Core', href: '/divisions/bigadtruck' },
      { label: 'Buzzmore Media', href: '/divisions/buzzmore' },
      { label: 'DPR Creation', href: '/divisions/dpr' },
      { label: 'Architecture', href: '/divisions/architecture' },
      { label: 'Project Management', href: '/divisions/project-management' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Advertising & Branding', href: '/services#advertising-branding' },
      { label: 'Digital & Social', href: '/services#digital-social' },
      { label: 'Web & App', href: '/services#web-app' },
      { label: 'Media & OOH', href: '/services#media' },
      { label: 'Lead Generation', href: '/services#lead-generation' },
    ],
  },
];
