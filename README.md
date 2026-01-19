# Sanifix (MVP)

Next.js 14 (App Router) + TypeScript + TailwindCSS
Backend: Supabase (Auth, Database) · Email: Resend (Live + Demo-Fallback)

## Lokale Entwicklung

1) Abhängigkeiten
```bash
pnpm i   # oder npm i / yarn
pnpm dev # http://localhost:3000
```

2) Env Variablen (lokal)
Lokal per Vercel CLI oder `.env.local` setzen:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY
- RESEND_API_KEY (optional; ohne Key: Demo-Fallback)
- EMAIL_FROM=kva@plattform-domain.de

## Supabase Setup

1) Projekt anlegen (Supabase Cloud)  
2) SQL Editor:
- `db/schema.sql` ausführen
- `db/seed.sql` ausführen
3) Auth aktivieren:
- Email/Magic Link
- Google OAuth (Redirect: `http://localhost:3000/` und später Prod-URL)
4) Keys kopieren:
- NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY

## Resend Setup (Live)

1) `RESEND_API_KEY` setzen  
2) `EMAIL_FROM` setzen (und Domain ggf. bei Resend verifizieren)  
3) Endpoint: `POST /api/send-email` nutzt Live-Send, fällt ohne Key auf Demo zurück.

## Deployment (Vercel)

1) Repo in Vercel importieren  
2) Environment Variables in Vercel (Production + Preview):
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - SUPABASE_URL
   - SUPABASE_SERVICE_ROLE_KEY
   - RESEND_API_KEY (optional)
   - EMAIL_FROM=kva@plattform-domain.de
3) Deploy starten (Next.js auto)  
4) Google OAuth Redirects in Google Console auf Prod-URL ergänzen

## Features (MVP)

- Auth: Magic Link + Google OAuth
- Dashboard mit Kennzahlen und „Letzte KVAs“
- KVA-Flow: Upload (simuliert) → OCR (Mock) → Hilfsmittel-Editor → Email Composer → Final Review (Send Demo/Live)
- KVA-Liste: Status-Filter, Statuswechsel per Dropdown (mit History-Schreibvorgang)
- Settings: Account/Provider-Übersicht, Demo-Karten
- A11y/Leerstaaten: Fokus, ARIA, Alerts

## Hinweise

- Upload ist aktuell simuliert (kein Storage). Umstellung auf Supabase Storage ist vorbereitet und in <2h nachrüstbar (Bucket, Policies, signierte URLs, Upload im Flow).
- `db/seed.sql` erzeugt Demo-Daten (Kassen, Patienten, KVAs, Items, Statusverlauf, Emails).


