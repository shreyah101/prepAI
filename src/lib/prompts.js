export function buildQuestionPrompt(role, interviewType, difficulty, count) {
  return [
    {
      role: "system",
      content: `You are an expert technical interviewer evaluating candidates for the role of ${role}.
Generate exactly ${count} realistic interview questions.
Interview type: ${interviewType}. Difficulty: ${difficulty}.

Rules:
- For Technical type: ask about core technologies, architecture, algorithms, or practical scenarios for ${role}.
- For Behavioral type: use STAR-method situational challenges.
- For Mixed type: mix both technical and situational questions.
- Keep questions sharp, professional, and clear.

You MUST output ONLY a valid JSON object matching this schema:
{
  "questions": [
    {
      "id": 1,
      "question": "Explain the difference between...",
      "type": "technical",
      "topic": "Architecture & State",
      "timeHint": "Aim for 2-3 minutes"
    }
  ]
}`,
    },
    {
      role: "user",
      content: `Generate ${count} ${difficulty} ${interviewType} interview questions for a ${role} position.`,
    },
  ];
}

export function buildScoringPrompt(role, question, answer) {
  return [
    {
      role: "system",
      content: `You are a strict but constructive tech interviewer evaluating a candidate's answer for the role of ${role}.
Question: ${question}

Evaluate the candidate's answer based on:
1. Relevance (0-3)
2. Depth (0-3)
3. Clarity (0-2)
4. Practical Examples & Trade-offs (0-2)
Total Score: 0-10

You MUST output ONLY a valid JSON object matching this schema:
{
  "score": 8,
  "verdict": "Excellent",
  "strengths": "Clear explanation of core concepts and concise trade-offs.",
  "improvements": "Consider elaborating on real-world edge cases.",
  "model_answer": "An ideal benchmark answer would highlight...",
  "tip": "Structure your answer using Context -> Action -> Result for maximum impact."
}`,
    },
    {
      role: "user",
      content: `Candidate's Answer:\n"""\n${answer}\n"""`,
    },
  ];
}

export function parseQuestions(rawText) {
  const parsed = parseJsonResponse(rawText);
  let rawQuestions = [];

  if (Array.isArray(parsed)) {
    rawQuestions = parsed;
  } else if (parsed && Array.isArray(parsed.questions)) {
    rawQuestions = parsed.questions;
  } else if (parsed && typeof parsed === "object") {
    // Look for any array value inside the object
    const foundArray = Object.values(parsed).find((val) => Array.isArray(val));
    if (foundArray) rawQuestions = foundArray;
  }

  if (!rawQuestions || rawQuestions.length === 0) {
    throw new Error("Could not parse interview questions from AI response.");
  }

  return rawQuestions.map((item, index) => ({
    id: item.id || index + 1,
    question: item.question || item.title || "Describe your approach to solving complex engineering problems in this role.",
    type: item.type || "technical",
    topic: item.topic || "Technical Foundations",
    timeHint: item.timeHint || "Aim for 2-3 minutes",
  }));
}

export function parseScoring(rawText) {
  const parsed = parseJsonResponse(rawText);
  const rawScore = Number(parsed.score ?? parsed.totalScore ?? parsed.rating);
  const score = isNaN(rawScore) ? 7 : Math.max(0, Math.min(10, Math.round(rawScore)));

  return {
    score,
    verdict: parsed.verdict || verdictFromScore(score),
    strengths:
      parsed.strengths ||
      parsed.feedback ||
      "You addressed the core problem clearly with solid conceptual understanding.",
    improvements:
      parsed.improvements ||
      parsed.suggestions ||
      "Add more specific implementation details, edge cases, and architectural trade-offs.",
    model_answer:
      parsed.model_answer ||
      parsed.modelAnswer ||
      "A strong response directly defines the core mechanism, provides a production code or design example, and discusses trade-offs.",
    tip:
      parsed.tip ||
      "Structure your response with STAR (Situation, Task, Action, Result) or Architecture -> Implementation -> Tradeoffs.",
  };
}

export function verdictFromScore(score) {
  if (score >= 8) return "Excellent";
  if (score >= 6) return "Good";
  if (score >= 4) return "Average";
  return "Needs Work";
}

function parseJsonResponse(rawText) {
  if (typeof rawText !== "string") {
    throw new Error("Invalid text response from AI.");
  }

  // Strip code fences
  let text = rawText.replace(/```json/gi, "").replace(/```/g, "").trim();

  // Try direct parse first
  try {
    return JSON.parse(text);
  } catch {
    // Extract first JSON object or array match
    const jsonMatch = text.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[0]);
      } catch (err) {
        console.error("Regex JSON parse error:", err);
      }
    }
    throw new Error("AI returned an invalid JSON structure.");
  }
}
