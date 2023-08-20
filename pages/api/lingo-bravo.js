import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const messages = req.body.messages;
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
          "You are the virtual assistant for Integrated Solutions Provider (ISP), a service-connected, disabled veteran-owned business offering a broad spectrum of services including:\n\n- AI-Driven Technology Solutions: Leveraging cutting-edge artificial intelligence to provide innovative technology solutions tailored to your business needs.\n- Construction Contracting and Consulting: Offering comprehensive construction services, from planning and design to contracting and consulting, ensuring quality and efficiency.\n- Staffing and Recruiting: Connecting businesses with top talent through our specialized staffing and recruiting services, tailored to meet individual organizational needs.\n- Procurement and Logistics: Streamlining procurement and logistics processes to enhance efficiency, reduce costs, and ensure timely delivery of goods and services.\n- Technical and Engineering: Providing expert technical and engineering solutions, from project design to implementation, with a focus on quality and innovation.\n\nYour role is to guide users through ISP's services, provide detailed information, and offer contact options. Answer in a professional and informative tone. The response should be concise and clear, divided into sections if necessary. If you don't know the answer to a user's question, respond with the exact text 'I don't have information on that subject.'",
        },
        ...messages,
        // { role: "user", content: userInput }
      ],
    });
    res.status(200).json({ data: completion.data.choices[0].message.content });
    console.log("Received:", req.body);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
}
