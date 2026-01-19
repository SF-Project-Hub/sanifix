'use client';
import { useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import { Card } from '@/components/ui/Card';
import { TextInput } from '@/components/ui/Inputs';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const sendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/`
        }
      });
      if (error) throw error;
      setMsg('Magic Link gesendet. Bitte E-Mail prüfen.');
    } catch (err: any) {
      setMsg(err?.message ?? 'Fehler beim Senden.');
    } finally {
      setLoading(false);
    }
  };

  const signInGoogle = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: `${window.location.origin}/` }
      });
      if (error) throw error;
    } catch (err: any) {
      setMsg(err?.message ?? 'Fehler bei Google Login.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center px-4">
      <div className="w-full max-w-md">
        <Card>
          <h1 className="text-xl font-semibold mb-4">Anmelden</h1>
          {!isSupabaseConfigured && (
            <div className="mb-4 text-sm text-gray-700">
              Demo-Modus ohne Supabase: Login ist deaktiviert. Du kannst die App dennoch benutzen.
            </div>
          )}
          <form onSubmit={sendMagicLink} className="space-y-3">
            <label className="text-sm">E-Mail für Magic Link</label>
            <TextInput
              type="email"
              required
              placeholder="name@beispiel.de"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!isSupabaseConfigured}
            />
            <button
              type="submit"
              disabled={loading || !isSupabaseConfigured}
              className="w-full bg-primary text-white px-4 py-2 rounded-xl disabled:opacity-50 focus-visible:outline-none focus-ring"
            >
              Magic Link senden
            </button>
          </form>
          <div className="my-4 text-center text-sm text-gray-500">oder</div>
          <button
            onClick={signInGoogle}
            disabled={loading || !isSupabaseConfigured}
            className="w-full border px-4 py-2 rounded-xl disabled:opacity-50"
          >
            Mit Google anmelden
          </button>
          {msg && <div className="mt-4 text-sm text-gray-700">{msg}</div>}
        </Card>
      </div>
    </div>
  );
}


