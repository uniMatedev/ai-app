// Home component
"use client";
import { useState } from "react";
import * as Babel from "@babel/standalone";
import React from 'react';
import { handleSubmit } from "@/lib/apiHandlers";

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
  
  const handleFormSubmit = (e) => {
    e.preventDefault(); 
    handleSubmit(userInput, messages, setMessages, setLoading);
    setUserInput("");
  }
  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-gray-100 text-gray-800">
       <h1 className="text-gray-500 text-2xl mb-4">ZachGPT</h1>
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
    onSubmit={handleFormSubmit}
    className="mt-4"
>
    <input
    placeholder={loading ? "loading" : "Type something"}
    value={userInput}
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
