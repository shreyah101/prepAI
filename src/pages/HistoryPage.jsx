import { X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SessionHistory from "../components/SessionHistory";
import { useAuth } from "../hooks/useAuth";
import { deleteSessionById, getSessions } from "../lib/sessionStore";

function HistoryPage() {
  const { user } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      try {
        const result = await getSessions(user.uid);
        if (!cancelled) {
          setSessions(result);
        }
      } catch (error) {
        toast.error(error.message || "Unable to load quest log.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [user.uid]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this quest entry?");
    if (!confirmed) return;

    await deleteSessionById(id);
    setSessions((current) => current.filter((session) => session.id !== id));
    toast.success("Quest removed");
    if (selectedSession?.id === id) {
      setSelectedSession(null);
    }
  };

  return (
    <section className="mx-auto max-w-6xl space-y-8 px-4 py-8 md:px-6 md:py-10">
      <div className="space-y-3">
        <div className="pixel-heading text-[18px] leading-8 text-white">?? QUEST LOG</div>
        <p className="text-sm text-[var(--text-muted)]">Your completed adventures.</p>
      </div>

      {loading ? (
        <div className="game-card p-8 text-center text-[var(--text-muted)]">Loading your quest log...</div>
      ) : (
        <SessionHistory sessions={sessions} onView={setSelectedSession} onDelete={handleDelete} />
      )}

      <div
        className={`fixed inset-y-0 right-0 z-30 w-full max-w-2xl transform border-l-2 transition ${selectedSession ? "translate-x-0" : "translate-x-full"}`}
        style={{ borderColor: "var(--purple-muted)", background: "var(--bg-card)" }}
      >
        {selectedSession ? (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b-2 px-6 py-5" style={{ borderColor: "var(--purple-muted)" }}>
              <div>
                <h2 className="pixel-heading text-[14px] leading-7 text-white">Quest Detail</h2>
                <p className="mt-2 text-sm text-[var(--text-dim)]">
                  {selectedSession.role} · {selectedSession.interviewType} · {selectedSession.totalScore}%
                </p>
              </div>
              <button type="button" className="btn-ghost px-3 py-2" onClick={() => setSelectedSession(null)}>
                <X className="h-4 w-4" />
                Close
              </button>
            </div>

            <div className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
              {selectedSession.questions.map((item, index) => (
                <div key={`${item.id}-${index}`} className="game-card p-5">
                  <div className="bubble-heading text-[13px] text-[var(--text-muted)]">Round {index + 1}</div>
                  <h3 className="mt-3 text-lg font-medium text-white">{item.question}</h3>
                  <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">{item.answer}</p>
                  <div className="mt-4 bubble-heading text-[14px] text-white">Battle Score: {item.score}/10</div>
                  <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">{item.improvements}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default HistoryPage;

