import { DashboardCards } from '@/components/dashboard/DashboardCards';
import { PageHeader } from '@/components/ui/PageHeader';
import { mockDashboardStats } from '@/lib/mockData';
import { RecentKvas } from '@/components/dashboard/RecentKvas';
import { Card } from '@/components/ui/Card';
import { formatDate } from '@/lib/date';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard - Sanitätshaus Thiel & Scheld oHG" subtitle="Überblick über alle Kostenvoranschläge" />
      <DashboardCards stats={mockDashboardStats()} />
      <Card className="bg-white">
        <div className="text-sm text-green-800">
          <span className="font-semibold">Aktualisiert</span>: Alle Verträge wurden überprüft und aktualisiert – Status {formatDate(new Date())} 07:00 Uhr
        </div>
      </Card>
      <RecentKvas />
    </div>
  );
}

