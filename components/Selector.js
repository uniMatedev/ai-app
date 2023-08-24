'use client';



export default function Selector({ assistants, setAssistant}) {
    
  return (
    <select
        onChange={(e) => setAssistant(assistants[e.target.selectedIndex])}
      >
        {assistants.map((assistant, index) => (
          <option key={index} value={assistant.name}>
            {assistant.name}
          </option>
        ))}
      </select>
  );
}