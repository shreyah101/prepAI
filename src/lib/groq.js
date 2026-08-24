const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

// Candidate models prioritized with current active Groq production models
const CANDIDATE_MODELS = [
  "openai/gpt-oss-120b",
  "openai/gpt-oss-20b",
  "qwen/qwen3.6-27b",
  "gemma2-9b-it",
  "llama-3.3-70b-versatile",
  "llama-3.1-8b-instant",
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

        // If the model is decommissioned, deprecated, does not exist, or tier lacks access, try next model
        if (
          response.status === 404 ||
          response.status === 400 ||
          errMsg.toLowerCase().includes("decommissioned") ||
          errMsg.toLowerCase().includes("no longer supported") ||
          errMsg.toLowerCase().includes("does not exist") ||
          errMsg.toLowerCase().includes("model_not_found") ||
          errMsg.toLowerCase().includes("not have access") ||
          errMsg.toLowerCase().includes("deprecat") ||
          errMsg.toLowerCase().includes("invalid_model")
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
      // If it's a rate limit or missing API key, throw immediately
      if (err.message?.includes("rate limit") || err.message?.includes("VITE_GROQ_API_KEY")) {
        throw err;
      }
    }
  }

  throw lastError || new Error("Failed to communicate with Groq AI engine. Please check your API key.");
}
