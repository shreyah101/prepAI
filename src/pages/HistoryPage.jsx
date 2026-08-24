import { ArrowRight, Calendar, Compass, Layers, Trophy, X, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import SessionHistory from "../components/SessionHistory";
import { useAuth } from "../hooks/useAuth";
import { deleteSessionById, getSessions } from "../lib/sessionStore";

function HistoryPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      try {
        const result = await getSessions(user?.uid);
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
  }, [user?.uid]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this session record permanently?");
    if (!confirmed) return;

    await deleteSessionById(id);
    setSessions((current) => current.filter((session) => session.id !== id));
    toast.success("Session record deleted");
    if (selectedSession?.id === id) {
      setSelectedSession(null);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Dark Masthead */}
      <section className="border-b-[2.5px] border-black bg-[#111111] px-4 py-8 md:py-10 text-white">
        <div className="mx-auto max-w-6xl space-y-2">
          <div className="flex items-center gap-2">
            <span className="border-2 border-black bg-neo-cyan px-2.5 py-0.5 font-mono text-xs font-black uppercase text-black">
              QUEST LOG
            </span>
            <span className="font-mono text-xs font-bold text-neutral-400">
              AUDIT ARCHIVE
            </span>
          </div>
          <h1 className="font-black italic uppercase tracking-tight text-3xl sm:text-4xl text-white">
            COMPLETED <span className="text-neo-cyan">RUNS</span>
          </h1>
          <p className="font-mono text-xs text-neutral-300">
            REVIEW HISTORICAL BATTLE REPORTS, RETRY QUESTIONS, AND TRACK CAREER PROGRESSION.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-6 px-4 sm:px-6">
        {loading ? (
          <div className="neo-card p-12 text-center font-mono text-xs font-bold text-black bg-white">
            <div className="inline-block h-6 w-6 animate-spin border-2 border-black border-t-transparent mb-3" />
            <div>LOADING QUEST LOG...</div>
          </div>
        ) : (
          <SessionHistory
            sessions={sessions}
            onView={setSelectedSession}
            onDelete={handleDelete}
          />
        )}
      </section>

      {/* Slide-out Inspection Drawer (Seatzy Modal Style) */}
      {selectedSession && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-2xl border-l-[3px] border-black bg-neo-bg shadow-2xl flex flex-col h-full overflow-hidden animate-in slide-in-from-right duration-200">
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b-[2.5px] border-black bg-[#111111] px-6 py-4 text-white">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="border border-black bg-neo-yellow px-2 py-0.5 font-mono text-[10px] font-black uppercase text-black">
                    {selectedSession.role}
                  </span>
                  <span className="font-mono text-xs text-neutral-400">
                    SCORE: {selectedSession.totalScore}%
                  </span>
                </div>
                <h3 className="font-black uppercase text-lg text-white">
                  SESSION AUDIT DETAIL
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedSession(null)}
                className="flex h-8 w-8 items-center justify-center border-2 border-white bg-black text-white hover:bg-neo-yellow hover:text-black hover:border-black transition font-bold"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="neo-banner-step">
                <span>
                  i TOTAL ROUNDS: {selectedSession.questions?.length || 0} • DIFFICULTY: {selectedSession.difficulty}
                </span>
              </div>

              {selectedSession.questions?.map((item, index) => (
                <div key={item.id || index} className="neo-card p-5 space-y-3 bg-white">
                  <div className="flex items-center justify-between border-b-2 border-black pb-2">
                    <span className="font-mono text-xs font-black uppercase text-black">
                      ROUND {index + 1}: {item.topic || "CORE"}
                    </span>
                    <span className="border border-black bg-neo-yellow px-2 py-0.5 font-mono text-xs font-bold text-black">
                      {item.score}/10 PTS
                    </span>
                  </div>

                  <div>
                    <span className="font-mono text-[10px] font-bold text-neutral-500 uppercase block mb-1">
                      PROMPT:
                    </span>
                    <p className="font-bold text-sm text-black">{item.question}</p>
                  </div>

                  <div className="border border-black bg-neutral-50 p-3 font-mono text-xs">
                    <span className="font-bold text-neutral-500 uppercase block mb-1">
                      YOUR ANSWER:
                    </span>
                    <p className="text-neutral-800 whitespace-pre-wrap">{item.answer}</p>
                  </div>

                  <div className="border border-black bg-amber-50 p-3 font-mono text-xs">
                    <span className="font-bold text-amber-900 uppercase block mb-1">
                      EVALUATION & FEEDBACK:
                    </span>
                    <p className="text-neutral-800">{item.improvements}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Drawer Footer */}
            <div className="border-t-[2.5px] border-black bg-white p-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setSelectedSession(null)}
                className="btn-neo btn-neo-ghost text-xs font-bold"
              >
                CLOSE INSPECTOR
              </button>

              <button
                type="button"
                onClick={() => {
                  navigate("/interview", { state: { preselectRole: selectedSession.role } });
                }}
                className="btn-neo btn-neo-yellow text-xs font-black flex items-center gap-1.5"
              >
                <span>RETRY THIS ROLE</span>
                <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HistoryPage;
