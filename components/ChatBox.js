'use client';

import { useState } from "react";

export default function ChatBox({title, icon, messages, loading, userInput, setUserInput, handleFormSubmit, placeholder}) {
    
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-900 mt-10">
    <div className="bg-blue-700 text-white p-4 rounded-t-lg flex items-center">
    <img src={icon} alt="Chat Icon" className="h-6 w-auto mr-2" />
    <h2 className="text-2xl font-bold">{title}</h2>
  </div>
  <ul className="space-y-4 p-4 bg-gray-900 rounded-b-lg text-gray-100">
    {messages.map((message, index) => {
      if (message.role === "user") {
        return (
          <li key={index} className="mb-4 flex justify-end">
            <div className="text-white inline-block p-4 bg-orange-500 border border-orange-400 rounded-lg max-w-md shadow-md">
              <span className="font-semibold">You:</span> {message.content}
            </div>
          </li>
        );
      } else if (message.role === "assistant") {
        return (
          <li key={index} className="mb-4 flex justify-start">
            <div className="inline-block p-4 bg-gray-900 border border-gray-700 rounded-lg max-w-md text-gray-100 shadow-md">
              <span className="font-semibold">{title}:</span> {message.content}
            </div>
          </li>
        );
      }
    })}
  </ul>
      <form onSubmit={handleFormSubmit} className="mt-4 bg-gray-200 p-4 rounded-b-lg">
        <label className="text-gray-600">{loading ? "Waiting for Response..." : "Ready For Input"}</label>
        <div className="flex items-center">
        <textarea
    rows="8" /* Adjust this value to your desired number of visible lines */
    className="text-gray-800 bg-white p-2 border border-gray-500 rounded-lg focus:outline-none focus:border-gray-600 flex-grow mr-2"
    placeholder={loading ? "loading" : placeholder}
    value={userInput}
    onChange={(e) => setUserInput(e.target.value)}
    type="text"
  ></textarea>
  
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 px-4 border border-blue-400 rounded-lg hover:bg-blue-600 active:bg-blue-700 focus:outline-none"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}