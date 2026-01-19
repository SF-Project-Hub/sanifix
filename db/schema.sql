-- Supabase Schema (MVP)
create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  display_name text,
  created_at timestamp with time zone default now()
);

create table if not exists public.patients (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  dob text,
  address text,
  kasse_id uuid,
  versichertennummer text,
  created_at timestamp with time zone default now()
);

create table if not exists public.kassen (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  created_at timestamp with time zone default now()
);

create table if not exists public.prescriptions (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid references public.patients(id),
  doctor_name text,
  praxis text,
  bsnr text,
  ausstellungsdatum text,
  diagnose text,
  file_url text,
  created_at timestamp with time zone default now()
);

create type public.kva_status as enum ('draft','in_bearbeitung','erfolgreich','abgelehnt');

create table if not exists public.kostenvoranschlaege (
  id uuid primary key default gen_random_uuid(),
  readable_id text unique,
  patient_id uuid references public.patients(id),
  kasse_id uuid references public.kassen(id),
  prescription_id uuid references public.prescriptions(id),
  status public.kva_status default 'draft'::public.kva_status,
  created_by uuid,
  created_at timestamp with time zone default now()
);

create table if not exists public.items (
  id uuid primary key default gen_random_uuid(),
  kostenvoranschlag_id uuid references public.kostenvoranschlaege(id) on delete cascade,
  catalog_item_id text,
  name text not null,
  quantity integer not null check (quantity >= 1),
  article_number text,
  unit_price numeric(10,2) default 0 check (unit_price >= 0),
  brand text
);

create table if not exists public.emails (
  id uuid primary key default gen_random_uuid(),
  kva_id uuid references public.kostenvoranschlaege(id) on delete cascade,
  to_email text not null,
  from_email text,
  subject text not null,
  body text not null,
  tone text,
  length text,
  demo boolean default true,
  sent_at timestamp with time zone default now()
);

create table if not exists public.status_history (
  id uuid primary key default gen_random_uuid(),
  kva_id uuid references public.kostenvoranschlaege(id) on delete cascade,
  status public.kva_status not null,
  created_at timestamp with time zone default now()
);


