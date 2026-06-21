import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { z } from 'zod';
import { deliverLead } from '@/lib/leads';
import { site, contact } from '@/content/site';

export const runtime = 'nodejs';
export const maxDuration = 30;

const MODEL = 'claude-opus-4-8';

const chatSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string().min(1).max(4000),
      }),
    )
    .min(1)
    .max(40),
});

const SYSTEM = `You are "Truck", the smart assistant on the website of ${site.name} — a 360° advertising, marketing and technology agency in Pune & Mumbai (Buzzmore Media arm in Nagpur). Founder & CEO: ${site.founder.fullName}. ${site.foundedYear} founded; ${site.industriesServed} industries served.

Divisions: Bigadtruck (advertising, marketing & tech — branding, digital & social, web & app, media/OOH, lead generation), Buzzmore Media (government media & high-volume lead generation), DPR Creation (bankable Detailed Project Reports), Architectural Services (architecture, planning & 3D), Project Management (end-to-end delivery / PMC).

How you behave:
- Be warm, concise and genuinely helpful. Answer questions about services, divisions, process, industries, locations and how the agency works. Keep replies short (2–4 sentences) and skimmable.
- The goal is to help the visitor AND, when they show real interest in working together, capture their details as a lead.
- When the visitor wants a quote, a callback, or to start a project, collect: their name, an email or phone number, and a one-line description of what they need. Once you have a name, at least one contact method, and what they need, call the submit_lead tool. Don't interrogate — gather details naturally across the conversation.
- After submit_lead succeeds, confirm warmly that the team (it reaches ${contact.email}) will be in touch, and mention they can also call/WhatsApp ${contact.phoneDisplay} for anything urgent.
- Never invent client names, case studies, prices or specific results. If asked for exact pricing, explain it's scoped per project and offer to capture their brief so the team can quote. If you don't know, say so and point them to ${contact.email}.
- Pricing model: by scope and outcome, not hours. Offices: Pune (HQ) & Mumbai; Buzzmore from Nagpur.`;

const submitLeadTool: Anthropic.Tool = {
  name: 'submit_lead',
  description:
    'Send the visitor\'s enquiry to the Bigadtruck team. Call this only once you have the visitor\'s name, at least one contact method (email or phone), and a short description of what they need.',
  input_schema: {
    type: 'object',
    properties: {
      name: { type: 'string', description: "The visitor's name." },
      email: { type: 'string', description: "The visitor's email, if given." },
      phone: { type: 'string', description: "The visitor's phone or WhatsApp number, if given." },
      company: { type: 'string', description: 'Company or organisation, if mentioned.' },
      service: {
        type: 'string',
        description: 'Which service/division they are interested in, if clear.',
      },
      message: {
        type: 'string',
        description: 'A concise summary of what the visitor needs, in their words.',
      },
    },
    required: ['name', 'message'],
  },
};

type LeadInput = {
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
};

async function handleSubmitLead(input: LeadInput): Promise<string> {
  if (!input.email && !input.phone) {
    return 'NOT_SENT: need at least an email or phone number before submitting.';
  }
  const text = [
    'New enquiry via the website AI assistant (Truck) — bigadtruck.com',
    '',
    `Name:    ${input.name}`,
    `Email:   ${input.email || '—'}`,
    `Phone:   ${input.phone || '—'}`,
    `Company: ${input.company || '—'}`,
    `Service: ${input.service || '—'}`,
    '',
    'What they need:',
    input.message,
  ].join('\n');

  const delivered = await deliverLead({
    subject: `AI assistant lead: ${input.name}${input.company ? ` (${input.company})` : ''}`,
    text,
    replyTo: input.email,
  });
  return delivered.ok
    ? 'SENT: the enquiry reached the team. Confirm warmly to the visitor.'
    : 'NOT_SENT: delivery failed — apologise and point the visitor to vivek@bigadtruck.com.';
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
  }

  const parsed = chatSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'Invalid messages.' }, { status: 422 });
  }

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    // Graceful fallback — assistant isn't configured yet, but never leave the visitor stuck.
    return NextResponse.json({
      ok: true,
      reply:
        `Thanks for reaching out! Our AI assistant isn't switched on just yet — but the team would love to help. ` +
        `Drop us a line at ${contact.email} or WhatsApp/call ${contact.phoneDisplay}, or use the contact form and we'll get right back to you.`,
      leadCaptured: false,
    });
  }

  const client = new Anthropic({ apiKey: key });
  const messages: Anthropic.MessageParam[] = parsed.data.messages.map((m) => ({
    role: m.role,
    content: m.content,
  }));

  let leadCaptured = false;

  try {
    // Manual tool loop — short by design (a lead capture is one tool round-trip).
    for (let i = 0; i < 4; i++) {
      const response = await client.messages.create({
        model: MODEL,
        max_tokens: 1024,
        system: SYSTEM,
        tools: [submitLeadTool],
        messages,
      });

      if (response.stop_reason === 'tool_use') {
        messages.push({ role: 'assistant', content: response.content });
        const results: Anthropic.ToolResultBlockParam[] = [];
        for (const block of response.content) {
          if (block.type === 'tool_use' && block.name === 'submit_lead') {
            const result = await handleSubmitLead(block.input as LeadInput);
            if (result.startsWith('SENT')) leadCaptured = true;
            results.push({ type: 'tool_result', tool_use_id: block.id, content: result });
          }
        }
        messages.push({ role: 'user', content: results });
        continue;
      }

      const reply = response.content
        .filter((b): b is Anthropic.TextBlock => b.type === 'text')
        .map((b) => b.text)
        .join('\n')
        .trim();

      return NextResponse.json({
        ok: true,
        reply: reply || 'Sorry — could you rephrase that?',
        leadCaptured,
      });
    }

    return NextResponse.json({
      ok: true,
      reply: `Thanks! Our team will follow up. You can also reach us at ${contact.email}.`,
      leadCaptured,
    });
  } catch (err) {
    console.error('[chat] error:', err);
    return NextResponse.json(
      {
        ok: true,
        reply: `Sorry — I hit a snag. Please email ${contact.email} or call ${contact.phoneDisplay} and the team will help right away.`,
        leadCaptured: false,
      },
      { status: 200 },
    );
  }
}
