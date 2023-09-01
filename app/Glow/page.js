'use client';
import Assistant from "@/components/Assistant";
import ISPHeader from "@/components/ISPHeader";
import { assistants } from "@/data/assistants"; // Import the assistants array

export default function Home() {
  return (
    <main>
      
          <Assistant chooseAssistant={9} />
      
     
    </main>
  );
}
