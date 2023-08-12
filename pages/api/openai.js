const { Configuration, OpenAIApi } = require("openai");

export default async function handler(req, res) {
  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    // Get the text from the request
    const textToTranslate = req.body.text || "Hello, World!";
    const prompt = `Translate the following English text to Spanish: '${textToTranslate}'`;
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      // Add additional parameters if needed
      temperature: 0.7,
      max_tokens: 60,
    });

    res.status(200).json({ data: completion.data.choices[0].text });
  } catch (error) {
    if (error.response && error.response.status === 429) {
      // Handling rate limits
      res.status(429).json({ error: "Rate limit exceeded" });
    } else if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ error: error.message });
    }
  }
}
