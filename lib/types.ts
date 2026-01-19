export type KvaStatus = 'draft' | 'in_bearbeitung' | 'erfolgreich' | 'abgelehnt';

export type KvaItem = {
  id: string;
  kostenvoranschlagId?: string;
  catalogItemId?: string;
  name: string;
  quantity: number;
  articleNumber?: string;
  unitPrice?: number;
  brand?: string;
};

export type EmailLog = {
  id: string;
  kvaId: string;
  to: string;
  subject: string;
  body: string;
  sentAt: string;
  demo: boolean;
};





