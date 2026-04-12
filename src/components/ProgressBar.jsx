function ProgressBar({ current, total, countdown }) {
  const progress = total ? (current / total) * 100 : 0;
  const timerWidth = countdown ? `${(countdown.remaining / countdown.total) * 100}%` : "100%";

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
        <span>
          Question {current} of {total}
        </span>
        {countdown ? <span>{formatTime(countdown.remaining)}</span> : null}
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-300 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {countdown ? (
        <div className="h-1 overflow-hidden rounded-full bg-white/5">
          <div
            className="h-full rounded-full bg-amber-400/90 transition-all duration-1000"
            style={{ width: timerWidth }}
          />
        </div>
      ) : null}
    </div>
  );
}

function formatTime(value) {
  const minutes = Math.floor(value / 60);
  const seconds = value % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export default ProgressBar;
