// lib/genericApiCall.js
export default async function genericApiCall( systemInstructions, userInput, messages) {
    const combinedMessages = [
      ...messages,
      { role: "user", content: userInput },
    ];
  
    const res = await fetch("/api/ai-api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ systemInstructions, userInput, messages: combinedMessages }),
    });
  
    return await res.json();
  }
  