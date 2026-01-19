import React from 'react';

export type OcrStepProps = {
  initial?: Record<string, unknown>;
  onNext: (data?: Record<string, unknown>) => void;
  onBack: () => void;
};

export function OcrStep({ initial, onNext, onBack }: OcrStepProps) {
  const handleRunOcr = () => {
    // Platzhalter: simuliert OCR-Ergebnis
    onNext({ ocrText: 'Erkannter Text (Platzhalter)' });
  };

  return (
    <div className="rounded border p-4">
      <h2 className="text-lg font-semibold">OCR</h2>
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
          onClick={handleRunOcr}
        >
          OCR abschließen
        </button>
      </div>
    </div>
  );
}

