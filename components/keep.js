// Home component
"use client";

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
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/lingo-bravo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInput, messages }),
      });
      const data = await res.json();
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "user", content: userInput },
        { role: "assistant", content: data.data },
        
      ]);
      console.log('Received input:', userInput);
      console.log('Received messages:', messages);
      
    } catch (error) {}
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="border p-4 rounded-xl bg-gray-100 w-96">
        <div className="overflow-y-auto mb-4 h-80">
          {messages.map((message, index) => {
            if (message.role === "user") {
              return (
                <div key={index} className="mb-2 text-right">
                  <div className="inline-block p-3 bg-blue-500 text-white rounded-lg rounded-br-none">
                    {message.content}
                  </div>
                </div>
              );
            } else if (message.role === "assistant") {
              return (
                <div key={index} className="mb-2 text-left">
                  <div className="inline-block p-3 bg-green-500 text-white rounded-lg rounded-bl-none">
                    {message.content}
                  </div>
                </div>
              );
            }
          })}
        </div>

        <div className="mt-2 flex justify-between items-center">
          <form
            onSubmit={handleSubmit}
            className="mt-2 flex justify-between items-center"
          >
            <input
              className="text-gray-800 bg-gray-200 p-2 w-3/4 border rounded-lg focus:outline-none focus:border-blue-500"
              onChange={(e) => setUserInput(e.target.value)}
              type="text"
              placeholder='Text your message'
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 px-4 ml-4 rounded-lg hover:bg-blue-600 active:bg-blue-700 focus:outline-none"
            >
              Send
            </button>
            {loading ? <p className="text-red-600">loding...</p> : <p className="text-blue-600">waiting</p>}
          </form>
        </div>
      </div>
    </main>
  );
}
