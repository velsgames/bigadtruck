/**
 * The five divisions of Bigadtruck Group. Each renders as a section on the
 * homepage / divisions index and as a full detail page at /divisions/[slug].
 */

export type Division = {
  slug: string;
  name: string;
  short: string;
  kicker: string;
  tagline: string;
  summary: string;
  accent: 'primary' | 'secondary';
  intro: string;
  capabilities: { title: string; description: string }[];
  process: { title: string; description: string }[];
  useCase: {
    title: string;
    body: string;
    metrics: { value: string; label: string }[];
  };
  image: string;
};

export const divisions: Division[] = [
  {
    slug: 'bigadtruck',
    name: 'Bigadtruck',
    short: 'Core — Advertising, Marketing & Technology',
    kicker: 'Division 01',
    tagline: 'The full load. Strategy, creative, media and technology under one roof.',
    summary:
      'Brand strategy, 360° digital, performance media, and web & app builds — everything a modern brand needs to move, in one team.',
    accent: 'primary',
    intro:
      'Bigadtruck Core is the engine of the group: a full-stack advertising, marketing and technology team that takes a brand from positioning to pixels to performance. No chasing separate photographers, printers, developers or media buyers — one crew carries the entire load and delivers it to every destination.',
    capabilities: [
      { title: 'Brand Strategy & Consulting', description: 'Positioning, naming, identity systems and go-to-market built on sharp market insight.' },
      { title: '360° Digital Marketing', description: 'Always-on campaigns across search, social, video and display with one connected plan.' },
      { title: 'Social Media Marketing', description: 'Content, community and creator partnerships that compound attention into demand.' },
      { title: 'SEO & Performance Ads', description: 'Technical SEO plus ROI-tuned Google, Meta and programmatic media buying.' },
      { title: 'Web & Mobile App Development', description: 'Fast, accessible websites, portals and apps engineered to convert and scale.' },
      { title: 'Software & IT Consulting', description: 'Architecture, integrations and automation for marketing and operations stacks.' },
      { title: 'E-commerce & Shopping Portals', description: 'Storefronts and marketplaces wired for catalogue, payments and fulfilment.' },
      { title: 'TV, Radio, Print & OOH', description: 'TVCs, radio spots, press, hoardings and collateral — produced and placed.' },
      { title: 'Events & Brand Promotions', description: 'Launches, activations, and movie & brand promotions that earn footfall.' },
    ],
    process: [
      { title: 'Discover', description: 'Audit the brand, market and audience to find the real lever.' },
      { title: 'Strategy', description: 'Set positioning, channel mix and measurable goals.' },
      { title: 'Create', description: 'Design, build and produce across every needed format.' },
      { title: 'Deliver', description: 'Ship campaigns, sites and media on a tight schedule.' },
      { title: 'Optimize', description: 'Read the data, double down on what works, cut what doesn’t.' },
    ],
    useCase: {
      title: 'A regional retail brand, rebuilt and relaunched in 90 days',
      body: 'We rebuilt the identity, shipped a headless e-commerce site, and ran a connected launch across Meta, Google and OOH. One team, one timeline, one accountable number.',
      metrics: [
        { value: '3.1x', label: 'Return on ad spend' },
        { value: '−38%', label: 'Cost per acquisition' },
        { value: '90 days', label: 'Strategy to launch' },
      ],
    },
    image: '/images/divisions/bigadtruck.svg',
  },
  {
    slug: 'buzzmore',
    name: 'Buzzmore Media',
    short: 'Digital Marketing & Lead Generation',
    kicker: 'Division 02',
    tagline: 'Always-on digital marketing and lead generation that fills the pipeline.',
    summary:
      'Social, reels, paid ads and WhatsApp campaigns — plus high-volume lead generation for education and automotive brands. Run out of Nagpur.',
    accent: 'secondary',
    intro:
      'Buzzmore Media is the group’s performance and social arm, based in Nagpur. We run the monthly content, paid media and messaging that keep brands visible — social posts and reels, Meta and Facebook ads, and WhatsApp campaigns — and we build the lead-generation engines that turn that attention into qualified enquiries: captured, scored and routed straight to the client.',
    capabilities: [
      { title: 'Social Media Management', description: 'Monthly on-brand posts and short-form reels, planned, produced and published.' },
      { title: 'Meta & Facebook Paid Ads', description: 'Performance campaigns tuned to reach, enquiries and return on ad spend.' },
      { title: 'WhatsApp Bulk Marketing', description: 'Growth-plan campaigns to opted-in audiences using approved templates.' },
      { title: 'Lead-Generation Campaigns', description: 'Landing pages, forms and media tuned for cost-per-qualified-lead.' },
      { title: 'Admission & Enquiry Lead-Gen', description: 'Education campaigns that capture, qualify and route admission enquiries live.' },
      { title: 'Retainers & Consultancy', description: 'End-to-end social-media handling, plus business and management consultancy.' },
    ],
    process: [
      { title: 'Plan', description: 'Set the audience, channels, monthly calendar and campaign goals.' },
      { title: 'Create', description: 'Produce on-brand posts, reels and ad creative.' },
      { title: 'Launch', description: 'Publish content and run paid and WhatsApp campaigns.' },
      { title: 'Qualify', description: 'Capture, score and route every enquiry to the client.' },
      { title: 'Report', description: 'Measure reach, leads and cost-per-result, then optimise.' },
    ],
    useCase: {
      title: 'Always-on social and lead media for a dealership group',
      body: 'Across a multi-location automotive dealership group we run monthly social content and reels, Meta paid ads and WhatsApp campaigns — turning attention into booked showroom visits and qualified enquiries routed to each branch.',
      metrics: [
        { value: '5+', label: 'Dealership locations' },
        { value: '16+', label: 'Posts & reels / month' },
        { value: '−34%', label: 'Cost per enquiry' },
      ],
    },
    image: '/images/divisions/buzzmore.svg',
  },
  {
    slug: 'dpr',
    name: 'DPR Creation',
    short: 'Detailed Project Reports',
    kicker: 'Division 03',
    tagline: 'Bankable Detailed Project Reports that get projects approved and funded.',
    summary:
      'Feasibility, cost estimation, technical documentation and compliance for infrastructure, government and private projects.',
    accent: 'primary',
    intro:
      'DPR Creation prepares bankable Detailed Project Reports for infrastructure, government and private projects. From feasibility and demand assessment to cost estimation, technical documentation and regulatory compliance — we produce the rigorous, fundable reports that move projects from idea to sanction.',
    capabilities: [
      { title: 'Feasibility & Demand Studies', description: 'Technical, financial and market feasibility to test viability early.' },
      { title: 'Cost Estimation & BOQ', description: 'Detailed cost estimates, bills of quantities and financial models.' },
      { title: 'Technical Documentation', description: 'Engineering drawings, specifications and project rationale.' },
      { title: 'Regulatory Compliance', description: 'Alignment with scheme guidelines, statutory norms and approval bodies.' },
      { title: 'Financial Structuring', description: 'Funding models, viability gap analysis and return projections.' },
      { title: 'Submission Support', description: 'Bank- and department-ready packaging with revision support.' },
    ],
    process: [
      { title: 'Assess', description: 'Study the site, demand and objectives.' },
      { title: 'Model', description: 'Build the technical and financial case.' },
      { title: 'Document', description: 'Compile drawings, costs and compliance.' },
      { title: 'Review', description: 'Quality-check against scheme and bank norms.' },
      { title: 'Submit', description: 'Deliver a sanction-ready report with support.' },
    ],
    useCase: {
      title: 'An infrastructure DPR sanctioned on first submission',
      body: 'We delivered a feasibility-backed, fully costed and compliant report packaged to the funding body’s exact norms — approved without a re-submission cycle.',
      metrics: [
        { value: '1st', label: 'Submission sanctioned' },
        { value: '100%', label: 'Compliance checklist met' },
        { value: '6 weeks', label: 'Brief to bankable report' },
      ],
    },
    image: '/images/divisions/dpr.svg',
  },
  {
    slug: 'architecture',
    name: 'Architectural Services',
    short: 'Architecture, Planning & 3D',
    kicker: 'Division 04',
    tagline: 'Architecture, planning and 3D visualization for projects worth building.',
    summary:
      'Architecture, site planning, 3D visualization and design documentation for built projects of every scale.',
    accent: 'secondary',
    intro:
      'Our Architectural Services division designs and documents built projects — from concept and site planning to photoreal 3D visualization and construction-ready documentation. Visual-led and detail-driven, we help clients see, refine and approve a project before a single brick is laid.',
    capabilities: [
      { title: 'Architectural Design', description: 'Concept-to-detail design for residential, commercial and institutional projects.' },
      { title: 'Site & Master Planning', description: 'Layouts, zoning and circulation that make the most of every site.' },
      { title: '3D Visualization', description: 'Photoreal renders and walkthroughs that sell the vision.' },
      { title: 'Design Documentation', description: 'Drawing sets, specifications and approvals-ready packages.' },
      { title: 'Interior & Experience Design', description: 'Spatial and material design tuned to brand and budget.' },
      { title: 'Approvals Coordination', description: 'Documentation aligned to sanctioning authority requirements.' },
    ],
    process: [
      { title: 'Brief', description: 'Understand site, programme and aspiration.' },
      { title: 'Concept', description: 'Develop massing, planning and visual direction.' },
      { title: 'Visualize', description: 'Produce 3D renders and walkthroughs.' },
      { title: 'Detail', description: 'Document for approvals and construction.' },
      { title: 'Support', description: 'Coordinate through sanction and delivery.' },
    ],
    useCase: {
      title: 'A mixed-use scheme approved and pre-sold off renders',
      body: 'Our 3D visualization let the client market the project before ground-breaking — generating pre-sales while the design documentation cleared approvals.',
      metrics: [
        { value: '4K', label: 'Photoreal render set' },
        { value: 'Pre-sales', label: 'Off-plan demand created' },
        { value: 'Approved', label: 'Sanction-ready drawings' },
      ],
    },
    image: '/images/divisions/architecture.svg',
  },
  {
    slug: 'project-management',
    name: 'Project Management',
    short: 'Delivery & PMC',
    kicker: 'Division 05',
    tagline: 'End-to-end project management that gets it delivered, on time and on budget.',
    summary:
      'Project management and PMC that coordinate every vertical above into a single, accountable delivery.',
    accent: 'primary',
    intro:
      'Project Management is the discipline that ties the group together. We provide end-to-end project management and PMC (Project Management Consultancy) across advertising, technology, infrastructure and built projects — one accountable owner keeping scope, schedule, budget and quality on track from kick-off to handover.',
    capabilities: [
      { title: 'End-to-End Delivery', description: 'A single owner for scope, timeline, budget and quality.' },
      { title: 'PMC (Project Management Consultancy)', description: 'Independent oversight and coordination for complex projects.' },
      { title: 'Vendor & Stakeholder Coordination', description: 'One point of contact across every contractor and partner.' },
      { title: 'Schedule & Cost Control', description: 'Plans, milestones and budgets tracked and protected.' },
      { title: 'Quality & Risk Management', description: 'Standards, reviews and proactive risk mitigation.' },
      { title: 'Reporting & Governance', description: 'Clear dashboards and decisions for every stakeholder.' },
    ],
    process: [
      { title: 'Initiate', description: 'Define scope, success criteria and governance.' },
      { title: 'Plan', description: 'Build schedule, budget and resourcing.' },
      { title: 'Execute', description: 'Coordinate teams and vendors to plan.' },
      { title: 'Control', description: 'Track, report and manage risk continuously.' },
      { title: 'Close', description: 'Hand over, review and capture learnings.' },
    ],
    useCase: {
      title: 'A multi-vendor campaign and build, delivered as one programme',
      body: 'Brand, web, media and on-ground activation ran on a single integrated plan — no finger-pointing, no slipped dates, one weekly number for the client.',
      metrics: [
        { value: 'On time', label: 'Every milestone met' },
        { value: 'On budget', label: 'Zero scope overrun' },
        { value: '1 owner', label: 'Single accountable lead' },
      ],
    },
    image: '/images/divisions/project-management.svg',
  },
];

export const getDivision = (slug: string) => divisions.find((d) => d.slug === slug);
