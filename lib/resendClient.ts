import { Resend } from 'resend';

type SendParams = { to: string; subject: string; html: string; text?: string };

const resend =
  typeof process !== 'undefined' && process.env.RESEND_API_KEY
    ? new Resend(process.env.RESEND_API_KEY)
    : null;

export async function sendEmail({ to, subject, html, text }: SendParams) {
  if (!resend) {
    // Fallback Demo
    await new Promise((r) => setTimeout(r, 300));
    return { id: `demo_${Date.now()}`, to, subject, html, demo: true };
  }
  const from = process.env.EMAIL_FROM || 'kva@plattform-domain.de';
  const { data, error } = await resend.emails.send({
    from,
    to,
    subject,
    html,
    text
  });
  if (error) {
    throw error;
  }
  return { id: data?.id ?? `res_${Date.now()}`, to, subject, html, demo: false };
}


