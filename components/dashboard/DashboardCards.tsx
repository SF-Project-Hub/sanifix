import { Card } from '@/components/ui/Card';

export function DashboardCards({
  stats
}: {
  stats: { label: string; value: string; delta?: string }[];
}) {
  const bgFor = (label: string) => {
    const l = label.toLowerCase();
    if (l.includes('total')) return ''; // bleibt weiß
    if (l.includes('entwürfe') || l.includes('entwur')) return 'bg-blue-50';
    if (l.includes('bearbeitung')) return 'bg-yellow-50';
    if (l.includes('genehm')) return 'bg-green-50';
    if (l.includes('abgelehnt')) return 'bg-red-50';
    return '';
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
      {stats.map((s) => {
        const highlight = bgFor(s.label);
        return (
          <Card key={s.label} className={highlight}>
            <div className="text-sm text-gray-900 opacity-80">{s.label}</div>
            <div className="text-4xl font-semibold mt-1 text-gray-900">{s.value}</div>
          {s.delta && <div className="text-xs mt-2 text-primary">{s.delta}</div>}
          </Card>
        );
      })}
    </div>
  );
}

