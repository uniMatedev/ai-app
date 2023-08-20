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
          "Generate JSX content for user messages without using the 'return' keyword or enclosing parentheses. Assess the mood and tone of the conversation and adjust the inline color style of the response to match it. For instance, use warm colors for positive tones and cooler colors for neutral or negative tones. Just provide the JSX directly. E.g., for a greeting response: <div style={{color: 'orange'}}>Hello!</div>."
          // "Generate JSX content for user messages without using the 'return' keyword or enclosing parentheses. Assess the mood and tone of the conversation and adjust the text color using Tailwind CSS classes to match it. For instance, use classes like 'text-yellow-500' for positive tones, 'text-blue-500' for neutral tones, and 'text-gray-500' for negative tones. Just provide the JSX directly. E.g., for a greeting response: <div className='text-yellow-500'>Hello!</div>."
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
