import { Clock, ShieldAlert, Zap } from "lucide-react";

function ProgressBar({ current, total, countdown, role, interviewType }) {
  const progress = total ? (current / total) * 100 : 0;
  const isUrgent = countdown && countdown.remaining < 60;

  return (
    <div className="neo-card p-4 md:p-5 flex flex-col md:flex-row items-center justify-between gap-4 bg-white">
      {/* Left: Role Info */}
      <div className="flex flex-wrap items-center gap-2">
        {role && (
          <div className="flex items-center gap-1.5 border-2 border-black bg-neo-yellow px-2.5 py-1 font-mono text-xs font-black uppercase text-black shadow-neo-sm">
            <Zap className="h-3.5 w-3.5 fill-black" />
            <span>{role}</span>
          </div>
        )}
        {interviewType && (
          <div className="border-2 border-black bg-neo-cyan px-2.5 py-1 font-mono text-xs font-bold uppercase text-black shadow-neo-sm">
            {interviewType} FOCUS
          </div>
        )}
      </div>

      {/* Center: Round Progress */}
      <div className="flex-1 max-w-md w-full space-y-1.5 text-center">
        <div className="flex items-center justify-between font-mono text-xs font-black uppercase text-black">
          <span>PROGRESS</span>
          <span>
            ROUND {current} OF {total}
          </span>
        </div>
        <div className="h-4 w-full border-2 border-black bg-neutral-100 shadow-neo-sm overflow-hidden p-0.5">
          <div
            className="h-full bg-neo-yellow border-r-2 border-black transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Right: Digital Timer */}
      <div
        className={`flex items-center gap-2 border-2 border-black px-3.5 py-1.5 font-mono text-xs font-black uppercase shadow-neo-sm ${
          isUrgent ? "bg-neo-pink text-black animate-pulse" : "bg-black text-neo-yellow"
        }`}
      >
        <Clock className="h-4 w-4 stroke-[2.5]" />
        <span>{countdown ? formatTime(countdown.remaining) : "03:00"}</span>
      </div>
    </div>
  );
}

function formatTime(value) {
  const minutes = Math.floor(value / 60);
  const seconds = value % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export default ProgressBar;
