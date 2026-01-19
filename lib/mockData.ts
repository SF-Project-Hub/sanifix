export type Kva = {
  id: string;
  status: 'draft' | 'in_bearbeitung' | 'erfolgreich' | 'abgelehnt';
  patientName: string;
  kasseName?: string;
  createdAt: string;
  itemDesc?: string;
  totalPrice?: number;
};

export function mockKvas(): Kva[] {
  const now = new Date();
  const fmt = (d: Date) => d.toISOString();
  return [
    {
      id: 'KVA-2026-0001',
      status: 'draft',
      patientName: 'Max Mustermann',
      kasseName: 'AOK',
      createdAt: fmt(new Date(now.getTime() - 1000 * 60 * 60 * 24 * 1)),
      itemDesc: 'Rollstuhl Basic',
      totalPrice: 499.0
    },
    {
      id: 'KVA-2026-0002',
      status: 'in_bearbeitung',
      patientName: 'Erika Muster',
      kasseName: 'TK',
      createdAt: fmt(new Date(now.getTime() - 1000 * 60 * 60 * 24 * 3)),
      itemDesc: 'Prothese Wartung',
      totalPrice: 129.99
    },
    {
      id: 'KVA-2026-0003',
      status: 'erfolgreich',
      patientName: 'Hans Beispiel',
      kasseName: 'DAK',
      createdAt: fmt(new Date(now.getTime() - 1000 * 60 * 60 * 24 * 10)),
      itemDesc: 'Einlagen Premium',
      totalPrice: 79.5
    },
    {
      id: 'KVA-2026-0004',
      status: 'abgelehnt',
      patientName: 'Julia Demo',
      kasseName: 'Barmer',
      createdAt: fmt(new Date(now.getTime() - 1000 * 60 * 60 * 24 * 20)),
      itemDesc: 'Orthese Spezial',
      totalPrice: 299.0
    }
  ];
}

export function mockDashboardStats(): { label: string; value: string; delta?: string }[] {
  return [
    { label: 'Total KVAs', value: '124' },
    { label: 'Entwürfe', value: '18' },
    { label: 'In Bearbeitung', value: '27', delta: '+3 seit gestern' },
    { label: 'Genehmigt', value: '66', delta: '+5 seit gestern' },
    { label: 'Abgelehnt', value: '13' }
  ];
}

