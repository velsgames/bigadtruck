import { NextResponse } from 'next/server';
import { z } from 'zod';
import { contactSchema } from '@/lib/validation';

const TO = process.env.CONTACT_TO_EMAIL || 'vivek@bigadtruck.com';
const FROM = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev';

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
    await deliver({
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

  const delivered = await deliver({
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

/**
 * Sends via Resend when RESEND_API_KEY is set; otherwise logs to the server
 * console so local development works without any email provider configured.
 */
async function deliver({
  subject,
  text,
  replyTo,
}: {
  subject: string;
  text: string;
  replyTo?: string;
}): Promise<{ ok: boolean }> {
  const key = process.env.RESEND_API_KEY;

  if (!key) {
    // Dev stub — no provider configured.
    console.info('\n📨 [contact] Email delivery stubbed (no RESEND_API_KEY).');
    console.info(`To: ${TO}\nReply-To: ${replyTo}\nSubject: ${subject}\n\n${text}\n`);
    return { ok: true };
  }

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(key);
    const { error } = await resend.emails.send({
      from: `Bigadtruck Website <${FROM}>`,
      to: [TO],
      subject,
      text,
      replyTo,
    });
    if (error) {
      console.error('[contact] Resend error:', error);
      return { ok: false };
    }
    return { ok: true };
  } catch (err) {
    console.error('[contact] Email send failed:', err);
    return { ok: false };
  }
}
