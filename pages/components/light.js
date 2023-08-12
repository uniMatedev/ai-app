// Home component
"use client";

import Models from "@/pages/components/Models"; // Updated import
import Intro from "@/pages/components/Intro";
import { useState } from "react";

const temp = [
  { role: "user", content: "Who won the world series in 2020?" },
  {
    role: "assistant",
    content: "The Los Angeles Dodgers won the World Series in 2020.",
  },
  { role: "user", content: "Where was it played?" },
];

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state added
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");
  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Combine the existing messages with the new user message before making the API call
      const combinedMessages = [
        ...messages,
        { role: "user", content: userInput },
      ];

      const res = await fetch("/api/lingo-bravo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInput, messages: combinedMessages }), // Using combinedMessages here
      });

      const data = await res.json();

      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "user", content: userInput },
        { role: "assistant", content: data.data },
      ]);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-gray-100 text-gray-800">
    <ul className="text-gray-700">
        {messages.map((message, index) => {
            if (message.role === "user") {
                return (
                    <li key={index} className="mb-4">
                        <div className="inline-block p-3 bg-gray-200 border border-gray-500 rounded-lg">
                            User says: {message.content}
                        </div>
                    </li>
                );
            } else if (message.role === "assistant") {
                return (
                    <li key={index} className="mb-4">
                        <div className="inline-block p-3 bg-gray-300 border border-gray-500 rounded-lg">
                            Assistant says: {message.content}
                        </div>
                    </li>
                );
            }
        })}
    </ul>

    <form 
    onSubmit={(e) => {
        e.preventDefault(); // This prevents the default form submission
        handleSubmit(); 
    }}
    className="mt-4"
>
    <input
        className="text-gray-800 bg-gray-200 p-2 border border-gray-500 rounded-lg focus:outline-none focus:border-gray-600"
        onChange={(e) => setUserInput(e.target.value)}
        type="text"
    />

    <button
        type="submit" // This indicates that the button will submit the form
        className="ml-2 bg-gray-400 text-gray-800 p-2 px-4 border border-gray-500 rounded-lg hover:bg-gray-500 hover:text-gray-700 active:bg-gray-600 focus:outline-none"
    >
        Send
    </button>
</form>

</main>

  );
}
