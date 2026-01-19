import React from 'react';

export type ReviewStepProps = {
  data: Record<string, unknown>;
  onBack: () => void;
};

export function ReviewStep({ data, onBack }: ReviewStepProps) {
  const handleFinish = () => {
    // Platzhalter: simuliert Abschluss des Prozesses
    alert('KVA abgeschlossen (Platzhalter).');
  };

  return (
    <div className="rounded border p-4">
      <h2 className="text-lg font-semibold">Review</h2>
      <pre className="text-xs bg-gray-50 p-2 rounded mb-3">
        {JSON.stringify(data, null, 2)}
      </pre>
      <div className="flex gap-2">
        <button
          type="button"
          className="rounded bg-gray-200 px-3 py-2"
          onClick={onBack}
        >
          Zurück
        </button>
        <button
          type="button"
          className="rounded bg-green-600 px-3 py-2 text-white"
          onClick={handleFinish}
        >
          Abschließen
        </button>
      </div>
    </div>
  );
}

