import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const body = await new Promise((resolve) => {
      let data = "";
      req.on("data", (chunk) => (data += chunk));
      req.on("end", () => resolve(JSON.parse(data)));
    });

    const { prompt } = body;

    if (!prompt) {
      return res.status(400).json({ error: "Missing prompt" });
    }

    // Google nano-banana model on Fal.ai
    const falResponse = await fetch(
      "https://fal.run/google/nano-banana/edit",
      {
        method: "POST",
        headers: {
          "Authorization": `Key ${process.env.FAL_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          size: "1024x1024",
        }),
      }
    );

    const result = await falResponse.json();

    console.log("FAL RAW RESULT:", JSON.stringify(result, null, 2));

    const imageUrl =
      result.output?.images?.[0]?.url ||
      result.images?.[0]?.url ||
      null;

    return res.status(200).json({ imageUrl });
  } catch (err) {
    console.error("FAL ERROR:", err);
    return res.status(500).json({ error: "Generation failed" });
  }
}
