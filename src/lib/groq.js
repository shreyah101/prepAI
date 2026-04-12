const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile";

export async function callGroq(messages, temperature = 0.7) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  if (!apiKey) {
    throw new Error("Missing VITE_GROQ_API_KEY in your .env file.");
  }

  const response = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      temperature,
      max_tokens: 1500,
    }),
  });

  if (!response.ok) {
    let errorMessage = "Groq API error";

    try {
      const error = await response.json();
      errorMessage = error.error?.message || errorMessage;
    } catch {
      if (response.status === 429) {
        errorMessage = "AI is busy, please wait a moment.";
      } else {
        errorMessage = `Groq request failed with status ${response.status}.`;
      }
    }

    throw new Error(errorMessage);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "";
}
