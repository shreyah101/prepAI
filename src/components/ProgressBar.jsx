function ProgressBar({ current, total, countdown, role, interviewType }) {
  const progress = total ? (current / total) * 100 : 0;
  const timerDanger = countdown && countdown.remaining < 60;

  return (
    <div className="game-card grid gap-4 px-4 py-4 md:grid-cols-[1fr_1.2fr_1fr] md:items-center md:px-5">
      <div className="flex flex-wrap gap-2">
        {role ? <span className="hud-pill hud-pill-pink">?? {role}</span> : null}
        {interviewType ? <span className="hud-pill hud-pill-purple">?? {interviewType}</span> : null}
      </div>

      <div className="space-y-2 text-center">
        <div className="pixel-heading text-[10px] text-white">ROUND {current} / {total}</div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className={`text-right pixel-heading text-[14px] ${timerDanger ? "timer-danger" : ""}`} style={{ color: timerDanger ? "var(--danger)" : "var(--success)" }}>
        {countdown ? formatTime(countdown.remaining) : "3:00"}
      </div>
    </div>
  );
}

function formatTime(value) {
  const minutes = Math.floor(value / 60);
  const seconds = value % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export default ProgressBar;

