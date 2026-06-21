import { site, contact } from '@/content/site';

/**
 * Keyless, automatic assistant engine. Answers common questions from the
 * agency's own knowledge and runs a lead-capture flow — no external API, no
 * key, no per-message cost. (When ANTHROPIC_API_KEY is set, /api/chat uses
 * Claude instead; this is the always-available default.)
 */

export type ChatMsg = { role: 'user' | 'assistant'; content: string };

export type LeadDraft = {
  name?: string;
  email?: string;
  phone?: string;
  need: string;
};

export type EngineResult = {
  reply: string;
  /** Set on the turn a lead is completed, so the route can email it. */
  submit?: { name: string; email?: string; phone?: string; message: string };
};

const EMAIL_RE = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i;
const PHONE_CANDIDATE = /\+?\d[\d\s-]{6,}\d/g;

/**
 * Extract a plausible phone number — 10–13 digits, and not a numeric range like
 * "10000 - 50000" (spaced dash), which would otherwise look like a phone.
 */
function extractPhone(text: string): string | undefined {
  for (const m of text.matchAll(PHONE_CANDIDATE)) {
    const raw = m[0];
    const digits = raw.replace(/\D/g, '');
    if (digits.length >= 10 && digits.length <= 13 && !/\d\s-\s\d/.test(raw)) return raw.trim();
  }
  return undefined;
}

// Marker placed in the completion reply so we can tell a lead was already sent.
const DONE_MARKER = 'passed your details to the team';
// Marker the engine uses to recognise its own "what's your name" prompt.
const ASK_NAME = "Happy to help. First — what's your name?";
const ASK_CONTACT = "the best email or phone number";
const ASK_NEED = 'a sentence or two about what you need';

function wa(text: string) {
  return `${contact.whatsappHref}?text=${encodeURIComponent(text)}`;
}

const norm = (s: string) => s.toLowerCase();
const has = (s: string, ...words: string[]) => words.some((w) => s.includes(w));

/** Strong signals the visitor wants to engage (not just ask a question). */
function isLeadIntent(s: string): boolean {
  return (
    has(
      s,
      'quote',
      'pricing for',
      'price for',
      'get a proposal',
      'proposal',
      'hire',
      'work with you',
      'start a project',
      'start project',
      'get started',
      'call me',
      'callback',
      'call back',
      'reach out',
      'contact me',
      'talk to a human',
      'talk to someone',
      'talk to the team',
      'speak to',
      'i want to',
      'i need a',
      'i need help with',
      'looking for',
      'build me',
      'interested in working',
    ) || /\bquote\b/.test(s)
  );
}

/** Knowledge answers. First match wins. */
function knowledgeReply(s: string): string | null {
  if (has(s, 'hi', 'hello', 'hey', 'good morning', 'good evening') && s.length < 25)
    return `Hi! I'm Truck, the ${site.name} assistant. I can tell you about our services, divisions, process or locations — or get the right team on your project. What can I help with?`;

  if (has(s, 'service', 'what do you do', 'what do you offer', 'capabilit', 'help with'))
    return `We're a 360° agency — one team for the whole load:\n• Advertising & branding\n• Digital marketing & social\n• Web & app development\n• Media — TV, radio, print & OOH\n• Lead generation campaigns\n• DPR Creation, Architecture & Project Management\nWant a quote on any of these? Just say the word.`;

  if (has(s, 'web', 'website', 'app', 'application', 'portal', 'ecommerce', 'e-commerce'))
    return `Yes — we design and build fast, conversion-focused websites, web apps and portals (incl. e-commerce). Want a quote? Tell me a bit about your project.`;

  if (has(s, 'social', 'instagram', 'facebook', 'reel', 'content', 'smm', 'digital marketing'))
    return `We run always-on social and performance marketing — content, reels, paid social & search, and reporting tied to real enquiries. Want us to take a look at your goals?`;

  if (has(s, 'brand', 'logo', 'identity', 'advertis', 'campaign'))
    return `We build brands end-to-end: positioning, identity systems, campaigns and guidelines. Want to start a brand project?`;

  if (has(s, 'lead', 'enquir', 'whatsapp marketing', 'performance'))
    return `Lead generation is a core strength — landing-page systems, paid media and WhatsApp campaigns, scored and routed so your team only gets quality enquiries. Want a quote?`;

  if (has(s, 'media', 'ooh', 'hoarding', 'outdoor', 'tv', 'radio', 'print', 'newspaper'))
    return `We plan and buy media across TV, radio, print and OOH/outdoor, integrated with digital. Tell me your campaign and city and we'll scope it.`;

  if (has(s, 'government', 'govt', 'gem', 'public sector', 'buzzmore'))
    return `Government & public-sector media and high-volume lead generation run through our Buzzmore Media arm (Nagpur) — GeM ecosystem, public-awareness campaigns and more.`;

  if (has(s, 'dpr', 'detailed project report', 'feasibility'))
    return `Our DPR Creation division produces bankable Detailed Project Reports — feasibility, costing, technical docs and compliance, packaged to the funding body's norms.`;

  if (has(s, 'architect', '3d', 'planning', 'render', 'visualization', 'visualisation'))
    return `Architectural Services covers architecture, site planning and photoreal 3D visualization — useful for approvals and pre-selling off-plan.`;

  if (has(s, 'project management', 'pmc', 'delivery'))
    return `Project Management / PMC handles end-to-end delivery — keeping scope, timeline and quality on track from brief to handover.`;

  if (has(s, 'price', 'pricing', 'cost', 'charge', 'budget', 'rate', 'how much'))
    return `We price by scope and outcome, not hours — we scope the work, agree a fixed plan and a measurable goal, then deliver against it. Share your project and I'll get the team to put together a quote.`;

  if (has(s, 'location', 'office', 'where are you', 'based', 'address', 'city', 'pune', 'mumbai', 'nagpur'))
    return `We operate from Pune (HQ) and Mumbai, with our Buzzmore arm in Nagpur — and we serve clients across India.`;

  if (has(s, 'contact', 'email', 'phone', 'number', 'call', 'reach'))
    return `You can reach us at ${contact.email} or call/WhatsApp ${contact.phoneDisplay}. Want me to take your details so the right person calls you back?`;

  if (has(s, 'process', 'how do you work', 'how it works', 'steps', 'approach'))
    return `Our process: Discover → Strategy → Create → Deliver → Optimize. One accountable team carries it the whole way. Want to kick off step one with a quick brief?`;

  if (has(s, 'industर', 'industry', 'industries', 'sector', 'who do you work'))
    return `We've delivered across ${site.industriesServed} industries — education, real estate, automotive, retail, healthcare, manufacturing, government, infrastructure and more.`;

  if (has(s, 'about', 'who are you', 'founder', 'ceo', 'company', 'how old', 'years', 'experience'))
    return `${site.name} is a 360° advertising, marketing & technology agency (founded ${site.foundedYear}, ${site.yearsLabel} experience), led by ${site.founder.fullName}. One roof for strategy, creative, media, web and delivery.`;

  if (has(s, 'career', 'job', 'hiring', 'work for you', 'internship', 'vacancy'))
    return `For careers, see the Careers page or email ${contact.email} with your portfolio — we're always glad to meet good people.`;

  if (has(s, 'thank', 'thanks', 'cheers', 'great', 'awesome', 'bye'))
    return `Happy to help! Anything else I can do — or shall I get the team onto your project?`;

  return null;
}

// --- lead state derived from the conversation history ---

function lastAssistant(messages: ChatMsg[], i: number): string | null {
  for (let j = i - 1; j >= 0; j--) if (messages[j].role === 'assistant') return messages[j].content;
  return null;
}

function deriveLead(messages: ChatMsg[]): LeadDraft & { complete: boolean } {
  const users = messages.filter((m) => m.role === 'user');
  const allUserText = users.map((m) => m.content).join('\n');

  const email = allUserText.match(EMAIL_RE)?.[0];
  const phone = extractPhone(allUserText);

  // name = the user reply that directly followed our name prompt
  let name: string | undefined;
  let need = '';
  for (let i = 0; i < messages.length; i++) {
    if (messages[i].role !== 'user') continue;
    const prev = lastAssistant(messages, i) || '';
    const val = messages[i].content.trim();
    if (!name && prev.includes(ASK_NAME) && !EMAIL_RE.test(val) && !extractPhone(val)) {
      name = val.replace(/^(i am|i'm|im|my name is|this is)\s+/i, '').split(/[.,\n]/)[0].slice(0, 60);
    }
    if (!need && prev.includes(ASK_NEED)) need = val.slice(0, 500);
  }

  const complete = Boolean(name && (email || phone) && need);
  return { name, email, phone, need, complete };
}

export function generateReply(messages: ChatMsg[]): EngineResult {
  const last = messages[messages.length - 1];
  const text = norm(last?.content || '');

  const priorAssistant = messages
    .slice(0, -1)
    .filter((m) => m.role === 'assistant')
    .map((m) => m.content)
    .join('\n');
  const alreadySubmitted = priorAssistant.includes(DONE_MARKER);

  // Are we mid lead-capture? Either the visitor asked to engage, gave contact
  // details, or we're already part-way through the questions.
  const inLeadFlow =
    !alreadySubmitted &&
    (isLeadIntent(text) ||
      EMAIL_RE.test(last?.content || '') ||
      Boolean(extractPhone(last?.content || '')) ||
      priorAssistant.includes(ASK_NAME) ||
      priorAssistant.includes(ASK_CONTACT) ||
      priorAssistant.includes(ASK_NEED));

  if (inLeadFlow) {
    const lead = deriveLead(messages);

    if (!lead.name) return { reply: ASK_NAME };
    if (!lead.email && !lead.phone)
      return { reply: `Thanks, ${lead.name}! What's ${ASK_CONTACT} to reach you?` };
    if (!lead.need)
      return { reply: `Great. Now ${ASK_NEED} — what are you looking to do?` };

    // All gathered — confirm + hand off.
    const summary = [
      `New enquiry via the website assistant`,
      `Name: ${lead.name}`,
      lead.email ? `Email: ${lead.email}` : '',
      lead.phone ? `Phone: ${lead.phone}` : '',
      `Needs: ${lead.need}`,
    ]
      .filter(Boolean)
      .join('\n');

    const reply =
      `Perfect — I've ${DONE_MARKER} and they'll reach out shortly. ` +
      `For anything urgent you can also message us directly here: ${wa(summary)}`;

    return {
      reply,
      submit: { name: lead.name!, email: lead.email, phone: lead.phone, message: lead.need },
    };
  }

  // Not engaging yet — answer the question.
  const known = knowledgeReply(text);
  if (known) return { reply: known };

  return {
    reply:
      `I can help with our services (branding, digital & social, web & app, media, lead generation), ` +
      `divisions (Buzzmore, DPR, Architecture, Project Management), pricing approach, process and locations. ` +
      `Ask me anything — or tell me what you're working on and I'll get the team on it. ` +
      `Prefer to talk now? ${contact.email} · ${contact.phoneDisplay}.`,
  };
}
