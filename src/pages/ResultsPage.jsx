import { ChevronDown, RotateCcw, Trophy } from "lucide-react";
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
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="glass-panel p-8 text-center">
          <h1 className="text-2xl font-semibold text-white">No results yet</h1>
          <p className="mt-3 text-slate-300">Finish an interview first, then your score breakdown will appear here.</p>
          <button type="button" onClick={() => navigate("/interview")} className="primary-button mx-auto mt-6">
            Start Interview
          </button>
        </div>
      </section>
    );
  }

  const performanceLabel =
    result.totalScore >= 70 ? "Strong" : result.totalScore >= 40 ? "Average" : "Needs Work";

  const handleSave = async () => {
    if (saved) return;

    try {
      await saveSession({
        ...result,
        uid: user.uid,
      });
      toast.success("Session saved to your history");
      setSaved(true);
    } catch (error) {
      toast.error(error.message || "Unable to save session.");
    }
  };

  return (
    <section className="mx-auto max-w-5xl space-y-8 px-6 py-12">
      <div className="glass-panel grid gap-8 p-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col items-center justify-center gap-5 text-center">
          <ScoreGauge score={result.totalScore} />
          <div>
            <div className="eyebrow mx-auto">Performance summary</div>
            <h1 className="mt-3 text-3xl font-semibold text-white">{performanceLabel}</h1>
            <p className="mt-2 text-slate-300">
              {result.role} · {result.interviewType} · {result.difficulty}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="mb-3 flex items-center gap-2 text-white">
              <Trophy className="h-5 w-5 text-indigo-200" />
              <span className="font-semibold">Strengths</span>
            </div>
            <div className="space-y-2 text-sm leading-7 text-slate-300">
              {summary?.strengths.map((item, index) => (
                <p key={`${item}-${index}`}>{item}.</p>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="mb-3 font-semibold text-white">Weaknesses</div>
            <div className="space-y-2 text-sm leading-7 text-slate-300">
              {summary?.weaknesses.map((item, index) => (
                <p key={`${item}-${index}`}>{item}.</p>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={handleSave} className="primary-button">
              {saved ? "Saved to History" : "Save Session"}
            </button>
            <button type="button" onClick={() => navigate("/interview")} className="ghost-button">
              <RotateCcw className="h-4 w-4" />
              Try Again
            </button>
            <button
              type="button"
              onClick={() => navigate("/interview", { state: { reset: true } })}
              className="ghost-button"
            >
              Change Role
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="eyebrow">Per-question breakdown</div>
        {result.questions.map((item, index) => {
          const open = expanded === item.id;
          return (
            <div key={`${item.id}-${index}`} className="glass-panel overflow-hidden">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                onClick={() => setExpanded(open ? null : item.id)}
              >
                <div>
                  <div className="text-sm text-slate-400">Question {index + 1}</div>
                  <div className="mt-1 text-white">{item.question}</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-sm font-semibold text-white">{item.score}/10</div>
                  <ChevronDown className={`h-4 w-4 text-slate-400 transition ${open ? "rotate-180" : ""}`} />
                </div>
              </button>

              {open ? (
                <div className="space-y-4 border-t border-white/10 px-5 py-5 text-sm text-slate-300">
                  <ResultRow label="Your answer" value={item.answer} />
                  <ResultRow label="Feedback" value={item.improvements} />
                  <ResultRow label="Strengths" value={item.strengths} />
                  <ResultRow label="Model answer" value={item.model_answer} />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ResultRow({ label, value }) {
  return (
    <div>
      <div className="mb-1 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">{label}</div>
      <p className="leading-7 text-slate-300">{value}</p>
    </div>
  );
}

export default ResultsPage;
