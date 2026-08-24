import { useState } from "react";
import { callGroq } from "../lib/groq";

export function useGroq() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchFromGroq = async (messages, temperature = 0.6) => {
    setLoading(true);
    setError("");

    try {
      const result = await callGroq(messages, temperature);
      return result;
    } catch (err) {
      const message = err.message || "Something went wrong while calling Groq AI.";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { fetchFromGroq, loading, error };
}
