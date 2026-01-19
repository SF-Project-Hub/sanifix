import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  try {
    const { readableId, uuid, status } = (await req.json()) as {
      readableId?: string;
      uuid?: string;
      status: 'draft' | 'in_bearbeitung' | 'erfolgreich' | 'abgelehnt';
    };
    // Demo ohne DB
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY || !process.env.SUPABASE_URL) {
      return NextResponse.json({ ok: true, demo: true });
    }
    const admin = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
    const idColumn = uuid ? 'id' : 'readable_id';
    const idValue = uuid ?? readableId;
    if (!idValue) {
      return NextResponse.json({ ok: false, error: 'MISSING_ID' }, { status: 400 });
    }
    const { data: kva, error: selErr } = await admin
      .from('kostenvoranschlaege')
      .select('id')
      .eq(idColumn, idValue)
      .single();
    if (selErr || !kva) {
      return NextResponse.json({ ok: false, error: 'NOT_FOUND' }, { status: 404 });
    }
    const { error: updErr } = await admin
      .from('kostenvoranschlaege')
      .update({ status })
      .eq('id', kva.id);
    if (updErr) throw updErr;
    await admin.from('status_history').insert({ kva_id: kva.id, status });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'UPDATE_FAILED' }, { status: 500 });
  }
}


