'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';

function SuccessContent() {
  const sp = useSearchParams();
  const kva = sp.get('kva') ?? 'KVA';
  return (
    <Card className="bg-green-50">
      <div className="space-y-2">
        <div className="text-sm text-gray-900">Vorgangs-ID</div>
        <div className="text-lg font-semibold text-gray-900">{kva}</div>
        <div className="text-sm text-gray-900 mt-4">
          Eine Bestätigung wurde protokolliert. Sie finden den Vorgang in der Liste der
          Kostenvoranschläge.
        </div>
        <div className="flex gap-2 mt-6">
          <Link
            href="/kostenvoranschlaege"
            className="bg-primary text-white px-4 py-2 rounded-xl focus-visible:outline-none focus-ring"
          >
            Zur Übersicht
          </Link>
          <Link
            href="/kostenvoranschlaege/new"
            className="border px-4 py-2 rounded-xl focus-visible:outline-none focus-ring"
          >
            Neuen KVA starten
          </Link>
        </div>
      </div>
    </Card>
  );
}

export default function KvaSuccessPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Kostenvoranschlag übermittelt" subtitle="Der Vorgang war erfolgreich." />
      <Suspense fallback={<Card>Wird geladen…</Card>}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}


