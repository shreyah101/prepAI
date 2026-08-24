import { HelpCircle, Sparkles, Terminal } from "lucide-react";

function QuestionCard({ question, index }) {
  return (
    <div className="neo-card p-6 md:p-8 space-y-4">
      {/* Top Meta Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-black pb-4">
        <div className="flex items-center gap-2">
          <span className="border-2 border-black bg-neo-yellow px-3 py-1 font-mono text-xs font-black uppercase text-black shadow-neo-sm">
            ROUND {index + 1}
          </span>
          <span className="border-2 border-black bg-neo-cyan px-2.5 py-1 font-mono text-xs font-bold uppercase text-black shadow-neo-sm">
            {question.topic || "TECHNICAL CORE"}
          </span>
        </div>

        <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-neutral-600">
          <Terminal className="h-3.5 w-3.5" />
          <span>AI QUESTION GENERATOR</span>
        </div>
      </div>

      {/* Main Question Heading */}
      <div className="pt-2">
        <span className="neo-label text-neutral-500 block mb-2">
          QUESTION PROMPT *
        </span>
        <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-black leading-snug">
          {question.question}
        </h2>
      </div>

      {/* Tip / Guidance Banner */}
      <div className="mt-4 flex items-start gap-2.5 border-2 border-black bg-neutral-100 p-3 font-mono text-xs text-neutral-800 shadow-neo-sm">
        <Sparkles className="h-4 w-4 shrink-0 text-black mt-0.5" />
        <div>
          <span className="font-bold">PRO-TIP:</span> Provide a structured response with clear definitions, practical architectural examples, and edge cases or trade-offs.
        </div>
      </div>
    </div>
  );
}

export default QuestionCard;
