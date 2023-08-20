"use client";
import { useState } from "react";
import React from "react";
import { callLingoBravo } from "@/lib/apiHandlers";
import Image from "next/image";
export default function Home() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [services] = useState([
    {
      "icon": "/aicity.png",
      "title": "AI-Driven Technology Solutions",
      "description": "Leveraging cutting-edge artificial intelligence to provide innovative technology solutions tailored to your business needs."
    },
    {
      "icon": "/construction.png",
      "title": "Construction Contracting and Consulting",
      "description": "Offering comprehensive construction services, from planning and design to contracting and consulting, ensuring quality and efficiency."
    },
    {
      "icon": "/staffing.png",
      "title": "Staffing and Recruiting",
      "description": "Connecting businesses with top talent through our specialized staffing and recruiting services, tailored to meet individual organizational needs."
    },
    {
      "icon": "/procure.png",
      "title": "Procurement and Logistics",
      "description": "Streamlining procurement and logistics processes to enhance efficiency, reduce costs, and ensure timely delivery of goods and services."
    },
    {
      "icon": "/engin.png",
      "title": "Engineering",
      "description": "Providing expert engineering solutions, from project design to implementation, with a focus on quality and innovation."
    }
    // ... Add more service objects as needed
  ]
  );
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state here
    

    try {
      const data = await callLingoBravo(userInput, messages); // Call the separate API function

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
    <main 
   
    className="flex min-h-screen flex-col items-center p-24 bg-gray-100 text-gray-800"
   
      
    >

<header className="bg-gray-900 text-gray-100 shadow-lg rounded-lg p-6 border border-gray-700">
  <div className="container mx-auto p-4 flex flex-wrap justify-between items-center">
    <div className="w-full lg:w-auto flex flex-col lg:flex-row items-center space-y-2 lg:space-x-4">
      <img src="/logo238.png" alt="ISP Logo" className="h-16 w-auto" />
      <div className="text-center lg:text-left">
        <h2 className="text-xl lg:text-2xl font-bold text-gray-200">
          ISP
        </h2>
        <h1 className="text-lg lg:text-xl font-semibold w-full lg:w-auto truncate text-gray-200">
          Integrated Solutions Provider
        </h1>
      </div>
    </div>
    <button
      className="lg:hidden p-3 focus:outline-none focus:bg-gray-700 mt-2 mx-auto block text-2xl"
      onClick={() => setIsOpen(!isOpen)}
    >
      {isOpen ? "✖" : "☰"}
    </button>
    <nav
      className={`w-full lg:w-auto mt-4 lg:mt-0 lg:ml-8 lg:flex ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <ul className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-6 w-full lg:w-auto">
        <li className="w-full text-center lg:w-auto">
          <a href="#" className="hover:text-gray-400">
            Home
          </a>
        </li>
        {/* ... other links ... */}
      </ul>
    </nav>
  </div>
</header>


<div className="bg-white shadow-lg rounded-lg p-6 border border-gray-300 mt-10">
  <div className="bg-gray-900 text-white p-4 rounded-t-lg flex items-center">
    <img src="/logo238.png" alt="Chat Icon" className="h-6 w-auto mr-2" />
    <h2 className="text-xl font-bold">ISP Chat Assistant</h2>
  </div>
  <ul className="text-gray-700 space-y-4 p-4 bg-gray-100 rounded-lg">
    {messages.map((message, index) => {
      if (message.role === "user") {
        return (
          <li key={index} className="mb-4 flex justify-end">
            <div className="text-white inline-block p-3 bg-blue-500 border border-blue-400 rounded-lg max-w-md">
              <span className="font-semibold">You:</span> {message.content}
            </div>
          </li>
        );
      } else if (message.role === "assistant") {
        return (
          <li key={index} className="mb-4 flex justify-start">
            <div className="text-gray-800 inline-block p-3 bg-gray-200 border border-gray-500 rounded-lg max-w-md">
              <span className="font-semibold">ISP Assistant:</span> {message.content}
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
      <section
  className="container mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative bg-center bg-no-repeat bg-cover bg-opacity-80"  
>
  {/* Tint with Transparency */}
  

  {services.map((service, index) => (
    <div
      key={index}
      className="p-4 bg-white shadow-md rounded-lg relative"
      style={{
        margin: '10px', // Adjust as needed
      }}
    >
      <Image
        src={service.icon}
        alt={service.title}
        height={800}
        width={800}
        objectFit="cover" // You can adjust this as needed
      />
      <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
      <p className="text-gray-600">{service.description}</p>
    </div>
  ))}
</section>



    </main>
  );
}
