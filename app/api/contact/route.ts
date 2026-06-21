import { NextResponse } from 'next/server';
import { z } from 'zod';
import { contactSchema } from '@/lib/validation';
import { deliverLead } from '@/lib/leads';

const newsletterSchema = z.object({
  newsletter: z.literal(true),
  email: z.string().email(),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
  }

  // Newsletter signup path
  const newsletter = newsletterSchema.safeParse(body);
  if (newsletter.success) {
    await deliverLead({
      subject: 'New newsletter signup — bigadtruck.com',
      text: `Newsletter signup: ${newsletter.data.email}`,
      replyTo: newsletter.data.email,
    });
    return NextResponse.json({ ok: true });
  }

  // Contact form path
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'Validation failed.', issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  // Honeypot tripped — pretend success, drop silently.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const d = parsed.data;
  const text = [
    'New project enquiry — bigadtruck.com',
    '',
    `Name:    ${d.name}`,
    `Email:   ${d.email}`,
    `Phone:   ${d.phone}`,
    `Company: ${d.company || '—'}`,
    `Service: ${d.service}`,
    `Budget:  ${d.budget || '—'}`,
    '',
    'Message:',
    d.message,
  ].join('\n');

  const delivered = await deliverLead({
    subject: `New enquiry: ${d.name}${d.company ? ` (${d.company})` : ''}`,
    text,
    replyTo: d.email,
  });

  if (!delivered.ok) {
    return NextResponse.json(
      { ok: false, error: 'Could not send your message. Please email us directly.' },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
