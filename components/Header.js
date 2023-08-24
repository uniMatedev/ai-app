'use client';
import Image from "next/image";
import { useState } from "react";

export default function Header({ icon}) {
    
  return (
    <header className="bg-gray-900 text-gray-100 shadow-lg rounded-lg p-6 border border-gray-700">
      <div className="container mx-auto p-4 flex flex-wrap justify-between items-center">
        <div className="w-full lg:w-auto flex flex-col lg:flex-row items-center space-y-2 lg:space-x-4">
          <Image
            src={icon}
            alt="ISP Logo"
            width={400}
            height={400}
          />
          {/* <div className="text-center lg:text-left">
            <h1 className="text-lg lg:text-xl font-semibold w-full lg:w-auto truncate text-gray-200">
              {title}
            </h1>
          </div> */}
        </div>
      </div>
    </header>
  );
}
