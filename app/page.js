"use client";
// Import necessary modules
import React, { useState } from "react";
import Image from "next/image";
import Assistant from "@/components/Assistant";
import ISPHeader from "@/components/ISPHeader";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [services] = useState([
    // ... your services array here
  ]);

  return (
    <main >
      <ISPHeader />
      {/* New Assistant Component */}
      <div className="mt-10">
        <Assistant chooseAssistant={0} />
      </div>
      {/* Existing services section */}
      {services.map((service, index) => (
        <div
          key={index}
          className="p-4 bg-white shadow-md rounded-lg relative"
          style={{
            margin: "10px", // Adjust as needed
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
    </main>
  );
}
