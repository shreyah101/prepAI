import { useState } from "react";

const verdictStyles = {
  Excellent: "border-emerald-400/50 bg-emerald-400/10 text-emerald-200",
  Good: "border-cyan-400/50 bg-cyan-400/10 text-cyan-200",
  Average: "border-amber-400/50 bg-amber-400/10 text-amber-200",
  "Needs Work": "border-rose-400/50 bg-rose-400/10 text-rose-200",
};

function FeedbackCard({ feedback }) {
  const [showModelAnswer, setShowModelAnswer] = useState(false);

  return (
    <div className="glass-panel animate-slide-up space-y-5 border-l-4 border-indigo-400 p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span
          className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] ${
            verdictStyles[feedback.verdict] || verdictStyles.Good
          }`}
        >
          {feedback.verdict}
        </span>
        <div className="text-lg font-semibold text-slate-50">{feedback.score}/10</div>
      </div>

      <DetailBlock title="Strengths" content={feedback.strengths} />
      <DetailBlock title="Improvements" content={feedback.improvements} />
      <DetailBlock title="Tip" content={feedback.tip} />

      <button
        type="button"
        onClick={() => setShowModelAnswer((value) => !value)}
        className="text-sm font-medium text-indigo-200 transition hover:text-indigo-100"
      >
        {showModelAnswer ? "Hide model answer" : "Show model answer"}
      </button>

      {showModelAnswer ? (
        <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm leading-7 text-slate-300">
          {feedback.model_answer}
        </div>
      ) : null}
    </div>
  );
}

function DetailBlock({ title, content }) {
  return (
    <div className="space-y-1">
      <div className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">{title}</div>
      <p className="text-sm leading-7 text-slate-300">{content}</p>
    </div>
  );
}

export default FeedbackCard;
