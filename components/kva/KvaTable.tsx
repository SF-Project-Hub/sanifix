 'use client';
import { Card } from '@/components/ui/Card';
import { formatDate } from '@/lib/date';
import { useMemo, useState } from 'react';

type Kva = {
  id: string;
  status: 'draft' | 'in_bearbeitung' | 'erfolgreich' | 'abgelehnt';
  patientName: string;
  kasseName?: string;
  createdAt: string;
  itemDesc?: string;
  totalPrice?: number;
};

const statusMap: Record<Kva['status'], string> = {
  draft: 'Entwurf',
  in_bearbeitung: 'In Bearbeitung',
  erfolgreich: 'Genehmigt',
  abgelehnt: 'Abgelehnt'
};

export function KvaTable({ data }: { data: Kva[] }) {
  const [filter, setFilter] = useState<Kva['status'] | 'all'>('all');
  const [q, setQ] = useState('');
  const filtered = useMemo(
    () => {
      const base = filter === 'all' ? data : data.filter((k) => k.status === filter);
      const s = q.trim().toLowerCase();
      if (!s) return base;
      return base.filter(
        (k) =>
          k.id.toLowerCase().includes(s) ||
          k.patientName.toLowerCase().includes(s) ||
          (k.kasseName ?? '').toLowerCase().includes(s)
      );
    },
    [data, filter, q]
  );
  return (
    <Card>
      <div className="flex items-center justify-between mb-3 gap-3">
        <div className="font-medium">Übersicht</div>
        <input
          type="search"
          placeholder="Suche (ID, Patient, Kasse)"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="rounded-lg border px-3 py-1.5 text-sm w-64"
          aria-label="KVA Suche"
        />
        <div className="flex gap-2 text-sm">
          {(['all', 'draft', 'in_bearbeitung', 'erfolgreich', 'abgelehnt'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s as any)}
              className={`px-3 py-1 rounded-full border ${
                filter === s ? 'bg-primary text-white border-primary' : 'bg-white'
              }`}
              aria-pressed={filter === s}
              aria-label={`Filter ${s === 'all' ? 'Alle' : statusMap[s as keyof typeof statusMap]}`}
            >
              {s === 'all' ? 'Alle' : statusMap[s as keyof typeof statusMap]}
            </button>
          ))}
        </div>
      </div>
      {filtered.length === 0 ? (
        <div className="text-sm text-gray-600" role="status" aria-live="polite">
          Keine Kostenvoranschläge vorhanden.{' '}
          <a className="text-primary underline" href="/kostenvoranschlaege/new">
            KVA starten
          </a>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm" aria-label="Kostenvoranschläge Tabelle">
            <thead>
              <tr className="text-left text-gray-500">
                <th scope="col" className="py-2">Status</th>
                <th scope="col" className="py-2">ID</th>
                <th scope="col" className="py-2">Patient</th>
                <th scope="col" className="py-2">Kasse</th>
                <th scope="col" className="py-2">Positionen</th>
                <th scope="col" className="py-2">Summe</th>
                <th scope="col" className="py-2">Erstellt</th>
                {/* Aktion Spalte entfernt */}
              </tr>
            </thead>
            <tbody>
              {filtered.map((k) => (
                <tr key={k.id} className="border-t">
                  <td className="py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        k.status === 'draft'
                          ? 'bg-blue-50 text-blue-700'
                          : k.status === 'in_bearbeitung'
                          ? 'bg-yellow-50 text-yellow-800'
                          : k.status === 'erfolgreich'
                          ? 'bg-green-50 text-green-700'
                          : 'bg-red-50 text-red-700'
                      }`}
                      aria-label={`Status: ${statusMap[k.status]}`}
                    >
                      {statusMap[k.status]}
                    </span>
                  </td>
                  <td className="py-2">{k.id}</td>
                  <td className="py-2">{k.patientName}</td>
                  <td className="py-2">{k.kasseName ?? '—'}</td>
                  <td className="py-2">{k.itemDesc ?? '—'}</td>
                  <td className="py-2">
                    {k.totalPrice != null
                      ? new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(k.totalPrice)
                      : '—'}
                  </td>
                  <td className="py-2">{formatDate(k.createdAt)}</td>
                  {/* Aktion Zelle entfernt */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}

// Aktion-Komponenten wurden entfernt

