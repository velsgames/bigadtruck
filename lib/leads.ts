import 'server-only';

/**
 * Lead delivery. Sends via Resend when RESEND_API_KEY is set; otherwise logs to
 * the server console so local development works with no email provider. Used by
 * both the contact form (/api/contact) and the AI assistant (/api/chat) so every
 * enquiry reaches the same inbox.
 */

export const LEAD_TO = process.env.CONTACT_TO_EMAIL || 'vivek@bigadtruck.com';
const LEAD_FROM = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev';

export async function deliverLead({
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
    console.info('\n📨 [lead] Email delivery stubbed (no RESEND_API_KEY).');
    console.info(`To: ${LEAD_TO}\nReply-To: ${replyTo}\nSubject: ${subject}\n\n${text}\n`);
    return { ok: true };
  }

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(key);
    const { error } = await resend.emails.send({
      from: `Bigadtruck Website <${LEAD_FROM}>`,
      to: [LEAD_TO],
      subject,
      text,
      replyTo,
    });
    if (error) {
      console.error('[lead] Resend error:', error);
      return { ok: false };
    }
    return { ok: true };
  } catch (err) {
    console.error('[lead] Email send failed:', err);
    return { ok: false };
  }
}
