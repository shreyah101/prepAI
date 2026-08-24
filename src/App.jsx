import { Navigate, Route, Routes } from "react-router-dom";
import AuthModal from "./components/AuthModal";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import HistoryPage from "./pages/HistoryPage";
import InterviewPage from "./pages/InterviewPage";
import LandingPage from "./pages/LandingPage";
import ResultsPage from "./pages/ResultsPage";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-neo-bg text-black">
      <AuthModal />
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/interview"
            element={
              <ProtectedRoute>
                <InterviewPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/results"
            element={
              <ProtectedRoute>
                <ResultsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <HistoryPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Neo-Brutalist Footer */}
      <footer className="border-t-[2.5px] border-black bg-[#111111] py-8 text-white">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="border border-black bg-neo-yellow px-2 py-0.5 font-mono text-xs font-black uppercase text-black">
              PREPAI
            </span>
            <span className="font-mono text-xs text-neutral-400">
              AI MOCK INTERVIEW SIMULATOR
            </span>
          </div>

          <div className="font-mono text-xs text-neutral-400 text-center sm:text-right">
            POWERED BY GROQ LLaMA 3.3 70B & PREPAI ENGINE
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
