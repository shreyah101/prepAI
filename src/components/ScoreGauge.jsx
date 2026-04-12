import { useEffect, useState } from "react";

function ScoreGauge({ score }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const size = 180;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedScore / 100) * circumference;

  useEffect(() => {
    let frame;
    let start;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / 800, 1);
      setAnimatedScore(Math.round(score * progress));

      if (progress < 1) {
        frame = requestAnimationFrame(step);
      }
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [score]);

  const tone =
    score >= 70
      ? "text-emerald-400 stroke-emerald-400"
      : score >= 40
        ? "text-amber-400 stroke-amber-400"
        : "text-rose-400 stroke-rose-400";

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          className={`transition-all duration-300 ${tone}`}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>

      <div className="absolute text-center">
        <div className={`text-4xl font-semibold ${tone.split(" ")[0]}`}>{animatedScore}%</div>
        <div className="mt-1 text-xs uppercase tracking-[0.3em] text-slate-400">Overall</div>
      </div>
    </div>
  );
}

export default ScoreGauge;
