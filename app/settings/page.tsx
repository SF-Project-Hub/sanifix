 'use client';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { supabase } from '@/lib/supabaseClient';
import { useEffect, useState } from 'react';
// Statistiken sind in eigenem Reiter ausgelagert

export default function SettingsPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [providers, setProviders] = useState<string[]>([]);
  const team = [
    'barbara@thiel-scheld.de',
    'susanna@thiel-scheld.de',
    'backoffice@thiel-scheld.de',
    'kasse@thiel-scheld.de',
    'kasse2@thiel-scheld.de'
  ];
  const teamCounts: Record<string, number> = {
    'barbara@thiel-scheld.de': 18,
    'susanna@thiel-scheld.de': 24,
    'backoffice@thiel-scheld.de': 35,
    'kasse@thiel-scheld.de': 12,
    'kasse2@thiel-scheld.de': 9
  };
  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.auth.getUser();
      setEmail(data.user?.email ?? null);
      const idents = data.user?.identities ?? [];
      setProviders(
        Array.from(new Set(idents.map((i: any) => (i?.provider ?? 'email') as string)))
      );
    };
    load();
  }, []);
  return (
    <div className="space-y-6">
      <PageHeader title="Einstellungen" subtitle="Account- & Team-Einstellungen" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <div className="font-medium mb-2">Account</div>
          <div className="text-sm text-gray-600">E-Mail</div>
          <div className="text-sm">{email ?? '—'}</div>
          <div className="text-sm text-gray-600 mt-3">Verbundene Provider</div>
          <div className="text-sm">{providers.length ? providers.join(', ') : '—'}</div>
        </Card>
        <Card>
          <div className="font-medium mb-2">Verbundene E-Mail(s)</div>
          <div className="text-sm text-gray-600 mb-2">
            Absender für den Versand (Demo): <code>kva@plattform-domain.de</code>
          </div>
          <button className="border px-3 py-2 rounded-xl text-sm">Weitere E-Mail verbinden</button>
        </Card>
        <Card>
          <div className="font-medium mb-2">Team-Mitglieder</div>
          <div className="text-sm">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-gray-700">
                {email ? `${email} (Admin)` : 'Du (Admin)'}
              </span>
              <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-800">
                {team.reduce((a, m) => a + (teamCounts[m] ?? 0), 0)} KVAs gesamt (Team)
              </span>
            </div>
            <ul className="space-y-1">
              {team.map((m) => (
                <li key={m} className="flex items-center justify-between">
                  <span className="text-gray-700">{m}</span>
                  <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-800">
                    {(teamCounts[m] ?? 0).toString()} bearbeitet
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}

