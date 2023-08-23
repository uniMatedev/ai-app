"use client";
//////////////////////////
import { useState } from "react";
import React from "react";
import {
  callLingoCharlie,
  callLingoDelta,
  callLingoEcho,
  callLingoFoxtrot,
} from "@/lib/apiHandlers";
import ChatBox from "@/pages/components/ChatBox";
import { assistants } from "@/data/assistants";

const functionMapping = {
  callLingoCharlie: callLingoCharlie,
  callLingoDelta: callLingoDelta,
  callLingoEcho: callLingoEcho,
  callLingoFoxtrot: callLingoFoxtrot,
};

//////////////////////////
export default function Assistant({ chooseAssistant }) {
  //////////////////////////
  const [assistant, setAssistant] = useState(assistants[chooseAssistant]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState("");
  //////////////////////////

  //////////////////////////
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Retrieve the function name from the assistant configuration
    const functionName = assistant.system;

    // Look up the function in the mapping
    const functionToCall = functionMapping[functionName];

    if (functionToCall) {
      try {
        // Call the function
        const data = await functionToCall(userInput, messages);

        setMessages((prevMessages) => [
          ...prevMessages,
          { role: "user", content: userInput },
          { role: "assistant", content: data.data },
        ]);
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      console.error(`Function ${functionName} not found in the mapping`);
    }

    setLoading(false);
    setUserInput("");
  };

  //////////////////////////
  return (
    //////////////////////////
    <main className="flex min-h-screen flex-col items-center p-24 bg-gray-900 text-gray-100">
      <ChatBox
        title={assistant.name}
        icon={assistant.chatIcon}
        messages={messages}
        loading={loading}
        userInput={userInput}
        setUserInput={setUserInput}
        handleFormSubmit={handleFormSubmit}
      />
    </main>
    //////////////////////////
  );
}
