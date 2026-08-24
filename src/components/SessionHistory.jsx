import { ArrowRight, Calendar, Compass, Layers, Trash2, Trophy, Zap } from "lucide-react";

function SessionHistory({ sessions, onView, onDelete }) {
  if (!sessions.length) {
    return (
      <div className="neo-card p-12 text-center flex flex-col items-center justify-center gap-4 bg-white">
        <div className="flex h-16 w-16 items-center justify-center border-2 border-black bg-neo-yellow shadow-neo">
          <Layers className="h-8 w-8 stroke-[2.2] text-black" />
        </div>
        <h3 className="font-black text-xl uppercase tracking-tight text-black">
          NO SESSIONS RECORDED YET
        </h3>
        <p className="max-w-md font-mono text-xs leading-relaxed text-neutral-600">
          Your completed mock interviews and battle reports will be automatically logged here with multi-axis breakdowns and XP rewards.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {sessions.map((session) => {
        const rank = getRank(session.totalScore);
        const rankColor = getRankColor(session.totalScore);

        return (
          <article
            key={session.id}
            className="neo-card neo-card-hover p-6 flex flex-col justify-between space-y-4 bg-white"
          >
            {/* Header: Role & Delete */}
            <div className="flex items-start justify-between gap-2 border-b-2 border-black pb-3">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="border border-black bg-neo-yellow px-2.5 py-0.5 font-mono text-xs font-black uppercase text-black">
                    {session.role}
                  </span>
                  <span className="border border-black bg-neutral-100 px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-neutral-800">
                    {session.difficulty}
                  </span>
                </div>
                <div className="flex items-center gap-1 font-mono text-[11px] text-neutral-500">
                  <Calendar className="h-3 w-3" />
                  <span>
                    {session.timestamp
                      ? new Date(session.timestamp).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "Recent Session"}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onDelete(session.id)}
                title="Delete Session"
                className="flex h-7 w-7 items-center justify-center border border-black bg-white text-neutral-500 transition hover:bg-red-400 hover:text-black"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Score & Rank Center */}
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-12 w-12 items-center justify-center border-2 border-black ${rankColor} font-black text-xl text-black shadow-neo-sm`}
                >
                  {rank.letter}
                </div>
                <div>
                  <div className="font-mono text-[10px] font-bold uppercase text-neutral-500">
                    BATTLE RANK
                  </div>
                  <div className="font-black text-sm uppercase text-black">
                    {rank.label}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-black text-2xl font-mono text-black">
                  {session.totalScore}%
                </div>
                <div className="font-mono text-[10px] font-bold uppercase text-neutral-500">
                  {session.questions?.length || 0} ROUNDS COMPLETED
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-2.5 w-full border border-black bg-neutral-100 p-0.5">
              <div
                className="h-full bg-neo-yellow"
                style={{ width: `${session.totalScore}%` }}
              />
            </div>

            {/* View Details Trigger */}
            <button
              type="button"
              onClick={() => onView(session)}
              className="btn-neo btn-neo-white w-full text-xs font-black flex items-center justify-center gap-2"
            >
              <span>VIEW FULL BREAKDOWN</span>
              <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
            </button>
          </article>
        );
      })}
    </div>
  );
}

function getRank(score) {
  if (score >= 85) return { letter: "S", label: "S-RANK MASTER" };
  if (score >= 70) return { letter: "A", label: "A-RANK STRONG" };
  if (score >= 50) return { letter: "B", label: "B-RANK AVERAGE" };
  return { letter: "C", label: "C-RANK NEEDS WORK" };
}

function getRankColor(score) {
  if (score >= 85) return "bg-neo-yellow";
  if (score >= 70) return "bg-neo-cyan";
  if (score >= 50) return "bg-neo-orange";
  return "bg-neo-pink";
}

export default SessionHistory;
