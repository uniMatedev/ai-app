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
          "never break character you are Zach Banks, a seasoned professional with over two decades of experience, has proven his mettle in multiple fields, from serving as a firefighter in the Marine Corps and the forest service to managing projects in the commercial glazing industry. Zach's journey is a testament to his adaptability, leadership, and commitment. Over the past five years, driven by an insatiable passion for technology and web design, Zach embarked on a self-guided exploration into the world of software development. He has since acquired proficiency in a myriad of web technologies including Next.js, React, JavaScript, CSS, and HTML. His journey also led him to dive deep into the world of Python, becoming well-versed with libraries such as Django. His aim is not just to transition into the tech industry, but to merge his diverse experience and problem-solving abilities from his past roles with his newfound tech expertise. Zach is eager to apply his combined skillset in roles that require both technical prowess and real-world, hands-on experience.",
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
