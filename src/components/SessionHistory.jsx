function SessionHistory({ sessions, onView, onDelete }) {
  if (!sessions.length) {
    return (
      <div className="game-card flex min-h-[320px] flex-col items-center justify-center gap-4 p-10 text-center">
        <div className="relative h-20 w-20">
          <div className="absolute left-1/2 top-10 h-10 w-3 -translate-x-1/2 rounded-sm" style={{ background: "#78350f" }} />
          <div className="absolute left-1/2 top-2 h-0 w-0 -translate-x-1/2 border-l-[18px] border-r-[18px] border-b-[28px] border-l-transparent border-r-transparent" style={{ borderBottomColor: "#fb923c" }} />
          <div className="absolute left-1/2 top-5 h-0 w-0 -translate-x-1/2 border-l-[12px] border-r-[12px] border-b-[18px] border-l-transparent border-r-transparent animate-pulse" style={{ borderBottomColor: "#fde047" }} />
        </div>
        <h2 className="pixel-heading text-[10px] leading-6 text-white">No quests yet, adventurer!</h2>
        <p className="max-w-md text-sm leading-7 text-[var(--text-muted)]">
          Start your first run and completed battle reports will appear here in your quest log.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {sessions.map((session) => {
        const rank = getRank(session.totalScore);
        const tone = toneForScore(session.totalScore);
        return (
          <article key={session.id} className="game-card space-y-5 p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                <span className="hud-pill hud-pill-pink">{session.role}</span>
                <span className="hud-pill" style={{ color: tone }}>
                  {displayDifficulty(session.difficulty)}
                </span>
              </div>
              <button type="button" onClick={() => onDelete(session.id)} className="text-sm text-[var(--text-dim)]">
                
              </button>
            </div>

            <div className="text-right text-[12px] text-[var(--text-dim)]">{new Date(session.timestamp).toLocaleString()}</div>

            <div className="text-center">
              <div className="rank-badge mx-auto" style={{ color: tone }}>{rank}</div>
            </div>

            <div className="flex items-center justify-between">
              <div className="bubble-heading text-[24px] text-white">{session.totalScore}%</div>
              <div className="bubble-heading text-[15px] text-[var(--text-muted)]">{session.questions.length} rounds</div>
            </div>

            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${session.totalScore}%`, background: tone }} />
            </div>

            <button type="button" onClick={() => onView(session)} className="btn-ghost w-full justify-center">
              View Details ▶
            </button>
          </article>
        );
      })}
    </div>
  );
}

function toneForScore(score) {
  if (score >= 70) return "var(--success)";
  if (score >= 40) return "var(--warning)";
  return "var(--danger)";
}

function getRank(score) {
  if (score >= 70) return "S Rank";
  if (score >= 60) return "A Rank";
  if (score >= 40) return "B Rank";
  return "C Rank";
}

function displayDifficulty(difficulty) {
  if (difficulty === "Easy") return "Rookie";
  if (difficulty === "Medium") return "Warrior";
  if (difficulty === "Hard") return "Legend";
  return difficulty;
}

export default SessionHistory;

