/**
 * Portfolio case studies. Filterable on /work by industry & service, with a
 * detail template at /work/[slug]: challenge → contribution → decisions → outcome.
 * Replace the placeholder copy and imagery with real client work.
 */

export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  industry: string;
  service: string;
  division: string;
  year: string;
  summary: string;
  cover: string;
  hero: { value: string; label: string };
  challenge: string;
  contribution: string[];
  decisions: { title: string; body: string }[];
  outcomes: { value: string; label: string }[];
  gallery: { src: string; alt: string }[];
  featured?: boolean;
};

export const industriesFilter = [
  'All',
  'Education',
  'Automotive',
  'Real Estate',
  'Retail',
  'Infrastructure',
] as const;

export const servicesFilter = [
  'All',
  'Advertising',
  'Digital & Social',
  'Web & App',
  'Lead Generation',
  'Architecture',
  'DPR',
] as const;

export const caseStudies: CaseStudy[] = [
  {
    slug: 'metro-retail-relaunch',
    title: 'A retail brand relaunched in 90 days',
    client: 'Metro Retail Co.',
    industry: 'Retail',
    service: 'Advertising',
    division: 'Bigadtruck',
    year: '2025',
    summary:
      'Identity rebuild, headless e-commerce and a connected launch across Meta, Google and OOH — one team, one timeline.',
    cover: 'https://images.unsplash.com/photo-1601598851547-4302969d0614?w=1600&q=80&auto=format&fit=crop',
    hero: { value: '3.1x', label: 'Return on ad spend' },
    challenge:
      'A regional retail chain had grown faster than its brand. A dated identity, a slow website and disconnected agencies meant marketing spend leaked and the in-store experience never matched the ambition. They needed everything fixed — fast — before the festive season.',
    contribution: [
      'Rebuilt the brand identity, tone and in-store system from the ground up.',
      'Shipped a headless, mobile-first e-commerce site engineered for speed and conversion.',
      'Planned and ran a connected festive launch across Meta, Google Search and city OOH.',
      'Set up analytics and attribution so every rupee was tracked to a sale.',
    ],
    decisions: [
      { title: 'One team, not four', body: 'Brand, web and media sat in one room on one timeline — killing the hand-off delays that had cost previous campaigns.' },
      { title: 'Headless for speed', body: 'A headless build let us hit sub-2.5s loads on mobile, protecting ad spend and SEO at the same time.' },
      { title: 'Festive-first sequencing', body: 'We front-loaded OOH for awareness, then retargeted with performance media to harvest demand.' },
    ],
    outcomes: [
      { value: '3.1x', label: 'Return on ad spend' },
      { value: '−38%', label: 'Cost per acquisition' },
      { value: '+62%', label: 'Online revenue YoY' },
      { value: '90 days', label: 'Strategy to launch' },
    ],
    gallery: [
      { src: '/images/work/retail-relaunch.svg', alt: 'Retail brand identity system' },
      { src: '/images/work/gallery-a.svg', alt: 'E-commerce site on mobile' },
      { src: '/images/work/gallery-b.svg', alt: 'Outdoor hoarding campaign' },
    ],
    featured: true,
  },
  {
    slug: 'university-admissions-leadgen',
    title: 'University admissions, three states, one engine',
    client: 'Confidential University',
    industry: 'Education',
    service: 'Lead Generation',
    division: 'Buzzmore',
    year: '2025',
    summary:
      'A vernacular landing-page system and always-on lead media that captured and routed 42,000+ qualified enquiries to counsellors.',
    cover: 'https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=1600&q=80&auto=format&fit=crop',
    hero: { value: '42,000+', label: 'Qualified enquiries' },
    challenge:
      'A university wanted to grow admissions across three states without drowning its counsellors in junk enquiries. Previous campaigns generated volume but no quality, and leads went cold before anyone called back.',
    contribution: [
      'Built a multi-language landing-page system tuned for each region and programme.',
      'Ran always-on lead media across search, social and vernacular channels.',
      'Scored, de-duplicated and routed every enquiry to the right campus counsellor in real time.',
      'Reported on cost-per-qualified-lead and cost-per-admission, not vanity clicks.',
    ],
    decisions: [
      { title: 'Vernacular by default', body: 'Region-specific language and creative lifted form completion dramatically over a single English campaign.' },
      { title: 'Qualify before routing', body: 'Scoring filtered out tyre-kickers so counsellors only ever called genuinely interested students.' },
      { title: 'Speed-to-lead', body: 'Live routing meant counsellors reached hot enquiries within minutes, while intent was still high.' },
    ],
    outcomes: [
      { value: '42,000+', label: 'Qualified enquiries' },
      { value: '₹64', label: 'Cost per qualified lead' },
      { value: '3 states', label: 'Vernacular reach' },
      { value: '+27%', label: 'Enrolled admissions' },
    ],
    gallery: [
      { src: '/images/work/admissions.svg', alt: 'Admission campaign landing pages' },
      { src: '/images/work/gallery-c.svg', alt: 'Lead routing dashboard' },
      { src: '/images/work/gallery-a.svg', alt: 'Vernacular social creative' },
    ],
    featured: true,
  },
  {
    slug: 'dealership-always-on',
    title: 'Always-on social & WhatsApp for a dealership group',
    client: 'Automotive Dealership Group',
    industry: 'Automotive',
    service: 'Digital & Social',
    division: 'Buzzmore',
    year: '2025',
    summary:
      'Monthly social, reels, Meta ads and WhatsApp campaigns across multiple dealership locations — turning attention into booked showroom visits.',
    cover: 'https://images.unsplash.com/photo-1605152276979-6a07fc883a70?w=1600&q=80&auto=format&fit=crop',
    hero: { value: '−34%', label: 'Cost per enquiry' },
    challenge:
      'A multi-location automotive dealership group was posting inconsistently and buying ads with no clear line to showroom enquiries. They needed an always-on engine that produced content, ran paid and WhatsApp campaigns, and delivered trackable leads to each branch.',
    contribution: [
      'Took over monthly social content and short-form reels for every location.',
      'Planned and ran Meta and Facebook paid ads tuned to enquiries, not just reach.',
      'Sent approved WhatsApp bulk campaigns to opted-in audiences for offers and launches.',
      'Captured and routed every enquiry to the right branch, with reporting on cost-per-enquiry.',
    ],
    decisions: [
      { title: 'One calendar, every branch', body: 'A single monthly content plan kept all locations consistent while letting each run local offers.' },
      { title: 'WhatsApp for intent', body: 'Approved-template WhatsApp campaigns reached warm audiences directly, lifting response over ads alone.' },
      { title: 'Enquiry, not vanity', body: 'Every campaign was measured on booked showroom enquiries, so spend chased outcomes.' },
    ],
    outcomes: [
      { value: '−34%', label: 'Cost per enquiry' },
      { value: '5+', label: 'Dealership locations' },
      { value: '16+', label: 'Posts & reels / month' },
    ],
    gallery: [
      { src: '/images/work/dealership.svg', alt: 'Dealership social media creative' },
      { src: '/images/work/gallery-b.svg', alt: 'WhatsApp campaign templates' },
    ],
    featured: true,
  },
  {
    slug: 'proptech-portal',
    title: 'A property portal that sells off-plan',
    client: 'Skyline Developers',
    industry: 'Real Estate',
    service: 'Web & App',
    division: 'Bigadtruck',
    year: '2025',
    summary:
      'A fast, immersive property portal with 3D walkthroughs and integrated lead capture for a real-estate developer.',
    cover: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?w=1600&q=80&auto=format&fit=crop',
    hero: { value: '2.4x', label: 'Site enquiries' },
    challenge:
      'A developer was launching a flagship project but had only renders and a slow brochure-style site. They needed a portal that could sell units off-plan and feed sales-qualified leads to their team.',
    contribution: [
      'Designed and built a fast, immersive property portal.',
      'Integrated 3D walkthroughs and floor-plan explorers.',
      'Wired lead capture into the developer’s sales CRM.',
      'Optimized for mobile, speed and search visibility.',
    ],
    decisions: [
      { title: 'Show, don’t tell', body: 'Interactive 3D let buyers explore units before construction, building confidence to enquire.' },
      { title: 'Lead-ready from day one', body: 'Every page funnelled to a CRM-connected enquiry, so sales never lost a hot lead.' },
    ],
    outcomes: [
      { value: '2.4x', label: 'Site enquiries' },
      { value: '<2.5s', label: 'Mobile LCP' },
      { value: 'Pre-sales', label: 'Off-plan demand' },
    ],
    gallery: [
      { src: '/images/work/proptech.svg', alt: 'Property portal interface' },
      { src: '/images/work/gallery-c.svg', alt: '3D walkthrough view' },
    ],
  },
  {
    slug: 'mixed-use-visualization',
    title: 'A mixed-use scheme pre-sold off renders',
    client: 'Urban Spaces',
    industry: 'Real Estate',
    service: 'Architecture',
    division: 'Architectural Services',
    year: '2024',
    summary:
      'Photoreal 3D visualization and design documentation that let a developer market and pre-sell before ground-breaking.',
    cover: 'https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?w=1600&q=80&auto=format&fit=crop',
    hero: { value: 'Pre-sales', label: 'Created off-plan' },
    challenge:
      'A developer needed to generate demand and clear approvals for a mixed-use scheme — before any physical construction could begin.',
    contribution: [
      'Developed concept design, massing and site planning.',
      'Produced a 4K photoreal render set and walkthrough.',
      'Delivered approvals-ready design documentation.',
    ],
    decisions: [
      { title: 'Market with visualization', body: 'High-fidelity renders turned an idea into something buyers could believe in and reserve.' },
      { title: 'Documentation in parallel', body: 'Approvals documentation advanced alongside marketing, compressing the overall timeline.' },
    ],
    outcomes: [
      { value: '4K', label: 'Photoreal render set' },
      { value: 'Pre-sales', label: 'Off-plan demand created' },
      { value: 'Approved', label: 'Sanction-ready drawings' },
    ],
    gallery: [
      { src: '/images/work/architecture.svg', alt: 'Architectural visualization' },
      { src: '/images/work/gallery-b.svg', alt: 'Site master plan' },
    ],
  },
  {
    slug: 'infrastructure-dpr',
    title: 'An infrastructure DPR sanctioned first time',
    client: 'Regional Infrastructure Body',
    industry: 'Infrastructure',
    service: 'DPR',
    division: 'DPR Creation',
    year: '2024',
    summary:
      'A feasibility-backed, fully costed and compliant Detailed Project Report, packaged to the funding body’s exact norms.',
    cover: 'https://images.unsplash.com/photo-1529926691761-20fb82067c71?w=1600&q=80&auto=format&fit=crop',
    hero: { value: '1st', label: 'Submission sanctioned' },
    challenge:
      'An infrastructure body needed a bankable DPR to secure funding — and could not afford the delay of a re-submission cycle.',
    contribution: [
      'Conducted technical and financial feasibility studies.',
      'Built detailed cost estimates and a funding model.',
      'Compiled technical documentation and compliance.',
      'Packaged the report to the funding body’s norms.',
    ],
    decisions: [
      { title: 'Norms before narrative', body: 'We mapped the funding body’s checklist first, then built the report to satisfy every line.' },
      { title: 'One bankable model', body: 'A single, defensible financial model withstood scrutiny and avoided back-and-forth.' },
    ],
    outcomes: [
      { value: '1st', label: 'Submission sanctioned' },
      { value: '100%', label: 'Compliance met' },
      { value: '6 weeks', label: 'Brief to report' },
    ],
    gallery: [
      { src: '/images/work/dpr.svg', alt: 'Detailed Project Report documentation' },
      { src: '/images/work/gallery-a.svg', alt: 'Cost model spreadsheet' },
    ],
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
export const featuredCaseStudies = caseStudies.filter((c) => c.featured);
