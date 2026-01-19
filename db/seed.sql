-- Demo-Daten (MVP, idempotent: nutzt upsert via unique name/email, falls Unique-Constraints ergänzt werden)
-- Kassen
insert into public.kassen (id, name, email) values
  (gen_random_uuid(), 'Barmer', 'kva@barmer.example'),
  (gen_random_uuid(), 'TK', 'kva@tk.example'),
  (gen_random_uuid(), 'DAK', 'kva@dak.example'),
  (gen_random_uuid(), 'AOK Bayern', 'kva@aokbayern.example'),
  (gen_random_uuid(), 'AOK Nordwest', 'kva@aoknw.example');

-- Beispielpatienten
do $$
declare i int;
begin
  -- konkrete Beispiele
  insert into public.patients (id, full_name, dob, address, versichertennummer)
  values
    (gen_random_uuid(), 'Anna Müller', '12.04.1988', 'Feldstraße 12, 10115 Berlin', 'B12345678'),
    (gen_random_uuid(), 'Jonas Richter', '03.11.1975', 'Musterweg 5, 22301 Hamburg', '109283746'),
    (gen_random_uuid(), 'Sophie Lehmann', '21.07.1990', 'Blumenstraße 8, 80331 München', 'K92384756'),
    (gen_random_uuid(), 'Paul Schneider', '09.02.1982', 'Ringallee 2, 60311 Frankfurt', 'S82910349'),
    (gen_random_uuid(), 'Lena Hofmann', '28.09.1993', 'Lindenplatz 4, 50667 Köln', 'L00011223');

  -- weitere generische
  for i in 1..10 loop
    insert into public.patients (id, full_name, dob, address, versichertennummer)
    values (gen_random_uuid(), 'Patient '||i, to_char(date '1980-01-01' + (i||' days')::interval, 'DD.MM.YYYY'), 'Musterstraße '||i||', 10115 Berlin', 'VNR'||10000+i);
  end loop;
end $$;

-- Beispiel-KVAs mit Items und Statusverlauf
do $$
declare
  p record;
  k record;
  new_kva uuid;
  st text[];
  idx int;
  readable text;
begin
  st := array['draft','in_bearbeitung','erfolgreich','abgelehnt'];
  -- Wir nehmen die ersten 8 Patienten
  for p in select id from public.patients limit 8 loop
    -- wähle zufällige Kasse
    select id into k from public.kassen order by random() limit 1;
    readable := 'KVA-' || floor(random()*90000 + 10000)::int;
    insert into public.kostenvoranschlaege (id, readable_id, patient_id, kasse_id, status)
    values (gen_random_uuid(), readable, p.id, k.id, 'draft') returning id into new_kva;

    -- Items
    insert into public.items (id, kostenvoranschlag_id, name, quantity, article_number, unit_price, brand)
    values
      (gen_random_uuid(), new_kva, 'Orthese Knie', 1, '20201', 89.90, 'Medi'),
      (gen_random_uuid(), new_kva, 'Kompressionsstrumpf K2', 2, '40333', 49.50, 'Juzo');

    -- Statusverlauf (min. Draft -> In Bearbeitung)
    insert into public.status_history (id, kva_id, status) values
      (gen_random_uuid(), new_kva, 'draft'),
      (gen_random_uuid(), new_kva, 'in_bearbeitung');

    -- Chance auf finalen Status
    idx := floor(random()*2)::int; -- 0 oder 1
    if idx = 0 then
      insert into public.status_history (id, kva_id, status) values (gen_random_uuid(), new_kva, 'erfolgreich');
      update public.kostenvoranschlaege set status = 'erfolgreich' where id = new_kva;
    else
      insert into public.status_history (id, kva_id, status) values (gen_random_uuid(), new_kva, 'abgelehnt');
      update public.kostenvoranschlaege set status = 'abgelehnt' where id = new_kva;
    end if;
  end loop;
end $$;

-- Beispiel-E-Mails (Demo-Logs)
do $$
declare r record;
begin
  for r in select id from public.kostenvoranschlaege limit 5 loop
    insert into public.emails (id, kva_id, to_email, subject, body, demo)
    values (gen_random_uuid(), r.id, 'kva@kasse.example', 'Kostenvoranschlag', 'Sehr geehrte Damen und Herren, im Anhang übermitteln wir den Kostenvoranschlag zur Prüfung …', true);
  end loop;
end $$;


