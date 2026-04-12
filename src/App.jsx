import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import HistoryPage from "./pages/HistoryPage";
import InterviewPage from "./pages/InterviewPage";
import LandingPage from "./pages/LandingPage";
import ResultsPage from "./pages/ResultsPage";

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="app-shell" />
      <Navbar />
      <main className="relative z-10">
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
    </div>
  );
}

export default App;
