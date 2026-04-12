function QuestionCard({ question, index }) {
  return (
    <div className="glass-panel space-y-4 p-6 md:p-8">
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full border border-indigo-400/30 bg-indigo-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-indigo-200">
          Question {index + 1}
        </span>
        <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-slate-300">
          {question.type}
        </span>
        <span className="text-xs uppercase tracking-[0.25em] text-slate-500">{question.topic}</span>
      </div>

      <h2 className="text-xl font-medium leading-relaxed text-slate-50 md:text-2xl">
        {question.question}
      </h2>

      <p className="text-sm text-slate-400">{question.timeHint || "Aim for 2-3 minutes"}</p>
    </div>
  );
}

export default QuestionCard;
