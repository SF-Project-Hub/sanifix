'use client';
import { PageHeader } from '@/components/ui/PageHeader';
import { UploadStep } from '@/components/flow/UploadStep';
import { OcrStep } from '@/components/flow/OcrStep';
import { ItemsStep } from '@/components/flow/ItemsStep';
import { EmailStep } from '@/components/flow/EmailStep';
import { ReviewStep } from '@/components/flow/ReviewStep';
import { useState } from 'react';

export default function NewKvaPage() {
  // Inline Zustand im Client-Komponent; in echter App via Zustand/Server Actions
  const [step, setStep] = useState(0);
  const [context, setContext] = useState<any>({});

  const next = (data?: any) => {
    if (data) setContext((prev: any) => ({ ...prev, ...data }));
    setStep((s) => Math.min(s + 1, 4));
  };
  const back = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div className="space-y-6">
      <PageHeader title="Kostenvoranschlagsprozess starten" subtitle="Geführter Prozess vom Upload bis zum Versand" />
      {step === 0 && <UploadStep onNext={next} />}
      {step === 1 && <OcrStep onNext={next} onBack={back} initial={context} />}
      {step === 2 && <ItemsStep onNext={next} onBack={back} initial={context} />}
      {step === 3 && <EmailStep onNext={next} onBack={back} initial={context} />}
      {step === 4 && <ReviewStep onBack={back} data={context} />}
    </div>
  );
}

