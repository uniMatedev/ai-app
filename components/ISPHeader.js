"use client";
import Image from "next/image";
import { useState } from "react";

export default function ISPHeader({ icon }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="bg-gray-900 text-gray-100 shadow-lg rounded-lg p-6 border border-gray-700">
      <div className="container mx-auto p-4 flex flex-wrap justify-between items-center">
        <div className="w-full lg:w-auto flex flex-col lg:flex-row items-center space-y-2 lg:space-x-4">
          <img src="/logo238.png" alt="ISP Logo" className="h-16 w-auto" />
          <div className="text-center lg:text-left">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-200">ISP</h2>
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
            <li className="w-full text-center lg:w-auto lg:text-left">
              <a href="/" className="hover:text-gray-400">
                Home
              </a>
            </li>
            <li className="w-full text-center lg:w-auto lg:text-left">
              <a href="/Assistants" className="hover:text-gray-400">
               All-Assistants
              </a>
            </li>
            {/* ... other links ... */}
          </ul>
        </nav>
      </div>
    </header>
  );
}
