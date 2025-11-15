import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    const { prompt } = req.body;

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const result = await openai.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "1024x1024"
    });

    const imageUrl = result.data[0].url;

    return res.status(200).json({ imageUrl });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Generation failed" });
  }
}
