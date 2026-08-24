export function buildQuestionPrompt(role, interviewType, difficulty, count) {
  return [
    {
      role: "system",
      content: `You are an expert interviewer at a top tech company.
Generate exactly ${count} interview questions for the role of ${role}.
Interview type: ${interviewType}. Difficulty: ${difficulty}.

Rules:
- For Technical type: ask about specific technologies, algorithms, system design, or code concepts relevant to ${role}.
- For Behavioral type: use STAR-method situations.
- For Mixed type: alternate between technical and behavioral questions.
- Questions must be realistic, concise, and common in actual ${role} interviews.
- Vary the topics. Do not repeat the same concept twice.

Respond ONLY with valid JSON in this shape:
{
  "questions": [
    { "id": 1, "question": "...", "type": "technical", "topic": "React Hooks", "timeHint": "Aim for 2-3 minutes" }
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
      content: `You are a strict but fair technical interviewer evaluating a candidate for the role of ${role}.
Score the candidate's answer.

Scoring criteria:
- Relevance: 0-3
- Depth: 0-3
- Clarity: 0-2
- Examples: 0-2

Respond ONLY with valid JSON in this shape:
{
  "score": 7,
  "verdict": "Good",
  "strengths": "Clear explanation with a relevant example.",
  "improvements": "Mention trade-offs and edge cases.",
  "model_answer": "A strong answer would include ...",
  "tip": "Mention impact, constraints, and trade-offs."
}`,
    },
    {
      role: "user",
      content: `Question: ${question}\n\nCandidate's Answer: ${answer}`,
    },
  ];
}

export function parseQuestions(rawText) {
  const parsed = parseJsonResponse(rawText);
  const rawQuestions = Array.isArray(parsed) ? parsed : parsed.questions;

  if (!Array.isArray(rawQuestions)) {
    throw new Error("Could not parse interview questions.");
  }

  return rawQuestions.map((item, index) => ({
    id: item.id || index + 1,
    question: item.question,
    type: item.type || "technical",
    topic: item.topic || "General",
    timeHint: item.timeHint || "Aim for 2-3 minutes",
  }));
}

export function parseScoring(rawText) {
  const parsed = parseJsonResponse(rawText);

  return {
    score: Number(parsed.score) || 0,
    verdict: parsed.verdict || verdictFromScore(Number(parsed.score) || 0),
    strengths: parsed.strengths || "You stayed on-topic and gave a usable answer.",
    improvements:
      parsed.improvements || "Add more specifics, trade-offs, and measurable outcomes.",
    model_answer:
      parsed.model_answer ||
      "A stronger answer would combine a direct explanation, one concrete example, and a clear trade-off.",
    tip:
      parsed.tip ||
      "Structure each answer with context, action, and result so your thinking is easy to follow.",
  };
}

export function verdictFromScore(score) {
  if (score >= 8) return "Excellent";
  if (score >= 6) return "Good";
  if (score >= 4) return "Average";
  return "Needs Work";
}

function parseJsonResponse(rawText) {
  const cleaned = rawText.replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned);
}
