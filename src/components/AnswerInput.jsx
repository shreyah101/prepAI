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
  const isValid = value.trim().length >= minCharacters;

  useEffect(() => {
    if (!ref.current) return;
    ref.current.style.height = "0px";
    ref.current.style.height = `${ref.current.scrollHeight}px`;
  }, [value]);

  return (
    <div className="glass-panel space-y-4 p-6 md:p-8">
      <label className="block text-sm font-medium text-slate-200" htmlFor="answer">
        Your answer
      </label>
      <textarea
        id="answer"
        ref={ref}
        rows={5}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Write your answer as if you're in the real interview. Use structure, examples, and trade-offs."
        className="min-h-[140px] w-full resize-none rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition focus:border-indigo-400/60"
      />

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1 text-sm text-slate-400">
          <div>{value.trim().length} characters</div>
          {!isValid ? (
            <div className="text-amber-300">Please write at least {minCharacters} characters.</div>
          ) : null}
        </div>

        <div className="flex gap-3">
          <button type="button" onClick={onSkip} className="ghost-button" disabled={disabled}>
            Skip
          </button>
          <button
            type="button"
            onClick={onSubmit}
            disabled={!isValid || disabled}
            className="primary-button"
          >
            Submit Answer
          </button>
        </div>
      </div>
    </div>
  );
}

export default AnswerInput;
