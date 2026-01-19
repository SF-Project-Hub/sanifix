import React from 'react';

export type UploadStepProps = {
  onNext: (data?: Record<string, unknown>) => void;
};

export function UploadStep({ onNext }: UploadStepProps) {
  const handleDummyUpload = () => {
    // Platzhalter: simuliert Upload-Ergebnis
    onNext({ uploadedFiles: [{ name: 'dummy.pdf' }] });
  };

  return (
    <div className="rounded border p-4">
      <h2 className="text-lg font-semibold">Upload</h2>
      <p className="text-sm text-gray-600 mb-3">
        Platzhalter-Komponente. Hier würden Dateien hochgeladen.
      </p>
      <button
        type="button"
        className="rounded bg-blue-600 px-3 py-2 text-white"
        onClick={handleDummyUpload}
      >
        Upload abschließen
      </button>
    </div>
  );
}

