-- Ergänzt fehlende Spalten in public.emails ohne bestehende Daten zu beeinträchtigen
alter table if exists public.emails
  add column if not exists from_email text;

alter table if exists public.emails
  add column if not exists tone text;

alter table if exists public.emails
  add column if not exists length text;






