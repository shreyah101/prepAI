function ProgressBar({ current, total, countdown, role, interviewType }) {
  const progress = total ? (current / total) * 100 : 0;
  const timerDanger = countdown && countdown.remaining < 60;

  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between px-4">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-[8px] bg-[rgba(168,85,247,0.1)] border border-[var(--neon-purple-dim)] text-[var(--neon-purple)] shadow-[0_0_15px_var(--neon-purple-dim)]">
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>
        </div>
        <div>
          <h2 className="pixel-heading text-[16px] text-white">{role}</h2>
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[var(--neon-purple)]">
             <span className="h-1.5 w-1.5 rounded-full bg-[var(--neon-purple)]"></span>
             STAGE {current}/{total}
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-md">
        <div className="mb-2 flex justify-between text-[11px] font-bold uppercase tracking-wider">
          <span className="text-[var(--neon-cyan)]">CONFIDENCE XP</span>
          <span className="text-[var(--neon-cyan)]">{Math.round(progress)}/100</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className={`text-right pixel-heading text-[14px] ${timerDanger ? "timer-danger text-[var(--neon-pink)] drop-shadow-[0_0_10px_rgba(244,63,94,0.5)]" : "text-[var(--text-muted)]"}`}>
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

