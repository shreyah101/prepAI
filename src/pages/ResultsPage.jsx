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
      <section className="mx-auto max-w-3xl px-4 py-10 md:px-6">
        <div className="game-card p-8 text-center">
          <h1 className="pixel-heading text-[14px] leading-7 text-white">No battle report yet</h1>
          <p className="mt-3 text-sm text-[var(--text-muted)]">Finish a quest first, then your report appears here.</p>
          <button type="button" onClick={() => navigate("/interview")} className="btn-primary mx-auto mt-6">
            ? Start Quest
          </button>
        </div>
      </section>
    );
  }

  const rank = getRank(result.totalScore);

  const handleSave = async () => {
    if (saved) return;
    try {
      await saveSession({ ...result, uid: user.uid });
      toast.success("Quest saved to your log");
      setSaved(true);
    } catch (error) {
      toast.error(error.message || "Unable to save quest.");
    }
  };

  return (
    <section className="mx-auto max-w-6xl space-y-8 px-4 py-8 md:px-6 md:py-10">
      <div className="game-card relative overflow-hidden p-8">
        {result.totalScore >= 70
          ? Array.from({ length: 20 }).map((_, index) => (
              <div
                key={index}
                className="confetti absolute h-1 w-1"
                style={{
                  left: `${5 + index * 4.5}%`,
                  top: "10px",
                  background: ["var(--pink-bright)", "var(--purple-bright)", "var(--gold)", "var(--info)"][index % 4],
                  animationDelay: `${index * 0.08}s`,
                }}
              />
            ))
          : null}

        <div className="relative z-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col items-center justify-center gap-5 text-center">
            <div className="pixel-heading text-[20px] leading-8 text-white">BATTLE REPORT</div>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="hud-pill hud-pill-pink">?? {result.role}</span>
              <span className="hud-pill">{displayDifficulty(result.difficulty)}</span>
            </div>
            <div className="text-[13px] text-[var(--text-dim)]">{new Date().toLocaleString()}</div>
            <ScoreGauge score={result.totalScore} />
            <div className="rank-badge rank-pop" style={{ color: toneForScore(result.totalScore) }}>{rank}</div>
          </div>

          <div className="space-y-6">
            <div className="pixel-heading text-[14px] leading-7 text-[var(--pink-pale)]">+ {result.totalScore * 10} XP EARNED</div>

            <div className="game-card p-5">
              <div className="mb-3 flex items-center gap-2 text-white">
                <Trophy className="h-5 w-5 text-[var(--gold)]" />
                <span className="bubble-heading text-[18px]">Power Moves</span>
              </div>
              <div className="space-y-2 text-sm leading-7 text-[var(--text-muted)]">
                {summary?.strengths.map((item, index) => (
                  <p key={`${item}-${index}`}>? {item}.</p>
                ))}
              </div>
            </div>

            <div className="game-card p-5">
              <div className="bubble-heading text-[18px] text-white">?? Level Up Areas</div>
              <div className="mt-3 space-y-2 text-sm leading-7 text-[var(--text-muted)]">
                {summary?.weaknesses.map((item, index) => (
                  <p key={`${item}-${index}`}>• {item}.</p>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={handleSave} className="btn-primary">
                {saved ? "Quest Saved" : "Save Quest"}
              </button>
              <button type="button" onClick={() => navigate("/interview")} className="btn-secondary">
                <RotateCcw className="h-4 w-4" />
                ?? Retry Quest
              </button>
              <button type="button" onClick={() => navigate("/interview", { state: { reset: true } })} className="btn-ghost">
                ?? Switch Class
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="section-label">? Round Breakdown</div>
        {result.questions.map((item, index) => {
          const open = expanded === item.id;
          const tone = toneForScore((item.score / 10) * 100);
          return (
            <div key={`${item.id}-${index}`} className="game-card overflow-hidden">
              <button
                type="button"
                className="flex w-full flex-wrap items-center justify-between gap-4 px-5 py-4 text-left"
                onClick={() => setExpanded(open ? null : item.id)}
              >
                <div className="flex items-center gap-3">
                  <span className="bubble-heading text-[13px] text-[var(--text-muted)]">Q{index + 1}</span>
                  <span className="hud-pill hud-pill-purple">{item.topic}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-[100px]">
                    <div className="progress-track">
                      <div className="progress-fill" style={{ width: `${item.score * 10}%`, background: tone }} />
                    </div>
                  </div>
                  <span className="rank-badge" style={{ color: tone }}>{getRank(item.score * 10)}</span>
                  <ChevronDown className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`} />
                </div>
              </button>

              {open ? (
                <div className="space-y-4 border-t-2 px-5 py-5 text-sm text-[var(--text-muted)]" style={{ borderColor: "var(--purple-muted)" }}>
                  <ResultRow label="Your Answer" value={item.answer} />
                  <ResultRow label="AI Feedback" value={item.improvements} />
                  <ResultRow label="Power Move" value={item.strengths} />
                  <ResultRow label="Model Answer" value={item.model_answer} />
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
      <div className="bubble-heading text-[13px] text-white">{label}</div>
      <p className="mt-2 leading-7 text-[var(--text-muted)]">{value}</p>
    </div>
  );
}

function getRank(score) {
  if (score >= 80) return "S Rank ??";
  if (score >= 60) return "A Rank ?";
  if (score >= 40) return "B Rank";
  return "C Rank";
}

function toneForScore(score) {
  if (score >= 70) return "var(--success)";
  if (score >= 40) return "var(--warning)";
  return "var(--danger)";
}

function displayDifficulty(difficulty) {
  if (difficulty === "Easy") return "? Rookie";
  if (difficulty === "Medium") return "?? Warrior";
  if (difficulty === "Hard") return "?? Legend";
  return difficulty;
}

export default ResultsPage;

