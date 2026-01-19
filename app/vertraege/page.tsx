import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';

export default function VertraegePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Verträge" subtitle="Zugriff beschränkt – Bereich ist gesperrt" />
      <Card>
        <div className="flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-700"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M6 10V8a6 6 0 1 1 12 0v2h1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V11a1 1 0 0 1 1-1h1Zm2 0h8V8a4 4 0 1 0-8 0v2Z" />
          </svg>
          <div>
            <div className="font-medium">Verträge</div>
            <div className="text-sm text-gray-600">
              Dieser Bereich ist aktuell gesperrt. Verträge (z. B. Kassenverträge) werden hier später
              verwaltet.
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}






