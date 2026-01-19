import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    // Erwartet: { patient, prescription, items[], comment?, email? }
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY || !process.env.SUPABASE_URL) {
      // In Demo ohne DB
      return NextResponse.json({ ok: true, demo: true, id: `KVA-${Date.now()}` });
    }
    const admin = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
    const { data: kvaRow, error: kvaErr } = await admin
      .from('kostenvoranschlaege')
      .insert({
        readable_id: `KVA-${Math.floor(Math.random() * 100000)}`,
        status: 'in_bearbeitung'
      })
      .select()
      .single();
    if (kvaErr) throw kvaErr;

    const items = (data.items ?? []).map((i: any) => ({
      kostenvoranschlag_id: kvaRow.id,
      catalog_item_id: i.catalogItemId ?? null,
      name: i.name,
      quantity: i.quantity,
      article_number: i.articleNumber ?? null,
      unit_price: i.unitPrice ?? 0,
      brand: i.brand ?? null
    }));
    if (items.length > 0) {
      await admin.from('items').insert(items);
    }
    await admin.from('status_history').insert({
      kva_id: kvaRow.id,
      status: 'in_bearbeitung'
    });
    return NextResponse.json({ ok: true, id: kvaRow.readable_id, uuid: kvaRow.id });
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'CREATE_FAILED' }, { status: 500 });
  }
}


