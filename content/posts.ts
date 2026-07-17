/**
 * Insights / blog articles. Original editorial in the Bigadtruck voice on
 * advertising, digital, media and marketing technology — plus the occasional
 * case-study breakdown. Rendered at /blog (listing) and /blog/[slug] (article).
 *
 * These are the typed seed articles; when Sanity is configured they can be
 * edited at /studio (see the `post` schema). Edit copy here, not the components.
 *
 * Rich article elements:
 *  - `summary`   — a "short version" / key-takeaways box shown near the top.
 *  - body `stats`  — an infographic row of figures (framework/directional — not
 *                    fabricated research; keep numbers honest).
 *  - body `callout`— a highlighted "bottom line" note.
 */

export type PostBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'quote'; text: string; cite?: string }
  | { type: 'stats'; caption?: string; items: { value: string; label: string }[] }
  | { type: 'callout'; title?: string; text: string }
  | { type: 'table'; caption?: string; headers: string[]; rows: string[][] };

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
  /** Key takeaways shown as a "short version" box near the top. */
  summary?: string[];
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
    summary: [
      'OOH is unskippable reach — the opposite of scroll-past digital.',
      'Pune & Mumbai’s long, predictable commutes are built for repeat exposure.',
      'Modern OOH is measurable: route modelling, QR/vanity URLs, geo-retargeting and footfall lift.',
      'Brief the route first, keep one idea and one action, and wire a response channel.',
    ],
    body: [
      {
        type: 'p',
        text: 'Digital advertising promised perfect targeting. What it also delivered was an arms race for attention that most brands are quietly losing — ad blockers, scroll-past reflexes, and a cost-per-thousand that climbs every quarter. Out-of-home (OOH) sits outside that fight. You cannot skip a hoarding on FC Road, mute a wrapped bus in Andheri, or close the tab on a mobile ad truck parked outside a launch venue.',
      },
      {
        type: 'stats',
        caption: 'The OOH plan at a glance',
        items: [
          { value: '2', label: 'Core markets — Pune & Mumbai' },
          { value: '3', label: 'Format layers: fixed, transit, mobile' },
          { value: '1', label: 'Measurement layer, wired to digital' },
        ],
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
      {
        type: 'table',
        caption: 'OOH format layers — what each is best for',
        headers: ['Format', 'Best for', 'How to measure it'],
        rows: [
          ['Hoardings & gantries', 'Always-on presence on key corridors', 'Route impression modelling, brand-lift'],
          ['Transit (bus / auto / cab)', 'City-wide reach and frequency', 'Coverage mapping, QR/vanity URLs'],
          ['Transit shelters & malls', 'Dwell-time, premium context', 'Footfall lift near sites'],
          ['Mobile ad trucks', 'Targeted, event- and area-specific hits', 'Geo-fenced retargeting, on-site response'],
        ],
      },
      { type: 'h2', text: 'The old objection: “but you cannot measure it”' },
      {
        type: 'p',
        text: 'That is no longer true. Modern OOH plans are measured — with route-level impression modelling, QR and vanity-URL response tracking, geo-fenced retargeting of people who passed a site, and store-level footfall lift studies. Treat OOH as the awareness engine and digital as the response layer, wire the two together, and you can attribute the lift rather than guess at it.',
      },
      { type: 'h2', text: 'The measurement toolkit' },
      {
        type: 'ul',
        items: [
          'Route & impression modelling — estimate real reach and frequency by site and daypart.',
          'QR codes & vanity URLs — give every site a trackable other end.',
          'Geo-fenced retargeting — serve digital ads to devices that passed your sites.',
          'Footfall lift studies — measure store visits near active sites vs control areas.',
          'Brand-lift surveys — test recall and consideration before and after the burst.',
        ],
      },
      {
        type: 'quote',
        text: 'The best OOH campaigns are not a billboard and a hope. They are a route plan, a creative built for three seconds of attention, and a digital layer that catches the demand the hoarding created.',
      },
      { type: 'h2', text: 'How to brief it well' },
      {
        type: 'p',
        text: 'Start with the route, not the artwork. Decide where your audience physically is, then design for the format and the distance. Keep the message to one idea and one action. Pair every site with a way to respond — a short URL, a WhatsApp number, a QR code — so the campaign has a measurable other end.',
      },
      {
        type: 'callout',
        title: 'The bottom line',
        text: 'Do that, and out-of-home stops being a brand-vanity line item and becomes one of the most efficient reach buys on the plan.',
      },
    ],
  },
  {
    slug: 'whatsapp-performance-marketing-india-2026',
    title: 'The 2026 playbook for WhatsApp and performance marketing in India',
    excerpt:
      'With hundreds of millions of users in India, WhatsApp is where intent turns into conversation. A practical framework for turning clicks into qualified leads — without burning the trust of the channel.',
    category: 'Digital',
    date: '2026-06-15',
    readMins: 7,
    author: 'Bigadtruck Editorial',
    cover: '/images/blog/whatsapp-marketing.svg',
    tags: ['WhatsApp', 'Lead generation', 'Performance marketing'],
    featured: true,
    summary: [
      'For most Indian audiences, WhatsApp is the default way to talk to a business.',
      'Click-to-WhatsApp removes the two biggest funnel leaks: the landing page and the form.',
      'Design the conversation — qualify fast, route instantly, follow up on-channel, respect consent.',
      'Measure cost-per-qualified-lead and cost-per-booking, not cost-per-click.',
    ],
    body: [
      {
        type: 'p',
        text: 'For most Indian audiences, WhatsApp is not an app — it is the default way to talk to a business. That makes it the highest-intent channel most brands still underuse. The winning move in 2026 is not more ad spend; it is connecting the ad to a conversation the moment interest is highest.',
      },
      {
        type: 'stats',
        caption: 'Why click-to-WhatsApp converts',
        items: [
          { value: '0', label: 'Landing pages or forms needed' },
          { value: '3', label: 'Messages to qualify a lead' },
          { value: '1', label: 'Trusted channel your buyer already checks' },
        ],
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
        type: 'table',
        caption: 'Funnel leak: landing-page + form vs click-to-WhatsApp',
        headers: ['Step', 'Ad → landing page → form', 'Ad → WhatsApp chat'],
        rows: [
          ['First touch', 'Cold page load, more to read', 'Mid-conversation, with context'],
          ['Friction', 'Form fields, trust barrier', 'A channel they already use'],
          ['Drop-off points', 'Page, form, thank-you', 'Far fewer'],
          ['Follow-up', 'Email — often unread', 'On-channel, high open rate'],
          ['Best metric', 'Cost per form fill', 'Cost per qualified lead / booking'],
        ],
      },
      {
        type: 'quote',
        text: 'Performance marketing used to end at the click. On WhatsApp it ends at a booked appointment — if you design the conversation as carefully as the creative.',
        cite: 'Bigadtruck lead-generation team',
      },
      { type: 'h2', text: 'A simple qualification flow' },
      {
        type: 'ul',
        items: [
          'Message 1 — greet and ask what they need, in one line.',
          'Message 2 — capture name and city; confirm intent.',
          'Message 3 — offer the next step (callback, quote, booking) and route hot leads to a human.',
          'After: a short, spaced follow-up sequence — helpful, never spammy.',
        ],
      },
      { type: 'h2', text: 'Measure what actually matters' },
      {
        type: 'p',
        text: 'Cost-per-click is a vanity metric on this channel. Track cost-per-qualified-lead and cost-per-booking instead, tie every conversation back to the campaign that started it, and feed those signals back into targeting. That feedback loop — ad to conversation to outcome and back — is what separates a WhatsApp campaign that scales from one that just spends.',
      },
      {
        type: 'callout',
        title: 'The bottom line',
        text: 'Treat the chat as the funnel, not the click. The brands that design the conversation win the channel.',
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
    summary: [
      'AI creates leverage on the mechanical work — variation, optimisation, production speed, insight at scale.',
      'It is a brilliant intern and a poor strategist: taste, culture and “what not to make” stay human.',
      'The winning setup is machines for scale, experienced people at the two ends.',
    ],
    body: [
      {
        type: 'p',
        text: 'The loudest question in every marketing meeting right now is some version of “can AI do this?”. Increasingly, the answer is yes — for the mechanical parts. The more useful question is where AI creates leverage and where it quietly destroys value.',
      },
      {
        type: 'stats',
        caption: 'Where the line sits',
        items: [
          { value: 'Dozens', label: 'Creative variants to test, not one' },
          { value: 'Minutes', label: 'Brief to first-draft assets' },
          { value: '2', label: 'Human ends: strategy + the final call' },
        ],
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
        type: 'table',
        caption: 'Who owns what — machines vs people',
        headers: ['Task', 'AI does', 'Human owns'],
        rows: [
          ['Creative variants', 'Generate and resize at scale', 'The core idea and the brand line'],
          ['Media buying', 'Adjust bids in real time', 'The strategy and the guardrails'],
          ['Copy', 'First drafts, alternatives', 'Voice, nuance, final call'],
          ['Insight', 'Read thousands of comments', 'What it means and what to do'],
          ['Localisation', 'Rough translation', 'Cultural judgement, taste'],
        ],
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
    summary: [
      'A bankable DPR gets read, trusted and approved — a weak one stalls for months.',
      'Reviewers check realistic demand, costing that holds, stress-tested cash flow, named risk and mapped compliance.',
      'Rigour is speed: a strong report shortens approvals and strengthens your position.',
    ],
    body: [
      {
        type: 'p',
        text: 'A Detailed Project Report (DPR) is the document that turns an idea into a fundable project. A weak one stalls in review for months; a bankable one gets read, trusted and approved. The difference is rarely the ambition of the project — it is the rigour of the report.',
      },
      {
        type: 'stats',
        caption: 'What a bankable DPR proves',
        items: [
          { value: '5', label: 'Checks reviewers actually run' },
          { value: '1', label: 'Model that survives a bad quarter' },
          { value: 'Faster', label: 'Approval cycle when it holds up' },
        ],
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
        type: 'table',
        caption: 'What sinks a DPR vs what makes it bankable',
        headers: ['Section', 'Weak (stalls in review)', 'Bankable (gets approved)'],
        rows: [
          ['Demand', 'Optimistic, unsourced', 'Evidence-based, with sensitivity analysis'],
          ['Costing', 'Round numbers, hidden gaps', 'Line-item, current rates, contingencies stated'],
          ['Cash flow', 'Works only if all goes well', 'Survives late revenue and cost overruns'],
          ['Risk', 'Glossed over', 'Named honestly, each with a mitigation'],
          ['Compliance', 'Discovered late', 'Mapped up front'],
        ],
      },
      {
        type: 'quote',
        text: 'Lenders do not fund optimism. They fund a report that has already asked the hard questions and answered them.',
      },
      { type: 'h2', text: 'A pre-submission checklist' },
      {
        type: 'ul',
        items: [
          'Every major number is traceable to a source or a stated assumption.',
          'A sensitivity analysis shows what happens if demand or cost misses.',
          'Contingencies are explicit, not buried.',
          'Each key risk has a named owner and a mitigation.',
          'All clearances and approvals are listed with their status.',
        ],
      },
      { type: 'h2', text: 'Why it pays to get it right the first time' },
      {
        type: 'p',
        text: 'A bankable DPR is not paperwork — it is speed. It shortens the approval cycle, strengthens your negotiating position, and signals to every stakeholder that the project is run by people who did the work. Whether it is infrastructure, real estate or a public-sector scheme, the report is the first impression the money sees. Make it a good one.',
      },
    ],
  },
  {
    slug: 'regional-language-advertising-india',
    title: 'Regional-language creative is India’s most underused growth lever',
    excerpt:
      'Most brands still run English-first creative and translate as an afterthought. In a country that thinks in a dozen languages, that leaves the biggest audiences — and the best CPMs — on the table.',
    category: 'Advertising',
    date: '2026-07-07',
    readMins: 6,
    author: 'Bigadtruck Editorial',
    cover: '/images/blog/ooh-advertising.svg',
    tags: ['Regional', 'Creative', 'India', 'Media'],
    summary: [
      'Most of India consumes content in a language other than English.',
      'Translation is not localisation — the idea itself has to be built in-language.',
      'Regional inventory is often cheaper and less contested than English/Hindi.',
      'Start with one high-value language, build native creative, then scale.',
    ],
    body: [
      {
        type: 'p',
        text: 'Walk through any Indian city and the signage tells you the truth: people live, shop and scroll in their own language. Yet most brand campaigns are still conceived in English, approved in English, and only then handed to a translator. The result is creative that is technically correct and emotionally flat — a message that reaches the audience but never quite lands.',
      },
      {
        type: 'stats',
        caption: 'Why regional creative pays',
        items: [
          { value: '1st', label: 'Language the audience actually thinks in' },
          { value: '↓', label: 'Often lower CPMs than English/Hindi inventory' },
          { value: '↑', label: 'Higher recall when the idea is native, not translated' },
        ],
      },
      { type: 'h2', text: 'Translation is not localisation' },
      {
        type: 'p',
        text: 'A translated tagline carries the words but drops the wordplay, the reference, the joke that would have made someone smile and remember. Real localisation starts earlier: the insight, the hook and the humour are built in the language from the first draft. Sometimes that means a completely different idea for each market — and that is the point. You are not selling the same ad in five languages; you are having the right conversation in each one.',
      },
      { type: 'h2', text: 'Where the efficiency hides' },
      {
        type: 'ul',
        items: [
          'Regional digital and OOH inventory is frequently less contested — the same rupee buys more attention.',
          'Regional creators command real trust in their communities, often at a fraction of a national celebrity’s fee.',
          'Native creative earns organic shares that translated creative rarely does.',
        ],
      },
      {
        type: 'table',
        caption: 'Translated vs built-in-language — what changes',
        headers: ['Dimension', 'English-first, then translated', 'Vernacular-first (native)'],
        rows: [
          ['The idea', 'One idea, reworded per market', 'The best idea for each market'],
          ['Tone', 'Often stiff or literal', 'Natural, colloquial, shareable'],
          ['Cultural references', 'Usually lost', 'Built in from the start'],
          ['Media cost', 'Premium English/Hindi inventory', 'Often lower, less contested'],
          ['Creator fit', 'National faces', 'Trusted regional voices'],
          ['Typical outcome', 'Reaches, rarely resonates', 'Higher recall and organic reach'],
        ],
      },
      {
        type: 'quote',
        text: 'You do not win a market by shouting your message louder in a language it does not think in. You win by speaking first, in the language it dreams in.',
      },
      { type: 'h2', text: 'A simple prioritisation model' },
      {
        type: 'p',
        text: 'You cannot do every language at once, and you should not try. Rank your target languages on three questions: where is demand already showing up, where is the media cost most favourable, and where do you have — or can find — credible creators to make native work. The language that scores well on all three is where you start. This keeps the first move small, measurable and defensible to a finance team that wants proof before scale.',
      },
      {
        type: 'ul',
        items: [
          'Demand signal: existing sales, search interest, or enquiries from that language region.',
          'Media efficiency: comparative CPMs and competition on regional inventory.',
          'Creative supply: creators and writers who can build native — not translated — work.',
        ],
      },
      { type: 'h2', text: 'The mistakes that quietly waste the budget' },
      {
        type: 'ul',
        items: [
          'Machine-translating a national script and calling it localisation.',
          'Using the same national celebrity everywhere and losing regional trust.',
          'Running regional creative with no regional response channel to capture the demand.',
          'Judging a new-language test on week-one numbers instead of giving it a fair run.',
        ],
      },
      { type: 'h2', text: 'How to start without boiling the ocean' },
      {
        type: 'p',
        text: 'Pick one high-value language where you already have demand, and build genuinely native creative for it — not a translation, an original. Measure it against your English/Hindi control on the metrics that matter: engaged reach, cost per qualified lead, and recall. When it wins, you have both the confidence and the template to scale to the next language. Do that a few times and regional stops being a checkbox and becomes your cheapest, most durable source of growth.',
      },
      {
        type: 'callout',
        title: 'The bottom line',
        text: 'India is not one audience that happens to speak English. It is many audiences, each waiting for a brand that bothers to speak first, in their language.',
      },
    ],
  },
  {
    slug: 'micro-influencers-vs-celebrities-india',
    title: 'Micro-influencers vs celebrities: the math most Indian brands get wrong',
    excerpt:
      'A celebrity buys you reach and a headline. A network of trusted micro-creators often buys you something harder to fake — belief. Here is how to think about the trade, not just the fee.',
    category: 'Digital',
    date: '2026-07-07',
    readMins: 6,
    author: 'Bigadtruck Editorial',
    cover: '/images/blog/whatsapp-marketing.svg',
    tags: ['Influencer', 'Social', 'Creators', 'India'],
    summary: [
      'Celebrities buy reach and instant credibility; micro-creators buy trust and niche fit.',
      'Judge creators on engaged, relevant audience — not follower count.',
      'A spread of micro-creators de-risks a campaign a single face cannot.',
      'Match the tool to the job: awareness spike vs sustained belief.',
    ],
    body: [
      {
        type: 'p',
        text: 'The reflex, when the budget is big enough, is to sign a famous face. It is a clean story for the boardroom and it does buy something real: mass reach and a borrowed halo. But a lot of Indian brands stop the analysis there — at the fee and the follower count — and miss the more useful question: what are you actually trying to buy?',
      },
      {
        type: 'stats',
        caption: 'What each actually buys',
        items: [
          { value: 'Reach', label: 'Celebrity — scale and a headline' },
          { value: 'Trust', label: 'Micro-creator — niche belief and fit' },
          { value: 'Spread', label: 'Many creators — de-risked, always-on' },
        ],
      },
      { type: 'h2', text: 'Follower count is the wrong number' },
      {
        type: 'p',
        text: 'A creator with 30,000 genuinely engaged followers in a specific city or interest can move more real behaviour than a star with millions of passive ones. The metric that matters is not audience size — it is engaged, relevant audience. Before you look at reach, look at the comments: are they real people asking real questions, or a wall of emojis?',
      },
      { type: 'h2', text: 'Why a spread beats a single bet' },
      {
        type: 'ul',
        items: [
          'One face is one point of failure — a bad news cycle takes your whole campaign with it.',
          'Twenty micro-creators produce twenty native takes on your message, in twenty communities.',
          'You learn faster: some creators will outperform, and you double down on what works.',
        ],
      },
      {
        type: 'table',
        caption: 'Celebrity vs micro-creator — how to think about the trade',
        headers: ['Factor', 'Celebrity', 'Micro-creator network'],
        rows: [
          ['Primary value', 'Reach & instant credibility', 'Trust & niche fit'],
          ['Audience', 'Massive, broad, often passive', 'Smaller, specific, highly engaged'],
          ['Cost model', 'High flat fee', 'Lower fees, many creators'],
          ['Risk', 'Single point of failure', 'Spread across many'],
          ['Best for', 'National awareness spike', 'Durable belief, considered buys'],
          ['Content', 'One polished asset', 'Many native, varied takes'],
        ],
      },
      {
        type: 'quote',
        text: 'A celebrity makes people aware of you. The right micro-creator makes their community believe you. Awareness is rented; belief compounds.',
      },
      { type: 'h2', text: 'How to vet a creator in five minutes' },
      {
        type: 'p',
        text: 'Before you sign anyone, look past the follower number and read the signals that actually predict performance. A quick, disciplined check saves most of the money brands waste on the wrong creators.',
      },
      {
        type: 'ul',
        items: [
          'Comments quality: real questions and conversation, not a wall of emojis or bot replies.',
          'Audience fit: are their followers your buyers, in your cities, in your language?',
          'Consistency: do they post regularly, or only when paid?',
          'Past brand work: did it feel native to their voice, or like a pasted-in ad?',
          'Save/share behaviour: content people save and share beats content they scroll past.',
        ],
      },
      { type: 'h2', text: 'So which one?' },
      {
        type: 'p',
        text: 'Match the tool to the job. Launching something that needs a national awareness spike in a week? A celebrity earns its fee. Building durable trust in specific communities, or selling a considered purchase? A network of well-chosen micro-creators usually returns more per rupee — and keeps returning after the campaign ends.',
      },
      {
        type: 'callout',
        title: 'The bottom line',
        text: 'Do not buy a face because it is famous. Buy the outcome you need — reach or belief — and pick the creator, big or small, who actually delivers it.',
      },
    ],
  },
  {
    slug: 'trends-shaping-indian-advertising-now',
    title: 'The shifts reshaping Indian advertising right now',
    excerpt:
      'Not fads — the structural changes quietly rewriting how brands buy attention in India: AI in the creative pipeline, retail media, connected TV, vernacular-first, and the privacy reset. What each means for your plan.',
    category: 'Media',
    date: '2026-07-07',
    readMins: 7,
    author: 'Bigadtruck Editorial',
    cover: '/images/blog/ai-advertising.svg',
    tags: ['Trends', 'Media', 'AI', 'India'],
    featured: true,
    summary: [
      'AI has moved from novelty to the everyday creative and media pipeline.',
      'Retail media and connected TV are becoming core line items, not experiments.',
      'Vernacular-first is where the next audiences (and cheaper attention) are.',
      'Privacy changes make first-party data and consented channels the safe ground.',
    ],
    body: [
      {
        type: 'p',
        text: 'It is easy to confuse noise with change. Every quarter brings a new platform feature and a new buzzword. But underneath the noise, a handful of structural shifts are genuinely rewriting how brands win attention in India — and they are worth planning around, not chasing.',
      },
      {
        type: 'stats',
        caption: 'Five shifts to plan around',
        items: [
          { value: 'AI', label: 'From novelty to everyday pipeline' },
          { value: 'Retail', label: 'Media networks as a core buy' },
          { value: 'CTV', label: 'Connected TV joins the plan' },
        ],
      },
      { type: 'h2', text: '1. AI is now in the pipeline, not on the poster' },
      {
        type: 'p',
        text: 'The interesting use of AI is no longer a one-off stunt — it is the quiet plumbing. Teams use it to generate and test more creative variants, to draft and resize at speed, and to optimise media in near real time. The winners are not the ones who use AI the most; they are the ones who keep human judgement on strategy and taste while letting AI take the grind.',
      },
      { type: 'h2', text: '2. Retail media and commerce-led attention' },
      {
        type: 'p',
        text: 'Some of the most valuable ad inventory now sits next to the buy button — on marketplaces, quick-commerce apps and retailer platforms, where intent is highest. Treating retail media as a core line item, wired to your performance goals, is fast becoming table stakes rather than an experiment.',
      },
      { type: 'h2', text: '3. Connected TV blurs brand and performance' },
      {
        type: 'p',
        text: 'As viewing shifts to streaming, connected TV gives brands big-screen impact with digital-style targeting and measurement. It is where a brand story can be told at scale and still be accountable — closing the old gap between a TV spot and a trackable outcome.',
      },
      { type: 'h2', text: '4. Vernacular-first, not English-translated' },
      {
        type: 'ul',
        items: [
          'The next wave of audiences consumes in regional languages first.',
          'Native creative — built in-language — outperforms translated creative.',
          'Regional inventory and creators often deliver cheaper, more trusted attention.',
        ],
      },
      { type: 'h2', text: '5. The privacy reset rewards first-party data' },
      {
        type: 'p',
        text: 'As tracking tightens, the brands that thrive are the ones that own their relationship with the customer — first-party data, consented channels like WhatsApp, and content people choose to engage with. Borrowed audiences are getting harder to reach; owned ones compound.',
      },
      {
        type: 'table',
        caption: 'The five shifts — what each means and what to do',
        headers: ['Shift', 'What it means', 'What to do now'],
        rows: [
          ['AI in the pipeline', 'Everyday creative & media plumbing', 'Automate the grind, keep humans on strategy'],
          ['Retail media', 'Ad space next to the buy button', 'Make it a core, measured line item'],
          ['Connected TV', 'Big-screen story + digital targeting', 'Tell brand stories you can still track'],
          ['Vernacular-first', 'Growth in regional languages', 'Build native creative, not translations'],
          ['Privacy reset', 'Tracking tightens', 'Own first-party data & consented channels'],
        ],
      },
      { type: 'h2', text: 'How to sequence them (don’t do all five at once)' },
      {
        type: 'p',
        text: 'Trying to act on every shift in one quarter is how budgets get thin and nothing gets proven. Sequence instead. Start with the two that touch your current weakest link — usually measurement (first-party data) and efficiency (AI in the workflow). Layer retail media where you already sell, add connected TV when you have a brand story worth the screen, and build vernacular capability as an ongoing muscle rather than a one-off test.',
      },
      {
        type: 'ul',
        items: [
          'Quarter 1: fix measurement (first-party data) and put AI into the creative/media workflow.',
          'Quarter 2: turn on retail media where intent is highest and add native regional creative.',
          'Quarter 3: bring in connected TV for accountable brand storytelling.',
        ],
      },
      {
        type: 'quote',
        text: 'The brands that win the next few years will not be the ones that adopted every trend. They will be the ones that read which shifts were structural — and built for those.',
      },
      {
        type: 'callout',
        title: 'The bottom line',
        text: 'Treat these five as the board you are playing on, not options on a menu. Build AI into the workflow, put money where intent is, tell stories on the big screen, speak in-language, and own your data. That is a plan, not a trend chase.',
      },
    ],
  },
];
