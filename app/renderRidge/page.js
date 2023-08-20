"use client";
import { useState } from "react";
import * as Babel from "@babel/standalone";
import React from 'react';
// const temp = [
//   { role: "user", content: "Who won the world series in 2020?" },
//   {
//     role: "assistant",
//     content: "The Los Angeles Dodgers won the World Series in 2020.",
//   },
//   { role: "user", content: "Where was it played?" },
// ];
function extractInnerHtml(jsxString) {
  const matched = jsxString.match(/return\s*\(\s*(<div.*?>.*?<\/div>)\s*\);/);
  return matched && matched[1];
}
export default function Home() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state added
  const [userInput, setUserInput] = useState("");
  const handleSubmit = async () => {
    setLoading(true);
    setUserInput("")
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
   
    setLoading(false)
  };
  return (
    <main className="flex min-h-screen flex-col items-center p-6 bg-gradient-to-br from-gray-800 to-gray-900 text-white">
        <h1 className="text-4xl font-bold mb-8">AIDynamicJSXRenderer</h1>
        <p className="text-center mb-12 px-4">
            Engage with AI that crafts and renders dynamic JSX directly in the browser. Experience the future of interactive design.
        </p>

        <ul className="w-full max-w-xl mb-6">
            {messages.map((message, index) => {
                if (message.role === "user") {
                    return (
                        <li key={index} className="mb-4">
                            <div className="inline-block p-3 bg-gray-700 border border-gray-600 rounded-lg">
                                User says: {message.content}
                            </div>
                        </li>
                    );
                } else if (message.role === "assistant") {
                    let JSXContent = null;
                    // ... (the transpiling and evaluation code remains the same)
                    try {
                        // Transpile the JSX string to JavaScript
                        const transpiledCode = Babel.transform(message.content, {
                          presets: ["react"]
                        }).code;
                        
                        // Evaluate the code and get the React element
                        JSXContent = new Function("React", "return " + transpiledCode)(React);
                      } catch (error) {
                        console.error("Failed to transpile or evaluate JSX:", error);
                      }
                    return (
                        <li key={index} className="mb-4">
                            <div className="inline-block p-3 bg-gray-800 border border-gray-600 rounded-lg">
                                {JSXContent}
                            </div>
                        </li>
                    );
                }
            })}
        </ul>

        <form 
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}
            className="w-full max-w-xl"
        >
            <div className="flex items-center border rounded-lg bg-gray-800">
                <input
                    className="text-gray-800 flex-grow p-2 rounded-l-lg focus:outline-none focus:border-gray-600"
                    onChange={(e) => setUserInput(e.target.value)}
                    type="text"
                    placeholder={loading ? "Loading..." : "Type your prompt..."}
                    value={userInput}
                />
                <button
                    type="submit"
                    className="px-4 py-2 rounded-r-lg bg-gray-700 hover:bg-gray-600 active:bg-gray-500 focus:outline-none"
                >
                    Send
                </button>
            </div>
        </form>
    </main>
);
}
