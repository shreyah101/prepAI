import { useEffect, useRef } from "react";

function AnswerInput({
  value,
  onChange,
  onSubmit,
  onSkip,
  disabled,
  minCharacters = 50,
}) {
  const ref = useRef(null);
  const count = value.trim().length;
  const isValid = count >= minCharacters;

  useEffect(() => {
    if (!ref.current) return;
    ref.current.style.height = "0px";
    ref.current.style.height = `${ref.current.scrollHeight}px`;
  }, [value]);

  return (
    <div className="game-card space-y-5 p-6 md:p-8">
      <label className="section-label block" htmlFor="answer">
        ? Your Move
      </label>
      <textarea
        id="answer"
        ref={ref}
        rows={5}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Type your answer, adventurer..."
        className="min-h-[130px] w-full resize-y rounded-[8px] border-2 px-4 py-4 text-[15px] outline-none transition"
        style={{
          background: "var(--bg-deep)",
          borderColor: "var(--purple-muted)",
          color: "var(--text-lavender)",
        }}
        onFocus={(event) => {
          event.target.style.borderColor = "var(--pink-main)";
          event.target.style.boxShadow = "0 0 0 3px var(--pink-glow)";
        }}
        onBlur={(event) => {
          event.target.style.borderColor = "var(--purple-muted)";
          event.target.style.boxShadow = "none";
        }}
      />

      <div className="text-right bubble-heading text-[12px]" style={{ color: isValid ? "var(--success)" : "var(--danger)" }}>
        {isValid ? `${count} chars` : `Need ${minCharacters} chars to submit`}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button type="button" onClick={onSubmit} disabled={!isValid || disabled} className="btn-primary w-full sm:w-auto">
          ?? Submit
        </button>
        <button type="button" onClick={onSkip} className="btn-ghost self-end sm:self-auto" disabled={disabled}>
          ??? Skip Round
        </button>
      </div>
    </div>
  );
}

export default AnswerInput;

