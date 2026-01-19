import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/resendClient';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { kvaId, to, subject, html, text, tone, length } = body as {
      kvaId?: string;
      to: string;
      subject: string;
      html: string;
      text?: string;
      tone?: 'formal' | 'neutral' | 'locker';
      length?: 'kurz' | 'mittel' | 'lang';
    };
    // Live oder Demo (abhängig von RESEND_API_KEY)
    const res = await sendEmail({ to, subject, html, text });

    // Log in DB (wenn SUPABASE_* Keys gesetzt)
    try {
      if (process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.SUPABASE_URL) {
        const admin = createClient(
          process.env.SUPABASE_URL,
          process.env.SUPABASE_SERVICE_ROLE_KEY
        );
        await admin.from('emails').insert({
          kva_id: kvaId ?? null,
          to_email: to,
          subject,
          body: text ?? html,
          demo: res.demo ?? false,
          from_email: process.env.EMAIL_FROM ?? null,
          tone: tone ?? null,
          length: length ?? null
        });
      }
    } catch {
      // optional best effort
    }

    return NextResponse.json({ ok: true, id: res.id });
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'SEND_FAILED' }, { status: 500 });
  }
}


