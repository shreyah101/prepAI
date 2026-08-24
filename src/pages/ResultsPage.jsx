import {
  ArrowRight,
  Award,
  CheckCircle2,
  ChevronDown,
  FileSpreadsheet,
  RotateCcw,
  Save,
  Sparkles,
  Trophy,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import ScoreGauge from "../components/ScoreGauge";
import { useAuth } from "../hooks/useAuth";
import { getLatestResult, saveSession } from "../lib/sessionStore";

function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [expanded, setExpanded] = useState(null);
  const [saved, setSaved] = useState(false);
  const result = location.state?.result || getLatestResult();

  const summary = useMemo(() => {
    if (!result) return null;

    const strengths = result.questions
      .map((item) => item.strengths)
      .join(" ")
      .split(".")
      .map((item) => item.trim())
      .filter(Boolean)
      .slice(0, 3);

    const weaknesses = result.questions
      .map((item) => item.improvements)
      .join(" ")
      .split(".")
      .map((item) => item.trim())
      .filter(Boolean)
      .slice(0, 3);

    return { strengths, weaknesses };
  }, [result]);

  if (!result) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <div className="neo-card p-10 space-y-4 bg-white">
          <div className="flex h-16 w-16 mx-auto items-center justify-center border-2 border-black bg-neo-yellow shadow-neo">
            <Trophy className="h-8 w-8 text-black" />
          </div>
          <h2 className="font-black text-2xl uppercase tracking-tight text-black">
            NO BATTLE REPORT AVAILABLE
          </h2>
          <p className="font-mono text-xs text-neutral-600">
            Complete a mock interview round first to generate a full performance diagnostic report.
          </p>
          <button
            type="button"
            onClick={() => navigate("/interview")}
            className="btn-neo btn-neo-yellow text-xs font-black"
          >
            START AN INTERVIEW RUN →
          </button>
        </div>
      </div>
    );
  }

  const rank = getRank(result.totalScore);
  const xpEarned = result.totalScore * 10;

  const handleSave = async () => {
    if (saved) return;
    try {
      await saveSession({ ...result, uid: user?.uid });
      toast.success("Battle Report saved to Quest Log!");
      setSaved(true);
    } catch (error) {
      toast.error(error.message || "Unable to save session.");
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Dark Masthead */}
      <section className="border-b-[2.5px] border-black bg-[#111111] px-4 py-8 md:py-10 text-white">
        <div className="mx-auto max-w-6xl space-y-2">
          <div className="flex items-center gap-2">
            <span className="border-2 border-black bg-neo-yellow px-2.5 py-0.5 font-mono text-xs font-black uppercase text-black">
              BATTLE REPORT
            </span>
            <span className="font-mono text-xs text-neutral-400">
              PERFORMANCE AUDIT
            </span>
          </div>
          <h1 className="font-black italic uppercase tracking-tight text-3xl sm:text-4xl text-white">
            EVALUATION <span className="text-neo-yellow">SUMMARY</span>
          </h1>
          <p className="font-mono text-xs text-neutral-300">
            FINAL VERDICT, MULTI-AXIS GRADES, AND STRATEGIC IMPROVEMENT TARGETS.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-8 px-4 sm:px-6">
        {/* Main Verdict Card */}
        <div className="neo-card p-6 md:p-8 bg-white">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
            {/* Left: Score & Rank */}
            <div className="flex flex-col items-center justify-center gap-4 border-b-2 lg:border-b-0 lg:border-r-2 border-black pb-6 lg:pb-0 lg:pr-8 text-center">
              <div className="flex flex-wrap justify-center gap-2">
                <span className="border border-black bg-neo-yellow px-3 py-1 font-mono text-xs font-black uppercase text-black">
                  {result.role}
                </span>
                <span className="border border-black bg-neutral-100 px-3 py-1 font-mono text-xs font-bold uppercase text-neutral-800">
                  {result.difficulty} • {result.interviewType}
                </span>
              </div>

              {/* Gauge */}
              <ScoreGauge score={result.totalScore} />

              {/* Rank Tag */}
              <div
                className={`border-2 border-black ${rank.bg} px-5 py-2 font-black text-xl text-black uppercase shadow-neo-sm flex items-center gap-2`}
              >
                <Award className="h-5 w-5 stroke-[2.5]" />
                <span>{rank.label}</span>
              </div>

              {/* XP reward tag */}
              <div className="border-2 border-black bg-black px-4 py-1.5 font-mono text-xs font-bold uppercase text-neo-yellow shadow-neo-sm flex items-center gap-1.5">
                <Zap className="h-4 w-4 fill-neo-yellow" />
                <span>+{xpEarned} XP GAINED</span>
              </div>
            </div>

            {/* Right: Key Strengths & Weaknesses */}
            <div className="space-y-5">
              <div className="border-2 border-black bg-emerald-50/60 p-4 shadow-neo-sm space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center border border-black bg-neo-green">
                    <CheckCircle2 className="h-4 w-4 text-black stroke-[2.5]" />
                  </div>
                  <span className="font-mono text-xs font-black uppercase text-black">
                    CORE POWER MOVES
                  </span>
                </div>
                <div className="space-y-1.5 font-mono text-xs leading-relaxed text-neutral-800">
                  {summary?.strengths.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-700 font-bold">✓</span>
                      <span>{item}.</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-2 border-black bg-amber-50/60 p-4 shadow-neo-sm space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center border border-black bg-neo-orange">
                    <Sparkles className="h-4 w-4 text-black stroke-[2.5]" />
                  </div>
                  <span className="font-mono text-xs font-black uppercase text-black">
                    PRIORITY LEVEL UP TARGETS
                  </span>
                </div>
                <div className="space-y-1.5 font-mono text-xs leading-relaxed text-neutral-800">
                  {summary?.weaknesses.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <span className="text-amber-700 font-bold">●</span>
                      <span>{item}.</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saved}
                  className="btn-neo btn-neo-yellow text-xs font-black flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  <span>{saved ? "SAVED TO QUEST LOG" : "SAVE BATTLE REPORT"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/interview")}
                  className="btn-neo btn-neo-white text-xs font-black flex items-center gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>RETRY THIS ROLE</span>
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/interview", { state: { reset: true } })}
                  className="btn-neo btn-neo-ghost text-xs"
                >
                  SWITCH ROLE →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Round by Round Breakdown Accordion */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b-2 border-black pb-3">
            <span className="border-2 border-black bg-neo-yellow px-2.5 py-0.5 font-mono text-xs font-black uppercase text-black">
              AUDIT TRAIL
            </span>
            <h2 className="font-black text-xl uppercase tracking-tight text-black">
              QUESTION & ANSWER BREAKDOWN ({result.questions.length} ROUNDS)
            </h2>
          </div>

          <div className="space-y-3">
            {result.questions.map((item, index) => {
              const isOpen = expanded === (item.id || index);
              const roundScore = item.score ?? 0;
              const roundRank = getRank(roundScore * 10);

              return (
                <div
                  key={item.id || index}
                  className="neo-card bg-white overflow-hidden transition"
                >
                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? null : (item.id || index))}
                    className="w-full flex flex-wrap items-center justify-between gap-4 p-5 text-left hover:bg-neutral-50"
                  >
                    <div className="flex items-center gap-3">
                      <span className="border-2 border-black bg-black px-2.5 py-0.5 font-mono text-xs font-black text-white">
                        Q{index + 1}
                      </span>
                      <span className="font-black text-base uppercase text-black">
                        {item.topic || `Round ${index + 1}`}
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-neutral-500">
                          SCORE:
                        </span>
                        <span className="font-mono font-black text-base text-black">
                          {roundScore}/10
                        </span>
                      </div>

                      <span
                        className={`border border-black ${roundRank.bg} px-2.5 py-0.5 font-mono text-[10px] font-bold text-black uppercase shadow-neo-sm`}
                      >
                        {roundRank.letter}-RANK
                      </span>

                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="border-t-2 border-black p-6 space-y-4 bg-neutral-50 font-mono text-xs">
                      <div>
                        <span className="font-black text-neutral-500 uppercase block mb-1">
                          QUESTION PROMPT:
                        </span>
                        <p className="font-bold text-black text-sm">
                          {item.question}
                        </p>
                      </div>

                      <div className="border-2 border-black bg-white p-4">
                        <span className="font-black text-neutral-500 uppercase block mb-1">
                          YOUR SUBMISSION:
                        </span>
                        <p className="text-neutral-800 leading-relaxed whitespace-pre-wrap">
                          {item.answer || "No response submitted."}
                        </p>
                      </div>

                      <div className="grid gap-3 md:grid-cols-2">
                        <div className="border border-black bg-emerald-50 p-3">
                          <span className="font-black text-emerald-900 uppercase block mb-1">
                            ✓ HIGHLIGHTS:
                          </span>
                          <p className="text-neutral-800">{item.strengths}</p>
                        </div>

                        <div className="border border-black bg-amber-50 p-3">
                          <span className="font-black text-amber-900 uppercase block mb-1">
                            ⚡ IMPROVEMENT:
                          </span>
                          <p className="text-neutral-800">{item.improvements}</p>
                        </div>
                      </div>

                      {item.model_answer && (
                        <div className="border-2 border-black bg-[#111111] p-4 text-white">
                          <span className="text-neo-yellow font-black uppercase block mb-1">
                            BENCHMARK ANSWER:
                          </span>
                          <p className="text-neutral-200 leading-relaxed whitespace-pre-wrap">
                            {item.model_answer}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

function getRank(score) {
  if (score >= 85) return { letter: "S", label: "S-RANK MASTERCLASS", bg: "bg-neo-yellow" };
  if (score >= 70) return { letter: "A", label: "A-RANK SOLID PERFORMANCE", bg: "bg-neo-cyan" };
  if (score >= 50) return { letter: "B", label: "B-RANK AVERAGE RUN", bg: "bg-neo-orange" };
  return { letter: "C", label: "C-RANK NEEDS REVISION", bg: "bg-neo-pink" };
}

export default ResultsPage;
