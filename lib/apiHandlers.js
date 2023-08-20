// Separate function for the API call
export async function callLingoBravo(userInput, messages) {
  const combinedMessages = [
    ...messages,
    { role: "user", content: userInput },
  ];

  const res = await fetch("/api/lingo-bravo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userInput, messages: combinedMessages }),
  });

  return await res.json();
}
export async function callLingoCharlie(userInput, messages) {
  const combinedMessages = [
    ...messages,
    { role: "user", content: userInput },
  ];

  const res = await fetch("/api/lingo-charlie", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userInput, messages: combinedMessages }),
  });

  return await res.json();
}