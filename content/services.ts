/**
 * Services taxonomy. Rendered as a bento/expandable grid on /services and
 * summarized on the homepage. Anchors (id) are linked from the navbar mega-menu.
 */

export type Service = {
  id: string;
  title: string;
  blurb: string;
  deliverables: string[];
  outcomes: string;
  span?: 'wide' | 'tall' | 'normal';
};

export const services: Service[] = [
  {
    id: 'advertising-branding',
    title: 'Advertising & Branding',
    blurb: 'Positioning, identity and campaigns that make a brand impossible to ignore.',
    deliverables: ['Brand strategy & positioning', 'Logo & identity systems', 'Campaign concepts', 'Brand guidelines'],
    outcomes: 'A sharper brand that commands attention and premium pricing.',
    span: 'wide',
  },
  {
    id: 'digital-social',
    title: 'Digital Marketing & Social',
    blurb: 'Always-on content and performance media across every channel.',
    deliverables: ['Social content & community', 'Paid social & search', 'Influencer & creator', 'Analytics & reporting'],
    outcomes: 'Compounding reach and a steady pipeline of qualified demand.',
    span: 'tall',
  },
  {
    id: 'web-app',
    title: 'Web & App Development',
    blurb: 'Fast, accessible websites, portals and mobile apps built to convert.',
    deliverables: ['Websites & landing pages', 'Web & mobile apps', 'E-commerce portals', 'Headless & API builds'],
    outcomes: 'Digital products that load fast, rank well and drive action.',
  },
  {
    id: 'software-it',
    title: 'Software / IT Consulting',
    blurb: 'Architecture, integrations and automation for marketing and operations.',
    deliverables: ['Systems architecture', 'API integrations', 'Marketing automation', 'IT consulting'],
    outcomes: 'Connected stacks that remove manual work and unlock data.',
  },
  {
    id: 'media',
    title: 'Media — TV, Radio, Print, OOH',
    blurb: 'TVCs, radio, press, hoardings and electronic media — produced and placed.',
    deliverables: ['TV commercials', 'Radio spots', 'Print & press', 'OOH & hoardings'],
    outcomes: 'Mass reach where your audience actually spends attention.',
    span: 'wide',
  },
  {
    id: 'social-whatsapp',
    title: 'Social & WhatsApp Marketing',
    blurb: 'Buzzmore-led social, reels, paid ads and WhatsApp campaigns that stay always-on.',
    deliverables: ['Social posts & reels', 'Meta & Facebook ads', 'WhatsApp bulk campaigns', 'Social media retainers'],
    outcomes: 'Always-on visibility that turns attention into enquiries.',
  },
  {
    id: 'lead-generation',
    title: 'Lead Generation Campaigns',
    blurb: 'High-volume enquiry engines, including admission lead-gen for institutions.',
    deliverables: ['Landing-page systems', 'Form & tracking setup', 'Qualification & scoring', 'CRM routing'],
    outcomes: 'Qualified leads delivered live at a predictable cost.',
    span: 'tall',
  },
  {
    id: 'dpr',
    title: 'DPR Creation',
    blurb: 'Bankable Detailed Project Reports: feasibility to compliance.',
    deliverables: ['Feasibility studies', 'Cost estimation & BOQ', 'Technical documentation', 'Compliance & submission'],
    outcomes: 'Sanction-ready reports that get projects funded.',
  },
  {
    id: 'architecture',
    title: 'Architectural Services',
    blurb: 'Architecture, planning, 3D visualization and design documentation.',
    deliverables: ['Architectural design', 'Site & master planning', '3D visualization', 'Approvals documentation'],
    outcomes: 'See, refine and approve a project before you build it.',
  },
  {
    id: 'project-management',
    title: 'Project Management',
    blurb: 'End-to-end project management and PMC across every vertical.',
    deliverables: ['Delivery management', 'PMC & oversight', 'Schedule & cost control', 'Governance & reporting'],
    outcomes: 'On time, on budget, with one accountable owner.',
  },
  {
    id: 'events-promotions',
    title: 'Events & Promotions',
    blurb: 'Launches, activations, and movie & brand promotions that earn footfall.',
    deliverables: ['Launch events', 'On-ground activations', 'Movie & brand promotions', 'Experiential design'],
    outcomes: 'Memorable moments that convert crowds into customers.',
  },
  {
    id: 'print-collateral',
    title: 'Print & Collateral',
    blurb: 'Banners, brochures and collateral, designed and produced in-house.',
    deliverables: ['Brochures & catalogues', 'Banners & signage', 'Packaging', 'Print production'],
    outcomes: 'Consistent, high-quality collateral with nothing outsourced.',
  },
];
