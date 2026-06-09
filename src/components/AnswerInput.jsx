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
    <div className="p-6 md:p-8">
      <label className="section-label block mb-4 text-[var(--neon-pink)]" htmlFor="answer">
        YOUR RESPONSE
      </label>
      <textarea
        id="answer"
        ref={ref}
        rows={5}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="> Type your answer to execute action..."
        className="min-h-[130px] w-full resize-y rounded-[8px] border px-4 py-4 text-[14px] font-mono outline-none transition-all"
        style={{
          background: "rgba(0,0,0,0.3)",
          borderColor: "var(--border-subtle)",
          color: "var(--text-main)",
        }}
        onFocus={(event) => {
          event.target.style.borderColor = "var(--neon-cyan)";
          event.target.style.boxShadow = "0 0 15px var(--neon-cyan-dim)";
          event.target.style.background = "rgba(6,182,212,0.05)";
        }}
        onBlur={(event) => {
          event.target.style.borderColor = "var(--border-subtle)";
          event.target.style.boxShadow = "none";
          event.target.style.background = "rgba(0,0,0,0.3)";
        }}
      />

      <div className="text-right text-[11px] font-bold uppercase tracking-wider mb-6 mt-2" style={{ color: isValid ? "var(--neon-cyan)" : "var(--neon-pink)" }}>
        {isValid ? `${count} CHARS ACCEPTED` : `NEED ${minCharacters} CHARS TO EXECUTE`}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button type="button" onClick={onSubmit} disabled={!isValid || disabled} className="btn-primary w-full sm:w-auto">
          EXECUTE ACTION
        </button>
        <button type="button" onClick={onSkip} className="btn-ghost self-end sm:self-auto" disabled={disabled}>
          SKIP ROUND
        </button>
      </div>
    </div>
  );
}

export default AnswerInput;

