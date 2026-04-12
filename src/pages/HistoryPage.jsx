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
        toast.error(error.message || "Unable to load session history.");
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
    const confirmed = window.confirm("Delete this saved session?");
    if (!confirmed) return;

    await deleteSessionById(id);
    setSessions((current) => current.filter((session) => session.id !== id));
    toast.success("Session deleted");
    if (selectedSession?.id === id) {
      setSelectedSession(null);
    }
  };

  return (
    <section className="mx-auto max-w-6xl space-y-8 px-6 py-12">
      <div className="space-y-3">
        <div className="eyebrow">Saved practice</div>
        <h1 className="text-4xl font-semibold text-white">Your Interview History</h1>
        <p className="max-w-2xl text-slate-300">
          Review previous mock interviews, inspect your answer quality, and see how your scores change over time.
        </p>
      </div>

      {loading ? (
        <div className="glass-panel p-8 text-center text-slate-300">Loading your saved sessions...</div>
      ) : (
        <SessionHistory sessions={sessions} onView={setSelectedSession} onDelete={handleDelete} />
      )}

      <div
        className={`fixed inset-y-0 right-0 z-30 w-full max-w-2xl transform border-l border-white/10 bg-slate-950/98 shadow-2xl transition ${
          selectedSession ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {selectedSession ? (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <div>
                <h2 className="text-2xl font-semibold text-white">{selectedSession.role}</h2>
                <p className="text-sm text-slate-400">
                  {selectedSession.interviewType} · {selectedSession.totalScore}%
                </p>
              </div>
              <button type="button" className="ghost-button" onClick={() => setSelectedSession(null)}>
                <X className="h-4 w-4" />
                Close
              </button>
            </div>

            <div className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
              {selectedSession.questions.map((item, index) => (
                <div key={`${item.id}-${index}`} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <div className="text-sm text-slate-400">Question {index + 1}</div>
                  <h3 className="mt-2 text-lg font-medium text-white">{item.question}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-300">{item.answer}</p>
                  <div className="mt-4 text-sm text-slate-200">Score: {item.score}/10</div>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{item.improvements}</p>
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
