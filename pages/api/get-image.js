const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey:'YOUR_API_KEY',
});

const openai = new OpenAIApi(configuration);

async function generateImage() {
  try {
    const prompt = "A high-contrast, intensely saturated cityscape under stormy skies, with towering skyscrapers piercing the ominous clouds. Flashing advertisements add a futuristic flair while pedestrians scurry below, donned in vibrant raincoats, dodging scattered neon-lit puddles. The flashes of lightning occasionally illuminate the surroundings, casting dramatic shadows and revealing the rain-soaked urban texture.";
    const response = await openai.createImage({
        prompt: "a white siamese cat",
        n: 1,
        size: "1024x1024",
    });
    const image_url = response.data.data[0].url;
    console.log("Generated Image URL:", image_url);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

generateImage();
