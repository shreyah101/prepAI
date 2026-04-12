function QuestionCard({ question, index }) {
  return (
    <div className="game-card p-7 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="rounded-full px-3 py-2 pixel-heading text-[10px] text-white" style={{ background: "var(--purple-main)" }}>
          Q{index + 1}
        </span>
        <span
          className="rounded-full border px-3 py-2 bubble-heading text-[12px]"
          style={{ background: "rgba(147,197,253,.15)", borderColor: "rgba(147,197,253,.3)", color: "#93c5fd" }}
        >
          {question.topic}
        </span>
      </div>

      <h2 className="mt-5 text-[18px] font-medium leading-8 text-[var(--text-lavender)]">
        {question.question}
      </h2>

      <p className="mt-3 text-[13px] text-[var(--text-dim)]">?? Give a structured answer with examples.</p>
    </div>
  );
}

export default QuestionCard;

