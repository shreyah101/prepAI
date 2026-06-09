import { Shield, Sparkles, Target, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const features = [
  {
    icon: <Target className="h-8 w-8 text-[var(--neon-cyan)]" />,
    title: "10+ JOB CLASSES",
    desc: "Choose your role and face tailored questions.",
    color: "var(--neon-cyan)",
  },
  {
    icon: <Zap className="h-8 w-8 text-[var(--neon-purple)]" />,
    title: "AI BATTLE SCORING",
    desc: "Get instant XP, rank, and improvement tips.",
    color: "var(--neon-purple)",
  },
  {
    icon: <Sparkles className="h-8 w-8 text-[var(--neon-pink)]" />,
    title: "TRACK YOUR XP",
    desc: "Build streaks, earn gems, and level up your profile.",
    color: "var(--neon-pink)",
  },
];

function LandingPage() {
  const { user, signIn, isDemo } = useAuth();

  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col">
      <main className="flex-1">
        <section className="relative overflow-hidden px-4 py-16 md:py-24">
          <div className="mx-auto max-w-5xl text-center">
            <div className="mb-8 flex justify-center">
              <div className="eyebrow border-[var(--neon-cyan-dim)] text-[var(--neon-cyan)]">
                <Shield className="h-4 w-4" />
                CAREER SIMULATOR MODE
              </div>
            </div>

            <div className="mb-4">
              <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-[var(--neon-cyan)]">
                • INTERACTIVE SIMULATION •
              </span>
            </div>

            <h1 className="hero-title drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              PREP AI<span className="text-[var(--neon-purple)]">. EXE</span>
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-[14px] font-bold uppercase tracking-[0.1em] text-[var(--text-muted)]">
              PRESS ENTER TO START MOCK INTERVIEW
            </p>

            <div className="mt-12 flex justify-center">
              {user ? (
                <Link to="/interview" state={{ reset: true }} className="btn-primary min-w-[200px]">
                  ▶ START MOCK INTERVIEW
                </Link>
              ) : (
                <button type="button" onClick={signIn} className="btn-primary min-w-[200px]">
                  ▶ START MOCK INTERVIEW
                </button>
              )}
            </div>

            <div className="mt-8 flex justify-center gap-8 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--text-dim)]">
              <span>• USE MOUSE TO NAVIGATE</span>
              <span>• USE OF AI TO ANSWER QUESTIONS IS NOT RECOMMENDED</span>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-20">
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="game-card p-8 text-center"
              >
                <div
                  className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-[12px] bg-[var(--bg-surface)] border border-[var(--border-subtle)]"
                  style={{ boxShadow: `0 0 20px ${feature.color}20` }}
                >
                  {feature.icon}
                </div>
                <h3 className="pixel-heading mb-3 text-[16px] text-white">
                  {feature.title}
                </h3>
                <p className="text-[14px] leading-relaxed text-[var(--text-muted)]">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-12 pb-24 md:px-6">
          <div className="game-card flex flex-col items-center justify-center gap-8 p-10 md:flex-row md:justify-around">
            <div className="text-center">
              <div className="pixel-heading text-4xl text-[var(--neon-purple)]" style={{ textShadow: "0 0 15px rgba(168,85,247,0.4)" }}>
                500+
              </div>
              <div className="mt-2 text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--text-dim)]">
                QUESTS PLAYED
              </div>
            </div>
            <div className="text-center">
              <div className="pixel-heading text-4xl text-[var(--neon-cyan)]" style={{ textShadow: "0 0 15px rgba(6,182,212,0.4)" }}>
                8
              </div>
              <div className="mt-2 text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--text-dim)]">
                JOB CLASSES
              </div>
            </div>
            <div className="text-center">
              <div className="pixel-heading text-4xl text-[var(--neon-pink)]" style={{ textShadow: "0 0 15px rgba(244,63,94,0.4)" }}>
                AI
              </div>
              <div className="mt-2 text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--text-dim)]">
                POWERED
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center text-[12px] font-bold uppercase tracking-wider text-[var(--text-dim)]">
            PREP AI - A MOCK INTERVIEW SIMULATOR
          </div>
        </section>
      </main>

      {isDemo ? (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--neon-purple)] py-2 text-center text-[10px] font-bold uppercase tracking-widest text-black">
          Demo mode is active until Firebase is wired in.
        </div>
      ) : null}
    </div>
  );
}

export default LandingPage;
