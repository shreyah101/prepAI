function SessionHistory({ sessions, onView, onDelete }) {
  if (!sessions.length) {
    return (
      <div className="glass-panel flex min-h-[280px] flex-col items-center justify-center gap-4 p-10 text-center">
        <div className="text-5xl">...</div>
        <h2 className="text-2xl font-semibold text-white">No sessions yet</h2>
        <p className="max-w-md text-slate-300">
          Start your first interview and each completed session will show up here with scores and feedback.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {sessions.map((session) => (
        <article key={session.id} className="glass-panel space-y-5 p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-xl font-semibold text-white">{session.role}</h3>
              <p className="mt-1 text-sm text-slate-400">
                {new Date(session.timestamp).toLocaleString()}
              </p>
            </div>
            <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-slate-300">
              {session.interviewType}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className={`score-pill ${toneForScore(session.totalScore)}`}>{session.totalScore}%</span>
            <span className="text-sm text-slate-400">{session.questions.length} questions</span>
          </div>

          <div className="flex gap-3">
            <button type="button" onClick={() => onView(session)} className="primary-button">
              View Details
            </button>
            <button type="button" onClick={() => onDelete(session.id)} className="ghost-button">
              Delete
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}

function toneForScore(score) {
  if (score >= 70) return "score-pill-good";
  if (score >= 40) return "score-pill-average";
  return "score-pill-bad";
}

export default SessionHistory;
