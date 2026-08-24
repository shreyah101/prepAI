import {
  AlertTriangle,
  Award,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Lightbulb,
  Sparkles,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";

function FeedbackCard({ feedback }) {
  const [showModelAnswer, setShowModelAnswer] = useState(false);
  const rankInfo = useMemo(() => getRankInfo(feedback), [feedback]);

  return (
    <div className="neo-card p-6 md:p-8 space-y-6 bg-white">
      {/* Top Banner Verdict & Score Strip */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b-2 border-black pb-6">
        {/* Rank & Verdict */}
        <div className="flex items-center gap-4">
          <div
            className={`flex h-16 w-16 items-center justify-center border-2 border-black ${rankInfo.bg} font-black text-2xl text-black shadow-neo-sm`}
          >
            {rankInfo.letter}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="neo-badge neo-badge-dark">ROUND VERDICT</span>
              <span className="font-mono text-xs font-bold text-neutral-600 uppercase">
                {feedback.verdict || "Evaluated"}
              </span>
            </div>
            <h3 className="font-black text-xl uppercase tracking-tight text-black mt-1">
              {rankInfo.title}
            </h3>
          </div>
        </div>

        {/* Score & XP */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center justify-center border-2 border-black bg-white px-5 py-2 text-center shadow-neo-sm">
            <span className="font-mono text-[10px] font-bold uppercase text-neutral-500">
              ROUND SCORE
            </span>
            <span className="font-black text-2xl text-black">
              {feedback.score} <span className="text-sm font-bold text-neutral-500">/ 10</span>
            </span>
          </div>

          <div className="flex flex-col items-center justify-center border-2 border-black bg-neo-yellow px-5 py-2 text-center shadow-neo-sm">
            <span className="font-mono text-[10px] font-bold uppercase text-black">
              XP REWARD
            </span>
            <span className="flex items-center gap-1 font-black text-2xl text-black">
              <Zap className="h-4 w-4 fill-black" />
              +{feedback.score * 10}
            </span>
          </div>
        </div>
      </div>

      {/* Multi-Dimensional Feedback Blocks */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Strengths */}
        <div className="border-2 border-black bg-emerald-50/60 p-4 shadow-neo-sm space-y-2">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center border border-black bg-neo-green">
              <CheckCircle2 className="h-4 w-4 text-black stroke-[2.5]" />
            </div>
            <span className="font-mono text-xs font-black uppercase text-black">
              POWER MOVES (STRENGTHS)
            </span>
          </div>
          <p className="text-sm leading-relaxed text-neutral-800">
            {feedback.strengths}
          </p>
        </div>

        {/* Improvements */}
        <div className="border-2 border-black bg-amber-50/60 p-4 shadow-neo-sm space-y-2">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center border border-black bg-neo-orange">
              <AlertTriangle className="h-4 w-4 text-black stroke-[2.5]" />
            </div>
            <span className="font-mono text-xs font-black uppercase text-black">
              LEVEL UP AREAS (GROWTH)
            </span>
          </div>
          <p className="text-sm leading-relaxed text-neutral-800">
            {feedback.improvements}
          </p>
        </div>
      </div>

      {/* Strategic Tip */}
      {feedback.tip && (
        <div className="border-2 border-black bg-neo-cream p-4 shadow-neo-sm flex items-start gap-3">
          <div className="flex h-6 w-6 items-center justify-center border border-black bg-neo-yellow shrink-0 mt-0.5">
            <Lightbulb className="h-4 w-4 text-black stroke-[2.5]" />
          </div>
          <div>
            <span className="font-mono text-xs font-black uppercase text-black block mb-1">
              STRATEGIC INTERVIEWER INSIGHT
            </span>
            <p className="text-xs font-mono leading-relaxed text-neutral-900">
              {feedback.tip}
            </p>
          </div>
        </div>
      )}

      {/* Model Answer Accordion */}
      {feedback.model_answer && (
        <div className="space-y-2 pt-2">
          <button
            type="button"
            onClick={() => setShowModelAnswer((val) => !val)}
            className="w-full flex items-center justify-between border-2 border-black bg-neutral-100 px-4 py-2.5 font-mono text-xs font-black uppercase text-black shadow-neo-sm transition hover:bg-neutral-200"
          >
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>{showModelAnswer ? "HIDE BENCHMARK MODEL ANSWER" : "VIEW BENCHMARK MODEL ANSWER"}</span>
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform ${showModelAnswer ? "rotate-180" : ""}`} />
          </button>

          {showModelAnswer && (
            <div className="border-2 border-black bg-[#111111] p-5 text-white font-mono text-xs leading-relaxed shadow-neo-sm space-y-2">
              <span className="text-neo-yellow font-bold uppercase block mb-1">
                // IDEAL BENCHMARK RESPONSE:
              </span>
              <p className="text-neutral-200 whitespace-pre-wrap">{feedback.model_answer}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function getRankInfo(feedback) {
  const verdict = feedback.verdict?.toLowerCase() || "";
  const score = feedback.score || 0;

  if (score >= 9 || verdict.includes("excellent")) {
    return { letter: "S", title: "S-RANK MASTERCLASS", bg: "bg-neo-yellow" };
  }
  if (score >= 7 || verdict.includes("good")) {
    return { letter: "A", title: "A-RANK SOLID DELIVERY", bg: "bg-neo-cyan" };
  }
  if (score >= 5 || verdict.includes("average")) {
    return { letter: "B", title: "B-RANK AVERAGE RUN", bg: "bg-neo-orange" };
  }
  return { letter: "C", title: "C-RANK NEEDS POLISH", bg: "bg-neo-pink" };
}

export default FeedbackCard;
