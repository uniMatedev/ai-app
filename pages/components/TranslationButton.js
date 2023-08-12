// pages/components/TranslationButton.js
'use client';

import { useState } from 'react';

export default function TranslationButton() {
  const [textToTranslate, setTextToTranslate] = useState('');
  const [translation, setTranslation] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTranslateClick = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: textToTranslate }), // Send the text to translate
      });
      const data = await response.json();
      setTranslation(data.data);
    } catch (error) {
      console.error('An error occurred:', error);
    }
    setLoading(false);
  };

  return (
    <div>
      <input
        type="text"
        value={textToTranslate}
        onChange={(e) => setTextToTranslate(e.target.value)}
        placeholder="Enter text to translate"
      />
      <button onClick={handleTranslateClick}>Translate</button>
      {loading ? <p>Loading...</p> : <p>Translation: {translation || 'No translation available'}</p>}
    </div>
  );
}
