import { Card } from '@/components/ui/Card';
import { mockKvas } from '@/lib/mockData';
import { formatDate } from '@/lib/date';

export function RecentKvas() {
  const items = mockKvas().slice(0, 5);
  return (
    <Card>
      <div className="font-medium mb-2">Letzte Kostenvoranschläge</div>
      <ul className="divide-y">
        {items.map((k) => (
          <li key={k.id} className="py-2 flex justify-between text-sm">
            <span className="truncate">
              <span className="font-medium">{k.patientName}</span> – {k.itemDesc ?? '—'}
            </span>
            <span className="text-gray-500">{formatDate(k.createdAt)}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

