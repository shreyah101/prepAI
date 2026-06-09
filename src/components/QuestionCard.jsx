function QuestionCard({ question, index }) {
  return (
    <div className="p-7 md:p-8 border-b border-[var(--border-subtle)]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="rounded-[4px] px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--neon-purple)] border border-[var(--neon-purple-dim)] bg-[rgba(168,85,247,0.1)]">
          STAGE {index + 1}
        </span>
        <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--neon-cyan)]">
          OBJECTIVE: {question.topic}
        </span>
      </div>

      <h2 className="mt-6 text-[18px] font-bold leading-8 text-[var(--text-main)] drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
        {question.question}
      </h2>
    </div>
  );
}

export default QuestionCard;

