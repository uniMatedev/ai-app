export async function handleSubmit(userInput, messages, setMessages, setLoading) {
  setLoading(true);
  try {
    // Combine the existing messages with the new user message before making the API call
    const combinedMessages = [
      ...messages,
      { role: "user", content: userInput },
    ];

    const res = await fetch("/api/lingo-alpha", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput, messages: combinedMessages }), 
    });

    const data = await res.json();

    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: userInput },
      { role: "assistant", content: data.data },
    ]);
    setLoading(false)
  } catch (error) {
    console.error("Error:", error);
  }
}
