import { useMemo, useState } from "react";

function FeedbackCard({ feedback }) {
  const [showModelAnswer, setShowModelAnswer] = useState(false);
  const rank = useMemo(() => rankFromFeedback(feedback), [feedback]);
  const accentColor = rank.includes("S") || rank.includes("A") ? "var(--success)" : rank.includes("B") ? "var(--warning)" : "var(--danger)";

  return (
    <div className="game-card feedback-slide space-y-5 p-6 md:p-8" style={{ borderLeft: `4px solid ${accentColor}` }}>
      <div className="text-center">
        <div className="rank-badge rank-pop mx-auto" style={{ color: accentColor }}>
          {rank}
        </div>
        <div className="relative mt-5">
          <div className="bubble-heading text-[28px] text-[var(--text-lavender)]">{feedback.score} / 10</div>
          <div className="xp-float pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 pixel-heading text-[14px] text-[var(--pink-bright)]">
            +{feedback.score * 10} XP
          </div>
        </div>
      </div>

      <DetailBlock label="▶ Strengths" color="var(--success)" content={feedback.strengths} />
      <DetailBlock label="Improve" color="var(--warning)" content={feedback.improvements} />
      <DetailBlock label="Tip" color="var(--text-muted)" content={feedback.tip} />

      <button type="button" onClick={() => setShowModelAnswer((value) => !value)} className="btn-ghost w-full justify-center">
        {showModelAnswer ? "Hide Model Answer" : "Model Answer"}
      </button>

      {showModelAnswer ? (
        <div className="rounded-[10px] border-2 p-4 text-sm leading-7" style={{ borderColor: "var(--purple-muted)", background: "var(--bg-deep)" }}>
          {feedback.model_answer}
        </div>
      ) : null}
    </div>
  );
}

function DetailBlock({ label, color, content }) {
  return (
    <div className="rounded-[10px] border p-4" style={{ borderColor: "var(--purple-muted)", background: "rgba(255,255,255,0.02)" }}>
      <div className="bubble-heading text-[13px]" style={{ color }}>{label}</div>
      <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{content}</p>
    </div>
  );
}

function rankFromFeedback(feedback) {
  if (feedback.verdict === "Excellent") return "S Rank";
  if (feedback.verdict === "Good") return "A Rank";
  if (feedback.verdict === "Average") return "B Rank";
  return "C Rank";
}

export default FeedbackCard;

