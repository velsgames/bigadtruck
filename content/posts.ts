/**
 * Insights / blog articles. Original editorial in the Bigadtruck voice on
 * advertising, digital, media and marketing technology — plus the occasional
 * case-study breakdown. Rendered at /blog (listing) and /blog/[slug] (article).
 *
 * These are the typed seed articles; when Sanity is configured they can be
 * edited at /studio (see the `post` schema). Edit copy here, not the components.
 */

export type PostBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'quote'; text: string; cite?: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: 'Advertising' | 'Digital' | 'Technology' | 'Media' | 'Insights';
  date: string; // ISO YYYY-MM-DD
  readMins: number;
  author: string;
  cover: string;
  tags: string[];
  body: PostBlock[];
  featured?: boolean;
};

export const postCategories = [
  'All',
  'Advertising',
  'Digital',
  'Technology',
  'Media',
  'Insights',
] as const;

export const posts: Post[] = [
  {
    slug: 'ooh-advertising-pune-mumbai-2026',
    title: 'Why out-of-home advertising still outperforms in Pune & Mumbai',
    excerpt:
      'Feeds are skippable; a 40-foot truck on the Mumbai–Pune Expressway is not. Here is why smart brands are putting OOH back at the centre of the media plan — and how to make it measurable.',
    category: 'Advertising',
    date: '2026-06-28',
    readMins: 6,
    author: 'Bigadtruck Editorial',
    cover: '/images/blog/ooh-advertising.svg',
    tags: ['OOH', 'Media planning', 'Pune', 'Mumbai'],
    featured: true,
    body: [
      {
        type: 'p',
        text: 'Digital advertising promised perfect targeting. What it also delivered was an arms race for attention that most brands are quietly losing — ad blockers, scroll-past reflexes, and a cost-per-thousand that climbs every quarter. Out-of-home (OOH) sits outside that fight. You cannot skip a hoarding on FC Road, mute a wrapped bus in Andheri, or close the tab on a mobile ad truck parked outside a launch venue.',
      },
      { type: 'h2', text: 'Unskippable reach in the two markets that matter' },
      {
        type: 'p',
        text: 'Pune and Mumbai are among the densest media markets in the country, and commute time here is long and predictable. That is exactly the condition OOH is built for: repeated, unavoidable exposure to the same audience along the same routes, day after day. For a launch, a poll campaign, or a regional retail push, that repetition builds recall faster than a fragmented digital-only plan.',
      },
      {
        type: 'ul',
        items: [
          'Fixed media — hoardings, gantries, transit shelters — for always-on presence on high-footfall corridors.',
          'Transit media — buses, autos, cabs — to carry a message across a whole city, not just one junction.',
          'Mobile ad trucks — the format we were named for — to put a full-motion, full-scale ad exactly where the audience is, when it matters.',
        ],
      },
      { type: 'h2', text: 'The old objection: “but you cannot measure it”' },
      {
        type: 'p',
        text: 'That is no longer true. Modern OOH plans are measured — with route-level impression modelling, QR and vanity-URL response tracking, geo-fenced retargeting of people who passed a site, and store-level footfall lift studies. Treat OOH as the awareness engine and digital as the response layer, wire the two together, and you can attribute the lift rather than guess at it.',
      },
      {
        type: 'quote',
        text: 'The best OOH campaigns are not a billboard and a hope. They are a route plan, a creative built for three seconds of attention, and a digital layer that catches the demand the hoarding created.',
      },
      { type: 'h2', text: 'How to brief it well' },
      {
        type: 'p',
        text: 'Start with the route, not the artwork. Decide where your audience physically is, then design for the format and the distance. Keep the message to one idea and one action. Pair every site with a way to respond — a short URL, a WhatsApp number, a QR code — so the campaign has a measurable other end. Do that, and out-of-home stops being a brand-vanity line item and starts being one of the most efficient reach buys on the plan.',
      },
    ],
  },
  {
    slug: 'whatsapp-performance-marketing-india-2026',
    title: 'The 2026 playbook for WhatsApp and performance marketing in India',
    excerpt:
      'With over half a billion users in India, WhatsApp is where intent turns into conversation. A practical framework for turning clicks into qualified leads — without burning the trust of the channel.',
    category: 'Digital',
    date: '2026-06-15',
    readMins: 7,
    author: 'Bigadtruck Editorial',
    cover: '/images/blog/whatsapp-marketing.svg',
    tags: ['WhatsApp', 'Lead generation', 'Performance marketing'],
    featured: true,
    body: [
      {
        type: 'p',
        text: 'For most Indian audiences, WhatsApp is not an app — it is the default way to talk to a business. That makes it the highest-intent channel most brands still underuse. The winning move in 2026 is not more ad spend; it is connecting the ad to a conversation the moment interest is highest.',
      },
      { type: 'h2', text: 'Click-to-WhatsApp is the shortest path to a lead' },
      {
        type: 'p',
        text: 'A Meta ad that opens a WhatsApp chat removes the two biggest leaks in a funnel: the landing page and the form. The prospect lands mid-conversation, with context, on a channel they already trust and check constantly. For considered purchases — property, admissions, automotive, services — that shift alone lifts qualified-lead rates.',
      },
      { type: 'h2', text: 'Build the flow, not just the ad' },
      {
        type: 'ul',
        items: [
          'Qualify fast: a short, human-sounding opener that captures name, need and city in the first three messages.',
          'Route instantly: hot leads to a human, everyone else to a structured flow so nobody waits.',
          'Follow up on the channel: reminders and answers over WhatsApp convert far better than email that goes unread.',
          'Respect consent: opt-in language, easy opt-out, and no spam — the channel punishes brands that abuse it.',
        ],
      },
      {
        type: 'quote',
        text: 'Performance marketing used to end at the click. On WhatsApp it ends at a booked appointment — if you design the conversation as carefully as the creative.',
        cite: 'Bigadtruck lead-generation team',
      },
      { type: 'h2', text: 'Measure what actually matters' },
      {
        type: 'p',
        text: 'Cost-per-click is a vanity metric on this channel. Track cost-per-qualified-lead and cost-per-booking instead, tie every conversation back to the campaign that started it, and feed those signals back into targeting. That feedback loop — ad to conversation to outcome and back — is what separates a WhatsApp campaign that scales from one that just spends.',
      },
    ],
  },
  {
    slug: 'ai-reshaping-ad-creative-media-buying',
    title: 'How AI is reshaping ad creative and media buying — and what stays human',
    excerpt:
      'Generative tools now draft copy, cut variants and optimise bids in real time. The agencies that win are not the ones that use AI the most — they are the ones that know which decisions to keep human.',
    category: 'Technology',
    date: '2026-05-30',
    readMins: 6,
    author: 'Bigadtruck Editorial',
    cover: '/images/blog/ai-advertising.svg',
    tags: ['AI', 'Creative', 'Programmatic', 'MarTech'],
    body: [
      {
        type: 'p',
        text: 'The loudest question in every marketing meeting right now is some version of “can AI do this?”. Increasingly, the answer is yes — for the mechanical parts. The more useful question is where AI creates leverage and where it quietly destroys value.',
      },
      { type: 'h2', text: 'Where AI is already earning its keep' },
      {
        type: 'ul',
        items: [
          'Volume and variation: generating dozens of headline, caption and thumbnail variants to test, instead of guessing at one.',
          'Media optimisation: adjusting bids and budgets across platforms faster than any human desk could.',
          'Production speed: rough cuts, resizes and first-draft copy in minutes, freeing people for the hard 20%.',
          'Insight at scale: reading thousands of comments or reviews to surface what an audience actually cares about.',
        ],
      },
      { type: 'h2', text: 'Where it still needs a human hand' },
      {
        type: 'p',
        text: 'AI is a brilliant intern and a poor strategist. It does not know your brand’s line in the sand, cannot feel when a joke lands wrong for a local audience, and will confidently optimise toward the wrong goal if you point it there. Strategy, taste, cultural judgement, and the decision of what not to make — those stay human.',
      },
      {
        type: 'quote',
        text: 'AI lowers the cost of making things. That makes judgement — knowing what is worth making — the scarce, valuable skill.',
      },
      { type: 'h2', text: 'The practical setup' },
      {
        type: 'p',
        text: 'Use AI to widen the top of the creative funnel and to run the optimisation grind, then put experienced people at the two ends: the strategy that sets direction and the final call that protects the brand. That is the model we run internally — machines for scale, people for judgement — and it ships better work faster than either could alone.',
      },
    ],
  },
  {
    slug: 'what-makes-a-dpr-bankable',
    title: 'What makes a DPR bankable: a practical checklist',
    excerpt:
      'A Detailed Project Report is only as good as the decision it unlocks. What lenders and authorities actually look for before they say yes — from the team that writes them.',
    category: 'Insights',
    date: '2026-05-12',
    readMins: 5,
    author: 'Bigadtruck Editorial',
    cover: '/images/blog/dpr-bankable.svg',
    tags: ['DPR', 'Infrastructure', 'Project finance'],
    body: [
      {
        type: 'p',
        text: 'A Detailed Project Report (DPR) is the document that turns an idea into a fundable project. A weak one stalls in review for months; a bankable one gets read, trusted and approved. The difference is rarely the ambition of the project — it is the rigour of the report.',
      },
      { type: 'h2', text: 'What reviewers actually check' },
      {
        type: 'ul',
        items: [
          'Realistic demand: assumptions grounded in evidence, not optimism — with sensitivity analysis for when they miss.',
          'Costing that holds: line-item estimates that match current market rates, with contingencies stated, not hidden.',
          'Cash flow that survives stress: a financial model that still works if revenue is late or costs run over.',
          'Risk named honestly: the risks that could sink the project, and a credible plan for each one.',
          'Compliance mapped: clearances, approvals and statutory requirements identified up front, not discovered late.',
        ],
      },
      {
        type: 'quote',
        text: 'Lenders do not fund optimism. They fund a report that has already asked the hard questions and answered them.',
      },
      { type: 'h2', text: 'Why it pays to get it right the first time' },
      {
        type: 'p',
        text: 'A bankable DPR is not paperwork — it is speed. It shortens the approval cycle, strengthens your negotiating position, and signals to every stakeholder that the project is run by people who did the work. Whether it is infrastructure, real estate or a public-sector scheme, the report is the first impression the money sees. Make it a good one.',
      },
    ],
  },
];
