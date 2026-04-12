import { ArrowRight, GaugeCircle, Layers3, Sparkles } from "lucide-react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const features = [
  { icon: Layers3, title: "10+ job roles", text: "Tailored technical and behavioral prompts for the role you want." },
  { icon: Sparkles, title: "AI-scored answers", text: "Get instant breakdowns, sample answers, and sharper follow-up tips." },
  { icon: GaugeCircle, title: "Track your progress", text: "Save each session and spot trends over time in your history." },
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
    <section className="mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl flex-col justify-center px-6 py-12">
      {!navigator.onLine ? (
        <div className="mb-8 rounded-2xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">
          You appear to be offline.
        </div>
      ) : null}

      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-8">
          <div className="eyebrow">PrepAI mock interview simulator</div>
          <div className="space-y-5">
            <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-white md:text-7xl">
              Practice interviews. Get AI feedback. Land the job.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-300">
              Train with role-specific mock interviews, receive structured AI scoring, and build a portfolio-ready prep habit that actually feels useful.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => (user ? navigate("/interview") : signIn())}
              disabled={loading}
              className="primary-button text-base"
            >
              {loading ? "Loading..." : user ? "Go to Dashboard" : "Start Practicing"}
              <ArrowRight className="h-4 w-4" />
            </button>
            <p className="text-sm text-slate-400">
              {firebaseEnabled ? "Google Sign-In enabled" : "Demo mode active until Firebase env vars are added"}
            </p>
          </div>

          {authError ? <p className="text-sm text-rose-300">{authError}</p> : null}
        </div>

        <div className="glass-panel grid gap-5 p-6 md:p-8">
          {features.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <Icon className="mb-4 h-6 w-6 text-indigo-200" />
              <h2 className="text-lg font-semibold text-white">{title}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-300">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LandingPage;
