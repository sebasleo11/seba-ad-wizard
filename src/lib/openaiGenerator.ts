// src/lib/openaiGenerator.ts
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const OPENAI_IMAGE_URL = "https://api.openai.com/v1/images/generations";

// 🔐 Importante: este token debe estar cargado en tu .env como NEXT_PUBLIC_OPENAI_API_KEY
const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY || "";

export async function generateAdCopy(prompt: string): Promise<string> {
  const response = await fetch(OPENAI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4", // o "gpt-3.5-turbo" si querés reducir costos
      messages: [
        {
          role: "system",
          content: "Sos un experto en publicidad. Generá textos creativos para anuncios de Facebook.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    }),
  });

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "No se pudo generar el texto.";
}

export async function generateAdImage(prompt: string): Promise<string> {
  const response = await fetch(OPENAI_IMAGE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      prompt,
      n: 1,
      size: "1024x1024",
    }),
  });

  const data = await response.json();
  return data.data?.[0]?.url || "";
}
