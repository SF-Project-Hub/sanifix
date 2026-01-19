import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { BarMini } from '@/components/charts/BarMini';
import { DonutMini } from '@/components/charts/DonutMini';

export default function StatsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Statistiken" subtitle="Übersicht der Kennzahlen" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <div className="font-medium mb-2">Zeitlicher Verlauf</div>
          <div className="text-sm text-gray-600 mb-3">KVA pro Monat (letzte 6 Monate)</div>
          <StatsLastSixMonths />
        </Card>
        <Card>
          <div className="font-medium mb-2">Erfolgsquote</div>
          <DonutMini value={98} label="Erfolgsquote gesamt" />
        </Card>
        <Card>
          <div className="font-medium mb-2">Durchschnittliche Genehmigungsdauer</div>
          <div className="text-sm text-gray-600 mb-3">Verteilung nach Dauer</div>
          <ApprovalDurationChart />
        </Card>
      </div>
    </div>
  );
}

function StatsLastSixMonths() {
  const now = new Date();
  const months = Array.from({ length: 6 }).map((_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    const label = d.toLocaleDateString('de-DE', { month: 'short' });
    const value = 15 + ((i * 7) % 23);
    return { label, value };
  });
  return <BarMini data={months} />;
}

function ApprovalDurationChart() {
  const data = [
    { label: '1 Tag', value: 34 },
    { label: '2 Tage', value: 28 },
    { label: '3 Tage', value: 22 },
    { label: '> 3 Tage', value: 13 }
  ];
  return <BarMini data={data} height={140} />;
}






