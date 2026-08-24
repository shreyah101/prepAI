import { CheckCircle2, CornerDownLeft, Edit3, SkipForward, Zap } from "lucide-react";
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
    ref.current.style.height = `${Math.max(140, ref.current.scrollHeight)}px`;
  }, [value]);

  return (
    <div className="neo-card p-6 md:p-8 space-y-4">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-black pb-3">
        <div className="flex items-center gap-2">
          <span className="neo-badge neo-badge-yellow">INPUT *</span>
          <label htmlFor="answer-input" className="font-mono text-xs font-black uppercase text-black">
            YOUR ANSWER & SOLUTION
          </label>
        </div>

        {/* Live character badge */}
        <div
          className={`font-mono text-xs font-bold border-2 border-black px-2.5 py-0.5 shadow-neo-sm ${
            isValid ? "bg-neo-green text-black" : "bg-neo-cream text-neutral-800"
          }`}
        >
          {isValid ? (
            <span className="flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" />
              {count} CHARS (READY)
            </span>
          ) : (
            <span>
              {count} / {minCharacters} MIN CHARACTERS
            </span>
          )}
        </div>
      </div>

      {/* Textarea */}
      <div className="relative">
        <textarea
          id="answer-input"
          ref={ref}
          rows={6}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder="Type or paste your detailed answer here... (Include core principles, architectural choices, code snippets, or real-world examples)"
          className="neo-input font-mono text-sm leading-relaxed min-h-[150px] resize-y placeholder:text-neutral-400"
        />
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
        <button
          type="button"
          onClick={onSkip}
          disabled={disabled}
          className="btn-neo btn-neo-ghost text-xs"
        >
          <SkipForward className="h-4 w-4 stroke-[2.5]" />
          SKIP THIS ROUND
        </button>

        <button
          type="button"
          onClick={onSubmit}
          disabled={!isValid || disabled}
          className="btn-neo btn-neo-yellow text-xs font-black"
        >
          <Zap className="h-4 w-4 fill-black stroke-black" />
          SUBMIT FOR AI EVALUATION
          <CornerDownLeft className="h-3.5 w-3.5 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
}

export default AnswerInput;
