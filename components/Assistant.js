// Assistant.js
import { useState } from "react";
import React from "react";
import ChatBox from "@/components/ChatBox";
import genericApiCall from "@/lib/genericApiCall";
import { assistants } from "@/data/assistants";

export default function Assistant({ chooseAssistant }) {
  const [assistant, setAssistant] = useState(assistants[chooseAssistant]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const systemInstructions = assistant.systemInstructions

    try {
      const data = await genericApiCall(systemInstructions, userInput, messages);

      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "user", content: userInput },
        { role: "assistant", content: data.data },
      ]);
    } catch (error) {
      console.error("Error:", error);
    }

    setLoading(false);
    setUserInput("");
  };

  return (
    <main >
      <ChatBox
        title={assistant.name}
        icon={assistant.chatIcon}
        messages={messages}
        loading={loading}
        userInput={userInput}
        setUserInput={setUserInput}
        handleFormSubmit={handleFormSubmit}
        placeholder={assistant.placeholder}
      />
    </main>
  );
}
