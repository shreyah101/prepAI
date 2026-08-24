import { useEffect, useState } from "react";

function ScoreGauge({ score }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const size = 160;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedScore / 100) * circumference;

  useEffect(() => {
    let frame;
    let start;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / 1000, 1);
      setAnimatedScore(Math.round(score * progress));
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [score]);

  return (
    <div className="relative flex items-center justify-center p-3">
      <svg width={size} height={size} className="-rotate-90">
        {/* Background track circle with black outline */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Active score circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#CCFF00"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)" }}
        />
      </svg>
      {/* Center percentage box */}
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="font-black text-3xl text-black font-mono">
          {animatedScore}%
        </span>
        <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-neutral-500">
          OVERALL ACCURACY
        </span>
      </div>
    </div>
  );
}

export default ScoreGauge;
