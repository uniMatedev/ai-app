const { Configuration, OpenAIApi } = require("openai");

export default async function handler(req, res) {
  if (req.method !== 'POST') { 
    return res.status(405).end(); // Method Not Allowed if not a GET request
  }
  const prompt =  req.body.prompt
  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      // Add additional parameters if needed
      temperature: 0.7,
      max_tokens: 60,
    });
    res.status(200).json({ data: response.data.data});

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
