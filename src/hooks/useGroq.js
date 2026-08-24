import { useState } from "react";
import { callGroq } from "../lib/groq";

export function useGroq() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchFromGroq = async (messages, temperature = 0.7) => {
    setLoading(true);
    setError("");

    try {
      return await callGroq(messages, temperature);
    } catch (err) {
      const message = err.message || "Something went wrong while calling Groq.";
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { fetchFromGroq, loading, error };
}
