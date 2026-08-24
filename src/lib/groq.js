const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

// Candidate models in priority order to guarantee high availability on all Groq tiers
const CANDIDATE_MODELS = [
  "llama-3.3-70b-versatile",
  "llama-3.1-70b-versatile",
  "llama-3.1-8b-instant",
  "llama3-70b-8192",
  "llama3-8b-8192",
  "mixtral-8x7b-32768",
];

export async function callGroq(messages, temperature = 0.6) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Missing VITE_GROQ_API_KEY. Please add your Groq API key in your .env file or Vercel Environment Variables.",
    );
  }

  let lastError = null;

  for (const model of CANDIDATE_MODELS) {
    try {
      const response = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages,
          temperature,
          max_tokens: 1500,
          response_format: { type: "json_object" },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errMsg = errorData?.error?.message || `Status ${response.status}`;

        // If the model does not exist or tier lacks access, try the next available candidate model
        if (
          response.status === 404 ||
          errMsg.toLowerCase().includes("does not exist") ||
          errMsg.toLowerCase().includes("model_not_found") ||
          errMsg.toLowerCase().includes("access")
        ) {
          console.warn(`Groq model ${model} unavailable (${errMsg}). Trying next candidate...`);
          lastError = new Error(errMsg);
          continue;
        }

        if (response.status === 429) {
          throw new Error("Groq rate limit exceeded. Please wait a moment and try again.");
        }

        throw new Error(errMsg);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content || "";
      if (content) {
        return content;
      }
    } catch (err) {
      lastError = err;
      // If it's a rate limit or network abort, surface it immediately
      if (err.message?.includes("rate limit") || err.message?.includes("VITE_GROQ_API_KEY")) {
        throw err;
      }
    }
  }

  throw lastError || new Error("Failed to communicate with Groq AI engine. Please check your API key.");
}
