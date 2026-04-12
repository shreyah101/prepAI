import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const features = [
  { emoji: "??", title: "10+ Job Classes", text: "Choose your role and face tailored questions." },
  { emoji: "??", title: "AI Battle Scoring", text: "Get instant XP, rank, and improvement tips." },
  { emoji: "??", title: "Track Your XP", text: "Build streaks, earn gems, and level up your profile." },
];

const stars = [
  { left: "8%", top: "14%" },
  { left: "16%", top: "24%" },
  { left: "29%", top: "12%" },
  { left: "42%", top: "18%" },
  { left: "57%", top: "10%" },
  { left: "66%", top: "22%" },
  { left: "74%", top: "15%" },
  { left: "82%", top: "8%" },
  { left: "90%", top: "26%" },
];

const sparkles = [
  { left: "22%", bottom: "112px", delay: "0s" },
  { left: "34%", bottom: "120px", delay: "0.6s" },
  { left: "53%", bottom: "116px", delay: "1.1s" },
  { left: "70%", bottom: "118px", delay: "1.7s" },
  { left: "81%", bottom: "112px", delay: "2.2s" },
];

function LandingPage() {
  const { user, signIn, loading, authError, firebaseEnabled } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      const target = location.state?.from?.pathname || "/interview";
      navigate(target, { replace: true });
    }
  }, [location.state, navigate, user]);

  return (
    <section className="game-shell mx-auto max-w-7xl space-y-10 px-4 py-8 md:px-6 md:py-10">
      {!navigator.onLine ? (
        <div className="game-card px-4 py-3 text-sm" style={{ borderColor: "var(--warning)", color: "var(--warning)" }}>
          You appear to be offline.
        </div>
      ) : null}

      <div className="pixel-scene">
        {stars.map((star, index) => (
          <div key={`${star.left}-${star.top}`} className={`star ${index % 2 === 0 ? "twinkle" : ""}`} style={star} />
        ))}

        <div className="pixel-cloud" style={{ left: "10%", top: "16%", transform: "scale(1.4)" }} />
        <div className="pixel-cloud" style={{ left: "58%", top: "20%", transform: "scale(1.1)" }} />
        <div className="pixel-cloud" style={{ left: "78%", top: "12%", transform: "scale(0.8)" }} />

        <div className="hill hill-left" />
        <div className="hill hill-center" />
        <div className="hill hill-right" />

        <div className="pixel-tree" style={{ left: "8%" }} />
        <div className="pixel-tree" style={{ left: "18%" }} />
        <div className="pixel-tree" style={{ right: "18%" }} />
        <div className="pixel-tree" style={{ right: "8%" }} />

        {["12%", "20%", "28%", "37%", "48%", "59%", "68%", "76%", "85%"].map((left, index) => (
          <div key={left} className="pixel-flower" style={{ left, bottom: index % 2 === 0 ? "72px" : "76px" }} />
        ))}

        {sparkles.map((sparkle) => (
          <div key={sparkle.left} className="sparkle" style={{ left: sparkle.left, bottom: sparkle.bottom, animationDelay: sparkle.delay }} />
        ))}

        <div className="pixel-scene-grass" />
        <div className="pixel-scene-ground" />

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
          <div className="eyebrow">? START YOUR INTERVIEW ADVENTURE ?</div>
          <h1 className="pixel-heading mt-6 text-[18px] leading-[1.7] text-white md:text-[28px]" style={{ textShadow: "3px 3px 0 var(--purple-dark)" }}>
            Ace Every
            <br />
            <span style={{ color: "var(--pink-bright)" }}>Interview</span>
          </h1>
          <p className="mt-4 max-w-xl text-sm text-[var(--text-muted)] md:text-[14px]">
            Level up your career, one quest at a time.
          </p>
          <button
            type="button"
            onClick={() => (user ? navigate("/interview") : signIn())}
            disabled={loading}
            className="btn-primary mt-6"
          >
            {loading ? "Loading..." : "? Enter Game"}
            <ArrowRight className="h-4 w-4" />
          </button>
          <p className="mt-4 text-xs text-[var(--text-dim)]">
            {firebaseEnabled ? "Google sign-in is powered up." : "Demo mode is active until Firebase is wired in."}
          </p>
          {authError ? <p className="mt-2 text-xs text-[var(--danger)]">{authError}</p> : null}
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {features.map((feature, index) => (
          <div
            key={feature.title}
            className="game-card game-card-featured p-6 text-center"
            style={{ borderTopColor: index === 0 ? "var(--purple-bright)" : index === 1 ? "var(--pink-main)" : "var(--gold)" }}
          >
            <div className="mb-4 text-[40px]">{feature.emoji}</div>
            <h2 className="bubble-heading text-[18px] text-[var(--text-lavender)]">{feature.title}</h2>
            <p className="mt-3 text-[13px] leading-6 text-[var(--text-muted)]">{feature.text}</p>
          </div>
        ))}
      </div>

      <div className="game-card grid gap-4 px-5 py-5 md:grid-cols-3" style={{ background: "var(--bg-surface)" }}>
        <StatCard value="500+" label="Quests Played" />
        <StatCard value="8" label="Job Classes" />
        <StatCard value="AI" label="Powered" />
      </div>
    </section>
  );
}

function StatCard({ value, label }) {
  return (
    <div className="text-center md:border-r last:md:border-r-0" style={{ borderColor: "var(--purple-muted)" }}>
      <div className="pixel-heading text-[20px] text-[var(--pink-bright)]">{value}</div>
      <div className="mt-2 text-[12px] text-[var(--text-dim)]">{label}</div>
    </div>
  );
}

export default LandingPage;

