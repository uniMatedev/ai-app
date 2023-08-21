"use client";
import { useState } from "react";
import React from "react";
import {  callLingoCharlie, callLingoDelta } from "@/lib/apiHandlers";
import Image from "next/image";
export default function Home() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [services] = useState([
    
    {
      "icon": "/dragon.png",
      "title": "Dragon Whispers: A Twilight Dance in the Enchanted Forest",
      "description": "Mythical forest inhabited by mischievous, miniature dragons with a flowing watercolor style::15 Vibrant hues reflecting diverse flora and spirited dragons, set in twilight::20 Playful emojis subtly crafting the mood and story element - 🐉🌲🌟✨::12 Young dragons showcasing individual characteristics, signifying their unique personalities::25 Forest scene bustling with assorted flora, winding paths, scattered dragon eggs, hidden treasures, and wisps of smoke and light, creating an aura of mystery and adventure::18 --ar 16:9"
    },
    {
      "icon": "/stary.png",
      "title": "Cosmic Reverie: Van Gogh's Odyssey Through the Unknown Galaxy",
      "description": "Mythical galaxy incorporating grand cosmic designs and celestial bodies with a touch of Vincent van Gogh's Starry Night influence::15 Bioluminescent nebulas, stardust, spiraling black holes, and brilliantly lit stars painting a panoramic view of the universe::20 Emojis illustrating the cosmic narrative - 🌌🌟🌠🔭::10 Observatories on distant, undiscovered planets, playing the role of silent observers to the cosmic dance, signifying the curiosity of sentient life ::22 Universe teeming with captivating celestial phenomena, solar winds, light echoes, and cosmic waves, inducing a sense of awe-inspiring vastness and the unknown::18 --ar 21:9"
    },
    
  ]
  );
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state here
    

    try {
      const data = await callLingoDelta(userInput, messages); // Call the separate API function

      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "user", content: userInput },
        { role: "assistant", content: data.data },
      ]);
    } catch (error) {
      console.error("Error:", error);
    }

    setLoading(false); // Reset loading state here
    setUserInput("");
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-gray-900 text-gray-100">

  <header className="bg-gray-900 text-gray-100 shadow-lg rounded-lg p-6 border border-gray-700">
    <div className="container mx-auto p-4 flex flex-wrap justify-between items-center">
      <div className="w-full lg:w-auto flex flex-col lg:flex-row items-center space-y-2 lg:space-x-4">
        <Image src="/namerocean.png" alt="ISP Logo" width={600} height={400}/>
        <div className="text-center lg:text-left">
          <h1 className="text-lg lg:text-xl font-semibold w-full lg:w-auto truncate text-gray-200">
          NamerOcean
          </h1>
        </div>
      </div>
    
    </div>
  </header>

  <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-900 mt-10">
  <div className="bg-blue-700 text-white p-4 rounded-t-lg flex items-center">
  <img src="/namerocean.png" alt="Chat Icon" className="h-6 w-auto mr-2" />
  <h2 className="text-2xl font-bold">NamerOcean Interface</h2>
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
            <span className="font-semibold">NamerOcean:</span> {message.content}
          </div>
        </li>
      );
    }
  })}
</ul>
    <form onSubmit={handleFormSubmit} className="mt-4 bg-gray-200 p-4 rounded-b-lg">
      <label className="text-gray-600">{loading ? "Waiting for Response..." : "Ask ISP"}</label>
      <div className="flex items-center">
        <input
          placeholder={loading ? "loading" : "Type your question..."}
          value={userInput}
          className="text-gray-800 bg-white p-2 border border-gray-500 rounded-lg focus:outline-none focus:border-gray-600 flex-grow mr-2"
          onChange={(e) => setUserInput(e.target.value)}
          type="text"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 px-4 border border-blue-400 rounded-lg hover:bg-blue-600 active:bg-blue-700 focus:outline-none"
        >
          Send
        </button>
      </div>
    </form>
  </div>

  <section className="container mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative bg-center bg-no-repeat bg-cover bg-opacity-80 bg-gray-900">
    {services.map((service, index) => (
      <div key={index} className="p-4 text-gray-800 bg-white shadow-md rounded-lg relative" style={{ margin: '10px' }}>
        <Image src={service.icon} alt={service.title} height={800} width={800} objectFit="cover" />
        <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
        <p className="text-gray-600">{service.description}</p>
      </div>
    ))}
  </section>

</main>
  );
}
