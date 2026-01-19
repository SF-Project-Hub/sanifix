import { PageHeader } from '@/components/ui/PageHeader';
import { KvaTable } from '@/components/kva/KvaTable';
import { mockKvas } from '@/lib/mockData';

export default function KvaListPage() {
  const data = mockKvas();
  return (
    <div className="space-y-6">
      <PageHeader
        title="Kostenvoranschläge"
        subtitle="Alle KVAs mit Filter nach Status"
        cta={{ href: '/kostenvoranschlaege/new', label: 'Kostenvoranschlagsprozess starten' }}
      />
      <KvaTable data={data} />
    </div>
  );
}

