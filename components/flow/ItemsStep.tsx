import React from 'react';

export type ItemsStepProps = {
  initial?: Record<string, unknown>;
  onNext: (data?: Record<string, unknown>) => void;
  onBack: () => void;
};

export function ItemsStep({ initial, onNext, onBack }: ItemsStepProps) {
  const handleConfirmItems = () => {
    // Platzhalter: simuliert extrahierte/überarbeitete Positionen
    onNext({ items: [{ id: 1, name: 'Beispiel-Artikel', qty: 1 }] });
  };

  return (
    <div className="rounded border p-4">
      <h2 className="text-lg font-semibold">Positionen</h2>
      <pre className="text-xs bg-gray-50 p-2 rounded mb-3">
        {JSON.stringify(initial, null, 2)}
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
          className="rounded bg-blue-600 px-3 py-2 text-white"
          onClick={handleConfirmItems}
        >
          Positionen bestätigen
        </button>
      </div>
    </div>
  );
}

