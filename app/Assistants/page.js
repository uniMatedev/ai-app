'use client';
import Assistant from "@/components/Assistant";

export default function Home() {
  return (
    <main >
      <div>
        <Assistant chooseAssistant={0} />
      </div>
      <div>
        <Assistant chooseAssistant={1} />
      </div>
      <div>
        <Assistant chooseAssistant={2} />
      </div>
      <div>
        {/* <Assistant chooseAssistant={3} /> */}
      </div>
    </main>
  );
}
