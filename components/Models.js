// pages/components/ModelsButton.js
'use client';

export default function ModelsButton({ models, clickFunctions }) {
  return (
    <div className="space-y-4">
      <p>{models}</p>
    </div>
  );
}
